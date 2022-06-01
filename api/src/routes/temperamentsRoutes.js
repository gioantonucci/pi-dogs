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
    try {
    const dataApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let temperaments = dataApi.data.map((el) => el.temperament);
    temperaments = temperaments.join(", ").split(", ");
    temperaments = temperaments.filter((el) => el);
    temperaments = [...new Set(temperaments)].sort();
    //console.log(temperaments);
    temperaments.forEach((el) => {
        Temperament.findOrCreate({
        where: { name: el },
    });
  });
  const allTemperament = await Temperament.findAll();
  res.send(allTemperament);
} catch{ 
    res.send("Error")
}
});
    


 module.exports = router;