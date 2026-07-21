'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import gsap from 'gsap';

/* =================================================================
   SplashScreen — 3D "KANASA" with face-by-face floating animation
   Uses custom vertex shader (no BAS dependency, works with Three.js r152)
   ================================================================= */
export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1400);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const loader = new FontLoader();
    loader.load('/helvetiker_bold.typeface.json', (font: any) => {
      const mesh = createTextMesh(font, 'KANASA');
      scene.add(mesh);

      const tween = gsap.fromTo(
        mesh,
        { progress: 0 },
        { progress: 1, duration: 4, ease: 'power1.inOut', repeat: -1, yoyo: true }
      );
      createScrubber(tween);
    });

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf: number;
    const tick = () => { renderer.render(scene, camera); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-[100]" />;
}

/* —— Create 3D text with per-face vertex animation —— */
function createTextMesh(font: any, text: string) {
  // Build geometry
  const geo = new TextGeometry(text, {
    size: 14,
    height: 0,
    font,
    bevelSize: 0.75,
    bevelThickness: 0.5,
    bevelEnabled: true,
  });
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const sz = {
    w: bb.max.x - bb.min.x,
    h: bb.max.y - bb.min.y,
    d: bb.max.z - bb.min.z,
  };
  geo.translate(-sz.w / 2, -sz.h / 2, -sz.d / 2);

  // Non-indexed so each triangle is independent
  const ngeo = geo.toNonIndexed();
  const pos = ngeo.attributes.position;
  const vertCount = pos.count;
  const faceCount = vertCount / 3;

  // Per-face animation data: delay + duration + control points
  const aDelay = new Float32Array(vertCount);
  const aDuration = new Float32Array(vertCount);
  const aCtrl = new Float32Array(vertCount * 3); // x,y,z control direction

  const tmp = new THREE.Vector3();
  for (let f = 0; f < faceCount; f++) {
    const vi = f * 9;
    const cx = (pos.array[vi] + pos.array[vi + 3] + pos.array[vi + 6]) / 3;
    const cy = (pos.array[vi + 1] + pos.array[vi + 4] + pos.array[vi + 7]) / 3;
    const cz = (pos.array[vi + 2] + pos.array[vi + 5] + pos.array[vi + 8]) / 3;

    const centroid = tmp.set(cx, cy, cz);
    const len = centroid.length();
    const delay = len * THREE.MathUtils.randFloat(0.03, 0.06);
    const duration = THREE.MathUtils.randFloat(2, 4);
    const dirX = cx > 0 ? 1 : -1;
    const dirY = cy > 0 ? 1 : -1;

    const c0x = THREE.MathUtils.randFloat(0, 30) * dirX;
    const c0y = THREE.MathUtils.randFloat(60, 120) * dirY;
    const c0z = THREE.MathUtils.randFloat(-20, 20);

    for (let v = 0; v < 3; v++) {
      const idx = f * 3 + v;
      aDelay[idx] = delay + Math.random();
      aDuration[idx] = duration;
      aCtrl[idx * 3] = c0x;
      aCtrl[idx * 3 + 1] = c0y;
      aCtrl[idx * 3 + 2] = c0z;
    }
  }

  ngeo.setAttribute('aDelay', new THREE.BufferAttribute(aDelay, 1));
  ngeo.setAttribute('aDuration', new THREE.BufferAttribute(aDuration, 1));
  ngeo.setAttribute('aControl', new THREE.BufferAttribute(aCtrl, 3));

  // Custom shader material
  const mat = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute float aDelay;
      attribute float aDuration;
      attribute vec3 aControl;
      uniform float uTime;

      void main() {
        vec3 pos = position;
        float t = clamp((uTime - aDelay) / aDuration, 0.0, 1.0);
        // ease-out cubic
        float ease = 1.0 - pow(1.0 - t, 3.0);
        pos *= (1.0 - ease);
        pos += aControl * ease;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
    `,
  });

  const mesh = new THREE.Mesh(ngeo, mat);
  mesh.frustumCulled = false;

  // Expose progress property for GSAP
  const totalDuration = sz.w * 0.02 + 5;
  Object.defineProperty(mesh, 'progress', {
    get() { return (this as any)._p || 0; },
    set(v: number) {
      (this as any)._p = v;
      mat.uniforms.uTime.value = totalDuration * v;
    },
  });

  return mesh;
}

/* —— Drag scrubber —— */
function createScrubber(tween: gsap.core.Tween) {
  let down = false;
  let cx = 0;

  document.body.style.cursor = 'pointer';

  const stop = () => gsap.to(tween, { timeScale: 0, duration: 2 });
  const resume = () => gsap.to(tween, { timeScale: 1, duration: 2 });
  const seek = (dx: number) => {
    tween.progress(THREE.MathUtils.clamp(tween.progress() + dx * 0.001, 0, 1));
  };

  const onDown = (e: MouseEvent | TouchEvent) => {
    down = true;
    document.body.style.cursor = 'ew-resize';
    cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    stop();
  };
  const onUp = () => { down = false; document.body.style.cursor = 'pointer'; resume(); };
  const onMove = (e: MouseEvent | TouchEvent) => {
    if (!down) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    seek(x - cx);
    cx = x;
  };

  window.addEventListener('mousedown', onDown);
  window.addEventListener('mouseup', onUp);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchstart', onDown as any, { passive: false });
  window.addEventListener('touchend', onUp);
  window.addEventListener('touchmove', onMove as any, { passive: false });

  return () => {
    window.removeEventListener('mousedown', onDown);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('touchstart', onDown as any);
    window.removeEventListener('touchend', onUp);
    window.removeEventListener('touchmove', onMove as any);
  };
}
