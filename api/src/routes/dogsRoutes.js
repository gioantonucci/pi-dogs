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
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el =>{
        return {
            id: el.id,
            name: el.name,
            heigh: el.height,
            weight: el.weight,
            life_span: el.life_span,
            image: el.image,
            userCreate: true,
            temperament: el.temperament,
        };
    });
    return apiInfo;
};

//traer la informacion desde la db
const getDBinfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            //comprobacion
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

//concateno ambas fuentes de informacion
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

// - [X] __GET /dogs__:
// - Obtener un listado de las razas de perro
// - Debe devolver solo los datos necesarios para la ruta principal
// - [X] __GET /dogs?name="..."__:
// - Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// - Si no existe ninguna raza de perro mostrar un mensaje adecuado

router.get('/dogs', async (req, res) => {
    const name = req.query.name;
    let dogsTotal = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
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
  const id = req.params.id;
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
        name = "tu perrito",
        weight,
        height,
        temperament,
        life_span,
        image,
        userCreate
    } = req.body

    try { let dogCreated = await Dog.create({
        name,
        weight,
        height,
        life_span,
        image,
        userCreate,
    })

    let temperamentDb = await Temperament.findAll({
        where: {name: temperament}
    })
    dogCreated.addTemperament(temperamentDb)
    res.send("Perrito creado!")
    } catch {
    res.status(404).send(`Falta información para crear a ${name}!`);
}
})



module.exports = router;