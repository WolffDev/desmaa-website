import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

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

/**
 * Parse markdown verses into structured array
 * Verses are separated by double newlines
 * Lines within verses are separated by double space + newline
 */
function parseVerses(content: string): string[][] {
  return content
    .trim()
    .split('\n\n')
    .map(verse =>
      verse
        .split('  \n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
    )
    .filter(verse => verse.length > 0)
}

/**
 * Get all songs from the content directory
 * Returns sorted alphabetically by title (Danish locale)
 */
export async function getAllSongs(): Promise<Song[]> {
  const files = await fs.readdir(SONGS_DIR)
  const songFiles = files.filter(f => f.endsWith('.md'))

  const songs = await Promise.all(
    songFiles.map(async (file) => {
      const filePath = path.join(SONGS_DIR, file)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      const verses = parseVerses(content)

      return {
        slug: data.slug as string,
        title: data.title as string,
        description: data.description as string,
        author: data.author as string,
        music: data.music as string,
        date: data.date as string,
        tags: data.tags as string[],
        youtubeUrl: data.youtubeUrl as string,
        content: content.trim(),
        verses,
      }
    })
  )

  // Sort by title using Danish locale
  return songs.sort((a, b) => a.title.localeCompare(b.title, 'da-DK'))
}

/**
 * Get a single song by its slug
 * Returns null if song not found
 */
export async function getSongBySlug(slug: string): Promise<Song | null> {
  try {
    const filePath = path.join(SONGS_DIR, `${slug}.md`)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    const verses = parseVerses(content)

    return {
      slug: data.slug as string,
      title: data.title as string,
      description: data.description as string,
      author: data.author as string,
      music: data.music as string,
      date: data.date as string,
      tags: data.tags as string[],
      youtubeUrl: data.youtubeUrl as string,
      content: content.trim(),
      verses,
    }
  } catch (error) {
    console.error(`Error loading song ${slug}:`, error)
    return null
  }
}

/**
 * Get all song slugs for static prerendering
 * Returns array of slugs
 */
export async function getAllSongSlugs(): Promise<string[]> {
  const files = await fs.readdir(SONGS_DIR)
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
}

/**
 * Search songs by query (searches title and description)
 * Returns filtered array of songs
 */
export async function searchSongs(query: string): Promise<Song[]> {
  const allSongs = await getAllSongs()

  if (!query || query.trim() === '') {
    return allSongs
  }

  const lowercaseQuery = query.toLowerCase()

  return allSongs.filter(song =>
    song.title.toLowerCase().includes(lowercaseQuery) ||
    song.description.toLowerCase().includes(lowercaseQuery)
  )
}
