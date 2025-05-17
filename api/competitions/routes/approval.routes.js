const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/authMiddleware");


    
router.post("/department/approve/:registration_id", auth, approveDepartment);
router.post("/department/reject/:registration_id", auth, rejectDepartment);
router.post("/master/accept/:registration_id", auth, approveMaster);
router.post("/master/reject/:registration_id", auth, rejectMaster);

module.exports = router;
