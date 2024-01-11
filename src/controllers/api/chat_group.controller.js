const chatGroupService = require( "../../services/api/chat_group.service.js");
const chatGroupDto = require( "../../dto/chat_group.js");
const { successResponse, errorResponse, uniqueId } = require("../../helpers/index.js");
const pusherService = require( "../../services/external/pusher.service.js");
const { CHAT_CHANNEL, CHAT_EVENT_ACCEPT, CHAT_EVENT_CLOSED} = require ("../../utils/chat_event.js");
const {DEFAULT_PAGE,DEFAULT_LIMIT_PER_PAGE, CHAT_REQUEST_TYPE} = require ("../../constants/index.js");

const getChats = async (req, res) => {
  try {
    const { user } = req;
    const page = req.query?.page || DEFAULT_PAGE;
    const limit = req.query?.limit || DEFAULT_LIMIT_PER_PAGE;

    const payload = {
      page,
      limit,
      userId: user.id,
      keywords: req.query,
    };
    const chatGroups = await chatGroupService.findByUserId(payload);
    let response = chatGroups.data.rows.map(chatGroupDto);
    return successResponse(req, res, response,chatGroups.pagination);
  } catch (error) {
    console.log(error)
    return errorResponse(req, res, error.message,error?.code);
  }
};

const create = async (req, res) => {
  try {
    const { user } = req;
    let userIds = [
        user.userId,
        req,body.user_id
    ];
    console.log(req.body,userIds);
    return false
    let chatGroup = await chatGroupService.create({name: uniqueId(),started:false, closed:false,userIds});
    chatGroup = await chatGroupService.find(chatGroup.id)
    let response = chatGroupDto(chatGroup);
    return successResponse(req, res, response);
  } catch (error) {
    console.log(error);
    return errorResponse(req, res, error.message,error?.code);
  }
};

const chatRequest = async(req, res) => {
    try {
        const { user } = req;
        const { chatGroupId } = req.params;
        const { chatGroup, type } = req.body
        if(type == CHAT_REQUEST_TYPE[0]) {
            await chatGroupService.update(chatGroupId,{started:true});
            await chatGroup.addUser(user.id);
        }
        let record = await chatGroupService.find(chatGroupId,user.id);
        let response = chatGroupDto(record);
        await pusherService.triggerEvent(CHAT_CHANNEL,CHAT_EVENT_ACCEPT,response)
        return successResponse(req, res, response);
    }
    catch (error) {
        console.log(error);
        return errorResponse(req, res, error.message,error?.code);
    }
}

const update = async(req, res) => {
    try {
        const { id } = req.user;
        const { chatGroupId } = req.params;
        let payload = req.body
        let record = await chatGroupService.update(chatGroupId,payload);
        record = await chatGroupService.find(chatGroupId,id);
        let response = chatGroupDto(record);
        await pusherService.triggerEvent(CHAT_CHANNEL,CHAT_EVENT_CLOSED,response)
        return successResponse(req, res, response);
    }
    catch (error) {
        console.log(error);
        return errorResponse(req, res, error.message,error?.code);
    }
}


const findOne = async(req, res) => {
    const {id} =req.user; 
    const { chatGroupId } = req.params;
    let record = await chatGroupService.find(chatGroupId,id);
    let response = chatGroupDto(record);
    return successResponse(req, res, response);
}

    
const chatGroupController = {
    create,
    update,
    findOne,
    getChats,
    chatRequest
}
module.exports = chatGroupController;