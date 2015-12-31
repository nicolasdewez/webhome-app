'use strict';

var React = require('react'),
    Link = require('react-router').Link;

module.exports = React.createClass({
    displayName: 'Header',

    /**
     * @return {Object}
     */
    render: function() {
        return (
            <header className="header">
                <div className="header-container">
                    <Link to="/" className="header-container-link">
                        <span className="glyphicon glyphicon-home header-container-link-project" aria-hidden="true"></span>
                        <h1>WebHome</h1>
                    </Link>
                </div>
            </header>
        );
    }
});
