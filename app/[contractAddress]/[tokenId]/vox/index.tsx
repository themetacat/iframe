import React, { useState, useEffect } from "react";
import style from "./index.module.css";
import ndarray from "ndarray";
import ndarrayFill from "ndarray-fill";
import aoMesher from "ao-mesher";
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import { getModelInfo,setModelInfo,getBagsDetail} from "../../../../service";

import { useRouter ,useParams} from 'next/navigation';


import "babylonjs-materials";
import vox from "vox.js";



export default function VoxFiled() {
  const router = useParams();

  const [editNum, setEditNum] = useState(null);
 
  const [editNumPo, setEditNumPo] = useState({ x: 0, y: 0 ,z:0} as any);
  const [editNumRoX, setEditNumRoX] = useState({ x: 0, y: 0 ,z:0} as any);
  
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
  const all_last_rotation:any = React.useRef({});
  let modelList:any = {};
  // const uniqueId  = crypto.randomUUID();
  const attachmentId = React.useRef('');
  const iframeRef = React.useRef(null);

  let skeleton:any = null;
  function num(value:any) {
    // console.log(value,'value');
    
    const t = parseFloat(value);
    return t;
    // return t.toString() === value.toString() ? t : null;
  }

  const get_vox_data = (requestConfig:any, voxMesh:any) => {
    var parser = new vox.Parser();
    
    parser
      .parse(
        
        // "https://www.voxels.com"+requestConfig.url
          // "https://wearable.vercel.app/"+requestConfig.url.hash+".vox"
          "https://wearable.vercel.app/"+requestConfig.voxHash+".vox"
      )
      .then(function (parsed:any) {
        // console.log(parsed, "有没有");

        let size = parsed.size;

        size.x += 2;
        size.y += 2;
        size.z += 2;

        let field = ndarray(new Uint16Array(size.x * size.y * size.z), [
          size.x,
          size.y,
          size.z,
        ]);
        ndarrayFill(field, (x:any, y:any, z:any) => 0);

        parsed.voxels.forEach((row:any) => {
          let { x, y, z, colorIndex } = row;
          field.set(x, y, z, colorIndex + (1 << 15));
        });

        const vertData = aoMesher(field);

        let face = 0;
        let i = 0;
        // 大小
        let s = 0.01;

        const hue = 0;
        const positions = [];
        const indices = [];
        const normals = [];
        const colors = [];

        // Identity function, use these to nudge the mesh as needed
        const fx = (x:any) => x;
        const fy = (y:any) => y;
        const fz = (z:any) => z;

        while (i < vertData.length) {
          const textureIndex = vertData[i + 7];

          // const color = new BABYLON.Color3(1, 1, 0)
          // var a = new BABYLON.Vector3(vertData[i + 0], vertData[i + 1], vertData[i + 2])

          positions.push(fx(vertData[i + 0] * s));
          positions.push(fy(vertData[i + 1] * s));
          positions.push(fz(vertData[i + 2] * s));
          i += 8;

          // var b = new BABYLON.Vector3(vertData[i + 0], vertData[i + 1], vertData[i + 2])
          positions.push(fx(vertData[i + 0] * s));
          positions.push(fy(vertData[i + 1] * s));
          positions.push(fz(vertData[i + 2] * s));
          i += 8;

          // var c = new BABYLON.Vector3(vertData[i + 0], vertData[i + 1], vertData[i + 2])
          positions.push(fx(vertData[i + 0] * s));
          positions.push(fy(vertData[i + 1] * s));
          positions.push(fz(vertData[i + 2] * s));
          i += 8;

          // Face index
          indices.push(face + 0, face + 2, face + 1);

          const intensity = 0.5;
          const offset = 0.4;
          let color = new BABYLON.Color3(
            parsed.palette[textureIndex].r / 255,
            parsed.palette[textureIndex].g / 255,
            parsed.palette[textureIndex].b / 255
          );

          colors.push(
            color.r * ((vertData[i - 24 + 3] / 255) * intensity + offset)
          );
          colors.push(
            color.g * ((vertData[i - 24 + 3] / 255) * intensity + offset)
          );
          colors.push(
            color.b * ((vertData[i - 24 + 3] / 255) * intensity + offset)
          );
          colors.push(1);

          colors.push(
            color.r * ((vertData[i - 16 + 3] / 255) * intensity + offset)
          );
          colors.push(
            color.g * ((vertData[i - 16 + 3] / 255) * intensity + offset)
          );
          colors.push(
            color.b * ((vertData[i - 16 + 3] / 255) * intensity + offset)
          );
          colors.push(1);

          colors.push(
            color.r * ((vertData[i - 8 + 3] / 255) * intensity + offset)
          );
          colors.push(
            color.g * ((vertData[i - 8 + 3] / 255) * intensity + offset)
          );
          colors.push(
            color.b * ((vertData[i - 8 + 3] / 255) * intensity + offset)
          );
          colors.push(1);

          face += 3;
        }

        requestConfig.positions = positions;
// console.log(positions);

        requestConfig.indices = indices;
        requestConfig.colors = colors;
        // return requestConfig
        let {
          positions: t,
          indices: r,
          colors: co,
          colliderPositions: ca,
          colliderIndices: cc,
        } = requestConfig;
        const vertexData = new BABYLON.VertexData();

        vertexData.positions = t;
        vertexData.indices = r;
        vertexData.colors = co;
        // console.log(t);
        // console.log(r)
        // console.log(co);
        // BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        // vertexData.normals = normals;

        vertexData.applyToMesh(voxMesh);
        // voxMesh.position.y = 0.926;
        // voxMesh.position.y = 1.509;

      


        voxMesh.checkCollisions = false;
        voxMesh.refreshBoundingInfo();
        return voxMesh;
      });
    
      // (window as any).get_vox_data = get_vox_data;

  };
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
      BABYLON.SceneLoader.ImportMesh(
        null,
        `https://www.voxels.com/models/`,
        "avatar.glb",
        scene,
        (meshes, particleSystems, skeletons) => {
          let costumeMesh, bodyMesh:any, skeletonRoot;
          costumeMesh = meshes[0];
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

      return scene;
    };
    const scene = createScene();

    
    engine.runRenderLoop(function () {
      scene.render();
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });

    async function onLoadCostume() {
      // console.log(router.query.tokenID);
// console.log(getModelInfo(19));
      const getModelInfoData = getModelInfo(router?.tokenId)
      
      getModelInfoData.then(async(getModelInfoItem)=>{
        if (JSON.stringify(getModelInfoItem.data) === '{}') {
          console.log('错误');
        }else{
        const data = getModelInfoItem.data;
        // const data = await response.json();
  // console.log(data,'data');
  // if(getModelInfoItem.data){
    
  // }
        // 在这里使用从JSON文件中读取到的数据
        const attachments = data.attachments;
  
        for (let att  of attachments) {
          // (window as any).droppedWearable = att;
          windowVal['droppedWearable']= att
          // (window as any).droppedWearable.token_id = att.token_id
          windowVal['droppedWearable'].token_id= att.token_id
            targetBone = att.bone;
            attachmentId.current = att.uuid
            all_last_rotation.current[attachmentId.current] = att.rotation
            
            // costume.attachments.push(att)
            renderVoxModel();
  
        }
        // onClick(null)
        }
      })
     
  }
  function getWearableURL(droppedWearable:any) {
    // ${chain_info[droppedWearable.chain_id]}
    const hexValue = droppedWearable.voxHash;
    // const decimalValue = parseInt(hexValue, 16);
    // return `/c/v2/polygon/${
    //   droppedWearable.collection_address
    // }/${decimalValue}/vox`;
    return `https://wearable.vercel.app/${hexValue}.vox`
  } 

  const get_avatar = function () {
    if (!scene) return null;
    return scene.getMeshByName("avatar");
  };

  function renderVoxModel() {
     
    let droppedWearable = getDroppedWearable()

    if(modelList[droppedWearable.gateway]){
      // found = true;
      return
    }

    const shaderMaterial = new BABYLON.StandardMaterial("wearable", scene);
    shaderMaterial.emissiveColor.set(.3, .3, .3);
    shaderMaterial.diffuseColor.set(1, 1, 1);
    shaderMaterial.blockDirtyMechanism = true;

   let wearable_url = getWearableURL(droppedWearable)

    const requestConfig = {
        renderJob: 1,
        url: wearable_url,
        token_id: droppedWearable.token_id,
        voxHash:droppedWearable.voxHash
    };

    voxMesh = new BABYLON.Mesh("utils/vox-box", scene);
    voxMesh.material = shaderMaterial;
    voxMesh.isPickable = true;
    voxMesh.checkCollisions = false;
    voxMesh.gateway=droppedWearable.gateway
    voxMesh.scaling.set(0.5, 0.5, 0.5);
    const origin = new BABYLON.TransformNode("Node/wearable", scene);

    voxMesh.setParent(origin);
    origin.rotation.x = -Math.PI / 2;

    const the_bone = bone(targetBone);
    if (!the_bone) {
        console.log('no Bone');
        return
    }
    if (get_avatar()) {
        origin.attachToBone(the_bone, get_avatar() as any);
        last_rotation = {}
        if (droppedWearable?.position && droppedWearable?.rotation && droppedWearable?.scaling) {
            updateAllPositionValue('load_model_json')
        } else {
            updateAllPositionValue(null)
        }
        focus()
        modelList[droppedWearable.gateway]=true
        
       get_vox_data(requestConfig, voxMesh)
    }

    voxMesh.uuid = attachmentId.current
setVoxMeshState(voxMesh)
}

function bone(e:any) {
      
  if (!skeleton) return null;
  const t = skeleton.getBoneIndexByName(`mixamorig:${e}`);

  if (t == -1) {
    console.error(`Bad bone name "${e}"`);
    return null;
  }
  return skeleton.bones[t];
}
    onLoadCostume()
   // 坐标向量
    const gizmoManager = get_GizmoManager();
    function get_GizmoManager() {
        const gizmoManager = new BABYLON.GizmoManager(scene, 3.5);
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = true;
        gizmoManager.scaleGizmoEnabled = false;
  
        gizmoManager.usePointerToAttachGizmos = false;
        gizmoManager.boundingBoxGizmoEnabled = true;
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

      function updateAllPositionValue(type:any) {
     
  
        if (!voxMesh) {
        
        } else if (type === 'change_model_mesh') {
  
         
        } else {
         
          if (type === 'load_model_json') {
          let  the_wearable = getDroppedWearable()
  
            voxMesh.position.x = parseFloat(the_wearable.position[0]);
            voxMesh.position.y = parseFloat(the_wearable.position[1]);
            voxMesh.position.z = parseFloat(the_wearable.position[2]);
  
            voxMesh.rotation.x = parseFloat(the_wearable.rotation[0]);
            voxMesh.rotation.y = parseFloat(the_wearable.rotation[1]);
            voxMesh.rotation.z = parseFloat(the_wearable.rotation[2]);
  
            voxMesh.scaling.x = parseFloat(the_wearable.scaling[0]);
            voxMesh.scaling.y = parseFloat(the_wearable.scaling[1]);
            voxMesh.scaling.z = parseFloat(the_wearable.scaling[2]);
        }
       
        voxMesh.rotationQuaternion = null;
  
     
        if (!gizmoManager.boundingBoxGizmoEnabled) {
                last_rotation = {}
            }
  
    
        }
        
        const refValueX = voxMesh?.rotation.x; // 示例字符串值
           const refValueY = voxMesh?.rotation.y; // 示例字符串值
           const refValueZ = voxMesh?.rotation.z; // 示例字符串值
        const fixedValueX = parseFloat(refValueX).toFixed(2);
        const fixedValueY = parseFloat(refValueY).toFixed(2);
        const fixedValueZ = parseFloat(refValueZ).toFixed(2);
       
        
      }
  
    },[])

    //     // 获取 拖放的wearable
    function getDroppedWearable() {
        // let droppedWearableValue = window["droppedWearable"];
        let droppedWearableValue = windowVal["droppedWearable"];
        return droppedWearableValue !== null && droppedWearableValue !== undefined
          ? droppedWearableValue
          : null;
      }

  return (
    <>
   
      <div
        id="gizmos"
        className="active"
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