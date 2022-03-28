import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PokemonCards from "./PokemonCard";
import { useNavigate, Link } from 'react-router-dom';
import config from "../assets/config.png"


const Pokemons = () => {
    const [pokemons, setPokemons] =useState([]);
    const [pokemonName, setPokemonName] = useState('');
    const [types, setTypes] = useState([]);
    
    const getAllPokemons = () => {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
            .then(res => {
                setPokemons(res.data.results);
                //console.log('all pokemons',res.data.results)
            })
    }

    const getPerTypePokemons = () =>{
        axios.get('https://pokeapi.co/api/v2/type/')
        .then(res => {
            //console.log('types',res.data.results);
            setTypes(res.data.results);
        })
    }


    useEffect(()=>{
        
        getAllPokemons();

        getPerTypePokemons();

     },[])
     const pokemonPerPage = useSelector(state => state.pokemonPerPage);

    const [page, setPage] = useState(1);
    let rangePokemon = pokemonPerPage;
    let secondParam = page * rangePokemon;
    let firstParam = secondParam - rangePokemon;
    let numberPages = Math.ceil(pokemons.length/rangePokemon);
    const pokemons_page = pokemons?.slice(firstParam, secondParam);
    const pageNumber = [];
    for (let i = 1; i<= numberPages; i++){
        pageNumber.push(i);
    }
   
    const userName = useSelector(state => state.userName)
    const navigate = useNavigate();

    function handleType(e){
        if (e.target.value === 'All'){
            getAllPokemons();
        }else{
            axios.get(e.target.value).then(res => {
                //console.log('handletype', res.data.pokemon[0].pokemon.url)
                setPokemons(res.data.pokemon)
                setPage(1);
            })
        }

    }

    const submit = (e)=> {
        e.preventDefault();
        navigate(`/pokedex/${pokemonName}`);
    }

    return (
        <div className='main_container'>
            <h1 className='title'>POKEDEX</h1>


            <Link className="link" to={`/pokedex/config`}>
                <div className="config_container">
                    <img className='config_img' src={config} alt="Configuration" />
                </div>
            </Link>
            <h2 className='title'>Welcome {userName} !!  </h2>
            
            <div className="select_container">
                <select name="" id="" onChange={handleType} className='select'>
                        <option value="All">All</option>
                    {
                        types?.map(type => (
                            <option value={type.url} key={type.url} > {type.name}</option>
                        ))


                    }

                </select>
            </div>
            <form className="input-container" onSubmit={submit}>
                <label className='label_search' htmlFor="pokemon_name">Search:</label>
                <input 
                    type="text" 
                    id='pokemon_name'
                    placeholder='write Id or Name'
                    onChange={e=>setPokemonName(e.target.value)}
                    />
                <button>Search</button>

            </form>

            <div>
                <div className="button_container">
                    <div className='upanddownbutton'>
                        <button 
                            className='button_move'
                            onClick={ () => setPage(page - 1)}
                            disabled={page<=1} >
                            previous
                            
                        </button>
                        <p className='position'>{page}/{numberPages} </p>
                        <button
                            className='button_move'
                            onClick={ () => setPage(page + 1)}
                            disabled={page>=numberPages}>
                            next
                        </button>
                    </div>
                    <div>
                            {pageNumber.map(page =>  <button key={page} className='buttonPages' onClick={()=> setPage(page)} >{page}</button> )}
                    </div>    
                </div>            
            </div>


        <div className="pokemon_card"> 
            {
                pokemons_page.map(pokemon => (                        
                <PokemonCards 
                    pokemonUrl={pokemon.url ? pokemon.url : pokemon.pokemon.url } 
                    key={pokemon.url ? pokemon.url : pokemon.pokemon.url } 
                />
            ))
            }

        </div> 
                <div className="button_container">
                    <div className='upanddownbutton'>
                        <button 
                            className='button_move'
                            onClick={ () => setPage(page - 1)}
                            disabled={page<=1} >
                            previous
                            
                        </button>
                        <p className='position'>{page}/{numberPages} </p>
                        <button
                            className='button_move'
                            onClick={ () => setPage(page + 1)}
                            disabled={page>=numberPages}>
                            next
                        </button>
                    </div>
                    <div>
                            {pageNumber.map(page =>  <button key={page} className='buttonPages' onClick={()=> setPage(page)}>{page}</button> )}
                    </div>    
                </div> 

            </div>
    );
};

export default Pokemons;