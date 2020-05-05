let firsStehle = true
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