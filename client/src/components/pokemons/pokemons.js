import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import style from './pokemons.module.css';
import notFound from '../../img/notfound.jpg';                                              
import {searchPokemon, orderAscDesc, orderForceAscDesc, filterType, filterDb} from '../../actions';

function Pokemons({currentPokemons, getPokemon}){
    const [search,setSearch] = useState();
    const history = useHistory();    
    const TypesState = useSelector(store => store.getTypes);
    const dispatch = useDispatch();

    const onHandleChange = (event)=>{
        setSearch(event.target.value);
    }    
    
    const orderAscPokemons = (e) => {
        e.preventDefault();
        dispatch(orderAscDesc(e.target.name));
    }

    const orderForcePokemons = (e) => {
        console.log(e.target.name);
        e.preventDefault();
        dispatch(orderForceAscDesc(e.target.name));
    }

    const filterTypes = (e) => {
        console.log(e.target.name);
        e.preventDefault();
        dispatch(filterType(e.target.name));
    }

    const handleFilterDB = (e) => {
        console.log(e.target.name);
        e.preventDefault();
        dispatch(filterDb(e.target.name));
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        if(search){
            dispatch(searchPokemon(search));
        }else{
            alert('please enter a name');
        }
    }

    const DetailPokemon =(e)=>{
        console.log(e.target.name);
        e.preventDefault();
        dispatch(getPokemon(e.target.name));
        history.push('/pokemons/detail');        
    }
    const showPokemons = () =>{    
        return (
            <div className={style.extern}>
                <div className={style.search}>
                    <form onSubmit={onHandleSubmit}>
                        <input className={style.input} type="text" value={search} onChange={(e)=>onHandleChange(e)} />
                        <input className={style.btn} type="submit" value="Search"/>
                    </form>
                </div>
                <div className={style.container}>
                    <div className={style.barleft}>
                        <p> Filters:</p>
                        <ul>
                            {
                                TypesState.map((t) => {
                                    return (
                                        <li key={t.id}><button name={t.name} onClick={filterTypes} >{t.name}</button></li>
                                    )
                                })
                            }
                            <li><button name="bd" onClick={handleFilterDB}> Pokemons de la BD</button></li>
                            <li><button name="api" onClick={handleFilterDB}>Pokemons de la API</button></li>
                        </ul>
                        <p> Ordinances:</p>
                        <ul>
                            <li><button name="atoz" onClick={orderAscPokemons} > A to Z</button></li>
                            <li><button name="ztoa" onClick={orderAscPokemons} > Z to A</button></li>
                            <li><button name="-fto+f" onClick={orderForcePokemons}> - Force to + Force </button></li>
                            <li><button name="+fto-f" onClick={orderForcePokemons}> + Force to - Force</button></li>
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
                                        <a onClick={DetailPokemon} name={pokemon.name}> {pokemon.name} </a>
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

    const showLoading = () => (
        <div>
            <h1> Loading Pokemóns...</h1>
        </div>
    )

    return (
        <div>
            {currentPokemons.length ? showPokemons() : showLoading()}
        </div>
    )
}


export default Pokemons;