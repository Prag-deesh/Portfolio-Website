/* ── Lightweight Portfolio Analytics ─────────────────────────────
 *  Collects: page views, CV downloads, section visibility,
 *  device info, connection type, location (via timezone), timestamps.
 *
 *  Data is sent to a Cloudflare Worker endpoint via navigator.sendBeacon
 *  (falls back to fetch). Zero cookies, zero external dependencies.
 *
 *  To receive data, deploy a Cloudflare Worker that accepts POST
 *  requests and stores them in KV / D1 / R2 / Analytics Engine.
 *  ─────────────────────────────────────────────────────────────── */

/* ── Config ── */
const ANALYTICS_ENDPOINT = 'https://portfolio-analytics.pragad33sh.workers.dev/events'
const SEND_ANALYTICS = ANALYTICS_ENDPOINT.length > 0

/* ── Umami helper (fires custom events to Umami dashboard) ── */
declare global {
  interface Window { umami?: { track: (event: string, data?: Record<string, unknown>) => void } }
}
function umamiTrack(event: string, data?: Record<string, unknown>) {
  try { window.umami?.track(event, data) } catch { /* Umami not loaded yet */ }
}

/* ── Device fingerprint (collected once) ── */
function getDeviceInfo() {
  const ua = navigator.userAgent
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string; downlink?: number; type?: string }
    deviceMemory?: number
  }
  const conn = nav.connection

  return {
    /* Screen & viewport */
    screen: `${screen.width}x${screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    dpr: window.devicePixelRatio ?? 1,

    /* OS & browser (parsed from UA) */
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages?.join(','),

    /* Device hints */
    touchPoints: navigator.maxTouchPoints ?? 0,
    deviceMemory: nav.deviceMemory ?? null,
    hardwareConcurrency: navigator.hardwareConcurrency ?? null,

    /* Connection */
    connectionType: conn?.effectiveType ?? null,  // '4g', '3g', 'slow-2g'
    connectionSpeed: conn?.downlink ?? null,       // Mbps
    networkType: conn?.type ?? null,               // 'wifi', 'cellular'

    /* Timezone → approximate location */
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),

    /* Referrer */
    referrer: document.referrer || 'direct',
    userAgent: ua,
  }
}

/* ── Send event ── */
function sendEvent(event: string, data: Record<string, unknown> = {}) {
  if (!SEND_ANALYTICS) return

  const payload = JSON.stringify({
    event,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...data,
  })

  try {
    const blob = new Blob([payload], { type: 'application/json' })
    if (navigator.sendBeacon?.(ANALYTICS_ENDPOINT, blob)) return
  } catch { /* fallback below */ }

  // Fallback: fire-and-forget fetch
  fetch(ANALYTICS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {})
}

/* ── Page view (called once on load) ── */
export function trackPageView() {
  sendEvent('pageview', { device: getDeviceInfo() })
}

/* ── CV download ── */
export function trackCvDownload() {
  sendEvent('cv_download', {
    device: getDeviceInfo(),
    downloadedAt: new Date().toISOString(),
  })
  umamiTrack('cv-download')
}

/* ── Section visibility observer ── */
const observedSections = new Set<string>()
const sectionTimers: Record<string, number> = {}
let sectionObserver: IntersectionObserver | null = null

export function observeSections() {
  if (typeof IntersectionObserver === 'undefined') return

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (!id) return

        if (entry.isIntersecting) {
          // Section entered viewport
          sectionTimers[id] = Date.now()

          if (!observedSections.has(id)) {
            observedSections.add(id)
            sendEvent('section_view', { section: id })
            umamiTrack('section-view', { section: id })
          }
        } else if (sectionTimers[id]) {
          // Section left viewport — report time spent
          const duration = Math.round((Date.now() - sectionTimers[id]) / 1000)
          if (duration > 1) {
            sendEvent('section_time', { section: id, seconds: duration })
          }
          delete sectionTimers[id]
        }
      })
    },
    { threshold: 0.3 }
  )

  // Observe all <section> elements with an id
  document.querySelectorAll('section[id]').forEach((el) => {
    sectionObserver!.observe(el)
  })
}

/* ── Social link click ── */
export function trackSocialClick(platform: string, href: string) {
  sendEvent('social_click', { platform, href })
  umamiTrack('social-click', { platform, href })
}

/* ── Contact form submit ── */
export function trackContactSubmit() {
  sendEvent('contact_submit', { device: getDeviceInfo() })
  umamiTrack('contact-submit')
}

/* ── Cleanup ── */
export function destroyAnalytics() {
  sectionObserver?.disconnect()

  // Flush any remaining section times on page unload
  Object.entries(sectionTimers).forEach(([id, start]) => {
    const duration = Math.round((Date.now() - start) / 1000)
    if (duration > 1) {
      sendEvent('section_time', { section: id, seconds: duration })
    }
  })
}

/* ── Init everything ── */
export function initAnalytics() {
  if (typeof window === 'undefined') return

  trackPageView()

  // Delay section observer until DOM is painted
  requestAnimationFrame(() => {
    setTimeout(observeSections, 1000)
  })

  // Flush on page unload
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      destroyAnalytics()
    }
  })
}
