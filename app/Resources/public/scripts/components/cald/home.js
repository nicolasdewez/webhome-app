'use strict';

var React = require('react'),
    Translate = require('react-translate-component'),
    classNames = require('classnames'),
    translate = require('counterpart'),
    //TransportCarrierDeliveryModesRow = require('./carrierDeliveryModesRow'),
    //carrierActions = require('../../actions/transport/carrierActions'),
    //carrierDeliveryModeActions = require('../../actions/transport/carrierDeliveryModeActions'),
    //carrierDeliveryModeStore = require('../../stores/transport/carrierDeliveryModeStore'),
    //carrierStore = require('../../stores/transport/carrierStore'),
    //deliveryModeActions = require('../../actions/transport/deliveryModeActions'),
    //deliveryModeStore = require('../../stores/transport/deliveryModeStore'),
    //constants = require('../../constants/transportConstants'),
    messageStore = require('../../stores/message'),
    MessageList = require('../messageList'),
    messageActions = require('../../actions/message'),

    getState = function() {
        return {
            //carriers: carrierStore.getCarriersForSelect(),
            //messages: messageStore.getMessages(constants.CHANNEL_TRANSPORT_CARRIER_DELIVERY_MODE)
        };
    };

module.exports = React.createClass({
    displayName: 'CaldHome',

    getInitialState: function() {
        return getState();
    },

    onChange: function() {
        this.setState(this.getState());
    },

    componentWillMount: function() {
        //messageActions.flush(constants.CHANNEL_TRANSPORT_CARRIER_DELIVERY_MODE);
        //carrierActions.listCarriers();
    },

    componentDidMount: function() {
        //carrierStore.addChangeListener(this.onChange);
        //messageStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        //carrierStore.removeChangeListener(this.onChange);
        //messageStore.removeChangeListener(this.onChange);
    },


    /**
     * @return {Object}
     */
    render: function() {

        return (
            <div>Cald -> Home</div>
        );
    }
});