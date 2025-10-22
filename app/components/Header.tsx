import { Link } from '@tanstack/react-router'
import { useDarkMode } from '~/hooks/useDarkMode'
import { MoonIcon, SunIcon, HeartIcon } from './icons'

/**
 * Header component with navigation and dark mode toggle
 * Fixed position at top of page
 */
export function Header() {
  const { isDark, toggleDark, mounted } = useDarkMode()

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-semibold text-on-surface-light dark:text-on-surface-dark hover:text-primary dark:hover:text-primary transition-colors"
          >
            De Smaa
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/favorit"
              className="text-on-surface-light dark:text-on-surface-dark hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Favoritter"
            >
              <HeartIcon className="w-6 h-6" />
            </Link>

            {mounted && (
              <button
                onClick={toggleDark}
                className="p-2 rounded-full bg-bg-light dark:bg-bg-dark hover:bg-ui-light dark:hover:bg-gray-800 transition-colors"
                aria-label={isDark ? 'Skift til lys tilstand' : 'Skift til mørk tilstand'}
              >
                {isDark ? (
                  <SunIcon className="w-5 h-5 text-yellow-500" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
