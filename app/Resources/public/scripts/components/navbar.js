'use strict';

var React = require('react'),
    Translate = require('react-translate-component'),
    counterpart = require('counterpart'),
    headerConfig = require('../../config/links').header,
    otherApps = require('../services/otherApps'),
    Dropdown = require('./dropdown');

module.exports = React.createClass({
    displayName: 'Navbar',

    /**
     * @return {Object}
     */
    render: function() {
        if (null === this.props.user) {
            return null;
        }

        var counter = 0,
            apps = otherApps(this.props.user),
            appsMenu;

        if (apps.length > 0) {
            appsMenu = (
                <ul className="nav navbar-nav navbar-left">
                    <Dropdown>
                        <a className="dropdown-toggle" role="button"><span className="glyphicon glyphicon-th"></span> <Translate content="header.applications"/> <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            {apps.map(function (app) {
                                return (
                                    <li key={counter++}>
                                        <a href={app.url}>{app.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </Dropdown>
                </ul>
            );
        }

        return (
            <nav className="userBar navbar-inverse">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        {appsMenu}

                        <ul className="nav navbar-nav navbar-right">
                            <Dropdown>
                                <a className="dropdown-toggle" role="button">
                                    <span className="glyphicon glyphicon-user"></span> {this.props.user.first_name} {this.props.user.last_name} ({this.props.user.username}) <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href={headerConfig.urlAuth + headerConfig.myAccount}><Translate content="header.showAccount" /></a></li>
                                    <li><a href={headerConfig.urlAuth + headerConfig.changePassword }><Translate content="header.changePassword" /></a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href={headerConfig.url + headerConfig.logout}><Translate content="header.logout" /></a></li>
                                </ul>
                            </Dropdown>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});
