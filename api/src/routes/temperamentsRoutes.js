const { Router } = require('express');
const axios = require ("axios");
const {Temperament} = require('../db');
const {API_KEY} = process.env

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


// - [X] __GET /temperament__:
// - Obtener todos los temperaments posibles
// - En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get("/temperaments", async function (req, res) {    
    let getTemps = await Temperament.findAll()
    if(getTemps.length !== 0) {
        res.send(getTemps) 
    } else {
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(async response => {
        let allTemperaments = []
        let temperaments = response.data.map((el) => el.temperament) 
        let newTemperaments = temperaments.map((el) => el && el.split(",")).flat()
        newTemperaments.forEach((el) => {
             if(allTemperaments.indexOf(el) < 0) allTemperaments.push(el)
        })
         for (let i = 0; i < 10; i++) {
             await Temperament.create({
                 name: allTemperaments[i]
             }) 
        }
        res.send(allTemperaments)
    }) 
     .catch(error => {
         console.log(error)
    })           
    } 
})

 module.exports = router;