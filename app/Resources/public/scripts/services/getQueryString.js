'use strict';

/**
 * @param {String} key
 *
 * @return {String|null}
 */
module.exports = function(key) {
    let regex,
        qs;

    key = key.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    regex = new RegExp('[\\?&]' + key + '=([^&#]*)');
    qs = regex.exec(window.location.href);

    if (qs === null) {
        return null;
    }

    return qs[1];
};
