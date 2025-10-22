import { createFileRoute } from '@tanstack/react-router'
import { Container } from '~/components/Container'
import { SongCard } from '~/components/SongCard'
import { useFavorites } from '~/hooks/useFavorites'
import { HeartIcon } from '~/components/icons'

export const Route = createFileRoute('/favorit')({
  component: FavoritComponent,
  head: () => ({
    meta: [
      {
        title: 'Mine Favoritter - De Smaa',
      },
      {
        name: 'description',
        content: 'Dine yndlings børnesange samlet ét sted',
      },
    ],
  }),
})

function FavoritComponent() {
  const { getFavoritesList, mounted } = useFavorites()
  const favorites = mounted ? getFavoritesList() : []

  return (
    <Container className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          <HeartIcon className="w-10 h-10 text-primary" filled />
          Mine Favoritter
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {mounted && favorites.length > 0 && (
            <>Du har {favorites.length} yndlingssang{favorites.length !== 1 ? 'e' : ''}</>
          )}
        </p>
      </div>

      {!mounted ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Indlæser...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Du har ikke tilføjet nogen sange til din favoritliste endnu.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Klik på hjerte-ikonet på en sang for at tilføje den til dine favoritter
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Find sange
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(fav => (
            <SongCard
              key={fav.slug}
              slug={fav.slug}
              title={fav.title}
            />
          ))}
        </div>
      )}
    </Container>
  )
}
