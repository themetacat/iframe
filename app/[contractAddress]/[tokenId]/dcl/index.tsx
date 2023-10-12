import React, { useState, useEffect, useCallback } from "react";
import style from "./index.module.css";
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import "babylonjs-materials";
import axios from "axios";



// export default function DclContent() {
//     const router = useRouter();
  
//     const [voxMeshState, setVoxMeshState] = useState(null);
//     const [editNum, setEditNum] = useState(null);
//     const [costumeData,setcostumeData] = useState(null)
//     // const [    skeleton,setskeleton] = useState(null)
//     const skeleton =  React.useRef(null)
    
//     const [costume, setCostume] = useState({  
//       token_id: router.query.tokenID,
//       // "wallet": "0x60ea96f57b3a5715a90dae1440a78f8bb339c92e",
//       attachments: [],
//       skin: null,
//       name: "Bag",});
//     const [detailHandleData, setDetailHandleData] = useState(null);
//     // const [editNumPoY, setEditNumPoY] = useState(0);
//     // const [editNumPoX, setEditNumPoX] = useState(0);
//     const [editNumPo, setEditNumPo] = useState({ x: 0, y: 0 ,z:0} as any);
//     // const [editNumPoZ, setEditNumPoZ] = useState(0);
//     const [editNumRoX, setEditNumRoX] = useState({ x: 0, y: 0 ,z:0} as any);
//     // const [editNumRoY, setEditNumRoY] = useState(0);
//     // const [editNumRoZ, setEditNumRoZ] = useState(0);
//     const [editNumSaX, setEditNumSaX] = useState({ x: 100, y: 100 ,z:100} as any);
//     // const [editNumSaY, setEditNumSaY] = useState(100);
//     // const [editNumSaZ, setEditNumSaZ] = useState(100);
    
//     // // 调用方法并处理返回的内容
//     // const url = 'https://peer.decentraland.org/content/contents/bafybeid7vvyfrlgrqfzao5awnpijlpagoirvsgfbwmhm7q2gylrnuczedu';
//     // getContent(url)
//     //   .then(content => {
//     //     console.log('Content:', content);
//     //     // 在这里可以根据需要对内容进行进一步处理
//     //   })
//     //   .catch(error => {
//     //     // 处理错误
//     //   });
//     // async function getContent(url: string): Promise<string> {
//     //   try {
//     //     const response = await axios.get(url);
//     //     return response.data;
//     //   } catch (error) {
//     //     console.error('Error fetching content:', error);
//     //     throw error;
//     //   }
//     // }
//     // function generateUUID(e, random, r) {
//     //   let lastNsecs = 0;
//     //   let lastTimestamp = 0;
//     //   let lastClockSequence = null;
//     //   let nodeIdentifier = null;
  
//     //   let index = (random && r) || 0;
//     //   const uuidArray = random || new Array(16);
//     //   e = e || {};
  
//     //   let node = e.node || nodeIdentifier;
//     //   let clockSeq = e.clockSeq !== undefined ? e.clockSeq : lastClockSequence;
  
//     //   if (node === null || clockSeq === null) {
//     //     const random = getRandomValues();
//     //     if (node === null) {
//     //       node = nodeIdentifier = [
//     //         random[0] | 1,
//     //         random[1],
//     //         random[2],
//     //         random[3],
//     //         random[4],
//     //         random[5],
//     //       ];
//     //     }
//     //     if (clockSeq === null) {
//     //       clockSeq = lastClockSequence = ((random[6] << 8) | random[7]) & 16383;
//     //     }
//     //   }
  
//     //   let timestamp = e.timestamp !== undefined ? e.timestamp : Date.now();
//     //   let nsecs = e.nsecs !== undefined ? e.nsecs : lastNsecs + 1;
  
//     //   const clockOffset =
//     //     (timestamp - lastTimestamp + (nsecs - lastNsecs)) / 10000;
  
//     //   if (clockOffset < 0 && e.clockSeq === undefined) {
//     //     clockSeq = (clockSeq + 1) & 16383;
//     //   }
  
//     //   if (
//     //     (clockOffset < 0 || timestamp > lastTimestamp) &&
//     //     e.nsecs === undefined
//     //   ) {
//     //     nsecs = 0;
//     //   }
  
//     //   if (nsecs >= 10000) {
//     //     throw new Error("generateUUID(): Can't create more than 10M uuids/sec");
//     //   }
  
//     //   lastTimestamp = timestamp;
//     //   lastNsecs = nsecs;
//     //   lastClockSequence = clockSeq;
  
//     //   timestamp += 122192928e5;
//     //   const timeLow = ((timestamp & 268435455) * 10000 + nsecs) % 4294967296;
//     //   uuidArray[index++] = (timeLow >>> 24) & 255;
//     //   uuidArray[index++] = (timeLow >>> 16) & 255;
//     //   uuidArray[index++] = (timeLow >>> 8) & 255;
//     //   uuidArray[index++] = timeLow & 255;
  
//     //   const timeMid = ((timestamp / 4294967296) * 10000) & 268435455;
//     //   uuidArray[index++] = (timeMid >>> 8) & 255;
//     //   uuidArray[index++] = timeMid & 255;
//     //   uuidArray[index++] = ((timeMid >>> 24) & 15) | 16;
//     //   uuidArray[index++] = (timeMid >>> 16) & 255;
  
//     //   uuidArray[index++] = (clockSeq >>> 8) | 128;
//     //   uuidArray[index++] = clockSeq & 255;
  
//     //   for (let i = 0; i < 6; ++i) {
//     //     uuidArray[index + i] = node[i];
//     //   }
//     //   return byteArrayToHexString(uuidArray);
//     // }
//     let windowVal = {};
//     let hexChars = [];
//     for (let i = 0; i < 256; ++i) {
//       hexChars?.push((i + 256)?.toString(16)?.slice(1));
//     }
//     function byteArrayToHexString(byteArray, startIndex = 0) {
//       return (
//         hexChars[byteArray[startIndex + 0]] +
//         hexChars[byteArray[startIndex + 1]] +
//         hexChars[byteArray[startIndex + 2]] +
//         hexChars[byteArray[startIndex + 3]] +
//         "-" +
//         hexChars[byteArray[startIndex + 4]] +
//         hexChars[byteArray[startIndex + 5]] +
//         "-" +
//         hexChars[byteArray[startIndex + 6]] +
//         hexChars[byteArray[startIndex + 7]] +
//         "-" +
//         hexChars[byteArray[startIndex + 8]] +
//         hexChars[byteArray[startIndex + 9]] +
//         "-" +
//         hexChars[byteArray[startIndex + 10]] +
//         hexChars[byteArray[startIndex + 11]] +
//         hexChars[byteArray[startIndex + 12]] +
//         hexChars[byteArray[startIndex + 13]] +
//         hexChars[byteArray[startIndex + 14]] +
//         hexChars[byteArray[startIndex + 15]]
//       ).toLowerCase();
//     }
    
//     // const uniqueId = generateUUID(null, null, null);
  
  
  
  
//     // function getRandomValues() {
//     //   let getRandom;
//     //   const arr = new Uint8Array(16);
//     //   if (!getRandom) {
//     //     getRandom =
//     //       typeof crypto !== "undefined" &&
//     //       crypto.getRandomValues &&
//     //       crypto.getRandomValues.bind(crypto);
          
//     //     if (!getRandom)
//     //       throw new Error(
//     //         "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
//     //       );
//     //   }
//     //   return getRandom(arr);
//     // }
//     let modelMesh = null;
//     let targetBone = null;
//     // let attachmentId = null;
//     let last_rotation ={};
//     // let all_last_rotation = {};
//     const all_last_rotation = React.useRef({});
//     const routerData = React.useRef(null);
//     let modelList = {};
//     // const uniqueId  = crypto.randomUUID();
//     const attachmentId = React.useRef(null);
//     // const position_x = document.getElementById("position[x]") as HTMLInputElement;
//     // const position_y = document.getElementById("position[y]") as HTMLInputElement;
//     // const position_z = document.getElementById("position[z]") as HTMLInputElement;
//     // const rotation_x = document.getElementById("rotation[x]") as HTMLInputElement;
//     // const rotation_y = document.getElementById("rotation[y]") as HTMLInputElement;
//     // const rotation_z = document.getElementById("rotation[z]") as HTMLInputElement;
  
//     // const scale_x = document.getElementById("scale[x]") as HTMLInputElement;
//     // const scale_y = document.getElementById("scale[y]") as HTMLInputElement;
//     // const scale_z = document.getElementById("scale[z]") as HTMLInputElement;
  
//   //   let costume = {
//   //     token_id: router.query.tokenID,
//   //     // "wallet": "0x60ea96f57b3a5715a90dae1440a78f8bb339c92e",
//   //     attachments: [],
//   //     skin: null,
//   //     name: "Costume-2",
//   //     // "default_color": "#f3f3f3"
//   //   };
  
//     function num(value) {
//       const t = parseFloat(value);
//       return t;
//       // return t.toString() === value.toString() ? t : null
//     }
//     useEffect(() => {
    
//       console.log(router.query.tokenID);
      
//   //     if(router.query.tokenID){
//   //       console.log(55555555555555);
        
//   //       routerData.current = router.query.tokenID
//   // console.log(routerData.current,);
  
//   //     }
//     }, [voxMeshState,modelMesh,router,]);
  
//     function updatePosition(type, index, value) {
//       modelMesh = voxMeshState;
//       const rotation_x = document.getElementById("rotation[x]") as HTMLInputElement;
//       const rotation_y = document.getElementById("rotation[y]") as HTMLInputElement;
//       const rotation_z = document.getElementById("rotation[z]") as HTMLInputElement;
//   // console.log(editNumPoY,
//   //     editNumPoX,
//   //     editNumPoZ,
//   //     editNumRoX,
//   //     editNumRoY,
//   //     editNumRoZ,
//   //     editNumSaX,
//   //     editNumSaY,
//   //     editNumSaZ,);
  
//       if (!modelMesh) {
//         console.log("modelMesh is Null");
//         return;
//       }
//       if (type === "position") {
//         switch (index) {
//           case 0:
//             modelMesh.position.x = num(value);
//             break;
//           case 1:
//             modelMesh.position.y = num(value);
//             break;
//           case 2:
//             modelMesh.position.z = num(value);
//             break;
//         }
//       } else if (type === "rotation") {
//           modelMesh.rotationQuaternion = null;
//         switch (index) {
//           case 0:
//             modelMesh.rotation.x = num(value);
//             //  setEditNumRoX((prevEditNumPo) => ({
//             //        ...prevEditNumPo,
                   
//             //        x:num(value) ,
//             //        }));
                 
//             break;
//           case 1:
//             modelMesh.rotation.y = num(value);
//             // setEditNumRoX((prevEditNumPo) => ({
//             //        ...prevEditNumPo,
//             //        y:num(value),
//             //        }));
                 
//             break;
//           case 2:
//             modelMesh.rotation.z = num(value);
//             // setEditNumRoX((prevEditNumPo) => ({
//             //        ...prevEditNumPo,
//             //        z: num(value),
//             //        }));
//             break;
//         }
//       } else if (type === "scale") {
//         // switch (index) {
//         //     case 0:
//         //         modelMesh.scaling.x = num(value)
//         //         break
//         //     case 1:
//         //         modelMesh.scaling.y = num(value)
//         //         break
//         //     case 2:
//         //         modelMesh.scaling.z = num(value)
//         //         break
//         // }
  
//         const scale_x = document.getElementById("scale[x]") as HTMLInputElement;
//         const scale_y = document.getElementById("scale[y]") as HTMLInputElement;
//         const scale_z = document.getElementById("scale[z]") as HTMLInputElement;
    
        
//         // modelMesh.scaling.set(num(scale_x.value), num(scale_y.value), num(scale_z.value))
//         // console.log(modelMesh.scaling.x);
//         // return
//         modelMesh.scaling.x = num(scale_x.value);
//         modelMesh.scaling.y = num(scale_y.value);
//         modelMesh.scaling.z = num(scale_z.value);
  
//         modelMesh.rotationQuaternion = null;
  
//         modelMesh.rotation.x = parseFloat(rotation_x.value);
//         modelMesh.rotation.y = parseFloat(rotation_y.value);
//         modelMesh.rotation.z = parseFloat(rotation_z.value);
    
//       }
//       last_rotation[0] = modelMesh.rotation.x;
//       last_rotation[1] = modelMesh.rotation.y;
//       last_rotation[2] = modelMesh.rotation.z;
      
//       updateAttachment();
    
//     }
  
//    const updateAttachment = useCallback ( () =>{
//     console.log(11111);
    
//   // // costume.attachments=costumeData
//   // setCostume((state)=>{
//   //   return {...state,token_id:router.query.tokenID}
//   // })
//       if (!modelMesh) {
//         console.log("no modelMesh");
//         return;
//       }
  
//       if (costume.attachments)
//       // console.log('进来');
      
//         costume.attachments?.forEach((t) => {
//           // console.log(attachmentId.current,1,t);
//           // console.log(attachmentId);
//           if (t.uuid == attachmentId.current) {
//             t.position = [
//               modelMesh.position.x.toFixed(2),
//               modelMesh.position.y.toFixed(2),
//               modelMesh.position.z.toFixed(2),
//             ];
//             t.rotation = [
//               parseFloat(modelMesh.rotation.x).toFixed(2),
//               parseFloat(modelMesh.rotation.y).toFixed(2),
//               parseFloat(modelMesh.rotation.z).toFixed(2),
//             ];
//             // t.rotation = [rotation_x.value, rotation_x.value, rotation_x.value]
//             t.scaling = [
//               parseFloat(modelMesh.scaling.x).toFixed(2),
//               parseFloat(modelMesh.scaling.y).toFixed(2),
//               parseFloat(modelMesh.scaling.z).toFixed(2),
//             ];
//             all_last_rotation.current[attachmentId.current] = t.rotation;
//             // console.log(all_last_rotation.current[attachmentId.current],"/////////////////////",t.rotation);
//             const metaCatAtk = window.localStorage.getItem("METACAT_atk");
//             console.log(costume,55555555);
//             setModelInfo(metaCatAtk, {...costume,token_id:router.query.tokenID});
//             return true;
//           }
//         });
//     },[router.query.tokenID])
  
  
//     React.useEffect(() => {
//       if(router.query.tokenID){
//         setCostume((state)=>{
//          return {...state,token_id:router.query.tokenID}
//           })
//       const canvas = document.getElementById(
//         "renderCanvasDcl"
//       ) as HTMLCanvasElement;
//       const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
     
     
//       const onClick = (e) => {
//         if (!e) {
//           if (layer()) layer().removeAllMeshes();
//           if (gizmoManager) {
//             gizmoManager.attachToMesh(null);
//           }
//           update_modelMesh(null);
//         }
//       };
//       const onLoadCostume = async function () {
//         // const response = await fetch('./load1.json');
//         // const data = await response.json();
    
        
//   if(router){
  
  
//         const getModelInfoData = getModelInfo(router.query.tokenID);
  
//         getModelInfoData.then(async (getModelInfoItem) => {
  
//           if (JSON.stringify(getModelInfoItem.data) === "{}") {
//             console.log("错误");
//           } else {
//             const data = getModelInfoItem.data;
//             const attachments = data.attachments;
  
//             for (let att of attachments) {
//               if(!att.type||att.type!='dcl'){continue}
             
//               // (window as any).droppedWearable = att;
//               windowVal['droppedWearable']= att
//               targetBone = att.bone;
//               attachmentId.current = att.uuid;
//               all_last_rotation.current[attachmentId.current] = att.rotation;
  
//               costume.attachments.push(att);
//              await  renderModel();
              
//             }
             
              
//             onClick(null);
  
//             // 在这里使用从JSON文件中读取到的数据
//           }
//         });
//       }
//       }
//       const createScene = function () {
//         // var engine = new BABYLON.Engine(canvas, true, { antialiasing: true });
//         const scene = new BABYLON.Scene(engine);
  
//         // Set the scene's clear color
//         scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);
  
//         // if (onClick) {
//         //   const lastPointerPosition = new BABYLON.Vector2();
//         //   let isDragging = false;
  
//         //   scene.onPointerObservable.add(
//         //     (eventData) => {
//         //       switch (eventData.type) {
//         //         case BABYLON.PointerEventTypes.POINTERDOWN:
//         //           isDragging = false;
//         //           lastPointerPosition.set(
//         //             eventData.event.clientX,
//         //             eventData.event.clientY
//         //           );
//         //           break;
//         //         case BABYLON.PointerEventTypes.POINTERUP:
//         //           if (isDragging || eventData.event.button !== 0) return;
//         //           onClick(
//         //             eventData.pickInfo?.hit && eventData.pickInfo.pickedMesh
//         //           );
//         //           // console.log(
//         //           //   eventData.pickInfo.pickedMesh,
//         //           //   "lllllllllllllllllllllll"
//         //           // );
//         //           if (eventData.pickInfo.pickedMesh) {
//         //             let new_modelMesh = getRootParent(
//         //               eventData.pickInfo.pickedMesh
//         //             );
//         //             if (new_modelMesh != modelMesh) {
//         //               update_modelMesh(new_modelMesh);
//         //               focus();
//         //             }
//         //           }
//         //           break;
//         //         case BABYLON.PointerEventTypes.POINTERMOVE:
//         //           if (isDragging) break;
//         //           const distance = lastPointerPosition
//         //             .subtract(
//         //               new BABYLON.Vector2(
//         //                 eventData.event.clientX,
//         //                 eventData.event.clientY
//         //               )
//         //             )
//         //             .length();
//         //           if (distance > 8) isDragging = true;
//         //           break;
//         //       }
//         //     },
//         //     BABYLON.PointerEventTypes.POINTERDOWN +
//         //       BABYLON.PointerEventTypes.POINTERUP +
//         //       BABYLON.PointerEventTypes.POINTERMOVE
//         //   );
//         // }
  
//         // 创建 ArcRotateCamera 相机
//         const camera = new BABYLON.ArcRotateCamera(
//           "Camera",
//           -1.57,
//           1.4,
//           3.4,
//           new BABYLON.Vector3(0, 0.9, 0),
//           scene
//         );
//         camera.attachControl(canvas, true);
//         camera.lowerRadiusLimit = 0.5;
//         camera.upperRadiusLimit = 8;
//         camera.wheelPrecision = 30;
//         camera.panningInertia = 0;
//         camera.panningSensibility = 350;
//         camera.inertialRadiusOffset = 0;
//         camera.minZ = 0.003;
  
//         // 创建 Cylinder 形状的天空盒
//         const skybox = BABYLON.MeshBuilder.CreateCylinder(
//           "skybox",
//           {
//             height: 64,
//             diameterTop: 64,
//             diameterBottom: 64,
//             tessellation: 64,
//             subdivisions: 64,
//           },
//           scene
//         );
//         skybox.isPickable = false;
  
//         //  const skyMaterial = new BABYLON.GradientMaterial("skybox/horizon", scene);
//         //  skyMaterial.offset = 0;
//         //  skyMaterial.scale = -0.01;
//         //  skyMaterial.topColor.set(0.8, 0.8, 1);
//         //  skyMaterial.bottomColor.set(1, 1, 1);
//         //  skyMaterial.backFaceCulling = false;
//         //  skyMaterial.disableLighting = true;
//         //  skyMaterial.blockDirtyMechanism = true;
//         //  skybox.material = skyMaterial;
  
//         // createLightRing(scene, camera);
  
//         // 设置高亮层
//         const highlightLayer = new BABYLON.HighlightLayer("selected", scene, {
//           isStroke: true,
//         });
//         highlightLayer.innerGlow = false;
//         highlightLayer.outerGlow = true;
//         const glowSize = 0.4;
//         highlightLayer.blurHorizontalSize = glowSize;
//         highlightLayer.blurVerticalSize = glowSize;
  
//         const light = new BABYLON.HemisphericLight(
//           "light",
//           new BABYLON.Vector3(0, 1, 0),
//           scene
//         );
  
//         // Default intensity is 1. Let's dim the light a small amount
//         light.intensity = 0.7;
  
//         const costumeMaterial = new BABYLON.StandardMaterial(
//           `material/costume`,
//           scene
//         );
//         costumeMaterial.diffuseColor.set(0.72, 0.81, 0.8);
//         costumeMaterial.emissiveColor.set(0.1, 0.1, 0.1);
//         costumeMaterial.specularPower = 500;
//         costumeMaterial.blockDirtyMechanism = true;
//         let material = costumeMaterial;
//         // var pbrMaterial = new BABYLON.PBRMaterial("pbrMaterial", scene);
//         // https://poster-phi.vercel.app/wearable/AvatarShape_B.glb
//         BABYLON.SceneLoader.ImportMesh(
//           null,
//           `https://poster-phi.vercel.app/wearable/`,
//           "AvatarShape_B.glb",
//           scene,
//           (meshes, particleSystems, skeletons) => {
//             // BABYLON.SceneLoader.ImportMesh(null, `../`, "avatar.glb", scene, (meshes, particleSystems, skeletons) => {
//             let costumeMesh, bodyMesh, skeletonRoot;
  
//             // feet hands head lbody    ubody 8
//             costumeMesh = meshes[0];
//             const costumeId = 1;
//             costumeMesh.id = `costume/${costumeId}`;
//             costumeMesh.visibility = 0;
//             costumeMesh.isPickable = false;
//             // var mesh = meshes[3];
//             // mesh.material = material;
//             // mesh.isPickable = false;
  
//             // 遍历模型的每个部分，并应用材质
//             for (var i = 1; i < meshes.length; i++) {
//               var mesh = meshes[i];
//               // mesh.material = pbrMaterial;
//               // mesh.scaling.set(0.9, 0.9, 0.9)
//               // avatar_turn_around = Math.PI
//               // mesh.rotation.z = avatar_turn_around
//               mesh.isPickable = false;
//             }
//             // this.applySkin();
//             skeletonRoot = skeletons[0];
//             //  window["skeleton"] = skeletonRoot;
            
//             skeleton.current = skeletonRoot;
          
//             // setskeleton(skeletonRoot)
//               console.log(skeleton.current,'=====');
//               if(skeleton.current){
//                 onLoadCostume()
  
//               }
//             const bones = skeletonRoot.bones.filter(
//               (bone) => !bone.name.match(/index/i)
//             );
//             const firstBone = bones[0];
//             const boneTransformNode = firstBone.getTransformNode();
  
//             if (boneTransformNode !== null) {
//               boneTransformNode.rotate(BABYLON.Axis.Y, Math.PI);
//             }
//             const boneMeshes = [];
//             let bones_index = 0;
  
//             bones.forEach((bone) => {
//               const boneSphere = BABYLON.MeshBuilder.CreateSphere(
//                 "bonesphere",
//                 {
//                   diameter: 6,
//                 },
//                 scene
//               );
//               boneMeshes.push(boneSphere);
//               boneSphere.id = "bonesphere";
//               let parts_i = get_avatar_bone(bones_index);
//               if (parts_i != 0) {
//                 if (parts_i === 2) {
//                   const newDiameter = 0.5; // 新的直径
//                   boneSphere.scaling = new BABYLON.Vector3(
//                     newDiameter,
//                     newDiameter,
//                     newDiameter
//                   );
//                 }
//                 let addToMesh = meshes[parts_i];
//                 bone.parent_mesh_name = addToMesh.name;
//                 //  var rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
//                 var rotationQuaternion = BABYLON.Quaternion.RotationAxis(
//                   new BABYLON.Vector3(1, 0, 0),
//                   Math.PI / 2
//                 );
//                 // 应用旋转变换到骨骼
//                 bone.rotate(rotationQuaternion, BABYLON.Space.LOCAL);
//                 boneSphere.attachToBone(bone, addToMesh);
//               }
//               boneSphere.metadata = bone.name.replace(/^.+:/, "");
//               const boneMaterial = new BABYLON.StandardMaterial("target", scene);
//               boneMaterial.emissiveColor.set(1, 1, 1);
//               boneMaterial.disableLighting = true;
//               boneMaterial.alpha = 1;
//               boneMaterial.blockDirtyMechanism = true;
//               boneSphere.material = boneMaterial;
//               boneSphere.renderingGroupId = 2;
//               boneSphere.setEnabled(false);
//               bones_index += 1;
//             });
//           }
//         );
//         console.log('end');
        
//         return scene;
//       };
//       const scene = createScene();
  
//       // 坐标向量
    
  
//      const createLightRing = function(scene, camera) {
//         const ringTransformNode = new BABYLON.TransformNode("ring", scene);
//         ringTransformNode.setParent(camera);
//         ringTransformNode.position.z = -5;
  
//         const redLight = new BABYLON.PointLight(
//           "redLight",
//           new BABYLON.Vector3(0, 10, 0),
//           scene
//         );
//         redLight.diffuse.set(0.1, 0.1, 0.01);
//         redLight.specular.set(1, 0.7647058823529411, 0.5411764705882353);
//         redLight.parent = ringTransformNode;
  
//         const greenLight = new BABYLON.PointLight(
//           "greenLight",
//           new BABYLON.Vector3(1, -5, 0),
//           scene
//         );
//         greenLight.diffuse.set(0.2784313725490196, 0.6352941176470588, 1);
//         greenLight.specular.set(0, 0, 0);
//         greenLight.intensity = 0.2;
//         greenLight.parent = ringTransformNode;
  
//         const blueLight = new BABYLON.PointLight(
//           "blueLight",
//           new BABYLON.Vector3(-8.66, -1, 2),
//           scene
//         );
//         blueLight.diffuse.set(1, 0.7058823529411765, 0.4235294117647059);
//         blueLight.specular.set(0, 0, 0);
//         blueLight.intensity = 0.2;
//         blueLight.parent = ringTransformNode;
  
//         const rotationAnimation = new BABYLON.Animation(
//           "lightRing",
//           "rotation.z",
//           30,
//           BABYLON.Animation.ANIMATIONTYPE_FLOAT,
//           BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
//         );
//         const rotationKeys = [
//           { frame: 0, value: 0 },
//           { frame: 300, value: 2 * Math.PI },
//         ];
//         rotationAnimation.setKeys(rotationKeys);
//         ringTransformNode.animations = [rotationAnimation];
//         scene.beginAnimation(ringTransformNode, 0, 300, true);
//       }
//       const getRootParent = function(mesh) {
//         console.log(mesh,);
        
//         if (mesh.name != "utils/wearable_dcl") {
//           return getRootParent(mesh.parent);
//         } else {
//           return mesh; // 如果没有父物体了，返回当前物体作为根父物体
//         }
//       }
//       const get_avatar_bone = function(index) {
//         // feet hands head lbody    ubody 8
//         if (index < 3 || (5 <= index && index < 7)) {
//           return 4;
//         } else if ((3 <= index && index < 5) || (7 <= index && index < 9)) {
//           return 1;
//         } else if ((9 <= index && index < 15) || (32 <= index && index < 36)) {
//           return 8;
//         } else if ((15 <= index && index < 32) || (36 <= index && index < 52)) {
//           return 2;
//         } else if (index === 53 || index === 52) {
//           return 3;
//         } else {
//           return 0;
//         }
//       }
  
//       // 模型高亮层
//       const layer = function () {
//         var e, t;
//         return (t =
//           (e = scene) === null || e === void 0
//             ? void 0
//             : e.getHighlightLayerByName("selected")) !== null && t !== void 0
//           ? t
//           : null;
//       }
  
//       const get_avatar = function (meshName) {
//         console.log(scene);
        
//         if (!scene) return null;
//         return scene.getMeshByName(meshName);
//       };
//       // get bones info
//       const bonespheres = function () {
//         var e, t;
//         return (t =
//           (e = scene) === null || e === void 0
//             ? void 0
//             : e.getMeshesById("bonesphere")) !== null && t !== void 0
//           ? t
//           : null;
//       };
  
//       // hide bones
//       const hideBoneSpheres = function () {
//         var e;
//         (e = bonespheres()) === null || e === void 0
//           ? void 0
//           : e.forEach((e) => {
//               e.setEnabled(false);
//             });
//       };
//       const onDrop = function () {
//         hideBoneSpheres(); // 隐藏骨骼球体
//         // 异步添加可穿戴物品到装饰中
//         if (!targetBone) {
//           console.log("no Bone");
//           return;
//         }
//         // 获取被拖放的可穿戴物品
//         const droppedWearable = getDroppedWearable();
//         if (!droppedWearable) {
//           console.warn("no wearable"); // 没有可穿戴物品，打印警告信息
//           return;
//         }
  
//         // // 判断是否能够将可穿戴物品添加到装饰中
//         // if (!canAdd(droppedWearable)) {
//         //     showSnackbar("Unable to add to costume", "Warning"); // 显示消息提示，无法添加到装饰中
//         //     return;
//         // }
  
//         addAttachment(droppedWearable, targetBone)
//           // .then(() => {})
//           // .catch((error) => {
//           //   console.error("Error adding attachment:", error);
//           // });
  
//         renderModel();
//       }
     
  
  
  
//       const get_GizmoManager =   function () {
//         const gizmoManager = new BABYLON.GizmoManager(scene, 3.5);
//         gizmoManager.positionGizmoEnabled = true;
//         gizmoManager.rotationGizmoEnabled = true;
//         gizmoManager.scaleGizmoEnabled = false;
  
//         gizmoManager.boundingBoxGizmoEnabled = true;
//         gizmoManager.usePointerToAttachGizmos = false;
//         if (
//           !gizmoManager.gizmos.positionGizmo ||
//           !gizmoManager.gizmos.rotationGizmo
//         )
//           throw new Error("gizmos not found");
//         gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
//           () => updateAllPositionValue(null)
//         );
//         gizmoManager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
//           () => updateAllPositionValue(null)
//         );
//         gizmoManager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
//           () => updateAllPositionValue(null)
//         );
  
//         gizmoManager.gizmos.rotationGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
//           () => updateAllPositionValue(null)
//         );
//         gizmoManager.gizmos.rotationGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
//           () => updateAllPositionValue(null)
//         );
//         gizmoManager.gizmos.rotationGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
//           () => updateAllPositionValue(null)
//         );
  
//         gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh =
//           false;
//         gizmoManager.boundingBoxDragBehavior.disableMovement = true;
  
//         if (gizmoManager.gizmos.boundingBoxGizmo) {
//           gizmoManager.gizmos.boundingBoxGizmo.scaleRatio = 0.8;
//           gizmoManager.gizmos.boundingBoxGizmo.scaleBoxSize = 0.03;
//           gizmoManager.gizmos.boundingBoxGizmo.rotationSphereSize = 0;
//           gizmoManager.gizmos.boundingBoxGizmo.onScaleBoxDragEndObservable.add(
//             () => updateAllPositionValue(null)
//           );
//         }
  
//         const position = document.getElementById("gizmo-position");
//         if (!position) throw new Error("positionGizmo not found");
//         position.addEventListener("click", () => {
//           gizmoManager.positionGizmoEnabled = true;
//           gizmoManager.rotationGizmoEnabled = false;
//           gizmoManager.boundingBoxGizmoEnabled = false;
//           // last_rotation=[]
//         });
//         const rotation = document.getElementById("gizmo-rotation");
//         if (!rotation) throw new Error("rotationGizmo not found");
//         rotation.addEventListener("click", () => {
//           gizmoManager.positionGizmoEnabled = false;
//           gizmoManager.rotationGizmoEnabled = true;
//           gizmoManager.boundingBoxGizmoEnabled = false;
//           // last_rotation = []
//         });
//         const scale = document.getElementById("gizmo-scale");
//         if (!scale) throw new Error("scaleGizmo not found");
//         scale.addEventListener("click", () => {
//           // if(modelMesh){
//           //     modelMesh.rotationQuaternion = null;
//           // }
//           if (modelMesh) {
//             last_rotation[0] = modelMesh.rotation.x;
//             last_rotation[1] = modelMesh.rotation.y;
//             last_rotation[2] = modelMesh.rotation.z;
//           }
//           gizmoManager.positionGizmoEnabled = false;
//           gizmoManager.rotationGizmoEnabled = false;
//           gizmoManager.boundingBoxGizmoEnabled = true;
//         });
//         gizmoManager.positionGizmoEnabled = true;
//         gizmoManager.rotationGizmoEnabled = false;
//         gizmoManager.boundingBoxGizmoEnabled = false;
//         return gizmoManager;
//       }
//       const gizmoManager = get_GizmoManager();
//       const addAttachment =  function (wearable, bone) {
//         // if (!selectedCostume) {
//         //     showSnackbar("Can't attach wearable when no costume is selected", MessageType.Warning, 5000);
//         //     return;
//         // }
//         // let found = false;
//         // if (the_avatar) {
//         // console.log(the_wearable);
//         console.log(modelList, 6666666666);
  
//         let the_wearable = getDroppedWearable();
//       //   console.log(the_wearable);
//       // modelList[the_wearable.token_id]
//         // modelList.some((item) => {
//         //   // console.log(item);
//         //   // console.log(the_wearable.token_id);
  
//         //   if (the_wearable.token_id === item) {
//         //     found = true;
//         //     return;
//         //   }
//         // });
//         if (modelList[the_wearable.hashValue]) {
//           return;
//         }
  
//         const defaultScale = 0.5;
//         const updatedCostume = Object.assign({}, costume);
//         // const uniqueId = generateUUID(null, null, null);
//         const uniqueId  = crypto.randomUUID();
//       //   console.log(wearable, "------333333------");
  
//         const attachmentInfo = {
//           name: wearable.name,
//           hash:wearable.hash,
//           hashValue:wearable.hashValue,
//           wearable_id:
//             typeof wearable.token_id === "number"
//               ? wearable.token_id
//               : parseInt(wearable.token_id, 10),
//           collection_address: wearable.collection_address || undefined,
//           // chain_id: wearable.chain_id,
//           // collection_id:
//           //   typeof wearable.collection_id === "number"
//           //     ? wearable.collection_id
//           //     : parseInt(wearable.collection_id, 10),
//           position: [0, 0, 0],
//           rotation: [0, 0, 0],
//           scaling: [defaultScale, defaultScale, defaultScale],
//           bone: bone,
//           category: wearable.category,
//           uuid: uniqueId,
//           type:wearable.type,
//           token_id: wearable.token_id,
//         };
  
//         if (!updatedCostume.attachments) {
//           updatedCostume.attachments = [];
//         }
    
//         updatedCostume.attachments.push(attachmentInfo);
//         const updatedCostumeD = { ...costume }; 
//         console.log(updatedCostumeD);
        
//         setCostume(updatedCostumeD); 
//         // attachmentId = uniqueId;
//         // console.log(uniqueId,);
        
//         attachmentId.current = uniqueId;
  
//         // const expandAttachments = true;
  
//         // 调用api 更新Costume数据
//         // await updateCostume(updatedCostume);
//       }
//       const bone =  function (e) {
  
//         if (!skeleton.current) return null;
  
//         const t = skeleton.current.getBoneIndexByName(e);
  
//         if (t == -1) {
//           console.error(`Bad bone name "${e}"`);
//           return null;
//         }
//         console.log(skeleton.current.bones[t]);
        
//         return skeleton.current.bones[t];
//       }
//       const renderModel = async function () {
//         // costume.attachments.forEach(
//         // let found = false;
//         // if (the_avatar) {
//         // console.log(the_wearable);
//         await new Promise((resolve) => {
//           let the_wearable = getDroppedWearable();
          
//           // modelList[modelMesh.hashValue]
//           // modelList.some((item) => {
//           //   // console.log(item);
//           //   // console.log(the_wearable.token_id);
  
//           //   if (the_wearable.token_id === item) {
//           //     resolve(null);
//           //     found = true;
//           //     return;
//           //   }
//           // });
//           if (modelList[the_wearable.hashValue]) {
            
//             return;
//           }
  
//           const the_bone = bone(targetBone);
  
//           if (!the_bone) {
//             console.log("no Bone");
//             return;
//           }
//           let the_avatar = get_avatar(the_bone.parent_mesh_name);
  
//           if (the_avatar) {
//             const origin = new BABYLON.TransformNode("Node/wearable", scene);
  
//             const shaderMaterial = new BABYLON.StandardMaterial(
//               "wearable",
//               scene
//             );
//             shaderMaterial.emissiveColor.set(0.3, 0.3, 0.3);
//             shaderMaterial.diffuseColor.set(1, 1, 1);
//             shaderMaterial.blockDirtyMechanism = true;
//             // .token_id===the_wearable.token_id
//             modelMesh = new BABYLON.Mesh("utils/wearable_dcl", scene);
//             modelMesh.material = shaderMaterial;
//             modelMesh.isPickable = true;
//             modelMesh.checkCollisions = false;
//             modelMesh.scaling.set(100, 100, 100);
//             modelMesh.hashValue = the_wearable.hashValue
//             modelMesh.uuid = attachmentId.current;
            
//             modelMesh.rotationQuaternion = null;
//             modelMesh.setParent(origin);
//             origin.attachToBone(the_bone, the_avatar);
//             BABYLON.SceneLoader.ImportMesh(
//               null,
//               "https://peer.decentraland.org/content/contents/",
//               the_wearable.hashValue,
//               scene,
//               function (wearableMesh) {
  
//                 // if(modelMesh != scene.getMeshesById(the_wearable.uuid)[0]){
//                 //     modelMesh = scene.getMeshesById(the_wearable.uuid)[0]
//                 // }
               
                
//                 wearableMesh[0].parent = modelMesh;
//                 var oldPostion =
//                   modelMesh.getBoundingInfo().boundingBox.centerWorld;
  
//                 setWearablePostion(the_wearable.category, wearableMesh[0], oldPostion)
//                 // wearableMesh[0].position.set(-oldPostion.x, -oldPostion.y-0.25, -oldPostion.z)
//                 last_rotation = [];
  
//                 if (
//                   the_wearable?.position &&
//                   the_wearable?.rotation &&
//                   the_wearable?.scaling
//                 ) {
//                   updateAllPositionValue("load_model_json");
//                 } else {
//                   updateAllPositionValue(null);
//                 }
//                 focus();
//                 modelList[the_wearable.hashValue]=true;
//                 resolve(null);
//               },
//               null,
//               null,
//               ".glb"
//             );
//           }
//         });
//         setVoxMeshState(modelMesh);
//       }
//       // }
//   const setWearablePostion = function (category, wearableMesh, oldPostion) {
//         // if (category === 'upper_body') {
//         //     wearableMesh.position.set(-oldPostion.x, -oldPostion.y, -oldPostion.z)
//         //     // wearableMesh.setLocalPosition(new BABYLON.Vector3(-oldPostion.x, -oldPostion.y - 0.27, -oldPostion.z))
//         //     // if(category ==='hands_wear'){
//         //     //     wearableMesh.scaling.set(1, 1.3, 1.3)
//         //     // }
//         // } else
  
//         if (category === "lower_body") {
//           wearableMesh.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.LOCAL);
//           // wearableMesh.scaling.set(1.1, 1, 1.2)
//           wearableMesh.position.set(-oldPostion.x, oldPostion.y, -oldPostion.z);
//         } else if (category === "feet") {
//           wearableMesh.position.set(
//             -oldPostion.x,
//             -oldPostion.y - 0.11,
//             -oldPostion.z - 0.1
//           );
//           wearableMesh.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);
//         } else {
//           wearableMesh.position.set(-oldPostion.x, -oldPostion.y, -oldPostion.z);
//           // if(category ==='hands_wear'){
//           //     wearableMesh.scaling.set(1, 1.3, 1.3)
//           // }
//         }
//       }
  
//      const getWearableBone = function (category) {
//         // helmet eyes eyebrows mouth
//         if (category === "upper_body" || category === "hands_wear") {
//           return "Avatar_Spine2";
//         } else if (category === "lower_body") {
//           return "Avatar_Hips";
//         } else if (category === "feet") {
//           return "Avatar_LeftToeBase";
//         } else if (
//           category === "mask" ||
//           category === "facial_hair" ||
//           category === "hair" ||
//           category === "earring" ||
//           category === "eyewear" ||
//           category === "eyewear" ||
//           category === "helmet" ||
//           category === "tiara" ||
//           category === "top_head"
//         ) {
//           return "Avatar_Head";
//         } else {
//           return "Avatar_Spine";
//         }
//       }
  
//      const wearableOnClick = function () {
//         // 获取被拖放的可穿戴物品
//         const droppedWearable = getDroppedWearable();
//         targetBone = getWearableBone(droppedWearable.category);
  
//         if (!droppedWearable) {
//           console.warn("no wearable"); // 没有可穿戴物品，打印警告信息
//           return;
//         }
  
//         addAttachment(droppedWearable, targetBone)
//           // .then(() => {})
//           // .catch((error) => {
//           //   console.error("Error adding attachment:", error);
//           // });
  
//         renderModel();
//       }
  
//       // 获取 拖放的wearable
//      const getDroppedWearable = function () {
//         let droppedWearableValue = windowVal["droppedWearable"];
        
//         return droppedWearableValue !== null && droppedWearableValue !== undefined
//           ? droppedWearableValue
//           : null;
//       }
  
//      const onWheel = function (e) {
//         e.preventDefault();
//       }
  
//      const onDragExit = function () {
//         hideBoneSpheres();
//       }
  
//      const onDragOver= function (e) {
//         var t;
  
//         // 遍历所有的 bonespheres（骨骼球体）
//         const all_bonespheres = bonespheres();
//         if (all_bonespheres) {
//           for (var i = 0; i < all_bonespheres.length; i++) {
//             var bonesphere = all_bonespheres[i];
//             // 启用每个 bonesphere
//             bonesphere.setEnabled(true);
  
//             if (!bonesphere.material) {
//               // 如果没有材质，则发出警告并返回
//               console.warn("no material", bonesphere);
//               continue;
//             }
//             var bonesphereMaterial = bonesphere.material;
//             // 将每个 bonesphere 的材质发光颜色设置为白色
//             bonesphereMaterial.emissiveColor.set(1, 1, 1);
//           }
//         }
  
//         if (scene) {
//           // 使用场景的 pick 方法，检测是否拾取到 id 为 "bonesphere" 的物体
//           var pickResult = scene.pick(e.offsetX, e.offsetY, function (mesh) {
//             return mesh.id === "bonesphere";
//           });
  
//           if (
//             pickResult &&
//             pickResult.pickedMesh &&
//             pickResult.pickedMesh.material
//           ) {
//             var pickedMaterial = pickResult.pickedMesh.material;
//             // 将拾取到的物体的材质发光颜色设置为指定颜色
//             //  let emissiveMaterial = new BABYLON.StandardMaterial("emissiveMaterial", scene);
//             //  emissiveMaterial.emissiveColor = new BABYLON.Color3(0.3, 0, 1);
//             //  pickResult.pickedMesh.material = emissiveMaterial;
//             // 设置目标骨骼为拾取到的物体的元数据
//             targetBone = pickResult.pickedMesh.metadata;
//           } else {
//             targetBone = null;
//           }
//         }
  
//         // 阻止浏览器默认行为
//         e.preventDefault();
//         if (e.dataTransfer) {
//           // 设置拖拽的效果为复制
//           e.dataTransfer.dropEffect = "copy";
//         }
//       }
//       // 生成wearables列表
//      const renderWearables = function () {
//         const collectibles = [];
  
//         // {
//         //          "id": "2222",
//         //          "token_id": id.tokenId,
//         //          "name": metadata.name,
//         //          "description":description,
//         //          "collection_id": 353,
//         //          "category": "mask",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }
//         //  const collectibles = [
//         //      {
//         //          "id": "4f8a99d2-89c2-4c18-ab87-b35d064021a4",
//         //          "token_id": 'bafybeid7vvyfrlgrqfzao5awnpijlpagoirvsgfbwmhm7q2gylrnuczedu',
//         //          "name": "1",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "upper_body",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "2222",
//         //          "token_id": id.tokenId,
//         //          "name": metadata.name,
//         //          "description":description,
//         //          "collection_id": 353,
//         //          "category": "mask",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "333",
//         //          "token_id": 4,
//         //          "name": "all",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "upper_body",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 4,
//         //          "name": "eyewear",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "eyewear",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "earring",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "earring",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "famale",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "lower_body",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "hand",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "hands_wear",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "facial1",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "facial_hair",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "long_hair",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "hair",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "feet",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "feet",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "hat",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "hat",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "helmet",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "helmet",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "tiara",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "tiara",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }, {
//         //          "id": "4444",
//         //          "token_id": 5,
//         //          "name": "top_head",
//         //          "description": "",
//         //          "collection_id": 353,
//         //          "category": "top_head",
//         //          "author": "0x38bbd375d49d6237984cbfa19719c419af9fe514",
//         //          "hash": "28614b00f9f807b8d71421d62d1612cab7501d20",
//         //          "suppressed": false,
//         //          "chain_id": 137,
//         //          "collection_address": "0x1e3D804415dCbb7ceA3478f176e123562e09b514",
//         //          "collection_name": "MetaCat"
//         //      }
//         //  ]
  
//         // const tokenboundAccount =
//         //   window.localStorage.getItem("tokenboundAccount");
        
//   //       const tokenboundAccount = window.localStorage.getItem('tokenboundAccount')
//   //       const detailHandleq = getBagsDetail(tokenboundAccount);
//   //       // console.log(detailHandleq);
//   //       detailHandleq.then((detailHandleItem) => {
//   //         let pointers = [];
//   //         detailHandleItem.ownedNfts.forEach((item) => {
//   //           if (Object.keys(item?.metadata).length === 0) {
//   //             return;
//   //           }
//   //           //  console.log(item.tokenUri.raw,3333123);1
//   //           const typeData = item?.metadata?.image;
//   //           // console.log(typeData);
//   //           const splitParts = typeData?.split("/");
//   //           const desiredValue =splitParts? splitParts[splitParts?.length - 1]:null;
//   //           const tokenUri = item.tokenUri.raw;
//   //           // console.log(tokenUri);
//   //           let attributesTotal = []
//   //         //   console.log(attributesTotal,566);
            
//   //           // console.log(tokenUri.includes("https://peer.decentraland.org"),66666666666666);
//   //           const attributesData = item.metadata.attributes
//   //           ?.filter(itemNum => itemNum.trait_type === 'Category')
//   //           .map(itemNum => itemNum.value);
  
//   // //           const categoryAttributes = attributesData.filter(attribute => attribute === 'Category');
//   // // console.log(categoryAttributes);
//   //         //   for (const group of attributesData) {
//   //         //     const filteredGroup = group.map(itemNumDa => itemNumDa.trait_type=== 'Category');
//   //         //     console.log(filteredGroup,234444);
              
//   //         //   }
//   //         //   if (item?.metadata.attributes) {
//   //         //     const filteredAttributes = item.metadata.attributes.filter(item => item.trait_type === 'Category');
//   //         //     console.log(filteredAttributes, '////////');
//   //         //   }
//   //           const newItem = {
//   //             token_id: item.id.tokenId,
//   //             name: item.metadata.name,
//   //             id: item.metadata.id,
//   //             description: item.description,
//   //             collection_address: item.contract.address,
//   //             hash: tokenUri.includes("https://peer.decentraland.org")
//   //               ? desiredValue
//   //               : null,
//   //             type:'dcl'
//   //           };
  
//   //           //  "pointers"=["urn:decentraland:matic:collections-v2:"+item.contract.address+":0",]
//   //           if (tokenUri.includes("https://peer.decentraland.org")) {
//   //             newItem['category']=attributesData[0]
//   //             collectibles.push(newItem);
//   //             pointers.push(
//   //               "urn:decentraland:matic:collections-v2:" +
//   //                 item.contract.address +
//   //                 ":0"
//   //             );
//   //           }
  
  
//   //           // console.log(item.metadata.image,34444444444);
//   //           // img.src=item.metadata.image
//   //           // img.alt = tooltip;
//   //           // console.log(img.src,'-----------------');
//   //         });
//   //         let dataContent = { pointers: pointers };
      
//   //         getDataHandle(dataContent).then((a) => {
  
//   //         //   a.then((b) => {
//   //             // console.log(b, 1233);
//   //             // const data =a.data.content
//   //             let hashValue = [];
//   //             const contentData = a.map(item => item.content);
//   //             for (const group of contentData) {
//   //                 const filteredGroup = group.filter(item => item.file.startsWith('male/'));
//   //                 const hashValues = filteredGroup.map(item => item.hash);
                  
                
//   //               hashValue.push(hashValues)
                   
//   // //   for (const hash of hashValue) {
//   // //     group['key:' + hash] = hash;
//   // //   }
//   // // for (let i = 0; i < contentData.length; i++) {
//   // //     const key = hashValue[i][0];
//   // //     contentData[i][`key: '${key}'`] = '';
//   // //   }
//   //               }
//   //               for (let i = 0; i < contentData.length; i++) {
//   //                 const hashValueItem = hashValue[i][0];
                  
//   //                 collectibles[i].hashValue = hashValueItem;
//   //               }
                
//   //             //   collectibles.push(hashValue)
//   //             // contentData.forEach(item => {
//   //             //     console.log(item);
                  
//   //             //   if (item.file.includes('male/')) {
//   //             //     hashValue = item.hash;
//   //             //   }
                
//   //             // });
//   //             const result = {};
  
//   //             // for (let i = 0; i < collectibles.length; i++) {
//   //             //     collectibles[i].hashValue = hashValue[i][0];
//   //             //   }
//   //             if (hashValue) {
//   //               return;
//   //             }
//   //           }).catch((error) => {
//   //             console.error(error);
//   //         //   });
//   //           // collectibles.push('hashValue':hashValue)
//   //         });
  
//   //         const wearables = collectibles.map((wearable) => {
//   //           console.log(collectibles);
            
//   //           const onDragStart = (event) => {
//   //             const dataTransfer = event.dataTransfer;
//   //             if (dataTransfer) {
//   //               dataTransfer.setData("text/plain", "boop");
//   //             }
//   //             event.stopImmediatePropagation();
//   //             if (event.target instanceof HTMLElement) {
//   //               event.target.className = "dragging-wearable";
//   //             }
//   //             // (window as any).droppedWearable = wearable;
//   //             windowVal['droppedWearable']= wearable
//   //           };
  
//   //           const onClickWearable = (event) => {
//   //             // const dataTransfer = event.dataTransfer;
//   //             // if (dataTransfer) {
//   //             //     dataTransfer.setData("text/plain", "boop");
//   //             // }
//   //             // event.stopImmediatePropagation();
//   //             // if (event.target instanceof HTMLElement) {
//   //             //     event.target.className = "click-wearable";
//   //             // }
//   //             // (window as any).droppedWearable = wearable;
//   //             windowVal['droppedWearable']= wearable
//   //             wearableOnClick();
//   //           };
  
//   //           const onDragEnd = (event) => {
//   //             if (event.target instanceof HTMLElement) {
//   //               event.target.className = "draggable-wearable";
//   //             }
//   //           };
  
//   //           let tooltip = `wearable #${wearable.id}`;
//   //           if (wearable.name) {
//   //             tooltip = wearable.name;
//   //             if (wearable.description) {
//   //               tooltip += `\n\n${wearable.description}`;
//   //             }
//   //           }
  
//   //           const li = document.createElement("li");
//   //           li.className = "draggable-wearable";
//   //           li.draggable = true;
//   //           li.title = tooltip;
//   //           li.addEventListener("dragstart", onDragStart);
//   //           li.addEventListener("dragend", onDragEnd);
//   //           li.addEventListener("click", onClickWearable);
  
//   //           const img = document.createElement("img");
//   //           img.width = 94;
//   //           img.height = 94;
//   //           img.src =
//   //             "https://peer-ec1.decentraland.org/content/contents/" +
//   //             wearable.hash;
//   //           //  const tokenboundAccount=  window.localStorage.getItem('tokenboundAccount')
//   //           //  const detailHandleq = getBagsDetail(tokenboundAccount);
//   //           //  console.log(detailHandleq);
//   //           //  detailHandleq.then((detailHandleItem)=>{
//   //           //  detailHandleItem.ownedNfts.map((item=>{
//   //           //  console.log(item,3333123);
//   //           //  console.log(item.metadata.image,34444444444);
//   //           //  img.src=item.metadata.image
//   //           img.alt = tooltip;
//   //           // console.log(img.src,'-----------------');
  
//   //           // }))
//   //           // })
  
//   //           const div = document.createElement("div");
//   //           div.textContent =
//   //             wearable.chain_id === 0 ? "(Off-chain)" : wearable.name;
//   //           li?.appendChild(img);
//   //           li?.appendChild(div);
//   //           return li;
//   //         });
  
//   //         // const fragment = document.createDocumentFragment();
//   //         // const h3 = document.createElement("h3");
//   //         // h3.textContent = `Wearables Wearables Wearables`;
//   //         const div = document.getElementById("wearable_list");
//   //         // div.className = "column-header";
//   //         const ul = document.createElement("ul");
//   //         ul.className = "wearables-list";
//   //         wearables.forEach((li) => ul.appendChild(li));
//   //         // fragment.appendChild(h3);
//   //         // div.appendChild(div);
//   //         div.appendChild(ul);
  
//   //         // document.body.appendChild(fragment);
//   //       });
        
//       }
//       renderWearables();
  
  
  
//      const focus= function () {
//         let lay = layer();
//         const col = new BABYLON.Color3(0.7, 0.3, 1);
  
//         if (lay && modelMesh) {
//           lay.removeAllMeshes();
//           // 获取根元素的所有子网格
//           var childMeshes = modelMesh.getChildMeshes();
  
//           // 遍历子网格数组
//           for (var i = 0; i < childMeshes.length; i++) {
//             var childMesh = childMeshes[i];
//             lay.addMesh(childMesh, col);
//             // 在这里对每个子网格进行操作，比如设置材质、位置、旋转等
//           }
//         }
//         if (gizmoManager && modelMesh) {
//           gizmoManager.attachToMesh(modelMesh);
//         }
//       }
  
//      const dispose_mesh = function () {
    
  
//         if (modelMesh) {
//           // console.log(modelMesh,2222222);
//           let the_wearable = getDroppedWearable()
//           modelMesh.dispose(); // 销毁模型及其资源
//           deleteAttachment();
//   modelList[modelMesh.hashValue] =false
          
//           update_modelMesh(null);
//           updateAllPositionValue(null);
        
  
//           const metaCatAtk = window.localStorage.getItem("METACAT_atk");
          
//           // setModelInfo(metaCatAtk,costume );
//           setModelInfo(metaCatAtk, {...costume,token_id:router.query.tokenID});
//         }
//       }
  
//    const update_modelMesh=   function (value) {
//         modelMesh = value;
//         setVoxMeshState(value);
        
  
//         if (modelMesh) {
//           // attachmentId = modelMesh.uuid;
//           attachmentId.current = modelMesh.uuid;
//           last_rotation = all_last_rotation.current[attachmentId.current];
//           // console.log( attachmentId.current,all_last_rotation.current[attachmentId.current]);
          
//         } else {
//           // attachmentId = null;
//           attachmentId.current = null;
//         }
  
//         updateAllPositionValue("change_model_mesh");
//       }
  
//       //    // pass
//       //    function updateInputPositionValue(type, dir) {
//       //     if (!modelMesh) {
//       //         return
//       //     }
//       //     if (type === 'position') {
//       //         switch (dir) {
//       //             case 0:
//       //                 const position_x = document.getElementById("position[x]");
//       //                 position_x.value = modelMesh.position.x.toFixed(2);
//       //                 break
//       //             case 1:
//       //                 const position_y = document.getElementById("position[y]");
//       //                 position_y.value = modelMesh.position.y.toFixed(2);
//       //                 break
//       //             case 2:
//       //                 const position_z = document.getElementById("position[z]");
//       //                 position_z.value = modelMesh.position.z.toFixed(2);
//       //                 break
//       //         }
//       //     } else if (type === 'rotation') {
//       //         switch (dir) {
//       //             case 0:
//       //                 const rotation_x = document.getElementById("rotation[x]");
//       //                 rotation_x.value = modelMesh.rotation.x.toFixed(2);
//       //                 break
//       //             case 1:
//       //                 const rotation_y = document.getElementById("rotation[y]");
//       //                 rotation_y.value = modelMesh.rotation.y.toFixed(2);
//       //                 break
//       //             case 2:
//       //                 const rotation_z = document.getElementById("rotation[z]");
//       //                 rotation_z.value = modelMesh.rotation.z.toFixed(2);
//       //                 break
//       //         }
//       //     } else if (type === 'scale') {
//       //         // switch (dir) {
//       //         //     case 0:
//       //         //         const scale_x = document.getElementById("scale[x]");
//       //         //         scale_x.value = modelMesh.scaling.x.toFixed(2);
//       //         //         break
//       //         //     case 1:
//       //         //         const scale_y = document.getElementById("scale[y]");
//       //         //         scale_y.value = modelMesh.scaling.y.toFixed(2);
//       //         //         break
//       //         //     case 2:
//       //         //         const scale_z = document.getElementById("scale[z]");
//       //         //         scale_z.value = modelMesh.scaling.z.toFixed(2);
//       //         //         break
//       //         // }
//       //         const scale_x = document.getElementById("scale[x]");
//       //         const scale_y = document.getElementById("scale[y]");
//       //         const scale_z = document.getElementById("scale[z]");
//       //         console.log(modelMesh.scaling.x.toFixed(2));
//       //         console.log(modelMesh.scaling.y.toFixed(2));
//       //         console.log(modelMesh.scaling.z.toFixed(2));
//       //         scale_x.value = modelMesh.scaling.x.toFixed(2);
//       //         scale_y.value = modelMesh.scaling.y.toFixed(2);
//       //         scale_z.value = modelMesh.scaling.z.toFixed(2);
  
//       //     }
  
//       // }
  
//      const updateAllPositionValue = function (type) {
//         const position_x = document.getElementById(
//           "position[x]"
//         ) as HTMLInputElement;
//         const position_y = document.getElementById(
//           "position[y]"
//         ) as HTMLInputElement;
//         const position_z = document.getElementById(
//           "position[z]"
//         ) as HTMLInputElement;
//         const rotation_x = document.getElementById(
//           "rotation[x]"
//         ) as HTMLInputElement;
//         const rotation_y = document.getElementById(
//           "rotation[y]"
//         ) as HTMLInputElement;
//         const rotation_z = document.getElementById(
//           "rotation[z]"
//         ) as HTMLInputElement;
  
//         const scale_x = document.getElementById("scale[x]") as HTMLInputElement;
//         const scale_y = document.getElementById("scale[y]") as HTMLInputElement;
//         const scale_z = document.getElementById("scale[z]") as HTMLInputElement;
//         if (!modelMesh) {
//           position_x.value = (0.0).toString();
//           position_y.value = (0.0).toString();
//           position_z.value = (0.0).toString();
  
//           rotation_x.value = (0.0).toString();
//           rotation_y.value = (0.0).toString();
//           rotation_z.value = (0.0).toString();
  
//           scale_x.value = (100).toString();
//           scale_y.value = (100).toString();
//           scale_z.value = (100).toString();
//           updateAttachment();
    
            
//         } else if (type === "change_model_mesh") {
//           position_x.value = modelMesh.position.x.toFixed(2);
//           position_y.value = modelMesh.position.y.toFixed(2);
//           position_z.value = modelMesh.position.z.toFixed(2);
//           // setEditNumPo((prevEditNumPo) => ({
//           //   ...prevEditNumPo,
//           //   x: modelMesh.position.x.toFixed(2),
//           // }));
//           // setEditNumPo((prevEditNumPo) => ({
//           //   ...prevEditNumPo,
//           //   y: modelMesh.position.y.toFixed(2),
//           // }));
//           // setEditNumPo((prevEditNumPo) => ({
//           //   ...prevEditNumPo,
//           //   z: modelMesh.position.z.toFixed(2),
//           // }));
//           // setEditNumRoX((prevEditNumPo) => ({
//           //      ...prevEditNumPo,
//           //      x: modelMesh.rotation.x = last_rotation[0],
//           //     }));
//           //   setEditNumRoX((prevEditNumPo) => ({
//           //      ...prevEditNumPo,
//           //      y: modelMesh.rotation.y = last_rotation[0],
//           //     }));
//           //   setEditNumRoX((prevEditNumPo) => ({
//           //      ...prevEditNumPo,
//           //      z: modelMesh.rotation.z = last_rotation[0],
//           //     }));
//           //   setEditNumSaX((prevEditNumPo) => ({
//           //      ...prevEditNumPo,
//           //      x: modelMesh.scaling.x.toFixed(2),
//           //     }));
//           //   setEditNumSaX((prevEditNumPo) => ({
//           //      ...prevEditNumPo,
//           //      y: modelMesh.scaling.y.toFixed(2),
//           //     }));
//           //   setEditNumSaX((prevEditNumPo) => ({
//           //      ...prevEditNumPo,
//           //      z: modelMesh.scaling.z.toFixed(2),
//           //     }));
            
//           scale_x.value = modelMesh.scaling.x.toFixed(2);
//           scale_y.value = modelMesh.scaling.y.toFixed(2);
//           scale_z.value = modelMesh.scaling.z.toFixed(2);
//           modelMesh.rotationQuaternion = null;
  
//           rotation_x.value  = last_rotation[0];
//           rotation_y.value  = last_rotation[1];
//           rotation_z.value  = last_rotation[2];
  
//         modelMesh.rotation.x=parseFloat(last_rotation[0])
//         modelMesh.rotation.y=parseFloat(last_rotation[1])
//         modelMesh.rotation.z=parseFloat(last_rotation[2])
//           // setEditNumPoY(parseFloat(position_y.value))
//           // setEditNumPoX( parseFloat(position_x.value))
//           // setEditNumPoZ(parseFloat(position_z.value))
//           // setEditNumRoX(parseFloat(rotation_x.value))
//           // setEditNumRoY(parseFloat(rotation_y.value))
//           // setEditNumRoZ(parseFloat(rotation_z.value))
//           // setEditNumSaX(parseFloat(scale_x.value))
//           // setEditNumSaY(parseFloat(scale_y.value))
//           // setEditNumSaZ(parseFloat(scale_z.value))
//         } else {
//           // const rot = e=>Math.round(e * 1e3 * 180 / Math.PI) / 1e3;
//           // const po_sc = e=>Math.round(e * 1e3) / 1e3;
//           if (type === "load_model_json") {
//             let the_wearable = getDroppedWearable();
  
//             modelMesh.position.x = parseFloat(the_wearable.position[0]);
//             modelMesh.position.y = parseFloat(the_wearable.position[1]);
//             modelMesh.position.z = parseFloat(the_wearable.position[2]);
  
//             modelMesh.rotation.x = parseFloat(the_wearable.rotation[0]);
//             modelMesh.rotation.y = parseFloat(the_wearable.rotation[1]);
//             modelMesh.rotation.z = parseFloat(the_wearable.rotation[2]);
  
//             modelMesh.scaling.x = parseFloat(the_wearable.scaling[0]);
//             modelMesh.scaling.y = parseFloat(the_wearable.scaling[1]);
//             modelMesh.scaling.z = parseFloat(the_wearable.scaling[2]);
//           }
         
  
//           // console.log(Number(modelMesh.position.x),5666665,modelMesh.position.x);
//           // position_x.value = parseFloat(modelMesh.position.x.toFixed(2)).toFixed(2);
//           // console.log(position_x.value,255565);
  
//           position_x.value = modelMesh.position.x.toFixed(2);
  
//           position_y.value = modelMesh.position.y.toFixed(2);
//           position_z.value = modelMesh.position.z.toFixed(2);
  
  
//           scale_x.value = modelMesh.scaling.x.toFixed(2);
//           scale_y.value = modelMesh.scaling.y.toFixed(2);
//           scale_z.value = modelMesh.scaling.z.toFixed(2);
//           modelMesh.rotationQuaternion = null;
  
//            if ('x' as any  in last_rotation){
//             rotation_x.value  = modelMesh.rotation.x = parseFloat(last_rotation['x']).toFixed(2) ;
//         }else{
//             rotation_x.value = modelMesh.rotation.x.toFixed(2);
//         }
  
//         if ('y' as any  in last_rotation){
//             rotation_y.value = modelMesh.rotation.y = parseFloat(last_rotation['y']).toFixed(2);
//         }else{
//             rotation_y.value = modelMesh.rotation.y.toFixed(2);
//         }
  
//         if ('z' as any  in last_rotation){
//             rotation_z.value = modelMesh.rotation.z = parseFloat(last_rotation['z']).toFixed(2);
//         }else{
//             rotation_z.value = modelMesh.rotation.z.toFixed(2);
//         }
  
//         if (!gizmoManager.boundingBoxGizmoEnabled) {
//                 last_rotation = {}
//             }
  
//           // if (last_rotation.length === 0) {
//           //   rotation_x.value = modelMesh.rotation.x.toFixed(2);
//           //   rotation_y.value = modelMesh.rotation.y.toFixed(2);
//           //   rotation_z.value = modelMesh.rotation.z.toFixed(2);
//           // } else {
//           //   rotation_x.value = modelMesh.rotation.x = parseFloat(
//           //     last_rotation[0]
//           //   ).toFixed(2);
//           //   rotation_y.value = modelMesh.rotation.y = parseFloat(
//           //     last_rotation[1]
//           //   ).toFixed(2);
//           //   rotation_z.value = modelMesh.rotation.z = parseFloat(
//           //     last_rotation[2]
//           //   ).toFixed(2);
//           //   if (!gizmoManager.boundingBoxGizmoEnabled) {
//           //     last_rotation = [];
//           //   }
//           // }
//   //         console.log(modelMesh.rotation);
//   // console.log( modelMesh.scaling);
//   //         setEditNumPo((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
//   //           x: modelMesh.position.x.toFixed(2),
//   //         }));
//   //         setEditNumPo((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
//   //           y: modelMesh.position.y.toFixed(2),
//   //         }));
//   //         setEditNumPo((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
//   //           z: modelMesh.position.z.toFixed(2),
//   //         }));
//   //         setEditNumRoX((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
          
//   //           x: modelMesh.rotation.x,
//   //          }));
//   //        setEditNumRoX((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
//   //           y:  modelMesh.rotation.y,
//   //          }));
//   //        setEditNumRoX((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
//   //           z: modelMesh.rotation.z,
//   //          }));
//   //        setEditNumSaX((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
//   //           x: modelMesh.scaling.x.toFixed(2),
//   //          }));
//   //        setEditNumSaX((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
//   //           y: modelMesh.scaling.y.toFixed(2),
//   //          }));
//   //        setEditNumSaX((prevEditNumPo) => ({
//   //           ...prevEditNumPo,
//   //           z: modelMesh.scaling.z.toFixed(2),
//   //          }));
  
//           if (!type) {
//             updateAttachment();
//           }
//         }
  
        
//         setEditNumPo((prevEditNumPo) => ({
//           ...prevEditNumPo,
//           x:modelMesh? modelMesh.position.x.toFixed(2):0,
//         }));
//         setEditNumPo((prevEditNumPo) => ({
//           ...prevEditNumPo,
//           y:modelMesh? modelMesh.position.y.toFixed(2):0,
//         }));
//         setEditNumPo((prevEditNumPo) => ({
//           ...prevEditNumPo,
//           z: modelMesh?modelMesh.position.z.toFixed(2):0,
//         }));
//         const refValueX = modelMesh?.rotation.x; // 示例字符串值
//            const refValueY = modelMesh?.rotation.y; // 示例字符串值
//            const refValueZ = modelMesh?.rotation.z; // 示例字符串值
//         const fixedValueX = parseFloat(refValueX).toFixed(2);
//         const fixedValueY = parseFloat(refValueY).toFixed(2);
//         const fixedValueZ = parseFloat(refValueZ).toFixed(2);
       
        
//            setEditNumRoX((prevEditNumPo) => ({
//              ...prevEditNumPo,
             
//              x:modelMesh? fixedValueX:0 ,
//              }));
//             setEditNumRoX((prevEditNumPo) => ({
//              ...prevEditNumPo,
//              y: modelMesh? fixedValueY:0,
//              }));
//             setEditNumRoX((prevEditNumPo) => ({
//              ...prevEditNumPo,
//              z: modelMesh? fixedValueZ:0,
//              }));
  
   
//           setEditNumSaX((prevEditNumPo) => ({
//              ...prevEditNumPo,
//              x: modelMesh?modelMesh.scaling.x.toFixed(2):0,
//             }));
//           setEditNumSaX((prevEditNumPo) => ({
//              ...prevEditNumPo,
//              y: modelMesh?modelMesh.scaling.y.toFixed(2):0,
//             }));
//           setEditNumSaX((prevEditNumPo) => ({
//              ...prevEditNumPo,
//              z:modelMesh? modelMesh.scaling.z.toFixed(2):0,
//             }));
//   // console.log(modelMesh.rotation.y,modelMesh.rotation.x,modelMesh.rotation.z);
  
//   //           console.log(editNumPo.x,editNumPo.y,editNumPo.z);
            
//       }
  
//      const deleteAttachment = function () {
//         if (!modelMesh) {
//           console.log("no modelMesh");
//           return;
//         }
  
//         if (costume.attachments) var index = 0;
//         costume.attachments.forEach((t) => {
//           if (t.uuid == attachmentId.current) {
//             costume.attachments.splice(index, 1);
//             return;
//           }
//           index += 1;
//         });
//       }
  
//       // function downloadCostume() {
//       //   var file_name;
//       //   // const t = this.costume;
//       //   if (!costume) return;
//       //   const json_costume = JSON.stringify(costume, null, 2);
//       //   const element_dow = document.createElement("a");
//       //   element_dow.style.display = "hidden";
//       //   element_dow.href = window.URL.createObjectURL(
//       //     new Blob([json_costume], {
//       //       type: "application/json",
//       //     })
//       //   );
//       //   element_dow.download =
//       //     ((file_name = costume.name) !== null && file_name !== void 0
//       //       ? file_name
//       //       : costume.token_id) + ".json";
//       //   element_dow.click();
//       //   element_dow.remove();
//       // }
    
  
//       // canvas增加监听事件
//       // canvas.addEventListener("wheel", onWheel);
//       // canvas.addEventListener("dragover", onDragOver);
//       // canvas.addEventListener("dragleave", onDragExit);
//       // canvas.addEventListener("drop", onDrop);
//       // canvas.classList.add("costumer");
  
//       const wearableElement = document.getElementById("yourWearableElementId");
  
//       // 获取按钮元素
//       const deleteButton = document.getElementById("mesh_dispose");
//       const download_json_file = document.getElementById("download");
//       // const up_load = document.getElementById("upload");
//       // 添加点击事件处理程序
//       deleteButton.addEventListener("click", dispose_mesh);
//       // download_json_file.addEventListener("click", downloadCostume);
//       // up_load.addEventListener("click", onLoadCostume);
  
//       engine.runRenderLoop(function () {
//         scene.render();
//       });
  
//       window.addEventListener("resize", function () {
//         engine.resize();
//       });
  
  
  
     
//     }
//     }, [router,skeleton,]);
  
  
    
//     // router,skeleton.current
//     const onChangeEdiumY =(event) => {
//       // setEditNumPoY(event.target.value);
//       setEditNumPo((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         y: event.target.value,
//       }));
//     };
//     const onChangeEdiumX = (event) => {
//       // setEditNumPoX(event.target.value);
//       setEditNumPo((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         x: event.target.value,
//       }));
//     };
//     const onChangeEdiumZ = (event) => {
//       // setEditNumPoZ(event.target.value);
//       setEditNumPo((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         z: event.target.value,
//       }));
//     };
//     const onChangeEdiumRoX = (event) => {
//       // setEditNumRoX(event.target.value);
//       setEditNumRoX((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         x: event.target.value,
//       }));
//     };
//     const onChangeEdiumRoY = (event) => {
     
//       setEditNumRoX((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         y: event.target.value,
//       }));
//     };
//     const onChangeEdiumRoZ = (event) => {
//       // setEditNumRoZ(event.target.value);
//       setEditNumRoX((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         z: event.target.value,
//       }));
//     };
//     const onChangeEdiumSaX = (event) => {
//       // setEditNumSaX(event.target.value);
//       setEditNumSaX((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         x: event.target.value,
//       }));
//     };
//     const onChangeEdiumSaY = (event) => {
//       // setEditNumSaY(event.target.value);
//       setEditNumSaX((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         y: event.target.value,
//       }));
//     };
//     const onChangeEdiumSaZ = (event) => {
//       // setEditNumSaZ(event.target.value);
//       setEditNumSaX((prevEditNumPo) => ({
//         ...prevEditNumPo,
//         z: event.target.value,
//       }));
//     };
  
//     return (
//       <>
//         <div
//           id="gizmos"
//           className="active"
//           style={{ position: "relative", height: "90%", top: "5%" }}
//         >
//           <canvas id="renderCanvasDcl" className={style.canvas}></canvas>
//           <div style={{ position: "absolute", top: "10px" ,display:"none"}}>
//             <button className={style.btn} id="gizmo-position">
//               Position
//             </button>
//             <button className={style.btn} id="gizmo-rotation">
//               Rotation
//             </button>
//             <button className={style.btn} id="gizmo-scale">
//               Scale
//             </button>
//           </div>
//           <div style={{ position: "absolute", right: "10px", top: "10px" ,display:"none"}}>
//             <div className="editor-field position">
//               <label>Position</label>
//               <div className="fields">
//                 <input
//                   id="position[x]"
//                   type="number"
//                   step="1"
//                   title="x"
//                   // value={editNumPoX}
//                   value={editNumPo.x}
//                   onInput={(event) => {
//                       const inputElement = event.target as HTMLInputElement;
//                     updatePosition("position", 0, inputElement.value);
//                   }}
//                   onChange={onChangeEdiumX}
//                 />
//                 <input
//                   id="position[y]"
//                   type="number"
//                   step="1"
//                   title="y"
//                   // value={editNumPoY}
//                   value={editNumPo.y}
//                   onChange={onChangeEdiumY}
//                   onInput={(event) => {
//                       const inputElement = event.target as HTMLInputElement;
//                     updatePosition("position", 1, inputElement.value);
//                   }}
//                 />
//                 <input
//                   id="position[z]"
//                   type="number"
//                   step="1"
//                   title="z"
//                   value={editNumPo.z}
//                   onInput={(event) => {
//                       const inputElement = event.target as HTMLInputElement;
//                     updatePosition("position", 2, inputElement.value);
//                   }}
//                   onChange={onChangeEdiumZ}
//                 />
//               </div>
//             </div>
//             <div className="editor-field rotation">
//               <label>Rotation</label>
//               <div className="fields">
//                 <input
//                   id="rotation[x]"
//                   type="number"
//                   step="1"
//                   title="x"
//                   value={editNumRoX.x}
//                   onInput={(event) => {
//                       const inputElement = event.target as HTMLInputElement;
//                     updatePosition("rotation", 0, inputElement.value);
//                   }}
//                   onChange={onChangeEdiumRoX}
//                 />
//                 <input
//                   id="rotation[y]"
//                   type="number"
//                   step="1"
//                   title="y"
//                   value={editNumRoX.y}
//                   onInput={(event) => {
//                       const inputElement = event.target as HTMLInputElement;
//                     updatePosition("rotation", 1, inputElement.value);
//                   }}
//                   onChange={onChangeEdiumRoY}
//                 />
//                 <input
//                   id="rotation[z]"
//                   type="number"
//                   step="1"
//                   title="z"
//                   value={editNumRoX.z}
//                   onInput={(event) => {
//                       const inputElement = event.target as HTMLInputElement;
//                     updatePosition("rotation", 2, inputElement.value);
//                   }}
//                   onChange={onChangeEdiumRoZ}
//                 />
//               </div>
//             </div>
//             <div className="editor-field scale-all">
//               <label>Scale</label>
//               <div className="fields">
//                 <input
//                   id="scale[x]"
//                   type="number"
//                   step="1"
//                   title="all"
//                   value={editNumSaX.x}
//                   onInput={(event) => {
                    
//                         const inputElement = event.target as HTMLInputElement;
//                     updatePosition("scale", 0, inputElement.value);
//                   }}
//                   onChange={onChangeEdiumSaX}
//                 />
//                 <input
//                   id="scale[y]"
//                   type="number"
//                   step="1"
//                   title="all"
//                   value={editNumSaX.y}
//                   onInput={(event) => {
//                       const inputElement = event.target as HTMLInputElement;
//                     updatePosition("scale", 1, inputElement.value);
//                   }}
//                   onChange={onChangeEdiumSaY}
//                 />
//                 <input
//                   id="scale[z]"
//                   type="number"
//                   step="1"
//                   title="all"
//                   value={editNumSaX.z}
//                   onInput={(event) => {
//                       const inputElement = event.target as HTMLInputElement;
//                     updatePosition("scale", 2, inputElement.value);
//                   }}
//                   onChange={onChangeEdiumSaZ}
//                 />
//                 {/* <!-- <button class="toggle">...</button> --> */}
//               </div>
//             </div>
//             <div>
//               <button className={style.buton} id="mesh_dispose">
//                 Remove
//               </button>
//               {/* <button className={style.buton} id="download">
//                 Download
//               </button> */}
//               {/* <button className={style.buton} id="upload">
//                 Upload
//               </button> */}
//             </div>
//             <div id="wearable_list"></div>
//           </div>
//         </div>
//       </>
//     );
//   }