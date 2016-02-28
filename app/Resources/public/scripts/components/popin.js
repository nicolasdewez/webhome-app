'use strict';

let React = require('react'),
    Modal = require('react-modal'),
    translate = require('counterpart'),

    customStyles = {
        content: {
            top        : '50%',
            left       : '50%',
            right      : 'auto',
            bottom     : 'auto',
            marginRight: '-50%',
            width      : '50em',
            overflow   : 'inherit',
            transform  : 'translate(-50%, -50%)'
        }
    };

module.exports = React.createClass({
    displayName: 'Popin',

    /**
     * @return {Object}
     */
    render: function() {
        let footer = null;

        if (this.props.withFooter) {
            footer = (
                <footer className="popin-footer">
                    <button className="popin-button" onClick={this.props.closeModal}>{translate("popin.footer.cancel")}</button>
                    <button className="popin-button btn-primary" onClick={this.props.action}>{translate("popin.footer.ok")}</button>
                </footer>
            );
        }


        return (
            <div className="popin">
                <Modal isOpen={this.props.isOpen} onRequestClose={this.props.closeModal} style={customStyles}>
                    <header className="popin-header">
                        <span className="popin-title">{this.props.title}</span>
                        <a className="popin-close" onClick={this.props.closeModal} role="button" />
                    </header>

                    {this.props.children}

                    {footer}
                </Modal>
            </div>
        );
    }
});
