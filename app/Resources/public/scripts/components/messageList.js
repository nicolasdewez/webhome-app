'use strict';

var React = require('react'),
    Message = require('./message');

module.exports = React.createClass({
    displayName: 'MessageList',

    /**
     * @return {Object}
     */
    render: function() {
        return (
            <div>{Array.isArray(this.props.messages) && this.props.messages.map(function(message, index) {
                if (this.props.messages.length - this.props.limit > index) {
                    // Hide messages over the limit
                    return null;
                }

                return (<Message key={index} level={message.level} delay={message.delay}>{message.message}</Message>);
            }.bind(this))}</div>
        );
    }
});
