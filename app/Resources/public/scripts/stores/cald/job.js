'use strict';

var reqwest = require('../../services/authReqwest'),
    translate = require('counterpart'),
    Store = require('../../store'),
    config = require('../../../config/cald'),
    constants = require('../../constants/cald'),
    messageConstants = require('../../constants/message'),
    dispatcher = require('../../dispatcher'),
    messageActions = require('../../actions/message'),

    jobs = [],
    store = new Store();

Object.assign(
    store,
    {
        getJobs: function() {
            return jobs.map(function(item) {
                return {
                    value: item.id,
                    label: item.title + ' (' + item.code + ')'
                }
            });
        }
    }
);

dispatcher.register(function(payload) {
    switch (payload.action.actionType) {
        case constants.ACTION_GET_JOBS:
            reqwest({
                url: config.url + config.getJobsUri,
                method: 'GET'
            })
            .then(function(response) {
                jobs = response;
                store.emitChange();
            }).catch(function(error) {
                messageActions.addError(translate('cald.error.getJobsFailed'), messageConstants.CHANNEL_CALD_JOB_CALENDAR);
            });

            break;
    }

    return true;
});

module.exports = store;