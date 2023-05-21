const successResponse = (req, res, data, pagination = null, code = 200) => res.send({
    code,
    data,
    success: true,
    pagination
  });
  
const createError = (res, e, next) => {
  if (!e.statusCode) {
    e.statusCode = 500;
  }
  if (!e.message || e.statusCode == 500) {
    e.message = "Failed request: something went wrong";
  }
  res.status(e.statusCode).json({ code: e.statusCode, error: true, message: e.message, data: e.data || null });
  next(e);
};

const errorResponse = (req,res,message = 'Something went wrong',code = 500,error = {}) => res.status(code).json({
  code,
  message,
  error,
  data: null,
  success: false,
});

const responseHelper = {
  successResponse,
  createError,
  errorResponse
}

module.exports = responseHelper
