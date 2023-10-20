import React, { useState, useEffect, useCallback } from "react";
import style from "./index.module.css";
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import "babylonjs-materials";
import axios from "axios";
import {
    getModelInfo,
    setModelInfo,
    getBagsDetail,
    getDataHandle,
  } from "../../../../service";
  
  import { useRouter ,useParams} from 'next/navigation';


export default function DclContent() {
    const router = useParams();
  
    const [voxMeshState, setVoxMeshState] = useState(null);
    const [editNum, setEditNum] = useState(null);
    const [costumeData,setcostumeData] = useState(null)
    // const [    skeleton,setskeleton] = useState(null)
    const skeleton:any =  React.useRef(null)
    
    const [costume, setCostume] = useState({  
    //   token_id: router.query.tokenID,
      // "wallet": "0x60ea96f57b3a5715a90dae1440a78f8bb339c92e",
      attachments: [],
      skin: null,
      name: "Bag",});
    const [detailHandleData, setDetailHandleData] = useState(null);
    // const [editNumPoY, setEditNumPoY] = useState(0);
    // const [editNumPoX, setEditNumPoX] = useState(0);
    const [editNumPo, setEditNumPo] = useState({ x: 0, y: 0 ,z:0} as any);
    // const [editNumPoZ, setEditNumPoZ] = useState(0);
    const [editNumRoX, setEditNumRoX] = useState({ x: 0, y: 0 ,z:0} as any);
    // const [editNumRoY, setEditNumRoY] = useState(0);
    // const [editNumRoZ, setEditNumRoZ] = useState(0);
    const [editNumSaX, setEditNumSaX] = useState({ x: 100, y: 100 ,z:100} as any);
    // const [editNumSaY, setEditNumSaY] = useState(100);
    // const [editNumSaZ, setEditNumSaZ] = useState(100);
    
    // // 调用方法并处理返回的内容
    // const url = 'https://peer.decentraland.org/content/contents/bafybeid7vvyfrlgrqfzao5awnpijlpagoirvsgfbwmhm7q2gylrnuczedu';
    // getContent(url)
    //   .then(content => {
    //     console.log('Content:', content);
    //     // 在这里可以根据需要对内容进行进一步处理
    //   })
    //   .catch(error => {
    //     // 处理错误
    //   });
    // async function getContent(url: string): Promise<string> {
    //   try {
    //     const response = await axios.get(url);
    //     return response.data;
    //   } catch (error) {
    //     console.error('Error fetching content:', error);
    //     throw error;
    //   }
    // }
    // function generateUUID(e, random, r) {
    //   let lastNsecs = 0;
    //   let lastTimestamp = 0;
    //   let lastClockSequence = null;
    //   let nodeIdentifier = null;
  
    //   let index = (random && r) || 0;
    //   const uuidArray = random || new Array(16);
    //   e = e || {};
  
    //   let node = e.node || nodeIdentifier;
    //   let clockSeq = e.clockSeq !== undefined ? e.clockSeq : lastClockSequence;
  
    //   if (node === null || clockSeq === null) {
    //     const random = getRandomValues();
    //     if (node === null) {
    //       node = nodeIdentifier = [
    //         random[0] | 1,
    //         random[1],
    //         random[2],
    //         random[3],
    //         random[4],
    //         random[5],
    //       ];
    //     }
    //     if (clockSeq === null) {
    //       clockSeq = lastClockSequence = ((random[6] << 8) | random[7]) & 16383;
    //     }
    //   }
  
    //   let timestamp = e.timestamp !== undefined ? e.timestamp : Date.now();
    //   let nsecs = e.nsecs !== undefined ? e.nsecs : lastNsecs + 1;
  
    //   const clockOffset =
    //     (timestamp - lastTimestamp + (nsecs - lastNsecs)) / 10000;
  
    //   if (clockOffset < 0 && e.clockSeq === undefined) {
    //     clockSeq = (clockSeq + 1) & 16383;
    //   }
  
    //   if (
    //     (clockOffset < 0 || timestamp > lastTimestamp) &&
    //     e.nsecs === undefined
    //   ) {
    //     nsecs = 0;
    //   }
  
    //   if (nsecs >= 10000) {
    //     throw new Error("generateUUID(): Can't create more than 10M uuids/sec");
    //   }
  
    //   lastTimestamp = timestamp;
    //   lastNsecs = nsecs;
    //   lastClockSequence = clockSeq;
  
    //   timestamp += 122192928e5;
    //   const timeLow = ((timestamp & 268435455) * 10000 + nsecs) % 4294967296;
    //   uuidArray[index++] = (timeLow >>> 24) & 255;
    //   uuidArray[index++] = (timeLow >>> 16) & 255;
    //   uuidArray[index++] = (timeLow >>> 8) & 255;
    //   uuidArray[index++] = timeLow & 255;
  
    //   const timeMid = ((timestamp / 4294967296) * 10000) & 268435455;
    //   uuidArray[index++] = (timeMid >>> 8) & 255;
    //   uuidArray[index++] = timeMid & 255;
    //   uuidArray[index++] = ((timeMid >>> 24) & 15) | 16;
    //   uuidArray[index++] = (timeMid >>> 16) & 255;
  
    //   uuidArray[index++] = (clockSeq >>> 8) | 128;
    //   uuidArray[index++] = clockSeq & 255;
  
    //   for (let i = 0; i < 6; ++i) {
    //     uuidArray[index + i] = node[i];
    //   }
    //   return byteArrayToHexString(uuidArray);
    // }
    let windowVal:any  = {};
    let hexChars:any  = [];
    for (let i = 0; i < 256; ++i) {
      hexChars?.push((i + 256)?.toString(16)?.slice(1));
    }

    
    // const uniqueId = generateUUID(null, null, null);
  
  
  
  
    // function getRandomValues() {
    //   let getRandom;
    //   const arr = new Uint8Array(16);
    //   if (!getRandom) {
    //     getRandom =
    //       typeof crypto !== "undefined" &&
    //       crypto.getRandomValues &&
    //       crypto.getRandomValues.bind(crypto);
          
    //     if (!getRandom)
    //       throw new Error(
    //         "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
    //       );
    //   }
    //   return getRandom(arr);
    // }
    let modelMesh:any = null;
    let targetBone:any = React.useRef(null);
    // let attachmentId = null;
    let last_rotation:any  ={};
    // let all_last_rotation = {};
    const all_last_rotation:any  = React.useRef({});
    const routerData = React.useRef(null);
    let modelList:any  = {};
    // const uniqueId  = crypto.randomUUID();
    const attachmentId:any  = React.useRef(null);
    // const position_x = document.getElementById("position[x]") as HTMLInputElement;
    // const position_y = document.getElementById("position[y]") as HTMLInputElement;
    // const position_z = document.getElementById("position[z]") as HTMLInputElement;
    // const rotation_x = document.getElementById("rotation[x]") as HTMLInputElement;
    // const rotation_y = document.getElementById("rotation[y]") as HTMLInputElement;
    // const rotation_z = document.getElementById("rotation[z]") as HTMLInputElement;
  
    // const scale_x = document.getElementById("scale[x]") as HTMLInputElement;
    // const scale_y = document.getElementById("scale[y]") as HTMLInputElement;
    // const scale_z = document.getElementById("scale[z]") as HTMLInputElement;
  
  //   let costume = {
  //     token_id: router.query.tokenID,
  //     // "wallet": "0x60ea96f57b3a5715a90dae1440a78f8bb339c92e",
  //     attachments: [],
  //     skin: null,
  //     name: "Costume-2",
  //     // "default_color": "#f3f3f3"
  //   };
  
    function num(value:any) {
      const t = parseFloat(value);
      return t;
      // return t.toString() === value.toString() ? t : null
    }
//     useEffect(() => {
    
//       console.log(router);
      
//   //     if(router.query.tokenID){
//   //       console.log(55555555555555);
        
//   //       routerData.current = router.query.tokenID
//   // console.log(routerData.current,);
  
//   //     }
//     }, [voxMeshState,modelMesh,router,]);
  


  
  
    React.useEffect(() => {
      if(router?.tokenId){
        setCostume((state)=>{
         return {...state,token_id:router?.tokenId}
          })
      const canvas = document.getElementById(
        "renderCanvasDcl"
      ) as HTMLCanvasElement;
      const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
     
     

      const onLoadCostume = async function () {
        // const response = await fetch('./load1.json');
        // const data = await response.json();
    
        
  if(router){
  console.log(router?.tokenId);
  
  
        const getModelInfoData = getModelInfo(router?.tokenId);
  
        getModelInfoData.then(async (getModelInfoItem) => {
  
          if (JSON.stringify(getModelInfoItem.data) === "{}") {
            console.log("错误");
          } else {
            const data = getModelInfoItem.data;
            const attachments = data.attachments;
  
            for (let att of attachments) {
              if(!att.type||att.type!='dcl'){continue}
             
              // (window as any).droppedWearable = att;
              windowVal['droppedWearable']= att
              targetBone.current = att.bone;
              attachmentId.current = att.uuid;
              all_last_rotation.current[attachmentId.current] = att.rotation;
  
            //   costume.attachments.push(att);
             await  renderModel();
              
            }
             
              
            // onClick(null);
  
            // 在这里使用从JSON文件中读取到的数据
          }
        });
      }
      }
      const createScene = function () {
        // var engine = new BABYLON.Engine(canvas, true, { antialiasing: true });
        const scene = new BABYLON.Scene(engine);
  
        // Set the scene's clear color
        scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);
  
        // if (onClick) {
        //   const lastPointerPosition = new BABYLON.Vector2();
        //   let isDragging = false;
  
        //   scene.onPointerObservable.add(
        //     (eventData) => {
        //       switch (eventData.type) {
        //         case BABYLON.PointerEventTypes.POINTERDOWN:
        //           isDragging = false;
        //           lastPointerPosition.set(
        //             eventData.event.clientX,
        //             eventData.event.clientY
        //           );
        //           break;
        //         case BABYLON.PointerEventTypes.POINTERUP:
        //           if (isDragging || eventData.event.button !== 0) return;
        //           onClick(
        //             eventData.pickInfo?.hit && eventData.pickInfo.pickedMesh
        //           );
        //           // console.log(
        //           //   eventData.pickInfo.pickedMesh,
        //           //   "lllllllllllllllllllllll"
        //           // );
        //           if (eventData.pickInfo.pickedMesh) {
        //             let new_modelMesh = getRootParent(
        //               eventData.pickInfo.pickedMesh
        //             );
        //             if (new_modelMesh != modelMesh) {
        //               update_modelMesh(new_modelMesh);
        //               focus();
        //             }
        //           }
        //           break;
        //         case BABYLON.PointerEventTypes.POINTERMOVE:
        //           if (isDragging) break;
        //           const distance = lastPointerPosition
        //             .subtract(
        //               new BABYLON.Vector2(
        //                 eventData.event.clientX,
        //                 eventData.event.clientY
        //               )
        //             )
        //             .length();
        //           if (distance > 8) isDragging = true;
        //           break;
        //       }
        //     },
        //     BABYLON.PointerEventTypes.POINTERDOWN +
        //       BABYLON.PointerEventTypes.POINTERUP +
        //       BABYLON.PointerEventTypes.POINTERMOVE
        //   );
        // }
  
        // 创建 ArcRotateCamera 相机
        const camera = new BABYLON.ArcRotateCamera(
          "Camera",
          -1.57,
          1.4,
          3.4,
          new BABYLON.Vector3(0, 0.9, 0),
          scene
        );
        camera.attachControl(canvas, true);
        camera.lowerRadiusLimit = 0.5;
        camera.upperRadiusLimit = 8;
        camera.wheelPrecision = 30;
        camera.panningInertia = 0;
        camera.panningSensibility = 350;
        camera.inertialRadiusOffset = 0;
        camera.minZ = 0.003;
  
        // 创建 Cylinder 形状的天空盒
        const skybox = BABYLON.MeshBuilder.CreateCylinder(
          "skybox",
          {
            height: 64,
            diameterTop: 64,
            diameterBottom: 64,
            tessellation: 64,
            subdivisions: 64,
          },
          scene
        );
        skybox.isPickable = false;
  
        //  const skyMaterial = new BABYLON.GradientMaterial("skybox/horizon", scene);
        //  skyMaterial.offset = 0;
        //  skyMaterial.scale = -0.01;
        //  skyMaterial.topColor.set(0.8, 0.8, 1);
        //  skyMaterial.bottomColor.set(1, 1, 1);
        //  skyMaterial.backFaceCulling = false;
        //  skyMaterial.disableLighting = true;
        //  skyMaterial.blockDirtyMechanism = true;
        //  skybox.material = skyMaterial;
  
        // createLightRing(scene, camera);
  
        // 设置高亮层
        const highlightLayer = new BABYLON.HighlightLayer("selected", scene, {
          isStroke: true,
        });
        highlightLayer.innerGlow = false;
        highlightLayer.outerGlow = true;
        const glowSize = 0.4;
        highlightLayer.blurHorizontalSize = glowSize;
        highlightLayer.blurVerticalSize = glowSize;
  
        const light = new BABYLON.HemisphericLight(
          "light",
          new BABYLON.Vector3(0, 1, 0),
          scene
        );
  
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
  
        const costumeMaterial = new BABYLON.StandardMaterial(
          `material/costume`,
          scene
        );
        costumeMaterial.diffuseColor.set(0.72, 0.81, 0.8);
        costumeMaterial.emissiveColor.set(0.1, 0.1, 0.1);
        costumeMaterial.specularPower = 500;
        costumeMaterial.blockDirtyMechanism = true;
        let material = costumeMaterial;
        // var pbrMaterial = new BABYLON.PBRMaterial("pbrMaterial", scene);
        // https://poster-phi.vercel.app/wearable/AvatarShape_B.glb
        BABYLON.SceneLoader.ImportMesh(
          null,
          `https://poster-phi.vercel.app/wearable/`,
          "AvatarShape_B.glb",
          scene,
          (meshes, particleSystems, skeletons) => {
            // BABYLON.SceneLoader.ImportMesh(null, `../`, "avatar.glb", scene, (meshes, particleSystems, skeletons) => {
            let costumeMesh, bodyMesh, skeletonRoot;
  
            // feet hands head lbody    ubody 8
            costumeMesh = meshes[0];
            const costumeId = 1;
            costumeMesh.id = `costume/${costumeId}`;
            costumeMesh.visibility = 0;
            costumeMesh.isPickable = false;
            // var mesh = meshes[3];
            // mesh.material = material;
            // mesh.isPickable = false;
  
            // 遍历模型的每个部分，并应用材质
            for (var i = 1; i < meshes.length; i++) {
              var mesh = meshes[i];
              // mesh.material = pbrMaterial;
              // mesh.scaling.set(0.9, 0.9, 0.9)
              // avatar_turn_around = Math.PI
              // mesh.rotation.z = avatar_turn_around
              mesh.isPickable = false;
            }
            // this.applySkin();
            skeletonRoot = skeletons[0];
            //  window["skeleton"] = skeletonRoot;
            
            skeleton.current = skeletonRoot;
          
            // setskeleton(skeletonRoot)
              if(skeleton.current){
                onLoadCostume()
  
              }
            const bones = skeletonRoot.bones.filter(
              (bone) => !bone.name.match(/index/i)
            );
            const firstBone = bones[0];
            const boneTransformNode = firstBone.getTransformNode();
  
            if (boneTransformNode !== null) {
              boneTransformNode.rotate(BABYLON.Axis.Y, Math.PI);
            }
            const boneMeshes = [];
            let bones_index = 0;
  
            bones.forEach((bone:any) => {
              const boneSphere = BABYLON.MeshBuilder.CreateSphere(
                "bonesphere",
                {
                  diameter: 6,
                },
                scene
              );
              boneMeshes.push(boneSphere);
              boneSphere.id = "bonesphere";
              let parts_i = get_avatar_bone(bones_index);
              if (parts_i != 0) {
                if (parts_i === 2) {
                  const newDiameter = 0.5; // 新的直径
                  boneSphere.scaling = new BABYLON.Vector3(
                    newDiameter,
                    newDiameter,
                    newDiameter
                  );
                }
                let addToMesh = meshes[parts_i];
                bone.parent_mesh_name = addToMesh.name;
                //  var rotationQuaternion = new BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
                var rotationQuaternion = BABYLON.Quaternion.RotationAxis(
                  new BABYLON.Vector3(1, 0, 0),
                  Math.PI / 2
                );
                // 应用旋转变换到骨骼
                bone.rotate(rotationQuaternion, BABYLON.Space.LOCAL);
                boneSphere.attachToBone(bone, addToMesh);
              }
              boneSphere.metadata = bone.name.replace(/^.+:/, "");
              const boneMaterial = new BABYLON.StandardMaterial("target", scene);
              boneMaterial.emissiveColor.set(1, 1, 1);
              boneMaterial.disableLighting = true;
              boneMaterial.alpha = 1;
              boneMaterial.blockDirtyMechanism = true;
              boneSphere.material = boneMaterial;
              boneSphere.renderingGroupId = 2;
              boneSphere.setEnabled(false);
              bones_index += 1;
            });
          }
        );
        
        return scene;
      };
      const scene = createScene();
  
      // 坐标向量
    
  
   
      const get_avatar_bone = function(index:any) {
        // feet hands head lbody    ubody 8
        if (index < 3 || (5 <= index && index < 7)) {
          return 4;
        } else if ((3 <= index && index < 5) || (7 <= index && index < 9)) {
          return 1;
        } else if ((9 <= index && index < 15) || (32 <= index && index < 36)) {
          return 8;
        } else if ((15 <= index && index < 32) || (36 <= index && index < 52)) {
          return 2;
        } else if (index === 53 || index === 52) {
          return 3;
        } else {
          return 0;
        }
      }
  
      // 模型高亮层
      const layer = function () {
        var e, t;
        return (t =
          (e = scene) === null || e === void 0
            ? void 0
            : e.getHighlightLayerByName("selected")) !== null && t !== void 0
          ? t
          : null;
      }
  
      const get_avatar = function (meshName:any) {
        
        if (!scene) return null;
        return scene.getMeshByName(meshName);
      };
      // get bones info
      const bonespheres = function () {
        var e, t;
        return (t =
          (e = scene) === null || e === void 0
            ? void 0
            : e.getMeshesById("bonesphere")) !== null && t !== void 0
          ? t
          : null;
      };
  
      // hide bones
      const hideBoneSpheres = function () {
        var e;
        (e = bonespheres()) === null || e === void 0
          ? void 0
          : e.forEach((e) => {
              e.setEnabled(false);
            });
      };
      const onDrop = function () {
        hideBoneSpheres(); // 隐藏骨骼球体
        // 异步添加可穿戴物品到装饰中
        if (!targetBone.current) {
          console.log("no Bone");
          return;
        }
        // 获取被拖放的可穿戴物品
        const droppedWearable = getDroppedWearable();
        if (!droppedWearable) {
          console.warn("no wearable"); // 没有可穿戴物品，打印警告信息
          return;
        }
  
        // // 判断是否能够将可穿戴物品添加到装饰中
        // if (!canAdd(droppedWearable)) {
        //     showSnackbar("Unable to add to costume", "Warning"); // 显示消息提示，无法添加到装饰中
        //     return;
        // }
  
        addAttachment(droppedWearable, targetBone.current)
          // .then(() => {})
          // .catch((error) => {
          //   console.error("Error adding attachment:", error);
          // });
  
        renderModel();
      }
     
  
  
  
      const get_GizmoManager =   function () {
        const gizmoManager = new BABYLON.GizmoManager(scene, 3.5);
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = true;
        gizmoManager.scaleGizmoEnabled = false;
  
        gizmoManager.boundingBoxGizmoEnabled = true;
        gizmoManager.usePointerToAttachGizmos = false;
        if (
          !gizmoManager.gizmos.positionGizmo ||
          !gizmoManager.gizmos.rotationGizmo
        )
          throw new Error("gizmos not found");
        gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
          () => updateAllPositionValue(null)
        );
        gizmoManager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
          () => updateAllPositionValue(null)
        );
        gizmoManager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
          () => updateAllPositionValue(null)
        );
  
        gizmoManager.gizmos.rotationGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
          () => updateAllPositionValue(null)
        );
        gizmoManager.gizmos.rotationGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
          () => updateAllPositionValue(null)
        );
        gizmoManager.gizmos.rotationGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
          () => updateAllPositionValue(null)
        );
  
        gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh =
          false;
        gizmoManager.boundingBoxDragBehavior.disableMovement = true;
  
        if (gizmoManager.gizmos.boundingBoxGizmo) {
          gizmoManager.gizmos.boundingBoxGizmo.scaleRatio = 0.8;
          gizmoManager.gizmos.boundingBoxGizmo.scaleBoxSize = 0.03;
          gizmoManager.gizmos.boundingBoxGizmo.rotationSphereSize = 0;
          gizmoManager.gizmos.boundingBoxGizmo.onScaleBoxDragEndObservable.add(
            () => updateAllPositionValue(null)
          );
        }
  
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = false;
        gizmoManager.boundingBoxGizmoEnabled = false;
        return gizmoManager;
      }
      const gizmoManager = get_GizmoManager();
      const addAttachment =  function (wearable:any, bone:any) {
      
       
        let the_wearable = getDroppedWearable();
      
        if (modelList[the_wearable.hashValue]) {
          return;
        }
  
        const defaultScale = 0.5;
        const updatedCostume:any = Object.assign({}, costume);
      
        const uniqueId  = crypto.randomUUID();
  
        const attachmentInfo:any = {
          name: wearable.name,
          hash:wearable.hash,
          hashValue:wearable.hashValue,
          wearable_id:
            typeof wearable.token_id === "number"
              ? wearable.token_id
              : parseInt(wearable.token_id, 10),
          collection_address: wearable.collection_address || undefined,
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scaling: [defaultScale, defaultScale, defaultScale],
          bone: bone,
          category: wearable.category,
          uuid: uniqueId,
          type:wearable.type,
          token_id: wearable.token_id,
        };
  
        if (!updatedCostume.attachments) {
          updatedCostume.attachments = [];
        }
    
        updatedCostume.attachments.push(attachmentInfo);
        const updatedCostumeD = { ...costume }; 
        
        setCostume(updatedCostumeD); 
     
        
        attachmentId.current = uniqueId;
  
      }
      const bone =  function (e:any) {
  
        if (!skeleton.current) return null;
  
        const t = skeleton.current.getBoneIndexByName(e);
  
        if (t == -1) {
          console.error(`Bad bone name "${e}"`);
          return null;
        }
        
        return skeleton.current.bones[t];
      }
      const renderModel = async function () {
     
        await new Promise((resolve) => {
          let the_wearable = getDroppedWearable();

          if (modelList[the_wearable.hashValue]) {
            
            return;
          }
  
          const the_bone = bone(targetBone.current);
  
          if (!the_bone) {
            console.log("no Bone");
            return;
          }
          let the_avatar = get_avatar(the_bone.parent_mesh_name);
  
          if (the_avatar) {
            const origin = new BABYLON.TransformNode("Node/wearable", scene);
  
            const shaderMaterial = new BABYLON.StandardMaterial(
              "wearable",
              scene
            );
            shaderMaterial.emissiveColor.set(0.3, 0.3, 0.3);
            shaderMaterial.diffuseColor.set(1, 1, 1);
            shaderMaterial.blockDirtyMechanism = true;
            // .token_id===the_wearable.token_id
            modelMesh = new BABYLON.Mesh("utils/wearable_dcl", scene);
            modelMesh.material = shaderMaterial;
            modelMesh.isPickable = true;
            modelMesh.checkCollisions = false;
            modelMesh.scaling.set(100, 100, 100);
            modelMesh.hashValue = the_wearable.hashValue
            modelMesh.uuid = attachmentId.current;
            
            modelMesh.rotationQuaternion = null;
            modelMesh.setParent(origin);
            origin.attachToBone(the_bone, the_avatar);
            BABYLON.SceneLoader.ImportMesh(
              null,
              "https://peer.decentraland.org/content/contents/",
              the_wearable.hashValue,
              scene,
              function (wearableMesh) {
  
                
                wearableMesh[0].parent = modelMesh;
                var oldPostion =
                  modelMesh.getBoundingInfo().boundingBox.centerWorld;
  
                last_rotation = [];
  
                if (
                  the_wearable?.position &&
                  the_wearable?.rotation &&
                  the_wearable?.scaling
                ) {
                  updateAllPositionValue("load_model_json");
                } else {
                  updateAllPositionValue(null);
                }
                focus();
                modelList[the_wearable.hashValue]=true;
                resolve(null);
              },
              null,
              null,
              ".glb"
            );
          }
        });
        setVoxMeshState(modelMesh);
      }
      // }


  
      // 生成wearables列表
     const renderWearables = function () {
        const collectibles = [];
  
      }
      renderWearables();
  
  
  
     const focus= function () {
        let lay = layer();
        const col = new BABYLON.Color3(0.7, 0.3, 1);
  
        if (lay && modelMesh) {
          lay.removeAllMeshes();
          // 获取根元素的所有子网格
          var childMeshes = modelMesh.getChildMeshes();
  
          // 遍历子网格数组
          for (var i = 0; i < childMeshes.length; i++) {
            var childMesh = childMeshes[i];
            lay.addMesh(childMesh, col);
            // 在这里对每个子网格进行操作，比如设置材质、位置、旋转等
          }
        }
     
      }
  
     const updateAllPositionValue = function (type:any) {
       
        if (!modelMesh) {
       
    
            
        } else if (type === "change_model_mesh") {
       
        } else {
        
          if (type === "load_model_json") {
            let the_wearable = getDroppedWearable();
  
            modelMesh.position.x = parseFloat(the_wearable.position[0]);
            modelMesh.position.y = parseFloat(the_wearable.position[1]);
            modelMesh.position.z = parseFloat(the_wearable.position[2]);
  
            modelMesh.rotation.x = parseFloat(the_wearable.rotation[0]);
            modelMesh.rotation.y = parseFloat(the_wearable.rotation[1]);
            modelMesh.rotation.z = parseFloat(the_wearable.rotation[2]);
  
            modelMesh.scaling.x = parseFloat(the_wearable.scaling[0]);
            modelMesh.scaling.y = parseFloat(the_wearable.scaling[1]);
            modelMesh.scaling.z = parseFloat(the_wearable.scaling[2]);
          }
         
  
          modelMesh.rotationQuaternion = null;
  
        }
  
      
            
      }

       // 获取 拖放的wearable
   const getDroppedWearable = function () {
    let droppedWearableValue = windowVal["droppedWearable"];
    
    return droppedWearableValue !== null && droppedWearableValue !== undefined
      ? droppedWearableValue
      : null;
  }
  
 
  
     
      engine.runRenderLoop(function () {
        scene.render();
      });
  
      window.addEventListener("resize", function () {
        engine.resize();
      });
  
  
  
     
    }
    }, []);
  
  
    
  
  
    return (
      <>
        <div
          id="gizmos"
          className="active"
     
        >
          <canvas id="renderCanvasDcl" className={style.canvas}></canvas>
          {/* <div style={{ position: "absolute", top: "10px" ,display:"none"}}>
            <button className={style.btn} id="gizmo-position">
              Position
            </button>
            <button className={style.btn} id="gizmo-rotation">
              Rotation
            </button>
            <button className={style.btn} id="gizmo-scale">
              Scale
            </button>
          </div> */}
          {/* <div style={{ position: "absolute", right: "10px", top: "10px" ,display:"none"}}>
            <div className="editor-field position">
              <label>Position</label>
              <div className="fields">
                <input
                  id="position[x]"
                  type="number"
                  step="1"
                  title="x"
                  // value={editNumPoX}
                  value={editNumPo.x}
                  onInput={(event) => {
                      const inputElement = event.target as HTMLInputElement;
                    updatePosition("position", 0, inputElement.value);
                  }}
                  onChange={onChangeEdiumX}
                />
                <input
                  id="position[y]"
                  type="number"
                  step="1"
                  title="y"
                  // value={editNumPoY}
                  value={editNumPo.y}
                  onChange={onChangeEdiumY}
                  onInput={(event) => {
                      const inputElement = event.target as HTMLInputElement;
                    updatePosition("position", 1, inputElement.value);
                  }}
                />
                <input
                  id="position[z]"
                  type="number"
                  step="1"
                  title="z"
                  value={editNumPo.z}
                  onInput={(event) => {
                      const inputElement = event.target as HTMLInputElement;
                    updatePosition("position", 2, inputElement.value);
                  }}
                  onChange={onChangeEdiumZ}
                />
              </div>
            </div>
            <div className="editor-field rotation">
              <label>Rotation</label>
              <div className="fields">
                <input
                  id="rotation[x]"
                  type="number"
                  step="1"
                  title="x"
                  value={editNumRoX.x}
                  onInput={(event) => {
                      const inputElement = event.target as HTMLInputElement;
                    updatePosition("rotation", 0, inputElement.value);
                  }}
                  onChange={onChangeEdiumRoX}
                />
                <input
                  id="rotation[y]"
                  type="number"
                  step="1"
                  title="y"
                  value={editNumRoX.y}
                  onInput={(event) => {
                      const inputElement = event.target as HTMLInputElement;
                    updatePosition("rotation", 1, inputElement.value);
                  }}
                  onChange={onChangeEdiumRoY}
                />
                <input
                  id="rotation[z]"
                  type="number"
                  step="1"
                  title="z"
                  value={editNumRoX.z}
                  onInput={(event) => {
                      const inputElement = event.target as HTMLInputElement;
                    updatePosition("rotation", 2, inputElement.value);
                  }}
                  onChange={onChangeEdiumRoZ}
                />
              </div>
            </div>
            <div className="editor-field scale-all">
              <label>Scale</label>
              <div className="fields">
                <input
                  id="scale[x]"
                  type="number"
                  step="1"
                  title="all"
                  value={editNumSaX.x}
                  onInput={(event) => {
                    
                        const inputElement = event.target as HTMLInputElement;
                    updatePosition("scale", 0, inputElement.value);
                  }}
                  onChange={onChangeEdiumSaX}
                />
                <input
                  id="scale[y]"
                  type="number"
                  step="1"
                  title="all"
                  value={editNumSaX.y}
                  onInput={(event) => {
                      const inputElement = event.target as HTMLInputElement;
                    updatePosition("scale", 1, inputElement.value);
                  }}
                  onChange={onChangeEdiumSaY}
                />
                <input
                  id="scale[z]"
                  type="number"
                  step="1"
                  title="all"
                  value={editNumSaX.z}
                  onInput={(event) => {
                      const inputElement = event.target as HTMLInputElement;
                    updatePosition("scale", 2, inputElement.value);
                  }}
                  onChange={onChangeEdiumSaZ}
                />
         
              </div>
            </div>
            <div>
              <button className={style.buton} id="mesh_dispose">
                Remove
              </button>
              <button className={style.buton} id="download">
                Download
              </button>
              <button className={style.buton} id="upload">
                Upload
              </button>
            </div>
            <div id="wearable_list"></div>
          </div> */}
        </div>
      </>
    );
  }