"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
// @ts-expect-error Types for STLLoader can have resolution issues in Next.js strictly depending on configs.
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function ModelRenderer({ url, color }: { url: string, color: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Bazowy obrót, z którym model wygląda "na płasko i skręcony" (Twoje referencje)
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
    
    // Zczytywanie kursora z całego okna
    const targetX = baseRotation.x - (mouse.current.y * 0.4);
    const targetY = baseRotation.y + (mouse.current.x * 0.4);
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 0.05);
  });

  useEffect(() => {
    const loader = new STLLoader();
    // Load the geometry from object URL
    loader.load(url, (geo: THREE.BufferGeometry) => {
      setGeometry(geo);
    });
  }, [url]);

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry} scale={[1.25, 1.25, 1.25]} rotation={[-1.2, 0.2, 0.8]}>
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
    <div style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'transparent' }}>
      <Canvas shadows={{ type: THREE.PCFShadowMap }} dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
        <Stage intensity={0.5} environment="city" adjustCamera={0.75}>
          <ModelRenderer url={fileUrl} color={color} />
        </Stage>
        <OrbitControls makeDefault enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
