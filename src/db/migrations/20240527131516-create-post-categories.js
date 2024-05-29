"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PostCategories", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      postId: {
        type: Sequelize.UUID,
        references: {
          model: "Posts",
          key: "id",
          as: "postId",
        },
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: "Categories",
          key: "id",
          as: "categoryId",
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PostCategories");
  },
};
