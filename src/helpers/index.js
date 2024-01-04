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

const ucFirst = (str) => {
    let firstChar = str[0].toUpperCase();
    let allChar = str.slice(1);
    return `${firstChar}${allChar}`
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const uniqueId = (length = 13) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  

const responseHelper = {
    ucFirst,
    uniqueId,
    createError,
    validateEmail,
    errorResponse,
    successResponse,
}

module.exports = responseHelper
