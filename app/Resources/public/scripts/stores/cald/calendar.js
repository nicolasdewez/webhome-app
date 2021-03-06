'use strict';

var reqwest = require('../../services/authReqwest'),
    translate = require('counterpart'),
    Store = require('../../store'),
    config = require('../../../config/cald'),
    constants = require('../../constants/cald'),
    messageConstants = require('../../constants/message'),
    dispatcher = require('../../dispatcher'),
    messageActions = require('../../actions/message'),

    calendars = [],
    store = new Store();

Object.assign(
    store,
    {
        getCalendars: function() {
            return calendars.map(function(item) {
                return {
                    value: item.id,
                    label: item.title
                }
            });
        }
    }
);

dispatcher.register(function(payload) {
    switch (payload.action.actionType) {
        case constants.ACTION_GET_CALENDARS:
            reqwest({
                url: config.url + config.getCalendarsUri,
                method: 'GET'
            })
            .then(function(response) {
                calendars = response;
                store.emitChange();
            }).catch(function(error) {
                messageActions.addError(translate('cald.error.getCalendarsFailed'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
            });

            break;
    }

    return true;
});

module.exports = store;