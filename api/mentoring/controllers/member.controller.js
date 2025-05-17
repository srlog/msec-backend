const { Project, ProjectMember, Student } = require("../../../models");
const { ResponseConstants } = require("../../../constants/ResponseConstants");
const { HttpStatusCodeConstants } = require("../../../constants/HttpStatusCodeConstants");

const addmember = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { student_id } = req.body;

    const project = await Project.findByPk(project_id);
    if (!project) {
      return res.status(HttpStatusCodeConstants.NotFound).json({
        message: ResponseConstants.Member.Error.NotFound,
      });
    }
    const new_member = await ProjectMember.create({ project_id, student_id });
    res.status(HttpStatusCodeConstants.Created).json({
      message: ResponseConstants.Member.SuccessCreation,
    });
  } catch (error) {
    console.error("Error in adding member:", error);
    res.status(HttpStatusCodeConstants.InternalServerError).json({
      message: ResponseConstants.Member.Error.InternalServerError,
      error,
    });
  }
};
const deletemember = async (req, res) => {
  try {
    const { project_member_id  } = req.params

    const project_member = await ProjectMember.findByPk(project_member_id);
    if (!project_member) {
      return res.status(HttpStatusCodeConstants.NotFound).json({
        message: ResponseConstants.Member.Error.NotFound,
      });
    }
    await project_member.update({ is_deleted: true });


    res.status(HttpStatusCodeConstants.Ok).json({
      message: ResponseConstants.Member.SuccessDeletion,
    });
  } catch (error) {
    console.error("Error in deleting member:", error);
    res.status(HttpStatusCodeConstants.InternalServerError).json({
      message: ResponseConstants.Member.Error.InternalServerError,
      error,
    });
  }
};


module.exports = { addmember, deletemember };

