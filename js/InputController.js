
let TVSwitch = false
let showCommands = false
$(document).keyup(function (e) {

  
  if (e.keyCode === 74) {
    showCommands = !showCommands
    if (showCommands) {
      $('#debugLabel').css('z-index', 0)
    }
    else {
      $('#debugLabel').css('z-index', -1)
    }


  }

});



document.addEventListener('click', function (e) {
  e = e || window.event;
  console.log(e.target);
}, false);

var LightSwitchOn = true
jQuery(document).ready(function ($) {

  //COLOUR COATING

  //ENVIRONMENT
  $('.envOption').on('click', function () {
    //console.log(this.id);
    var envSelec = this.id
    var state = document.getElementById("streamingDiv").style.zIndex
    switch (envSelec) {
      case "channel":
        $(this).toggleClass('selectedEnv');
        if (state == "5") {
          document.getElementById("streamingDiv").style.zIndex = "0"
        }
        else {
          document.getElementById("streamingDiv").style.zIndex = "5"
        }
        break;
      case "pack":
        StartAnim.restart()
        break;
    }


  });

  $('.x-icon').on('click', function () {
    handleWhiteBoard(false)


  });


  //LIGHTSWITCHER
  $('.lightOption').on('click', function () {

    var btnSelect = this.id
    switch (btnSelect) {
      case "light":
        LightSwitchOn = !LightSwitchOn
        if (LightSwitchOn) {
          UpdateAnimRate = true
        }
        else {
          TurnLightsOff()

        }
        break;
      case "audio":
        MuteVideoStreaming();
        break;
      case "tv":
        TVSwitch = !TVSwitch
        if (TVSwitch) {
          TurnTVOff()
    
        }
        else {
          TurnTVOn()
        }
          break;
    }

    $(this).toggleClass('lightOn');
  });

});


function handleStreamingUI(state) {

}