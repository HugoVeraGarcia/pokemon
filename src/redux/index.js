const INITIAL_STATE = {
    userName: '',
    pokemonPerPage: 32,
}

const reducer = (state = INITIAL_STATE, action) => {
	switch(action.type){

        case "GET_USERNAME":
            return{
                ...state,
                userName: action.payload
            }

        case "GET_NUMBER_POKEMONS":
            return{
                ...state,
                pokemonPerPage: action.payload
            }        

    default:
	    return state;
  }
}

export default reducer;