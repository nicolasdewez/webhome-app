'use strict';

var React = require('react'),
    Translate = require('react-translate-component'),
    history = require('../history');

module.exports = React.createClass({
    displayName: 'Home',

    /**
     * @return {Object}
     */
    render: function() {
        return (<Translate content="home.title" />);
    }
});
