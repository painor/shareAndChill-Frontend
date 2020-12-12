import React from 'react';
import { v4 as uuidv4 } from 'uuid';


import MessageList from '../message/MessageList';
import ChatForm from '../../components/chat-form/ChatForm';

import './ChatShell.scss';
import ChatTitle from "../../components/chat-title/ChatTitle";

import store from '../../redux/store';

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
                <ChatForm/>
            </div>
        );
    }
}


export default ChatShell;
