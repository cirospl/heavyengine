import * as THREE from 'three';
import { AssetManager } from './AssetManager.js';

export class GameEngine {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.querySelector('#bg'), 
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.loader = new AssetManager();
        this.camera.position.z = 5;
        this._loop();
    }

    _loop() {
        requestAnimationFrame(() => this._loop());
        this.renderer.render(this.scene, this.camera);
    }
}