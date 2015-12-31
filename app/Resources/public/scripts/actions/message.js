'use strict';

var constants = require('../constants/message'),
    dispatcher = require('../dispatcher'),

    /**
     * @param {String|Object} message
     * @param {String}        level
     * @param {String}        channel
     * @param {Number}        delay
     */
    addMessage = function(message, level, channel, delay = 0) {
        dispatcher.handleAction({
            actionType: constants.ACTION_ADD,
            data: { channel, message, level, delay }
        });
    };

module.exports = {
    /**
     * @param {String|Object} message
     * @param {String}        channel
     */
    addSuccess: function(message, channel = constants.DEFAULT_CHANNEL) {
        addMessage(message, constants.LEVEL_SUCCESS, channel);
    },

    /**
     * @param {String|Object} message
     * @param {String}        channel
     * @param {Number}        delay
     */
    addSuccessTimed: function(message, channel = constants.DEFAULT_CHANNEL, delay = constants.DEFAULT_DELAY) {
        addMessage(message, constants.LEVEL_SUCCESS, channel, delay);
    },

    /**
     * @param {String|Object} message
     * @param {String}        channel
     */
    addInfo: function(message, channel = constants.DEFAULT_CHANNEL) {
        addMessage(message, constants.LEVEL_INFO, channel);
    },

    /**
     * @param {String|Object} message
     * @param {String}        channel
     * @param {Number}        delay
     */
    addInfoTimed: function(message, channel = constants.DEFAULT_CHANNEL, delay = constants.DEFAULT_DELAY) {
        addMessage(message, constants.LEVEL_INFO, channel, delay);
    },

    /**
     * @param {String|Object} message
     * @param {String}        channel
     */
    addWarning: function(message, channel = constants.DEFAULT_CHANNEL) {
        addMessage(message, constants.LEVEL_WARNING, channel);
    },

    /**
     * @param {String|Object} message
     * @param {String}        channel
     * @param {Number}        delay
     */
    addWarningTimed: function(message, channel = constants.DEFAULT_CHANNEL, delay = constants.DEFAULT_DELAY) {
        addMessage(message, constants.LEVEL_WARNING, channel, delay);
    },

    /**
     * @param {String|Object} message
     * @param {String}        channel
     */
    addError: function(message, channel = constants.DEFAULT_CHANNEL) {
        addMessage(message, constants.LEVEL_ERROR, channel);
    },

    /**
     * @param {String|Object} message
     * @param {String}        channel
     * @param {Number}        delay
     */
    addErrorTimed: function(message, channel = constants.DEFAULT_CHANNEL, delay = constants.DEFAULT_DELAY) {
        addMessage(message, constants.LEVEL_ERROR, channel, delay);
    },

    /**
     * @param {String} channel
     */
    flush: function(channel = constants.DEFAULT_CHANNEL) {
        dispatcher.handleAction({
            actionType: constants.ACTION_FLUSH,
            channel
        });
    }
};
