import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

async function migrateSong(jsonPath: string, outputDir: string): Promise<void> {
  try {
    const content = await fs.readFile(jsonPath, 'utf-8')
    const song: SongJSON = JSON.parse(content)

    // Extract YouTube video ID if present
    let youtubeLink = ''
    if (!song.videoUrl.includes('none')) {
      const videoId = song.videoUrl.match(/embed\/([^?]+)/)?.[1]
      youtubeLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : ''
    }

    // Build markdown frontmatter
    const frontmatter = `---
title: "${song.title.replace(/"/g, '\\"')}"
slug: "${song.slug}"
date: ${new Date(song.date).toISOString()}
author: "${song.author.replace(/"/g, '\\"')}"
music: "${song.music.replace(/"/g, '\\"')}"
description: "${song.description.replace(/"/g, '\\"')}"
tags: [${song.tags.map(t => `"${t}"`).join(', ')}]
youtubeUrl: "${youtubeLink}"
---

`

    // Convert verses to markdown
    // Each verse is separated by blank line, lines within verses separated by double space + newline
    const verses = song.songVers
      .map((verse, idx) => verse.join('  \n'))
      .join('\n\n')

    const markdown = frontmatter + verses

    const outputPath = path.join(outputDir, `${song.slug}.md`)
    await fs.writeFile(outputPath, markdown, 'utf-8')

    console.log(`✓ Migrated: ${song.slug}.json -> ${song.slug}.md`)
  } catch (error) {
    console.error(`✗ Error migrating ${jsonPath}:`, error)
    throw error
  }
}

async function migrateAll(): Promise<void> {
  console.log('🎵 Starting song migration from JSON to Markdown...\n')

  const songsDir = path.join(__dirname, '..', 'src', 'content', 'songs')
  const outputDir = path.join(__dirname, '..', 'app', 'content', 'songs')

  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true })

    // Read all JSON files
    const files = await fs.readdir(songsDir)
    const jsonFiles = files.filter(f => f.endsWith('.json'))

    console.log(`Found ${jsonFiles.length} song files to migrate\n`)

    // Migrate each file
    let successCount = 0
    let errorCount = 0

    for (const file of jsonFiles) {
      try {
        await migrateSong(path.join(songsDir, file), outputDir)
        successCount++
      } catch (error) {
        errorCount++
      }
    }

    console.log(`\n✨ Migration complete!`)
    console.log(`   Success: ${successCount} songs`)
    if (errorCount > 0) {
      console.log(`   Errors: ${errorCount} songs`)
    }
    console.log(`   Output: ${outputDir}`)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run the migration
migrateAll()
