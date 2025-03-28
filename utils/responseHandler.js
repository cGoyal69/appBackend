class ResponseHandler {
  static success(res, message, data = null, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static created(res, message, data = null) {
    return this.success(res, message, data, 201);
  }

  static conflict(res, message) {
    return res.status(409).json({
      success: false,
      message
    });
  }
}

module.exports = ResponseHandler;