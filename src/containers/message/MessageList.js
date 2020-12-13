import React from 'react';

import Message from '../../components/message/Message';
import './MessageList.scss';
import { connect } from "react-redux";


class MessageList extends React.Component {
    render() {
        console.log(this.props.messages)
        console.log(this.props)


        return (<div id="chat-message-list">
            {this.props.messages.map(x => {
                return (<Message
                    key={x.key}
                    isMyMessage={x.isMyMessage}
                    message={x.message}/>)
            })}
        </div>);
    }
}

function mapStateToProps(state) {
    const {messageState} = state;
    return {messages: messageState.messages}
}


export default connect(mapStateToProps, null)(MessageList);
