import React, { useState } from 'react';

import FormButton from '../controls/buttons/FormButton';
import AttachmentIcon from '../controls/icons/attachment-icon/AttachmentIcon';

import './ChatForm.scss';

const isMessageEmpty = (textMessage) => {
    return adjustTextMessage(textMessage).length === 0;
}

const adjustTextMessage = (textMessage) => {
    return textMessage.trim();
};

const ChatForm = ({onMessageSubmitted}) => {
    const [textMessage, setTextMessage] = useState('');
    const disableButton = isMessageEmpty(textMessage);

    const formContents = (
        <>
            <div title="Add Attachment">
                <AttachmentIcon/>
            </div>
            <input
                type="text"
                placeholder="type a message"
                value={textMessage}
                onChange={(e) => {
                    setTextMessage(e.target.value);
                }}/>
            <FormButton disabled={disableButton}>Send</FormButton>
        </>
    );

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!isMessageEmpty(textMessage)) {
            onMessageSubmitted(textMessage);
            setTextMessage('');
        }
    };


    return (
        <form id="chat-form" onSubmit={handleFormSubmit}>
            {formContents}
        </form>
    );
}

export default ChatForm;
