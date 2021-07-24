import React from "react";
import { Link } from "react-router-dom"; 
import styles from './landing.module.css';
import image from '../../img/pokemon-1577763_1920.jpg';

function landingPage(){
    return (
        <>
            <div className={styles.container}>
                <img className={styles.img} src={image} alt="picture main pokemon"/>
                <div className={styles.titulo}>
                    <h1>Pokemón</h1>
                    <Link to="/pokemons">
                        <div>
                            <h3>Start</h3>                   
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default landingPage;