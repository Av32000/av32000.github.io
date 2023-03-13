// Header Anim

const background = document.getElementById("header")
const disk = document.getElementById("disk")

const diskPos = {
  x: 0,
  y: 0
}

const mouse = {
  x: 0,
  y: 0
}

background.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})

function lerp(a, b, t) {
  return (1 - t) * a + t * b
}

const raf = () => {
  diskPos.x = lerp(diskPos.x, mouse.x - disk.clientWidth / 2, 0.03)
  diskPos.y = lerp(diskPos.y, mouse.y - disk.clientHeight / 2, 0.03)

  disk.style.left = diskPos.x + "px"
  disk.style.top = diskPos.y + "px"
  requestAnimationFrame(raf)
}

raf()

// History Anim

const inViewport = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("is-inViewport");

  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
  Obs.observe(EL, obsOptions);
});

// Skills Anim
let radius = 200
const circle = document.getElementById("skills-circle")
let elements = document.querySelectorAll(".skills-circle img")
var numElements = elements.length,
  angle = 0
step = (2 * Math.PI) / numElements;
for (var i = 0; i < numElements; i++) {
  var x = circle.clientWidth / 2 + radius * Math.cos(angle)-10;
  var y = circle.clientHeight / 2 + radius * Math.sin(angle)-40;
  elements[i].style.position = "absolute"
  elements[i].style.left = x + "px"
  elements[i].style.top = y + "px"
  angle += step;
}