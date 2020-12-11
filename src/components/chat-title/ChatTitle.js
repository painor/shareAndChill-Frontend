import React from 'react';


import './ChatTitle.scss';

const ChatTitle = ({ chatTitle }) => {

    return (
        <div id="chat-title">
            <span>{ chatTitle }</span>
        </div>
    );
}

export default ChatTitle;
