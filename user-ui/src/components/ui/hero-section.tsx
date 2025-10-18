"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Shape, ExtrudeGeometry, Group } from "three";

const createSharedGeometry = () => {
  const shape = new Shape();
  const angleStep = Math.PI * 0.5;
  const radius = 1;

  shape.absarc(2, 2, radius, angleStep * 0, angleStep * 1);
  shape.absarc(-2, 2, radius, angleStep * 1, angleStep * 2);
  shape.absarc(-2, -2, radius, angleStep * 2, angleStep * 3);
  shape.absarc(2, -2, radius, angleStep * 3, angleStep * 4);

  const extrudeSettings = {
    depth: 0.3,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 20,
    curveSegments: 20,
  };

  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();
  return geometry;
};

const AnimatedBoxes = () => {
  const groupRef = useRef<Group>(null!);

  const sharedGeometry = useMemo(() => createSharedGeometry(), []);

  const boxes = useMemo(
    () =>
      Array.from({ length: 50 }, (_, index) => ({
        position: [(index - 25) * 0.75, 0, 0] as [number, number, number],
        rotation: [(index - 10) * 0.1, Math.PI / 2, 0] as [
          number,
          number,
          number
        ],
        id: index,
      })),
    []
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <meshPhysicalMaterial
        attach="material"
        color="#232323"
        metalness={1}
        roughness={0.3}
        reflectivity={0.5}
        ior={1.5}
        emissive="#000000"
        emissiveIntensity={0}
        transparent={false}
        opacity={1.0}
        transmission={0.0}
        thickness={0.5}
        clearcoat={0.0}
        clearcoatRoughness={0.0}
        sheen={0}
        sheenRoughness={1.0}
        sheenColor="#ffffff"
        specularIntensity={1.0}
        specularColor="#ffffff"
        iridescence={1}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[100, 400]}
        flatShading={false}
        side={0}
        alphaTest={0}
        depthWrite={true}
        depthTest={true}
      />
      {boxes.map((box) => (
        <mesh
          key={box.id}
          geometry={sharedGeometry}
          position={box.position}
          rotation={box.rotation}
        >
          <meshPhysicalMaterial
            color="#232323"
            metalness={1}
            roughness={0.3}
            reflectivity={0.5}
            ior={1.5}
            emissive="#000000"
            emissiveIntensity={0}
            transparent={false}
            opacity={1.0}
            transmission={0.0}
            thickness={0.5}
            clearcoat={0.0}
            clearcoatRoughness={0.0}
            sheen={0}
            sheenRoughness={1.0}
            sheenColor="#ffffff"
            specularIntensity={1.0}
            specularColor="#ffffff"
            iridescence={1}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 400]}
            flatShading={false}
            side={0}
            alphaTest={0}
            depthWrite={true}
            depthTest={true}
          />
        </mesh>
      ))}
    </group>
  );
};

export const Scene = () => {
  const cameraPosition = useMemo<[number, number, number]>(
    () => [5, 5, 20],
    []
  );

  return (
    <div className="w-full h-full z-0">
      <Canvas
        camera={{ position: cameraPosition, fov: 40 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={15} />
        <directionalLight position={[10, 10, 5]} intensity={15} />
        <AnimatedBoxes />
      </Canvas>
    </div>
  );
};
