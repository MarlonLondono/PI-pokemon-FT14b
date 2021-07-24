import {Route, Switch} from 'react-router-dom';
import Landing from './components/landing/index';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons, getPokemon, getTypes} from './actions';
import Pagination from './components/pokemons/Pagination';
import Pokemons from './components/pokemons/pokemons';
import NavBar from './components/navbar/navbar';
import DetailPokemon from './components/DetailPokemon/detailPokemon';
import CreatePokemon from './components/createPokemon/create';
import style from './App.module.css';


function App() {
  const dispatch = useDispatch();
  const PokemonsState = useSelector(store => store.getPokemons);
  const [currentPage, setCurrenpage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); 

  useEffect(()=>{
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch])

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = PokemonsState.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber)=> setCurrenpage(pageNumber);

  return (
    <div className={style.App}>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>  
      <Route path="/pokemons">
        <NavBar />
      </Route>
      <Route exact path="/pokemons">
        <Pokemons currentPokemons={currentPokemons} getPokemon={getPokemon} pokemonsState={PokemonsState} />
        <Pagination 
        pokemonsPerPage={pokemonsPerPage} 
        totalPokemons={PokemonsState.length} 
        paginate={paginate} />
      </Route>
      <Route path="/pokemons/detail">
        <DetailPokemon />
      </Route>
      <Route path="/pokemons/create">
        <CreatePokemon />
      </Route>
      
    </div>
  );
}

export default App;