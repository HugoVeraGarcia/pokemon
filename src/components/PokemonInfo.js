import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pokemonText from "../assets/pokemonText.png"

const PokemonInfo = () => {

    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [moves, setMoves] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                console.log( 'desde info',res.data);
                setPokemon(res.data);
                console.log('from moves',res.data.moves)
                setMoves(res.data.moves)
            })
            .catch( ()=> navigate('/pokemons/') );
            
        }, [id, navigate])

        console.log('moves:', moves);



        return (
        <div className='main_container_info'>            
            <div className='first_block'>
                <img className='pokemonText' src={pokemonText} alt="Pokemon" />
                <div className="information">
                    <div className='poke_img_info_container'>
                        <img className="poke_img_info" 
                            src={pokemon.sprites?.other?.dream_world.front_default ? pokemon.sprites?.other?.dream_world.front_default : pokemon.sprites?.front_default} alt="Pokemon" />
                    </div>
                        <div className='data_container'>
                            <div>
                                <p>{pokemon.weight}</p>
                                <p>Weight</p>
                            </div>
                            <div>
                                <p>{pokemon.height}</p>
                                <p>Height</p>
                            </div>
                        </div>
                        <div className='name_container'>
                            <h1>{pokemon.name}</h1>
                            <hr />
                        </div>
                        <div className='id_container'> 
                            {<p className='idPokemon'># {pokemon.id}</p>} 
                        </div>
                </div>

                <div className='type_abilities'>
                    <div className='type_container'>
                        <p className='p_abilities'>Type</p>
                        <div className="type">
                            <div className='type1'>
                                {pokemon.types?.[0].type.name} <br />
                            </div>
                            <div className='type2'>
                                {pokemon.types?.[1]?.type.name ?  pokemon.types?.[1]?.type.name : 'None'}
                            </div>


                        </div>
                    </div>
                    <div className='abilities_container'>
                        <p className='p_abilities'>Abilities</p>
                        <div className="abilities">
                            <div className='abilities1'>
                                {pokemon.abilities?.[0]?.ability?.name}
                            </div>
                            <div className='abilities2'>
                                {pokemon.abilities?.[1]?.ability?.name ? pokemon.abilities?.[1]?.ability?.name : 'None'}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className="second_block">
                <div className='encounter'><p className='p_encounter'>
                <i className="fa-solid fa-location-dot mrb10"></i>encounters</p></div>
            <div>
                <h2>Movements</h2>
                <br />


                {
                    moves.map(element => (
                        <p key={element.move.name} >{element.move.name}</p>
                    ))
                }





            </div>
            </div>
        </div>
    );
};

export default PokemonInfo;
/*
                {
                    moves.map(element => (
                        <p key={element.move.name} >{element.move.name}</p>
                    ))
                }

*/