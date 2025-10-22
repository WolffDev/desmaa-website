import { createFileRoute } from '@tanstack/react-router'
import { getSongBySlug, getAllSongSlugs } from '~/utils/content.server'
import { Container } from '~/components/Container'
import { useFavorites } from '~/hooks/useFavorites'
import { HeartIcon, YouTubeIcon } from '~/components/icons'

export const Route = createFileRoute('/sange/$slug')({
  loader: async ({ params }) => {
    const song = await getSongBySlug(params.slug)
    if (!song) {
      throw new Error('Sang ikke fundet')
    }
    return { song }
  },
  // Static prerendering configuration
  staticData: async () => {
    const slugs = await getAllSongSlugs()
    return slugs.map(slug => ({ slug }))
  },
  component: SongComponent,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.song.title} - De Smaa`,
      },
      {
        name: 'description',
        content: loaderData?.song.description || `Tekst og melodi til børnesangen ${loaderData?.song.title}`,
      },
      {
        name: 'keywords',
        content: loaderData?.song.tags.join(', ') || 'børnesang, dansk, musik',
      },
      {
        property: 'og:title',
        content: `${loaderData?.song.title} - De Smaa`,
      },
      {
        property: 'og:description',
        content: loaderData?.song.description || '',
      },
      {
        property: 'og:type',
        content: 'article',
      },
    ],
  }),
})

function SongComponent() {
  const { song } = Route.useLoaderData()
  const { isFavorite, toggleFavorite, mounted } = useFavorites(song.slug)

  const handleFavoriteClick = () => {
    toggleFavorite(song.slug, song.title)
  }

  // Format date
  const formattedDate = new Date(song.date).toLocaleDateString('da-DK', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Container className="max-w-4xl py-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6">
        {song.title}
      </h1>

      {/* Metadata */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
        <span>Sang tilføjet d. {formattedDate}</span>
        {!song.author.includes('none') && (
          <>
            <span className="hidden sm:inline">•</span>
            <span>Tekst: {song.author}</span>
          </>
        )}
        {!song.music.includes('none') && (
          <>
            <span className="hidden sm:inline">•</span>
            <span>Musik: {song.music}</span>
          </>
        )}
      </div>

      {/* Description */}
      {song.description && !song.description.includes('null') && (
        <p className="max-w-2xl mx-auto text-center mb-6 text-gray-700 dark:text-gray-300">
          {song.description}
        </p>
      )}

      {/* Favorite Button */}
      {mounted && (
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={handleFavoriteClick}
            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors"
          >
            <HeartIcon className="w-6 h-6" filled={isFavorite} />
            <span className="font-medium">
              {isFavorite ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}
            </span>
          </button>
        </div>
      )}

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      {/* Lyrics */}
      <div className="grid grid-cols-[1fr_auto_1fr] my-8">
        <div className="col-start-2">
          {song.verses.map((verse, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              {verse.map((line, lineIdx) => (
                <p
                  key={lineIdx}
                  className="mb-1 text-on-bg-light dark:text-on-bg-dark leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      {/* YouTube Link */}
      {song.youtubeUrl && song.youtubeUrl.trim() !== '' && (
        <div className="text-center">
          <a
            href={song.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
          >
            <YouTubeIcon className="w-6 h-6" />
            <span className="font-semibold">Se på YouTube</span>
          </a>
        </div>
      )}

      {/* Tags */}
      {song.tags && song.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {song.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Container>
  )
}
