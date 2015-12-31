'use strict';

var React = require('react'),
    history = require('../../history');

module.exports = React.createClass({
    displayName: 'CaldApp',

    /**
     * @return {Object}
     */
    render: function() {
        return (
            <div className="caldApp">
                {this.props.children}
            </div>
        );
    }
});
