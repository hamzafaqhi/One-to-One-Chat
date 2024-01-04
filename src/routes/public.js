const express = require('express');
const router = express.Router();

const userController = require('../controllers/api/user.controller.js')
const { 
    login_user_validation,
    register_user_validation,
    verify_user_validation,
    forget_password_user_validation,
    reset_password_user_validation 
} = require("../validations/public.routes.validation.js");

router.post('/login',login_user_validation,userController.login,);
router.post('/register',register_user_validation,userController.register,);
router.post('/verify-user/:userId',verify_user_validation,userController.verifyUser,);
router.patch('/forget-password/:userId',forget_password_user_validation,userController.forgetPassword,);
router.patch('/reset-password/:userId',reset_password_user_validation,userController.resetPassword,);

module.exports = router