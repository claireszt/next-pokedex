import { Suspense } from 'react'
import PokemonList from './components/PokemonList'
import Loading from './loading'
 
export default function Page() {
  return (
    <section>
      <h1 className='text-3xl pb-5'>POKEDEX</h1>
      <Suspense fallback={<Loading/>}>
        <PokemonList />
      </Suspense>
    </section>
  )
}