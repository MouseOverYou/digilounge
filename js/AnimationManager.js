let StartAnim = gsap.timeline()

//nodes to animate
let StehleL, StehleR, Pack

function BufferStartAnimation() {
    let IntRate = new BABYLON.Vector3(0, 0, 0)
    Pack.rotationQuaternion = null
    StartAnim.set(Pack.scaling, { x: 0, y: 0, z: 0 })
    StartAnim.set(StehleL.scaling, {y:0.01})
    StartAnim.to(StehleL.scaling, { y: 1, duration: 0.5 })
    StartAnim.fromTo(Pack.scaling, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, ease: "back.out(2)", duration: 0.5 }, ">0.1")
    StartAnim.from(Pack.rotation, { y: -90 * (Math.PI / 180), duration: 0.5, ease: "back.out(4)" }, "<")
    //TurnLightsOff()
}

function TurnLightsOff(){
    spotLightL.diffuse = new BABYLON.Color3(0, 0, 0)
    spotLightR.diffuse = new BABYLON.Color3(0, 0, 0)
    lightLinks.diffuse = new BABYLON.Color3(0, 0, 0)
    lightRechts.diffuse = new BABYLON.Color3(0, 0, 0)
    hdrTexture.level = 0
    LeuchteMat.emissiveColor = new BABYLON.Color3(0, 0, 0)
    //videoMat.emissiveColor = new BABYLON.Color3(0, 0, 0)
    //videoMat.albedoColor = new BABYLON.Color3(0, 0, 0)
}

function TurnLightsOn(rate) {
    rate = rate * 2
    //spots
    spotLightL.diffuse = new BABYLON.Color3(rate, rate, rate)
    spotLightR.diffuse = new BABYLON.Color3(rate, rate, rate)

    //general
    lightLinks.diffuse = new BABYLON.Color3(rate, rate, rate)
    lightRechts.diffuse = new BABYLON.Color3(rate, rate, rate)
    hdrTexture.level = rate
    LeuchteMat.emissiveColor = new BABYLON.Color3(117 / 255 * rate, 98 / 255 * rate, 95 / 255 * rate)

    //video
    window.setTimeout(()=>{
        //videoMat.emissiveColor = new BABYLON.Color3(49 / 255 * rate, 49 / 255 * rate, 49 / 255 * rate)
        //videoMat.albedoColor = new BABYLON.Color3(rate, rate, rate)
    }, 1000)

    if (rate > 0.99) {
        UpdateAnimRate = false
        AnimRate = 0;
    }
}


function TurnTVOn(){
    videoMat.emissiveColor = new BABYLON.Color3(49 / 255 , 49 / 255 , 49 / 255 )
    videoMat.albedoColor = new BABYLON.Color3(1, 1, 1)
}

function TurnTVOff(){
    videoMat.emissiveColor = new BABYLON.Color3(0, 0, 0)
    videoMat.albedoColor = new BABYLON.Color3(0, 0, 0)

}
function CatchMeshesToAnimate(callback) {
    Lounge_P.getChildTransformNodes(false, (node) => {
        if (node.name == "stehle links") {
            StehleL = node
        }
        else if (node.name == "stehle rechts") {
            StehleR = node
        }
        else if (node.name == "Gliss_Shampoo") {
            Pack = node
        }
    })

    callback()
}