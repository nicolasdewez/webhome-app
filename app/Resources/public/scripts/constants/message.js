'use strict';

var createConstantHash = require('../services/createConstantHash'),

    constants = createConstantHash([
        'ACTION_ADD',
        'ACTION_FLUSH',
        'LEVEL_SUCCESS',
        'LEVEL_INFO',
        'LEVEL_WARNING',
        'LEVEL_ERROR',
        'DEFAULT_CHANNEL',
        'CHANNEL_CALD_JOB_CALENDAR'
    ]);

constants.DEFAULT_DELAY = 5000;

module.exports = constants;
