'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('superhero_imgs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      superheroImgPath: {
        type: Sequelize.STRING,
        field:"superhero_img_path"
      },
      superheroId: {
        type: Sequelize.INTEGER,
        field:"superhero_id",
        references: {
          model: "superheroes",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      createdAt: {
        field:"created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field:"updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('superhero_imgs');
  }
};