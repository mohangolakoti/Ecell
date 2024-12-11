import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002; // Rotate the globe slowly
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1.5, 0]}> {/* Adjust position to place it below the text */}
      {/* Display only the top 1/3rd of the globe */}
      <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI / 3]} />
      <meshStandardMaterial
        color="#ffffff"
        metalness={0.7}
        roughness={0.2}
        wireframe
      />
    </mesh>
  );
}
