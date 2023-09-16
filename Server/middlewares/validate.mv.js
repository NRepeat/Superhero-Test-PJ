const {
  SUPERPOWER_CREATION_SCHEMA,
  SUPERHERO_CREATION_SCHEMA,
} = require("../validation/superheroSchema");
function validateSuperheroBody(req, res, next) {
  SUPERHERO_CREATION_SCHEMA.validate(req.body)
    .then((validatedUser) => {
      console.log("SUPERHERO is valid");
      next();
    })
    .catch((err) => {
      console.log("SUPERHERO is invalid");
      res.send(err.message);
    });
}
module.exports.validateSuperheroBody = validateSuperheroBody;

function validateSuperpowerBody(req, res, next) {
  SUPERPOWER_CREATION_SCHEMA.validate(req.body)
    .then((validatedUser) => {
      console.log("SUPERPOWER is valid");
      next();
    })
    .catch((err) => {
      console.log("SUPERPOWER is invalid");
      res.send(err.message);
    });
}
module.exports.validateSuperpowerBody = validateSuperpowerBody;
