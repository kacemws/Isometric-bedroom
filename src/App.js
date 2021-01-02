import { Canvas, useFrame, useThree } from "react-three-fiber";

import { OrbitControls, softShadows, Loader } from "@react-three/drei";
import { useSpring } from "react-spring";
//Styles
import "./Assets/Style/App.scss";
import { Suspense, useRef } from "react";
import Model from "./Components/Three/Scene";

softShadows();

const ZoomWithOrbital = () => {
  const orbitRef = useRef();
  const { gl, camera } = useThree();
  useSpring({
    from: {
      z: 800,
    },
    x: 20,
    y: 115,
    z: 300,
    // React Springs onFrame
    onFrame: ({ x, y, z }) => {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
    },
  });
  return (
    // Oribital controls via drei
    <OrbitControls
      ref={orbitRef}
      enableZoom={false}
      enablePan={false}
      maxPolarAngle={Math.PI / 2.3}
      minPolarAngle={Math.PI / 4}
      target={[0, 0, 0]}
      args={[camera, gl.domElement]}
    />
  );
};

function App() {
  return (
    <>
      <Canvas
        colorManagement
        shadowMap
        camera={{
          position: [20, 100, 200],
          fov: 60,
        }}
      >
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <ZoomWithOrbital />
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
