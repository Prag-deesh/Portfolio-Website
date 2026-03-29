/* ── Portfolio Analytics Worker ──────────────────────────────────
 *  Receives events from the portfolio site via sendBeacon/fetch,
 *  enriches with Cloudflare geo headers (IP, city, country, ISP),
 *  stores in D1 SQLite, and serves a JSON API to read the data.
 *
 *  Endpoints:
 *    POST /events       → receive and store an analytics event
 *    GET  /events       → list recent events (with optional filters)
 *    GET  /stats        → aggregated summary (visits, top countries, etc.)
 *    GET  /             → health check
 *  ────────────────────────────────────────────────────────────── */

export interface Env {
  DB: D1Database
  API_KEY?: string // optional: protect the read endpoints
}

// CORS headers — allow your portfolio domain
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  })
}

/* ── POST /events — receive an analytics event ── */
async function handlePost(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as Record<string, unknown>
    const device = (body.device ?? {}) as Record<string, unknown>

    // Cloudflare provides geo data in the cf object on the request
    const cf = (request as unknown as { cf?: Record<string, string> }).cf ?? {}

    await env.DB.prepare(`
      INSERT INTO events (
        event, timestamp, url,
        ip, country, city, region, isp, postal_code, latitude, longitude,
        screen, viewport, dpr, platform, user_agent, language,
        touch_points, device_memory, cpu_cores,
        connection_type, connection_speed, network_type,
        timezone, referrer,
        section, seconds, social_platform, social_href
      ) VALUES (
        ?1, ?2, ?3,
        ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11,
        ?12, ?13, ?14, ?15, ?16, ?17,
        ?18, ?19, ?20,
        ?21, ?22, ?23,
        ?24, ?25,
        ?26, ?27, ?28, ?29
      )
    `).bind(
      /* event info */
      body.event ?? 'unknown',
      body.timestamp ?? new Date().toISOString(),
      body.url ?? null,

      /* geo from Cloudflare headers */
      request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? null,
      cf.country ?? null,
      cf.city ?? null,
      cf.region ?? null,
      cf.asOrganization ?? null, // ISP name (e.g., "Jio", "Airtel", "Comcast")
      cf.postalCode ?? null,     // Postal/PIN code (e.g., "600001")
      cf.latitude ? parseFloat(cf.latitude) : null,
      cf.longitude ? parseFloat(cf.longitude) : null,

      /* device from client payload */
      device.screen ?? null,
      device.viewport ?? null,
      device.dpr ?? null,
      device.platform ?? null,
      device.userAgent ?? null,
      device.language ?? null,
      device.touchPoints ?? null,
      device.deviceMemory ?? null,
      device.hardwareConcurrency ?? null,

      /* network from client payload */
      device.connectionType ?? null,
      device.connectionSpeed ?? null,
      device.networkType ?? null,

      /* context */
      device.timezone ?? null,
      device.referrer ?? null,

      /* event-specific */
      body.section ?? null,
      body.seconds ?? null,
      body.platform ?? null,
      body.href ?? null,
    ).run()

    return json({ ok: true }, 201)
  } catch (err) {
    return json({ error: (err as Error).message }, 500)
  }
}

/* ── GET /events — list events ── */
async function handleGetEvents(url: URL, env: Env): Promise<Response> {
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 500)
  const event = url.searchParams.get('event')  // filter by event type
  const days = parseInt(url.searchParams.get('days') ?? '7')

  let query = `
    SELECT * FROM events
    WHERE timestamp >= datetime('now', '-${days} days')
  `
  const params: string[] = []

  if (event) {
    query += ` AND event = ?1`
    params.push(event)
  }

  query += ` ORDER BY id DESC LIMIT ${limit}`

  const result = params.length
    ? await env.DB.prepare(query).bind(...params).all()
    : await env.DB.prepare(query).all()

  return json({
    count: result.results?.length ?? 0,
    events: result.results ?? [],
  })
}

/* ── GET /stats — aggregated stats ── */
async function handleStats(url: URL, env: Env): Promise<Response> {
  const days = parseInt(url.searchParams.get('days') ?? '7')
  const since = `datetime('now', '-${days} days')`

  const [totals, countries, devices, referrers, sections, cvDownloads] = await Promise.all([
    // Total visits
    env.DB.prepare(`
      SELECT
        COUNT(*) as total_events,
        COUNT(DISTINCT ip) as unique_visitors,
        COUNT(CASE WHEN event = 'pageview' THEN 1 END) as pageviews,
        COUNT(CASE WHEN event = 'cv_download' THEN 1 END) as cv_downloads,
        COUNT(CASE WHEN event = 'contact_submit' THEN 1 END) as contact_submits
      FROM events WHERE timestamp >= ${since}
    `).first(),

    // Top countries
    env.DB.prepare(`
      SELECT country, region, city, postal_code, COUNT(*) as visits
      FROM events WHERE event = 'pageview' AND timestamp >= ${since}
      GROUP BY country, region, city, postal_code ORDER BY visits DESC LIMIT 20
    `).all(),

    // Device breakdown
    env.DB.prepare(`
      SELECT
        CASE
          WHEN touch_points > 0 THEN 'mobile'
          ELSE 'desktop'
        END as device_type,
        platform,
        connection_type,
        network_type,
        COUNT(*) as count
      FROM events WHERE event = 'pageview' AND timestamp >= ${since}
      GROUP BY device_type, platform, connection_type, network_type
      ORDER BY count DESC
    `).all(),

    // Top referrers
    env.DB.prepare(`
      SELECT referrer, COUNT(*) as visits
      FROM events WHERE event = 'pageview' AND timestamp >= ${since}
      GROUP BY referrer ORDER BY visits DESC LIMIT 10
    `).all(),

    // Section engagement
    env.DB.prepare(`
      SELECT section, COUNT(*) as views, AVG(seconds) as avg_seconds
      FROM events WHERE event IN ('section_view', 'section_time') AND timestamp >= ${since}
      GROUP BY section ORDER BY views DESC
    `).all(),

    // CV download details
    env.DB.prepare(`
      SELECT ip, country, region, city, postal_code, isp, platform, user_agent, connection_type, network_type, timestamp
      FROM events WHERE event = 'cv_download' AND timestamp >= ${since}
      ORDER BY id DESC LIMIT 50
    `).all(),
  ])

  return json({
    period: `last ${days} days`,
    summary: totals,
    locations: countries.results,
    devices: devices.results,
    referrers: referrers.results,
    sections: sections.results,
    cv_downloads: cvDownloads.results,
  })
}

/* ── Router ── */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS })
    }

    const url = new URL(request.url)

    // Optional: protect read endpoints with API key
    if (request.method === 'GET' && env.API_KEY) {
      const auth = request.headers.get('Authorization')
      if (auth !== `Bearer ${env.API_KEY}`) {
        return json({ error: 'Unauthorized' }, 401)
      }
    }

    // Routes
    if (url.pathname === '/events' && request.method === 'POST') {
      return handlePost(request, env)
    }
    if (url.pathname === '/events' && request.method === 'GET') {
      return handleGetEvents(url, env)
    }
    if (url.pathname === '/stats' && request.method === 'GET') {
      return handleStats(url, env)
    }
    if (url.pathname === '/' && request.method === 'GET') {
      return json({ status: 'ok', service: 'portfolio-analytics' })
    }

    return json({ error: 'Not found' }, 404)
  },
}
