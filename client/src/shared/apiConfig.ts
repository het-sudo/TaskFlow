// Server root URL (no /api/v1). Use the same value for REST + Socket.IO.
const DEFAULT_SERVER = "http://localhost:9000"

export function getServerUrl(): string {
  const url = import.meta.env.VITE_API_URL || DEFAULT_SERVER
  return url.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "")
}

export function getApiBaseUrl(): string {
  return `${getServerUrl()}/api/v1/`
}
