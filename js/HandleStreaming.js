let TV, videoMat, htmlVideo

function AddStreamingToTexture() {

    var url = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url;
    document.head.appendChild(s);


    var stream1 = "https://etlive-mediapackage-fastly.cbsaavideo.com/dvr/manifest.m3u8";
    var video = $("<video autoplay playsinline src='" + stream1 + "'></video>");
    $("body").append(video);
    console.log("Adding HTML video element");

    TV = scene.getMeshByName("screen Plane");
    TV.actionManager = new BABYLON.ActionManager(scene);

    s.onload = function () {
        console.log("streaming loaded")
        // Video material
        videoMat = new BABYLON.StandardMaterial("textVid", scene);
        var video = document.querySelector('video');
        var videoTexture = new BABYLON.VideoTexture('video', video, scene, true, true);

        videoMat.backFaceCulling = false;
        videoMat.diffuseTexture = videoTexture;
        videoMat.emissiveColor = BABYLON.Color3.White();

        htmlVideo = videoTexture.video;

        changeVideoMat()

        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(stream1);
            hls.attachMedia(video);
            engine.hideLoadingUI();
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                TV.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
                        function (event) {
                            htmlVideo.play();
                        })
                );
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = stream1;
            engine.hideLoadingUI();
            video.addEventListener('loadedmetadata', function () {
                TV.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger,
                        function (event) {
                            htmlVideo.play();
                        })
                );
            });
        }
    }


}

function changeVideoMat(){
    TV.material = videoMat;
    //htmlVideo.volume  = 1;
}

let muted = false
function MuteVideoStreaming(){
    //console.log(muted)
    if (muted){
        htmlVideo.volume  = 1
    }
    else{
        htmlVideo.volume  = 0.01
    }
    muted =! muted;  
}

