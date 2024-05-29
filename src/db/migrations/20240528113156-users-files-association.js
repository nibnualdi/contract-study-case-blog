"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addConstraint("Users", {
      fields: ["avatar"],
      type: "foreign key",
      name: "users_files_association",
      references: {
        table: "Files",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeConstraint("Users", "users_files_association");
  },
};
