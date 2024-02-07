import { Suspense } from 'react'
import PokemonList from './pokemon-list/PokemonList'
 
export default function Page() {
  return (
    <section>
      <h1 className='text-3xl'>POKEDEX</h1>
      <Suspense fallback={<p>Loading list...</p>}>
        <PokemonList />
      </Suspense>
    </section>
  )
}