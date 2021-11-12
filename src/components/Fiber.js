
import * as THREE from "three";
import React, { Suspense, useState } from "react";
import {  useLoader } from "@react-three/fiber";
import {
  Html,
  Preload,
  OrbitControls,

} from "@react-three/drei";
import { Popconfirm } from "antd";
import { ARCanvas } from "@react-three/xr";

import "../style.css";
import "antd/dist/antd.css";

const store = [
  // {
  //   name: "Mesa",
  //   color: "lightpink",
  //   position: [10, 0, -15],
  //   img:'',
  //   url: "/mesas2.jpg",
  //   link: 3,
  // },

  {
    name: "Terraza",
    color: "lightpink",
    position: [10, 0, -15],
    img: "/Photosphere1.jpg",
    url: "/2294472375_24a3b8ef46_o.jpg",
    link: 1,
  },
  {
    name: "Interior",
    color: "lightblue",
    position: [15, 0, 0],
    img: "/2294472375_24a3b8ef46_o.jpg",
    url: "/Photosphere1.jpg",
    link: 0,
  },
  // ...
];
function Fiber() {
  
  function Dome({ name, position, texture,img, onClick }) {
    console.log(texture);
    return (
      <group>
          <mesh>
            <sphereBufferGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
          </mesh>
          
          <mesh position={position}>
            <sphereGeometry args={[1.25, 32, 32]} />
            <meshBasicMaterial color="white" />
            
            <Html center>
              <Popconfirm
                title="Seguro quieres seguir este punto?"
                onConfirm={onClick}
                okText="Si"
                cancelText="No"
              >
                <a href="/#">{name}</a>
              </Popconfirm>
            </Html>
          </mesh>

      </group>
      
    );
  }

  function Portals() {
    const [which, set] = useState(0);
    const { img,link, ...props } = store[which];
        console.log(store[which]);

    const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
    // console.log(props)
    // console.log(img);

    return <Dome onClick={() => set(link)} {...props} texture={maps[which] } />;
  }
  return (
 
    <ARCanvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls
        enableZoom={false}
        enablePan={true}
        enableDamping
        dampingFactor={0.2}
        autoRotate={false}
        rotateSpeed={-0.5}
      />
      <Suspense fallback={null}>
        <Preload all />

        <Portals />
   
      </Suspense>
    </ARCanvas>
  );
}


export default Fiber
