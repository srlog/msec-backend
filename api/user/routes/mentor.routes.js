const express = require("express");
const mentorController = require("../controllers/mentor.controller");

const router = express.Router();

router.post("/register", mentorController.mentorRegister);
router.post("/login", mentorController.mentorLogin);
router.put("/update-password", mentorController.mentorUpdatePassword);

module.exports = router;