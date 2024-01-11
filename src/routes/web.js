const express = require('express');
const router = express.Router();
const chatGroupController = require('../controllers/api/chat_group.controller.js');
const chatMessageController = require('../controllers/api/chat_message.controller.js');
const { 
    chat_update_validation,
    chat_request_validation,
    find_one_chat_validation,
    create_chat_group_validation,
    create_chat_message_validation,

} = require("../validations/web.routes.validation.js");

router.get('/chat-groups',chatGroupController.getChats);
router.get('/chat-group',create_chat_group_validation,chatGroupController.create);
router.get('/chat-group/:chatGroupId',find_one_chat_validation ,chatGroupController.findOne);
router.patch('/chat-group/:chatGroupId/closed',chat_update_validation,chatGroupController.update);
router.patch('/chat-group/request/:chatGroupId',chat_request_validation ,chatGroupController.chatRequest);
router.post('/chat-message',create_chat_message_validation,chatMessageController.create);
router.put('/chat-message/mark-as-read/:chatGroupId',chatMessageController.markAsRead);

module.exports = router;
