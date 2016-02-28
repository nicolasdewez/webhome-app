'use strict';

var constants = require('../../constants/cald'),
    dispatcher = require('../../dispatcher');

module.exports = {
    /**
     * @param {Number} calendarId
     */
    getEvents: function(calendarId) {
        dispatcher.handleAction({
            actionType: constants.ACTION_GET_JOB_EVENTS,
            calendarId
        });
    },

    /**
     * @param {Number} calendarId
     * @param {Object} form
     */
    createEvent: function(calendarId, form) {
        let data = {
            date: form.date.format(),
            job: {id: form.job}
        };

        dispatcher.handleAction({
            actionType: constants.ACTION_CREATE_JOB_EVENT,
            calendarId,
            data
        });
    },

    /**
     * @param {Number} calendarId
     * @param {Object} event to update
     * @param {Object} form
     */
    updateEvent: function(calendarId, event, form) {
        event.job.id = form.job;

        dispatcher.handleAction({
            actionType: constants.ACTION_UPDATE_JOB_EVENT,
            calendarId,
            data: event
        });
    },

    /**
     * @param {Number} calendarId
     * @param {Number} eventId
     */
    deleteEvent: function(calendarId, eventId) {
        dispatcher.handleAction({
            actionType: constants.ACTION_DELETE_JOB_EVENT,
            calendarId,
            eventId
        });
    }
};