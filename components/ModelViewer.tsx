"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
// @ts-expect-error Types for STLLoader can have resolution issues in Next.js strictly depending on configs.
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function ModelRenderer({ url, color }: { url: string; color: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const baseRotation = new THREE.Euler(-1.2, 0.2, 0.8);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const targetX = baseRotation.x - (mouse.current.y * 0.4);
    const targetY = baseRotation.y + (mouse.current.x * 0.4);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);
  });

  useEffect(() => {
    const loader = new STLLoader();
    loader.load(url, (geo: THREE.BufferGeometry) => {
      geo.computeBoundingSphere();
      const radius = geo.boundingSphere?.radius || 1;
      const scaleFactor = 60 / radius;
      geo.center();
      geo.scale(scaleFactor, scaleFactor, scaleFactor);
      setGeometry(geo);
    });
  }, [url]);

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry} scale={[1, 1, 1]} rotation={[-1.2, 0.2, 0.8]}>
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

/**
 * ModelViewer — renders a Three.js Canvas strictly inside its parent container.
 *
 * USAGE: The PARENT element must have:
 *   - an explicit height (e.g. via .hero-model or .wycena-viewer-col CSS class)
 *   - position: relative
 *   - overflow: hidden
 *
 * This component then fills 100% of that space via position:absolute inset:0.
 * This is the correct pattern to prevent Three.js Canvas from overflowing on mobile.
 */
export default function ModelViewer({ fileUrl, color }: { fileUrl: string | null; color: string }) {
  if (!fileUrl) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%', width: '100%', padding: '2rem',
      }}>
        <p style={{ color: 'var(--text-muted)' }}>Podgląd 3D pojawi się tutaj po wgraniu modelu.</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'transparent',
      }}>
        <Canvas
          style={{ display: 'block', width: '100% !important', height: '100% !important' }}
          shadows={{ type: THREE.PCFShadowMap }}
          dpr={[1, 1.5]}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 150]} fov={50} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
          <Environment preset="city" />
          <ModelRenderer url={fileUrl} color={color} />
        </Canvas>
      </div>
    </div>
  );
}
