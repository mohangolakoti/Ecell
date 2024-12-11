import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RetroGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      // Move the grid downward along the y-axis
      gridRef.current.position.y = ((clock.getElapsedTime() * -0.5) % 2) - 1;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper
        args={[50, 50, "", "#fffff"]}
        position={[-2, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <gridHelper
        args={[50, 50, "#000", "#000"]}
        position={[0, 0, -2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
