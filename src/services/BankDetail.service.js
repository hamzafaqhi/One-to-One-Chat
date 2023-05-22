const db = require("../models/index.js")

const create = (data) => db.bank_detail.create(data);


const bankDetailService = {
  create,
};

module.exports = bankDetailService;