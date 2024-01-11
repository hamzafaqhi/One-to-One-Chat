const Pusher = require("pusher");
const { config } = require("dotenv");
config();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true
});

const triggerEvent = async (channel,event,payload) => {
    let record = pusher.trigger(channel, event, {
        message: payload
    });
    return record;
};

const pusherService = {
    triggerEvent,
};
module.exports = pusherService;