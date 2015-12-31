'use strict';

var React = require('react'),
    SubMenu = require('./subMenu'),
    MenuItem = require('./menuItem'),
    classNames = require('classnames');

module.exports = React.createClass({
    displayName: 'Menu',

    /**
     * @return {Object}
     */
    render: function() {
        var subMenus = [],
            cpt = 0,
            classes = classNames({
                'menu': true,
                'menu-calendar': 'calendar' == this.props.currentDomain,
                'menu-home': 'home' == this.props.currentDomain
            });

        this.props.domains.forEach(function(domain) {
            var menuItems = [],
                subCpt = 0,
                isCurrent = domain.key === this.props.currentDomain;

            if (domain.links) {
                domain.links.forEach(function (link) {
                    if (link.divider) {
                        menuItems.push(<MenuItem key={'key-' + subCpt++} divider="true" />);
                        return;
                    }

                    menuItems.push(<MenuItem key={'key-' + subCpt++} link={link.url}>{link.name}</MenuItem>);
                });
            }

            if (0 === menuItems.length) {
                subMenus.push(<SubMenu key={'key-' + cpt++} label={domain.name} suffix={domain.key} link={domain.url} isCurrent={isCurrent}></SubMenu>);
            } else {
                subMenus.push(<SubMenu key={'key-' + cpt++} label={domain.name} suffix={domain.key} isCurrent={isCurrent}>{menuItems}</SubMenu>);
            }
        }.bind(this));

        return (
            <nav className={classes}>
                <ul className="menu-container">{subMenus}</ul>
            </nav>
        );
    }
});
