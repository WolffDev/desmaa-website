import { useEffect, useState } from 'react'

export interface FavoriteSong {
  slug: string
  title: string
}

const FAV_KEY = 'FAV_SONGS'

/**
 * Custom hook for managing favorite songs
 * Stores favorites in localStorage and provides methods to add/remove
 *
 * @param slug - Optional slug to check if this song is favorited
 * @returns {Object} Methods and state for managing favorites
 */
export function useFavorites(slug?: string) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [favorites, setFavorites] = useState<Record<string, FavoriteSong>>({})
  const [mounted, setMounted] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    setMounted(true)

    const stored = localStorage.getItem(FAV_KEY)
    const favs = stored ? JSON.parse(stored) : {}
    setFavorites(favs)

    if (slug) {
      setIsFavorite(!!favs[slug])
    }
  }, [slug])

  /**
   * Toggle favorite status for a song
   */
  const toggleFavorite = (songSlug: string, title: string) => {
    if (!mounted) return

    const newFavs = { ...favorites }

    if (newFavs[songSlug]) {
      delete newFavs[songSlug]
      if (songSlug === slug) {
        setIsFavorite(false)
      }
    } else {
      newFavs[songSlug] = { slug: songSlug, title }
      if (songSlug === slug) {
        setIsFavorite(true)
      }
    }

    setFavorites(newFavs)
    localStorage.setItem(FAV_KEY, JSON.stringify(newFavs))
  }

  /**
   * Get array of all favorited songs
   */
  const getFavoritesList = (): FavoriteSong[] => {
    return Object.values(favorites)
  }

  /**
   * Check if a specific song is favorited
   */
  const checkIsFavorite = (songSlug: string): boolean => {
    return !!favorites[songSlug]
  }

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    if (!mounted) return

    setFavorites({})
    setIsFavorite(false)
    localStorage.setItem(FAV_KEY, JSON.stringify({}))
  }

  return {
    isFavorite,
    favorites,
    toggleFavorite,
    getFavoritesList,
    checkIsFavorite,
    clearFavorites,
    mounted,
  }
}
