import React from 'react';
import style from './Pagination.module.css'

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate}) => {
    const PageNumber = [];

    for(let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++){
        PageNumber.push(i)
    }

    return (
        <nav className={style.pagination}>
            <ul className={style.paginate}>
                {PageNumber.map(number => {
                    return (
                        <li key={number} className={style.number}>
                            <a href="#" onClick={() => paginate(number)}>{number}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination;