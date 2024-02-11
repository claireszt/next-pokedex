import { Suspense } from 'react'
import PokemonList from './components/PokemonList'
import Loading from './loading'
import Link from 'next/link'
 
export default function Page() {
  return (
    <section>
      <Link href='/home'><h1 className='text-3xl pb-5'>POKEDEX</h1></Link>
      <Suspense fallback={<Loading/>}>
        <PokemonList />
      </Suspense>
    </section>
  )
}