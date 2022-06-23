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