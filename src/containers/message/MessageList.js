import React from 'react';

import Message from '../../components/message/Message';
import './MessageList.scss';


class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.messages = props.messages;
    }

    render() {

        return (<div id="chat-message-list">
            {this.messages.map(x => {
                return (<Message
                    key={x.key}
                    isMyMessage={x.isMyMessage}
                    message={x.message}/>)
            })}
        </div>);
    }
}


export default MessageList;
