const { body,param,validationResult } = require("express-validator");
const { createError, validateEmail } = require("../helpers/index.js");
const { USER_ACTIVE_STATUS } = require('../constants/index.js');
const userService = require("../services/api/user.service.js");

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

const register_user_validation = [
    body("first_name").trim().not().isEmpty().withMessage("first name field is required"),
    body("last_name").trim().not().isEmpty().withMessage("last name field is required"),
    body("email").trim().isEmail().not().isEmpty().withMessage("Please enter a valid email.").custom(async(value) => {
        if(!validateEmail(value)) {
            throw new Error('Please enter a valid email');
        }
        const user = await userService.fetchByEmail(value)
        if (user) {
            throw new Error('User already exists with same email');
        }
        return true;
    }),
    body("phone").optional(),
    body("password").not().isEmpty().trim().isLength({ min: 6 }).withMessage("Password is too short"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorCreation(res, errors, next);
        }
        next();
    },
];
  
const verify_user_validation = [
    param("userId").trim().not().isEmpty().withMessage("Customer id field is required").custom(async (value, {req}) => {
        const user = await userService.findById(value);
        if(!user) {
            throw new Error(`Invalid user id`);
        }
        else {
            if(user.is_verified) {
                throw new Error(`User id already verified`);
            }
            req.user = user;
        }
        return true
    }),
    body("token").trim().not().isEmpty().withMessage("token is required").custom(async (value, {req}) => {
        const user = req?.user;
        if(!user || user?.verify_token !== value) {
            throw new Error(`Invalid token`);
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorCreation(res, errors, next);
        }
        next();
    },
];
  
const login_user_validation = [
    body("email").trim().isEmail().not().isEmpty().withMessage("Please enter a valid email.").custom(async(value,{req}) => {
      if(!validateEmail(value)) {
        throw new Error(`Please enter a valid email`);
      }
      const user = await userService.fetchByEmail(value)
      if (!user) {
        throw new Error(`User doesnt exist`);
      }
      else {
        req.user = user; 
      }
      return true;
    }),
    body("password").not().isEmpty().trim().isLength({ min: 6 }).withMessage("Password is too short"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return validationErrorCreation(res, errors, next);
      }
      next();
    },
];

const reset_password_user_validation = [
    param("userId").trim().not().isEmpty().withMessage("User Id field is required").custom(async (value, {req}) => {
      const user = await userService.findById(value);
      if(!user) {
        throw new Error(`Invalid User id`);
      }
      else {
        if(!user.is_verified) {
          throw new Error(`User is not verified`);
        }
        req.user = user;
      }
      return true
    }),
    body("token").trim().not().isEmpty().withMessage("token is required").custom(async (value, {req}) => {
      const user = req ? req.user : null;
      if(!user || user.verify_token !== value) {
        throw new Error(`Invalid token`);
      }
      return true
    }),
    body("password").not().isEmpty().trim().isLength({ min: 6 }).withMessage("Password is too short"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return validationErrorCreation(res, errors, next);
      }
      next();
    },
];

const forget_password_user_validation = [
    param("userId").trim().not().isEmpty().withMessage("user id field is required").custom(async (value, {req}) => {
        const user = await userService.findById(value);
        if(!user) {
            throw new Error(`Invalid user id`);
        }
        else {
            if(!user.is_verified) {
                throw new Error(`Please verify your user`);
            }
            if(!user.status !== USER_ACTIVE_STATUS) {
              throw new Error(`Please activate your ID. Or contact admin for further details`);
            }
            req.user = user;
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return validationErrorCreation(res, errors, next);
        }
        next();
    },
];
  
const publicRoutesValidation = {
    login_user_validation,
    verify_user_validation,
    register_user_validation,
    reset_password_user_validation,
    forget_password_user_validation,
};
module.exports = publicRoutesValidation;
