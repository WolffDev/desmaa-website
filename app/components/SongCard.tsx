import { Link } from '@tanstack/react-router'
import { useFavorites } from '~/hooks/useFavorites'
import { HeartIcon } from './icons'
import { cn } from '~/utils/cn'

interface SongCardProps {
  slug: string
  title: string
  description?: string
  className?: string
}

/**
 * Song card component displaying song information
 * Includes favorite button and link to song page
 */
export function SongCard({ slug, title, description, className }: SongCardProps) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites(slug)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(slug, title)
  }

  return (
    <div
      className={cn(
        'relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-transparent hover:border-primary/20',
        className
      )}
    >
      {mounted && (
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 text-primary hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}
        >
          <HeartIcon className="w-6 h-6" filled={isFavorite} />
        </button>
      )}

      <Link
        to="/sange/$slug"
        params={{ slug }}
        className="block group"
      >
        <h3 className="text-xl font-semibold mb-2 pr-8 text-on-bg-light dark:text-on-bg-dark group-hover:text-primary transition-colors">
          {title}
        </h3>

        {description && description.trim() !== '' && (
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-sm">
            {description}
          </p>
        )}
      </Link>
    </div>
  )
}
