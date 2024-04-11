// import React, { use, useState } from 'react'
// import styles from './pokemongrid.module.css'

// async function fetchData(url) {
//     const res = await fetch(url)
//     return res.json()
// }

// export default function PokemonGrid(props) {
//     const { handleSelectPokemon, url } = props
//     const [search, setSearch] = useState('')
//     let data
//     if (localStorage.getItem('pokemon-cards')) {
//         data = JSON.parse(localStorage.getItem('pokemon-cards'))
//         console.log('FETCHED FROM CACHE', console.log(data))
//     } else {
//         console.log('FETCHED FROM API')
//         data = use(fetchData(url))
//         localStorage.setItem('pokemon-cards', JSON.stringify(data))
//     }



//     return (
//         <div className={styles.pokemonGrid}>
//             <h1 className={styles.header}>MY POKEMON COMPARATOR</h1>
//             <h3 className={styles.header}>SELECT POKEMON 1</h3>
//             <div className={styles.listContainer}>
//                 <input placeholder='Search Pokemon 1' value={search} onChange={(e) => setSearch(e.target.value)} />
//                 {data.results.filter(val => {
//                     return val.name.includes(search)
//                 }).map((pokemon, pokemonIndex) => {
//                     return (
//                         <div onClick={handleSelectPokemon(pokemon.name)} key={pokemonIndex} className={styles.pokemon}>
//                             {pokemon.name}
//                         </div>
//                     )
//                 })}
//             </div>
//             \<h3 className={styles.header}>SELECT POKEMON 1</h1>
//             <div className={styles.listContainer}>
//                 <input placeholder='Search Pokemon 2' value={search} onChange={(e) => setSearch(e.target.value)} />
//                 {data.results.filter(val => {
//                     return val.name.includes(search)
//                 }).map((pokemon, pokemonIndex) => {
//                     return (
//                         <div onClick={handleSelectPokemon(pokemon.name)} key={pokemonIndex} className={styles.pokemon}>
//                             {pokemon.name}
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

// import React, { useState, useEffect } from 'react'
// import styles from './pokemongrid.module.css'

// async function fetchData(url) {
//     const res = await fetch(url)
//     return res.json()
// }

// export default function PokemonGrid(props) {
//     const { handleSelectPokemon, url } = props
//     const [search1, setSearch1] = useState('')
//     const [search2, setSearch2] = useState('')
//     const [data, setData] = useState([])

//     useEffect(() => {
//         async function getData() {
//             if (localStorage.getItem('pokemon-cards')) {
//                 const cachedData = JSON.parse(localStorage.getItem('pokemon-cards'))
//                 console.log('FETCHED FROM CACHE', cachedData)
//                 setData(cachedData)
//             } else {
//                 console.log('FETCHED FROM API')
//                 const apiData = await fetchData(url)
//                 localStorage.setItem('pokemon-cards', JSON.stringify(apiData))
//                 setData(apiData)
//             }
//         }

//         getData()
//     }, [url])

//     return (
//         <div className={styles.pokemonGrid}>
//             <h1 className={styles.header}>MY POKEMON COMPARATOR</h1>
//             <h3 className={styles.header}>SELECT POKEMON 1</h3>
//             <div className={styles.listContainer}>
//                 <input placeholder='Search Pokemon 1' value={search1} onChange={(e) => setSearch1(e.target.value)} />
//                 {data.results &&
//                     data.results
//                         .filter(val => val.name.includes(search1))
//                         .map((pokemon, pokemonIndex) => (
//                             <div onClick={() => handleSelectPokemon(pokemon.name, 1)} key={pokemonIndex} className={styles.pokemon}>
//                                 {pokemon.name}
//                             </div>
//                         ))}
//             </div>
//             <h3 className={styles.header}>SELECT POKEMON 2</h3>
//             <div className={styles.listContainer}>
//                 <input placeholder='Search Pokemon 2' value={search2} onChange={(e) => setSearch2(e.target.value)} />
//                 {data.results &&
//                     data.results
//                         .filter(val => val.name.includes(search2))
//                         .map((pokemon, pokemonIndex) => (
//                             <div onClick={() => handleSelectPokemon(pokemon.name, 2)} key={pokemonIndex} className={styles.pokemon}>
//                                 {pokemon.name}
//                             </div>
//                         ))}
//             </div>
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react'
import styles from './pokemongrid.module.css'

async function fetchData(url) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Network response was not ok.')
    }
    return res.json()
}

export default function PokemonGrid(props) {
    const { handleSelectPokemon, url } = props
    const [search1, setSearch1] = useState('')
    const [search2, setSearch2] = useState('')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                if (localStorage.getItem('pokemon-cards')) {
                    const cachedData = JSON.parse(localStorage.getItem('pokemon-cards'))
                    console.log('FETCHED FROM CACHE', cachedData)
                    setData(cachedData)
                    setLoading(false)
                } else {
                    console.log('FETCHED FROM API')
                    const apiData = await fetchData(url)
                    localStorage.setItem('pokemon-cards', JSON.stringify(apiData))
                    setData(apiData)
                    setLoading(false)
                }
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        getData()
    }, [url])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className={styles.pokemonGrid}>
            <h1 className={styles.header}>MY POKEMON COMPARATOR</h1>
            <h3 className={styles.header}>SELECT POKEMON 1</h3>
            <div className={styles.listContainer}>
                <input placeholder='Search Pokemon 1' value={search1} onChange={(e) => setSearch1(e.target.value)} />
                {data.results &&
                    data.results
                        .filter(val => val.name.toLowerCase().includes(search1.toLowerCase()))
                        .map((pokemon, pokemonIndex) => (
                            <div onClick={() => handleSelectPokemon(pokemon.name, 1)} key={pokemonIndex} className={styles.pokemon}>
                                {pokemon.name}
                            </div>
                        ))}
            </div>
            <h3 className={styles.header}>SELECT POKEMON 2</h3>
            <div className={styles.listContainer}>
                <input placeholder='Search Pokemon 2' value={search2} onChange={(e) => setSearch2(e.target.value)} />
                {data.results &&
                    data.results
                        .filter(val => val.name.toLowerCase().includes(search2.toLowerCase()))
                        .map((pokemon, pokemonIndex) => (
                            <div onClick={() => handleSelectPokemon(pokemon.name, 2)} key={pokemonIndex} className={styles.pokemon}>
                                {pokemon.name}
                            </div>
                        ))}
            </div>
        </div>
    )
}

