'use strict';

var constants = require('../constants/browser'),
    dispatcher = require('../dispatcher');

module.exports = {
    appClick: function() {
        dispatcher.handleAction({
            actionType: constants.ACTION_CLICK
        });
    }
};
