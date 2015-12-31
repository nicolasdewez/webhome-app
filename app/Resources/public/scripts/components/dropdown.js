'use strict';

var React = require('react'),
    classNames = require('classnames'),
    BrowserStore = require('../stores/browser');

module.exports = React.createClass({
    displayName: 'Dropdown',

    /**
     * @return {Object}
     */
    getInitialState: function() {
        return {
            open: false
        };
    },

    toggle: function() {
        this.setState({
            open: !this.state.open
        });
    },

    onAppClick: function() {
        if (this.state.open) {
            this.toggle();
        }
    },

    componentDidMount: function() {
        BrowserStore.addClickListener(this.onAppClick);
    },

    componentWillUnmount: function() {
        BrowserStore.removeClickListener(this.onAppClick);
    },

    /**
     * @return {Object}
     */
    render: function() {
        var classes = {
            dropdown: true,
            open: this.state.open
        };

        return (
            <li className={classNames(classes) + (('undefined' !== typeof this.props.className) ? ' ' + this.props.className : '')} onClick={this.toggle}>
                {this.props.children}
            </li>
        );
    }
});
