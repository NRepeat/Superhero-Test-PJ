
const { superhero, superpowers, SuperhroImg } = require("../models");
const createHttpError = require("http-errors");

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const {
      body: { superpower, ...info },
    } = req;

    if (!superpower) {
      const d = await superhero.create(info);
  
      return res.send({ data: d });
    }

    const superheroData = await superhero.create(info);
    const superpowerArr = {
      superpower: superpower,
      superheroId: superheroData.dataValues.id,
    };

    const superpowerData = await superpowers.create(superpowerArr);
    res.send({ data: superheroData, superpowerData });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllSuperheros = async (req, res, next) => {
  const superheros = await superhero.findAll({
    include: [
      {
        model: superpowers,
      },
      {
        model: SuperhroImg,
      },
    ],
  });
  if (!superheros) {
    const error = createHttpError(404, "Superheros not found");
    return next(error);
  }
  res.send({ data: superheros });
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const {
      params: { superheroId },
    } = req;
    const superheroData = await superhero.findByPk(superheroId, {
      include: [
        {
          model: superpowers,
        },
        {
          model: SuperhroImg,
        },
      ],
    });
    if (!superheroData) {
      const error = createHttpError(404, "Superhero not found");
      return next(error);
    }
    res.send({ data: superheroData });
  } catch (error) {
    next(error);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const {
      body,
      params: { superheroId },
    } = req;

    if (!superheroId) {
      return next(createHttpError(404, "User not found"));
    }
    const superheroToupdate = await superhero.findByPk(superheroId);

    const updatedSuperhero = await superheroToupdate.update(body);

    res.send({ data: updatedSuperhero });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {
      params: { superheroId },
    } = req;
    const superheroToDelete = await superhero.findByPk(superheroId);

    if (!superheroToDelete) {
      const notFoundError = createHttpError(404, "Superhero not found");
      return next(notFoundError);
    }

    await superhero.destroy({
      where: {
        id: superheroId,
      },
    });

    res.send({ data: superheroToDelete });
  } catch (error) {
    next(error);
  }
};
