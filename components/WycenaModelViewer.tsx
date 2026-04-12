"use client";
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';
// @ts-expect-error Types for STLLoader can have resolution issues in Next.js depending on configs.
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function STLMesh({ url, color }: { url: string; color: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

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
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
    </mesh>
  );
}

/**
 * WycenaModelViewer — interactive orbit viewer for the /wycena page.
 * Uses Stage (auto camera fit) + OrbitControls (free interaction).
 * Renders position:absolute to fill nearest position:relative parent.
 */
export default function WycenaModelViewer({
  fileUrl,
  color,
}: {
  fileUrl: string | null;
  color: string;
}) {
  if (!fileUrl) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <p style={{ color: 'var(--text-muted)' }}>
          Podgląd 3D pojawi się tutaj po wgraniu modelu.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Fills the nearest position:relative parent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          cursor: 'grab',
        }}
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          // Stage handles camera fitting, so we leave camera to Stage defaults
          camera={{ fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Stage: auto-fits camera to scene, provides nice studio lighting */}
          <Stage
            intensity={0.6}
            environment="city"
            adjustCamera  // ← auto-fits camera to the bounding box of children
            shadows={false}
          >
            <STLMesh url={fileUrl} color={color} />
          </Stage>

          {/* OrbitControls: takes over after Stage sets the initial camera */}
          <OrbitControls
            makeDefault
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            dampingFactor={0.08}
            enableDamping={true}
            minDistance={20}
            maxDistance={600}
          />
        </Canvas>
      </div>

      {/* Control hints */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.25rem',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {['← → Obróć', '↕ Zoom', 'Shift+drag Przesuń'].map((hint) => (
          <span
            key={hint}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.55rem',
              letterSpacing: '0.08em',
              color: 'var(--text-dim)',
              background: 'rgba(10,10,10,0.7)',
              padding: '0.2rem 0.5rem',
            }}
          >
            {hint}
          </span>
        ))}
      </div>
    </>
  );
}
