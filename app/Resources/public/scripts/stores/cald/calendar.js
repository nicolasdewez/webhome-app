'use strict';

var reqwest = require('reqwest'),
    translate = require('counterpart'),
    Store = require('../../store'),
    config = require('../../../config/cald'),
    constants = require('../../constants/cald'),
    dispatcher = require('../../dispatcher'),
    messageActions = require('../../actions/message'),

    calendars = [],
    store = new Store();

Object.assign(
    store,
    {
        getCalendars: function() {
            return calendars;
        }
    }
);

dispatcher.register(function(payload) {
    switch (payload.action.actionType) {
        case constants.ACTION_GET_CALENDARS:
            reqwest({
                url: config.url + config.getCalendarsUri,
                method: 'GET',
                crossOrigin: true,
            })
            .then(function(response) {
                calendars = response;
                store.emitChange();
            }).catch(function(error) {
                messageActions.addError(translate('cald.error.getCalendarsFailed'));
            });

            break;
    }

    return true;
});

module.exports = store;