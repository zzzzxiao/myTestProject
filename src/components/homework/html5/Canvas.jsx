import React, { Component } from 'react';
export default class CanvasDemo extends Component {
    componentDidMount() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 150, 100);
    }
    render() {
        return <div>
            <canvas id="canvas"></canvas>
        </div>
    }
}