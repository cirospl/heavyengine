import * as THREE from 'three';
import { AssetManager } from './AssetManager.js';

export class GameEngine {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 5;
        this.loader = new AssetManager();
        this._init();
        this._loop();
    }
    _init() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        this.scene.add(light, new THREE.AmbientLight(0x404040));
        this.cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({color: 0x00ff88}));
        this.scene.add(this.cube);
    }
    _loop() {
        requestAnimationFrame(() => this._loop());
        this.cube.rotation.x += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
}
