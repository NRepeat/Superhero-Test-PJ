const superheroImgRouter = require("express").Router();
const superHeroImgController = require("../controllers/superHeroImgController");
const imageUpload = require("../utils/imageUpload");

superheroImgRouter
  .route("/:superheroId/img")
  .post(imageUpload.single("image"), superHeroImgController.addSuperheroImage)
  .get(superHeroImgController.getSuperheroImg)
  .put(imageUpload.single("image"), superHeroImgController.updateSuperheroImg)
  .delete(superHeroImgController.deleteSuperheroImg)

module.exports = superheroImgRouter;
