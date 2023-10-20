import React, { useState, useEffect, useCallback } from "react";
import style from "./index.module.css";
import * as BABYLON from "babylonjs";
import "@babylonjs/loaders/glTF";
import "babylonjs-loaders";
import "babylonjs-materials";
import axios from "axios";
import { getModelInfo, setModelInfo, getBagsDetail, getDataHandle } from "../../../../service";

import { useRouter, useParams } from "next/navigation";

export default function DclContent() {
  const router = useParams();

  const [voxMeshState, setVoxMeshState] = useState(null);
  const [editNum, setEditNum] = useState(null);
  const [costumeData, setcostumeData] = useState(null);
  // const [    skeleton,setskeleton] = useState(null)
  const skeleton: any = React.useRef(null);

  const [costume, setCostume] = useState({
    //   token_id: router.query.tokenID,
    // "wallet": "0x60ea96f57b3a5715a90dae1440a78f8bb339c92e",
    attachments: [],
    skin: null,
    name: "Bag",
  });

  let windowVal: any = {};
  let hexChars: any = [];
  for (let i = 0; i < 256; ++i) {
    hexChars?.push((i + 256)?.toString(16)?.slice(1));
  }

  let modelMesh: any = null;
  let targetBone: any = React.useRef(null);
  let last_rotation: any = {};
  const all_last_rotation: any = React.useRef({});
  const routerData = React.useRef(null);
  let modelList: any = {};
  const attachmentId: any = React.useRef(null);

  function num(value: any) {
    const t = parseFloat(value);
    return t;
  }

  React.useEffect(() => {
    if (router?.tokenId) {
      setCostume((state) => {
        return { ...state, token_id: router?.tokenId };
      });
      const canvas = document.getElementById("renderCanvasDcl") as HTMLCanvasElement;
      const engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);

      const onLoadCostume = async function () {
        // const response = await fetch('./load1.json');
        // const data = await response.json();

        if (router) {
          const getModelInfoData = getModelInfo(router?.tokenId);

          getModelInfoData.then(async (getModelInfoItem) => {
            if (JSON.stringify(getModelInfoItem.data) === "{}") {
              console.log("错误");
            } else {
              const data = getModelInfoItem.data;
              const attachments = data.attachments;

              for (let att of attachments) {
                if (!att.type || att.type != "dcl") {
                  continue;
                }

                // (window as any).droppedWearable = att;
                windowVal["droppedWearable"] = att;
                targetBone.current = att.bone;
                attachmentId.current = att.uuid;
                all_last_rotation.current[attachmentId.current] = att.rotation;

                //   costume.attachments.push(att);
                await renderModel();
              }
            }
          });
        }
      };
      const createScene = function () {
        // var engine = new BABYLON.Engine(canvas, true, { antialiasing: true });
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(1, 1, 1, 1);
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

        // 设置高亮层
        const highlightLayer = new BABYLON.HighlightLayer("selected", scene, {
          isStroke: true,
        });
        highlightLayer.innerGlow = false;
        highlightLayer.outerGlow = true;
        const glowSize = 0.4;
        highlightLayer.blurHorizontalSize = glowSize;
        highlightLayer.blurVerticalSize = glowSize;

        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        const costumeMaterial = new BABYLON.StandardMaterial(`material/costume`, scene);
        costumeMaterial.diffuseColor.set(0.72, 0.81, 0.8);
        costumeMaterial.emissiveColor.set(0.1, 0.1, 0.1);
        costumeMaterial.specularPower = 500;
        costumeMaterial.blockDirtyMechanism = true;
        let material = costumeMaterial;
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

            // 遍历模型的每个部分，并应用材质
            for (var i = 1; i < meshes.length; i++) {
              var mesh = meshes[i];
              mesh.isPickable = false;
            }
            // this.applySkin();
            skeletonRoot = skeletons[0];

            skeleton.current = skeletonRoot;

            if (skeleton.current) {
              onLoadCostume();
            }
            const bones = skeletonRoot.bones.filter((bone) => !bone.name.match(/index/i));
            const firstBone = bones[0];
            const boneTransformNode = firstBone.getTransformNode();

            if (boneTransformNode !== null) {
              boneTransformNode.rotate(BABYLON.Axis.Y, Math.PI);
            }
            const boneMeshes = [];
            let bones_index = 0;

            bones.forEach((bone: any) => {
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
                  boneSphere.scaling = new BABYLON.Vector3(newDiameter, newDiameter, newDiameter);
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

      const get_avatar_bone = function (index: any) {
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
      };

      // 模型高亮层
      const layer = function () {
        var e, t;
        return (t =
          (e = scene) === null || e === void 0 ? void 0 : e.getHighlightLayerByName("selected")) !==
          null && t !== void 0
          ? t
          : null;
      };

      const get_avatar = function (meshName: any) {
        if (!scene) return null;
        return scene.getMeshByName(meshName);
      };
      // get bones info
      const bonespheres = function () {
        var e, t;
        return (t =
          (e = scene) === null || e === void 0 ? void 0 : e.getMeshesById("bonesphere")) !== null &&
          t !== void 0
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
        addAttachment(droppedWearable, targetBone.current);

        renderModel();
      };
      const get_GizmoManager = function () {
        const gizmoManager = new BABYLON.GizmoManager(scene, 3.5);
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = true;
        gizmoManager.scaleGizmoEnabled = false;

        gizmoManager.boundingBoxGizmoEnabled = true;
        gizmoManager.usePointerToAttachGizmos = false;
        if (!gizmoManager.gizmos.positionGizmo || !gizmoManager.gizmos.rotationGizmo)
          throw new Error("gizmos not found");
        gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragEndObservable.add(() =>
          updateAllPositionValue(null)
        );
        gizmoManager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragEndObservable.add(() =>
          updateAllPositionValue(null)
        );
        gizmoManager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragEndObservable.add(() =>
          updateAllPositionValue(null)
        );

        gizmoManager.gizmos.rotationGizmo.xGizmo.dragBehavior.onDragEndObservable.add(() =>
          updateAllPositionValue(null)
        );
        gizmoManager.gizmos.rotationGizmo.yGizmo.dragBehavior.onDragEndObservable.add(() =>
          updateAllPositionValue(null)
        );
        gizmoManager.gizmos.rotationGizmo.zGizmo.dragBehavior.onDragEndObservable.add(() =>
          updateAllPositionValue(null)
        );

        gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
        gizmoManager.boundingBoxDragBehavior.disableMovement = true;

        if (gizmoManager.gizmos.boundingBoxGizmo) {
          gizmoManager.gizmos.boundingBoxGizmo.scaleRatio = 0.8;
          gizmoManager.gizmos.boundingBoxGizmo.scaleBoxSize = 0.03;
          gizmoManager.gizmos.boundingBoxGizmo.rotationSphereSize = 0;
          gizmoManager.gizmos.boundingBoxGizmo.onScaleBoxDragEndObservable.add(() =>
            updateAllPositionValue(null)
          );
        }

        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = false;
        gizmoManager.boundingBoxGizmoEnabled = false;
        return gizmoManager;
      };
      const gizmoManager = get_GizmoManager();
      const addAttachment = function (wearable: any, bone: any) {
        let the_wearable = getDroppedWearable();

        if (modelList[the_wearable.hashValue]) {
          return;
        }

        const defaultScale = 0.5;
        const updatedCostume: any = Object.assign({}, costume);

        const uniqueId = crypto.randomUUID();

        const attachmentInfo: any = {
          name: wearable.name,
          hash: wearable.hash,
          hashValue: wearable.hashValue,
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
          type: wearable.type,
          token_id: wearable.token_id,
        };

        if (!updatedCostume.attachments) {
          updatedCostume.attachments = [];
        }

        updatedCostume.attachments.push(attachmentInfo);
        const updatedCostumeD = { ...costume };

        setCostume(updatedCostumeD);

        attachmentId.current = uniqueId;
      };
      const bone = function (e: any) {
        if (!skeleton.current) return null;

        const t = skeleton.current.getBoneIndexByName(e);

        if (t == -1) {
          console.error(`Bad bone name "${e}"`);
          return null;
        }

        return skeleton.current.bones[t];
      };
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

            const shaderMaterial = new BABYLON.StandardMaterial("wearable", scene);
            shaderMaterial.emissiveColor.set(0.3, 0.3, 0.3);
            shaderMaterial.diffuseColor.set(1, 1, 1);
            shaderMaterial.blockDirtyMechanism = true;
            // .token_id===the_wearable.token_id
            modelMesh = new BABYLON.Mesh("utils/wearable_dcl", scene);
            modelMesh.material = shaderMaterial;
            modelMesh.isPickable = true;
            modelMesh.checkCollisions = false;
            modelMesh.scaling.set(100, 100, 100);
            modelMesh.hashValue = the_wearable.hashValue;
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
                var oldPostion = modelMesh.getBoundingInfo().boundingBox.centerWorld;
                setWearablePostion(the_wearable.category, wearableMesh[0], oldPostion);
                last_rotation = [];

                if (the_wearable?.position && the_wearable?.rotation && the_wearable?.scaling) {
                  updateAllPositionValue("load_model_json");
                } else {
                  updateAllPositionValue(null);
                }
                focus();
                modelList[the_wearable.hashValue] = true;
                resolve(null);
              },
              null,
              null,
              ".glb"
            );
          }
        });
        setVoxMeshState(modelMesh);
      };
      // }

      // 生成wearables列表
      const renderWearables = function () {
        const collectibles = [];
      };
      renderWearables();

      const focus = function () {
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
      };

      const updateAllPositionValue = function (type: any) {
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
      };

      // 获取 拖放的wearable
      const getDroppedWearable = function () {
        let droppedWearableValue = windowVal["droppedWearable"];

        return droppedWearableValue !== null && droppedWearableValue !== undefined
          ? droppedWearableValue
          : null;
      };

      engine.runRenderLoop(function () {
        scene.render();
      });

      window.addEventListener("resize", function () {
        engine.resize();
      });
    }
    const setWearablePostion = function (category: any, wearableMesh: any, oldPostion: any) {
      if (category === "lower_body") {
        wearableMesh.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.LOCAL);
        // wearableMesh.scaling.set(1.1, 1, 1.2)
        wearableMesh.position.set(-oldPostion.x, oldPostion.y, -oldPostion.z);
      } else if (category === "feet") {
        wearableMesh.position.set(-oldPostion.x, -oldPostion.y - 0.11, -oldPostion.z - 0.1);
        wearableMesh.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);
      } else {
        wearableMesh.position.set(-oldPostion.x, -oldPostion.y, -oldPostion.z);
      }
    };
  }, []);

  return (
    <>
      <div id="gizmos" className="active">
        <canvas id="renderCanvasDcl" className={style.canvas}></canvas>
      </div>
    </>
  );
}
