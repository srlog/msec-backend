const Student = require("./Student");
const Admin = require("./Admin");
const Master = require("./Master");
const Achievement = require("./Achievement");
const Log = require("./Log");

const Mentor = require("./Mentor");
const Project = require("./Project");
const TeamMember = require("./Team_member");
const Feedback = require("./Feedback");
const Project_update = require("./Project_update");
const Report = require("./Report");

Student.hasMany(Project, {
  foreignKey: "created_by",
  as: "createdProjects",
});

Project.belongsTo(Student, {
  foreignKey: "created_by",
  as: "creator",
});

Mentor.hasMany(Project, {
  foreignKey: "mentor_id",
  as: "projects",
});

Project.belongsTo(Mentor, {
  foreignKey: "mentor_id",
  as: "mentor",
});

Project.hasMany(Report, {
  foreignKey: "project_id",
  as: "reports",
  onDelete: "CASCADE",
});

Report.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

Project.hasMany(Project_update, {
  foreignKey: "project_id",
  as: "updates",
  onDelete: "CASCADE",
});

Project_update.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project",
});

Student.hasMany(Project_update, {
  foreignKey: "student_id",
  as: "updates",
  onDelete: "CASCADE",
});

Project_update.belongsTo(Student, {
  foreignKey: "student_id",
  as: "student",
});

Project.belongsToMany(Student, {
  through: TeamMember,
  foreignKey: 'project_id',
  otherKey: 'student_id',
  as: 'teamMembers'
});
Student.belongsToMany(Project, {
  through: TeamMember,
  foreignKey: 'student_id',
  otherKey: 'project_id',
  as: 'teams'
});

Project.hasMany(Feedback, {
  foreignKey: 'project_id',
  as: 'feedbacks',
  onDelete: 'CASCADE'
});
Feedback.belongsTo(Project, {
  foreignKey: 'project_id',
  as: 'project'
});

Mentor.hasMany(Feedback, {
  foreignKey: 'mentor_id',
  as: 'givenFeedbacks',
  onDelete: 'CASCADE'
});
Feedback.belongsTo(Mentor, {
  foreignKey: 'mentor_id',
  as: 'mentor',
  allowNull: true
});

Student.hasMany(Feedback, {
  foreignKey: 'student_id',
  as: 'receivedFeedbacks',
  onDelete: 'CASCADE'
});
Feedback.belongsTo(Student, {
  foreignKey: 'student_id',
  as: 'student',
  allowNull: true
});



Achievement.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  as: "achievementStudent"
});

Student.hasMany(Achievement, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  as: "studentAchievements"
});


Log.belongsTo(Student, {
  foreignKey: "student_id",
  as: "logStudent"
});

Student.hasMany(Log, {
  foreignKey: "student_id",
  as: "studentLogs"
});

Log.belongsTo(Admin, {
  foreignKey: "admin_id",
  as: "logAdmin"
});

Admin.hasMany(Log, {
  foreignKey: "admin_id",
  as: "adminLogs"
});

Achievement.hasMany(Log, {
  foreignKey: "achievement_id",
  as: "logs"
});

Log.belongsTo(Achievement, {
  foreignKey: "achievement_id",
  as: "achievement"
});





module.exports = {
  Student,
  Admin,
  Master,
  Achievement,
  Log,

  Mentor,
  Project,
  TeamMember,
  Feedback,
  Project_update,
  Report
};

