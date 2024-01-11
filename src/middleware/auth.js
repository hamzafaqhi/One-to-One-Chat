const { errorResponse } = require('../helpers/index.js');
const userService = require("../services/api/user.service.js");

const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      let error = new Error( 'Not Authenticated! Missing headers!');
      error.code = 401
      throw error
    }
    const { userid } = req.headers;
    const token = authHeader.split(" ")[1];
    const user = await userService.findById(userid);
    if (!user) {
      let error = new Error( 'User is not found in system');
      error.code = 401
      throw error
    }
    const decoded = jwt.verify(token, user.salt);
    req.user = user;
    return next();
  } 
  catch (error) {
    return errorResponse(req,res,'Incorrect token is provided, try re-login',401);
  }
};

module.exports=auth;
