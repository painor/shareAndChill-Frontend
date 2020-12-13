import React from 'react';


import MessageList from '../message/MessageList';
import ChatForm from '../../components/chat-form/ChatForm';

import './ChatShell.scss';
import ChatTitle from "../../components/chat-title/ChatTitle";


class ChatShell extends React.Component {


    constructor(props) {
        super(props);
        this.roomId = props.roomId;
    }


    render() {
        return (
            <div id="chat-container">
                <ChatTitle chatTitle={this.roomId}/>
                <MessageList/>
                <ChatForm hasAttachment={true} hintText={"Type a message"} buttonText={"Send"} chatType={"SEND_MESSAGE"}/>
            </div>
        );
    }
}


export default ChatShell;
