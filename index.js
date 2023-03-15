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
let currentSelectedIndex = 0
let currentSkill = document.querySelectorAll(".skills-icons img")[currentSelectedIndex].alt

var intervalID = null;

function intervalManager(flag) {
  if (flag)
    intervalID = setInterval(() => {
      if (currentSkill != null) {
        document.querySelector("." + currentSkill).classList.remove("fade-in")
      }
      currentSkill = document.querySelectorAll(".skills-icons img")[currentSelectedIndex].alt
      UpdateColors()
      let content = document.querySelector("." + currentSkill)
      content.classList.add("fade-in")

      if (currentSelectedIndex == document.querySelectorAll(".skills-icons img").length - 1) currentSelectedIndex = 0
      else currentSelectedIndex++
    }, 8000)
  else
    clearInterval(intervalID);
}

let timeout

document.querySelectorAll(".skills-icons img").forEach(element => {
  element.addEventListener("click", () => {
    intervalManager(false)
    if (timeout != null) clearTimeout(timeout)
    if (currentSkill != null) {
      document.querySelector("." + currentSkill).classList.remove("fade-in")
    }
    currentSkill = element.alt
    UpdateColors()
    let content = document.querySelector("." + currentSkill)
    content.classList.add("fade-in")

    timeout = setTimeout(() => {
      intervalManager(true)
    }, 20000)
  })
})

function UpdateColors() {
  document.querySelectorAll(".skills-icons img").forEach(element => {
    if (element.alt == currentSkill) element.src = `./src/${currentSkill}-Selected.svg`
    else element.src = `./src/${element.alt}.svg`
  })
}

intervalManager(true)