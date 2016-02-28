'use strict';

var reqwest = require('../../services/authReqwest'),
    translate = require('counterpart'),
    Store = require('../../store'),
    config = require('../../../config/cald'),
    constants = require('../../constants/cald'),
    messageConstants = require('../../constants/message'),
    moment = require('moment'),
    dispatcher = require('../../dispatcher'),
    eventActions = require('../../actions/cald/eventJob'),
    messageActions = require('../../actions/message'),

    events = [],
    store = new Store();

Object.assign(
    store,
    {
        getEvents: function() {
            return events;
        }
    }
);

dispatcher.register(function(payload) {
    switch (payload.action.actionType) {
        case constants.ACTION_GET_JOB_EVENTS:
            reqwest({
                url: config.url + config.getEventsJobUri.replace('{calendarId}', payload.action.calendarId),
                method: 'GET'
            })
            .then(function(response) {
                events = response;
                store.emitChange();
            }).catch(function(error) {
                messageActions.addError(translate('cald.error.getEventsJobFailed'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
            });
            break;

        case constants.ACTION_CREATE_JOB_EVENT:
            reqwest({
                url: config.url + config.createEventJobUri.replace('{calendarId}', payload.action.calendarId),
                method: 'POST',
                data: JSON.stringify(payload.action.data)
            })
            .then(function() {
                messageActions.addInfo(translate('cald.info.createEventJob'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
                store.emitChange();
                eventActions.getEvents(payload.action.calendarId);
            }).catch(function(error) {
                messageActions.addError(translate('cald.error.createEventJobFailed'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
            });
            break;

        case constants.ACTION_UPDATE_JOB_EVENT:
            reqwest({
                url: config.url + config.updateEventJobUri.replace('{calendarId}', payload.action.calendarId),
                method: 'PUT',
                data: JSON.stringify(payload.action.data)
            })
            .then(function() {
                messageActions.addInfo(translate('cald.info.updateEventJob'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
                store.emitChange();
                eventActions.getEvents(payload.action.calendarId);
            }).catch(function(error) {
                messageActions.addError(translate('cald.error.updateEventJobFailed'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
            });
            break;

        case constants.ACTION_DELETE_JOB_EVENT:
            let uri = config.deleteEventJobUri
                .replace('{calendarId}', payload.action.calendarId)
                .replace('{eventId}', payload.action.eventId);

            reqwest({
                url: config.url + uri,
                method: 'DELETE'
            })
            .then(function() {
                messageActions.addInfo(translate('cald.info.deleteEventJob'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
                store.emitChange();
                eventActions.getEvents(payload.action.calendarId);
            }).catch(function(error) {
                messageActions.addError(translate('cald.error.deleteEventJobFailed'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
            });
            break;
    }

    return true;
});

module.exports = store;