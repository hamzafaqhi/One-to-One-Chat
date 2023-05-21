const express = require('express');
const router = express.Router();
const BankDetailController = require('../controllers/BankDetail.controller.js')
const { submitBankDetailValidation } = require("../validations/ApiRoutes.validation.js");


router.post('/bank_details', submitBankDetailValidation ,BankDetailController.create);

// Add more routes as needed

module.exports = router;
