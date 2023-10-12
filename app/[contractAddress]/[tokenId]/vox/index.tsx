import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import ndarray from "ndarray";
// import ndarray from 'https://cdn.jsdelivr.net/npm/ndarray@1.0.19/+esm'
import ndarrayFill from "ndarray-fill";
import aoMesher from "ao-mesher";
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import { getModelInfo,setModelInfo,getBagsDetail} from "../../../../service";
// console.log(a,666666);
import Router, { useRouter } from "next/router";
// import avatarModel from './41.vox';
// console.log(avatarModel,6666);

import "babylonjs-materials";
import vox from "vox.js";



export default function VoxFiled() {
// const router = useRouter();

  // eslint-disable-next-line @next/next/no-sync-scripts
  <>
    {/* <script src="https://cdn.babylonjs.com/babylon.js"></script> */}
    {/* <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script> */}
    {/* <script src="https://cdn.babylonjs.com/materialsLibrary/babylonjs.materials.min.js"></script> */}
    {/* <script src="https://cdn.jsdelivr.net/npm/vox.js@1.1.0/build/vox.min.js"></script> */}
  </>;
  const [editNum, setEditNum] = useState(null);
  // const [editNumPoY, setEditNumPoY] = useState(null);
  // const [editNumPoX, setEditNumPoX] = useState(null);
  // const [editNumPoZ, setEditNumPoZ] = useState(null);
  // const [editNumRoX, setEditNumRoX] = useState(null);
  // const [editNumRoY, setEditNumRoY] = useState(null);
  // const [editNumRoZ, setEditNumRoZ] = useState(null);
  // const [editNumSaX, setEditNumSaX] = useState(null);
  // const [editNumSaY, setEditNumSaY] = useState(null);
  // const [editNumSaZ, setEditNumSaZ] = useState(null);
  const [editNumPo, setEditNumPo] = useState({ x: 0, y: 0 ,z:0} as any);
  // const [editNumPoZ, setEditNumPoZ] = useState(0);
  const [editNumRoX, setEditNumRoX] = useState({ x: 0, y: 0 ,z:0} as any);
  // const [editNumRoY, setEditNumRoY] = useState(0);
  // const [editNumRoZ, setEditNumRoZ] = useState(0);
  const [editNumSaX, setEditNumSaX] = useState({ x: 1, y: 1 ,z:1} as any);
  const [getdroppedWearable, setGetdroppedWearable] = useState({});
  const [voxMeshState, setVoxMeshState] = useState(null);
  const [costume, setCostume] = useState({  
    // token_id: router.query.tokenID,
    // "wallet": "0x60ea96f57b3a5715a90dae1440a78f8bb339c92e",
    attachments: [],
    skin: null,
    // name: "Bag-"+router.query.tokenID,
  });
  // var voxMesh = null;
  let windowVal:any = {};
  var last_rotation :any= {};
  let voxMesh:any;
  let found = false;
  let targetBone:any = null;
  // 在页面加载时发送消息
  const all_last_rotation = React.useRef({});
  let modelList = {};
  // const uniqueId  = crypto.randomUUID();
  const attachmentId = React.useRef(null);
  const iframeRef = React.useRef(null);

  let skeleton = null;
  function num(value:any) {
    // console.log(value,'value');
    
    const t = parseFloat(value);
    return t;
    // return t.toString() === value.toString() ? t : null;
  }
  useEffect(() => {
    const canvas = document.getElementById("renderCanvas");
    // console.log(canvas);

    const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
    const createScene = function () {
      const scene = new BABYLON.Scene(engine);


      // Set the scene's clear color
      scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);

      // 创建 ArcRotateCamera 相机
      const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        -1.57,
        1.4,
        2.4,
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

      // const skyMaterial = new BABYLON.GradientMaterial("skybox/horizon", scene);
      // skyMaterial.offset = 0;
      // skyMaterial.scale = -0.01;
      // skyMaterial.topColor.set(0.7, 0.7, 0.7);
      // skyMaterial.bottomColor.set(1, 1, 1);
      // skyMaterial.backFaceCulling = false;
      // skyMaterial.disableLighting = true;
      // skyMaterial.blockDirtyMechanism = true;
      // skybox.material = skyMaterial;

      // createLightRing(scene, camera)

      // 设置高亮层
      const highlightLayer = new BABYLON.HighlightLayer("selected", scene, {
        isStroke: true,
      });
      highlightLayer.innerGlow = false;
      highlightLayer.outerGlow = true;
      const glowSize = 0.2;
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
      costumeMaterial.diffuseColor.set(0.82, 0.81, 0.8);
      costumeMaterial.emissiveColor.set(0.1, 0.1, 0.1);
      costumeMaterial.specularPower = 1000;
      costumeMaterial.blockDirtyMechanism = true;
      let material = costumeMaterial;
    //   console.log(material, "material3366666");
    console.log(scene);
      BABYLON.SceneLoader.ImportMesh(
        null,
        `https://www.voxels.com/models/`,
        "avatar.glb",
        scene,
        (meshes, particleSystems, skeletons) => {
          let costumeMesh, bodyMesh:any, skeletonRoot;
          costumeMesh = meshes[0];
          console.log(costumeMesh);
          const costumeId = 1;
          costumeMesh.id = `costume/${costumeId}`;
          costumeMesh.visibility = 0;
          costumeMesh.isPickable = false;

          bodyMesh = meshes[1];
          bodyMesh.material = costumeMaterial;
          bodyMesh.isPickable = false;
          // this.applySkin();
          skeletonRoot = skeletons[0];
          // window["skeleton"] = skeletonRoot;
          skeleton = skeletonRoot;

          const bones = skeletonRoot.bones.filter(
            (bone) => !bone.name.match(/index/i)
          );
          const firstBone = bones[0];
          const boneTransformNode = firstBone.getTransformNode();

          if (boneTransformNode !== null) {
            boneTransformNode.rotate(BABYLON.Axis.Y, Math.PI);
          }

          const boneMeshes = [];
          bones.forEach((bone) => {
            const boneSphere = BABYLON.MeshBuilder.CreateSphere(
              "bonesphere",
              {
                diameter: 0.1,
              },
              scene
            );
            boneMeshes.push(boneSphere);
            boneSphere.id = "bonesphere";
            boneSphere.attachToBone(bone, bodyMesh);
            boneSphere.metadata = bone.name.replace(/^.+:/, "");
            const boneMaterial = new BABYLON.StandardMaterial("target", scene);
            boneMaterial.emissiveColor.set(1, 1, 1);
            boneMaterial.disableLighting = true;
            boneMaterial.alpha = 0.5;
            boneMaterial.blockDirtyMechanism = true;
            boneSphere.material = boneMaterial;
            boneSphere.renderingGroupId = 2;
            boneSphere.setEnabled(false);
          });
        }
      );
console.log(scene,666);

      return scene;
    };
    const scene = createScene();

    
    engine.runRenderLoop(function () {
      scene.render();
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });

    

    // onLoadCostume()
    // 坐标向量
    // const gizmoManager = get_GizmoManager();
    // function get_GizmoManager() {
    //     const gizmoManager = new BABYLON.GizmoManager(scene, 3.5);
    //     gizmoManager.positionGizmoEnabled = true;
    //     gizmoManager.rotationGizmoEnabled = true;
    //     gizmoManager.scaleGizmoEnabled = false;
  
    //     gizmoManager.usePointerToAttachGizmos = false;
    //     gizmoManager.boundingBoxGizmoEnabled = true;
    //     if (
    //       !gizmoManager.gizmos.positionGizmo ||
    //       !gizmoManager.gizmos.rotationGizmo
    //     )
    //       throw new Error("gizmos not found");
    //     gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
    //       () => updateAllPositionValue(null)
    //     );
    //     gizmoManager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
    //       () => updateAllPositionValue(null)
    //     );
    //     gizmoManager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
    //       () => updateAllPositionValue(null)
    //     );
  
    //     gizmoManager.gizmos.rotationGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
    //       () => updateAllPositionValue(null)
    //     );
    //     gizmoManager.gizmos.rotationGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
    //       () => updateAllPositionValue(null)
    //     );
    //     gizmoManager.gizmos.rotationGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
    //       () => updateAllPositionValue(null)
    //     );
  
    //     gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh =
    //       false;
  
    //     if (gizmoManager.gizmos.boundingBoxGizmo) {
    //       gizmoManager.gizmos.boundingBoxGizmo.scaleRatio = 0.8;
    //       gizmoManager.gizmos.boundingBoxGizmo.scaleBoxSize = 0.03;
    //       gizmoManager.gizmos.boundingBoxGizmo.rotationSphereSize = 0;
    //       gizmoManager.gizmos.boundingBoxGizmo.onScaleBoxDragEndObservable.add(
    //         () => updateAllPositionValue(null)
    //       );
    //     }
  
    //     const position = document.getElementById("gizmo-position");
    //     if (!position) throw new Error("positionGizmo not found");
    //     position.addEventListener("click", () => {
    //       gizmoManager.positionGizmoEnabled = true;
    //       gizmoManager.rotationGizmoEnabled = false;
    //       gizmoManager.boundingBoxGizmoEnabled = false;
    //     });
    //     const rotation = document.getElementById("gizmo-rotation");
    //     if (!rotation) throw new Error("rotationGizmo not found");
    //     rotation.addEventListener("click", () => {
    //       gizmoManager.positionGizmoEnabled = false;
    //       gizmoManager.rotationGizmoEnabled = true;
    //       gizmoManager.boundingBoxGizmoEnabled = false;
    //     });
    //     const scale = document.getElementById("gizmo-scale");
    //     if (!scale) throw new Error("scaleGizmo not found");
    //     scale.addEventListener("click", () => {
    //       if (voxMesh) {
    //         last_rotation['x'] = voxMesh.rotation.x
    //         last_rotation['y'] = voxMesh.rotation.y
    //         last_rotation['z'] = voxMesh.rotation.z
    //     }
    //       gizmoManager.positionGizmoEnabled = false;
    //       gizmoManager.rotationGizmoEnabled = false;
    //       gizmoManager.boundingBoxGizmoEnabled = true;
    //     });
    //     gizmoManager.positionGizmoEnabled = true;
    //     gizmoManager.rotationGizmoEnabled = false;
    //     gizmoManager.boundingBoxGizmoEnabled = false;
  
    //     return gizmoManager;
    //   }

    //   function updateAllPositionValue(type:any) {
    //     const position_x = document.getElementById(
    //       "position[x]"
    //     ) as HTMLInputElement;
    //     const position_y = document.getElementById(
    //       "position[y]"
    //     ) as HTMLInputElement;
    //     const position_z = document.getElementById(
    //       "position[z]"
    //     ) as HTMLInputElement;
  
    //     const rotation_x = document.getElementById(
    //       "rotation[x]"
    //     ) as HTMLInputElement;
    //     const rotation_y = document.getElementById(
    //       "rotation[y]"
    //     ) as HTMLInputElement;
    //     const rotation_z = document.getElementById(
    //       "rotation[z]"
    //     ) as HTMLInputElement;
  
    //     const scale_x = document.getElementById("scale[x]") as HTMLInputElement;
    //     const scale_y = document.getElementById("scale[y]") as HTMLInputElement;
    //     const scale_z = document.getElementById("scale[z]") as HTMLInputElement;
  
    //     if (!voxMesh) {
    //       position_x.value = (0.0).toString();
    //       position_y.value = (0.0).toString();
    //       position_z.value = (0.0).toString();
  
    //       rotation_x.value = (0.0).toString();
    //       rotation_y.value = (0.0).toString();
    //       rotation_z.value = (0.0).toString();
  
    //       scale_x.value = (0.5).toString();
    //       scale_y.value = (0.5).toString();
    //       scale_z.value = (0.5).toString();
    //       scale_z.value = 0.5.toString();
    //     } else if (type === 'change_model_mesh') {
  
    //         position_x.value = voxMesh.position.x.toFixed(2);
    //         position_y.value = voxMesh.position.y.toFixed(2);
    //         position_z.value = voxMesh.position.z.toFixed(2);
  
    //         scale_x.value = voxMesh.scaling.x.toFixed(2);
    //         scale_y.value = voxMesh.scaling.y.toFixed(2);
    //         scale_z.value = voxMesh.scaling.z.toFixed(2);
    //         voxMesh.rotationQuaternion = null;
    //         // rotation_x.value = voxMesh.rotation.x = last_rotation['x'] 
    //         // rotation_y.value = voxMesh.rotation.y = last_rotation['y']
    //         // rotation_z.value = voxMesh.rotation.z = last_rotation['z']
    //         rotation_x.value  = last_rotation[0];
    //         rotation_y.value  = last_rotation[1];
    //         rotation_z.value  = last_rotation[2];
    
    //         voxMesh.rotation.x=parseFloat(last_rotation[0])
    //         voxMesh.rotation.y=parseFloat(last_rotation[1])
    //         voxMesh.rotation.z=parseFloat(last_rotation[2])
    //     } else {
    //       // const rot = e=>Math.round(e * 1e3 * 180 / Math.PI) / 1e3;
    //       // const po_sc = e=>Math.round(e * 1e3) / 1e3;
  
    //       // [position_x.value, position_y.value, position_z.value] = voxMesh.position.asArray().map(po_sc);
    //       // [rotation_x.value, rotation_y.value, rotation_z.value] = voxMesh.position.asArray().map(po_sc);
    //       // [scale_x.value, scale_y.value, scale_z.value] = voxMesh.position.asArray().map(po_sc);
    //       // position_x.value = voxMesh.position.x.toFixed(2);
    //       // position_y.value = voxMesh.position.y.toFixed(2);
    //       // position_z.value = voxMesh.position.z.toFixed(2);
    //       // setEditNumPoY(voxMesh.position.y.toFixed(2))
    //       // setEditNumPoX(voxMesh.position.x.toFixed(2))
    //       // setEditNumPoZ(voxMesh.position.z.toFixed(2))
  
    //       // rotation_x.value = voxMesh.rotation.x.toFixed(2);
    //       // rotation_y.value = voxMesh.rotation.y.toFixed(2);
    //       // rotation_z.value = voxMesh.rotation.z.toFixed(2);
  
    //       // setEditNumRoX(voxMesh.rotation.x.toFixed(2))
    //       // setEditNumRoY(voxMesh.rotation.y.toFixed(2))
    //       // setEditNumRoZ(voxMesh.rotation.z.toFixed(2))
    //       // scale_x.value = voxMesh.scaling.x.toFixed(2);
    //       // scale_y.value = voxMesh.scaling.y.toFixed(2);
    //       // scale_z.value = voxMesh.scaling.z.toFixed(2);
    //       // setEditNumSaX(voxMesh.scaling.x.toFixed(2))
    //       // setEditNumSaY(voxMesh.scaling.y.toFixed(2))
    //       // setEditNumSaZ(voxMesh.scaling.z.toFixed(2))
    //       // if (!type) {
    //       //   // 更新接口数据坐标
    //       //   updateAttachment();
    //       // }
    //       if (type === 'load_model_json') {
    //       let  the_wearable = getDroppedWearable()
  
    //         voxMesh.position.x = parseFloat(the_wearable.position[0]);
    //         voxMesh.position.y = parseFloat(the_wearable.position[1]);
    //         voxMesh.position.z = parseFloat(the_wearable.position[2]);
  
    //         voxMesh.rotation.x = parseFloat(the_wearable.rotation[0]);
    //         voxMesh.rotation.y = parseFloat(the_wearable.rotation[1]);
    //         voxMesh.rotation.z = parseFloat(the_wearable.rotation[2]);
  
    //         voxMesh.scaling.x = parseFloat(the_wearable.scaling[0]);
    //         voxMesh.scaling.y = parseFloat(the_wearable.scaling[1]);
    //         voxMesh.scaling.z = parseFloat(the_wearable.scaling[2]);
    //     }
    //     position_x.value = voxMesh.position.x.toFixed(2);
    //     position_y.value = voxMesh.position.y.toFixed(2);
    //     position_z.value = voxMesh.position.z.toFixed(2);
  
    //     scale_x.value = voxMesh.scaling.x.toFixed(2);
    //     scale_y.value = voxMesh.scaling.y.toFixed(2);
    //     scale_z.value = voxMesh.scaling.z.toFixed(2);
    //     voxMesh.rotationQuaternion = null;
  
    //     if ('x' as any  in last_rotation){
    //         rotation_x.value  = voxMesh.rotation.x = parseFloat(last_rotation['x']).toFixed(2) ;
    //     }else{
    //         rotation_x.value = voxMesh.rotation.x.toFixed(2);
    //     }
  
    //     if ('y' as any  in last_rotation){
    //         rotation_y.value = voxMesh.rotation.y = parseFloat(last_rotation['y']).toFixed(2);
    //     }else{
    //         rotation_y.value = voxMesh.rotation.y.toFixed(2);
    //     }
  
    //     if ('z' as any  in last_rotation){
    //         rotation_z.value = voxMesh.rotation.z = parseFloat(last_rotation['z']).toFixed(2);
    //     }else{
    //         rotation_z.value = voxMesh.rotation.z.toFixed(2);
    //     }
  
    //     if (!gizmoManager.boundingBoxGizmoEnabled) {
    //             last_rotation = {}
    //         }
  
    //     if (!type) {
    //         updateAttachment()
    //     }
    //     }
    //      setEditNumPo((prevEditNumPo:any) => ({
    //       ...prevEditNumPo,
    //       x:voxMesh? voxMesh.position.x.toFixed(2):0,
    //     }));
    //     setEditNumPo((prevEditNumPo:any) => ({
    //       ...prevEditNumPo,
    //       y:voxMesh? voxMesh.position.y.toFixed(2):0,
    //     }));
    //     setEditNumPo((prevEditNumPo:any) => ({
    //       ...prevEditNumPo,
    //       z: voxMesh?voxMesh.position.z.toFixed(2):0,
    //     }));
    //     const refValueX = voxMesh?.rotation.x; // 示例字符串值
    //        const refValueY = voxMesh?.rotation.y; // 示例字符串值
    //        const refValueZ = voxMesh?.rotation.z; // 示例字符串值
    //     const fixedValueX = parseFloat(refValueX).toFixed(2);
    //     const fixedValueY = parseFloat(refValueY).toFixed(2);
    //     const fixedValueZ = parseFloat(refValueZ).toFixed(2);
       
        
    //        setEditNumRoX((prevEditNumPo:any) => ({
    //          ...prevEditNumPo,
             
    //          x:voxMesh? fixedValueX:0 ,
    //          }));
    //         setEditNumRoX((prevEditNumPo:any) => ({
    //          ...prevEditNumPo,
    //          y: voxMesh? fixedValueY:0,
    //          }));
    //         setEditNumRoX((prevEditNumPo:any) => ({
    //          ...prevEditNumPo,
    //          z: voxMesh? fixedValueZ:0,
    //          }));
  
   
    //       setEditNumSaX((prevEditNumPo:any) => ({
    //          ...prevEditNumPo,
    //          x: voxMesh?voxMesh.scaling.x.toFixed(2):0,
    //         }));
    //       setEditNumSaX((prevEditNumPo:any) => ({
    //          ...prevEditNumPo,
    //          y: voxMesh?voxMesh.scaling.y.toFixed(2):0,
    //         }));
    //       setEditNumSaX((prevEditNumPo:any) => ({
    //          ...prevEditNumPo,
    //          z:voxMesh? voxMesh.scaling.z.toFixed(2):0,
    //         }));
    //   }
    },[])
        // 获取 拖放的wearable
    function getDroppedWearable() {
        // let droppedWearableValue = window["droppedWearable"];
        let droppedWearableValue = windowVal["droppedWearable"];
        return droppedWearableValue !== null && droppedWearableValue !== undefined
          ? droppedWearableValue
          : null;
      }

      function updateAttachment() {
        if (!voxMesh) {
            console.log('no voxMesh');
            return
        }
        
        
        // if (costume.attachments)
        console.log(costume.attachments);
        
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
    }
 
    const updatePosition =(type:any, index:any, value:any) => {
   
        voxMesh=voxMeshState;
        
        if (!voxMesh) {
          console.log("voxMesh is Null");
          return;
        }
        if (type === "position") {
          switch (index) {
            case 0:
              voxMesh.position.x = num(value);
              break;
            case 1:
              voxMesh.position.y = num(value);
              break;
            case 2:
              voxMesh.position.z = num(value);
              break;
          }
        } else if (type === "rotation") {
          switch (index) {
            case 0:
              voxMesh.rotation.x = num(value)
              last_rotation['x'] = voxMesh.rotation.x
              break
          case 1:
              voxMesh.rotation.y = num(value)
              last_rotation['y'] = voxMesh.rotation.y
              break
          case 2:
              voxMesh.rotation.z = num(value)
              last_rotation['z'] = voxMesh.rotation.z
              break
          }
        } else if (type === "scale") {
          // switch (index) {
          //   case 0:
          //     voxMesh.scaling.x = num(value);
          //     break;
          //   case 1:
          //     voxMesh.scaling.y = num(value);
          //     break;
          //   case 2:
          //     voxMesh.scaling.z = num(value);
          //     break;
          // }
          const scale_x = document.getElementById("scale[x]") as any;
          const scale_y = document.getElementById("scale[y]")as any;
          const scale_z = document.getElementById("scale[z]")as any;
          // voxMesh.scaling.set(num(scale_x.value), num(scale_y.value), num(scale_z.value))
          // console.log(voxMesh.scaling.x);
          // return
          
          voxMesh.scaling.x = num(scale_x.value)
          voxMesh.scaling.y = num(scale_y.value)
          voxMesh.scaling.z = num(scale_z.value)
    
          voxMesh.rotationQuaternion = null;
          const rotation_x = document.getElementById(
            "rotation[x]"
          ) as HTMLInputElement;
          const rotation_y = document.getElementById(
            "rotation[y]"
          ) as HTMLInputElement;
          const rotation_z = document.getElementById(
            "rotation[z]"
          ) as HTMLInputElement;
          voxMesh.rotation.x = parseFloat(rotation_x.value);
          voxMesh.rotation.y = parseFloat(rotation_y.value);
          voxMesh.rotation.z = parseFloat(rotation_z.value);
          // last_rotation['x'] = voxMesh.rotation.x
          // last_rotation['y'] = voxMesh.rotation.y
          // last_rotation['z'] = voxMesh.rotation.z
          last_rotation[0] = voxMesh.rotation.x;
          last_rotation[1] = voxMesh.rotation.y;
          last_rotation[2] = voxMesh.rotation.z;
        }
    
        
        
        updateAttachment();
      };


      const onChangeEdiumY =(event:any) => {
        // setEditNumPoY(event.target.value);
        setEditNumPo((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          y: event.target.value,
        }));
      };
      const onChangeEdiumX = (event:any) => {
        // setEditNumPoX(event.target.value);
        setEditNumPo((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          x: event.target.value,
        }));
      };
      const onChangeEdiumZ = (event:any) => {
        // setEditNumPoZ(event.target.value);
        setEditNumPo((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          z: event.target.value,
        }));
      };
      const onChangeEdiumRoX = (event:any) => {
        // setEditNumRoX(event.target.value);
        setEditNumRoX((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          x: event.target.value,
        }));
      };
      const onChangeEdiumRoY = (event:any) => {
       
        setEditNumRoX((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          y: event.target.value,
        }));
      };
      const onChangeEdiumRoZ = (event:any) => {
        // setEditNumRoZ(event.target.value);
        setEditNumRoX((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          z: event.target.value,
        }));
      };
      const onChangeEdiumSaX = (event:any) => {
        // setEditNumSaX(event.target.value);
        setEditNumSaX((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          x: event.target.value,
        }));
      };
      const onChangeEdiumSaY = (event:any) => {
        // setEditNumSaY(event.target.value);
        setEditNumSaX((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          y: event.target.value,
        }));
      };
      const onChangeEdiumSaZ = (event:any) => {
        // setEditNumSaZ(event.target.value);
        setEditNumSaX((prevEditNumPo:any) => ({
          ...prevEditNumPo,
          z: event.target.value,
        }));
      };
    

  return (
    <>
     {/* <iframe
      src="https://iframe-model-new.vercel.app/"
      ref={iframeRef}
    ></iframe> */}
      <div
        id="gizmos"
        className="active"
        style={{ position: "relative", }}
      >
        <canvas id="renderCanvas" className={style.canvas}></canvas>
        {/* <div style={{ position: "absolute", top: "10px" ,display:"none"}}>
          <button className={style.btn} id="gizmo-position">Position</button>
          <button className={style.btn} id="gizmo-rotation">Rotation</button>
          <button className={style.btn} id="gizmo-scale">Scale</button>
        </div> */}
        {/* <div style={{ position: "absolute", right: "10px", top: "10px" ,width:"30%",display:"none"}}>
          <div className="editor-field position">
            <label>Position</label>
            <div className="fields">
              <input
                id="position[x]"
                type="number"
                step="0.01"
                title="x"
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
                step="0.01"
                title="y"
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
                step="0.01"
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
                step="2"
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
                step="2"
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
                step="2"
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
                step="0.01"
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
                step="0.01"
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
                step="0.01"
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
            <button className={style.buton} id="mesh_dispose">Remove</button>
            <button className={style.buton} id="upload">Upload</button>
          </div>
          <div id="wearable_list"></div>
        </div> */}
      </div>
    </>
  );
}