import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const[Pokemon,setPokemon]=useState([])
  const [error, setError] = useState(null)
  const[searchPokemon,setSearchPokemon]=useState("")

  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

  useEffect(() => {
  let isMounted = true;
  const fetchApi = async () => {
    try {
      const res = await fetch(API)
      const ans = await res.json()
      console.log(ans)
      const PokemonUrls=ans.results.map(async(item)=>{
       const res=await fetch(item.url);
       const data=await res.json()
       return data
      });
      const Ans=await Promise.all(PokemonUrls)
      console.log(Ans)
      setPokemon(Ans)
    } catch (err) {
      if (isMounted) {
        setError(err.message)
      }
      console.log(error)
    }
  }

  fetchApi()

  return () => {
    isMounted = false
  }
}, [])
const searchData=Pokemon.filter((item)=>
  item.name.toLowerCase().includes(searchPokemon.toLowerCase())
)
console.log(searchData)
  return (
    <div>
     <h1>Pokemon</h1>
     <input type="text" placeholder='Search Pokemon'  value={searchPokemon} onChange={(e)=>setSearchPokemon(e.target.value)}/>
     <ul>
      {
        searchData.map((item)=>(
         <div key={item.id}>
           <li key={item.id}>{item.name}</li>
           <img src={item.sprites.other.dream_world.front_default} alt="" />
           <h1>Height:{item.height}</h1>
            <h1>Weight:{item.weight}</h1>
            <h1>Speed:{item.stats[5].base_stat}</h1>
             <p>
              {item.types.map((currElm)=>currElm.type.name)}
             </p>
             <p>
              Abilities:{
                item.abilities.map((it)=>it.ability.name).slice(0,1).join(", ")
              }
             </p>
             
         </div>
        ))
      }
     </ul>
    </div>
  )
}

export default App
