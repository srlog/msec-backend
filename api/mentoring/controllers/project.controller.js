const {
  Project,
  Student,
  Mentor,
  Project_update,
  Report,
} = require("../../../models/index");

const { ResponseConstants } = require("../../../constants/ResponseConstants");

const createProject = async (req, res) => {
    try{
        const { mentor_id, title, description, github_url } = req.body;
        const created_by = req.user.id
        const project = await Project.create({
            mentor_id,
            created_by,
            title,
            description,
            github_url,
        });
        return res.status(200).json({
            message: ResponseConstants.Project.SuccessCreation,
            project,
        });
    }catch(error){
        console.error("Error creating project:", error);
        return res.status(500).json({
            message: ResponseConstants.Project.Error.InternalServerError,
            error,
        });
    }
}

const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, github_url } = req.body;
        const updatedProject = await Project.update(
            { title, description, github_url },
            { where: { project_id: id } }
        );
        return res.status(200).json({
            message: ResponseConstants.Project.SuccessUpdate,
            updatedProject,
        });
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({
            message: ResponseConstants.Project.Error.InternalServerError,
            error,
        });
    }
}

const deleteProject = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedProject = await Project.findByPk(id)

        deletedProject.is_deleted = true;

        await deletedProject.save();

        return res.status(200).json({
            message: ResponseConstants.Project.SuccessDeletion,
            deletedProject,
        });
    }catch(error){
        console.error("Error deleting project:", error);
        return res.status(500).json({
            message: ResponseConstants.Project.Error.InternalServerError,
            error,
        });
    }

}

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: Student,
          as: "student",
        },
        {
          model: Mentor,
          as: "mentor",
        },
        {
          model: Project_update,
          as: "updates",
        },
        {
          model: Report,
          as: "reports",
        },
        {
          model: Feedback,
          as: "feedback",
        },
      ],
    });
    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGet,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Student,
          as: "student",
        },
        {
          model: Mentor,
          as: "mentor",
        },
        {
          model: Project_update,
          as: "updates",
        },
        {
          model: Report,
          as: "reports",
        },
        {
          model: Feedback,
          as: "feedback",
        },
      ],
    });
    if (!project) {
      return res.status(404).json({
        message: ResponseConstants.Project.Error.NotFound,
      });
    }
    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGetById,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
};

const getProjectByStudentId = async (req, res) => {
  try {
    const { created_by } = req.params;
    const project = await Project.findOne({
      where: { created_by },
      include: [
        {
          model: Student,
          as: "student",
        },
        {
          model: Mentor,
          as: "mentor",
        },
        {
          model: Project_update,
          as: "updates",
        },
        {
          model: Report,
          as: "reports",
        },
        {
          model: Feedback,
          as: "feedback",
        },
      ],
    });
    if (!project) {
      return res.status(404).json({
        message: ResponseConstants.Project.Error.NotFound,
      });
    }
    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGetById,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
};

const getProjectsByMentorId = async (req, res) => {
  try {
    const { mentor_id } = req.params;
    const projects = await Project.findAll({
      where: { mentor_id },
      include: [
        {
          model: Student,
          as: "student",
        },
        {
          model: Mentor,
          as: "mentor",
        },
        {
          model: Project_update,
          as: "updates",
        },
        {
          model: Report,
          as: "reports",
        },
        {
          model: Feedback,
          as: "feedback",
        },
      ],
    });
    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGet,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
};

const getRecentProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["created_at", "DESC"]],
      limit: 5,
    });
    return res.status(200).json({
      message: ResponseConstants.Project.SuccessGet,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      message: ResponseConstants.Project.Error.InternalServerError,
      error,
    });
  }
}

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjectByStudentId,
  getProjectsByMentorId,
  getRecentProjects
};
