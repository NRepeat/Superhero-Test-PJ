"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("superpowers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      superpower: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      superheroId: {
        field:"superhero_id",
        type: Sequelize.INTEGER,
        allowNull: true,
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        field:"updated_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("superpowers");
  },
};
