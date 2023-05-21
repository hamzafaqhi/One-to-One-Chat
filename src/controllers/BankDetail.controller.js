const bankDetailService = require("../services/BankDetail.service.js");
const BankDetailDto = require("../dto/BankDetail.dto.js");
const { successResponse, errorResponse }= require("../helpers/index.js");

const create = async (req, res) => {
  try {
    const payload = req.body;
    const record = await bankDetailService.create(payload);
    let response = BankDetailDto(record);
    return successResponse(req, res, response);
  } catch (error) {
    return errorResponse(req, res, error.message,error?.code);
  }
};

const bankDetailController = {
  create
};

module.exports = bankDetailController;