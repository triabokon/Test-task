import React from "react";
import Navigation from './Navigation'


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Navigation/>
                <h1>Hello!</h1>
            </div>
        );
    }
}
