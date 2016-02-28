'use strict';

var React = require('react'),
    DatePicker = require('react-datepicker'),
    Select = require('react-select'),
    Translate = require('react-translate-component'),
    Calendar = require('./calendar'),
    moment = require('moment'),
    translate = require('counterpart'),
    calendarActions = require('../../actions/cald/calendar'),
    eventActions = require('../../actions/cald/eventJob'),
    jobActions = require('../../actions/cald/job'),
    calendarStore = require('../../stores/cald/calendar'),
    eventStore = require('../../stores/cald/eventJob'),
    jobStore = require('../../stores/cald/job'),
    constants = require('../../constants/cald'),
    messageConstants = require('../../constants/message'),
    messageStore = require('../../stores/message'),
    MessageList = require('../messageList'),
    messageActions = require('../../actions/message'),

    getState = function() {
        return {
            calendars: calendarStore.getCalendars(),
            jobs: jobStore.getJobs(),
            events: eventStore.getEvents(),
            calendarDate: moment(),
            form: {
                date: null,
                job: null
            },
            messages: messageStore.getMessages(messageConstants.CHANNEL_CALD_JOB_CALENDAR)
        };
    };

module.exports = React.createClass({
    displayName: 'CaldJobCalendar',

    getInitialState: function() {
        return getState();
    },

    onChange: function() {
        this.setState(getState());
    },

    componentWillMount: function() {
        messageActions.flush(messageConstants.CHANNEL_CALD_JOB_CALENDAR);
        calendarActions.getCalendars();
        jobActions.getJobs();
    },

    componentDidMount: function() {
        calendarStore.addChangeListener(this.onChange);
        eventStore.addChangeListener(this.onChange);
        jobStore.addChangeListener(this.onChange);
        messageStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        calendarStore.removeChangeListener(this.onChange);
        eventStore.removeChangeListener(this.onChange);
        jobStore.removeChangeListener(this.onChange);
        messageStore.removeChangeListener(this.onChange);
    },

    handleCalendar: function(value) {
        this.state.calendarId = value;
        this.setState(this.state);

        if (!this.state.calendarId) {
            return;
        }

        eventActions.getEvents(this.state.calendarId);
    },

    handleForm: function(key, value) {
        this.state.form[key] = value;
        this.setState({form: this.state.form});
    },

    submitForm: function() {
        // Search event in state
        let event = this.getEventByDay(this.state.form.date);
        if (!event) {
            eventActions.createEvent(this.state.calendarId, this.state.form);
        } else {
            eventActions.updateEvent(this.state.calendarId, event, this.state.form);
        }

        // Reset form
        this.setState({form: {date: null, job: null}});
    },

    deleteEvent: function(id) {
        eventActions.deleteEvent(this.state.calendarId, id);
    },

    /**
     * @param {moment} date
     *
     * @returns {null}
     */
    getEventByDay: function(date) {
        let events = [];

        this.state.events.forEach(function(event) {
            let eventDate = moment(event.date);
            if (date.format('YYYY-MM-DD') === eventDate.format('YYYY-MM-DD')) {
                events.push(event);
            }
        });

        return events.length ? events[0] : null;
    },

    /**
     * @return {Object}
     */
    render: function() {
        let calendarBlock = null;

        if (this.state.calendarId) {
            calendarBlock = (
                <div className="JobCalendar">
                    <Calendar
                        type={constants.CALD_JOB_EVENT}
                        events={this.state.events}
                        displayDate={this.state.calendarDate}
                        deleteFunction={this.deleteEvent}
                    />
                    <div className="col-md-3">
                        <form className="JobCalendar-form" onSubmit={this.submitForm}>
                            <div className="form-group">
                                <label className="col-sm-3 control-label"><Translate content="cald.jobCalendar.label.date" /></label>
                                <div className="col-sm-9">
                                    <DatePicker dateFormat="DD/MM/YYYY" selected={this.state.form.date} onChange={this.handleForm.bind(this, 'date')} className="form-control" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3 control-label"><Translate content="cald.jobCalendar.label.job" /></label>
                                <div className="col-sm-9">
                                    <Select placeholder={translate('cald.jobCalendar.placeholder.job')} value={this.state.form.job} options={this.state.jobs} onChange={this.handleForm.bind(this, 'job')} />
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary" disabled={!this.state.form.date || !this.state.form.job}><Translate content="cald.jobCalendar.label.save" /></button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        return (
            <div className="caldJobCalendar">
                <h2><Translate content="cald.jobCalendar.title" /></h2>
                <MessageList messages={this.state.messages} limit="1" />

                <div className="col-md-6">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-3 control-label"><Translate content="cald.jobCalendar.label.calendar" /></label>
                            <div className="col-sm-9">
                                <Select placeholder={translate('cald.jobCalendar.placeholder.calendar')} options={this.state.calendars} onChange={this.handleCalendar} value={this.state.calendarId} />
                            </div>
                        </div>
                    </div>
                </div>

                {calendarBlock}
            </div>
        );
    }
});
