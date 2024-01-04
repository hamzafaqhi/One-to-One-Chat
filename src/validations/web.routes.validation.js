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

const webRoutesValidation = {
};
module.exports = webRoutesValidation;
