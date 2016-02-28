'use strict';

var createConstantHash = require('../services/createConstantHash');

module.exports = createConstantHash([
    'ACTION_GET_CALENDARS',
    'ACTION_GET_EVENTS',
    'ACTION_GET_JOB_EVENTS',
    'ACTION_CREATE_JOB_EVENT',
    'ACTION_UPDATE_JOB_EVENT',
    'ACTION_DELETE_JOB_EVENT',

    'CALD_JOB_EVENT',
    'CALD_NURSERY_EVENT'
]);
