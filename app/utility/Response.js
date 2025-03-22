class Response {
  static success(res, data, message, statusCode = 200) {
    return res.status(statusCode).json({
      status: true,
      data,
      message,
    });
  }

  static error(res, data, message, statusCode = 500) {
    return res.status(statusCode).json({
      status: false,
      data: data,
      message,
    });
  }
}

module.exports = Response;
