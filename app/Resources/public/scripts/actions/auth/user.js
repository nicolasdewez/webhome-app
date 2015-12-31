'use strict';

var constants = require('../../constants/auth'),
    dispatcher = require('../../dispatcher');

module.exports = {
    getUserInformation: function() {
        dispatcher.handleAction({
            actionType: constants.ACTION_GET_USER
        });
    }
};