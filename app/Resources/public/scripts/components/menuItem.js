'use strict';

var React = require('react'),
    Link = require('react-router').Link,
    Translate = require('react-translate-component');

module.exports = React.createClass({
    displayName: 'MenuItem',

    /**
     * @return {Object}
     */
    render: function() {
        if (this.props.divider) {
            return (
                <li className="divider"></li>
            );
        }

        return (
            <li className="menuItem">
                <Link to={this.props.link} className="menuItem-link">
                    <Translate content={this.props.children} />
                </Link>
            </li>
        );
    }
});
