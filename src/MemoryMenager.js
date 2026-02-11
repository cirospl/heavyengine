export class MemoryManager {
    static clean(obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(m => this.disposeMaterial(m));
            } else {
                this.disposeMaterial(obj.material);
            }
        }
    }

    static disposeMaterial(m) {
        m.dispose();
        for (const key in m) {
            if (m[key] && m[key].isTexture) m[key].dispose();
        }
    }
}