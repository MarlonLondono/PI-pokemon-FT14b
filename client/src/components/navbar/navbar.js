import {NavLink} from 'react-router-dom';
import style from './navbar.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {backHome} from '../../actions';

function Navbar(){
    const dispatch = useDispatch();

    const onHandleClickHome = (e) => {
        e.preventDefault();
        dispatch(backHome());
    }

    return (
        <div className={style.containExtern}>
            <div className={style.container}>
                <div className={style.menu} onClick={onHandleClickHome}>
                    <NavLink to="/pokemons" className={style.item} >
                        Home
                    </NavLink>
                </div>
                <div className={style.menu}>
                    <NavLink to="/pokemons/create" className={style.item}>
                        Create Pokemon
                    </NavLink>
                </div>
            </div>
        </div>
        
    )
}

export default Navbar;