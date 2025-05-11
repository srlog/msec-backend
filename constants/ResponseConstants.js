const ResponseConstants = {
  FailedResponseMessage: "Failed in Processing the Request",
  SuccessResponseMessage: "Success in Processing the Request",
  User: {
    SuccessRegistration: {
      Student: "Student registered successfully",
      Mentor: "Mentor registered successfully",
      Admin: "Admin registered successfully",
      Master: "Master registered successfully",
    },
    SuccessUpdatePassword: "Password updated successfully",
    SuccessLogin: {
      Student: "Student logged in successfully",
      Mentor: "Mentor logged in successfully",
      Admin: "Admin logged in successfully",
      Master: "Master logged in successfully",
    },
    Error: {
      ExistingUser: "User already exists with the given email",
      LoginFailed: "Invalid credentials",
      AllFieldsRequired: "All fields are required",
      NotFound: "User not found",
      InvalidEmail: "Invalid email format",
      InternalServerError: "Internal Server Error",
    },
  },
  Event: {
    SuccessCreation: "Event created successfully",
    SuccessUpdate: "Event updated successfully",
    SuccessDeletion: "Event deleted successfully",
    Error: {
      NotFound: "Event not found",
      InvalidDateTime:
        "Invalid date/time format. Use YYYY-MM-DD for date and HH:MM for time",
    },
  },
  Registration: {
    SuccessRegistration: "User registered for the event successfully",
    SuccessDeletion: "Registration deleted successfully",
    Error: {
      NotFound: "Registration not found",
      AlreadyRegistered: "User already registered for this event",
    },
  },
};

module.exports.ResponseConstants = ResponseConstants;
