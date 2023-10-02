const validator = (validationData) => {
  console.log(validationData);
  if (
    !validationData.hasOwnProperty("title") ||
    !validationData.hasOwnProperty("description") ||
    !validationData.hasOwnProperty("isCompleted")
  )
    return {
      status: false,
      message:
        "Invalid request data. The following field is required: title, description and isCompleted.",
    };
  else if (typeof validationData.isCompleted !== "boolean") {
    return {
      status: false,
      message:
        "Invalid request data. isCompleted should contain boolean value.",
    };
  }
  return {
    status: true,
    message: "Data is valid.",
  };
};

module.exports.validator = validator;
