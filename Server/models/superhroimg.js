"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SuperhroImg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SuperhroImg.belongsTo(models.superhero, {
        foreignKey: "superhero_id",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  SuperhroImg.init(
    {
      superheroImgPath: { type: DataTypes.STRING, field: "superhero_img_path" },
    },
    {
      sequelize,
      modelName: "SuperhroImg",
      tableName: "superhero_imgs",
      underscored: true,
    }
  );
  return SuperhroImg;
};
