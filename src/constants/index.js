const { config } = require('dotenv')
config();

const APP_CONSTANTS = {
    USER_STATUSES: [
        'active',
        'in-active',
        'blocked',
    ],
    DEFAULT_USER_STATUS: 'in-active',
    USER_ACTIVE_STATUS: 'active'
}

module.exports = APP_CONSTANTS