'use strict';

var React = require('react'),
    Select = require('react-select'),
    Translate = require('react-translate-component'),
    classNames = require('classnames'),
    translate = require('counterpart'),
    calendarActions = require('../../actions/cald/calendar'),
    calendarStore = require('../../stores/cald/calendar'),
    constants = require('../../constants/cald'),
    messageStore = require('../../stores/message'),
    MessageList = require('../messageList'),
    messageActions = require('../../actions/message'),

    getState = function() {
        return {
            calendars: calendarStore.getCalendars(),
            calendarId: null,
            messages: messageStore.getMessages(constants.CHANNEL_CALD_JOB_CALENDAR)
        };
    };

module.exports = React.createClass({
    displayName: 'CaldJobCalendar',

    getInitialState: function() {
        return getState();
    },

    onChange: function() {
        this.setState(this.getState());
    },

    componentWillMount: function() {
        messageActions.flush(constants.CHANNEL_TRANSPORT_CARRIER_DELIVERY_MODE);
        calendarActions.getCalendars();
    },

    componentDidMount: function() {
        calendarStore.addChangeListener(this.onChange);
        messageStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        calendarStore.removeChangeListener(this.onChange);
        messageStore.removeChangeListener(this.onChange);
    },

    handleCalendar: function(value) {
        this.state.calendarId = value;
        this.setState(this.state);
    },

    /**
     * @return {Object}
     */
    render: function() {

        return (
            <form className="caldJobCalendar" onSubmit={this.submitForm}>
                <h2><Translate content="cald.calandar.job.title" /></h2>

                <div className="col-md-6">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-3 control-label"><Translate content="cald.calandar.job.calendar" /></label>
                            <div className="col-sm-9">
                                <Select placeholder="" options={this.state.calendars} onChange={this.handleCalendar} value={this.state.calendarId} />
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
});