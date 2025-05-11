const express = require("express");
const router = express.Router();

const studentRoutes = require("./student.routes");
const adminRoutes = require("./admin.routes");
const masterRoutes = require("./master.routes");
const profileRoutes = require("./profile.routes");

router.use("/student", studentRoutes);
router.use("/admin", adminRoutes);
router.use("/master", masterRoutes);
router.use("/user", profileRoutes);

module.exports = router;