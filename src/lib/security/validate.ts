/**
 * Input validation and sanitization utilities.
 * 
 * All user input MUST be sanitized before being stored in the database
 * or rendered in the frontend to prevent XSS and injection attacks.
 */

/**
 * Strip HTML tags from a string to prevent XSS.
 */
export function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim()
}

/**
 * Validate email format.
 */
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validate phone number format (international).
 */
export function validatePhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,20}$/.test(phone)
}

/**
 * Validate UUID format.
 */
export function validateUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

/**
 * Validate a slug (URL-safe string).
 */
export function validateSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

/**
 * Validate a positive integer.
 */
export function validatePositiveInt(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
}

/**
 * Validate a price (positive number with up to 2 decimal places).
 */
export function validatePrice(value: unknown): value is number {
  return typeof value === 'number' && value >= 0 && Number.isFinite(value)
}

/**
 * Sanitize an object by stripping HTML from all string values.
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj }
  for (const key of Object.keys(sanitized)) {
    const value = sanitized[key]
    if (typeof value === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitize(value)
    }
  }
  return sanitized
}
