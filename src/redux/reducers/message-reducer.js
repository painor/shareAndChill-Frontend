import { w3cwebsocket as W3CWebSocket } from "websocket";
import { v4 as uuidv4 } from "uuid";
import store from "../store";

const initialState = {
    messages: [],
    isPlaying: false,
    url: 'https://www.youtube.com/watch?v=6Ow2XQVlSHk',
};

class NetworkClass {
    constructor() {
        this.connect();

        console.log("CREATED ME");
    }

    send(data) {
        this.client.send(data)
    }

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
            console.log("GOT MSG", received)
            switch (received.type) {
                case "state":
                    console.log("RECEVED STATE")
                    store.dispatch({
                        type: "CHANGED_STATE",
                        playing: received.state,
                    })
                    break;
                case "message":
                    received.data.key = uuidv4();
                    if (!received.data.isMyMessage) {
                        store.dispatch({
                            type: "RECEIVED_MESSAGE",
                            data: received.data
                        });
                    }
                    break;
                case "url":
                    store.dispatch({
                        type: "URL_CHANGED",
                        data: received.data,
                    });
                    break;
                default:
                    throw new Error("UNKNOWN ACTION RECIVED"+received)

            }

        };

    }
}

const network = new NetworkClass();
const messageReducer = function(state = initialState, action) {

    switch (action.type) {
        case "SENT_MESSAGE":
            network.send(JSON.stringify({type: "message", data: action.data}));
            return {...state, messages: [action.data, ...state.messages]};
        case "RECEIVED_MESSAGE":
            return {...state, messages: [...state.messages, action.data]};
        case "SENT_STATE":
            network.send(JSON.stringify({type: "state", state: action.playing}));
            break;
        case "CHANGED_STATE":
            return {...state, isPlaying: action.playing};
        case "CHANGE_URL":
            network.send(JSON.stringify({type: "url", data: action.data}));
            return {...state, url: action.data};
        case "URL_CHANGED":
            return {...state, url: action.data};
        default:
            return state;
    }

    return state;

}

export default messageReducer;
