'use strict';

var constants = require('../../constants/cald'),
    dispatcher = require('../../dispatcher');

module.exports = {
    getCalendars: function() {
        dispatcher.handleAction({
            actionType: constants.ACTION_GET_CALENDARS
        });
    }
};