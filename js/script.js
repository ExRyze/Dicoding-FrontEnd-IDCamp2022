const bars = document.querySelector(".links i");
const links = document.querySelector(".links div");

bars.addEventListener("click", function() {
  if(links.classList.contains("links-slide-down")){
    links.classList.remove("links-slide-down");
    links.style.cssText = `
      top: -233%;
      transition: 2s;
    `;
    bars.classList.remove("bars-active");
  } else {
    links.classList.add("links-slide-down");
    links.style.cssText = `
      top: 111%;
      transition: 2s;
    `;
    bars.classList.add("bars-active");
  }
}
)

const link = document.querySelectorAll(".links div a")

for(let item of link) {
  item.addEventListener("click", function() {
    checkSiblingsNavA();
    if(item.classList.contains("active")) {
      item.classList.remove("active");
    } else {
      item.classList.add("active");
    }
  })
}
function checkSiblingsNavA() {
  for(let object of link) {
    if(object.classList.contains("active")){
      object.classList.remove("active");
    }
  }
}

const nameTag = document.querySelectorAll(".name-tag");

function setPropertiesShape() {
  for(let tag of nameTag) {
    var shapeUp = tag.querySelector(".shape-side-up");
    var shapeDown = tag.querySelector(".shape-side-down");
    shapeUp.style.borderTop = Math.ceil(tag.offsetHeight/2) + "px solid var(--layerLightBlue)";
    shapeDown.style.borderBottom = Math.ceil(tag.offsetHeight/2) + "px solid var(--layerLightBlue)";
  }
}
function checkMedia(x) {
  if (x.matches) {setPropertiesShape();}
}

setPropertiesShape();
var media1536 = window.matchMedia("(max-width: 1536px)");
var media1024 = window.matchMedia("(max-width: 1024px)");
var media767 = window.matchMedia("(max-width: 767px)");
var media480 = window.matchMedia("(max-width: 480px)");
checkMedia(media1536);checkMedia(media767);checkMedia(media480);
media1536.addListener(checkMedia);media1024.addListener(checkMedia);media767.addListener(checkMedia);media480.addListener(checkMedia);