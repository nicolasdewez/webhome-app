'use strict';

var React = require('react'),
    classNames = require('classnames'),
    constants = require('../constants/message');

module.exports = React.createClass({
    displayName: 'Message',

    /**
     * @return {Object}
     */
    getInitialState: function() {
        return {
            visible: true
        };
    },

    componentDidMount: function() {
        this.initTimer();
    },

    initTimer: function() {
        if (0 < this.props.delay) {
            setTimeout(
                this.close.bind(this),
                this.props.delay
            );
        }
    },

    close: function() {
        this.setState({ visible: false });
    },

    /**
     * @return {*}
     */
    formatChildren: function() {
        let counter = 0;

        if (!Array.isArray(this.props.children)) {
            return this.props.children;
        }

        return (<ul>{this.props.children.map(function(child) {
            return <li key={counter++}>{child}</li>;
        })}</ul>);
    },

    /**
     * @return {Object|null}
     */
    render: function() {
        if (!this.state.visible) {
            return null;
        }

        var classes = classNames(
            'alert',
            'alert-dismissible',
            {
                'alert-success': (constants.LEVEL_SUCCESS == this.props.level),
                'alert-info': (constants.LEVEL_INFO == this.props.level),
                'alert-warning': (constants.LEVEL_WARNING == this.props.level),
                'alert-danger': (constants.LEVEL_ERROR == this.props.level)
            }
        );

        return (
            <div className={classes}>
                <button type="button" className="close" onClick={this.close}>&times;</button>
                {this.formatChildren()}
            </div>
        );
    }
});
