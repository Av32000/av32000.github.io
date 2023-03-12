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
  console.log(diskPos)
  requestAnimationFrame(raf)
}

raf()

// History Anim

const inViewport = (entries, observer) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
  Obs.observe(EL, obsOptions);
});