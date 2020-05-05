let StartAnim = gsap.timeline()

//nodes to animate
let StehleL, StehleR, Pack

function BufferStartAnimation(){
    let IntRate = new BABYLON.Vector3(0,0,0)
    Pack.rotationQuaternion  = null
    StartAnim.set(Pack.scaling, {x:0, y:0, z:0},)
    StartAnim.fromTo(StehleL.scaling, {y:0}, {y:1, delay: 0.5, duration: 0.5})
    StartAnim.fromTo(Pack.scaling, {x: 0, y:0, z:0}, {x:1, y:1, z:1, ease: "back.out(2)", duration: 0.5}, ">1")
    StartAnim.from(Pack.rotation, {y:  -90 * (Math.PI / 180), duration: 0.5, ease: "back.out(4)"},"<")
}

function CatchMeshesToAnimate(callback){
    Lounge_P.getChildTransformNodes(false, (node)=>{
        if(node.name == "stehle links"){
            StehleL = node
        }
        else if (node.name == "stehle rechts"){
            StehleR = node        
        }
        else if(node.name == "Gliss_Shampoo"){
            Pack = node
        }
    })

    callback()
}