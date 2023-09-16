const superpowerRouter = require("express").Router();
const superpowerController = require("../controllers/superpowersController");



superpowerRouter.route("/").post(superpowerController.createSuperpower);
superpowerRouter
  .route("/:superpowerId")
  .put(superpowerController.updateSuperpower)
  .delete(superpowerController.deleteSuperpower);
module.exports = superpowerRouter;
