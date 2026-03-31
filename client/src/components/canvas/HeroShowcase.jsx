import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Glowing core sphere ── */
function CoreSphere() {
  const mesh = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.1 + pointer.y * 0.2;
    mesh.current.rotation.y = t * 0.15 + pointer.x * 0.2;
  });

  return (
    <mesh ref={mesh} scale={1.3}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#7c3aed"
        speed={2.5}
        distort={0.35}
        roughness={0.1}
        metalness={1}
        transparent
        opacity={0.9}
        emissive="#6d28d9"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

/* ── Orbit ring ── */
function OrbitRing({ radius, speed, tiltX, tiltZ, color, tubeRadius = 0.012 }) {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={mesh} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tubeRadius, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

/* ── Orbiting satellite ── */
function Satellite({ radius, speed, offset, tiltX, tiltZ, color, shape = 'box', size = 0.12 }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    const x = radius * Math.cos(t);
    const y = radius * Math.sin(t);
    // Apply the same tilt rotation
    mesh.current.position.set(
      x * Math.cos(tiltZ) - y * Math.sin(tiltZ) * Math.cos(tiltX),
      x * Math.sin(tiltZ) + y * Math.cos(tiltZ) * Math.cos(tiltX),
      y * Math.sin(tiltX)
    );
    mesh.current.rotation.x = t * 2;
    mesh.current.rotation.y = t * 3;
  });

  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={mesh} scale={size}>
        {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {shape === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
        {shape === 'dodecahedron' && <dodecahedronGeometry args={[0.8, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

/* ── Floating geometric accents (no font needed) ── */
function FloatingAccent({ position, color, shape = 'ring', size = 0.15 }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mesh.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.2;
    mesh.current.rotation.x = t * 0.5;
    mesh.current.rotation.z = t * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} position={position} scale={size}>
        {shape === 'ring' && <torusGeometry args={[1, 0.25, 12, 32]} />}
        {shape === 'cone' && <coneGeometry args={[0.7, 1.4, 4]} />}
        {shape === 'capsule' && <capsuleGeometry args={[0.4, 0.8, 4, 8]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

/* ── Particle halo around core ── */
function ParticleHalo() {
  const ref = useRef();
  const count = 200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#a78bfa'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#f59e0b'),
      new THREE.Color('#ec4899'),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.6 + Math.random() * 1.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Scene ── */
function ShowcaseScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#7c3aed" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[0, 3, -3]} intensity={0.4} color="#f59e0b" />

      <CoreSphere />

      {/* Three tilted orbit rings */}
      <OrbitRing radius={2} speed={0.3} tiltX={0.5} tiltZ={0} color="#7c3aed" />
      <OrbitRing radius={2.5} speed={-0.2} tiltX={1.2} tiltZ={0.8} color="#06b6d4" />
      <OrbitRing radius={3} speed={0.15} tiltX={0.3} tiltZ={-0.5} color="#f59e0b" tubeRadius={0.008} />

      {/* Orbiting satellites */}
      <Satellite radius={2} speed={0.5} offset={0} tiltX={0.5} tiltZ={0} color="#a78bfa" shape="octahedron" size={0.15} />
      <Satellite radius={2} speed={0.5} offset={Math.PI} tiltX={0.5} tiltZ={0} color="#c084fc" shape="box" size={0.1} />
      <Satellite radius={2.5} speed={-0.35} offset={0.5} tiltX={1.2} tiltZ={0.8} color="#22d3ee" shape="tetrahedron" size={0.13} />
      <Satellite radius={2.5} speed={-0.35} offset={Math.PI + 0.5} tiltX={1.2} tiltZ={0.8} color="#06b6d4" shape="dodecahedron" size={0.1} />
      <Satellite radius={3} speed={0.25} offset={1} tiltX={0.3} tiltZ={-0.5} color="#fbbf24" shape="octahedron" size={0.09} />

      {/* Floating geometric accents */}
      <FloatingAccent position={[-2.2, 1.8, 0.5]} color="#a78bfa" shape="ring" size={0.18} />
      <FloatingAccent position={[2.4, -1.5, 0.3]} color="#22d3ee" shape="cone" size={0.16} />
      <FloatingAccent position={[-1.8, -2, -0.5]} color="#fbbf24" shape="capsule" size={0.14} />
      <FloatingAccent position={[1.5, 2.2, -0.3]} color="#ec4899" shape="icosahedron" size={0.12} />

      <ParticleHalo />
    </>
  );
}

export default function HeroShowcase() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ShowcaseScene />
    </Canvas>
  );
}
