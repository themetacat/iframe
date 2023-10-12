import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import ndarray from "ndarray";
// import ndarray from 'https://cdn.jsdelivr.net/npm/ndarray@1.0.19/+esm'
import ndarrayFill from "ndarray-fill";
import aoMesher from "ao-mesher";
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
// import { getModelInfo,setModelInfo,getBagsDetail} from "../../../../service";
// console.log(a,666666);
import Router, { useRouter } from "next/router";
// import avatarModel from './41.vox';
// console.log(avatarModel,6666);

import "babylonjs-materials";
import vox from "vox.js";



// export default function VoxFiled() {
// const router = useRouter();

//   // eslint-disable-next-line @next/next/no-sync-scripts
//   <>
//     {/* <script src="https://cdn.babylonjs.com/babylon.js"></script> */}
//     {/* <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script> */}
//     {/* <script src="https://cdn.babylonjs.com/materialsLibrary/babylonjs.materials.min.js"></script> */}
//     {/* <script src="https://cdn.jsdelivr.net/npm/vox.js@1.1.0/build/vox.min.js"></script> */}
//   </>;
//   const [editNum, setEditNum] = useState(null);
//   // const [editNumPoY, setEditNumPoY] = useState(null);
//   // const [editNumPoX, setEditNumPoX] = useState(null);
//   // const [editNumPoZ, setEditNumPoZ] = useState(null);
//   // const [editNumRoX, setEditNumRoX] = useState(null);
//   // const [editNumRoY, setEditNumRoY] = useState(null);
//   // const [editNumRoZ, setEditNumRoZ] = useState(null);
//   // const [editNumSaX, setEditNumSaX] = useState(null);
//   // const [editNumSaY, setEditNumSaY] = useState(null);
//   // const [editNumSaZ, setEditNumSaZ] = useState(null);
//   const [editNumPo, setEditNumPo] = useState({ x: 0, y: 0 ,z:0} as any);
//   // const [editNumPoZ, setEditNumPoZ] = useState(0);
//   const [editNumRoX, setEditNumRoX] = useState({ x: 0, y: 0 ,z:0} as any);
//   // const [editNumRoY, setEditNumRoY] = useState(0);
//   // const [editNumRoZ, setEditNumRoZ] = useState(0);
//   const [editNumSaX, setEditNumSaX] = useState({ x: 1, y: 1 ,z:1} as any);
//   const [getdroppedWearable, setGetdroppedWearable] = useState({});
//   const [voxMeshState, setVoxMeshState] = useState(null);
//   const [costume, setCostume] = useState({  
//     token_id: router.query.tokenID,
//     // "wallet": "0x60ea96f57b3a5715a90dae1440a78f8bb339c92e",
//     attachments: [],
//     skin: null,
//     name: "Bag-"+router.query.tokenID,});
//   // var voxMesh = null;
//   let windowVal = {};
//   var last_rotation = {};
//   let voxMesh;
//   let found = false;
//   let targetBone = null;
//   // 在页面加载时发送消息
//   const iframeRef = React.useRef(null);

//   // 定义发送消息的函数
//   const sendMessageToIframe = () => {
//     const iframe = iframeRef.current;
//     if (iframe) {
//       const message = 'Hello, iframe!';
//       iframe.contentWindow.postMessage(message, 'https://iframe-orcin.vercel.app');
//     }
//   };

//   // 使用useEffect来监听组件加载完成时发送消息
//   useEffect(() => {
//     sendMessageToIframe();
//   }, []); // 空数组表示只在组件加载时运行一次
//   // let attachmentId = null;
//  const all_last_rotation = React.useRef({});
//   let modelList = {};
//   // const uniqueId  = crypto.randomUUID();
//   const attachmentId = React.useRef(null);
//   const get_vox_data = (requestConfig, voxMesh) => {
//     var parser = new vox.Parser();
    
//     parser
//       .parse(
        
//         // "https://www.voxels.com"+requestConfig.url
//           // "https://wearable.vercel.app/"+requestConfig.url.hash+".vox"
//           "https://wearable.vercel.app/"+requestConfig.voxHash+".vox"
//       )
//       .then(function (parsed) {
//         // console.log(parsed, "有没有");

//         let size = parsed.size;

//         size.x += 2;
//         size.y += 2;
//         size.z += 2;

//         let field = ndarray(new Uint16Array(size.x * size.y * size.z), [
//           size.x,
//           size.y,
//           size.z,
//         ]);
//         ndarrayFill(field, (x, y, z) => 0);

//         parsed.voxels.forEach((row) => {
//           let { x, y, z, colorIndex } = row;
//           field.set(x, y, z, colorIndex + (1 << 15));
//         });

//         const vertData = aoMesher(field);

//         let face = 0;
//         let i = 0;
//         // 大小
//         let s = 0.01;

//         const hue = 0;
//         const positions = [];
//         const indices = [];
//         const normals = [];
//         const colors = [];

//         // Identity function, use these to nudge the mesh as needed
//         const fx = (x) => x;
//         const fy = (y) => y;
//         const fz = (z) => z;

//         while (i < vertData.length) {
//           const textureIndex = vertData[i + 7];

//           // const color = new BABYLON.Color3(1, 1, 0)
//           // var a = new BABYLON.Vector3(vertData[i + 0], vertData[i + 1], vertData[i + 2])

//           positions.push(fx(vertData[i + 0] * s));
//           positions.push(fy(vertData[i + 1] * s));
//           positions.push(fz(vertData[i + 2] * s));
//           i += 8;

//           // var b = new BABYLON.Vector3(vertData[i + 0], vertData[i + 1], vertData[i + 2])
//           positions.push(fx(vertData[i + 0] * s));
//           positions.push(fy(vertData[i + 1] * s));
//           positions.push(fz(vertData[i + 2] * s));
//           i += 8;

//           // var c = new BABYLON.Vector3(vertData[i + 0], vertData[i + 1], vertData[i + 2])
//           positions.push(fx(vertData[i + 0] * s));
//           positions.push(fy(vertData[i + 1] * s));
//           positions.push(fz(vertData[i + 2] * s));
//           i += 8;

//           // Face index
//           indices.push(face + 0, face + 2, face + 1);

//           const intensity = 0.5;
//           const offset = 0.4;
//           let color = new BABYLON.Color3(
//             parsed.palette[textureIndex].r / 255,
//             parsed.palette[textureIndex].g / 255,
//             parsed.palette[textureIndex].b / 255
//           );

//           colors.push(
//             color.r * ((vertData[i - 24 + 3] / 255) * intensity + offset)
//           );
//           colors.push(
//             color.g * ((vertData[i - 24 + 3] / 255) * intensity + offset)
//           );
//           colors.push(
//             color.b * ((vertData[i - 24 + 3] / 255) * intensity + offset)
//           );
//           colors.push(1);

//           colors.push(
//             color.r * ((vertData[i - 16 + 3] / 255) * intensity + offset)
//           );
//           colors.push(
//             color.g * ((vertData[i - 16 + 3] / 255) * intensity + offset)
//           );
//           colors.push(
//             color.b * ((vertData[i - 16 + 3] / 255) * intensity + offset)
//           );
//           colors.push(1);

//           colors.push(
//             color.r * ((vertData[i - 8 + 3] / 255) * intensity + offset)
//           );
//           colors.push(
//             color.g * ((vertData[i - 8 + 3] / 255) * intensity + offset)
//           );
//           colors.push(
//             color.b * ((vertData[i - 8 + 3] / 255) * intensity + offset)
//           );
//           colors.push(1);

//           face += 3;
//         }

//         requestConfig.positions = positions;
// // console.log(positions);

//         requestConfig.indices = indices;
//         requestConfig.colors = colors;
//         // return requestConfig
//         let {
//           positions: t,
//           indices: r,
//           colors: co,
//           colliderPositions: ca,
//           colliderIndices: cc,
//         } = requestConfig;
//         const vertexData = new BABYLON.VertexData();

//         vertexData.positions = t;
//         vertexData.indices = r;
//         vertexData.colors = co;
//         // console.log(t);
//         // console.log(r)
//         // console.log(co);
//         // BABYLON.VertexData.ComputeNormals(positions, indices, normals);
//         // vertexData.normals = normals;

//         vertexData.applyToMesh(voxMesh);
//         // voxMesh.position.y = 0.926;
//         // voxMesh.position.y = 1.509;

      


//         voxMesh.checkCollisions = false;
//         voxMesh.refreshBoundingInfo();
//         return voxMesh;
//       });
    
//       // (window as any).get_vox_data = get_vox_data;

//   };
//   let skeleton = null;
//   function num(value) {
//     // console.log(value,'value');
    
//     const t = parseFloat(value);
//     return t;
//     // return t.toString() === value.toString() ? t : null;
//   }
//   // let costume = {
//   //   token_id: router.query.tokenID,
//   //   // wallet: "0x60ea96f57b3a5715a90dae1440a78f8bb339c92e",
//   //   attachments: [],
//   //   skin: null,
//   //   name: "Costume-2",
//   //   // default_color: "#f3f3f3",
//   // };

//   // const updateAttachment = ()=>{

//   // }
//   // function updateAttachment() {
//   //   if (!voxMesh) {
//   //     console.log("no voxMesh");
//   //     return;
//   //   }
//   //   if (costume.attachments)
//   //     costume.attachments.forEach((t) => {
//   //       if (t.uuid == attachmentId) {
//   //         t.position = [
//   //           voxMesh.position.x.toFixed(2),
//   //           voxMesh.position.y.toFixed(2),
//   //           voxMesh.position.z.toFixed(2),
//   //         ];
//   //         t.rotation = [
//   //           voxMesh.rotation.x.toFixed(2),
//   //           voxMesh.rotation.y.toFixed(2),
//   //           voxMesh.rotation.z.toFixed(2),
//   //         ];
//   //         t.scaling = [
//   //           voxMesh.scaling.x.toFixed(2),
//   //           voxMesh.scaling.y.toFixed(2),
//   //           voxMesh.scaling.z.toFixed(2),
//   //         ];
//   //         return true;
//   //       }
//   //     });
//   // }

//   function updateAttachment() {
//     if (!voxMesh) {
//         console.log('no voxMesh');
//         return
//     }
    
    
//     if (costume.attachments)
//         costume.attachments.forEach((t => {
      
//             if (t.uuid == attachmentId.current) {
//                 t.position = [voxMesh.position.x.toFixed(2), voxMesh.position.y.toFixed(2), voxMesh.position.z.toFixed(2)]
//                 t.rotation = [parseFloat(voxMesh.rotation.x).toFixed(2), parseFloat(voxMesh.rotation.y).toFixed(2), parseFloat(voxMesh.rotation.z).toFixed(2)]

//                 // t.rotation = [voxMesh.rotation.x.toFixed(2), voxMesh.rotation.y.toFixed(2), voxMesh.rotation.z.toFixed(2)]
//                 t.scaling = [parseFloat(voxMesh.scaling.x).toFixed(2), parseFloat(voxMesh.scaling.y).toFixed(2), parseFloat(voxMesh.scaling.z).toFixed(2)]
//                 all_last_rotation.current[attachmentId.current] = t.rotation
// // console.log(costume);
// const metaCatAtk = window.localStorage.getItem("METACAT_atk");
// // console.log(metaCatAtk,22222);

//                 // console.log(setModelInfo(metaCatAtk,costume));
                
//                 setModelInfo(metaCatAtk,costume)
//                 return true
//             }
//         }
//         ));
// }

 

//   const updatePosition =(type, index, value) => {
   
//     voxMesh=voxMeshState;
    
//     if (!voxMesh) {
//       console.log("voxMesh is Null");
//       return;
//     }
//     if (type === "position") {
//       switch (index) {
//         case 0:
//           voxMesh.position.x = num(value);
//           break;
//         case 1:
//           voxMesh.position.y = num(value);
//           break;
//         case 2:
//           voxMesh.position.z = num(value);
//           break;
//       }
//     } else if (type === "rotation") {
//       switch (index) {
//         case 0:
//           voxMesh.rotation.x = num(value)
//           last_rotation['x'] = voxMesh.rotation.x
//           break
//       case 1:
//           voxMesh.rotation.y = num(value)
//           last_rotation['y'] = voxMesh.rotation.y
//           break
//       case 2:
//           voxMesh.rotation.z = num(value)
//           last_rotation['z'] = voxMesh.rotation.z
//           break
//       }
//     } else if (type === "scale") {
//       // switch (index) {
//       //   case 0:
//       //     voxMesh.scaling.x = num(value);
//       //     break;
//       //   case 1:
//       //     voxMesh.scaling.y = num(value);
//       //     break;
//       //   case 2:
//       //     voxMesh.scaling.z = num(value);
//       //     break;
//       // }
//       const scale_x = document.getElementById("scale[x]") as any;
//       const scale_y = document.getElementById("scale[y]")as any;
//       const scale_z = document.getElementById("scale[z]")as any;
//       // voxMesh.scaling.set(num(scale_x.value), num(scale_y.value), num(scale_z.value))
//       // console.log(voxMesh.scaling.x);
//       // return
      
//       voxMesh.scaling.x = num(scale_x.value)
//       voxMesh.scaling.y = num(scale_y.value)
//       voxMesh.scaling.z = num(scale_z.value)

//       voxMesh.rotationQuaternion = null;
//       const rotation_x = document.getElementById(
//         "rotation[x]"
//       ) as HTMLInputElement;
//       const rotation_y = document.getElementById(
//         "rotation[y]"
//       ) as HTMLInputElement;
//       const rotation_z = document.getElementById(
//         "rotation[z]"
//       ) as HTMLInputElement;
//       voxMesh.rotation.x = parseFloat(rotation_x.value);
//       voxMesh.rotation.y = parseFloat(rotation_y.value);
//       voxMesh.rotation.z = parseFloat(rotation_z.value);
//       // last_rotation['x'] = voxMesh.rotation.x
//       // last_rotation['y'] = voxMesh.rotation.y
//       // last_rotation['z'] = voxMesh.rotation.z
//       last_rotation[0] = voxMesh.rotation.x;
//       last_rotation[1] = voxMesh.rotation.y;
//       last_rotation[2] = voxMesh.rotation.z;
//     }

    
    
//     updateAttachment();
//   };

//   useEffect(()=>{
// // console.log(voxMeshState)
//   },[voxMeshState,editNum,voxMesh])

//   // function generateUUID(e, random, r) {
//   //   let lastNsecs = 0;
//   //   let lastTimestamp = 0;
//   //   let lastClockSequence = null;
//   //   let nodeIdentifier = null;

//   //   let index = (random && r) || 0;
//   //   const uuidArray = random || new Array(16);
//   //   e = e || {};

//   //   let node = e.node || nodeIdentifier;
//   //   let clockSeq = e.clockSeq !== undefined ? e.clockSeq : lastClockSequence;

//   //   if (node === null || clockSeq === null) {
//   //     const random = getRandomValues();
//   //     if (node === null) {
//   //       node = nodeIdentifier = [
//   //         random[0] | 1,
//   //         random[1],
//   //         random[2],
//   //         random[3],
//   //         random[4],
//   //         random[5],
//   //       ];
//   //     }
//   //     if (clockSeq === null) {
//   //       clockSeq = lastClockSequence = ((random[6] << 8) | random[7]) & 16383;
//   //     }
//   //   }

//   //   let timestamp = e.timestamp !== undefined ? e.timestamp : Date.now();
//   //   let nsecs = e.nsecs !== undefined ? e.nsecs : lastNsecs + 1;

//   //   const clockOffset =
//   //     (timestamp - lastTimestamp + (nsecs - lastNsecs)) / 10000;

//   //   if (clockOffset < 0 && e.clockSeq === undefined) {
//   //     clockSeq = (clockSeq + 1) & 16383;
//   //   }

//   //   if (
//   //     (clockOffset < 0 || timestamp > lastTimestamp) &&
//   //     e.nsecs === undefined
//   //   ) {
//   //     nsecs = 0;
//   //   }

//   //   if (nsecs >= 10000) {
//   //     throw new Error("generateUUID(): Can't create more than 10M uuids/sec");
//   //   }

//   //   lastTimestamp = timestamp;
//   //   lastNsecs = nsecs;
//   //   lastClockSequence = clockSeq;

//   //   timestamp += 122192928e5;
//   //   const timeLow = ((timestamp & 268435455) * 10000 + nsecs) % 4294967296;
//   //   uuidArray[index++] = (timeLow >>> 24) & 255;
//   //   uuidArray[index++] = (timeLow >>> 16) & 255;
//   //   uuidArray[index++] = (timeLow >>> 8) & 255;
//   //   uuidArray[index++] = timeLow & 255;

//   //   const timeMid = ((timestamp / 4294967296) * 10000) & 268435455;
//   //   uuidArray[index++] = (timeMid >>> 8) & 255;
//   //   uuidArray[index++] = timeMid & 255;
//   //   uuidArray[index++] = ((timeMid >>> 24) & 15) | 16;
//   //   uuidArray[index++] = (timeMid >>> 16) & 255;

//   //   uuidArray[index++] = (clockSeq >>> 8) | 128;
//   //   uuidArray[index++] = clockSeq & 255;

//   //   for (let i = 0; i < 6; ++i) {
//   //     uuidArray[index + i] = node[i];
//   //   }
//   //   return byteArrayToHexString(uuidArray);
//   // }
//   // const crypto = require('crypto');

  
//   // function getRandomValues() {
//   //   let getRandom;
//   //   const arr = new Uint8Array(16);
//   //   if (!getRandom) {
//   //     getRandom =
//   //       typeof crypto !== "undefined" &&
//   //       crypto.getRandomValues &&
//   //       crypto.getRandomValues.bind(crypto);
//   //       console.log(getRandom,5555)
//   //     if (!getRandom)
//   //       throw new Error(
//   //         "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
//   //       );
//   //   }
//   //   return getRandom(arr);
//   // }
//   let hexChars = [];
//   for (let i = 0; i < 256; ++i) {
//     hexChars.push((i + 256).toString(16).slice(1));
//   }

//   function byteArrayToHexString(byteArray, startIndex = 0) {
//     return (
//       hexChars[byteArray[startIndex + 0]] +
//       hexChars[byteArray[startIndex + 1]] +
//       hexChars[byteArray[startIndex + 2]] +
//       hexChars[byteArray[startIndex + 3]] +
//       "-" +
//       hexChars[byteArray[startIndex + 4]] +
//       hexChars[byteArray[startIndex + 5]] +
//       "-" +
//       hexChars[byteArray[startIndex + 6]] +
//       hexChars[byteArray[startIndex + 7]] +
//       "-" +
//       hexChars[byteArray[startIndex + 8]] +
//       hexChars[byteArray[startIndex + 9]] +
//       "-" +
//       hexChars[byteArray[startIndex + 10]] +
//       hexChars[byteArray[startIndex + 11]] +
//       hexChars[byteArray[startIndex + 12]] +
//       hexChars[byteArray[startIndex + 13]] +
//       hexChars[byteArray[startIndex + 14]] +
//       hexChars[byteArray[startIndex + 15]]
//     ).toLowerCase();
//   }

//   useEffect(() => {
//     const canvas = document.getElementById("renderCanvas");
//     // console.log(canvas);

//     const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
//     // console.log(engine, 222);
   
   
//     const chain_info = {
//       1: "eth",
//       137: "polygon",
//       80007: "mumbai",
//       0: "off-chain",
//     };

//     const onClick = (e) => {
      
//       if (!e) {
//         if (layer()) layer().removeAllMeshes();
//         if (gizmoManager) {
//           gizmoManager.attachToMesh(null);
//         }
//         update_voxMesh(null);
        
//       }
//     };

//     const createScene = function () {
//       const scene = new BABYLON.Scene(engine);

//       // Set the scene's clear color
//       scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);

//       // if (onClick) {
//       //   const lastPointerPosition = new BABYLON.Vector2();
//       //   let isDragging = false;

//       //   scene.onPointerObservable.add(
//       //     (eventData) => {
//       //       switch (eventData.type) {
//       //         case BABYLON.PointerEventTypes.POINTERDOWN:
//       //           isDragging = false;
//       //           lastPointerPosition.set(
//       //             eventData.event.clientX,
//       //             eventData.event.clientY
//       //           );
//       //           break;
//       //         case BABYLON.PointerEventTypes.POINTERUP:
//       //           if (isDragging || eventData.event.button !== 0) return;
//       //           // onClick(
//       //           //   eventData.pickInfo?.hit && eventData.pickInfo.pickedMesh
//       //           // );
               
                
//       //           if (eventData.pickInfo.pickedMesh) {
                  
//       //             if (voxMesh != eventData.pickInfo.pickedMesh) {
                  
//       //               // voxMesh = eventData.pickInfo.pickedMesh
//       //               update_voxMesh(eventData.pickInfo.pickedMesh);
//       //               focus();
//       //             }
//       //           }
//       //           break;
//       //         case BABYLON.PointerEventTypes.POINTERMOVE:
//       //           if (isDragging) break;
//       //           const distance = lastPointerPosition
//       //             .subtract(
//       //               new BABYLON.Vector2(
//       //                 eventData.event.clientX,
//       //                 eventData.event.clientY
//       //               )
//       //             )
//       //             .length();
//       //           if (distance > 8) isDragging = true;
//       //           break;
//       //       }
//       //     },
//       //     BABYLON.PointerEventTypes.POINTERDOWN +
//       //       BABYLON.PointerEventTypes.POINTERUP +
//       //       BABYLON.PointerEventTypes.POINTERMOVE
//       //   );
//       // }

//       // 创建 ArcRotateCamera 相机
//       const camera = new BABYLON.ArcRotateCamera(
//         "Camera",
//         -1.57,
//         1.4,
//         2.4,
//         new BABYLON.Vector3(0, 0.9, 0),
//         scene
//       );
//       camera.attachControl(canvas, true);
//       camera.lowerRadiusLimit = 0.5;
//       camera.upperRadiusLimit = 8;
//       camera.wheelPrecision = 30;
//       camera.panningInertia = 0;
//       camera.panningSensibility = 350;
//       camera.inertialRadiusOffset = 0;
//       camera.minZ = 0.003;

//       // 创建 Cylinder 形状的天空盒
//       const skybox = BABYLON.MeshBuilder.CreateCylinder(
//         "skybox",
//         {
//           height: 64,
//           diameterTop: 64,
//           diameterBottom: 64,
//           tessellation: 64,
//           subdivisions: 64,
//         },
//         scene
//       );
//       skybox.isPickable = false;

//       // const skyMaterial = new BABYLON.GradientMaterial("skybox/horizon", scene);
//       // skyMaterial.offset = 0;
//       // skyMaterial.scale = -0.01;
//       // skyMaterial.topColor.set(0.7, 0.7, 0.7);
//       // skyMaterial.bottomColor.set(1, 1, 1);
//       // skyMaterial.backFaceCulling = false;
//       // skyMaterial.disableLighting = true;
//       // skyMaterial.blockDirtyMechanism = true;
//       // skybox.material = skyMaterial;

//       // createLightRing(scene, camera)

//       // 设置高亮层
//       const highlightLayer = new BABYLON.HighlightLayer("selected", scene, {
//         isStroke: true,
//       });
//       highlightLayer.innerGlow = false;
//       highlightLayer.outerGlow = true;
//       const glowSize = 0.2;
//       highlightLayer.blurHorizontalSize = glowSize;
//       highlightLayer.blurVerticalSize = glowSize;

//       const light = new BABYLON.HemisphericLight(
//         "light",
//         new BABYLON.Vector3(0, 1, 0),
//         scene
//       );

//       // Default intensity is 1. Let's dim the light a small amount
//       light.intensity = 0.7;

//       const costumeMaterial = new BABYLON.StandardMaterial(
//         `material/costume`,
//         scene
//       );
//       costumeMaterial.diffuseColor.set(0.82, 0.81, 0.8);
//       costumeMaterial.emissiveColor.set(0.1, 0.1, 0.1);
//       costumeMaterial.specularPower = 1000;
//       costumeMaterial.blockDirtyMechanism = true;
//       let material = costumeMaterial;
//     //   console.log(material, "material3366666");

//       BABYLON.SceneLoader.ImportMesh(
//         null,
//         `https://www.voxels.com/models/`,
//         "avatar.glb",
//         scene,
//         (meshes, particleSystems, skeletons) => {
//           let costumeMesh, bodyMesh, skeletonRoot;
//           costumeMesh = meshes[0];
//           const costumeId = 1;
//           costumeMesh.id = `costume/${costumeId}`;
//           costumeMesh.visibility = 0;
//           costumeMesh.isPickable = false;

//           bodyMesh = meshes[1];
//           bodyMesh.material = costumeMaterial;
//           bodyMesh.isPickable = false;
//           // this.applySkin();
//           skeletonRoot = skeletons[0];
//           // window["skeleton"] = skeletonRoot;
//           skeleton = skeletonRoot;

//           const bones = skeletonRoot.bones.filter(
//             (bone) => !bone.name.match(/index/i)
//           );
//           const firstBone = bones[0];
//           const boneTransformNode = firstBone.getTransformNode();

//           if (boneTransformNode !== null) {
//             boneTransformNode.rotate(BABYLON.Axis.Y, Math.PI);
//           }

//           const boneMeshes = [];
//           bones.forEach((bone) => {
//             const boneSphere = BABYLON.MeshBuilder.CreateSphere(
//               "bonesphere",
//               {
//                 diameter: 0.1,
//               },
//               scene
//             );
//             boneMeshes.push(boneSphere);
//             boneSphere.id = "bonesphere";
//             boneSphere.attachToBone(bone, bodyMesh);
//             boneSphere.metadata = bone.name.replace(/^.+:/, "");
//             const boneMaterial = new BABYLON.StandardMaterial("target", scene);
//             boneMaterial.emissiveColor.set(1, 1, 1);
//             boneMaterial.disableLighting = true;
//             boneMaterial.alpha = 0.5;
//             boneMaterial.blockDirtyMechanism = true;
//             boneSphere.material = boneMaterial;
//             boneSphere.renderingGroupId = 2;
//             boneSphere.setEnabled(false);
//           });
//         }
//       );

//       return scene;
//     };
//     const scene = createScene();
//     // 坐标向量
//     const gizmoManager = get_GizmoManager();

//     // function createLightRing(scene, camera) {
//     //     const ringTransformNode = new BABYLON.TransformNode("ring", scene);
//     //     ringTransformNode.setParent(camera);
//     //     ringTransformNode.position.z = -5;

//     //     const redLight = new BABYLON.PointLight("redLight", new BABYLON.Vector3(0, 10, 0), scene);
//     //     redLight.diffuse.set(0.1, 0.1, 0.01);
//     //     redLight.specular.set = (1, 0.7647058823529411, 0.5411764705882353)
//     //     redLight.parent = ringTransformNode;

//     //     const greenLight = new BABYLON.PointLight("greenLight", new BABYLON.Vector3(1, -5, 0), scene);
//     //     greenLight.diffuse.set = (0.2784313725490196, 0.6352941176470588, 1);
//     //     greenLight.specular.set(0, 0, 0);
//     //     greenLight.intensity = 0.2;
//     //     greenLight.parent = ringTransformNode;

//     //     const blueLight = new BABYLON.PointLight("blueLight", new BABYLON.Vector3(-8.66, -1, 2), scene);
//     //     blueLight.diffuse.set = { b: 0.4235294117647059, g: 0.7058823529411765, r: 1 };
//     //     blueLight.specular.set(0, 0, 0);
//     //     blueLight.intensity = 0.2;
//     //     blueLight.parent = ringTransformNode;

//     //     const rotationAnimation = new BABYLON.Animation("lightRing", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
//     //     const rotationKeys = [
//     //         { frame: 0, value: 0 },
//     //         { frame: 300, value: 2 * Math.PI }
//     //     ];
//     //     rotationAnimation.setKeys(rotationKeys);
//     //     ringTransformNode.animations = [rotationAnimation];
//     //     scene.beginAnimation(ringTransformNode, 0, 300, true);
//     // }

//     function getWearableURL(droppedWearable) {
//       // ${chain_info[droppedWearable.chain_id]}
//       const hexValue = droppedWearable.voxHash;
//       // const decimalValue = parseInt(hexValue, 16);
//       // return `/c/v2/polygon/${
//       //   droppedWearable.collection_address
//       // }/${decimalValue}/vox`;
//       return `https://wearable.vercel.app/${hexValue}.vox`
//     }

//     // 模型高亮层
//     function layer() {
//       let e, t;
//       return (t =
//         (e = scene) === null || e === void 0
//           ? void 0
//           : e.getHighlightLayerByName("selected")) !== null && t !== void 0
//         ? t
//         : null;
//     }

//     const get_avatar = function () {
//       if (!scene) return null;
//       return scene.getMeshByName("avatar");
//     };
//     // get bones info
//     const bonespheres = function () {
//       let e, t;
//       return (t =
//         (e = scene) === null || e === void 0
//           ? void 0
//           : e.getMeshesById("bonesphere")) !== null && t !== void 0
//         ? t
//         : null;
//     };

//     // hide bones
//     const hideBoneSpheres = function () {
//     //   console.log(bonespheres());
//       let e;
//       (e = bonespheres()) === null || e === void 0
//         ? void 0
//         : e.forEach((e) => {
//             e.setEnabled(false);
//           });
//     };

//     function onDrop() {
//       hideBoneSpheres(); // 隐藏骨骼球体
//       // 异步添加可穿戴物品到装饰中
//     //   console.log(targetBone, 5656);

//       if (!targetBone) {
//         console.log("no Bone");
//         return;
//       }
//       // 获取被拖放的可穿戴物品
//       const droppedWearable = getDroppedWearable();
//     //   console.log(droppedWearable, 666);

//       if (!droppedWearable) {
//         console.warn("no wearable"); // 没有可穿戴物品，打印警告信息
//         return;
//       }

//       // // 判断是否能够将可穿戴物品添加到装饰中
//       // if (!canAdd(droppedWearable)) {
//       //     showSnackbar("Unable to add to costume", "Warning"); // 显示消息提示，无法添加到装饰中
//       //     return;
//       // }

//       addAttachment(droppedWearable, targetBone)
//         // .then(() => {
//         //   console.log("apply addAttachment");
//         // })
//         // .catch((error) => {
//         //   console.error("Error adding attachment:", error);
//         // });
//       const r = {
//         invertX: false,
//       };
//       renderVoxModel();
//     }

//      function addAttachment(wearable, bone) {
//       // if (!selectedCostume) {
//       //     showSnackbar("Can't attach wearable when no costume is selected", MessageType.Warning, 5000);
//       //     return;
//       // }
     
      
//       if(modelList[wearable.gateway]){
//         // found = true;
//         return
//       }
     
//     //  if(found){
//     //     return
//     // }
//       const defaultScale = 0.5;
//       const updatedCostume = Object.assign({}, costume);
//       // const uniqueId = generateUUID(null, null, null);
//       const uniqueId = crypto.randomUUID();;

//       const attachmentInfo = {
//         name: wearable.name,
//         token_id:wearable.token_id,
//           // typeof wearable.token_id === "number"
//           //   ? wearable.token_id
//           //   : parseInt(wearable.token_id, 10),
//         collection_address: wearable.collection_address || undefined,
//         // chain_id: wearable.chain_id,
//         // collection_id:
//         //   typeof wearable.collection_id === "number"
//         //     ? wearable.collection_id
//         //     : parseInt(wearable.collection_id, 10),
//         position: [0, 0, 0],
//         rotation: [0, 0, 0],
//         scaling: [defaultScale, defaultScale, defaultScale],
//         bone: bone,
//         voxHash:wearable.voxHash,
//         uuid: uniqueId,
//         gateway:wearable.gateway,
//       };

//       if (!updatedCostume.attachments) {
//         updatedCostume.attachments = [];
//       }
//       updatedCostume.attachments.push(attachmentInfo);
//       attachmentId.current = uniqueId;
//       const updatedCostumeD = { ...costume }; 
//       setCostume(updatedCostumeD)
//       // const expandAttachments = true;

//       // 调用api 更新Costume数据
//       // await updateCostume(updatedCostume);
//     }

//     function bone(e) {
      
//       if (!skeleton) return null;
//       const t = skeleton.getBoneIndexByName(`mixamorig:${e}`);
//       console.log(skeleton.bones[t]);

//       if (t == -1) {
//         console.error(`Bad bone name "${e}"`);
//         return null;
//       }
//       return skeleton.bones[t];
//     }

//     function createVoxShaderMaterial(config, lightDirection) {
//       let shaderMaterial = new BABYLON.ShaderMaterial(
//         "vox-model/vox-shader",
//         config,
//         {
//           vertex: "LegacyVox",
//           fragment: "LegacyVox",
//         },
//         {
//           attributes: ["position", "color"],
//           uniforms: [
//             "world",
//             "worldViewProjection",
//             "view",
//             "projection",
//             "brightness",
//             "cameraPosition",
//           ],
//           defines: ["#define IMAGEPROCESSINGPOSTPROCESS"],
//         }
//       );

//       shaderMaterial.setFloat("brightness", 1);
//       shaderMaterial.setVector3(
//         "vLight",
//         lightDirection || new BABYLON.Vector3(0.577, 0.577, -0.577).normalize()
//       );
//       shaderMaterial.setVector4(
//         "vFogInfos",
//         new BABYLON.Vector4(
//           config.fogMode,
//           config.fogStart,
//           config.fogEnd,
//           config.fogDensity
//         )
//       );
//       shaderMaterial.setColor3("vFogColor", config.fogColor);
//       shaderMaterial.blockDirtyMechanism = true;
//     }

//     function renderVoxModel() {
     
//       let droppedWearable = getDroppedWearable()

//       if(modelList[droppedWearable.gateway]){
//         // found = true;
//         return
//       }

//       const shaderMaterial = new BABYLON.StandardMaterial("wearable", scene);
//       shaderMaterial.emissiveColor.set(.3, .3, .3);
//       shaderMaterial.diffuseColor.set(1, 1, 1);
//       shaderMaterial.blockDirtyMechanism = true;

//      let wearable_url = getWearableURL(droppedWearable)

//       const requestConfig = {
//           renderJob: 1,
//           url: wearable_url,
//           token_id: droppedWearable.token_id,
//           voxHash:droppedWearable.voxHash
//       };

//       voxMesh = new BABYLON.Mesh("utils/vox-box", scene);
//       voxMesh.material = shaderMaterial;
//       voxMesh.isPickable = true;
//       voxMesh.checkCollisions = false;
//       voxMesh.gateway=droppedWearable.gateway
//       voxMesh.scaling.set(0.5, 0.5, 0.5);
//       const origin = new BABYLON.TransformNode("Node/wearable", scene);

//       voxMesh.setParent(origin);
//       origin.rotation.x = -Math.PI / 2;

//       const the_bone = bone(targetBone);
//       if (!the_bone) {
//           console.log('no Bone');
//           return
//       }
//       if (get_avatar()) {
//           origin.attachToBone(the_bone, get_avatar());
//           last_rotation = {}
//           if (droppedWearable?.position && droppedWearable?.rotation && droppedWearable?.scaling) {
//               updateAllPositionValue('load_model_json')
//           } else {
//               updateAllPositionValue(null)
//           }
//           focus()
//           modelList[droppedWearable.gateway]=true
//           // "https://www.voxels.com/c/v2/polygon/0x1e3D804415dCbb7ceA3478f176e123562e09b514/155/vox"
//           // 将模型绕 y 轴旋转 180 度，使其正上方朝向 y 轴
//           // get vox data
//          get_vox_data(requestConfig, voxMesh)
//       }

//       voxMesh.uuid = attachmentId.current
// setVoxMeshState(voxMesh)
//   }

//     // 获取 拖放的wearable
//     function getDroppedWearable() {
//       // let droppedWearableValue = window["droppedWearable"];
//       let droppedWearableValue = windowVal["droppedWearable"];
//       return droppedWearableValue !== null && droppedWearableValue !== undefined
//         ? droppedWearableValue
//         : null;
//     }

//     function getWearableGIFUrl(id, name) {
//       const res =
//         name === null || name === void 0
//           ? void 0
//           : name
//               .toLowerCase()
//               .replace(/[^a-z]+/g, "-")
//               .replace(/^-+/, "")
//               .replace(/-+$/, "");
//       return "https://wearables.crvox.com/" + id + "-" + res + ".gif";
//     }

//     function onWheel(e) {
//       e.preventDefault();
//     }

//     function onDragExit() {
//       hideBoneSpheres();
//     }

//     function onDragOver(e) {
//       let t;

//       // 初始化目标骨骼为空
//       // targetBone = null;

//       // 遍历所有的 bonespheres（骨骼球体）
//       const all_bonespheres = bonespheres();
//       if (all_bonespheres) {
//         for (let i = 0; i < all_bonespheres.length; i++) {
//           let bonesphere = all_bonespheres[i];
//           // 启用每个 bonesphere
//           bonesphere.setEnabled(true);

//           if (!bonesphere.material) {
//             // 如果没有材质，则发出警告并返回
//             console.warn("no material", bonesphere);
//             continue;
//           }

//           let bonesphereMaterial = bonesphere.material;
//           // 将每个 bonesphere 的材质发光颜色设置为白色
//           bonesphereMaterial.emissiveColor.set(1, 1, 1);
//         }
//       }

//       if (scene) {
//         // 使用场景的 pick 方法，检测是否拾取到 id 为 "bonesphere" 的物体
//         let pickResult = scene.pick(e.offsetX, e.offsetY, function (mesh) {
//           return mesh.id === "bonesphere";
//         });

//         if (
//           pickResult &&
//           pickResult.pickedMesh &&
//           pickResult.pickedMesh.material
//         ) {
//           var pickedMaterial  = pickResult.pickedMesh.material;
      
        
//           // 将拾取到的物体的材质发光颜色设置为指定颜色
//           // pickedMaterial.emissiveColor.set(0.3, 0, 1);
//  // 创建 EmissiveMaterial 材质
// let emissiveMaterial = new BABYLON.StandardMaterial("emissiveMaterial", scene);
// emissiveMaterial.emissiveColor = new BABYLON.Color3(0.3, 0, 1);

// // 将拾取到的物体应用 EmissiveMaterial 材质
// pickResult.pickedMesh.material = emissiveMaterial;
//           // 设置目标骨骼为拾取到的物体的元数据
//           targetBone = pickResult.pickedMesh.metadata;
//         } else {
//           targetBone = null;
//         }
//       }

//       // 阻止浏览器默认行为
//       e.preventDefault();
//       if (e.dataTransfer) {
//         // 设置拖拽的效果为复制
//         e.dataTransfer.dropEffect = "copy";
//       }
//     }

//     // 生成wearables列表
//     function renderWearables() {
//       const collectibles = []
//       // const collectibles = [
//       //   {
//       //     id: "4f8a99d2-89c2-4c18-ab87-b35d064021a4",
//       //     token_id: 37,
//       //     name: "CV Wearables: head - by MetaCat",
//       //     description: "",
//       //     collection_id: 353,
//       //     category: "facewear",
//       //     author: "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//       //     hash: "28614b00f9f807b8d71421d62d1612cab7501d20",
//       //     suppressed: false,
//       //     chain_id: 137,
//       //     collection_address: "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//       //     collection_name: "MetaCat",
//       //   },
//       //   {
//       //     id: "e1c82d5b-ffca-49fe-864e-b5dce843d120",
//       //     token_id: 41,
//       //     name: "CV Wearables: Knight Hat(red) - by MetaCat",
//       //     description: "",
//       //     collection_id: 353,
//       //     category: "facewear",
//       //     author: "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//       //     hash: "a35eeb4b70b976fbdf09f8d87302f10ea8dd4f5f",
//       //     suppressed: false,
//       //     chain_id: 137,
//       //     collection_address: "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//       //     collection_name: "MetaCat",
//       //   },
//       //   {
//       //     id: "910a5b27-374e-45cc-b68c-99baf909b8d4",
//       //     token_id: 48,
//       //     name: "CV Wearables: Chinese Traditional Cloak(black) - by MetaCat",
//       //     description: "",
//       //     collection_id: 353,
//       //     category: "facewear",
//       //     author: "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//       //     hash: "be258d360416db3ac56288f9af4d890bab4aa643",
//       //     suppressed: false,
//       //     chain_id: 137,
//       //     collection_address: "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//       //     collection_name: "MetaCat",
//       //   },
//       //   {
//       //     id: "910a5b51-374e-45cc-b68c-99baf909b8d4",
//       //     token_id: 102,
//       //     name: "CV Wearables: Chinese Traditional Cloak(black) - by MetaCat51",
//       //     description: "",
//       //     collection_id: 353,
//       //     category: "facewear",
//       //     author: "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//       //     hash: "be258d360416db3ac56288f9af4d890bab4aa643",
//       //     suppressed: false,
//       //     chain_id: 137,
//       //     collection_address: "0x527A5E544632A12b2bbcA8f3e0aEaF3De599e95c",
//       //     collection_name: "MetaCat",
//       //   },
//       // ];



// //       const tokenboundAccount = window.localStorage.getItem('tokenboundAccount')
// //         const detailHandleq = getBagsDetail(tokenboundAccount);
// //         // console.log(detailHandleq);
// //         detailHandleq.then((detailHandleItem)=>{
            
// // detailHandleItem.ownedNfts.forEach((item=>{
// //     if (Object.keys(item?.metadata).length === 0) {
// //         return;
// //       }
// // //  console.log(item.tokenUri.raw,3333123);1
// //  const typeData =item?.metadata?.image
// // // console.log(typeData);
// // const splitParts = typeData?.split("/");
// // const desiredValue =splitParts? splitParts[splitParts?.length - 1]:null;
// // const tokenUri = item.tokenUri.raw
// // // console.log(tokenUri);
// // // console.log(tokenUri.includes("https://peer.decentraland.org"),66666666666666);
// // const attributesData = item.metadata.attributes
// // ?.filter(itemNum => itemNum.trait_type === 'vox')
// // .map(itemNum => itemNum.value);

// // // console.log(attributesData[0]);
// // const regex = /\/w\/([a-f0-9]+)\/vox/;
// // const matches = regex.exec(attributesData[0]);
// // // console.log(matches[1])
// //  const newItem ={
// //     "token_id":item.id.tokenId,
// //     // "token_id":25,
// //     "name":item.metadata.name,
// //     "id":item.metadata.id,
// //     "description":item.description,
// //     "collection_address":item.contract.address,
// //     "hash":tokenUri.includes("https://www.cryptovoxels.com")?desiredValue:null,
// //     "image":item.metadata.image,
// //     "gateway":item.tokenUri.gateway,
// //     "voxHash":matches[1],
// //  }

// //  if (tokenUri.includes("https://www.cryptovoxels.com")) {
// //   collectibles.push(newItem)
// // } 

// // // console.log(collectibles,33);

// // // console.log(item.metadata.image,34444444444);
// //         // img.src=item.metadata.image
// //         // img.alt = tooltip;
// // // console.log(img.src,'-----------------');

// // }))

// // // console.log(collectibles,444444);


      
// //       const wearables = collectibles.map((wearable) => {
// //         // console.log(wearable,'----==========');
        
// //         const onDragStart = (event) => {
// //           const dataTransfer = event.dataTransfer;
// //           if (dataTransfer) {
// //             dataTransfer.setData("text/plain", "boop");
// //           }
// //           event.stopImmediatePropagation();
// //           if (event.target instanceof HTMLElement) {
// //             event.target.className = "dragging-wearable";
// //           }
// //           // console.log(window,6363636);
// //           // (window as any).droppedWearable = wearable;
// //           windowVal['droppedWearable']= wearable
// //           // window.droppedWearable = wearable;
// //         //   setGetdroppedWearable(wearable)
// //         };

// //         const onDragEnd = (event) => {
// //           if (event.target instanceof HTMLElement) {
// //             event.target.className = "draggable-wearable";
// //           }
// //         };

// //         let tooltip = `wearable #${wearable.id}`;
// //         if (wearable.name) {
// //           tooltip = wearable.name;
// //           if (wearable.description) {
// //             tooltip += `\n\n${wearable.description}`;
// //           }
// //         }

// //         const li = document.createElement("li");
// //         li.className = "draggable-wearable";
// //         li.draggable = true;
// //         li.title = tooltip;
// //         li.addEventListener("dragstart", onDragStart);
// //         li.addEventListener("dragend", onDragEnd);

// //         const img = document.createElement("img");
// //         img.width = 94;
// //         img.height = 94;
// //         img.src = wearable.image;
// //         // img.src = getWearableGIFUrl(wearable.token_id, wearable.name);
// //         // img.src = 'https://wearables.crvox.com/910a5b27-374e-45cc-b68c-99baf909b8d4-cv-wearables-chinese-traditional-cloak-black-by-metacat.gif'
// //         img.alt = tooltip;

// //         const div = document.createElement("div");
// //         div.textContent =
// //           wearable.chain_id === 0 ? "(Off-chain)" : wearable.name;
// //         li.appendChild(img);
// //         li.appendChild(div);
// //         return li;
// //       });

// //       // const fragment = document.createDocumentFragment();
// //       // const h3 = document.createElement("h3");
// //       // h3.textContent = `Wearables Wearables Wearables`;
// //       const div = document.getElementById("wearable_list");
// //       // div.className = "column-header";
// //       const ul = document.createElement("ul");
// //       ul.className = "wearables-list";
// //       wearables.forEach((li) => ul?.appendChild(li));
// //       // fragment.appendChild(h3);
// //       // div.appendChild(div);
// //       div?.appendChild(ul);

// //       // document.body.appendChild(fragment);
// //     })



//     }
//     renderWearables();

//     function get_GizmoManager() {
//       const gizmoManager = new BABYLON.GizmoManager(scene, 3.5);
//       gizmoManager.positionGizmoEnabled = true;
//       gizmoManager.rotationGizmoEnabled = true;
//       gizmoManager.scaleGizmoEnabled = false;

//       gizmoManager.usePointerToAttachGizmos = false;
//       gizmoManager.boundingBoxGizmoEnabled = true;
//       if (
//         !gizmoManager.gizmos.positionGizmo ||
//         !gizmoManager.gizmos.rotationGizmo
//       )
//         throw new Error("gizmos not found");
//       gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
//         () => updateAllPositionValue(null)
//       );
//       gizmoManager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
//         () => updateAllPositionValue(null)
//       );
//       gizmoManager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
//         () => updateAllPositionValue(null)
//       );

//       gizmoManager.gizmos.rotationGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
//         () => updateAllPositionValue(null)
//       );
//       gizmoManager.gizmos.rotationGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
//         () => updateAllPositionValue(null)
//       );
//       gizmoManager.gizmos.rotationGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
//         () => updateAllPositionValue(null)
//       );

//       gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh =
//         false;

//       if (gizmoManager.gizmos.boundingBoxGizmo) {
//         gizmoManager.gizmos.boundingBoxGizmo.scaleRatio = 0.8;
//         gizmoManager.gizmos.boundingBoxGizmo.scaleBoxSize = 0.03;
//         gizmoManager.gizmos.boundingBoxGizmo.rotationSphereSize = 0;
//         gizmoManager.gizmos.boundingBoxGizmo.onScaleBoxDragEndObservable.add(
//           () => updateAllPositionValue(null)
//         );
//       }

//       const position = document.getElementById("gizmo-position");
//       if (!position) throw new Error("positionGizmo not found");
//       position.addEventListener("click", () => {
//         gizmoManager.positionGizmoEnabled = true;
//         gizmoManager.rotationGizmoEnabled = false;
//         gizmoManager.boundingBoxGizmoEnabled = false;
//       });
//       const rotation = document.getElementById("gizmo-rotation");
//       if (!rotation) throw new Error("rotationGizmo not found");
//       rotation.addEventListener("click", () => {
//         gizmoManager.positionGizmoEnabled = false;
//         gizmoManager.rotationGizmoEnabled = true;
//         gizmoManager.boundingBoxGizmoEnabled = false;
//       });
//       const scale = document.getElementById("gizmo-scale");
//       if (!scale) throw new Error("scaleGizmo not found");
//       scale.addEventListener("click", () => {
//         if (voxMesh) {
//           last_rotation['x'] = voxMesh.rotation.x
//           last_rotation['y'] = voxMesh.rotation.y
//           last_rotation['z'] = voxMesh.rotation.z
//       }
//         gizmoManager.positionGizmoEnabled = false;
//         gizmoManager.rotationGizmoEnabled = false;
//         gizmoManager.boundingBoxGizmoEnabled = true;
//       });
//       gizmoManager.positionGizmoEnabled = true;
//       gizmoManager.rotationGizmoEnabled = false;
//       gizmoManager.boundingBoxGizmoEnabled = false;

//       return gizmoManager;
//     }

//     function focus() {
      
//       let lay = layer();
//       const col = new BABYLON.Color3(0.7, 0.3, 1);
//       if (lay && voxMesh) {
//         lay.removeAllMeshes();
//         lay.addMesh(voxMesh, col);
//       }
//       if (gizmoManager && voxMesh) gizmoManager.attachToMesh(voxMesh);
//     }

//     function dispose_mesh() {
//       if (voxMesh) {
//         voxMesh.dispose(); // 销毁模型及其资源
//         const droppedWearable=getDroppedWearable();
//         modelList[voxMesh.gateway]=false
//         deleteAttachment();
//         update_voxMesh(null);
//         updateAllPositionValue(null);
//         const metaCatAtk = window.localStorage.getItem("METACAT_atk");
//         setModelInfo(metaCatAtk, costume);
  
//       }
//     }

//     function num(value) {
//       const t = parseFloat(value);
//       return t.toString() === value.toString() ? t : null;
//     }

//     function update_voxMesh(value) {
      
//       voxMesh = value;
//       setVoxMeshState(value)
    
//       if (voxMesh) {
//         attachmentId.current = voxMesh.uuid;
        
//        let  the_rotation = all_last_rotation.current[attachmentId.current]
       
//         last_rotation['x'] = the_rotation[0]
//         last_rotation['y'] = the_rotation[1]
//         last_rotation['z'] = the_rotation[2]
//       } else {
//         attachmentId.current = null;
//       }

//       updateAllPositionValue(1);
   
      
//     }

//     // function updatePosition(type, index, value) {
//     //     if (!voxMesh) {
//     //         console.log('voxMesh is Null');
//     //         return
//     //     }
//     //     if (type === 'position') {
//     //         switch (index) {
//     //             case 0:
//     //                 voxMesh.position.x = num(value)
//     //                 break
//     //             case 1:
//     //                 voxMesh.position.y = num(value)
//     //                 break
//     //             case 2:
//     //                 voxMesh.position.z = num(value)
//     //                 break
//     //         }
//     //     } else if (type === 'rotation') {
//     //         switch (index) {
//     //             case 0:
//     //                 voxMesh.rotation.x = num(value)
//     //                 break
//     //             case 1:
//     //                 voxMesh.rotation.y = num(value)
//     //                 break
//     //             case 2:
//     //                 voxMesh.rotation.z = num(value)
//     //                 break
//     //         }
//     //     } else if (type === 'scale') {
//     //         switch (index) {
//     //             case 0:
//     //                 voxMesh.scaling.x = num(value)
//     //                 break
//     //             case 1:
//     //                 voxMesh.scaling.y = num(value)
//     //                 break
//     //             case 2:
//     //                 voxMesh.scaling.z = num(value)
//     //                 break
//     //         }
//     //     }
//     //     updateAttachment()
//     // }

//     // pass
//     function updateInputPositionValue(type, dir) {
//       if (!voxMesh) {
//         return;
//       }
//       if (type === "position") {
//         switch (dir) {
//           case 0:
//             const position_x = document.getElementById(
//               "position[x]"
//             ) as HTMLInputElement;
//             position_x.value = voxMesh.position.x.toFixed(2);
//             break;
//           case 1:
//             const position_y = document.getElementById(
//               "position[y]"
//             ) as HTMLInputElement;
//             position_y.value = voxMesh.position.y.toFixed(2);
//             break;
//           case 2:
//             const position_z = document.getElementById(
//               "position[z]"
//             ) as HTMLInputElement;
//             position_z.value = voxMesh.position.z.toFixed(2);
//             break;
//         }
//       } else if (type === "rotation") {
//         switch (dir) {
//           case 0:
//             const rotation_x = document.getElementById(
//               "rotation[x]"
//             ) as HTMLInputElement;
//             rotation_x.value = voxMesh.rotation.x.toFixed(2);
//             break;
//           case 1:
//             const rotation_y = document.getElementById(
//               "rotation[y]"
//             ) as HTMLInputElement;
//             rotation_y.value = voxMesh.rotation.y.toFixed(2);
//             break;
//           case 2:
//             const rotation_z = document.getElementById(
//               "rotation[z]"
//             ) as HTMLInputElement;
//             rotation_z.value = voxMesh.rotation.z.toFixed(2);
//             break;
//         }
//       } else if (type === "scale") {
//         switch (dir) {
//           case 0:
//             // const scale_x = document.getElementById("scale[x]");
//             // scale_x.value = voxMesh.scaling.x.toFixed(2);
//             const scale_x = document.getElementById(
//               "scale[x]"
//             ) as HTMLInputElement;
//             scale_x.value = voxMesh.scaling.x.toFixed(2);
//             break;
//           case 1:
//             const scale_y = document.getElementById(
//               "scale[y]"
//             ) as HTMLInputElement;
//             scale_y.value = voxMesh.scaling.y.toFixed(2);
//             break;
//           case 2:
//             const scale_z = document.getElementById(
//               "scale[z]"
//             ) as HTMLInputElement;
//             scale_z.value = voxMesh.scaling.z.toFixed(2);
//             break;
//         }
//       }
//     }
//     function updateAllPositionValue(type) {
//       const position_x = document.getElementById(
//         "position[x]"
//       ) as HTMLInputElement;
//       const position_y = document.getElementById(
//         "position[y]"
//       ) as HTMLInputElement;
//       const position_z = document.getElementById(
//         "position[z]"
//       ) as HTMLInputElement;

//       const rotation_x = document.getElementById(
//         "rotation[x]"
//       ) as HTMLInputElement;
//       const rotation_y = document.getElementById(
//         "rotation[y]"
//       ) as HTMLInputElement;
//       const rotation_z = document.getElementById(
//         "rotation[z]"
//       ) as HTMLInputElement;

//       const scale_x = document.getElementById("scale[x]") as HTMLInputElement;
//       const scale_y = document.getElementById("scale[y]") as HTMLInputElement;
//       const scale_z = document.getElementById("scale[z]") as HTMLInputElement;

//       if (!voxMesh) {
//         position_x.value = (0.0).toString();
//         position_y.value = (0.0).toString();
//         position_z.value = (0.0).toString();

//         rotation_x.value = (0.0).toString();
//         rotation_y.value = (0.0).toString();
//         rotation_z.value = (0.0).toString();

//         scale_x.value = (0.5).toString();
//         scale_y.value = (0.5).toString();
//         scale_z.value = (0.5).toString();
//         scale_z.value = 0.5.toString();
//       } else if (type === 'change_model_mesh') {

//           position_x.value = voxMesh.position.x.toFixed(2);
//           position_y.value = voxMesh.position.y.toFixed(2);
//           position_z.value = voxMesh.position.z.toFixed(2);

//           scale_x.value = voxMesh.scaling.x.toFixed(2);
//           scale_y.value = voxMesh.scaling.y.toFixed(2);
//           scale_z.value = voxMesh.scaling.z.toFixed(2);
//           voxMesh.rotationQuaternion = null;
//           // rotation_x.value = voxMesh.rotation.x = last_rotation['x'] 
//           // rotation_y.value = voxMesh.rotation.y = last_rotation['y']
//           // rotation_z.value = voxMesh.rotation.z = last_rotation['z']
//           rotation_x.value  = last_rotation[0];
//           rotation_y.value  = last_rotation[1];
//           rotation_z.value  = last_rotation[2];
  
//           voxMesh.rotation.x=parseFloat(last_rotation[0])
//           voxMesh.rotation.y=parseFloat(last_rotation[1])
//           voxMesh.rotation.z=parseFloat(last_rotation[2])
//       } else {
//         // const rot = e=>Math.round(e * 1e3 * 180 / Math.PI) / 1e3;
//         // const po_sc = e=>Math.round(e * 1e3) / 1e3;

//         // [position_x.value, position_y.value, position_z.value] = voxMesh.position.asArray().map(po_sc);
//         // [rotation_x.value, rotation_y.value, rotation_z.value] = voxMesh.position.asArray().map(po_sc);
//         // [scale_x.value, scale_y.value, scale_z.value] = voxMesh.position.asArray().map(po_sc);
//         // position_x.value = voxMesh.position.x.toFixed(2);
//         // position_y.value = voxMesh.position.y.toFixed(2);
//         // position_z.value = voxMesh.position.z.toFixed(2);
//         // setEditNumPoY(voxMesh.position.y.toFixed(2))
//         // setEditNumPoX(voxMesh.position.x.toFixed(2))
//         // setEditNumPoZ(voxMesh.position.z.toFixed(2))

//         // rotation_x.value = voxMesh.rotation.x.toFixed(2);
//         // rotation_y.value = voxMesh.rotation.y.toFixed(2);
//         // rotation_z.value = voxMesh.rotation.z.toFixed(2);

//         // setEditNumRoX(voxMesh.rotation.x.toFixed(2))
//         // setEditNumRoY(voxMesh.rotation.y.toFixed(2))
//         // setEditNumRoZ(voxMesh.rotation.z.toFixed(2))
//         // scale_x.value = voxMesh.scaling.x.toFixed(2);
//         // scale_y.value = voxMesh.scaling.y.toFixed(2);
//         // scale_z.value = voxMesh.scaling.z.toFixed(2);
//         // setEditNumSaX(voxMesh.scaling.x.toFixed(2))
//         // setEditNumSaY(voxMesh.scaling.y.toFixed(2))
//         // setEditNumSaZ(voxMesh.scaling.z.toFixed(2))
//         // if (!type) {
//         //   // 更新接口数据坐标
//         //   updateAttachment();
//         // }
//         if (type === 'load_model_json') {
//         let  the_wearable = getDroppedWearable()

//           voxMesh.position.x = parseFloat(the_wearable.position[0]);
//           voxMesh.position.y = parseFloat(the_wearable.position[1]);
//           voxMesh.position.z = parseFloat(the_wearable.position[2]);

//           voxMesh.rotation.x = parseFloat(the_wearable.rotation[0]);
//           voxMesh.rotation.y = parseFloat(the_wearable.rotation[1]);
//           voxMesh.rotation.z = parseFloat(the_wearable.rotation[2]);

//           voxMesh.scaling.x = parseFloat(the_wearable.scaling[0]);
//           voxMesh.scaling.y = parseFloat(the_wearable.scaling[1]);
//           voxMesh.scaling.z = parseFloat(the_wearable.scaling[2]);
//       }
//       position_x.value = voxMesh.position.x.toFixed(2);
//       position_y.value = voxMesh.position.y.toFixed(2);
//       position_z.value = voxMesh.position.z.toFixed(2);

//       scale_x.value = voxMesh.scaling.x.toFixed(2);
//       scale_y.value = voxMesh.scaling.y.toFixed(2);
//       scale_z.value = voxMesh.scaling.z.toFixed(2);
//       voxMesh.rotationQuaternion = null;

//       if ('x' as any  in last_rotation){
//           rotation_x.value  = voxMesh.rotation.x = parseFloat(last_rotation['x']).toFixed(2) ;
//       }else{
//           rotation_x.value = voxMesh.rotation.x.toFixed(2);
//       }

//       if ('y' as any  in last_rotation){
//           rotation_y.value = voxMesh.rotation.y = parseFloat(last_rotation['y']).toFixed(2);
//       }else{
//           rotation_y.value = voxMesh.rotation.y.toFixed(2);
//       }

//       if ('z' as any  in last_rotation){
//           rotation_z.value = voxMesh.rotation.z = parseFloat(last_rotation['z']).toFixed(2);
//       }else{
//           rotation_z.value = voxMesh.rotation.z.toFixed(2);
//       }

//       if (!gizmoManager.boundingBoxGizmoEnabled) {
//               last_rotation = {}
//           }

//       if (!type) {
//           updateAttachment()
//       }
//       }
//        setEditNumPo((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         x:voxMesh? voxMesh.position.x.toFixed(2):0,
//       }));
//       setEditNumPo((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         y:voxMesh? voxMesh.position.y.toFixed(2):0,
//       }));
//       setEditNumPo((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         z: voxMesh?voxMesh.position.z.toFixed(2):0,
//       }));
//       const refValueX = voxMesh?.rotation.x; // 示例字符串值
//          const refValueY = voxMesh?.rotation.y; // 示例字符串值
//          const refValueZ = voxMesh?.rotation.z; // 示例字符串值
//       const fixedValueX = parseFloat(refValueX).toFixed(2);
//       const fixedValueY = parseFloat(refValueY).toFixed(2);
//       const fixedValueZ = parseFloat(refValueZ).toFixed(2);
     
      
//          setEditNumRoX((prevEditNumPo) => ({
//            ...prevEditNumPo,
           
//            x:voxMesh? fixedValueX:0 ,
//            }));
//           setEditNumRoX((prevEditNumPo) => ({
//            ...prevEditNumPo,
//            y: voxMesh? fixedValueY:0,
//            }));
//           setEditNumRoX((prevEditNumPo) => ({
//            ...prevEditNumPo,
//            z: voxMesh? fixedValueZ:0,
//            }));

 
//         setEditNumSaX((prevEditNumPo) => ({
//            ...prevEditNumPo,
//            x: voxMesh?voxMesh.scaling.x.toFixed(2):0,
//           }));
//         setEditNumSaX((prevEditNumPo) => ({
//            ...prevEditNumPo,
//            y: voxMesh?voxMesh.scaling.y.toFixed(2):0,
//           }));
//         setEditNumSaX((prevEditNumPo) => ({
//            ...prevEditNumPo,
//            z:voxMesh? voxMesh.scaling.z.toFixed(2):0,
//           }));
//     }

//     function deleteAttachment() {
//       if (!voxMesh) {
//         console.log("no voxMesh");
//         return;
//       }

//       if (costume.attachments) var index = 0;
//       costume.attachments.forEach((t) => {
//         if (t.uuid == attachmentId.current) {
//           costume.attachments.splice(index, 1);
//           return;
//         }
//         index += 1;
//       });
//     }

//     // function downloadCostume() {
//     //   let file_name;
//     //   // const t = this.costume;
//     //   if (!costume) return;
//     //   const json_costume = JSON.stringify(costume, null, 2);
//     //   const element_dow = document.createElement("a");
//     //   element_dow.style.display = "hidden";
//     //   element_dow.href = window.URL.createObjectURL(
//     //     new Blob([json_costume], {
//     //       type: "application/json",
//     //     })
//     //   );
//     //   element_dow.download =
//     //     ((file_name = costume.name) !== null && file_name !== void 0
//     //       ? file_name
//     //       : costume.token_id) + ".json";
//     //   element_dow.click();
//     //   element_dow.remove();
//     // }

   

//     async function onLoadCostume() {
//       // console.log(router.query.tokenID);
// // console.log(getModelInfo(19));
//       const getModelInfoData = getModelInfo(router.query.tokenID)
      
//       getModelInfoData.then(async(getModelInfoItem)=>{
//         if (JSON.stringify(getModelInfoItem.data) === '{}') {
//           console.log('错误');
//         }else{
//         const data = getModelInfoItem.data;
//         // const data = await response.json();
//   // console.log(data,'data');
//   // if(getModelInfoItem.data){
    
//   // }
//         // 在这里使用从JSON文件中读取到的数据
//         const attachments = data.attachments;
  
//         for (let att of attachments) {
//           // (window as any).droppedWearable = att;
//           windowVal['droppedWearable']= att
//           // (window as any).droppedWearable.token_id = att.token_id
//           windowVal['droppedWearable'].token_id= att.token_id
//             targetBone = att.bone;
//             attachmentId.current = att.uuid
//             all_last_rotation.current[attachmentId.current] = att.rotation
//             costume.attachments.push(att)
//             renderVoxModel();
  
//         }
//         onClick(null)
//         }
//       })
     
//   }

  

//     // canvas增加监听事件
//     // canvas.addEventListener("wheel", onWheel);
//     // canvas.addEventListener("dragover", onDragOver);
//     // canvas.addEventListener("dragleave", onDragExit);
//     // canvas.addEventListener("drop", onDrop);
//     // canvas.classList.add("costumer");

//     // 获取按钮元素
//     // const deleteButton = document.getElementById("mesh_dispose");
//     // const download_json_file = document.getElementById("download");
//     // const up_load = document.getElementById('upload');
//     // up_load.addEventListener('click', onLoadCostume);

//     // 添加点击事件处理程序
//     // deleteButton.addEventListener("click", dispose_mesh);
//     // download_json_file.addEventListener("click", downloadCostume);

//     engine.runRenderLoop(function () {
//       scene.render();
//     });

//     window.addEventListener("resize", function () {
//       engine.resize();
//     });
//     onLoadCostume()

//   }, []);
 

//   const onChangeEdiumY =(event) => {
//     // setEditNumPoY(event.target.value);
//     setEditNumPo((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       y: event.target.value,
//     }));
//   };
//   const onChangeEdiumX = (event) => {
//     // setEditNumPoX(event.target.value);
//     setEditNumPo((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       x: event.target.value,
//     }));
//   };
//   const onChangeEdiumZ = (event) => {
//     // setEditNumPoZ(event.target.value);
//     setEditNumPo((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       z: event.target.value,
//     }));
//   };
//   const onChangeEdiumRoX = (event) => {
//     // setEditNumRoX(event.target.value);
//     setEditNumRoX((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       x: event.target.value,
//     }));
//   };
//   const onChangeEdiumRoY = (event) => {
   
//     setEditNumRoX((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       y: event.target.value,
//     }));
//   };
//   const onChangeEdiumRoZ = (event) => {
//     // setEditNumRoZ(event.target.value);
//     setEditNumRoX((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       z: event.target.value,
//     }));
//   };
//   const onChangeEdiumSaX = (event) => {
//     // setEditNumSaX(event.target.value);
//     setEditNumSaX((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       x: event.target.value,
//     }));
//   };
//   const onChangeEdiumSaY = (event) => {
//     // setEditNumSaY(event.target.value);
//     setEditNumSaX((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       y: event.target.value,
//     }));
//   };
//   const onChangeEdiumSaZ = (event) => {
//     // setEditNumSaZ(event.target.value);
//     setEditNumSaX((prevEditNumPo) => ({
//       ...prevEditNumPo,
//       z: event.target.value,
//     }));
//   };



//   return (
//     <>
//      <iframe
//       src="https://iframe-model-new.vercel.app/"
//       ref={iframeRef}
//     ></iframe>
//       <div
//         id="gizmos"
//         className="active"
//         style={{ position: "relative", }}
//       >
//         <canvas id="renderCanvas" className={style.canvas}></canvas>
//         <div style={{ position: "absolute", top: "10px" ,display:"none"}}>
//           <button className={style.btn} id="gizmo-position">Position</button>
//           <button className={style.btn} id="gizmo-rotation">Rotation</button>
//           <button className={style.btn} id="gizmo-scale">Scale</button>
//         </div>
//         <div style={{ position: "absolute", right: "10px", top: "10px" ,width:"30%",display:"none"}}>
//           <div className="editor-field position">
//             <label>Position</label>
//             <div className="fields">
//               <input
//                 id="position[x]"
//                 type="number"
//                 step="0.01"
//                 title="x"
//                 value={editNumPo.x}
//                 onInput={(event) => {
//                     const inputElement = event.target as HTMLInputElement;
//                   updatePosition("position", 0, inputElement.value);
//                 }}
//                 onChange={onChangeEdiumX}
//               />
//               <input
//                 id="position[y]"
//                 type="number"
//                 step="0.01"
//                 title="y"
//                 value={editNumPo.y}
//                 onChange={onChangeEdiumY}
//                 onInput={(event) => {
//                     const inputElement = event.target as HTMLInputElement;
//                   updatePosition("position", 1, inputElement.value);
//                 }}
               
//               />
            
//               <input
//                 id="position[z]"
//                 type="number"
//                 step="0.01"
//                 title="z"
//                 value={editNumPo.z}
//                 onInput={(event) => {
//                     const inputElement = event.target as HTMLInputElement;
//                   updatePosition("position", 2, inputElement.value);
//                 }}
//                 onChange={onChangeEdiumZ}
//               />
//             </div>
//           </div>
//           <div className="editor-field rotation">
//             <label>Rotation</label>
//             <div className="fields">
//               <input
//                 id="rotation[x]"
//                 type="number"
//                 step="2"
//                 title="x"
//                 value={editNumRoX.x}
//                 onInput={(event) => {
//                     const inputElement = event.target as HTMLInputElement;
//                   updatePosition("rotation", 0, inputElement.value);
//                 }}
//                 onChange={onChangeEdiumRoX}
//               />
//               <input
//                 id="rotation[y]"
//                 type="number"
//                 step="2"
//                 title="y"
//                 value={editNumRoX.y}
//                 onInput={(event) => {
//                     const inputElement = event.target as HTMLInputElement;
//                   updatePosition("rotation", 1, inputElement.value);
//                 }}
//                 onChange={onChangeEdiumRoY}
//               />
//               <input
//                 id="rotation[z]"
//                 type="number"
//                 step="2"
//                 title="z"
//                 value={editNumRoX.z}
//                 onInput={(event) => {
//                     const inputElement = event.target as HTMLInputElement;
//                   updatePosition("rotation", 2, inputElement.value);
//                 }}
//                 onChange={onChangeEdiumRoZ}
//               />
//             </div>
//           </div>
//           <div className="editor-field scale-all">
//             <label>Scale</label>
//             <div className="fields">
//               <input
//                 id="scale[x]"
//                 type="number"
//                 step="0.01"
//                 title="all"
//                 value={editNumSaX.x}
//                 onInput={(event) => {
                  
//                       const inputElement = event.target as HTMLInputElement;
//                   updatePosition("scale", 0, inputElement.value);
//                 }}
//                 onChange={onChangeEdiumSaX}
//               />
//               <input
//                 id="scale[y]"
//                 type="number"
//                 step="0.01"
//                 title="all"
//                 value={editNumSaX.y}
//                 onInput={(event) => {
//                     const inputElement = event.target as HTMLInputElement;
//                   updatePosition("scale", 1, inputElement.value);
//                 }}
//                 onChange={onChangeEdiumSaY}
//               />
//               <input
//                 id="scale[z]"
//                 type="number"
//                 step="0.01"
//                 title="all"
//                 value={editNumSaX.z}
//                 onInput={(event) => {
//                     const inputElement = event.target as HTMLInputElement;
//                   updatePosition("scale", 2, inputElement.value);
//                 }}
//                 onChange={onChangeEdiumSaZ}
//               />
//             </div>
//           </div>
//           <div>
//             <button className={style.buton} id="mesh_dispose">Remove</button>
//             <button className={style.buton} id="upload">Upload</button>
//           </div>
//           <div id="wearable_list"></div>
//         </div>
//       </div>
//     </>
//   );
// }