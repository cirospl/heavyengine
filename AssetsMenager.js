import * as THREE from 'three';

export class AssetManager {
    constructor() {
        this.cacheName = 'heavy-engine-cache-v1';
    }

    async load(url, type = 'texture') {
        const cache = await caches.open(this.cacheName);
        const match = await cache.match(url);
        if (match) {
            const blob = await match.blob();
            return this._process(URL.createObjectURL(blob), type);
        }
        const res = await fetch(url);
        await cache.put(url, res.clone());
        const blob = await res.blob();
        return this._process(URL.createObjectURL(blob), type);
    }

    _process(url, type) {
        return new Promise((res) => {
            new THREE.TextureLoader().load(url, (t) => res(t));
        });
    }
    }
