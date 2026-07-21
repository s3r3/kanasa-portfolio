'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as BAS from 'three-bas';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import gsap from 'gsap';

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ---- Scene setup ---- */
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1400);
    const scene = new THREE.Scene();

    /* ---- Font loader ---- */
    const loader = new FontLoader();
    loader.load('/helvetiker_bold.typeface.json', (font: any) => {
      const textAnim = createTextAnimation(font, 'KANASA');
      scene.add(textAnim);

      const tween = gsap.fromTo(
        textAnim,
        { animationProgress: 0 },
        { animationProgress: 1, duration: 4, ease: 'power1.inOut', repeat: -1, yoyo: true }
      );
      createScrubber(tween);
    });

    /* ---- Resize ---- */
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ---- RAF ---- */
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

/* ---------- Text Animation ---------- */
function createTextAnimation(font: any, text: string) {
  const geometry = new TextGeometry(text, {
    size: 14,
    height: 0,
    font,
    bevelSize: 0.75,
    bevelThickness: 0.5,
    bevelEnabled: true,
  });
  geometry.computeBoundingBox();
  const bb = geometry.boundingBox!;
  const size = { width: bb.max.x - bb.min.x, height: bb.max.y - bb.min.y, depth: bb.max.z - bb.min.z };
  geometry.translate(-size.width / 2, -size.height / 2, -size.depth / 2);
  (geometry as any).userData.size = size;

  BAS.Utils.separateFaces(geometry);
  const bufGeo = new BAS.ModelBufferGeometry(geometry);
  const faceCount = bufGeo.faceCount;

  const aAnim = bufGeo.createAttribute('aAnimation', 2);
  const aCtrl0 = bufGeo.createAttribute('aControl0', 3);
  const aCtrl1 = bufGeo.createAttribute('aControl1', 3);

  for (let i = 0; i < faceCount; i++) {
    const centroid = getCentroid(geometry, i);
    const dirX = centroid.x > 0 ? 1 : -1;
    const dirY = centroid.y > 0 ? 1 : -1;
    const delay = centroid.length() * THREE.MathUtils.randFloat(0.03, 0.06);
    const dur = THREE.MathUtils.randFloat(2, 4);

    for (let v = 0; v < 6; v += 2) {
      (aAnim.array as any)[i * 6 + v] = delay + Math.random();
      (aAnim.array as any)[i * 6 + v + 1] = dur;
    }

    const c0 = [
      THREE.MathUtils.randFloat(0, 30) * dirX,
      THREE.MathUtils.randFloat(60, 120) * dirY,
      THREE.MathUtils.randFloat(-20, 20),
    ];
    const c1 = [
      THREE.MathUtils.randFloat(30, 60) * dirX,
      THREE.MathUtils.randFloat(0, 60) * dirY,
      THREE.MathUtils.randFloat(-20, 20),
    ];
    for (let v = 0; v < 9; v += 3) {
      (aCtrl0.array as any)[i * 9 + v] = c0[0];
      (aCtrl0.array as any)[i * 9 + v + 1] = c0[1];
      (aCtrl0.array as any)[i * 9 + v + 2] = c0[2];
      (aCtrl1.array as any)[i * 9 + v] = c1[0];
      (aCtrl1.array as any)[i * 9 + v + 1] = c1[1];
      (aCtrl1.array as any)[i * 9 + v + 2] = c1[2];
    }
  }

  const mat = new BAS.BasicAnimationMaterial(
    {
      side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 } },
      shaderFunctions: [BAS.ShaderChunk.cubic_bezier],
      shaderParameters: [
        'uniform float uTime;',
        'attribute vec2 aAnimation;',
        'attribute vec3 aControl0;',
        'attribute vec3 aControl1;',
      ],
      shaderVertexInit: [
        'float tDelay = aAnimation.x;',
        'float tDuration = aAnimation.y;',
        'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
        'float tProgress = tTime / tDuration;',
      ],
      shaderTransformPosition: [
        'vec3 tPosition = transformed;',
        'tPosition *= 1.0 - tProgress;',
        'tPosition += cubicBezier(transformed, aControl0, aControl1, vec3(0.0), tProgress);',
        'transformed = tPosition;',
      ],
    },
    { diffuse: 0x000000 }
  );

  const mesh = new THREE.Mesh(bufGeo, mat);
  mesh.frustumCulled = false;
  (mesh as any).animationDuration = size.width * 0.02 + 5;

  Object.defineProperty(mesh, 'animationProgress', {
    get() { return (this as any)._p || 0; },
    set(v: number) {
      (this as any)._p = v;
      mat.uniforms.uTime.value = ((mesh as any).animationDuration) * v;
    },
  });

  return mesh;
}

/* Get face centroid from indexed geometry */
function getCentroid(geo: THREE.BufferGeometry, faceIdx: number): THREE.Vector3 {
  const idx = geo.index!;
  const pos = geo.attributes.position;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const i0 = idx.getX(faceIdx * 3);
  const i1 = idx.getX(faceIdx * 3 + 1);
  const i2 = idx.getX(faceIdx * 3 + 2);
  a.fromBufferAttribute(pos, i0);
  b.fromBufferAttribute(pos, i1);
  c.fromBufferAttribute(pos, i2);
  return new THREE.Vector3(
    (a.x + b.x + c.x) / 3,
    (a.y + b.y + c.y) / 3,
    (a.z + b.z + c.z) / 3,
  );
}

/* ---------- Drag Scrubber ---------- */
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
