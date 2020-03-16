// import THREE from 'three';
import ThreejsMap from './ThreejsMap';
// import gradient from 'color-gradient';
import throttle from 'lodash.throttle';
import extend from 'extend';
// import defaultIcon from '../../images/icon-map-3d.png';

/**
 * @desc 绘制数据模块
 */
const THREE = window.THREE;
class ThreejsMapOfImg extends ThreejsMap {
    constructor(props) {
        super(props);
        this.flyGroup = new THREE.Group();
        this.nodeGroup = new THREE.Group();
        this.index = 0;
    }

    /**
     * @desc 飞线动画
     */
    doAnimate = throttle(() => {
        if (this.flyGroup) {
            const lightLinelen = 10; // 光效线条长度
            const color1 = new THREE.Color('#00e2ff');
            const color2 = new THREE.Color('#003fab');
            this.flyGroup.children.forEach(d => {
                d.geometry.colors = d.geometry.colors.map((d, i) => {
                    const indexs = new Array(lightLinelen).fill(1).map((d, j) => j + i);
                    if (indexs.indexOf(this.index) !== -1) {
                        return color1;
                    } else {
                        return color2;
                    }
                });
                d.geometry.colorsNeedUpdate = true;
            });
            this.index++;
            if (this.index > this.lineCount + lightLinelen) {
                this.index = 0;
            }
        }
    }, 20);

    /**
     * @desc 控制器变化
     */
    controlChange () {
        // console.log(this.datas);
    }

    /**
     * @desc 绘制飞行线
     */
    drawFly (data) {
        this.lineCount = 30; // 线段数量
        data.forEach(d => {
            const { source, target } = d;
            const start = this.getVector3ByAreaName(source.name);
            const end = this.getVector3ByAreaName(target.name);
            const curve = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(start.x, start.y, start.z),
                new THREE.Vector3((start.x + end.x) / 2, (start.y + end.y) / 2, 8),
                new THREE.Vector3(end.x, end.y, end.z)
            );
            const points = curve.getPoints(this.lineCount);
            const geometry = new THREE.Geometry();
            // const colors = gradient('#00e2ff', '#00e2ff', points.length - 2, { has_heads: true, output: 'rgb' }).map(
            //     d => new THREE.Color(d)
            // );
            const colors = new Array(points.length).fill('#00e2ff');
            geometry.vertices = points;
            geometry.colors = colors;
            const material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });
            const line = new THREE.Line(geometry, material); // THREE.LinePieces 虚线
            this.flyGroup.add(line);
        });

        // console.log(this.flyGroup);

        this.scene.add(this.flyGroup);
    }

    /**
     * @desc 清空data
     */
    clearData () {
        for (let key in this.dataKey) {
            if (this.dataKey[key]) {
                delete this.dataKey[key].bindData;
            }
        }
        this.nodeGroup.children = [];
    }

    /**
     * @desc 获取绑定数据
     */
    getBindData (name) {
        return this.dataKey[name].bindData;
    }

    /**
     * @desc 绘制数据模块
     */
    drawData (data, option = {}) {
        this.option = extend(true, {},
            {
                light: {             // 光设置
                    color: '0xffffff',
                    position: {
                        x: 5,
                        y: 4,
                        z: 1
                    }
                }
            },
            { ...option }
        );
        const { light } = this.option;
        const datas = [];
        let max = 0;
        this.data.forEach(d => {
            let val = data.find(e => {
                let mark = e.name === d.data.properties.name;
                if (mark) {
                    this.dataKey[e.name].bindData = e;
                    e.position = { ...d.position };
                }
                return mark;
            });
            if (val) {
                if (val.value > max) {
                    max = val.value;
                }
                datas.push(val);
            }
        });
        if (max === 0) {
            max = 1;
        }

        var spotLight = new THREE.SpotLight('0xffffff');
        spotLight.position.set(light.position.x, light.position.y, light.position.z);
        this.scene.add(spotLight);

        datas.forEach(d => {
            const { x, y } = d.position;
            var geometry = new THREE.PlaneGeometry(0.01, 0.01, 1);
            var material = new THREE.MeshBasicMaterial({
                color: 0x0FAAEE
            });

            var point = new THREE.Mesh(geometry, material);
            point.position.set(x, y, 0);
            point.data = d;
            this.nodeGroup.add(point);
        });
        this.datas = datas;
        this.scene.add(this.nodeGroup);
    }
    destory () {
        super.destory();
        this.flyGroup = null;
        this.nodeGroup = null;
        this.index = null;
        this.dataKey = null;
    }
}

export default ThreejsMapOfImg;
