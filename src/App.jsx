// import { useState, Suspense } from 'react'
// import ErrorBoundary from './ErrorBoundary'
// import PokemonCard from './components/PokemonCard'
// import PokemonGrid from './components/PokemonGrid'

// function App() {
//   const [selectedPokemon1, setSelectedPokemon1] = useState(null)
//   const [selectedPokemon2, setSelectedPokemon2] = useState(null)
//   const url = 'https://pokeapi.co/api/v2/pokemon/'

//   function handleSelectPokemon(pokemon) {
//     return () => {
//       setSelectedPokemon1(pokemon)&&selectedPokemon2(pokemon)
//     }
//   }

//   return (
//     <ErrorBoundary fallback={<div>Error...</div>}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <div className="App">
//           {selectedPokemon1&& selectedPokemon2 ? (
//             <PokemonCard parentUrl={url} selectedPokemon1={selectedPokemon1} clearHandler={() => setSelectedPokemon1(null)} />
//             <PokemonCard parentUrl={url} selectedPokemon2={selectedPokemon2} clearHandler={() => setSelectedPokemon2(null)} />
//           ) : (
//             <PokemonGrid url={url} handleSelectPokemon={handleSelectPokemon} />
//           )}
//         </div>
//       </Suspense>
//     </ErrorBoundary>
//   )
// }

// export default App

// import React, { useState } from 'react'
// import ErrorBoundary from './ErrorBoundary'
// import PokemonCard from './components/PokemonCard'
// import PokemonGrid from './components/PokemonGrid'

// function App() {
//     const [selectedPokemon1, setSelectedPokemon1] = useState(null)
//     const [selectedPokemon2, setSelectedPokemon2] = useState(null)
//     const url = 'https://pokeapi.co/api/v2/pokemon/'

//     function handleSelectPokemon(pokemon, slot) {
//         if (slot === 1) {
//             setSelectedPokemon1(pokemon)
//         } else if (slot === 2) {
//             setSelectedPokemon2(pokemon)
//         }
//     }

//     return (
//         <ErrorBoundary fallback={<div>Error...</div>}>
//             <div className="App">
//                 {selectedPokemon1 && selectedPokemon2 ? (
//                     <div className="pokemon-container" style={{ display: 'flex', gap: '20px' }}>
//                         <PokemonCard selectedPokemon={selectedPokemon1} clearHandler={() => setSelectedPokemon1(null)} parentUrl={url} />
//                         <PokemonCard selectedPokemon={selectedPokemon2} clearHandler={() => setSelectedPokemon2(null)} parentUrl={url} />
//                     </div>
//                 ) : (
//                     <PokemonGrid url={url} handleSelectPokemon={handleSelectPokemon} />
//                 )}
//             </div>
//         </ErrorBoundary>
//     )
// }

// export default App

import React, { useState, useEffect } from 'react'
import ErrorBoundary from './ErrorBoundary'
import PokemonCard from './components/PokemonCard'
import PokemonGrid from './components/PokemonGrid'
// import superMarioSound from "../"


function App() {
    const [selectedPokemon1, setSelectedPokemon1] = useState(null)
    const [selectedPokemon2, setSelectedPokemon2] = useState(null)
    const [pokemon1Data, setPokemon1Data] = useState(null)
    const [pokemon2Data, setPokemon2Data] = useState(null)
    const url = 'https://pokeapi.co/api/v2/pokemon/'
    // const audio = new Audio(superMarioSound)

    useEffect(() => {
        async function fetchPokemonData(selectedPokemon, setData) {
            try {
                const pokemonUrl = `${url}${selectedPokemon}`
                const res = await fetch(pokemonUrl)
                if (!res.ok) {
                    throw new Error('Network response was not ok.')
                }
                const data = await res.json()
                setData(data)
            } catch (error) {
                console.error('Error fetching Pokemon data:', error)
            }
        }

        if (selectedPokemon1) {
            fetchPokemonData(selectedPokemon1, setPokemon1Data)
        }
        if (selectedPokemon2) {
            fetchPokemonData(selectedPokemon2, setPokemon2Data)
        }
    }, [selectedPokemon1, selectedPokemon2, url])

    function handleSelectPokemon(pokemon, slot) {
        if (slot === 1) {
            setSelectedPokemon1(pokemon)
        } else if (slot === 2) {
            setSelectedPokemon2(pokemon)
        }
    }

    function handleFight() {
        if (pokemon1Data && pokemon2Data) {
            const pokemon1Attack = pokemon1Data.stats.find(stat => stat.stat.name === 'attack').base_stat
            const pokemon2Attack = pokemon2Data.stats.find(stat => stat.stat.name === 'attack').base_stat

            if (pokemon1Attack > pokemon2Attack) {
                alert(`${selectedPokemon1} wins the battle!`)
            } else if (pokemon1Attack < pokemon2Attack) {
                alert(`${selectedPokemon2} wins the battle!`)
            } else {
                alert('It\'s a tie!')
            }
            // audio.play()
        } else {
            alert('Please select both Pokémon.')
        }
    }

    return (
        <ErrorBoundary fallback={<div>Error...</div>}>
            <div className="App">
                {selectedPokemon1 && selectedPokemon2 ? (
                    <div>
                        <div className="pokemon-container" style={{ display: 'flex', gap: '20px' }}>
                            <PokemonCard selectedPokemon={selectedPokemon1} clearHandler={() => setSelectedPokemon1(null)} parentUrl={url} />
                            <PokemonCard selectedPokemon={selectedPokemon2} clearHandler={() => setSelectedPokemon2(null)} parentUrl={url} />
                        </div>
                        <button onClick={handleFight} className="fight-button">FIGHT</button>
                    </div>
                ) : (
                    <PokemonGrid url={url} handleSelectPokemon={handleSelectPokemon} />
                )}
            </div>
        </ErrorBoundary>
    )
}

export default App


