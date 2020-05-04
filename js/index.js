
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var lightLinks

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)
    camera = new BABYLON.ArcRotateCamera("Camera", 90 * (Math.PI / 180), 82 * (Math.PI / 180), 25, new BABYLON.Vector3(0, 18, 0), scene);
    camera.minZ = 0.1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 0.0001
    camera.upperRadiusLimit = 100
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 10
    camera.attachControl(canvas, true, true, false);

    lightLinks = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(-60, -41, -90), scene);
    lightLinks.position = new BABYLON.Vector3(1, 1, 0);
    lightLinks.intensity = 0.35

    lightRechts = new BABYLON.DirectionalLight("lightRechts", new BABYLON.Vector3(120, -41, -90), scene);
    lightRechts.position = new BABYLON.Vector3(-1, 1, 0);
    lightRechts.intensity = 0.35

    var spotLightL = new BABYLON.SpotLight("spotLightL", new BABYLON.Vector3(35, 30, -48), new BABYLON.Vector3(0, -1, 0.3), 95 * (Math.PI / 180), 2, scene);
    spotLightL.intensity = 8000

    var spotLightR = new BABYLON.SpotLight("spotLightR", new BABYLON.Vector3(-35, 30, -48), new BABYLON.Vector3(0, -1, 0.3), 95 * (Math.PI / 180), 2, scene);
    spotLightR.intensity = 8000

    sphereL = BABYLON.MeshBuilder.CreateSphere("sphereL", { diameter: 3 }, scene);
    sphereL.parent = spotLightL
    sphereL.visibility = 0.2

    sphereR = BABYLON.MeshBuilder.CreateSphere("sphereR", { diameter: 3 }, scene);
    sphereR.parent = spotLightR
    sphereR.visibility = 0.2


    // Sky material
    var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.cameraOffset.y = 50;
    skyboxMaterial.luminance = 0.05;
    //skyboxMaterial._cachedDefines.FOG = true;

    // Sky mesh (box)
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyboxMaterial;

    //PostEffects(scene)

    scene.onPointerUp = function () {

        htmlVideo.play()
}

    return scene;
};
/******* End of the create scene function ******/

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();;
sceneToRender = scene

engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});



/*
TO DO:
Mute video streaming: cvurrent fake mute
*/