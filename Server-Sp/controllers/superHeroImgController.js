const fs = require("fs");
const path = require("path");
const { superhero, superpowers, SuperhroImg } = require("../models");
const createHttpError = require("http-errors");
module.exports.addSuperheroImage = async (req, res, next) => {
	console.log("🚀 ~ file: superHeroImgController.js:9 ~ module.exports.addSuperheroImage= ~ filename:", req.file)
	try {
		const {
			file: { filename },
			params: { superheroId },
		} = req;


		const superheroIndex = await superhero.findByPk(superheroId);

		if (!superheroIndex) {
			const filePath = path.resolve(__dirname, `../public/images/${filename}`);
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error("Error while deleting the file:", err);
				} else {
				}
			});
			return next(createHttpError(404, "Superhero image doesnt exist"));
		}
		const superhroImg = await SuperhroImg.create({
			superheroImgPath: filename,
			superheroId: superheroId,
		});
		res.send({ data: superhroImg });
	} catch (error) {
		next(error);
	}
};
module.exports.getSuperheroImg = async (req, res, next) => {
	try {
		const {
			params: { superheroId },
		} = req;
		const superheroImgData = await SuperhroImg.findOne({
			where: { superheroId: superheroId },
			include: { model: superhero },
		});
		res.send({ data: superheroImgData });
	} catch (error) {
		next(error);
	}
};

module.exports.updateSuperheroImg = async (req, res, next) => {
	try {
		const {
			body,
			file: { filename },
			params: { superheroId },
		} = req;

		const filePath = path.join(__dirname, "../public/images", filename);
		const superheroImgToupdate = await SuperhroImg.findByPk(superheroId);

		const updatedSuperheroImg = await superheroImgToupdate.update({
			superheroImgPath: filename,
		});
		res.send({ data: updatedSuperheroImg });
	} catch (error) {
		next(error);
	}
};
module.exports.deleteSuperheroImg = async (req, res, next) => {
	try {
		const { superheroIds } = req.body;


		if (!Array.isArray(superheroIds)) {
			return next(createHttpError(400, "superheroIds should be an array"));
		}

		for (const superheroId of superheroIds) {
			const superheroImgData = await SuperhroImg.findByPk(superheroId);

			if (!superheroImgData) {
				console.error(`Superhero image with ID ${superheroId} not found`);
				continue;
			}

			const filePath = path.join(
				__dirname,
				"../public/images",
				superheroImgData.superheroImgPath
			);
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(`Error while deleting the file for superhero ID ${superheroId}:`, err);
				} else {
					console.log(`File for superhero ID ${superheroId} has been successfully deleted.`);
				}
			});

			await superheroImgData.destroy();
		}

		res.status(200).json({ message: "Superhero images deleted successfully" });
	} catch (error) {
		next(error);
	}
};
