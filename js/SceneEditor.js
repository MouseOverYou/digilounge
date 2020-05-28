function StartScene(oncompleteAnimate){
    AddGlow()
    AddShadows()
    CreateCustomMaterials()
    ChangeMaterialProperties()
    EditMeshes()
    AddStreamingToTexture()
    CatchMeshesToAnimate(BufferStartAnimation)
    //PostEffects(scene)
    //animaiton sequencer
    oncompleteAnimate()

}

let firsStehle = true
function StartAnimating(){
    TurnLightsOff()
    //turn lights on
    window.setTimeout(()=>{UpdateAnimRate = true},1000)
    window.setTimeout(()=>{StartAnim.restart()},1000)
}
var  BoardColl
function EditMeshes() {
    scene.meshes.forEach(mesh => {
        if (mesh.name == "Height 180") {
            mesh.setEnabled(false)
        }

        else if (mesh.name == "stehledown") {
            if (firsStehle) {
                Bottle_P.parent = mesh
                firsStehle = false
            }

        }
        else if (mesh.name == "floor") {
            mesh.material = woodMat
        }
        else if(mesh.name == "screen Plane"){
            TV = mesh
            //TV.actionManager = new BABYLON.ActionManager(scene);
        }
        else if(mesh.name == "Board"){

            BoardColl = new BABYLON.MeshBuilder.CreateBox("BoardColl", { height: 12, width:18, depth: 0.1 }, scene)

            BoardColl.material = colMat;
            BoardColl.setParent(mesh);
            BoardColl.position = new BABYLON.Vector3(0,0,0);
            BoardColl.isPickable = true;
            AllowMouseOverMesh(mesh)

        }
        
    });
    sphereL.material = scene.getMaterialByName("Leuchte")
    sphereR.material = scene.getMaterialByName("Leuchte")
}

function AddGlow() {
    // Add lights to the scene
    var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
    gl.intensity = 0.5;
    scene.meshes.forEach(elem => {
        if (elem.name.startsWith("Screen_") || elem.name == "Video_Screens") {
            gl.addExcludedMesh(elem)
        }
    });

}

function AddShadows() {
    var groundShadow = BABYLON.Mesh.CreatePlane('groundShadow', 95, scene)
    groundShadow.rotation.x = Math.PI / 2
    groundShadow.position.y = -0.5
    groundShadow.material = new BABYLON.ShadowOnlyMaterial('shadowOnly', scene)
    groundShadow.material.alpha = 0.1
    groundShadow.receiveShadows = true

    var generator = new BABYLON.ShadowGenerator(4096 / 8, lightLinks);
    generator.filter = 100

    for (var i = 0; i < scene.meshes.length; i++) {
        if (scene.meshes[i].name == "stehledown" ||
            scene.meshes[i].name == "glass" ||
            scene.meshes[i].name == "seatDown") {
            generator.addShadowCaster(scene.meshes[i]);

        }
        else if (scene.meshes[i].name == "walls") {
            scene.meshes[i].receiveShadows = true;
        }

    }

}

function AllowMouseOverMesh(mesh){
    mesh.actionManager = new BABYLON.ActionManager(scene);
	
	//ON MOUSE ENTER
	mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){	
        //mesh.material.emissiveColor = BABYLON.Color3.Blue();
        BoardMat.albedoTexture = boardPH
	}));
	
	//ON MOUSE EXIT
	mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){
        BoardMat.albedoTexture = ""
	}));
}