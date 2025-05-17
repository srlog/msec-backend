const {Project,ProjectMember,Student}=require("../../../models");
const {
  HttpStatusCodeConstants,
} = require("../../constants/HttpStatusCodeConstants");
const { ResponseConstants } = require("../../constants/ResponseConstants")
const addmember=async(req,res)=>{
    try {
        const {project_id}=req.params;
        const {student_id}=req.body;
        const project=await Project.findByPk(project_id);
        if(!project){
            return res.status(HttpStatusCodeConstants.NOT_FOUND).json({
                message:ResponseConstants.Project.Error.NotFound
            });
        }
        const student=await Student.findByPk(student_id);
        if(!student){
            return res.status(HttpStatusCodeConstants.NOT_FOUND).json({
                message:ResponseConstants.User.Error.NotFound
            });
        }
        await Project_member.create({project_id,student_id});
        res.status(HttpStatusCodeConstants.CREATED).json({
            message:ResponseConstants.Project.Success.MemberAdded
        });
    } catch (error) {
        console.error("Error in adding member:", error);
        res.status(HttpStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
            message:ResponseConstants.Project.Error.InternalServerError,
            error
        });
    }
}
const deletemember = async (req, res) => {
    try {
      const { project_id } = req.params;
      const { student_id } = req.body;
  
      const project = await Project.findByPk(project_id);
  
      if (!project) {
        return res.status(HttpStatusCodeConstants.NOT_FOUND).json({
          message: ResponseConstants.Project.Error.NotFound,
        });
      }
  
      const student = await Student.findByPk(student_id);
  
      if (!student) {
        return res.status(HttpStatusCodeConstants.NOT_FOUND).json({
          message: ResponseConstants.User.Error.NotFound,
        });
      }
  
      await Project_member.update(
        { is_deleted: true },
        { where: { project_id, student_id } }
      );
  
      res.status(HttpStatusCodeConstants.OK).json({
        message: ResponseConstants.Project.Success.MemberDeleted,
      });
    } catch (error) {
      console.error("Error in deleting member:", error);
      res.status(HttpStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
        message: ResponseConstants.Project.Error.InternalServerError,
        error,
      });
    }
  };

const updatemember=async(req,res)=>{
   try{
    const student_id=req.params.student_id;
    const project_id=req.params.project_id;
    await Project_member.update({where:{student_id,project_id}});
    res.status(HttpStatusCodeConstants.OK).json({
        message:ResponseConstants.Project.Success.MemberUpdated
    });
   }catch(error){
    console.error("Error in updating member:", error);
    res.status(HttpStatusCodeConstants.INTERNAL_SERVER_ERROR).json({
        message:ResponseConstants.Project.Error.InternalServerError,
        error
    });
   }
}
module.exports={addmember,deletemember,updatemember};
