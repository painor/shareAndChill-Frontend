import React from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import ChatShell from "./containers/shell/ChatShell";
import VideoShell from "./containers/shell/VideoShell";

class App extends React.Component {
    constructor(props) {

        super(props);

    }

    render() {
        return (
            <SplitterLayout primaryMinSize={30} secondaryMinSize={60} percentage={true}>
                <ChatShell roomId={"test room"}/>
                <VideoShell />
            </SplitterLayout>
        );
    }
}

export default App;
