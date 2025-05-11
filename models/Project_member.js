//team_members.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Project = require("./Project");
const Student = require("./Student");

// Define the "ProjectMember" model
const ProjectMember = sequelize.define(
  "ProjectMember",
  {
    // Unique ID for the Project member record
    project_member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Project to which the student is linked
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "project_id",
      },
      onDelete: "CASCADE",
    },
    // Student's ID (could be roll number or registration number)
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "project_members", // Table name in DB
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = ProjectMember ;