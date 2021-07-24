import {NavLink} from 'react-router-dom';
import style from './navbar.module.css';

function Navbar(){
    return (
        <div className={style.container}>
            <div className={style.menu}>
                <NavLink to="/pokemons" className={style.item}>
                    Home
                </NavLink>
            </div>
            <div className={style.menu}>
                <NavLink to="/pokemons/create" className={style.item}>
                    Create Pokemon
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;