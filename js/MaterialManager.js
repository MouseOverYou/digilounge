function ChangeMaterialProperties() {

    var redBay =new BABYLON.Color3.FromHexString("#ea1e1e");
    var blueBay =new BABYLON.Color3.FromHexString("#063c9d");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");

    var leatherNRM = new BABYLON.Texture("./assets/textures/Leather026_2K_Normal.jpg", scene, true, false)

    scene.materials.forEach(mat => {
        mat.reflectionTexture = hdrTexture;
        if(mat.name.startsWith("sit")){
            mat.metallic = 0;
            mat.roughness = 0.1;
            mat.bumpTexture = leatherNRM
            mat.bumpTexture.level = 0.13
            mat.bumpTexture.uScale = 0.15
            mat.bumpTexture.vScale = 0.15
        }
        else if(mat.name == "whiteWood"){
            mat.metallic = 0;
            mat.roughness = 0.1;
        }
        else if(mat.name == "Glass"){
            mat.metallic = 0;
            mat.roughness = 0;
            mat.indexOfRefraction = 0.52;
            mat.alpha = 0.5;
            mat.directIntensity = 0.0;
            mat.environmentIntensity = 0.7;
            mat.cameraExposure = 0.66;
            mat.cameraContrast = 1.66;
            mat.microSurface = 1;
            mat.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            mat.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);
        }
        else if (mat.name == "blackScreen"){
            mat.metallic = 1
            mat.roughness = 0;
        }
        else if (mat.name == "Leuchte"){
            mat.emissiveColor =  new BABYLON.Color3.FromHexString("#75625F")
        }
    })  




    /*
    var screenTex = new BABYLON.Texture("./assets/ascree.jpg", scene, true, false)
    var perlinText = new BABYLON.NoiseProceduralTexture("perlin", 254, scene);

    iconGlassOff = new BABYLON.PBRMaterial("iconGlassOff", scene)
    iconGlassOff.albedoColor = redBay;
    iconGlassOff.metallic = 0
    iconGlassOff. roughness = 0.5
    iconGlassOff.transparencyMode = 2
    iconGlassOff.alpha = 0.85
    */

    //handle All at once
    scene.materials.forEach(mat => {
        //add reflections
        mat.reflectionTexture = hdrTexture;
    });
    
}

var colMat
function CreateCustomMaterials(){
    //Infoboxes materials
    iMat = new BABYLON.StandardMaterial("iBoxMat", scene);
    iMat.disableLighting = true;

    iMatText = new BABYLON.Texture("./assets/Infobox.png", scene, true, true);
    iMatTextVideo = new BABYLON.Texture("./assets/Infobox_Video.png", scene, true, true);
    iMatText.uScale = -1;
    iMatTextVideo.uScale = -1;
    iMat.emissiveTexture = iMatTextVideo;
    iMat.opacityTexture = iMatTextVideo;

    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = false
    colMat.alpha = 0

    
}

function AddGlow(){
    // Add lights to the scene
    var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
    gl.intensity =0.5;
    scene.meshes.forEach(elem => {
        if(elem.name.startsWith("Screen_") || elem.name =="Video_Screens"){
            gl.addExcludedMesh(elem)
        }
    });

}

function AddShadows(){
    var generator = new BABYLON.ShadowGenerator(512, lightLinks);
        generator.useContactHardeningShadow = true;
        generator.bias = 0.01;
        generator.normalBias= 0.05;
		generator.contactHardeningLightSizeUVRatio = 0.08;

        for (var i = 0; i < scene.meshes.length; i++) {
            generator.addShadowCaster(scene.meshes[i]);    
            scene.meshes[i].receiveShadows = true;
        }

}

