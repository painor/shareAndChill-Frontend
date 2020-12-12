import React from "react";
import ReactPlayer from 'react-player'
import store from "../../redux/store";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

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
            <div><ReactPlayer playing={this.props.isPlaying} onPause={this.props.onPause} onPlay={this.props.onPlay} loop={true}
                              url='https://www.youtube.com/watch?v=6Ow2XQVlSHk'/></div>)
    }
}

function mapStateToProps(state) {
    const {messageState} = state;
    console.log(messageState)
    return {isPlaying: messageState.isPlaying}
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
