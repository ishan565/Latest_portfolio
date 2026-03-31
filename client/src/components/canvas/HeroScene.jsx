import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Mouse-reactive morphing blob ── */
function MorphBlob() {
  const mesh = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.15 + pointer.y * 0.3;
    mesh.current.rotation.y = t * 0.2 + pointer.x * 0.3;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, 2.2 + pointer.x * 1.5, 0.02);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, pointer.y * 0.8, 0.02);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} position={[2.2, 0, 0]} scale={1.6}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#7c3aed"
          speed={3}
          distort={0.45}
          roughness={0.15}
          metalness={0.95}
          transparent
          opacity={0.85}
          emissive="#4c1d95"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

/* ── Glass torus knot ── */
function GlassKnot() {
  const mesh = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * 0.3;
    mesh.current.rotation.y = t * 0.2;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, -2 + pointer.x * 0.3, 0.015);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, 1.5 + pointer.y * 0.2, 0.015);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.8}>
      <mesh ref={mesh} position={[-2, 1.5, -2]} scale={0.55}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshDistortMaterial
          color="#06b6d4"
          speed={2}
          distort={0.15}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
          emissive="#0e7490"
          emissiveIntensity={0.45}
        />
      </mesh>
    </Float>
  );
}

/* ── Floating octahedron gem ── */
function FloatingGem() {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = t * 0.4;
    mesh.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    mesh.current.position.y = -1.8 + Math.sin(t * 0.8) * 0.3;
  });

  return (
    <mesh ref={mesh} position={[1, -1.8, -1]} scale={0.6}>
      <octahedronGeometry args={[1, 0]} />
      <MeshDistortMaterial
        color="#f59e0b"
        speed={1.5}
        distort={0.2}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.8}
        emissive="#b45309"
        emissiveIntensity={0.55}
      />
    </mesh>
  );
}

/* ── Wireframe decorations ── */
function WireframeSphere({ position, scale, color, speed }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.08} />
      </mesh>
    </Float>
  );
}

/* ── Interactive particle swarm ── */
function ParticleSwarm() {
  const ref = useRef();
  const count = 600;
  const { pointer } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#7c3aed'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#f59e0b'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#a78bfa'),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 4;
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
    const t = state.clock.elapsedTime;
    const posArr = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = posArr[idx];
      const z = posArr[idx + 2];
      const angle = 0.001 + (i % 5) * 0.0003;
      posArr[idx] = x * Math.cos(angle) - z * Math.sin(angle);
      posArr[idx + 2] = x * Math.sin(angle) + z * Math.cos(angle);
      posArr[idx + 1] += Math.sin(t * 0.5 + i) * 0.001;
      posArr[idx] += (pointer.x * 3 - posArr[idx]) * 0.0004;
      posArr[idx + 1] += (pointer.y * 2 - posArr[idx + 1]) * 0.0004;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Scene composition ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[-5, -3, 3]} intensity={0.9} color="#06b6d4" />
      <pointLight position={[0, 5, -5]} intensity={0.4} color="#f59e0b" />
      <pointLight position={[3, -4, 2]} intensity={0.3} color="#ec4899" />
      <spotLight position={[0, 10, 0]} angle={0.4} penumbra={1} intensity={0.3} color="#7c3aed" />

      <MorphBlob />
      <GlassKnot />
      <FloatingGem />

      <WireframeSphere position={[-3.5, -1.5, 1]} scale={1} color="#7c3aed" speed={0.3} />
      <WireframeSphere position={[4.5, 2, -3]} scale={0.7} color="#06b6d4" speed={0.2} />
      <WireframeSphere position={[-1, 3, -2]} scale={0.5} color="#f59e0b" speed={0.4} />

      <ParticleSwarm />

      <Stars radius={60} depth={80} count={4000} factor={4} saturation={0.5} fade speed={0.8} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
}
