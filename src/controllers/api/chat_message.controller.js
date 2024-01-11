 
const { successResponse, errorResponse } = require("../../helpers/index.js");
const chatMessageService = require("../../services/api/chat_message.service.js");
const chatMessageDto = require("../../dto/chat_message.js");
const { CHAT_CHANNEL, NEW_MESSAGE } = require("../../utils/chat_event.js");
const pusherService = require("../../services/external/pusher.service.js");

const create = async (req, res) => {
  try {
        const payload = req.body;
        const { id } = req.user;
        payload.user_id = id
        payload.is_read = false;
        let chatMessage = await chatMessageService.create(payload);
        let response = chatMessageDto(chatMessage);
        await pusherService.triggerEvent(CHAT_CHANNEL,NEW_MESSAGE,response)
        return successResponse(req, res, response);
    } catch (error) {
        return errorResponse(req, res, error.message,error?.code);
    }
};


const markAsRead = async(req,res) => {
    try {
        const { id } = req.user;
        const { chatGroupId } = req.params;
        let payload = {user_id : id,chat_group_id: chatGroupId }
        await chatMessageService.markAsRead(payload);
        let records = await chatMessageService.findByChatGroup(chatGroupId)
        console.log(records);
        let response = records.map(chatMessageDto);
        return successResponse(req, res, response);
    } catch (error) {
        return errorResponse(req, res, error.message,error?.code);
    }
}

const chat_messageControllerController = {
    create,
    markAsRead
}
module.exports = chat_messageControllerController;