const { config } = require('dotenv')
config();

const APP_CONSTANTS = {
    USER_STATUSES: [
        'active',
        'in-active',
        'blocked',
    ],
    DEFAULT_USER_STATUS: 'in-active',
    USER_ACTIVE_STATUS: 'active',
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT_PER_PAGE: 10,
    PUSHER_CHAT_CHANNEL: 'CHAT',
    PUSHER_NEW_CHAT_EVENT: 'NEW-CHAT',
    CHAT_REQUEST_TYPE: [
        'accept',
        'reject'
    ]
}

module.exports = APP_CONSTANTS