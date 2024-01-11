const chatMessageDto = (data) => {
    return {
        id: data?.id,
        sender_id: data?.user_id,
        chat_group_id: data?.chat_group_id,
        is_read: data?.is_read,
        content: data?.content,
        created_at: data?.createdAt,
        updated_at: data?.updatedAt
    };
};
module.exports=chatMessageDto;
