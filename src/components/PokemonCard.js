import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios.get(pokemonUrl).then((res) => {
        setPokemon(res.data);
        //console.log(res.data);
    });
  }, [pokemonUrl]);

  const style = () => {
      if(pokemon.types?.[0].type.name === 'grass'){
          return 'card grass';
      }
      if(pokemon.types?.[0].type.name === 'fire'){
        return 'card fire';
      }
      if(pokemon.types?.[0].type.name === 'water'){
        return 'card water';
      }
      if(pokemon.types?.[0].type.name === 'bug'){
        return 'card bug';
      }
      if(pokemon.types?.[0].type.name === 'normal'){
        return 'card normal';
      }
      if(pokemon.types?.[0].type.name === 'poison'){
        return 'card poison';
      }
      if(pokemon.types?.[0].type.name === 'electric'){
        return 'card electric';
      }
      if(pokemon.types?.[0].type.name === 'ground'){
        return 'card ground';
      }
      if(pokemon.types?.[0].type.name === 'fairy'){
        return 'card fairy';
      }
      if(pokemon.types?.[0].type.name === 'fighting'){
        return 'card fighting';
      }
      if(pokemon.types?.[0].type.name === 'ghost'){
        return 'card ghost';
      }
      if(pokemon.types?.[0].type.name === 'psychic'){
        return 'card psychic';
      }
      if(pokemon.types?.[0].type.name === 'rock'){
        return 'card rock';
      }
      if(pokemon.types?.[0].type.name === 'ice'){
        return 'card ice';
      }
      if(pokemon.types?.[0].type.name === 'steel'){
        return 'card steel';
      }
      if(pokemon.types?.[0].type.name === 'dragon'){
        return 'card dragon';
      }
      if(pokemon.types?.[0].type.name === 'dark'){
        return 'card dark';
      } 
       return 'card other'; 
  }
  
  return (
        <div className={ style() }>
            <Link className="link" to={`/pokedex/${pokemon.id}`}>          
                <p className="name"> 
                    {pokemon.name}
                </p>
                <div className="grid-container">
                    <div className="properties_section">
                        <p>
                            Abilities: {pokemon.abilities?.[0]?.ability?.name} and <br /> {pokemon.abilities?.[1]?.ability?.name}
                        </p>
                        <p> 
                            Type: {pokemon.types?.[0].type.name} <br />
                            {pokemon.types?.[1]?.type.name}
                        </p>
                        <p> 
                            Id: {pokemon.id}
                        </p>
                    </div>
                    <img className="poke_img" 
                        src={pokemon.sprites?.other?.dream_world.front_default ? pokemon.sprites?.other?.dream_world.front_default : pokemon.sprites?.front_default}
                        
                        
                        alt="Pokemon" />
                </div>
            </Link>
        </div>
  );
};

export default PokemonCard;
