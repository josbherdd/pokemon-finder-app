import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "../styles/PokemonAllData.css"

function PokemonAllData() {

    const[ pokeData, setPokeData ] = React.useState(null)

    

    // console.log()
    const { id } = useParams()
    
    const getPokemonData = async ( url=`https://pokeapi.co/api/v2/pokemon/${id}` ) => {
        const res = await fetch(url)
        const data = await res.json()
        setTimeout(() => setPokeData(data), 1000)
    }

    

    useEffect(() => {
        getPokemonData();
      }, []);
    


    return(
        <React.Fragment>
        {Boolean(pokeData) ? (
            <div className="data-container" >
            <div className="poke-sprite-container" >
                <img src={ pokeData.sprites.versions['generation-v']['black-white'].animated.front_default } alt={ pokeData.name } />
                <p> sprite from: Pokemon black version</p>
            </div>
            <div className="side-data" >
                <h1>{ pokeData.name }</h1>
                <h3>Type: { pokeData.types[0].type.name }</h3>
                <h3>ability: { pokeData.abilities[0].ability.name }</h3>
                <h3>Pokedex index: { pokeData.id }</h3>
                <h3>weight: { pokeData.weight }</h3>
                <h3>height: { pokeData.height }</h3>
                <br/>
                <h2>Base Stats</h2>
                <h3>HP: { pokeData.stats[0].base_stat }</h3>
                <h3>ATK: { pokeData.stats[1].base_stat }</h3>
                <h3>DEF: { pokeData.stats[2].base_stat }</h3>
                <h3>SP-ATK: { pokeData.stats[3].base_stat }</h3>
                <h3>SP-DEF: { pokeData.stats[4].base_stat }</h3>
                <h3>SPD: { pokeData.stats[5].base_stat }</h3>
                <br/>
                <h2>Initial Moves</h2>
                
                <h3>{ pokeData.moves[0].move.name }</h3>
                <h3>{ pokeData.moves[1].move.name }</h3>
                <h3>{ pokeData.moves[2].move.name }</h3>
                
                <br/>
                <hr/>

                <Link to='/' >
                    <button 
                    className="fill" >
                    Back to list
                    </button>
                </Link>
            </div>
        </div>) :
        (<div>
            <div className="lds-dual-ring"></div>
        </div>)
        }
        </React.Fragment>
    )
}

export { PokemonAllData }

