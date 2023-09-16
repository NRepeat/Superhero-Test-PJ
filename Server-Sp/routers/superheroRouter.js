const superheroRouter = require("express").Router();

const superheroController = require("../controllers/superheroController");
const {
  validateSuperheroBody,
  validateSuperpowerBody
} = require('../middlewares/validate.mv');
superheroRouter.route("/all").get(superheroController.getAllSuperheros);

superheroRouter.route("/createSuperhero").post(superheroController.createSuperhero);
superheroRouter
  .route("/:superheroId")
  .get(superheroController.getSuperhero)
  .put(validateSuperheroBody,superheroController.updateSuperhero)
  .delete(superheroController.deleteSuperhero);

module.exports = superheroRouter;
