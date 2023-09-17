const { Op } = require("sequelize");
const { Superhero, superpowers } = require("../models");
const createHttpError = require("http-errors");

module.exports.createSuperpower = async (req, res, next) => {
	try {
		const { body } = req;
		const superpower = await superpowers.create(body);
		res.send({ data: superpower });
	} catch (error) {
		next(error);
	}
};
module.exports.getAllSuperpowers = async (req, res, next) => {
	const superpower = await superpowers.findAll();
	if (!superpower) {
		const error = createHttpError(404, "Superheros not found");
		return next(error);
	}
	res.send({ data: superpower });
};
module.exports.getSuperpower = async (req, res, next) => {
	try {
		const {
			params: { superpowerId },
		} = req;
		const superpowerData = await superpowers.findByPk(superpowerId, {

		});
		if (!superpowerData) {
			const error = createHttpError(404, "Superhero not found");
			return next(error);
		}
		res.send({ data: superpowerData });
	} catch (error) {
		next(error);
	}
};
module.exports.updateSuperpower = async (req, res, next) => {
	try {
		const {
			body,
			params: { superpowerId },
		} = req;


		if (!superpowerId) {
			return next(createHttpError(404, "Superpower not found"));
		}

		const superpowerToUpdate = await superpowers.findByPk(superpowerId);

		if (!superpowerToUpdate) {
			return next(createHttpError(404, "Superpower not found"));
		}

		const updatedSuperpower = await superpowerToUpdate.update(body);

		res.send({ data: updatedSuperpower });
	} catch (error) {
		next(error);
	}
};;
module.exports.deleteSuperpower = async (req, res, next) => {
	try {
		const {
			params: { superpowerId },
		} = req;
		const superpowerToDelete = await superpowers.findByPk(superpowerId);

		if (!superpowerToDelete) {
			const notFoundError = createHttpError(404, "Superhero not found");
			return next(notFoundError);
		}

		await superpowers.destroy({
			where: {
				id: superpowerId,
			},
		});

		res.send({ data: superpowerToDelete });
	} catch (error) {
		next(error);
	}
};
