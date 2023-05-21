const db = require("../models/index.js")

const create = async (data) => {
  const record = await db.bank_detail.create(data);
  return record;
};

const bankDetailService = {
  create,
};

module.exports = bankDetailService;