const express = require("express");
const router = express.Router();

router.post("/:registration_id", addMember);
router.delete("/:team_member_id", deleteMember);

module.exports = router;
