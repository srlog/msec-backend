//mentor.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the "Mentor" model
const Mentor = sequelize.define(
  "Mentor",
  {

    // Unique mentor ID
    mentor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Full name
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Email address
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    // Password (plain text or hashed externally)
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // Department name
    department: {
      type: DataTypes.ENUM("AI&DS", "CSE", "CIVIL", "EEE", "ECE", "IT", "MECH"),
      allowNull: false,
    },

  },
  {
    tableName: "mentors", // Table name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Mentor;