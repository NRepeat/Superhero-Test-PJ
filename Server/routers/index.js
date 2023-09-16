const express = require('express');
const rootRouter = express.Router();
const superheroRouter = require('./superheroRouter');
const superpowerRouter = require('./superpowerRouter');
const superheroImgRouter  =require("./superHeroImgRouter");


rootRouter.use('/superhero', superheroRouter);
rootRouter.use('/superpower',  superpowerRouter);
rootRouter.use("/superheroImg",superheroImgRouter)

module.exports = rootRouter;
