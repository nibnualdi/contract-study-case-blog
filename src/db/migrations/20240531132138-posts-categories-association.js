"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Posts", {
      fields: ["id"],
      type: "foreign key",
      name: "posts_categories_association",
      references: {
        table: "PostCategories",
        field: "postId",
      },
    });
    queryInterface.addConstraint("Categories", {
      fields: ["id"],
      type: "foreign key",
      name: "categories_posts_association",
      references: {
        table: "PostCategories",
        field: "categoryId",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint("Posts", "posts_categories_association");
    queryInterface.removeConstraint("Categories", "categories_posts_association");
  },
};
