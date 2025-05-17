const { Project, Student, Mentor, Project_update, Report } = require("../../../models/index");

const { ResponseConstants } = require("../../../constants/ResponseConstants");


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
                }
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
                }
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

module.exports = {
    getAllProjects,
    getProjectById,
};