import React, { PureComponent } from "react";

export default class CounterPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    componentDidMount() {
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.setState({ counter: this.state.counter + 1 });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <h2>Component counter: {this.state.counter}</h2>;
    }


}
