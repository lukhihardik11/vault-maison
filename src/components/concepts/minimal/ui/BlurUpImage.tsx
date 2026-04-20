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

  // Cache-hit handling.
  //
  // The `<img>` `onLoad` event does NOT fire for images that are already
  // in the browser cache and complete before React attaches the handler.
  // When that happens, `loaded` stays `false` forever and the image
  // renders permanently at `blur(14px)` / opacity 0.82 — the "stuck
  // blurred" bug the user was seeing in QuickView and the PDP thumbnails.
  //
  // Fix: after mount / src change, sync-check `img.complete` and flip
  // `loaded` to `true` if the browser already decoded the image. For
  // uncached images `complete` is `false` here, so we fall back to the
  // `onLoad` handler as before. Errored images also get `loaded = true`
  // to stop the endless blur-pulse (we'd rather show a broken-image
  // icon than a perpetual loading state).
  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true)
      return
    }
    // Uncached — reset to blurred and wait for the image to decode.
    setLoaded(false)
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
          opacity: loaded ? 1 : 0.82,
          filter: loaded ? 'blur(0px)' : 'blur(14px)',
          transform: loaded ? 'scale(1)' : 'scale(1.04)',
          transition: prefersReducedMotion
            ? 'none'
            : 'opacity 240ms ease, filter 320ms ease, transform 320ms ease',
          ...style,
        }}
      />
    </div>
  )
}
