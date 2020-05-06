let TV, htmlVideo, dotsText
var stream1 = "https://zdfhls18-i.akamaihd.net/hls/live/744751/dach/high/master.m3u8";
//var stream1 = "https://etlive-mediapackage-fastly.cbsaavideo.com/dvr/manifest.m3u8";

var hlsArray = []
var vidMats = []

function AddStreamingToTexture() {

    //create script html to handle hls?
    var url = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url;
    document.head.appendChild(s);

    //crea video element to host streaming channel
    //var stream1 = "https://etlive-mediapackage-fastly.cbsaavideo.com/dvr/manifest.m3u8";
    var video = $("<video autoplay playsinline src='" + stream1 + "'></video>");
    $("body").append(video);
    console.log("Adding HTML video element");
    TV.material = createVideoMat();

    //HLS is loaded
    s.onload = function () {
        console.log("streaming loaded")
        // Video material
        var video = document.querySelector('video');
        var videoTexture = new BABYLON.VideoTexture('video', video, scene, true, true);

        htmlVideo = videoTexture.video;
        htmlVideo.volume = 1;

        
        TV.material.albedoTexture = videoTexture;
        TV.material.emissiveTexture = videoTexture;
        TV.material.reflectionTexture = hdrTexture
        

        if (Hls.isSupported()) {
            var hls = new Hls();
            hlsArray.push(hls)
            hls.loadSource(stream1);
            hls.attachMedia(video);
            engine.hideLoadingUI();
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                htmlVideo.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = stream1;
            engine.hideLoadingUI();
            video.addEventListener('loadedmetadata', function () {
                htmlVideo.play();
            });
        }
    }
}
function myScript(){
    console.log("ican play")
}

var video2
function CreateStreamingVideoElement(newStream) {

    var videoElem = $("<video autoplay playsinline src='" + newStream + "'></video>");
    $("body").append(videoElem);
    video2 = document.querySelectorAll('video')[1];
    //video2.addEventListener("canplay", AddNewStreamingToMaterial, video2);

    if (Hls.isSupported()) {
        var new_hls = new Hls();
        hlsArray.push(new_hls)
        //load a manifest
        new_hls.loadSource(newStream);
        // bind hls und video elem  together
        new_hls.attachMedia(video2);
        engine.hideLoadingUI();

        // MEDIA_ATTACHED event is fired by hls object once MediaSource is ready
        new_hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.log("video and hls.js are now bound together !");

            hlsArray[0].destroy()
            hlsArray.shift()
            document.querySelectorAll('video')[0].remove();
            AddNewStreamingToMaterial(video2, RemoveOldVideoMat)
            
        });
 
    } else if (video2.canPlayType('application/vnd.apple.mpegurl')) {
        video2.src = newStream;
        engine.hideLoadingUI();
        video2.addEventListener('loadedmetadata', function () {
            hlsArray[0].destroy()
            hlsArray.shift()
            document.querySelectorAll('video')[0].remove();
            AddNewStreamingToMaterial(video2, RemoveOldVideoMat)
        });
    }
}


function AddNewStreamingToMaterial(video2, callback) {

    TV.material = createVideoMat();
    var videoTexture2 = new BABYLON.VideoTexture('video2', video2, scene, true, true);
    TV.material.albedoTexture = videoTexture2;
    TV.material.emissiveTexture = videoTexture2;
    TV.material.reflectionTexture = hdrTexture

    htmlVideo = videoTexture2.video;
    htmlVideo.play();
    htmlVideo.volume = 1;

    //remove
    callback()

}

function RemoveOldVideoMat(){
    //dont remove the reflection texture
    videoMats[0].reflectionTexture = ""
    //this removes the material and all textures
    videoMats[0].dispose(false,true)
    videoMats.shift()
}

let muted = false
function MuteVideoStreaming() {
    console.log(muted)
    if (muted) {
        htmlVideo.volume = 1
    }
    else {
        htmlVideo.volume = 0.001
    }
    muted = !muted;

}



//working hls streaming
/*

function AddStreamingToTexture() {

    //create script html to handle hls?
    var url = "https://cdn.jsdelivr.net/npm/hls.js@latest";
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url;
    document.head.appendChild(s);

    //crea video element to host streaming channel
    //var stream1 = "https://etlive-mediapackage-fastly.cbsaavideo.com/dvr/manifest.m3u8";
    var video = $("<video autoplay playsinline src='" + stream1 + "'></video>");
    $("body").append(video);
    console.log("Adding HTML video element");

    //HLS is loaded
    s.onload = function () {
        console.log("streaming loaded")
        // Video material
        var video = document.querySelector('video');
        var videoTexture = new BABYLON.VideoTexture('video', video, scene, true, true);

        videoMat.albedoTexture = videoTexture;
        videoMat.emissiveTexture = videoTexture;

        htmlVideo = videoTexture.video;
        htmlVideo.volume  = 0.001;

        TV.material = videoMat;
        htmlVideo.volume  = 1;

        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(stream1);
            hls.attachMedia(video);
            engine.hideLoadingUI();
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                htmlVideo.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = stream1;
            engine.hideLoadingUI();
            video.addEventListener('loadedmetadata', function () {
                htmlVideo.play();
            });
        }
    }
}*/