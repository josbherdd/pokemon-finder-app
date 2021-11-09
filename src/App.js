import React, { useEffect } from "react";
import { PokeCard } from "./components/PokeCard";
import { MdCatchingPokemon } from "react-icons/md";
import { BsViewList } from "react-icons/bs";
import { CgPokemon } from "react-icons/cg";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./index.css";
import { PokemonAllData } from "./components/PokemonAllData";
import { PokemonFilter } from "./components/PokemonFilter";


function App() {
  const [pokemons, setPokemons] = React.useState([]);
  const [pageInfo, setPageInfo] = React.useState({ prev: null, next: null });

  const getPokemons = async ( url=`https://pokeapi.co/api/v2/pokemon?limit=20` ) => {
    const res = await fetch( url );
    const data = await res.json();
    setPokemons([])

    function pokemonObject(results) {
      results.forEach(async (poke) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`);
        const dato = await res.json();
        setTimeout(() => setPokemons(list => [...list ,dato]), 2000)
      });
    }

    pokemonObject(data.results);
    setPageInfo({ prev: data.previous, next: data.next })

    

  };
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <Router>
    <div className="app-container">
    <h1>Poke finder <MdCatchingPokemon /></h1>
    <div className="buttonnav" >
    <Link to="/filter" >
    <button className="fill" ><BsViewList /> Filter </button>
    </Link>
    <Link to="/" >
    <button className="fill" ><CgPokemon /> All </button>
    </Link>
    </div>
    
      <Switch>
          <Route path='/filter' >
            <PokemonFilter />
          </Route>
        <Route path='/' exact>
          <ul className="all-container">
            {pokemons.map((poke, pk) => (
              <li key={poke.id} >
              <Link to={ `/${poke.id}` } >
                  <PokeCard
                    key={pk}
                    name={poke.name}
                    id={poke.id}
                    sprite={poke.sprites.versions['generation-v']['black-white'].animated.front_default}
                    types={poke.types[0].type.name}
                    abilities={poke.abilities[0].ability.name}
                    stat_1={ poke.stats[0].base_stat }
                    stat_2={ poke.stats[1].base_stat }
                    stat_3={ poke.stats[2].base_stat }
                  />
              </Link>
              </li>
            ))}
            
          </ul>
          <br />
          <div className="buttonnav" >
            <button 
            className="fill" 
            onClick={() => getPokemons(pageInfo.prev)}>
            prev page
          </button>
          <button 
          className="fill" 
          onClick={() => getPokemons(pageInfo.next)}>
            next page
          </button>
          </div>
        </Route>
          <Route path='/:id' >
              <PokemonAllData />
          </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;