'use strict';

var userStore = require('../stores/auth/user'),
    counterpart = require('counterpart');

module.exports = userStore.addChangeListener.bind(
    userStore,
    function() {
        var user = userStore.getUser();

        counterpart.setLocale(user.locale);
    }
);