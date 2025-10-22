import Plausible from 'plausible-tracker'

// Initialize Plausible tracker
const plausible = Plausible({
  domain: 'desmaa.dk',
  apiHost: 'https://plausible.io',
  trackLocalhost: false,
})

/**
 * Analytics utility for tracking page views and custom events
 * Uses Plausible Analytics (privacy-friendly alternative to Google Analytics)
 */
export const analytics = {
  /**
   * Track a page view
   * Call this on route changes
   */
  trackPageview: (options?: { url?: string; referrer?: string }) => {
    if (typeof window === 'undefined') return
    plausible.trackPageview(options)
  },

  /**
   * Track a custom event
   * @param eventName - Name of the event (e.g., 'Song Favorite Added')
   * @param props - Optional properties to attach to the event
   */
  trackEvent: (
    eventName: string,
    props?: Record<string, string | number | boolean>
  ) => {
    if (typeof window === 'undefined') return
    plausible.trackEvent(eventName, { props })
  },

  /**
   * Enable automatic pageview tracking
   * This will track all navigation events automatically
   */
  enableAutoPageviews: () => {
    if (typeof window === 'undefined') return
    plausible.enableAutoPageviews()
  },

  /**
   * Enable automatic outbound link click tracking
   */
  enableAutoOutboundTracking: () => {
    if (typeof window === 'undefined') return
    plausible.enableAutoOutboundTracking()
  },
}

// Custom event helpers
export const trackSongView = (slug: string, title: string) => {
  analytics.trackEvent('Song View', { slug, title })
}

export const trackFavoriteAdded = (slug: string, title: string) => {
  analytics.trackEvent('Favorite Added', { slug, title })
}

export const trackFavoriteRemoved = (slug: string, title: string) => {
  analytics.trackEvent('Favorite Removed', { slug, title })
}

export const trackSearch = (query: string, resultsCount: number) => {
  analytics.trackEvent('Search', { query, resultsCount })
}

export const trackYouTubeClick = (slug: string, title: string) => {
  analytics.trackEvent('YouTube Click', { slug, title })
}
