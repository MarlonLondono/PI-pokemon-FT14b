import axios from 'axios';

export const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_POKEMON = 'GET_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const POST_POKEMON = 'POST_POKEMON';
export const ORDER_ASC_DESC = 'ORDER_ASC_DESC';
export const FORCE_ASC_DESC = 'FORCE_ASC_DESC';
export const FILTER_TYPE = 'FILTER_TYPE';
export const BACK_HOME = 'BACK_HOME';
export const FILTER_DB = 'FILTER_DB';
export const SEARCH = 'SEARCH';

export const getPokemons = ()=>{
    return (dispatch)=>{
        return axios.get('http://localhost:3001/pokemons')
            .then(response =>{
                    dispatch({
                        type: GET_POKEMONS,
                        payload: response.data
                    })
                
            })
    }
}

export const getPokemon = (name) =>{
    return (dispatch) => {
        return axios.get(`http://localhost:3001/pokemons?name=${name}`)
        .then(response =>{            
            dispatch({
                type: GET_POKEMON,
                payload: response.data
            })        
        })
    }
}

export const getTypes = ()=>{
    return (dispatch) => {
        return axios.get('http://localhost:3001/types')
        .then(response => {
            dispatch({
                type: GET_TYPES,
                payload: response.data
            })
        })
    }
}

export const postPokemon = (pokemon) => {
    return (dispatch) => {
        return axios.post('http://localhost:3001/pokemons', pokemon)
        .then(response => {
            dispatch({
                type: POST_POKEMON,
                payload: response.data
            })
        })
    }
}

export const orderAscDesc = (name) =>{
    return {
        type: ORDER_ASC_DESC,
        payload: name
    }
}

export const orderForceAscDesc = (name) => {
    return {
        type: FORCE_ASC_DESC,
        payload: name
    }
}

export const filterType = (name) => {
    return {
        type: FILTER_TYPE,
        payload: name
    }
}

export const backHome = () => {
    return {
        type: BACK_HOME
    }
}

export const filterDb = (name) => {
    return {
        type: FILTER_DB,
        payload: name
    }
}

export const searchPokemon = (name) =>{
    return {
        type: SEARCH,
        payload: name
    }
}