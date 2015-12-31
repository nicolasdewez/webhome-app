'use strict';

var React = require('react'),
    Link = require('react-router').Link,
    Translate = require('react-translate-component'),
    classNames = require('classnames'),
    Dropdown = require('./dropdown');

module.exports = React.createClass({
    displayName: 'SubMenu',

    /**
     * @return {Object}
     */
    render: function() {
        var classes = classNames([
                'subMenu',
                'subMenu-' + this.props.suffix
            ]),

            linkClasses = classNames({
                'subMenu-link': true,
                'subMenu-link-active': this.props.isCurrent
            }),

            iconClasses = classNames({
                'glyphicon-calendar': this.props.suffix === 'calendar',
                'glyphicon-home': this.props.suffix === 'home',
                glyphicon: true,
                'subMenu-image': true
            }),

            iconAndLabel = [
                <i key="icon" className={iconClasses} />,
                <span key="label" className="subMenu-label"><Translate content={this.props.label} /></span>
            ];

        if ('link' in this.props) {
            return (
                <div className={classes}>
                    <Link to={this.props.link} className={linkClasses}>{iconAndLabel}</Link>
                </div>
            );
        }

        return (
            <Dropdown className={classes}>
                <ul className="dropdown-menu subMenu-list">
                    {this.props.children}
                </ul>
                <a className={linkClasses} role="button">{iconAndLabel}</a>
            </Dropdown>
        );
    }
});
