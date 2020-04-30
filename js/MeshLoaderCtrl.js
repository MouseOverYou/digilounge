var Messe_P
var hdrTexture
MesseCollidersLoaderTask

function LoadAssets(scene, assetsManager) {

    
    //ENV TASK
    var envTask = assetsManager.addCubeTextureTask("envTask", "./assets/environment.dds");

    envTask.onSuccess = function (task) {
        //alert('HDR LOADED');
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("./assets/environment.dds", scene);
        hdrTexture.rotationY = 140*(Math.PI/180);

        // Create Skybox
        var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 0
        var hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = true;
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    envTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    
    Messe_P = new BABYLON.TransformNode("Messe_P");
    MesseLoaderTask = assetsManager.addMeshTask("", "", "./assets/Digital Lounge.glb")

    MesseLoaderTask.onSuccess = function (task) {
        
        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 0
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].parent = Messe_P
        Messe_P.position.x = 0
        Messe_P.position.y = 0
        Messe_P.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)

    }

    MesseLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    //FINISH

    var pbr
    assetsManager.onFinish = function (task) {

        sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.15 }, scene);
        sphere.position = new BABYLON.Vector3(0.005,2.29,0)
        sphere.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
        pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", scene);
        sphere.material = pbr;
        sphere.isVisible = true
        pbr.baseColor = new BABYLON.Color3(1.0, 1, 1);
        pbr.emissiveColor = new BABYLON.Color3(1.0, 1, 1);

            //handle All at once
    scene.materials.forEach(mat => {
        //add reflections
        mat.reflectionTexture = hdrTexture;
    });
        


    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}

