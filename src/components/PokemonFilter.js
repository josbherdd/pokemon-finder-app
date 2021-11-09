import React, { useEffect } from 'react';
import { PokeCard } from "./PokeCard";
import { Link } from "react-router-dom"
import "../styles/PokemonFilter.css"

import BugType from "../images/Bug.svg"
import DarkType from "../images/Dark.svg"
import DragonType from "../images/Dragon.svg"
import ElectricType from "../images/Electric.svg"
import FairyType from "../images/Fairy.svg"
import FightingType from "../images/Fighting.svg"
import FireType from "../images/Fire.svg"
import FlyingType from "../images/Flying.svg"
import GhostType from "../images/Ghost.svg"
import GrassType from "../images/Grass.svg"
import GroundType from "../images/Ground.svg"
import IceType from "../images/Ice.svg"
import NormalType from "../images/Normal.svg"
import PoisonType from "../images/Poison.svg"
import PsychicType from "../images/Psychic.svg"
import RockType from "../images/Rock.svg"
import SteelType from "../images/Steel.svg"
import WaterType from "../images/Water.svg"


function PokemonFilter() {

    const[ pokeFilter, setPokeFilter ] = React.useState([])
    const[ loadMore, setLoadMore ] = React.useState(`https://pokeapi.co/api/v2/pokemon?limit=80`)
    const [pokemonsQ, setPokemonsQ] = React.useState('grass');

    const getPokemonsFiltered = async() => {
        const res = await fetch( loadMore );
        const data = await res.json();

        setLoadMore( data.next )

        function pokemonObject(results){
            results.forEach(async (poke) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`);
                const dato = await res.json();
                setTimeout(() => setPokeFilter(list => [...list ,dato]), 1000)
              });
        }
        pokemonObject(data.results);
    }
    
    useEffect(() => {
        getPokemonsFiltered();
    }, []);



    return(
        <React.Fragment>
            <h2>filter by {pokemonsQ} type</h2>
            <small>If they don´t appear push the "Load more" button until they do.</small>
            <div className="filter-buttons" >
                <div className="col-1" >
                    <button className="fill" onClick={ () => setPokemonsQ( 'grass' ) } ><img src={GrassType} alt="type icon" /> grass </button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'fire' ) } ><img src={FireType} alt="type icon" /> fire </button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'water' ) } ><img src={WaterType} alt="type icon" /> water</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'rock' ) } ><img src={RockType} alt="type icon" /> rock</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'ghost' ) } ><img src={GhostType} alt="type icon" /> ghost</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'electric' ) } ><img src={ElectricType} alt="type icon" /> electric</button>
                </div>
                <div className="col-2" >
                    <button className="fill" onClick={ () => setPokemonsQ( 'bug' ) } ><img src={BugType} alt="type icon" /> bug</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'poison' ) } ><img src={PoisonType} alt="type icon" /> poison</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'normal' ) } ><img src={NormalType} alt="type icon" /> normal</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'fairy' ) } ><img src={FairyType} alt="type icon" /> fairy</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'fighting' ) } ><img src={FightingType} alt="type icon" /> fighting</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'ice' ) } ><img src={IceType} alt="type icon" /> ice</button>
                </div>
                <div className="col-3" >
                    <button className="fill" onClick={ () => setPokemonsQ( 'psychic' ) } ><img src={PsychicType} alt="type icon" /> psychic</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'dragon' ) } ><img src={DragonType} alt="type icon" /> dragon</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'dark' ) } ><img src={DarkType} alt="type icon" /> dark</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'ground' ) } ><img src={GroundType} alt="type icon" /> ground</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'flying' ) } ><img src={FlyingType} alt="type icon" /> flying</button>
                    <button className="fill" onClick={ () => setPokemonsQ( 'steel' ) } ><img src={SteelType} alt="type icon" /> steel</button>
                </div>

            </div>



            <ul className="all-container">
            { pokeFilter.filter( pokef => pokef.types[0].type.name.includes( pokemonsQ ) ).map( (pke, fl) => (
                <li key={pke.id} ><Link to={ `/${pke.id}` }>
                <PokeCard
                    key={fl}
                    name={pke.name}
                    id={pke.id}
                    sprite={pke.sprites.versions['generation-v']['black-white'].animated.front_default}
                    types={pke.types[0].type.name}
                    abilities={pke.abilities[0].ability.name}
                    stat_1={ pke.stats[0].base_stat }
                    stat_2={ pke.stats[1].base_stat }
                    stat_3={ pke.stats[2].base_stat }
                  />
                </Link></li>
            ) ) }
            </ul>
            <button className="fill" onClick={() => getPokemonsFiltered()}>Load more</button>
        </React.Fragment>
    )
}

export { PokemonFilter };