const fs = require("fs");
const path = require("path");
const { superhero, superpowers, SuperhroImg } = require("../models");
const createHttpError = require("http-errors");
module.exports.addSuperheroImage = async (req, res, next) => {
	try {
		const {
			file: { filename },
			params: { superheroId },
		} = req;
		console.log(superheroId);
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
		const {
			params: { superheroId },
		} = req;

		const superheroImgData = await SuperhroImg.findByPk(superheroId);

		if (!superheroImgData) {
			return next(createHttpError(404, "Superhero image not found"));
		}

		const filePath = path.join(
			__dirname,
			"../public/images",
			superheroImgData.superheroImgPath
		);
		fs.unlink(filePath, (err) => {
			if (err) {
				console.error("Error while deleting the file:", err);
			} else {
				console.log("File has been successfully deleted.");
			}
		});

		await superheroImgData.destroy();

		res.send({ message: "Superhero image deleted successfully" });
	} catch (error) {
		next(error);
	}
};
