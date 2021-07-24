import { GET_POKEMONS, GET_POKEMON, POST_POKEMON, GET_TYPES} from '../actions';

const initialState = {
    getPokemons: [],
    getTypes: [],
    getDetailPokemon: {},
    msg: ""
}

const RootReducer = (state = initialState, action)=>{
    if(action.type === GET_POKEMONS){
        return{
            ...state,
            getPokemons: action.payload
        }
    }
    if(action.type === GET_POKEMON){
        if(action.payload !== []){
            return{
                ...state,
                getDetailPokemon: action.payload
            }
        }else{
            alert('pokemon no encontrado')
            return state;
        }
    }
    if(action.type === GET_TYPES){
        return {
            ...state,
            getTypes: action.payload
        }
    }
    if(action.type === POST_POKEMON){
        console.log(action.payload);
        return {
            ...state,
            msg: action.payload
        }
    }
    return state;
}

export default RootReducer;