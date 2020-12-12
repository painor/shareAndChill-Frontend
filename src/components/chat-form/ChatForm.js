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
        this.state = {
            textMessage: ""
        }
    }

    onMessageSubmitted(text) {
        this.props.toggleActive(text)

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

        const formContents = (
            <>
                <div title="Add Attachment">
                    <AttachmentIcon/>
                </div>
                <input
                    type="text"
                    placeholder="type a message"
                    value={this.state.textMessage}
                    onChange={(e) => {
                        this.setState({
                            textMessage: e.target.value
                        });
                    }}/>
                <FormButton disabled={disableButton}>Send</FormButton>
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
        toggleActive: function(text) {
            console.log("TEXT",text)
            console.log("dispatch",dispatch)
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
        }
    }
}


export default connect(null,mapDispatchToProps)(ChatForm);
