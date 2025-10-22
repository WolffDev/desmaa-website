import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { getAllSongs } from '~/utils/content.server'
import { Container } from '~/components/Container'
import { SearchInput } from '~/components/SearchInput'
import { SongCard } from '~/components/SongCard'

export const Route = createFileRoute('/')({
  loader: async () => {
    const songs = await getAllSongs()
    return { songs }
  },
  component: IndexComponent,
  head: () => ({
    meta: [
      {
        title: 'De Smaa - Danske Børnesange',
      },
      {
        name: 'description',
        content: 'Find og syng med på dine yndlings børnesange. Samling af over 200 danske børnesange med tekster.',
      },
      {
        name: 'keywords',
        content: 'børnesange, danske sange, godnat sange, børn, musik, tekster',
      },
    ],
  }),
})

function IndexComponent() {
  const { songs } = Route.useLoaderData()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSongs = useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      return songs
    }

    const query = searchQuery.toLowerCase().trim()
    return songs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.description.toLowerCase().includes(query)
    )
  }, [songs, searchQuery])

  return (
    <Container className="py-8">
      <SearchInput onSearch={setSearchQuery} />

      {filteredSongs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Ingen sange fundet for "{searchQuery}"
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Prøv at søge efter noget andet
          </p>
        </div>
      ) : (
        <>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            Viser {filteredSongs.length} {filteredSongs.length === 1 ? 'sang' : 'sange'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSongs.map(song => (
              <SongCard
                key={song.slug}
                slug={song.slug}
                title={song.title}
                description={song.description}
              />
            ))}
          </div>
        </>
      )}
    </Container>
  )
}
