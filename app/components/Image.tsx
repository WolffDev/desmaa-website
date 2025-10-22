import { cn } from '~/utils/cn'

interface ImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

/**
 * Optimized image component with lazy loading
 * Includes loading state and proper accessibility
 */
export function Image({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-cover', className)}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
