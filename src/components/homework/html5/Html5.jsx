import React, { Component } from 'react';
import './input.scss';
export default class TestHtml5 extends Component {
    state = {
        color: '#ffffff',
        date: '2019-11-12',
        datetime: '12:50:56',
        datetimeLocal: '2019-11-20T12:50:56',
        email: 'aaa@123.com',
        range: 26,
        search: 'search'
    }
    render() {
        const { color, date, datetime, datetimeLocal, email, range, search } = this.state;
        return <div className="input-wrapper">
            {/* type=color has bugs */}
            <form>
                <p>color: <label htmlFor="color"><input type="color" id="color" value={color} onChange={(e) => this._changeValue(e, 'color')} /> 选择颜色</label></p>
                <p>date: <input type="date" value={date} onChange={(e) => this._changeValue(e, 'date')} /></p>
                <p>datetime: <input type="datetime" value={datetime} onChange={(e) => this._changeValue(e, 'datetime')} /></p>
                <p>datetime-local: <input type="datetime-local" value={datetimeLocal} onChange={(e) => this._changeValue(e, 'datetimeLocal')} /></p>
                <p>email: <input type="email" onChange={(e) => this._changeValue(e, 'email')} /></p>
                <p>month: <input type="month" /></p>
                <p>number: <input type="number" /></p>
                <p>range: <input type="range" value={range} onChange={(e) => this._changeValue(e, 'range')} /></p>
                <p>search: <input type="search" value={search} onChange={(e) => this._changeValue(e, 'search')} /></p>
                <p>tel: <input type="tel" onChange={(e) => this._changeValue(e, 'tel')} /></p>
                <p>数字: <input type="text" pattern="\d+" /></p>
                <p>time: <input type="time" /></p>
                <p>week: <input type="week" /></p>
                <button type="submit">提交</button>
            </form>
            <div>
                <svg width="100" height="100">
                    <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />
                </svg>   //描边绿色，填充黄色的圆，半径40px
                <svg width="100" height="100">
                    <ellipse cx="50" cy="50" rx="20" ry="50" stroke="yellow" strokeWidth="4" fill="green" />
                </svg>
                <svg width="220" height="120"
                    // viewBox="0 0 340 120"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="exampleGradient">
                            <stop offset="10%" stopColor="gold" />
                            <stop offset="95%" stopColor="green" />
                        </radialGradient>
                        <radialGradient spreadMethod="reflect"
                            cx="50%"
                            cy="50%"
                            r="50%"
                            fx="25%"
                            fy="75%"
                            fr="10%"
                            id="flameGradient">
                            <stop offset="0%" stopColor="white" />
                            <stop offset="10%" stopColor="yellow" />
                            <stop offset="95%" stopColor="red" />
                        </radialGradient>
                    </defs>
                    <circle fill="url(#exampleGradient)" cx="20" cy="60" r="20" />
                    <circle fill="url(#flameGradient)" cx="120" cy="60" r="20" />
                    <rect x="180" y="5" width="90" height="90" fill="url(#flameGradient)" />
                </svg>
                {/* <canvas id="myCanvas" width="200" height="100"></canvas> //通过脚本(通常是JavaScript) 动态绘制图形 */}
                <svg version="1.1"
                    baseProfile="full"
                    width="300" height="200"
                    xmlns="http://www.w3.org/2000/svg">

                    <rect width="100%" height="100%" fill="red" />

                    <circle cx="50%" cy="50%" r="80" fill="green" />

                    <text x="150" y="125" font-size="60" textAnchor="middle" fill="white">SVG</text>
                    <line x1="10" x2="50" y1="110" y2="150" stroke="blue" fill="white" />
                    <polyline points="0 0,10 0, 10 10, 20 10, 20 20" stroke="white" fill="transparent" />
                    <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180" stroke="green" fill="transparent" strokeWidth="5" />

                </svg>
                <svg width="200" height="200">
                    <path d="M20 130 Q40 105 50 130 T90 130" fill="none" stroke="blue" strokeWidth="5" />
                </svg>
                <svg width="100px" height="100px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    {/* <path d="M10 10 H 90 V 90 H 10 L 10 10" /> */}
                    <path d="M10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black" />
                    <circle cx="10" cy="10" r="2" fill="red" />
                    <circle cx="90" cy="90" r="2" fill="red" />
                    <circle cx="90" cy="10" r="2" fill="red" />
                    <circle cx="10" cy="90" r="2" fill="red" />
                </svg>
                <svg width="190px" height="160px" version="1.1" xmlns="http://www.w3.org/2000/svg">

                    <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent" />
                    <path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent" />
                    <path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent" />
                    <path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent" />
                    <path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent" />
                    <path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent" />
                    <path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent" />
                    <path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent" />
                    <path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent" />

                </svg>
                <svg width="325px" height="325px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M80 80
                            A 45 45, 0, 0, 0, 125 125
                            L 125 80 Z" fill="green"/>
                    <path d="M230 80
                            A 45 45, 0, 1, 0, 275 125
                            L 275 80 Z" fill="red"/>
                    <path d="M80 230
                            A 45 45, 0, 0, 1, 125 275
                            L 125 230 Z" fill="purple"/>
                    <path d="M230 230
                            A 45 45, 0, 1, 1, 275 275
                            L 275 230 Z" fill="blue"/>
                    </svg>
                    <svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
                        <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
                        <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
                    </svg>
                    <svg width="160" height="280" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20"
                            stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>
                        
                        <polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20"
                            stroke-linecap="round" fill="none" stroke-linejoin="round"/>
                        
                        <polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20"
                            stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
                    </svg>
                    <svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stop-color="red"/>
                                <stop offset="50%" stop-color="black" stop-opacity="0"/>
                                <stop offset="100%" stop-color="blue"/>
                            </linearGradient>
                        </defs>
                        <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>
                </svg>
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <linearGradient id="Gradient1">
                    <stop offset="5%" stop-color="white"/>
                    <stop offset="95%" stop-color="blue"/>
                    </linearGradient>
                    <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stop-color="red"/>
                    <stop offset="95%" stop-color="orange"/>
                    </linearGradient>

                    <pattern id="Pattern" x="0" y="0" width=".2" height=".2">
                    {/* <pattern id="Pattern" x="0" y="0" width="1" height="1"> */}
                        <rect x="0" y="0" width="50" height="50" fill="skyblue"/>
                        <rect x="0" y="0" width="20" height="20" fill="url(#Gradient2)"/>
                        <circle cx="20" cy="20" r="20" fill="url(#Gradient1)" fill-opacity="0.5"/>
                    </pattern>
                </defs>
                <rect fill="url(#Pattern)" stroke="black" x="0" y="0" width="200" height="200"/>
                </svg>
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <path id="my_path" d="M 20,20 C 70,80 110,80 200,20" fill="none" />
                    <text>
                        <textPath xlinkHref="#my_path">This text follows a curve.</textPath>
                    </text>
                    
                </svg>
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <text x="20" y="20" font-size="20"  id="example" textAnchor="start">This is an example text.</text>
                    <text x="20" y="60" font-size="20" textAnchor="start">
                        <tref xlinkHref="#example" />
                    </text>
                    <text x="20" y="100" >
                        <tspan font-weight="bold" fill="red" rotate="45">This is bold and red</tspan>
                    </text>
                    <g fill="red" stroke="black">
                        <rect x="0" y="0" width="10" height="10" />
                        <rect x="20" y="0" width="10" height="10" />
                        <rect x="0" y="0" width="30" height="30" transform="translate(30,140) rotate(45) skewX(30) scale(0.5)" />
                    </g>
                    
                </svg>
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <g transform="scale(2)" fill="blue">
                        <rect width="50" height="50" />
                    </g>
                </svg>
                <svg version="1.1"
                    baseProfile="full"
                    width="200" 
                    height="200"
                    xmlns="http://www.w3.org/2000/svg">
                    <text x="50" y="100" font-size="60" textAnchor="start">SVG</text>
                </svg>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs>
                        <clipPath id="cut-off-bottom">
                        <rect x="0" y="0" width="200" height="100" />
                        </clipPath>
                    </defs>
                    <circle cx="100" cy="100" r="100" clip-path="url(#cut-off-bottom)" />
                </svg>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="Gradient">
                        <stop offset="0" stop-color="white" stop-opacity="0" />
                        <stop offset="1" stop-color="white" stop-opacity="1" />
                        </linearGradient>
                        <mask id="Mask">
                        <rect x="0" y="0" width="200" height="200" fill="url(#Gradient)"  />
                        </mask>
                    </defs>

                    <rect x="0" y="0" width="200" height="200" fill="green" />
                    <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />
                </svg>
                <svg  width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                    <rect x="0" y="0" width="200" height="200" fill="blue" />
                    <circle cx="100" cy="100" r="50" stroke="yellow" stroke-width="40" stroke-opacity=".5" fill="red" />
                </svg>
            </div>
        </div>
    }
    _changeValue(e, type) {
        const value = e.target.value;
        console.log(value)
        this.setState({ [type]: value })
    }
}