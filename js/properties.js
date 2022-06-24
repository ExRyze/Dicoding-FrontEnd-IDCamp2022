const nameTag = document.querySelectorAll(".name-tag");

function setPropertiesShape() {
  for(let tag of nameTag) {
    var shapeUp = tag.querySelector(".shape-side-up");
    var shapeDown = tag.querySelector(".shape-side-down");
    shapeUp.style.borderTop = Math.ceil(tag.offsetHeight/2) + "px solid var(--layerLightBlue)";
    shapeDown.style.borderBottom = Math.ceil(tag.offsetHeight/2) + "px solid var(--layerLightBlue)";
  }
}
setPropertiesShape();

function checkMedia(x) {
  if (x.matches) {setPropertiesShape();}
}

var media1536 = window.matchMedia("(max-width: 1536px)");
var media1024 = window.matchMedia("(max-width: 1024px)");
var media767 = window.matchMedia("(max-width: 767px)");
var media480 = window.matchMedia("(max-width: 480px)");
checkMedia(media1536);checkMedia(media767);checkMedia(media480);
media1536.addListener(checkMedia);media1024.addListener(checkMedia);media767.addListener(checkMedia);media480.addListener(checkMedia);