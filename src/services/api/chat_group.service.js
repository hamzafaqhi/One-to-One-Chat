const db = require("../../models/index.js")
const { getPaginationInfo } = require("../../utils/pagination.js");
const { Op } = require("sequelize");

const findById = async (chatGroupId) => {
    const record = await db.chat_group.findOne({
        where: {  id: chatGroupId },
        include: [
            {
                model: db.user,
            },
            {
                model: db.chat_messages,
                as: 'chat_messages'
            }
        ]
    });
    return record;
}

const findByUserId = async (data) => {
    let { page, limit, userId} = data;
    let query = null;
    query = { ...query, closed: data.keywords.closed || false };
    const records = await db.chat_group.findAndCountAll({
        order: [['createdAt', 'DESC']],
        where: {...query},
        offset:((page-1)*limit),
        limit : limit,
        subQuery:false,
        required:false,
        include: [
            {
                model: db.user,
                through: {
                    required:true,
                    where: {
                        userId: {
                            [Op.or]: [
                                userId,
                                null
                            ]
                        }
                    }
                }
            },
        ],
        attributes: {
            include: [
                [
                    db.sequelize.literal(
                    `(SELECT COUNT(*) FROM chat_messages WHERE chat_messages.chat_group_id = chat_groups.id AND chat_messages.is_read = 'false' AND chat_messages.user_id != ${userId})`
                    ),
                    'unread_messages_count',
                ],
            ],
        }
    });
    const pagination = getPaginationInfo(page, limit, records.count);
    return  { data: records, pagination };
};

const create = async (data) => {
    const record = await db.chat_group.create(data)
    await record.addUser(data.userIds);
    return record;
};

const update = async (chatGroupId,data) => {
    const record = await db.chat_group.update(data,{ where: { id: chatGroupId } } );
    return record;
};


const find = async (chatGroupId,userId) => {
    const record = await db.chat_group.findOne({
        where: { id: chatGroupId },
        include: [
            {
                model: db.user,
            },
            {
                model: db.chat_messages,
                as: 'chat_messages'
            }
        ],
        attributes: {
            include: [
                [
                    db.sequelize.literal(
                    `(SELECT COUNT(*) FROM chat_messages WHERE chat_messages.chat_group_id = ${chatGroupId} AND chat_messages.is_read = 'false' AND chat_messages.user_id != ${userId})`
                    ),
                    'unread_messages_count',
                ],
            ],
        }
    });
    return record;
};

const chatGroupService = {
    find,
    create,
    update,
    findById,
    findByUserId,
}
module.exports = chatGroupService;