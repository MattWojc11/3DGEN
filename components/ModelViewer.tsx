"use client";
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
// @ts-expect-error Types for STLLoader can have resolution issues in Next.js strictly depending on configs.
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function ModelRenderer({ url, color }: { url: string, color: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    const loader = new STLLoader();
    // Load the geometry from object URL
    loader.load(url, (geo: THREE.BufferGeometry) => {
      setGeometry(geo);
    });
  }, [url]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

export default function ModelViewer({ fileUrl, color }: { fileUrl: string | null, color: string }) {
  if (!fileUrl) {
    return (
      <div className="flex items-center justify-center h-full w-full" style={{ padding: '2rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Podgląd 3D pojawi się tutaj po wgraniu modelu.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }}>
        <color attach="background" args={['#0d0f12']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
        <Stage intensity={0.5} environment="city" adjustCamera>
          <ModelRenderer url={fileUrl} color={color} />
        </Stage>
        <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
