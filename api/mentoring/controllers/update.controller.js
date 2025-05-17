const {
  Project_update,
} = require("../../../models/index");

const { ResponseConstants } = require("../../../constants/ResponseConstants");

const createProjectUpdate = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { title, description } = req.body;
    const student_id = req.user.id;

    const projectUpdate = await Project_update.create({
      project_id,
      student_id,
      title,
      description,
    });
    

    res
      .status(201)
      .json({ message: ResponseConstants.Update.SuccessUpdate, projectUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating project update" });
  }
};

// Read a project update by ID
const readProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const projectUpdate = await Project_update.findByPk(id);

    if (!projectUpdate) {
      res.status(404).json({ message: "Project update not found" });
    } else {
      res.status(200).json({ message: "Project update found", projectUpdate });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error reading project update" });
  }
};

// Update a project update
const updateProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const projectUpdate = await Project_update.findByPk(id);

    if (!projectUpdate) {
      res.status(404).json({ message: "Project update not found" });
    } else {
      await projectUpdate.update({ title, description });
      res
        .status(200)
        .json({
          message: "Project update updated successfully",
          projectUpdate,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating project update" });
  }
};

// Delete a project update
const deleteProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const projectUpdate = await Project_update.findByPk(id);

    if (!projectUpdate) {
      res.status(404).json({ message: "Project update not found" });
    } else {
      await projectUpdate.destroy();
      res.status(200).json({ message: "Project update deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting project update" });
  }
};

// Add a review to a project update
const reviewaddProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;

    const projectUpdate = await Project_update.findByPk(id);

    if (!projectUpdate) {
      res.status(404).json({ message: "Project update not found" });
    } else {
      await projectUpdate.update({ review });
      res
        .status(200)
        .json({ message: "Review added successfully", projectUpdate });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review" });
  }
};

// Update a review for a project update
const reviewupdateProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;

    const projectUpdate = await Project_update.findByPk(id);

    if (!projectUpdate) {
      res.status(404).json({ message: "Project update not found" });
    } else {
      await projectUpdate.update({ review });
      res
        .status(200)
        .json({ message: "Review updated successfully", projectUpdate });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating review" });
  }
};

// Delete a review for a project update
const reviewdeleteProjectUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const projectUpdate = await Project_update.findByPk(id);

    if (!projectUpdate) {
      res.status(404).json({ message: "Project update not found" });
    } else {
      await projectUpdate.update({ review: null });
      res.status(200).json({ message: "Review deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting review" });
  }
};

module.exports = {
  createProjectUpdate,
  readProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
  reviewaddProjectUpdate,
  reviewupdateProjectUpdate,
  reviewdeleteProjectUpdate,
};
