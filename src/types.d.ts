declare module 'three-bas' {
  export const ShaderChunk: Record<string, string>;
  export class ModelBufferGeometry extends THREE.BufferGeometry {
    faceCount: number;
    createAttribute(name: string, size: number): THREE.BufferAttribute;
    constructor(geometry: THREE.BufferGeometry);
  }
  export class BasicAnimationMaterial extends THREE.ShaderMaterial {
    constructor(settings: any, params?: any);
  }
  export namespace Utils {
    function separateFaces(geometry: THREE.BufferGeometry): void;
    function computeCentroid(geometry: THREE.BufferGeometry, face: any): THREE.Vector3;
  }
}
