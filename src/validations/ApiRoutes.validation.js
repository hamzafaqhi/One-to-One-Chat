const { body, validationResult } = require("express-validator");
const { createError } = require("../helpers/index.js");

const validationErrorCreation = (res, errors, next) => {
  try {
    errors.statusCode = 400;
    errors.message = "Validation Error";
    let errorMessages = [];
    errors.errors.map(function (error) {
      let { path, msg } = error;
      errorMessages = { ...errorMessages, [path]: msg };
    });
    errors.data = errorMessages;
  } catch (e) {
    errors = e;
  } finally {
    console.log(createError);
    return createError(res, errors, next);
  }
};

const submitBankDetailValidation = [
  body("bank_name").notEmpty().withMessage("Bank name is required").isString().withMessage("Bank name must be a string"),
  body("account_holder_name").notEmpty().withMessage("Account holder name is required").isString().withMessage("Account holder name must be a string"),
  body("account_number").notEmpty().withMessage("Account number is required").isString().withMessage("Account number must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationErrorCreation(res, errors, next);
    }
    next();
  },
];
const apiRouteValidation = {
  submitBankDetailValidation,
};
module.exports = apiRouteValidation;
