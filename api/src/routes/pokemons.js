const { Pokemon, Type } = require('../db');
const { API, isUUID } = require('../constants');
const axios = require('axios');
const router = require('express').Router();

router.get('/',async(req,res)=>{
    const {name} = req.query;
    if(name){
        let poke = await axios.get(`${API}?limit=1118`);
        if(poke){
            let list = poke.data.results;
            let fPoke = list.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
            let pokeDb = await Pokemon.findAll({ where: { name: name.toLowerCase()}, include: Type});
            if(fPoke){
                axios.get(fPoke.url)
                .then(dtPoke =>{
                    let types = dtPoke.data.types.map(t => {
                        return {
                            name: t.type.name
                        }
                    });
                    let stats = dtPoke.data.stats.map(s => {
                        return {
                            name: s.stat.name,
                            base_stat: s.base_stat
                        }
                    })
                    let newPokemon = {
                        id: dtPoke.data.id,
                        picture: dtPoke.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                        name: dtPoke.data.name,
                        types,
                        stats,
                        height: dtPoke.data.height,
                        weight: dtPoke.data.weight,
                        isDB: false
                    }            
                    res.json(newPokemon);
                })
            }else if(pokeDb){
                if(pokeDb[0]){
                    res.json(pokeDb[0]);
                }else{
                    res.status(404).send('pokemon no encontrado');
                }
            }
        }
    }else{
        let limit = 40;
        let poke = await axios.get(`${API}?limit=${limit}`);
        const pokemonsDt = poke.data.results.map(pokemon => pokemon.url)
        const pokemon = await Promise.all(pokemonsDt.map(pokemon => axios.get(pokemon)))
        const pokes = pokemon.map(poke => {
            let types = poke.data.types.map(t => {
                return {
                    name: t.type.name
                }
            });
            return {
                id: poke.data.id,
                name: poke.data.name,
                picture: poke.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                types,
                force: poke.data.stats[1].base_stat,
                isDB: false
            }
        })
        let pokeDb = await Pokemon.findAll({include: Type});
        const pokesDb = await pokeDb.map(poke => {
            return poke.dataValues;
        })
        res.json(pokes.concat(pokesDb));
    }
})

router.get('/:idPokemon',async (req,res)=>{
    const {idPokemon} = req.params;
    if(idPokemon){
        let poke = null;
        let findpoke = null;
        if(isUUID.test(idPokemon)){
            try{
                findpoke = await Pokemon.findAll({ where: { id: idPokemon}, include: Type});
            }catch(err){
                return res.send('el ID es invalido');
            }
        }else{
            try{
                poke = await axios.get(`${API}/${idPokemon}`);
            }catch(err){
                return res.send('el ID es invalido');
            }
        }
        if(poke){
            let newPokemon = {
                id: poke.data.id,
                imagen: poke.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                nombre: poke.data.name,
                types: poke.data.types,
                stats: poke.data.stats,
                height: poke.data.height,
                weight: poke.data.weight
            }            
            res.json(newPokemon);
        }else if(findpoke){
            res.json(findpoke[0]);
        }else{
            res.status(404).send('<h2>Pokemon no encontrado</h2>');
        }
    }else{
        res.status(404).send('<h2>Pokemon no encontrado</h2>');
    }
})

router.post('/',async(req,res)=>{
    let {name, life, force, defense, speed, height, weight, types} = req.body;
    life ? life : life = null;
    force ? force : force = null;
    defense ? defense : defense = null;
    speed ? speed : speed = null;
    height ? height : height = null;
    weight ? weight : weight = null;
    types ? types : types = null;
    console.log(name,life,force,defense,speed,height,weight,types);
    let relTypes = types && types.map(type => {
            return Type.findOrCreate({
                where:{
                    name: type
                }
            })
        });        
    let allTypes = await Promise.all(relTypes);
    let pokemon = await Pokemon.findOrCreate({
        where:{
            name: name,
            life: life,
            force: force,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            isDB: true
        }
    })
    allTypes.forEach(type => pokemon[0].setTypes(type[0]));
    res.send('registro exitoso');
})

module.exports = router;