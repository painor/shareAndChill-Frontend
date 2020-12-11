import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { w3cwebsocket as W3CWebSocket } from "websocket";


import MessageList from '../message/MessageList';
import ChatForm from '../../components/chat-form/ChatForm';

import './ChatShell.scss';
import ChatTitle from "../../components/chat-title/ChatTitle";

const myUid = uuidv4();

class ChatShell extends React.Component {
    connect() {
        this.client = new W3CWebSocket('ws://127.0.0.1:8765');

        this.client.onclose = (e) => {
            console.log(e)
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(() => {
                this.connect();
            }, 1000);
        };

        this.client.onerror = function(err) {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            try {
                this.client.close();
            } catch (e) {

            }
        };

        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        this.client.onmessage = (message) => {

            const received = JSON.parse(message.data);
            received.key = uuidv4();
            if (!received.isMyMessage) {
                this.setState((prevState) => ({
                    messages: [received, ...prevState.messages]
                }));
            }
        };

    }

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
        this.roomId = props.roomId;
        this.connect();
    }

    onMessageSubmitted = (text) => {

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
        this.client.send(JSON.stringify(newMessage));

        this.setState((prevState) => ({
            messages: [newMessage, ...prevState.messages]
        }));
    };

    render() {
        return (
            <div id="chat-container">
                <ChatTitle selectedConversation={"tests"}/>
                <MessageList key={uuidv4()} messages={this.state.messages}/>
                <ChatForm
                    onMessageSubmitted={this.onMessageSubmitted}/>
            </div>
        );
    }
}

export default ChatShell;
