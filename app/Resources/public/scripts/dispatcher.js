'use strict';

var Flux = require('flux'),
    dispatcher = new Flux.Dispatcher();

dispatcher.handleAction = function(action) {
    this.dispatch({
        action: action
    });
};

module.exports = dispatcher;
