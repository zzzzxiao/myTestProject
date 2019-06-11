import React, { Component } from 'react';
import { Circle } from 'myStateLessComponent';

export default class StateLessComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ComponentList = [
            <Circle />
        ];
        return (
            <ul>
                StateLessComponent
                {ComponentList.map((val, index) =>
                    <li key={index}>{val}</li>
                )};
            </ul>
        );
    }
}
