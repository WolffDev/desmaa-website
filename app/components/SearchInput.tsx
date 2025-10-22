import { ChangeEvent, useState } from 'react'
import { SearchIcon } from './icons'

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
}

/**
 * Search input component with icon
 * Calls onSearch callback as user types
 */
export function SearchInput({
  onSearch,
  placeholder = 'Indtast navn på en sang',
}: SearchInputProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="w-full flex flex-col items-center mb-8 text-center">
      <h1 className="text-heading-3 sm:text-heading-1 font-bold mb-4 text-on-bg-light dark:text-on-bg-dark">
        Søg efter en sang
      </h1>

      <div className="relative w-full max-w-md">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-5 py-3 pr-12 text-lg text-center border border-on-bg-light/30 dark:border-on-bg-dark/30 rounded-lg bg-white dark:bg-gray-800 text-on-bg-light dark:text-on-bg-dark placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          autoComplete="off"
        />
        <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {query && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Søger efter: <span className="font-semibold">{query}</span>
        </p>
      )}
    </div>
  )
}
