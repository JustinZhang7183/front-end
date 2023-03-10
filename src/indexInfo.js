import React from 'react';
import AugmentWords from './augmentWords';

class IndexInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <div>Current Time: {this.state.date.toLocaleTimeString()}</div>
                <AugmentWords/>
            </div>
        );
    }
}
export default IndexInfo;