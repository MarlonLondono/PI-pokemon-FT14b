import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import { getTypes, postPokemon, getPokemons } from "../../actions";
import style from './create.module.css';

const Create = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const TypesState = useSelector(store => store.getTypes);
    const msg = useSelector(store => store.msg)

    const [pokemon,setPokemon] = useState({
        name: '',
        types: [],
        life: '',
        force: '',
        defense: '',
        speed: '',
        height: '',
        weight: ''
    });

    const onHandleChange = (e)=>{
        setPokemon({
            ...pokemon,
            [e.target.name]:e.target.value
        })        
    }

    const onHandleClick = (e) => {
        e.preventDefault();
        if(!pokemon.types.includes(e.target.value)){
            setPokemon({
                ...pokemon,
                types: pokemon.types.concat(e.target.value)
            })
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        setPokemon({
            ...pokemon,
            types: pokemon.types.filter(type => type !== e.target.name)
        })
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
        dispatch(postPokemon(pokemon));
        alert(msg);
        history.push('/pokemons');
    }

    useEffect(()=>{
        dispatch(getTypes());
    },[])

    console.log(TypesState);

    return (
        <div className={style.extern}>
            <div className={style.contain}>
                <h1>Create a new pokemon</h1>
                <div className={style.intern}>
                    <form onSubmit={onHandleSubmit}>
                        <div>
                            <label>Name*:</label>
                            <input type="text" name="name" onChange={(e)=> onHandleChange(e)} required/>
                        </div>
                        <label>Types:</label>
                        <div className={style.types}>
                            {
                                TypesState.map((type, i) => {
                                    return (
                                        <button key={i} name="types" value={type.name} onClick={(e) => onHandleClick(e) }>{type.name}</button>
                                    )
                                })
                            }
                        </div>
                        <div className={style.types}>
                            <ul>
                            {
                                pokemon.types.map((t,i) =>{
                                    return (
                                        <li key={i}><a href="#" name={t} onClick={(e) => handleClick(e)}>{t}</a></li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                        <div>
                            <label>Life:</label>
                            <input type="text" name="life" onChange={(e)=> onHandleChange(e)} />
                        </div>
                        <div>
                            <label>Force:</label>
                            <input type="text" name="force" onChange={(e)=> onHandleChange(e)} />
                        </div>
                        <div>
                            <label>Defense:</label>
                            <input type="text" name="defense" onChange={(e)=> onHandleChange(e)} />
                        </div>
                        <div>
                            <label>Speed:</label>
                            <input type="text" name="speed" onChange={(e)=> onHandleChange(e)} />
                        </div>
                        <div>
                            <label>Height:</label>
                            <input type="text" name="height" onChange={(e)=> onHandleChange(e)} />
                        </div>
                        <div>
                            <label>Weight:</label>
                            <input type="text" name="weight" onChange={(e)=> onHandleChange(e)} />
                        </div>
                        <div>
                            <input type="submit" value="Create" onChange={(e)=> onHandleChange(e)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Create;