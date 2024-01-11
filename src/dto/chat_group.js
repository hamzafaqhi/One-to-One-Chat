const chatMessageDto = require("./chat_message");
const userDto =require("./user");

const chatGroupDto = (data) => {
    let users = data?.users.length > 0 ? data.users.map(userDto) : [];
    let chatMessages = data?.chat_messages?.length > 0 ? data.chat_messages.map(chatMessageDto) : [];
    return {
        id: data?.id ? data.id : null,
        users: users,
        started: data?.started,
        closed: data?.closed,
        unread_messages_count: data?.unread_messages_count,
        chat_messages: chatMessages,
        created_at: data?.createdAt,
        updated_at: data?.updatedAt
    };
};
module.exports = chatGroupDto;
