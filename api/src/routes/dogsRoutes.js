const { Router } = require('express');
const axios = require ("axios");
const {Dog, Temperament} = require('../db');
const {API_KEY} = process.env

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------GET---------------------------

//traer la informacion desde la api
const getApiInfo = async () => {
  try {
        const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = await apiUrl.data.map((e) => {
     
        return {
        
         name: e.name,
        id: e.id,
        height_max: e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
        height_min: e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
        weight_max: e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
        weight_min: e.weight.metric.split(" - ")[0] !== "NaN" ? e.weight.metric.split(" - ")[0] : 6,
        life_time_max: e.life_span.split(" - ")[1] && e.life_span.split(" - ")[1].split(" ")[0],
        life_time_min: e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
        temperament: e.temperament ? e.temperament : "Perrito sin temperamentos!",
        image: e.image.url,
      
        };
      });
      return apiInfo;
  } catch (error) {
    console.log("Hubo un error en el getApiInfo", error)
  }
};

//traer la informacion desde la db
const getDBinfo = async () => {
  try {
    return await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"], //traigo el nombre de los temperamentos
        through: {
          attributes: [], //tomo solo lo que queda en el arreglo atributes
        },
      },
    });
  } catch (error) {
    console.log("Hubo un error en getDBInfo", error)
  }
};

//concateno ambas fuentes de informacion
const getAllDogs = async () => {
 try{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log("Hubo un error en infoTotal", error)
  }
};

// - [X] __GET /dogs__:
// - Obtener un listado de las razas de perro
// - Debe devolver solo los datos necesarios para la ruta principal
// - [X] __GET /dogs?name="..."__:
// - Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// - Si no existe ninguna raza de perro mostrar un mensaje adecuado

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if (name) {
        let dogName = await dogsTotal.filter(el =>
            el.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length?
            res.status(200).send(dogName):
            res.status(400).send("Raza inexistente");
        } else {
            res.status(200).send(dogsTotal)
        }
})


// - [X] __GET /dogs/{idRaza}__:
// - Obtener el detalle de una raza de perro en particular
// - Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// - Incluir los temperamentos asociados
router.get('/dogs/:id', async (req, res) => {
  const id = req.params;
  const dogsTotal = await getAllDogs();
  if (id) {
      let dogId = await dogsTotal.filter(el => el.id == id);
      dogId.length? res.status(200).json(dogId) :
      res.status(404).send("Ese perrito no está!");
  }
})

//----------------------------------POST-------------------------------

// - [X] __POST /dog__:
// - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// - Crea una raza de perro en la base de datos

router.post('/dog', async (req, res) => {
    let {
    name,
    height_max,
    height_min,
    weight_max,
    weight_min,
    life_time_min,
    life_time_max,
    image,
    temperaments,
  } = req.body;
  try {
    let newDog = await Dog.create({
      name,
      height_max,
      height_min,
      weight_max,
      weight_min,
      life_time_max,
      life_time_min,
      image
    });
    for (let i = 0; i < temperaments.length; i++) {
      let temperamentDb = await Temperament.findOne({
        where: { name: temperaments[i] },
      });
      newDog.addTemperament(temperamentDb);
    }
    res.send("Perrito creado!");
  } catch (err) {
    
    res.status(404).send(`Falta informacion para crear a tu perrito!`);
    console.log(err);
  }
})


module.exports = router;