/**
 * In-memory rate limiter for API routes.
 * 
 * For production at scale, replace with Redis-based rate limiting
 * (e.g., @upstash/ratelimit). This in-memory implementation is
 * suitable for single-instance deployments and Vercel serverless
 * functions (which share memory within a single invocation context).
 */

interface RateLimitRecord {
  count: number
  resetAt: number
}

const rateLimit = new Map<string, RateLimitRecord>()

// Periodically clean up expired entries to prevent memory leaks
const CLEANUP_INTERVAL = 60_000 // 1 minute
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, record] of rateLimit.entries()) {
    if (now > record.resetAt) {
      rateLimit.delete(key)
    }
  }
}

/**
 * Check if a request from the given IP is within the rate limit.
 * @param ip - The client IP address
 * @param maxRequests - Maximum requests allowed in the window (default: 100)
 * @param windowMs - Time window in milliseconds (default: 60 seconds)
 * @returns true if the request is allowed, false if rate limited
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 100,
  windowMs: number = 60_000
): boolean {
  cleanup()

  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) return false
  record.count++
  return true
}

/**
 * Get remaining requests for an IP.
 */
export function getRemainingRequests(
  ip: string,
  maxRequests: number = 100
): number {
  const record = rateLimit.get(ip)
  if (!record || Date.now() > record.resetAt) return maxRequests
  return Math.max(0, maxRequests - record.count)
}
