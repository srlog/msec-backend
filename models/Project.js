//project.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Mentor= require("./Mentor");

// Define the "Project" model
const Project = sequelize.define(
  "Project",
  {
    // Unique project ID
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      AutoIncrement: true,
    },
    // Title of the project
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // Description of the project
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // GitHub repository URL
    github_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // Uploaded by (could be student name or ID)
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
    },
    // Associated mentor's ID
    mentor_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: Mentor,
        key: "mentor_id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    tableName: "projects", // Table name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Project;