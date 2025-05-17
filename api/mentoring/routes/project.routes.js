const express = require("express");
const router = express.Router();

const projectController = require("../controllers/Project.controller");
const auth = require("../../../middleware/authMiddleware");

router.post("/", auth, projectController.createProject);
router.put("/:id", auth, projectController.updateProject);
router.delete("/:id", auth, projectController.deleteProject);
router.get("/", auth, projectController.getAllProjects);
router.get("/:id", auth, projectController.getProjectById);
router.get(
  "/student/:created_by",
  auth,
  projectController.getProjectByStudentId
);
router.get("/mentor/:mentor_id",auth, projectController.getProjectsByMentorId);
router.get("/recent", auth, projectController.getRecentProjects);

module.exports = router;
