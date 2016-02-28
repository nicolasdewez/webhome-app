'use strict';

var constants = require('../../constants/cald'),
    dispatcher = require('../../dispatcher');

module.exports = {
    getJobs: function() {
        dispatcher.handleAction({
            actionType: constants.ACTION_GET_JOBS
        });
    }
};