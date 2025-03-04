import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelViewer = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath); // Load the GLTF model

  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <primitive object={gltf.scene} scale={1} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
