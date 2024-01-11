const { body, validationResult, param } = require("express-validator");
const { createError } = require("../helpers/index.js");
const chatGroupService = require('../services/api/chat_group.service.js');
const { CHAT_REQUEST_TYPE } = require("../constants/index.js");
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

const chat_request_validation = [
    param("chatGroupId").trim().not().isEmpty().withMessage("chat group id field is required").custom(async(chatGroupId, { req }) => {
        let chatGroup = await chatGroupService.findById(chatGroupId);
        if (!chatGroup) {
            throw new Error(`Invalid Chat Group`);
        }
        if(chatGroup.user && req.body.type == CHAT_REQUEST_TYPE[0] ) {
            throw new Error(`Chat is already accepted by other user`);
        }
        req.body.chatGroup = chatGroup;
        return true;
    }),
    body("type").trim().not().isEmpty().isIn(CHAT_REQUEST_TYPE).withMessage("invalid type selected"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return validationErrorCreation(res, errors, next);
        }
        next();
    },
]

const chat_update_validation = [
    param("chatGroupId").trim().not().isEmpty().withMessage("chat group id field is required").custom(async(chatGroupId, { req }) => {
        let chatGroup = await chatGroupService.findById(chatGroupId);
        if (!chatGroup) {
            throw new Error(`Invalid Chat Group`);
        }
        return true;
    }),
    body("closed").trim().not().isEmpty().isIn([true,false]).withMessage("invalid value for closed"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return validationErrorCreation(res, errors, next);
        }
        next();
    },
]

const find_one_chat_validation = [
    param("chatGroupId").trim().not().isEmpty().withMessage("chat group id field is required").custom(async(chatGroupId, { req }) => {
        let chatGroup = await chatGroupService.findById(chatGroupId);
        if (!chatGroup) {
            throw new Error(`Invalid Chat Group`);
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return validationErrorCreation(res, errors, next);
        }
        next();
    },
]

const create_chat_message_validation = [
    body("content").trim().notEmpty().withMessage(`message field is required`),
    body("chat_group_id").trim().notEmpty().withMessage(`Chat Group Id field is required`).custom(async(chatGroupId) => {
        let chatGroup = await chatGroupService.findById(chatGroupId);
        if(!chatGroup) {
            throw(`Invalid Chat id`);
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
]

const create_chat_group_validation = [
    body('user_id').trim().notEmpty().isNumeric().withMessage('Please select a user').custom(async(value,{req}) => {
        let user = await userService.findById(value);
        if(!user) {
            throw new Error(`User doensnt exist!`);
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return validationErrorCreation(res, errors, next);
        }
        next();
    },
]

const webRoutesValidation = {
    chat_update_validation,
    chat_request_validation,
    find_one_chat_validation,
    create_chat_group_validation,
    create_chat_message_validation,
};
module.exports = webRoutesValidation;
