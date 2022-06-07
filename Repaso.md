\\BACK-END

router.delete("/:id", async function (req, res,next) {
    const {id} = req.params
try {
     await Dog.destroy({
        where:{
            id:id
        }
    })
    return res.send("dog eliminated")
} catch (error) {
    next(error)
}


router.post("/recipe", (req, res) => {
  let {
    title,
    summary,
    spoonacularScore,
    HealthScore,
    image,
    steps,
    readyInMinutes,
    DB,
    dishTypes,
    servings,
    diets,
  } = req.body;
  Recipe.create({
    title,
    summary,
    spoonacularScore,
    HealthScore,
    image,
    readyInMinutes,
    steps,
    DB,
    dishTypes,
    servings,
  })
    .then((e) => {
      for (let i = 0; i < diets.length; i++) {
        Diet.findOne({
          where: { name: diets[i] },
        })
          .then((find) => {
            if (find) {
              e.addDiet(find);
            } else {
              Diet.create({ name: diets[i] })
                .then((create) => {
                  e.addDiet(create);
                })
                .catch((create) => {
                  console.log(create);
                });
            }
          })
          .catch((find) => {
            console.log(find);
          });
      }
      res.status(201).json(e);
    })
    .catch((e) => {
      console.log(e);
    });
});