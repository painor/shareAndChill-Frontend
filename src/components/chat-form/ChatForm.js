import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import FormButton from '../controls/buttons/FormButton';
import AttachmentIcon from '../controls/icons/attachment-icon/AttachmentIcon';

import './ChatForm.scss';

const isMessageEmpty = (textMessage) => {
    return adjustTextMessage(textMessage).length === 0;
}

const adjustTextMessage = (textMessage) => {
    return textMessage.trim();
};

class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.chatType = props.chatType;
        this.state = {
            textMessage: ""
        }
    }

    onMessageSubmitted(text) {
        if (this.chatType === "SEND_MESSAGE") {
            this.props.sendMessage(text)

        } else if (this.chatType === "CHANGE_URL") {
            this.props.changeUrl(text)

        } else {
            throw new Error("Unknown type");
        }

    }

    render() {

        const disableButton = isMessageEmpty(this.state.textMessage);
        const handleFormSubmit = (e) => {
            e.preventDefault();

            if (!isMessageEmpty(this.state.textMessage)) {
                this.onMessageSubmitted(this.state.textMessage);
                this.setState({
                    textMessage: ""
                });
            }
        };
        let attachment;

        if (this.props.hasAttachment) {
            attachment = <div title="Add Attachment"><AttachmentIcon/></div>
        } else {
            attachment = ""
        }


        const formContents = (
            <>
                {attachment}
                <input
                    type="text"
                    placeholder={this.props.hintText}
                    value={this.state.textMessage}
                    onChange={(e) => {
                        this.setState({
                            textMessage: e.target.value
                        });
                    }}/>
                <FormButton disabled={disableButton}>{this.props.buttonText}</FormButton>
            </>
        );


        return (
            <form id="chat-form" onSubmit={handleFormSubmit}>
                {formContents}
            </form>
        );
    }

}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        sendMessage: function(text) {
            const newMessage = {
                key: uuidv4(),
                isMyMessage: true,

                message: {
                    imageUrl: null,
                    imageAlt: null,
                    messageText: text,
                    createdAt: new Date().toLocaleTimeString(),
                    isMyMessage: true
                }
            };

            dispatch({
                type: 'SENT_MESSAGE',
                data: newMessage
            });
        },
        changeUrl: function(text) {
            dispatch({
                type: 'CHANGE_URL',
                data: text
            });
        }
    }
}


export default connect(null, mapDispatchToProps)(ChatForm);
