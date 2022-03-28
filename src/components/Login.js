import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ash from "../assets/ash.png"
import ball from "../assets/pokeball.png"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submit = (e) =>{
        e.preventDefault();
        console.log(userName);
        dispatch({ 
            type: "GET_USERNAME",
            payload: userName
        })
        setUserName('');
        navigate('/pokedex')
    }
    return (
        <div className='input_container'>

            <img className='ball' src={ball} alt="Pokeball" />    
            <div className='login_container'>
                <p className='hello'>Hello trainer!</p>
                <img className='ash' src={ash} alt="Ash"/>
                
                <p className='give_me'>Give me your name to start</p>
            <form action="" onSubmit = {submit}>
                <input 
                    type="text"
                    value={userName}
                    onChange={ e => setUserName(e.target.value)}
                />
                <button>Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Login;<h1>Hello from Login</h1>