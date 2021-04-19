
// import styles from './map3DChart.scss';
import React, { Component, Fragment } from 'react';
import extend from 'extend';
import { ThreejsMapOfBar, ThreejsMapOfCylinder, ThreejsMapOfProgressBar, ThreejsMapOfProgressCylinder, ThreejsMapOfImg } from '../threejsMap/index';
import { is, fromJS } from 'immutable';
// import defaultIcon from '../../../images/icon-map-3d.png';
const styles = {};
export default class Map3DChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapLabel: null,
            toolTipData: {},
            hideTooltip: true
        };
        this.map = null;
        this.data = [];
        this.option = extend(
            true,
            {},
            {
                tooltip: {
                    show: true
                },
                map: {
                    debug: false, // 调试模式
                    amount: 0.2, // 地图厚度
                    data: [],   // 地图上绘制的形状数据
                    fov: 2,
                    animate: (props.option.fly || {}).show || false,   // 开启飞仙，就自动开启animate功能
                    center: [109.583426, 19.201753], // 传入经纬度，中心操作点。结合http://api.map.baidu.com/lbsapi/getpoint/index.html查询
                    // center: [103.819943, 35.266039],
                    light: {
                        // 光设置
                        color: 0xffffff,
                        intensity: 0.5
                    },
                    control: {
                        // 控制器设置
                        move: true,
                        scale: true,
                        rotate: true
                    },
                    lineStyle: {
                        color: '#457aff', // 线条样式
                        linewidth: 1
                    },
                    mapStyle: {
                        color: '#2049af', // 地图样式
                        opacity: 1
                    },
                    camera: {
                        // 相机位置
                        x: 40,
                        y: 0,
                        z: 100
                    }
                },   // 地图
                shape: {  // 区域数据形状
                    // bar(普通柱状图) progressBar(进度柱状图,顶部含透明层柱状图) cylinder(实体圆柱，圆锥) progressCylinder(进度椎体图,顶部含透明层的椎体) image(图片)
                    type: 'bar',
                    offset: [0, 0]
                },
                fly: {
                    show: false, // 飞线
                    data: []
                },
                label: {
                    color: '#FCFFB5', // 文字颜色
                    offset: [0, 0]    // 文字水平垂直偏移
                }, // 区域名称
                num: {
                    color: '#FAB329', // 文字颜色
                    offset: [0, 0] // 文字水平垂直偏移
                } // 区域数据
            },
            props.option
        );
        this.mapDom = React.createRef();
    }

    componentDidMount () {
        this.initMap();
        this.drawMap(this.option.map.data);
    }
    componentWillReceiveProps (nextProps) {
        if (!is(fromJS(nextProps.option.data), fromJS(this.props.option.data))) {
            this.drawMap(nextProps.option.map.data);
        }
    }

    initMap = () => {
        const { shape: { type }, map: { mapType } } = this.option;
        let threejsMapClass = null;
        let mapDefaultOption = mapType === 'china' ? { fov: 10, center: [108.372124, 34.296211], camera: { x: 200, y: 0, z: 300 } } : {};
        switch (type) {
            case 'bar': threejsMapClass = ThreejsMapOfBar; break; // 普通柱状图
            case 'progressBar': threejsMapClass = ThreejsMapOfProgressBar; break; // 进度柱状图（顶部含透明层柱状图）
            case 'cylinder': threejsMapClass = ThreejsMapOfCylinder; break; // 圆柱，圆锥
            case 'progressCylinder': threejsMapClass = ThreejsMapOfProgressCylinder; break; // 进度椎体图(顶部含透明层的椎体)
            case 'image': threejsMapClass = ThreejsMapOfImg; break;    // 图片
            default: threejsMapClass = ThreejsMapOfBar; break; // 默认图
        }
        this.map = new threejsMapClass({
            container: this.mapDom.current,
            mapData: require(`./${mapType || 'HN'}.json`),
            ...mapDefaultOption,
            ...this.option.map
        });
    }

    drawMap = (data) => {
        const { fly, tooltip } = this.option;
        this.data = data;
        // 绘制数据形状
        this.map.drawData(this.data, this.option.shape);
        if (fly.show) {
            // 绘制飞线
            this.map.drawFly(fly.data);
        }
        this.map.correctLabel();
        this.map.on('seek', data => {
            this.setState({ mapLabel: data });
        });
        if (tooltip.show) {
            this.map.on('hover', (e, mesh) => {
                let { offsetX, offsetY } = e;
                if (!mesh) {
                    this.setState({
                        hideTooltip: true
                    });
                    return;
                }
                if (mesh.bindData) {
                    this.setState({
                        toolTipData: {
                            x: offsetX,
                            y: offsetY,
                            data: mesh.bindData
                        },
                        hideTooltip: false
                    });
                }
                this.map.recoverMapColor();
                mesh && mesh.children.forEach(d => {
                    d.material.color = new window.THREE.Color('#3894f4');
                });
            });
        }
    }

    componentWillUnmount () {
        this.map && this.map.destory();
        this.map = null;
        this.option = null;
        this.data = null;
    }

    render () {
        const { mapLabel, hideTooltip, toolTipData } = this.state;
        const { map, label, num, shape, tooltip } = this.option;
        let style = this.props.style || {
            height: '100%',
            width: '100%'
        };
        return (
            <div className={styles.mapContent} style={style}>
                {
                    !hideTooltip && <div className={styles.map3DTooltip} style={{ transform: `translate(${toolTipData.x}px, ${toolTipData.y}px)`, display: hideTooltip ? 'none' : 'block' }}>
                        {
                            tooltip && tooltip.formatter ? tooltip.formatter(toolTipData, map.data.findIndex(item => item.name === toolTipData.data.name), map.data) : <div className={styles.text}>{toolTipData.data.name}：{toolTipData.data.value}</div>
                        }
                    </div>
                }

                <div className={styles.mapChart} ref={this.mapDom}>
                </div>
                {
                    mapLabel && mapLabel.map((d, i) => {
                        const { left, top } = d;
                        return (
                            <div
                                key={i.toString()}
                                style={{
                                    left: -d.data.properties.name.length * 6,
                                    transform: `translate(${left}px, ${top}px)`,
                                    ...label
                                }}
                                className={styles.label}
                            >
                                <span> {d.data.properties.name}</span>
                            </div>
                        );
                    })
                }
                {
                    this.data && this.data.map((d, i) => {
                        if (!d.coordinates) {
                            return null;
                        }
                        let scale = 0.5;
                        const { left, top } = d.coordinates;
                        let maxCount = Math.max.apply(Math, this.data.map(function (o) { return o.value; }));
                        let minCount = Math.min.apply(Math, this.data.map(function (o) { return o.value; }));

                        let labelNumTransform = `translate(${left - 20 + num.offset[0]}px, ${top - 40 + num.offset[1] - ((shape.type === 'image') ? shape.imageHeight : 0)}px)`;
                        if (shape.layOutBubbles) {
                            scale = 0.5 + (1 - 0.5) / (maxCount - minCount) * (d.value - minCount);
                            labelNumTransform = `translate(${left - 20 + num.offset[0]}px, ${top - 40 + num.offset[1] - (shape.imageHeight * scale)}px)`;
                        } else {
                            scale = d.value / 100;
                        }

                        return (
                            <Fragment key={i.toString()}>
                                <div
                                    style={{
                                        transform: labelNumTransform,
                                        ...num
                                    }}
                                    className={styles.labelNum}
                                >
                                    {d.value}
                                </div>
                                {
                                    shape.type === 'image' && <div
                                        style={{
                                            transform: `translate(${left - 20 + shape.offset[0]}px, ${top - 30 + shape.offset[1]}px) scale(${shape.layOutBubbles ? scale : scale < 0.5 ? 0.3 : scale})`
                                        }}
                                        className={styles.image}
                                    >
                                        {/* <img src={shape.url || defaultIcon} width={shape.imageWidth || 71} height={shape.imageHeight || 59} /> */}
                                    </div>
                                }

                            </Fragment>
                        );
                    })
                }
            </div >
        );
    }
}
