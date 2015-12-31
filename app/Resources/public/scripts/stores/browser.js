'use strict';

var Store = require('../store'),
    constants = require('../constants/browser'),
    dispatcher = require('../dispatcher'),

    store = new Store();

Object.assign(
    store,
    {
        emitClick: function() {
            this.emit('click');
        },

        addClickListener: function(callback) {
            this.addListener('click', callback);
        },

        removeClickListener: function(callback) {
            this.removeListener('click', callback);
        }
    }
);

dispatcher.register(function(payload) {
    switch (payload.action.actionType) {
        case constants.ACTION_CLICK:
            store.emitClick();

            break;
    }

    return true;
});

module.exports = store;
