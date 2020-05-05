let woodMat, LeuchteMat
function ChangeMaterialProperties() {

    var redBay =new BABYLON.Color3.FromHexString("#ea1e1e");
    var blueBay =new BABYLON.Color3.FromHexString("#063c9d");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");

    var leatherNRM = new BABYLON.Texture("./assets/textures/Leather026_2K_Normal.jpg", scene, true, false)
    var woodDiff = new BABYLON.Texture("./assets/textures/wood_base.jpg", scene, true, false)
    var woodNRM = new BABYLON.Texture("./assets/textures/wood_normal.jpg", scene, true, false)
    woodNRM.level = 0.25
    var woodRough = new BABYLON.Texture("./assets/textures/wood_metallic.jpg", scene, true, false)
    woodTexts = []
    woodTexts.push(woodDiff)
    woodTexts.push(woodNRM)
    woodTexts.push(woodRough)
    woodTexts.forEach(text =>{
        text.uScale = 6
        text.vScale = 6
        //text.wAng = Math.PI/2
    })

    woodMat = new BABYLON.PBRSpecularGlossinessMaterial("woodMat", scene);
    woodMat.diffuseTexture = woodDiff
    woodMat.normalTexture = woodNRM
    woodMat.environmentTexture = hdrTexture
    woodMat.specularGlossinessTexture = woodRough
    woodMat.glossiness = 0.9;

    scene.materials.forEach(mat => {
        mat.reflectionTexture = hdrTexture;
        if(mat.name.startsWith("sit")){
            mat.metallic = 0;
            mat.roughness = 0.2;
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
            mat.emissiveColor =  new BABYLON.Color3(117/255, 98/255, 95/255)
            LeuchteMat = mat
        }
        else if (mat.name == "glissBottle"){
            mat.metallic = 0.65
            mat.roughness = 0.1
        }

        else if (mat.name == "deckelMat"){
            mat.metallic = 0.65
            mat.roughness = 0.1
        }
        else if (mat.name == "glissMetal"){
            mat.metallic = 1
            mat.roughness = 0
        }
        else if (mat.name == "newSticker"){
            //mat.albedoColor = new BABYLON.Color3.Black()
        }
        else if(mat.name == "bild"){
            mat.emissiveTexture = mat.albedoTexture
            mat.emissiveColor = new BABYLON.Color3.FromHexString("#313131")
        }
    })  



    /*
        scene.meshes.forEach(mesh =>{
        if(mesh.name.startsWith("_hole.1 4")){
            var spotHole = new BABYLON.SpotLight("spotHole", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, -1, 0), 95 * (Math.PI / 180), 2, scene);
            spotHole.position = mesh.position
            spotHole.intensity = 35000
            
        }
    })
    var screenTex = new BABYLON.Texture("./assets/ascree.jpg", scene, true, false)
    var perlinText = new BABYLON.NoiseProceduralTexture("perlin", 254, scene);

    iconGlassOff = new BABYLON.PBRMaterial("iconGlassOff", scene)
    iconGlassOff.albedoColor = redBay;
    iconGlassOff.metallic = 0
    iconGlassOff. roughness = 0.5
    iconGlassOff.transparencyMode = 2
    iconGlassOff.alpha = 0.85
    */

    
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

