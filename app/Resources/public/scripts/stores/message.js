'use strict';

var Store = require('../store'),
    constants = require('../constants/message'),
    dispatcher = require('../dispatcher'),

    messages = {},
    store = new Store();

Object.assign(
    store,
    {
        getMessages: function(channel = constants.DEFAULT_CHANNEL) {
            if (!(channel in messages)) {
                messages[channel] = [];
            }

            return messages[channel];
        }
    }
);

dispatcher.register(function(payload) {
    switch (payload.action.actionType) {
        case constants.ACTION_ADD:
            if (!(payload.action.data.channel in messages)) {
                messages[payload.action.data.channel] = [];
            }

            messages[payload.action.data.channel].push(payload.action.data);
            store.emitChange();

            break;

        // Remove all messages
        case constants.ACTION_FLUSH:
            messages[payload.action.channel] = [];
            store.emitChange();

            break;
    }

    return true;
});

module.exports = store;
