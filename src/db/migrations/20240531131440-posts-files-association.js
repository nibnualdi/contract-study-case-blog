"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Posts", {
      fields: ["thumbnail"],
      type: "foreign key",
      name: "posts_files_association",
      references: {
        table: "Files",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint("Posts", "posts_files_association");
  },
};
