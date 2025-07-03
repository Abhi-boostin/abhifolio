"use client";
import * as THREE from "three";
import { useRef, useReducer, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei";
import { CuboidCollider, BallCollider, Physics, RigidBody } from "@react-three/rapier";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { easing } from "maath";

const accents = ["#4060ff", "#20ffa0", "#ff4060", "#ffcc00"];
const shuffle = (accent = 0) => [
  { color: "#444", roughness: 0.1 },
  { color: "#444", roughness: 0.75 },
  { color: "#444", roughness: 0.75 },
  { color: "white", roughness: 0.1 },
  { color: "white", roughness: 0.75 },
  { color: "white", roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
];

function Connector({ position, children, vec, scale, accent, ...props }: any) {
  const api = useRef<any>();
  const pos = useMemo(() => position || [THREE.MathUtils.randFloatSpread(10), THREE.MathUtils.randFloatSpread(10), THREE.MathUtils.randFloatSpread(10)], []);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    const v = vec ?? new THREE.Vector3();
    api.current?.applyImpulse(v.copy(api.current.translation()).negate().multiplyScalar(0.2));
  });
  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
    </RigidBody>
  );
}

function Pointer({ vec }: { vec?: THREE.Vector3 }) {
  const ref = useRef<any>();
  useFrame(({ mouse, viewport }) => {
    const v = vec ?? new THREE.Vector3();
    ref.current?.setNextKinematicTranslation(v.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0));
  });
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

type ModelProps = {
  children?: React.ReactNode;
  color?: string;
  roughness?: number;
};

function Model({ children, color = "white", roughness = 0, ...props }: ModelProps) {
  const ref = useRef<any>();
  const { nodes, materials }: any = useGLTF("/model/c-transformed.glb");
  useFrame((state, delta) => {
    if (ref.current) {
      easing.dampC(ref.current.material.color, color, 0.2, delta);
    }
  });
  return (
    <mesh ref={ref} castShadow receiveShadow scale={7} geometry={nodes.connector.geometry}>
      <meshStandardMaterial 
        metalness={0.2} 
        roughness={roughness} 
        map={materials.base.map} 
      />
      {children}
    </mesh>
  );
}

useGLTF.preload("/model/c-transformed.glb");

export default function HomeSection() {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center border-b bg-white px-2 md:px-0">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center pt-12 pb-12 md:pt-24 md:pb-24">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-black mb-2 md:mb-4 text-center">
          LUSION
        </h1>
        <h2 className="text-lg md:text-2xl font-medium text-neutral-700 mb-6 md:mb-10 text-center max-w-2xl">
          We help brands create digital experiences that connect with their audience
        </h2>
        <div className="w-full flex justify-center">
          <div
            className="w-full max-w-[1100px] aspect-[2.3/1] h-[52vw] max-h-[350px] md:h-[28vw] md:max-h-[420px] rounded-2xl overflow-hidden bg-white shadow-xl border border-neutral-200 transition-all duration-300 flex items-center justify-center"
          >
            <Canvas onClick={click} shadows dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}>
              <color attach="background" args={["#141622"]} />
              <ambientLight intensity={0.4} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <Physics gravity={[0, 0, 0]}>
                <Pointer vec={new THREE.Vector3()} />
                {connectors.map((props, i) => <Connector key={i} {...props} />)}
                <Connector position={[10, 10, 5]}>
                  <Model>
                    <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={8} resolution={512} />
                  </Model>
                </Connector>
              </Physics>
              <EffectComposer enableNormalPass={false} multisampling={8}>
                <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
              </EffectComposer>
              <Environment resolution={256}>
                <group rotation={[-Math.PI / 3, 0, 1]}>
                  <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
                  <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                  <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
                  <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
                </group>
              </Environment>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
} 