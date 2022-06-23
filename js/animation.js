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
  }
  else {
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