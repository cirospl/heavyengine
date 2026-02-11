import * as THREE from 'three';

export class AssetManager {
    constructor() {
        this.cacheName = 'v1-highres-storage';
        this.loader = new THREE.TextureLoader();
    }

    async getAsset(url) {
        const cache = await caches.open(this.cacheName);
        const cachedResponse = await cache.match(url);

        if (cachedResponse) {
            const blob = await cachedResponse.blob();
            return this._loadTexture(URL.createObjectURL(blob));
        }

        const response = await fetch(url);
        await cache.put(url, response.clone());
        const blob = await response.blob();
        return this._loadTexture(URL.createObjectURL(blob));
    }

    _loadTexture(url) {
        return new Promise((resolve) => {
            this.loader.load(url, (t) => resolve(t));
        });
    }
}