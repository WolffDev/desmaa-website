# TanStack Start Migration Plan

## Executive Summary

This document outlines the complete migration strategy from **Gatsby** to **TanStack Start** for the De Smaa (desmaa.dk) children's songs website. The migration will modernize the tech stack while preserving all existing functionality and adding new features.

---

## Current vs. Target Stack

| Aspect | Current (Gatsby) | Target (TanStack Start) |
|--------|------------------|------------------------|
| **Framework** | Gatsby v4 | TanStack Start (React 18+) |
| **Routing** | Gatsby page system + gatsby-node.js | File-based routing (`@tanstack/react-router`) |
| **Styling** | styled-components + CSS variables | TailwindCSS v3+ with custom theme |
| **Data Fetching** | GraphQL (gatsby-transformer-json) | File system + TanStack Query |
| **Content Format** | JSON files (218 songs) | Markdown files with YAML frontmatter |
| **Dark Mode** | gatsby-plugin-dark-mode | Custom hook with localStorage + Tailwind |
| **State Management** | React useState + localStorage | TanStack Query + localStorage |
| **Build Output** | Static HTML (SSG) | Static HTML with prerendering |
| **YouTube** | react-youtube embed | Simple link to YouTube |
| **New Features** | - | PWA, Image optimization, Plausible analytics |

---

## Prerequisites

### Required Knowledge
- TanStack Start fundamentals
- TanStack Router file-based routing
- TanStack Query for data fetching
- TailwindCSS configuration
- Static prerendering concepts

### Development Environment
- Node.js v18+ (upgrade from v14.17.3)
- pnpm (recommended) or npm

---

## Migration Phases

The migration is divided into **8 distinct phases** for systematic execution:

### **Phase 1: Project Initialization & Setup**

**Goal**: Set up the new TanStack Start project with all necessary dependencies and configuration.

#### Step 1.1: Initialize TanStack Start Project
```bash
# Create new TanStack Start project
npx create-tanstack-start@latest desmaa-tanstack
cd desmaa-tanstack
```

#### Step 1.2: Install Core Dependencies
```bash
# Core dependencies
pnpm add @tanstack/react-router @tanstack/react-query
pnpm add react react-dom
pnpm add vinxi

# TailwindCSS and utilities
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D @tailwindcss/typography
pnpm add class-variance-authority clsx tailwind-merge

# Content and markdown processing
pnpm add gray-matter reading-time
pnpm add -D @types/node

# PWA support
pnpm add -D vite-plugin-pwa

# Analytics (Plausible)
pnpm add plausible-tracker

# Utility libraries
pnpm add date-fns
```

#### Step 1.3: Configure TailwindCSS
Create `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors from existing design
        primary: '#fc5a30',
        secondary: '#fba438',
        // Light mode
        'bg-light': 'rgb(240, 240, 240)',
        'surface-light': 'rgba(121, 121, 121, 0.56)',
        'on-bg-light': '#3e3e3e',
        // Dark mode
        'bg-dark': '#121212',
        'surface-dark': 'rgba(51, 51, 51, 0.91)',
        'on-bg-dark': '#ffffff',
      },
      fontFamily: {
        sans: ['Century Gothic', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        sm: '13px',
        base: '16px',
        lg: '18px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
```

#### Step 1.4: Configure TanStack Start
Create/modify `app.config.ts`:
```typescript
import { defineConfig } from '@tanstack/start/config'
import vitePWA from 'vite-plugin-pwa'

export default defineConfig({
  vite: {
    plugins: [
      vitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'De Smaa - Børnesange',
          short_name: 'De Smaa',
          description: 'Samling af danske børnesange',
          theme_color: '#fc5a30',
          icons: [
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
  },
})
```

---

### **Phase 2: Content Migration**

**Goal**: Convert all 218 JSON song files to Markdown format with YAML frontmatter.

#### Step 2.1: Create Content Directory Structure
```
app/
  content/
    songs/
      abc.md
      abel-spendabel.md
      ... (216 more files)
```

#### Step 2.2: Create Migration Script
Create `scripts/migrate-songs.ts`:
```typescript
import fs from 'fs/promises'
import path from 'path'

interface SongJSON {
  title: string
  videoUrl: string
  author: string
  music: string
  songVers: string[][]
  description: string
  tags: string[]
  slug: string
  layout: string
  date: number
}

async function migrateSong(jsonPath: string, outputDir: string) {
  const content = await fs.readFile(jsonPath, 'utf-8')
  const song: SongJSON = JSON.parse(content)

  // Extract YouTube video ID if present
  let youtubeLink = ''
  if (!song.videoUrl.includes('none')) {
    const videoId = song.videoUrl.match(/embed\/([^?]+)/)?.[1]
    youtubeLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : ''
  }

  // Build markdown content
  const frontmatter = `---
title: "${song.title}"
slug: "${song.slug}"
date: ${new Date(song.date).toISOString()}
author: "${song.author}"
music: "${song.music}"
description: "${song.description}"
tags: [${song.tags.map(t => `"${t}"`).join(', ')}]
youtubeUrl: "${youtubeLink}"
---

`

  // Convert verses to markdown
  const verses = song.songVers
    .map((verse, idx) => verse.join('  \n'))
    .join('\n\n')

  const markdown = frontmatter + verses

  const outputPath = path.join(outputDir, `${song.slug}.md`)
  await fs.writeFile(outputPath, markdown, 'utf-8')
}

async function migrateAll() {
  const songsDir = path.join(process.cwd(), 'src/content/songs')
  const outputDir = path.join(process.cwd(), 'app/content/songs')

  await fs.mkdir(outputDir, { recursive: true })

  const files = await fs.readdir(songsDir)
  const jsonFiles = files.filter(f => f.endsWith('.json'))

  for (const file of jsonFiles) {
    await migrateSong(path.join(songsDir, file), outputDir)
  }

  console.log(`Migrated ${jsonFiles.length} songs to Markdown`)
}

migrateAll()
```

#### Step 2.3: Run Migration
```bash
tsx scripts/migrate-songs.ts
```

#### Step 2.4: Create Content Utilities
Create `app/utils/content.ts`:
```typescript
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface Song {
  slug: string
  title: string
  description: string
  author: string
  music: string
  date: string
  tags: string[]
  youtubeUrl: string
  content: string
  verses: string[][]
}

const SONGS_DIR = path.join(process.cwd(), 'app/content/songs')

export async function getAllSongs(): Promise<Song[]> {
  const files = await fs.readdir(SONGS_DIR)
  const songFiles = files.filter(f => f.endsWith('.md'))

  const songs = await Promise.all(
    songFiles.map(async (file) => {
      const filePath = path.join(SONGS_DIR, file)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      // Parse verses from markdown content
      const verses = content
        .trim()
        .split('\n\n')
        .map(verse => verse.split('  \n'))

      return {
        slug: data.slug,
        title: data.title,
        description: data.description,
        author: data.author,
        music: data.music,
        date: data.date,
        tags: data.tags,
        youtubeUrl: data.youtubeUrl,
        content,
        verses,
      } as Song
    })
  )

  // Sort by title
  return songs.sort((a, b) => a.title.localeCompare(b.title, 'da-DK'))
}

export async function getSongBySlug(slug: string): Promise<Song | null> {
  try {
    const filePath = path.join(SONGS_DIR, `${slug}.md`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const verses = content
      .trim()
      .split('\n\n')
      .map(verse => verse.split('  \n'))

    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      author: data.author,
      music: data.music,
      date: data.date,
      tags: data.tags,
      youtubeUrl: data.youtubeUrl,
      content,
      verses,
    }
  } catch (error) {
    return null
  }
}

export async function getAllSongSlugs(): Promise<string[]> {
  const files = await fs.readdir(SONGS_DIR)
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
}
```

---

### **Phase 3: Core UI Components**

**Goal**: Build reusable UI components with TailwindCSS.

#### Step 3.1: Create Utility Functions
Create `app/utils/cn.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### Step 3.2: Dark Mode Hook
Create `app/hooks/useDarkMode.ts`:
```typescript
import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage and system preference
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = stored === 'dark' || (!stored && prefersDark)

    setIsDark(initialDark)
    document.documentElement.classList.toggle('dark', initialDark)
  }, [])

  const toggleDark = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newDark)
  }

  return { isDark, toggleDark }
}
```

#### Step 3.3: Favorites Hook
Create `app/hooks/useFavorites.ts`:
```typescript
import { useEffect, useState } from 'react'

export interface FavoriteSong {
  slug: string
  title: string
}

const FAV_KEY = 'FAV_SONGS'

export function useFavorites(slug?: string) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [favorites, setFavorites] = useState<Record<string, FavoriteSong>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = localStorage.getItem(FAV_KEY)
    const favs = stored ? JSON.parse(stored) : {}
    setFavorites(favs)

    if (slug) {
      setIsFavorite(!!favs[slug])
    }
  }, [slug])

  const toggleFavorite = (songSlug: string, title: string) => {
    const newFavs = { ...favorites }

    if (newFavs[songSlug]) {
      delete newFavs[songSlug]
      setIsFavorite(false)
    } else {
      newFavs[songSlug] = { slug: songSlug, title }
      setIsFavorite(true)
    }

    setFavorites(newFavs)
    localStorage.setItem(FAV_KEY, JSON.stringify(newFavs))
  }

  const getFavoritesList = (): FavoriteSong[] => {
    return Object.values(favorites)
  }

  return { isFavorite, toggleFavorite, getFavoritesList }
}
```

#### Step 3.4: Core Components
Create the following components in `app/components/`:

**Container.tsx**
```typescript
import { cn } from '~/utils/cn'

export function Container({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
```

**Header.tsx**
```typescript
import { Link } from '@tanstack/react-router'
import { useDarkMode } from '~/hooks/useDarkMode'
import { MoonIcon, SunIcon, HeartIcon } from './icons'

export function Header() {
  const { isDark, toggleDark } = useDarkMode()

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-surface-light dark:bg-surface-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-semibold text-on-bg-light dark:text-on-bg-dark"
          >
            De Smaa
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/favorit"
              className="text-on-bg-light dark:text-on-bg-dark hover:text-primary"
            >
              <HeartIcon className="w-6 h-6" />
            </Link>

            <button
              onClick={toggleDark}
              className="p-2 rounded-full bg-bg-light dark:bg-bg-dark"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
```

**SearchInput.tsx**
```typescript
import { useState } from 'react'

interface SearchInputProps {
  onSearch: (query: string) => void
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="w-full flex flex-col items-center mb-8 text-center">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4">
        Søg efter en sang
      </h1>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Indtast navn på en sang"
        className="w-full max-w-md px-5 py-3 text-lg text-center border border-on-bg-light dark:border-on-bg-dark rounded-lg bg-bg-light dark:bg-bg-dark"
      />
    </div>
  )
}
```

**SongCard.tsx**
```typescript
import { Link } from '@tanstack/react-router'
import { useFavorites } from '~/hooks/useFavorites'
import { HeartIcon } from './icons'

interface SongCardProps {
  slug: string
  title: string
  description: string
}

export function SongCard({ slug, title, description }: SongCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites(slug)

  return (
    <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <button
        onClick={() => toggleFavorite(slug, title)}
        className="absolute top-4 right-4 text-primary"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <HeartIcon
          className="w-6 h-6"
          filled={isFavorite}
        />
      </button>

      <Link
        to="/sange/$slug"
        params={{ slug }}
        className="block"
      >
        <h3 className="text-xl font-semibold mb-2 pr-8">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
          {description}
        </p>
      </Link>
    </div>
  )
}
```

**Icons** (Create `app/components/icons.tsx`):
```typescript
export function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  )
}

export function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  )
}

export function HeartIcon({
  className,
  filled
}: {
  className?: string
  filled?: boolean
}) {
  return (
    <svg
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )
}
```

---

### **Phase 4: Routing & Pages**

**Goal**: Set up file-based routing with TanStack Router and create all pages.

#### Step 4.1: Root Route
Create `app/routes/__root.tsx`:
```typescript
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Header } from '~/components/Header'
import '~/styles/globals.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-on-bg-light dark:text-on-bg-dark">
      <Header />
      <main className="pt-20 pb-12">
        <Outlet />
      </main>
      <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} De Smaa. Background image from balasoiu - www.freepik.com</p>
      </footer>
    </div>
  )
}
```

#### Step 4.2: Home Page (Index)
Create `app/routes/index.tsx`:
```typescript
import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { getAllSongs } from '~/utils/content'
import { Container } from '~/components/Container'
import { SearchInput } from '~/components/SearchInput'
import { SongCard } from '~/components/SongCard'

export const Route = createFileRoute('/')({
  loader: async () => {
    const songs = await getAllSongs()
    return { songs }
  },
  component: IndexComponent,
})

function IndexComponent() {
  const { songs } = Route.useLoaderData()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSongs = useMemo(() => {
    if (!searchQuery) return songs

    const query = searchQuery.toLowerCase()
    return songs.filter(song =>
      song.title.toLowerCase().includes(query)
    )
  }, [songs, searchQuery])

  return (
    <Container>
      <SearchInput onSearch={setSearchQuery} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSongs.map(song => (
          <SongCard
            key={song.slug}
            slug={song.slug}
            title={song.title}
            description={song.description}
          />
        ))}
      </div>
    </Container>
  )
}
```

#### Step 4.3: Individual Song Page with Static Prerendering
Create `app/routes/sange.$slug.tsx`:
```typescript
import { createFileRoute } from '@tanstack/react-router'
import { getSongBySlug, getAllSongSlugs } from '~/utils/content'
import { Container } from '~/components/Container'
import { useFavorites } from '~/hooks/useFavorites'
import { HeartIcon } from '~/components/icons'

export const Route = createFileRoute('/sange/$slug')({
  loader: async ({ params }) => {
    const song = await getSongBySlug(params.slug)
    if (!song) throw new Error('Song not found')
    return { song }
  },
  staticData: async () => {
    // This enables static prerendering for all songs
    const slugs = await getAllSongSlugs()
    return slugs.map(slug => ({ slug }))
  },
  component: SongComponent,
})

function SongComponent() {
  const { song } = Route.useLoaderData()
  const { isFavorite, toggleFavorite } = useFavorites(song.slug)

  return (
    <Container className="max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-4">
        {song.title}
      </h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
        <span>
          Sang tilføjet d. {new Date(song.date).toLocaleDateString('da-DK', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        {!song.author.includes('none') && <span>Tekst: {song.author}</span>}
        {!song.music.includes('none') && <span>Musik: {song.music}</span>}
      </div>

      {!song.description.includes('null') && (
        <p className="max-w-2xl mx-auto text-center mb-6">
          {song.description}
        </p>
      )}

      <div className="flex items-center gap-2 max-w-2xl mx-auto mb-8">
        <button
          onClick={() => toggleFavorite(song.slug, song.title)}
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <HeartIcon className="w-6 h-6" filled={isFavorite} />
          <span>{isFavorite ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}</span>
        </button>
      </div>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <div className="grid grid-cols-[1fr_auto_1fr] my-8">
        <div className="col-start-2">
          {song.verses.map((verse, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              {verse.map((line, lineIdx) => (
                <p key={lineIdx} className="mb-1">{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      {song.youtubeUrl && (
        <div className="text-center">
          <a
            href={song.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Se på YouTube
          </a>
        </div>
      )}
    </Container>
  )
}
```

#### Step 4.4: Favorites Page
Create `app/routes/favorit.tsx`:
```typescript
import { createFileRoute } from '@tanstack/react-router'
import { Container } from '~/components/Container'
import { SongCard } from '~/components/SongCard'
import { useFavorites } from '~/hooks/useFavorites'

export const Route = createFileRoute('/favorit')({
  component: FavoritComponent,
})

function FavoritComponent() {
  const { getFavoritesList } = useFavorites()
  const favorites = getFavoritesList()

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center mb-8">
        Favorit side
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Du har ikke tilføjet nogen sange til din favoritliste endnu.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(fav => (
            <SongCard
              key={fav.slug}
              slug={fav.slug}
              title={fav.title}
              description=""
            />
          ))}
        </div>
      )}
    </Container>
  )
}
```

#### Step 4.5: 404 Page
Create `app/routes/404.tsx`:
```typescript
import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '~/components/Container'

export const Route = createFileRoute('/404')({
  component: NotFoundComponent,
})

function NotFoundComponent() {
  return (
    <Container className="text-center py-20">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Siden blev ikke fundet</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
      >
        Gå til forsiden
      </Link>
    </Container>
  )
}
```

---

### **Phase 5: Analytics & SEO**

**Goal**: Integrate Plausible analytics and set up proper SEO/meta tags.

#### Step 5.1: Plausible Analytics
Create `app/utils/analytics.ts`:
```typescript
import Plausible from 'plausible-tracker'

const plausible = Plausible({
  domain: 'desmaa.dk',
  apiHost: 'https://plausible.io',
})

export const analytics = {
  trackPageview: plausible.trackPageview,
  trackEvent: plausible.trackEvent,
}
```

Update `app/routes/__root.tsx` to track pageviews:
```typescript
import { useEffect } from 'react'
import { analytics } from '~/utils/analytics'

// In RootComponent:
useEffect(() => {
  analytics.trackPageview()
}, [])
```

#### Step 5.2: SEO Meta Tags
Create `app/components/SEO.tsx`:
```typescript
interface SEOProps {
  title?: string
  description?: string
  keywords?: string
}

export function SEO({
  title = 'De Smaa - Danske Børnesange',
  description = 'Samling af danske børnesange med tekster',
  keywords = 'sange, børn, godnat, godnat sange, sange til børn'
}: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  )
}
```

Use in routes:
```typescript
import { SEO } from '~/components/SEO'

// In component:
return (
  <>
    <SEO title={song.title} description={song.description} />
    {/* rest of component */}
  </>
)
```

---

### **Phase 6: Image Optimization**

**Goal**: Add optimized images for better performance.

#### Step 6.1: Add Sharp for Image Processing
```bash
pnpm add sharp
```

#### Step 6.2: Create Image Component
Create `app/components/Image.tsx`:
```typescript
interface ImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function Image({ src, alt, className, width, height }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  )
}
```

#### Step 6.3: Add Icons and Favicon
- Create PWA icons (192x192, 512x512) in `public/`
- Add favicon.ico in `public/`
- Add apple-touch-icon.png

---

### **Phase 7: Testing & Quality Assurance**

**Goal**: Ensure all functionality works correctly and performance is optimized.

#### Step 7.1: Manual Testing Checklist
- [ ] Home page loads with all 218 songs
- [ ] Search filters songs correctly
- [ ] Individual song pages load with correct content
- [ ] YouTube links work
- [ ] Dark mode toggles correctly and persists
- [ ] Favorites can be added/removed
- [ ] Favorites persist in localStorage
- [ ] Favorites page shows correct songs
- [ ] Navigation works between all pages
- [ ] 404 page shows for invalid routes
- [ ] Mobile responsive design works
- [ ] PWA installs correctly
- [ ] Plausible analytics tracks pageviews

#### Step 7.2: Performance Testing
```bash
# Build for production
pnpm build

# Test production build
pnpm start
```

Run Lighthouse audits:
- Performance: Target 90+
- Accessibility: Target 100
- Best Practices: Target 100
- SEO: Target 100

#### Step 7.3: Static Prerendering Verification
Verify that all 218 song pages are pre-rendered:
```bash
# Check build output
ls -la .output/public/sange/
```

Should contain 218 HTML files.

---

### **Phase 8: Deployment**

**Goal**: Deploy the application to production.

#### Step 8.1: Environment Variables
Create `.env.production`:
```
VITE_PLAUSIBLE_DOMAIN=desmaa.dk
```

#### Step 8.2: Build Configuration
Update `package.json`:
```json
{
  "scripts": {
    "dev": "vinxi dev",
    "build": "vinxi build",
    "start": "vinxi start",
    "preview": "vinxi preview"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### Step 8.3: Deployment Options

**Option A: Vercel**
```bash
pnpm add -D vercel
npx vercel
```

**Option B: Netlify**
Create `netlify.toml`:
```toml
[build]
  command = "pnpm build"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Option C: Cloudflare Pages**
- Connect GitHub repo
- Set build command: `pnpm build`
- Set output directory: `.output/public`

#### Step 8.4: DNS & Domain
- Point desmaa.dk to new hosting
- Verify SSL certificate
- Test production domain

---

## Migration Execution Timeline

| Phase | Estimated Time | Dependencies |
|-------|---------------|--------------|
| Phase 1: Setup | 2-3 hours | None |
| Phase 2: Content Migration | 1-2 hours | Phase 1 |
| Phase 3: Components | 3-4 hours | Phase 1 |
| Phase 4: Routing & Pages | 4-5 hours | Phase 2, 3 |
| Phase 5: Analytics & SEO | 1-2 hours | Phase 4 |
| Phase 6: Images | 1-2 hours | Phase 3 |
| Phase 7: Testing | 2-3 hours | All phases |
| Phase 8: Deployment | 1-2 hours | Phase 7 |
| **Total** | **15-23 hours** | - |

---

## Risk Mitigation

### Potential Issues & Solutions

1. **Static Prerendering Fails**
   - Solution: Check `staticData` function returns correct format
   - Verify all content files are valid markdown
   - Test with small subset first (10 songs)

2. **localStorage SSR Issues**
   - Solution: All localStorage code wrapped in `useEffect` or client checks
   - Use `typeof window !== 'undefined'` guards

3. **Dark Mode Flash on Load**
   - Solution: Add inline script in root HTML to set class before React loads
   - Store preference in localStorage

4. **Large Bundle Size**
   - Solution: Use dynamic imports for heavy components
   - Tree-shake unused TailwindCSS classes
   - Analyze bundle with `pnpm build --analyze`

5. **Node Version Compatibility**
   - Solution: Upgrade hosting to Node 18+
   - Update local environment
   - Test with correct Node version

---

## Post-Migration Checklist

- [ ] Verify all 218 songs load correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Verify analytics tracking in Plausible dashboard
- [ ] Check PWA installation on mobile
- [ ] Run full Lighthouse audit
- [ ] Test with slow 3G network throttling
- [ ] Verify all external links work (YouTube)
- [ ] Check console for errors
- [ ] Verify sitemap generation
- [ ] Submit new sitemap to Google Search Console
- [ ] Monitor server logs for errors
- [ ] Set up error tracking (e.g., Sentry)

---

## Rollback Plan

If critical issues arise:

1. **Keep old Gatsby site running** during migration
2. **Use DNS to switch** between old and new
3. **Have backup of old codebase** ready to redeploy
4. **Document any data migration** (localStorage structure)
5. **Communicate with users** if downtime expected

---

## Additional Resources

- TanStack Start Docs: https://tanstack.com/start/latest
- TanStack Router Docs: https://tanstack.com/router/latest
- TanStack Query Docs: https://tanstack.com/query/latest
- TailwindCSS Docs: https://tailwindcss.com/docs
- Plausible Docs: https://plausible.io/docs
- PWA Docs: https://vite-pwa-org.netlify.app/

---

## Notes

- This migration maintains all existing functionality
- Design is modernized using TailwindCSS patterns
- New features added: PWA, Analytics, Image optimization
- Static prerendering ensures fast page loads for all 218 songs
- Dark mode uses Tailwind's built-in dark mode support
- YouTube embeds replaced with links (lighter, better performance)
- Content in markdown format (more standard, easier to edit)
