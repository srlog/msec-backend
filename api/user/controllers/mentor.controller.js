const { Mentor } = require("../../../models");

const { ResponseConstants } = require("../../../constants/ResponseConstants");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const mentorRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: ResponseConstants.User.Error.AllFieldsRequired});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: ResponseConstants.User.Error.InvalidEmail });
    }

    const existingMentor = await Mentor.findOne({ where: { email } });
    if (existingMentor) {
      return res.status(400).json({ message: ResponseConstants.User.Error.ExistingUser });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const mentor = await Mentor.create({
      name,
      email,
      role,
      password: hashedPassword,
    });
    res.status(201).json({ message: ResponseConstants.User.SuccessRegistration.Mentor , mentor });
  } catch (error) {
    console.error("Error in Mentor registration:", error);
    res.status(500).json({ message: ResponseConstants.User.Error.InternalServerError , error});
  }
};
const mentorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const mentor = await Mentor.findOne({ where: { email } });
    if (!mentor) {
      return res.status(401).json({ message: ResponseConstants.User.Error.NotFound });
    }

    const passwordMatch = await bcrypt.compare(password, mentor.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: ResponseConstants.User.Error.LoginFailed });
    }

    const token = jwt.sign(
      { id: mentor.id, name: mentor.name, email: mentor.email, role: "Mentor" },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      message: ResponseConstants.User.SuccessLogin.Mentor,
      token,
      user: {
        id: mentor.id,
        email: mentor.email,
        name: mentor.name,
        role: "mentor",
      },
    });
  } catch (error) {
    console.error("Error in Mentor login:", error);
    res.status(500).json({ message: ResponseConstants.User.Error.InternalServerError , error});
  }
};
const mentorUpdatePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const mentor = await Mentor.findOne({ where: { email } });
    if (!mentor) {
      return res.status(404).json({ message: ResponseConstants.User.Error.NotFound });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      mentor.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: ResponseConstants.User.Error.LoginFailed });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await mentor.update({ password: hashedPassword });

    res.status(200).json({ message: ResponseConstants.User.SuccessUpdatePassword });
  } catch (error) {
    console.error("Error in Mentor update password:", error);
    res.status(500).json({ message: ResponseConstants.User.Error.InternalServerError , error});
  }
};

module.exports = {
  mentorRegister,
  mentorLogin,
  mentorUpdatePassword,
};

