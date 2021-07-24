import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import style from './pokemons.module.css';
import notFound from '../../img/notfound.jpg';                                              
import { getPokemons } from '../../actions';

function Pokemons({currentPokemons, getPokemon, pokemonsState}){
    const [search,setSearch] = useState();
    const TypesState = useSelector(store => store.getTypes);
    const history = useHistory();
    const dispatch = useDispatch();
    

    const onHandleChange = (event)=>{
        setSearch(event.target.value);
    }    
    const orderAsc = () => {
        console.log(pokemonsState);
        pokemonsState.sort((prev, next) => {
            if(prev.name > next.name){
                return 1;
            }
            if(prev.name < next.name){
                return -1;
            }
            return 0;
        })
    }
    const DetailPokemon =(e)=>{
        if(search){
            e.preventDefault();
            dispatch(getPokemon(search));
            history.push('/pokemons/detail');
        }else{
            e.preventDefault();
            alert('Por favor digite un nombre');
        }
        
    }
    const showPokemons = () =>{    
        return (
            <div className={style.extern}>
                <div className={style.search}>
                    <form onSubmit={DetailPokemon}>
                        <input className={style.input} type="text" value={search} onChange={(e)=>onHandleChange(e)} />
                        <input className={style.btn} type="submit" value="Buscar"/>
                    </form>
                </div>
                <div className={style.container}>
                    <div className={style.barleft}>
                        <p> Filtros:</p>
                        <ul>
                            {
                                TypesState.map((t,i) => {
                                    return (
                                        <li><input type="checkbox" key={i} />{t.name}</li>
                                    )
                                })
                            }
                        </ul>
                        <p> Ordenamientos:</p>
                        <ul>
                            <li><input type="checkbox" onChange={(e) => orderAsc(e)}/> A to Z</li>
                            <li><input type="checkbox" /> Z to A</li>
                            <li><input type="checkbox" /> + Force to - Force</li>
                            <li><input type="checkbox" /> - Force to + Force</li>
                        </ul>
                    </div>
                    <div className={style.barright}>
                        {
                            currentPokemons.map(pokemon => {
                                return (
                                    <div key={pokemon.id} className={style.card}>
                                        <div className={style.images}>
                                            {
                                                pokemon.picture ? (<img src={pokemon.picture}/>) : (<img src={notFound}/>)
                                            } 
                                        </div>
                                        <h2> {pokemon.name} </h2>
                                        <p> Types :</p>
                                        <ul>
                                            {
                                                pokemon.types.map((type, i) => {
                                                    return (
                                                        <li key={i}> {type.name} </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    const showLoading = () => <h1> Pokemons vacio</h1>

    return (
        <div>
            {currentPokemons.length ? showPokemons() : showLoading()}
        </div>
    )
}


export default Pokemons;