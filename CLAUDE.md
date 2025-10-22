# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "De Smaa" (desmaa.dk), a Danish children's songs website built with Gatsby. The site allows users to browse, search, and view lyrics and YouTube videos for children's songs, with a favorites system using localStorage.

## Development Commands

```bash
# Start development server
npm run develop
# or
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clean Gatsby cache and public directory
npm run clean

# Start development server accessible on local network
npm run local

# Analyze bundle size (opens interactive analyzer)
npm run analyze

# Run security vulnerability tests
npm test
```

## Architecture

### Content-Driven Gatsby Site

The site is built around a content-first architecture where songs are stored as JSON files in `src/content/songs/`. Each JSON file contains:
- Song metadata (title, author, music, date, slug, tags)
- Lyrics organized as verses (nested arrays)
- YouTube video URL
- Description

**Page Generation**: `gatsby-node.js` dynamically creates pages at build time by:
1. Querying all JSON files via `allSongsJson` GraphQL query
2. Extracting `slug` and `layout` from each song
3. Creating pages at `/sange/{slug}` using the template specified in `layout` field (typically `src/templates/song.tsx`)

### Data Flow

1. **Source**: `gatsby-source-filesystem` loads JSON files from `src/content/songs/`
2. **Transform**: `gatsby-transformer-json` converts JSON to GraphQL nodes (`SongsJson` type)
3. **Query**: Components use GraphQL (StaticQuery or page queries) to fetch song data
4. **Render**: React components display the data with styled-components

### Client-Side Features

**Favorites System**: Implemented in `src/data/useFavourties.ts`
- Uses browser localStorage with key `FAV_SONGS`
- Stores favorites as object: `{ [slug]: { slug, title } }`
- Custom hook `useFavourites()` provides: `favouriteItem`, `setFavourite()`, `deleteFavourite()`
- See `/favorit` page for displaying favorites list

**Search**: Implemented in `src/components/SongList.tsx`
- Client-side filtering of song titles
- Updates filteredSongs state as user types

**Dark Mode**: Uses `gatsby-plugin-dark-mode` with custom toggle in `src/components/DarkToggle.tsx`

### Styling System

Uses styled-components with:
- CSS custom properties (CSS variables) for theming (see `src/components/Globalstyles.tsx`)
- Variables defined in `src/styles/variables.ts` (breakpoints, dimensions, colors)
- Mixins in `src/styles/mixins.ts` for reusable style patterns

### Layout Hierarchy

```
IndexLayout (Nav + Footer + Helmet)
  └─ Page (wrapper component)
      └─ Container (max-width container)
          └─ Content components (SongList, individual song, etc.)
```

## Key Technical Details

**Node Version**: v14.17.3 (specified in package.json engines)

**TypeScript**: Project uses TypeScript with `.tsx` components and `.ts` utilities. Type definitions in `src/global.d.ts`.

**YouTube Integration**: Uses `react-youtube` package. Video URLs are parsed to extract video ID from embed format in `src/templates/song.tsx`.

**Bundle Analysis**: Webpack bundle analyzer configured in `gatsby-node.js`. Set `INTERACTIVE_ANALYZE=1` to view interactive report.

## Common Patterns

**Adding a New Song**:
1. Create JSON file in `src/content/songs/{slug}.json`
2. Follow the structure from existing songs (see `src/content/songs/abc.json` as example)
3. Set `"layout": "song"` to use the standard song template
4. Run `gatsby clean` if changes don't appear

**Modifying Page Generation**:
Edit the `createPages` function in `gatsby-node.js:59-100`

**Styling Changes**:
- Global styles: `src/components/Globalstyles.tsx`
- Theme variables: `src/styles/variables.ts`
- Use CSS custom properties (e.g., `var(--onBackground)`) for theme-aware colors
