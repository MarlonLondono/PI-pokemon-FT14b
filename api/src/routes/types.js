const { Type } = require('../db');
const { API_TYPES } = require('../constants');
const axios = require('axios');
const router = require('express').Router();

router.get('/',async(req,res)=>{
    // let allTypes = await axios.get(API_TYPES);
    // if(allTypes){
    //     let list = allTypes.data.results;
    //     list.forEach(async(type) => {
    //         axios.get(type.url)
    //         .then(dtType => {
    //             let name = dtType.data.name;
    //             try{
    //                 const [type, created] = Type.findOrCreate({
    //                     where:{
    //                         name
    //                     }
    //                 })
    //                 console.log(created);
    //                 res.json(type);
    //             }catch(err){
    //                 res.send('No se pudo crear el tipo');
    //             }
    //         })
    //     });
    // }
})

module.exports = router;