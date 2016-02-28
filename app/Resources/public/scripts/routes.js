'use strict';

var React = require('react'),
    Translate = require('react-translate-component'),
    HomeApp = require('./components/homeApp'),
    CaldApp = require('./components/cald/app'),
    CaldHome = require('./components/cald/home'),
    CaldJobCalendar = require('./components/cald/jobCalendar'),
    Root = require('./components/root');

module.exports = {
    path: '/',
    component: Root,
    name: <span className="glyphicon glyphicon-home" />,
    indexRoute: {
        component: HomeApp
    },
    childRoutes: [
        {
            path: 'cald',
            component: CaldApp,
            name: <Translate content="breadcrumb.cald.calendar" />,
            indexRoute: {
                component: CaldHome
            },
            childRoutes: [
                {
                    path: 'calendar/job',
                    component: CaldJobCalendar,
                    name: <Translate content="breadcrumb.cald.jobCalendar" />
                }
            ]
        },
        {
            path: 'home',
            component: HomeApp,
            name: <Translate content="breadcrumb.home" />
        }
    ]
};
