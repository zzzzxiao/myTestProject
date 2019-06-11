import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Topic extends Component {
    render() {
        const {match} = this.props;
        return <div>
             <h3>{match.url}</h3>
            Topic~~~
        </div>
    }
}