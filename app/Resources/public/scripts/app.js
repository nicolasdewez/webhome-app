(function() {
    'use strict';

    var React = require('react'),
        ReactDOM = require('react-dom'),
        Router = require('react-router').Router,
        counterpart = require('counterpart');

    counterpart.registerTranslations('en', require('../translations/en'));
    counterpart.registerTranslations('fr', require('../translations/fr'));

    ReactDOM.render(
        <Router history={require('./history')} routes={require('./routes')} />,
        document.getElementById('app')
    );
})();
