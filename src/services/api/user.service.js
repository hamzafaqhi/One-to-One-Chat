 
const db = require('../../models/index.js')
const { Op } = require("sequelize");

const fetchByEmail = async (email,id=null) => {
  let query = { email: { [Op.eq]: email }};
  if(id) {
    query = { ...query, id: { [Op.ne]: id } };
  }
  const record = await db.user.findOne({
      where: { ...query },
  });
  return record;
};

const create = async (data) => {
  const record = await db.user.create(data);
  return record;
};

const findById = async (userId) => {
  const record = await db.user.findOne({
    where: { id: { [Op.eq]: userId } },
  });
  return record;
};

const update = async (userId,payload) => {
  const record = await db.user.update({ ...payload },{ where: { id: userId } } );
  return record;
};

const deleteUser = async (userId) => {
  const record = await db.user.destroy({
    where: { id: userId },
  });
  return record;
};

const userService = {
    create,
    update,
    findById,
    deleteUser,
    fetchByEmail,
};

module.exports= userService;
