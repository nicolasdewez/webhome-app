'use strict';

var React = require('react'),
    Translate = require('react-translate-component'),
    classNames = require('classnames'),
    constants = require('../../constants/cald'),
    getMonday = require('../../services/getMonday'),
    getWeek= require('../../services/getWeek'),
    moment = require('moment'),
    translate = require('counterpart'),
    Popin = require('../popin');

require('moment-range');

module.exports = React.createClass({
    displayName: 'Calendar',

    /**
     * @return {Object}
     */
    getInitialState: function() {
        let displayDate = this.props.displayDate ? this.props.displayDate : moment();

        return {
            displayDate: this.getFirstDayMonth(displayDate),
            events: this.props.events,
            popinEventId: null
        };
    },

    openModal: function(eventId) {
        this.setState({popinEventId: eventId});
    },

    closeModal: function() {
        this.setState({popinEventId: null});
    },

    componentWillReceiveProps: function(NewProps) {
        let displayDate = NewProps.displayDate ? NewProps.displayDate : moment();

        this.setState({
            events: NewProps.events,
            displayDate
        });
    },

    componentDidMount: function() {
        //BrowserStore.addClickListener(this.onAppClick);
    },

    componentWillUnmount: function() {
        //BrowserStore.removeClickListener(this.onAppClick);
    },

    getFirstDayMonth: function(day) {
        return moment([day.get('year'), day.get('month')]);
    },

    changeDisplayDate: function(numberMonth) {
        if (0 === numberMonth) {
            this.state.displayDate = this.getFirstDayMonth(moment());
            this.setState(this.state);

            return;
        }

        this.state.displayDate.set('month', this.state.displayDate.get('month') + numberMonth);
        this.setState({displayDate: this.state.displayDate});
    },

    /**
     * @param {moment} day
     * @return {boolean}
     */
    isInCurrentMonth: function(day) {
        return day.get('month') === this.state.displayDate.get('month');
    },

    /**
     * @param {moment} day
     * @return {Array}
     */
    getEventsByDay: function(day) {
        let events = [];
        this.state.events.map(function(event) {
            let eventDate = moment(event.date);
            if (day.format('YYYY-MM-DD') === eventDate.format('YYYY-MM-DD')) {
                events.push(event);
            }
        });

        return events;
    },

    deleteEvent: function(id) {
        this.closeModal();
        this.props.deleteFunction(id);
    },

    renderButtons: function() {
        let date = translate('cald.months.' + this.state.displayDate.get('month')) + ' ' + this.state.displayDate.get('year');

        return (
            <div>
                <a onClick={this.changeDisplayDate.bind(this, -1)} role="button" className="btn glyphicon glyphicon-arrow-left" />
                <a onClick={this.changeDisplayDate.bind(this, 0)} role="button" className="btn"><Translate content="cald.today" /></a>
                <a onClick={this.changeDisplayDate.bind(this, 1)} role="button" className="btn glyphicon glyphicon-arrow-right" />

                {date}
            </div>
        );
    },

    renderHeader: function() {
        let key = 0;

        return (
            <div>
                <div className="Calendar-dayHeader" key={++key}>
                    <Translate content="cald.days.monday" />
                </div>
                <div className="Calendar-dayHeader" key={++key}>
                    <Translate content="cald.days.tuesday" />
                </div>
                <div className="Calendar-dayHeader" key={++key}>
                    <Translate content="cald.days.wednesday" />
                </div>
                <div className="Calendar-dayHeader" key={++key}>
                    <Translate content="cald.days.thursday" />
                </div>
                <div className="Calendar-dayHeader" key={++key}>
                    <Translate content="cald.days.friday" />
                </div>
                <div className="Calendar-dayHeader" key={++key}>
                    <Translate content="cald.days.saturday" />
                </div>
                <div className="Calendar-dayHeader" key={++key}>
                    <Translate content="cald.days.sunday" />
                </div>
            </div>
        );
    },

    renderWeeks: function() {
        let day = this.state.displayDate,
            month = moment([day.get('year'), day.get('month')]),
            firstDayMonth = new Date(day.get('year'), day.get('month'), 1),
            endDay = moment(month).endOf('month').set({'hour': 0, 'minute': 0, 'second': 0}),
            endDayMonth = new Date(day.get('year'), day.get('month'), endDay.get('date')),
            weeks = [],
            calendar = [],

            firstMonday = getMonday(firstDayMonth),
            numberWeeks = getWeek(endDayMonth) - getWeek(firstDayMonth);

        // get all weeks of month
        for (let i = 0; i<= numberWeeks; i++) {
            let date = new Date(firstMonday);
            date.setDate(date.getDate() + i*7);
            weeks.push(date);
        }

        // get all days
        weeks.forEach(function(firstDayWeek) {
            let firstWeekDay = moment(firstDayWeek),
                lastWeekDay = moment(firstDayWeek).add(6, 'days'),
                weekRange = moment.range(firstWeekDay, lastWeekDay),
                days = [];

            weekRange.by('days', function(day) {
                days.push(day.set({'hour': 0, 'minute': 0, 'second': 0}));
            });

            calendar.push(days);
        });

        // Display weeks
        return (
            <div>
                {calendar.map(function(week, indexWeek) {
                    return (
                        <div className="Calendar-week" key={indexWeek}>
                            {week.map(function(day, indexDay) {
                                let classes = {
                                        'Calendar-day': true,
                                        'Calendar-inactive': !this.isInCurrentMonth(day)
                                    },
                                    key = indexWeek + '-' + indexDay,
                                    events = this.getEventsByDay(day);

                                return <div className={classNames(classes)} key={key}>{ this.renderEvent(day, events) }</div>
                            }.bind(this))}
                        </div>
                    )
                }.bind(this)) }
            </div>
        );
    },

    /**
     * @param {moment} day
     * @param {Array} events
     * @return {Object}
     */
    renderEvent: function(day, events) {
        if (constants.CALD_JOB_EVENT !== this.props.type) {
            return null;
        }

        return (
            <div>
                { day.format('D') }
                {
                    events.map(function(event, index) {
                        return (
                            <div className="Calendar-jobEvent" key={index}>
                                { event.job.title } ({ event.job.code })
                                <span className="Calendar-close" role="button" onClick={this.openModal.bind(this, event.id)}/>
                            </div>
                        );
                    }.bind(this))
                }
            </div>
        );
    },

    /**
     * @return {Object}
     */
    render: function() {
        return (
            <div className="Calendar col-md-9">
                {this.renderButtons()}
                {this.renderHeader()}
                {this.renderWeeks()}

                <Popin
                    isOpen={null !== this.state.popinEventId}
                    closeModal={this.closeModal}
                    title={translate('cald.popin.header')}
                    action={this.deleteEvent.bind(this, this.state.popinEventId)}
                    withFooter={true}
                >
                    {translate('cald.popin.text')}
                </Popin>
            </div>
        );
    }
});
