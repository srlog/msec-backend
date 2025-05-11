const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Project = require("./Project");
const Mentor = require("./Mentor");

const Feedback = sequelize.define(
  "Feedback",
  {
    feedback_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "project_id",
      },
      onDelete: "CASCADE",
    },
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentor,
        key: "mentor_id",
      },
      onDelete: "CASCADE",
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    feedback_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "feedback",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Feedback;
