const jwt = require('jsonwebtoken');
const crypto = require ('crypto');
const userService = require ('../../services/api/user.service.js');
const userDto = require ('../../dto/user.js');
const { successResponse, errorResponse, uniqueId } = require ('../../helpers');
const emailService = require ('../../services/email.service.js');

const register = async (req, res) => {
    try {
        const { email, password, first_name,last_name, phone = null } = req.body;
        const reqPass = crypto.createHash('md5').update(password).digest('hex');
        const payload = {
            email,
            first_name,
            last_name,
            password: reqPass,
            is_verified: false,
            phone,
            verify_token:  Math.floor(1000 + Math.random() * 9000),
            salt: uniqueId()
        };
        const newUser = await userService.create(payload);
        emailService.sendVerificationEmail(newUser);
        const response = userDto(newUser);
        return successResponse(req, res, response);
    } 
    catch (error) {
        return errorResponse(req, res, error.message,error?.code);
    }
};
  
const login = async (req, res) => {
    try {
        let { password } = req.body;
        let user = req.user;
        const reqPass = crypto.createHash('md5').update(password || '').digest('hex');
        if (reqPass !== user.password) {
            let error = new Error( `Incorrect Email Id/Password`);
            error.code = 400
            throw error
        }
        console.log("YESSSSSSSS")
        const token = jwt.sign({
            user: {
                userId: user.id,
                email: user.email,
                createdAt: new Date(),
            },
        },user.salt);
        console.log(token);
        delete user.dataValues.password;
        let response = userDto(user);
        response.token = token
        return successResponse(req, res, response);
    } catch (error) {
        console.log(error);
        return errorResponse(req, res, error.message,error?.code);
    }
};
  
  
const verifyUser = async (req, res) => {
    try {
        const { user } = req;
        user.is_verified = true;
        const payload = {
            is_verified: true,
            verify_token: null
        }
        await userService.update(user.id,payload);
        const token = jwt.sign({
            user: {
                userId: user.id,
                email: user.email,
                createdAt: new Date(),
            },
        },user.salt);
        delete user.dataValues.password;
        let response = userDto(user);
        response.token = token
        return successResponse(req, res, response);
    } catch (error) {
        return errorResponse(req, res, error.message,error?.code);
    }
};


const forgetPassword = async (req, res) => {
    try {
      const { userId } = req.params;
      const payload = {
        verify_token:  Math.floor(1000 + Math.random() * 9000)
      }
      const record = await userService.update(userId,payload);
      const user = await userService.findById(userId);
      let response = userDto( user);
      emailService.sendVerificationEmail(user.email,user.verify_token);
      return successResponse(req, res, response);
    } catch (error) {
      return errorResponse(req, res, error.message,error?.code);
    }
};
  
const resetPassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { password } = req.body
        let payload = {
            password: crypto.createHash('md5').update(password).digest('hex')
        } 
        const record = await userService.update(userId,payload);
        const user = await userService.findById(userId);
        let response = userDto( user);
        return successResponse(req, res, response);
    } catch (error) {
        return errorResponse(req, res, error.message,error?.code);
    }
};

const userController = {
    login,
    register,
    verifyUser,
    resetPassword,
    forgetPassword
}
module.exports = userController