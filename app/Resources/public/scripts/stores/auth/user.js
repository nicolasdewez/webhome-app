'use strict';

var reqwest = require('reqwest'),
    translate = require('counterpart'),
    Store = require('../../store'),
    config = require('../../../config/auth'),
    constants = require('../../constants/auth'),
    dispatcher = require('../../dispatcher'),
    messageActions = require('../../actions/message'),

    user = null,
    store = new Store();

Object.assign(
    store,
    {
        getUser: function() {
            return user;
        }
    }
);

dispatcher.register(function(payload) {
    switch (payload.action.actionType) {
        case constants.ACTION_GET_USER:
            reqwest({
                url: config.url + config.getUserInformationUri,
                method: 'GET',
                crossOrigin: true,
            })
            .then(function(response) {
                user = response;
                store.emitChange();
            }).catch(function(error) {
                messageActions.addError(translate('auth.error.failed'));
            });

            break;
    }

    return true;
});

module.exports = store;