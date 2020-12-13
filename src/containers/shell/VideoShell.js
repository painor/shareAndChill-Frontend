import React from "react";
import ReactPlayer from 'react-player'
import store from "../../redux/store";
import { connect } from "react-redux";
import ChatForm from "../../components/chat-form/ChatForm";

// Render a YouTube video player

class VideoShell extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

    }

    onPause() {
        store.dispatch({
            type: "CHANGED_STATE",
            playing: false
        })
    }

    onPlay() {
        store.dispatch({
            type: "CHANGED_STATE",
            playing: true
        })
    }

    render() {
        return (
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
            ><ReactPlayer controls={true} playing={this.props.isPlaying} onPause={this.props.onPause} onPlay={this.props.onPlay}
                          loop={true}
                          url={this.props.url}/>
                <ChatForm hasAttachment={false} hintText={"Change URL here"} buttonText={"Change"} chatType={"CHANGE_URL"}/>
            </div>)
    }
}

function mapStateToProps(state) {
    const {messageState} = state;
    console.log(messageState)
    return {
        isPlaying: messageState.isPlaying,
        url: messageState.url
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        onPlay: function() {
            dispatch({
                type: "SENT_STATE",
                playing: true
            })

        },
        onPause: function() {
            dispatch({
                type: "SENT_STATE",
                playing: false
            })

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoShell);
