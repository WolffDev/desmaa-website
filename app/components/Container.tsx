import { ReactNode } from 'react'
import { cn } from '~/utils/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Container component for consistent max-width and padding
 * Provides responsive padding and centers content
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
