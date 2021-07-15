const { Type } = require('../db');
const { API_TYPES } = require('../constants');
const axios = require('axios');
const router = require('express').Router();

router.get('/',async(req,res)=>{
    let allTypes = await axios.get(API_TYPES);
    if(allTypes){
        let list = allTypes.data.results;
        try{
            list.forEach((type) => {
                let name = type.name;
                Type.findOrCreate({
                    where:{
                        name
                    }
                })            
            });
        }catch(err){
            res.send('no se registro');
        }
    }
    const types = await Type.findAll();
        res.json(types);
})

module.exports = router;