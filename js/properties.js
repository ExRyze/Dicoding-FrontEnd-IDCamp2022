const nameTag = document.querySelectorAll(".name-tag");

for(let tag of nameTag) {
  var shapeUp = tag.querySelector(".shape-side-up");
  var shapeDown = tag.querySelector(".shape-side-down");
  shapeUp.style.borderTop = (tag.offsetHeight/2) + "px solid var(--layerLightBlue)";
  shapeDown.style.borderBottom = (tag.offsetHeight/2) + "px solid var(--layerLightBlue)";
}