'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

/* Kecil, auto-loop, no interaction */
export default function TextAnimation3D({ text = 'KANASA' }: { text?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = 400, H = 120;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(8, W / H, 1, 10000);
    camera.position.set(0, 0, 500);
    const scene = new THREE.Scene();

    const loader = new FontLoader();
    loader.load('/helvetiker_bold.typeface.json', (font: any) => {
      const mesh = createTextMesh(font, text);
      scene.add(mesh);
      renderer.render(scene, camera);

      // play once when footer enters viewport
      let played = false;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          const start = performance.now();
          const dur = 3000;
          const raf = () => {
            const elapsed = performance.now() - start;
            const p = Math.min(1, elapsed / dur);
            (mesh as any).progress = p;
            renderer.render(scene, camera);
            if (p < 1) requestAnimationFrame(raf);
          };
          requestAnimationFrame(raf);
          obs.disconnect();
        }
      }, { threshold: 0.3 });
      obs.observe(mount);
    });

    return () => { renderer.dispose(); };
  }, [text]);

  return <div ref={mountRef} className="w-full max-w-[400px] h-[120px]" />;
}

function createTextMesh(font: any, text: string) {
  const geo = new TextGeometry(text, {
    size: 6,
    height: 0,
    font,
    bevelSize: 0.3,
    bevelThickness: 0.2,
    bevelEnabled: true,
  });
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  geo.translate(
    -(bb.max.x - bb.min.x) / 2,
    -(bb.max.y - bb.min.y) / 2,
    -(bb.max.z - bb.min.z) / 2,
  );

  const ngeo = geo.toNonIndexed();
  const pos = ngeo.attributes.position;
  const vertCount = pos.count;
  const faceCount = vertCount / 3;

  const aDelay = new Float32Array(vertCount);
  const aDuration = new Float32Array(vertCount);
  const aCtrl = new Float32Array(vertCount * 3);

  for (let f = 0; f < faceCount; f++) {
    const vi = f * 9;
    const cx = (pos.array[vi] + pos.array[vi + 3] + pos.array[vi + 6]) / 3;
    const cy = (pos.array[vi + 1] + pos.array[vi + 4] + pos.array[vi + 7]) / 3;
    const len = Math.hypot(cx, cy);
    const delay = len * THREE.MathUtils.randFloat(0.03, 0.06);
    const dur = THREE.MathUtils.randFloat(1.5, 3);
    const dirX = cx > 0 ? 1 : -1;
    const dirY = cy > 0 ? 1 : -1;
    const c0x = THREE.MathUtils.randFloat(0, 15) * dirX;
    const c0y = THREE.MathUtils.randFloat(30, 60) * dirY;

    for (let v = 0; v < 3; v++) {
      const idx = f * 3 + v;
      aDelay[idx] = delay + Math.random();
      aDuration[idx] = dur;
      aCtrl[idx * 3] = c0x;
      aCtrl[idx * 3 + 1] = c0y;
      aCtrl[idx * 3 + 2] = 0;
    }
  }

  ngeo.setAttribute('aDelay', new THREE.BufferAttribute(aDelay, 1));
  ngeo.setAttribute('aDuration', new THREE.BufferAttribute(aDuration, 1));
  ngeo.setAttribute('aControl', new THREE.BufferAttribute(aCtrl, 3));

  const mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute float aDelay;
      attribute float aDuration;
      attribute vec3 aControl;
      uniform float uTime;
      void main() {
        vec3 pos = position;
        float t = clamp((uTime - aDelay) / aDuration, 0.0, 1.0);
        float ease = 1.0 - pow(1.0 - t, 3.0);
        pos *= (1.0 - ease);
        pos += aControl * ease;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5); }
    `,
  });

  const mesh = new THREE.Mesh(ngeo, mat);
  mesh.frustumCulled = false;
  const totalDur = 5;

  Object.defineProperty(mesh, 'progress', {
    get() { return (this as any)._p || 0; },
    set(v: number) { (this as any)._p = v; mat.uniforms.uTime.value = totalDur * v; },
  });

  return mesh;
}
