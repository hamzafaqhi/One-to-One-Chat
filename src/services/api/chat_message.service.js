const db = require("../../models/index.js");
const { Op } = require("sequelize");

const create = async(payload) => {
    let record = await db.chat_message.create(payload);
    return record;
}

const markAsRead =async(payload) => {
    const {user_id,chat_group_id} = payload;
    let records = await db.chat_message.update({ is_read: true },{
        where: {
            user_id: { [Op.ne]: user_id },
            chat_group_id: chat_group_id,
            is_read: false,
        },
    });
    return records;
}

const findByChatGroup = async(chatGroupId) => {
    let records = await db.chat_message.findAll({ where: {chat_group_id: chatGroupId},  order: [['createdAt', 'ASC']],});
    return records;
}

const chatMessageService = {
    create,
    markAsRead,
    findByChatGroup
};

module.exports = chatMessageService;