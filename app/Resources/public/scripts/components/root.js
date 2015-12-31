'use strict';

var React = require('react'),
    Breadcrumb = require('react-breadcrumbs'),
    counterpart = require('counterpart'),
    Header = require('./header'),
    Menu = require('./menu'),
    MessageList = require('../components/messageList'),
    Navbar = require('./navbar'),
    browserActions = require('../actions/browser'),
    domains = require('../../config/links').domains,
    messageStore = require('../stores/message'),
    messageConstants = require('../constants/message'),
    userActions = require('../actions/auth/user'),
    userStore = require('../stores/auth/user'),

    /**
     * @return {Object}
     */
    getState = function() {
        return {
            user: userStore.getUser(),
            locale: counterpart.getLocale(),
            messages: messageStore.getMessages(messageConstants.DEFAULT_CHANNEL)
        }
    };

module.exports = React.createClass({
    displayName: 'Root',

    /**
     * @return {Object}
     */
    getInitialState: function() {
        return getState();
    },

    onChange: function() {
        this.setState(getState());
    },

    /**
     * Update app state upon locale change
     * @param {String} locale
     */
    onLocaleChange: function(locale) {
        this.setState({ locale });
    },

    componentWillMount: function() {
        userActions.getUserInformation();
    },

    componentDidMount: function() {
        counterpart.onLocaleChange(this.onLocaleChange);
        messageStore.addChangeListener(this.onChange);
        userStore.addChangeListener(this.onChange);

        // Get locale from PHP session
        require('../listeners/localeListener')();
    },

    componentWillUnmount: function() {
        counterpart.offLocaleChange(this.onLocaleChange);
        messageStore.addChangeListener(this.onChange);
        userStore.addChangeListener(this.onChange);
    },

    /**
     * @return {Object}
     */
    render: function() {
        var currentDomain = window.location.hash.match(/^#\/([^\/]+)/); // FIXME: better off using a dedicated mechanism in react-router, if any
        if (Array.isArray(currentDomain)) {
            currentDomain = currentDomain[1];
        }

        return (
            <div className="root" onClick={browserActions.appClick}>
                <Navbar user={this.state.user} />
                <Header />
                <Menu domains={domains} currentDomain={currentDomain} />
                <Breadcrumb routes={this.props.routes} separator="▸" customClass="breadcrumb" />
                <div className="root-container">
                    <MessageList messages={this.state.messages} channel={messageConstants.DEFAULT_CHANNEL} />
                    {/* Pass props to any child component (which depends on the current route) */}
                    {this.props.children && React.cloneElement(this.props.children, { domains: domains})}
                </div>
            </div>
        );
    }
});
