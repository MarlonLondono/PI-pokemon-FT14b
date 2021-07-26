import React from 'react';
import { connect, useSelector } from 'react-redux';
import {isUUID} from '../../actions';
import style from './detail.module.css';
import notFound from '../../img/notfound.jpg';

const DetailPokemon = (props)=>{
    const Detail = useSelector(store => store.getDetailPokemon);

    const checkDetail = () => {
        if(Detail.name) return true;
        else return false;
    }

    const statsApi = () => {
        return (
            <ul>
                {
                    props.pokemon.stats && props.pokemon.stats.map((s,i) => {
                        return (
                            <li key={i}> {s.name}: {s.base_stat} </li>
                        )
                    })
                }
                <li> Height: {props.pokemon.height} </li>
                <li> Weight: {props.pokemon.weight} </li>
            </ul>
        )
    }

    const statsDb = () => {
        return (
            <ul>
                <li>hp: {props.pokemon.life} </li>
                <li>attack: {props.pokemon.force} </li>
                <li>defense: {props.pokemon.defense} </li>
                <li>speed: {props.pokemon.speed} </li>
                <li> Height: {props.pokemon.height} </li>
                <li> Weight: {props.pokemon.weight} </li>
            </ul>
        )
    }

    const showDetail = () => {
        return(
            <div className={style.extern}>
                <div className={style.contain}>
                    <h1>{props.pokemon.name}</h1>
                    <div className={style.detail}>
                        <div className={style.image}>
                            { props.pokemon.picture ? (<img src={props.pokemon.picture}/>) : (<img src={notFound}/>)}
                        </div>
                        <div className={style.info}>
                            <p> Id: {props.pokemon.id} </p>
                            <p>Types</p>
                            <ul>
                                {
                                    props.pokemon.types && props.pokemon.types.map((t,i)=>{
                                        return (
                                            <li key={i}> {t.name} </li>
                                        )
                                    })
                                }
                            </ul>
                            <p>stats</p>
                            <div>
                                {isUUID.test(props.pokemon.id) ? statsDb() : statsApi()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

    const showLoading = () => (
        <div>
            <h1>Loading...</h1>
        </div>
    )

    return (
        <div>
            {checkDetail() ? showDetail() : showLoading()}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        pokemon: state.getDetailPokemon   
    }
}

export default connect(mapStateToProps,{})(DetailPokemon);