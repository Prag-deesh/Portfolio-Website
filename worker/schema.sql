-- Analytics events table
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  url TEXT,

  -- Geo (from Cloudflare headers — accurate city-level)
  ip TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  isp TEXT,
  postal_code TEXT,
  latitude REAL,
  longitude REAL,

  -- Device
  screen TEXT,
  viewport TEXT,
  dpr REAL,
  platform TEXT,
  user_agent TEXT,
  language TEXT,
  touch_points INTEGER,
  device_memory REAL,
  cpu_cores INTEGER,

  -- Network
  connection_type TEXT,
  connection_speed REAL,
  network_type TEXT,

  -- Context
  timezone TEXT,
  referrer TEXT,
  section TEXT,
  seconds INTEGER,
  social_platform TEXT,
  social_href TEXT,

  created_at TEXT DEFAULT (datetime('now'))
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_events_event ON events(event);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp);
CREATE INDEX IF NOT EXISTS idx_events_country ON events(country);
