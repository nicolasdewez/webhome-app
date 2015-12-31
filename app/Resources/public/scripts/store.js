'use strict';

require('object-assign-shim');

var EventEmitter2 = require('eventemitter2').EventEmitter2;

module.exports = function() {
    Object.assign(
        this,
        EventEmitter2.prototype,
        {
            emitChange: function() {
                this.emit('change');
            },

            addChangeListener: function(callback) {
                this.addListener('change', callback);
            },

            removeChangeListener: function(callback) {
                this.removeListener('change', callback);
            }
        }
    );
};
