import { GET_POKEMONS, GET_POKEMON, POST_POKEMON, GET_TYPES, ORDER_ASC_DESC, FORCE_ASC_DESC, FILTER_TYPE, BACK_HOME} from '../actions';

const initialState = {
    getPokemons: [],
    getTypes: [],
    filter: false,
    filterType:[],
    getDetailPokemon: {},
    msg: "",
    index: 0
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
        return {
            ...state,
            index: state.index = 0,
            filter: false, 
            msg: action.payload
        }
    }
    if (action.type === ORDER_ASC_DESC) {
        if(action.payload === 'atoz'){
            return {
                ...state,
                index: state.index+1,
                filter: false,
                getPokemons: state.getPokemons.sort((prev, next) => {
                    if(prev.name.toLowerCase() > next.name.toLowerCase()) return 1;
                    if(prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
                    return 0;
                })
            }
        }else{
            return {
                ...state,
                index: state.index+1,
                filter: false,
                getPokemons: state.getPokemons.sort((prev, next) => {
                    if(prev.name.toLowerCase() < next.name.toLowerCase()) return 1;
                    if(prev.name.toLowerCase() > next.name.toLowerCase()) return -1;
                    return 0;
                })
            }
        }
    }
    if (action.type === FORCE_ASC_DESC) {
        if(action.payload === '-fto+f'){
            return {
                ...state,
                index: state.index+1,
                filter: false,
                getPokemons: state.getPokemons.sort((prev, next) => {
                    return prev.force - next.force;
                })
            }
        }else{
            return {
                ...state,
                index: state.index+1,   
                filter: false,             
                getPokemons: state.getPokemons.sort((prev, next) => {
                    return prev.force - next.force;
                }).reverse()
            }
        }
    }
    if(action.type === FILTER_TYPE){
        return{
            ...state,
            filter: true,
            filterType: state.getPokemons.filter((pokemon) => {
                let types = pokemon.types.map(t => t.name);
                console.log(types);
                if (types.includes(action.payload)) {
                    return pokemon;
                }
            })
        }
    }
    if(action.type === BACK_HOME){
        return {
            ...state,
            filter:false
        }
    }
    return state;
}

export default RootReducer;