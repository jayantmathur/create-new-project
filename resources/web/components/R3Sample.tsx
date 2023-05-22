import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { OrbitControls, Box, Html, Plane } from "@react-three/drei";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
const R3Sample = () => {
  const lightcolor = "cyan";
  return (
    <>
      {/* <VRButton /> */}
      {/* <ARButton /> */}
      <Canvas camera={{ position: [0, 0, 0] }}>
        <XR>
          <group position={[0, -0.5, -2]} rotation={[0, Math.PI, 0]}>
            <ambientLight intensity={0.024} />
            {/* <fog args={["blue", 10, 20]} /> */}
            <rectAreaLight
              position={[0, 1.1, 0]}
              color={lightcolor}
              width={1.92}
              height={1.08}
              intensity={0.5}
            />
            <Html transform occlude position={[0, 0.6, 0]}>
              <div
                style={{
                  width: 192 / 2.5,
                  height: 108 / 2.5,
                  border: `1px solid ${lightcolor}`,
                  boxShadow: `0 0 2px .5px ${lightcolor}`,
                }}
              >
                <iframe
                  src="https://psu.edu"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <iframe
                  src="https://psu.edu"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "blur(6px)",
                  }}
                />
              </div>
            </Html>
            <Plane scale={100} rotation={[-Math.PI / 2, 0, 0]}>
              <meshPhysicalMaterial />
            </Plane>
            <Perf />
            <OrbitControls target={[0, 0, -2]} />
          </group>
        </XR>
      </Canvas>
    </>
  );
};

export default R3Sample;
