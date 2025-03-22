const Response = require("../utility/Response");

const customValidation = (schema) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(
        { ...req.body, ...req.params },
        {
          abortEarly: false,
        }
      );
      req.body = value;
    } catch (error) {
      const errors = {};
      if (error.details) {
        error.details.forEach((item) => {
          errors[item.path[0]] = item.message;
        });
      }

      const message = error.details ? "Invalid data." : error.customMessage;
      const data = error.details ? errors : null;

      return Response.error(res, data, message, 400);
    }
    next();
  };
};

module.exports = { customValidation };
