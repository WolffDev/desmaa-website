import { Link, createFileRoute } from '@tanstack/react-router'
import { Container } from '~/components/Container'

export const Route = createFileRoute('/404')({
  component: NotFoundComponent,
  head: () => ({
    meta: [
      {
        title: '404 - Siden blev ikke fundet - De Smaa',
      },
    ],
  }),
})

function NotFoundComponent() {
  return (
    <Container className="py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl sm:text-8xl font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Siden blev ikke fundet
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Beklager, men siden du leder efter findes ikke. Den kan være blevet flyttet eller slettet.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Gå til forsiden
          </Link>
          <Link
            to="/favorit"
            className="inline-block px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            Se mine favoritter
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-500">
          <p>Forslag:</p>
          <ul className="mt-2 space-y-1">
            <li>Kontroller om URL'en er stavet korrekt</li>
            <li>Gå tilbage til forsiden og søg efter sangen</li>
            <li>Brug navigationen ovenfor</li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
