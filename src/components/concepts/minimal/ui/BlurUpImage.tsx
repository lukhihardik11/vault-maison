'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from 'react'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

export interface BlurUpImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string
  alt: string
  containerClassName?: string
  containerStyle?: CSSProperties
}

export default function BlurUpImage({
  src,
  alt,
  containerClassName,
  containerStyle,
  style,
  onLoad,
  onError,
  ...rest
}: BlurUpImageProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Cache-hit + abort-safety handling.
  //
  // 1. `onLoad` does NOT fire for images that are already in the
  //    browser cache and complete before React attaches the handler.
  //    Sync-check `img.complete && img.naturalWidth > 0` after mount
  //    to flip `loaded = true` for those cache-hit cases.
  //
  // 2. Some browsers (notably iOS Safari under intermittent network)
  //    will silently *skip* both `onLoad` and `onError` for aborted
  //    requests — the image stays in a half-decoded purgatory. The
  //    1.8 s safety net below force-clears the blur regardless. The
  //    user gets either the photo or the native broken-image glyph,
  //    neither of which is a "stuck blurred" tile.
  //
  // 3. `decode()` (where supported) is awaited as the most reliable
  //    signal that the bitmap is ready for paint; older browsers fall
  //    through to the timeout / event handler combo.
  // Cache-hit + abort-safety detection. Cached images never fire
  // `onLoad` (the bitmap is already on the page when React attaches
  // its handler), so we sync-check `img.complete` after mount and
  // flip `loaded` to `true` for those cases. We funnel both code
  // paths through helper closures so React 19's `set-state-in-
  // effect` rule sees the calls as deferred, not synchronous body
  // execution — same behaviour, no lint suppression needed.
  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    let cancelled = false
    const markLoaded = () => {
      if (!cancelled) setLoaded(true)
    }
    const markUnloaded = () => {
      if (!cancelled) setLoaded(false)
    }
    const safety = window.setTimeout(markLoaded, 800)

    if (img.complete && img.naturalWidth > 0) {
      markLoaded()
    } else {
      markUnloaded()
      if (typeof img.decode === 'function') {
        img.decode().then(markLoaded, markLoaded)
      }
    }

    return () => {
      cancelled = true
      window.clearTimeout(safety)
    }
  }, [src])

  return (
    <div
      className={containerClassName}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#E5E5E5',
        ...containerStyle,
      }}
    >
      <img
        {...rest}
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
        onError={(event) => {
          // Still flip loaded so the user sees the native broken-image
          // glyph instead of an indefinite blur.
          setLoaded(true)
          onError?.(event)
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loaded ? 1 : 0.92,
          filter: loaded ? 'blur(0px)' : 'blur(8px)',
          transform: loaded ? 'scale(1)' : 'scale(1.02)',
          transition: prefersReducedMotion
            ? 'none'
            : 'opacity 240ms ease, filter 320ms ease, transform 320ms ease',
          ...style,
        }}
      />
    </div>
  )
}
