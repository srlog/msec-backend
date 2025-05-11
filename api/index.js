const express = require("express");
const router = express.Router();


const userRoutes = require("./user/routes/");

const portfolioRoutes = require("./portfolio/routes/");


router.use("/user", userRoutes);
router.use("/portfolio", portfolioRoutes);

module.exports = router;

