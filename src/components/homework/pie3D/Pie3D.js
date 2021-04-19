/*
 * @Description: 
 * @Author: xuyao
 * @Date: 2019-12-10 18:16:58
 * @LastEditors: xuyao
 * @LastEditTime: 2019-12-24 16:56:23
 */
// import { requestAnimationFrame, cancelAnimationFrame, range, canvasStyle, randomNum } from './utils';
// const THREE = window.THREE;
export default class Pie3D {
    constructor(param) {
        this.el = param.el;
        this.data = param.data || [];
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;
        this.sceneScale = {x: 1, y: 1, z: 1};
        this.piColor = param.color ? param.color : ['#90ef7f', '#3c763d', '#31708f', '#66b3ff', '#7c82ff', '#a94442'];
        this.mouse = new THREE.Vector2();  
        this.raycaster = new THREE.Raycaster();
        this.amount = param.amount ? param.amount : 20;
        this.amountSelect = param.amountSelect ? param.amountSelect : 10;
        this.r = param.r ? param.r : 100;
        this.intersectsTemp = null;
        this.intersectsColorTemp = null;
        this.init();
    }
    init(){
        this.scene = this.drawScene();
        this.camera = this.drawCamera();
        this.drawPie();
        this.drawLight();
        this.renderer = this.drawRenderer();
        // this.stats = this.stats();
        // this.orbitControl = this.drawOrbitControl();
        // this.axisHelper();
        // this.animate();
        // document.addEventListener('mousedown', this.onDocumentMouseMove, false); 
        // this.bindEvent();
    }
    /**
     * 初始化场景
    */
    drawScene() {
        let scene = new THREE.Scene();
        scene.scale.set(this.sceneScale.x, this.sceneScale.y, this.sceneScale.z);
        return scene;
    }

    drawCamera() {
        let width = this.width;
        let height = this.height;
        let camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 10000);
        // let camera = new THREE.PerspectiveCamera( 70, width / height, 0.1, 10000 );
        camera.position.x = 300;
        camera.position.y = 300;
        camera.position.z = 300;
        camera.lookAt(this.scene.position);
        return camera;
    }
    /*
    * @desc 绘制光
    */
    drawLight(){
        let lightGroup = new THREE.Group();

        // 绘制环境光
        let ambient = new THREE.AmbientLight(0xffffff);
        ambient.position.set( 300, 300, 300 );
        lightGroup.add(ambient);

        let light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( 300, 200, 200 ).normalize();
        lightGroup.add( light );

        // let light = new THREE.PointLight( 0xffffff, 1 );
        // light.position.set( 400, 400, 400 ).normalize();
        // lightGroup.add( light );
        
        this.scene.add(lightGroup);
    }
    drawPie(){
        let piColor = this.piColor;
        let data = this.countRatio(this.data);
        let PI = Math.PI;
        let arcShapeGroup = new THREE.Group();
       
        data.map((ele, i) => {
            let amount = this.amount;
            let r = this.r;
            let { preAllRatio, ratio, selected = false} = ele;
            if(selected && ratio){
                amount = amount + this.amountSelect;
            }
            let arcShape = new THREE.Shape();
            arcShape.moveTo( 0, 0 );
            arcShape.absarc( 0, 0, r, preAllRatio * PI * 2,  PI * 2 * (ratio + preAllRatio), false );
            arcShape.lineTo( 0, 0 );
            let extrudeSettings = {curveSegments: 200, amount: amount, bevelEnabled: false};
            let geometry = new THREE.ExtrudeGeometry( arcShape, extrudeSettings );
            let material = new THREE.MeshPhongMaterial( {color: piColor[i]} );
            // let material = new THREE.MeshBasicMaterial( {color: piColor[i]} );
            let mesh = new THREE.Mesh( geometry, material );
            mesh.userData = {index: i, color: piColor[i]};
            mesh.rotation.x = Math.PI * 1.5;
            mesh.rotation.z = Math.PI * 0.3;
            arcShapeGroup.add(mesh);
        });
        this.scene.add(arcShapeGroup);
    }
    countRatio(data){
        let total = 0;
        total = data.reduce((total, item) => total + item.value, 0);
        let preAllRatio = 0;
        data.map((ele, i)=>{
            let { value } = ele;
            let ratio = total !== 0 ? value / total : 0;
            ele['ratio'] = ratio;
            ele['preAllRatio'] = preAllRatio;
            preAllRatio += ratio;
        });
        return data;
    }
    /**
        * 初始化renderer
    */
    drawRenderer() {// WebGLRenderer CanvasRenderer
        let width = this.width;
        let height = this.height;
        let renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        // renderer.setClearAlpha(0);
        renderer.setSize(width, height);
        this.el.innerHTML = '';
        this.el.appendChild(renderer.domElement);
        renderer.render(this.scene, this.camera);
        return renderer;
    }
    animate = () => {
        // this.renderer.render(this.scene, this.camera);
        this.animateId = requestAnimationFrame( this.animate );
        // this.stats.update();
    }
    onDocumentMouseMove = (e) => {
        e.preventDefault();
        // 将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
        this.mouse.x = ((e.clientX - this.el.getBoundingClientRect().left) / this.el.offsetWidth) * 2 - 1;
        this.mouse.y = -((e.clientY - this.el.getBoundingClientRect().top) / this.el.offsetHeight) * 2 + 1;
        this.renderPie();
    }
    renderPie(){
        // 射线和模型求交，选中一系列直线
        this.raycaster.setFromCamera(this.mouse, this.camera); // 注意此行代码与下一行代码的先后顺序
        var intersects = this.raycaster.intersectObjects(this.scene.children[0].children); 
        if ( intersects.length > 0 ) {
            if ( this.intersectsTemp !== intersects[0].object ) {
                if( this.intersectsTemp) {
                    // this.intersectsTemp.material.color =  this.intersectsSelectTemp;
                    this.intersectsTemp.geometry.parameters.options.amount =  this.intersectsSelectTemp;
                }
                this.intersectsTemp = intersects[0].object;
                // this.intersectsSelectTemp = this.intersectsTemp.material.color;
                // this.intersectsTemp.material.color = {r: 0.5647058823529412, g: 0.9372549019607843, b: 0.4980392156862745};
                this.intersectsSelectTemp = this.intersectsTemp.geometry.parameters.options.amount;
                this.intersectsTemp.geometry.parameters.options.amount = this.amount + 10;
                // let geometry = this.intersectsTemp.geometry;
                // geometry.elementsNeedUpdate = true;
                // geometry.verticesNeedUpdate = true;
                // geometry.uvsNeedUpdate = true;
                // geometry.normalsNeedUpdate = true;
                // geometry.colorsNeedUpdate = true;
                // geometry.lineDistancesNeedUpdate = true;
                // geometry.groupsNeedUpdate = true;
            }
        } else {
            if ( this.intersectsTemp ) {
                // this.intersectsTemp.material.color = this.intersectsSelectTemp;
                this.intersectsTemp.geometry.parameters.options.amount = this.intersectsSelectTemp;
            }
            this.intersectsTemp = null;
        }
        this.renderer.render(this.scene, this.camera);
    }
    drawOrbitControl() {
        // 盘旋控制
        let orbitControl = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        orbitControl.minDistrance = 0;
        orbitControl.maxDistrance = 0;
        orbitControl.enableZoom = true;
        orbitControl.enabled = true;
        orbitControl.maxPolarAngle = Math.PI / 2;
        return orbitControl;
    }
    stats(){
        let stats = new Stats();
        this.el.appendChild(stats.dom);
        return stats;
    }
    axisHelper(){
        let axes = new THREE.AxisHelper(500);
        this.scene.add(axes);
    }
    destroy(){
        // window.cancelAnimationFrame(this.animateId);
        this.el = null;
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        this.mouse = null;  
        this.raycaster = null;
        this.intersectsTemp = null;
        this.intersectsColorTemp = null;
        this.width = null;
        this.height = null;
        this.sceneScale = null;
        this.data = null;
        this.piColor = null;
    }
}