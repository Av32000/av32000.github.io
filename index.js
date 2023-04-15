// Header Anim

const background = document.getElementById("header");
const disk = document.getElementById("disk");

const diskPos = {
  x: 0,
  y: 0,
};

const mouse = {
  x: 0,
  y: 0,
};

background.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

const raf = () => {
  diskPos.x = lerp(diskPos.x, mouse.x - disk.clientWidth / 2, 0.03);
  diskPos.y = lerp(diskPos.y, mouse.y - disk.clientHeight / 2, 0.03);

  disk.style.left = diskPos.x + "px";
  disk.style.top = diskPos.y + "px";
  requestAnimationFrame(raf);
};

if (screen.width > 900) raf();

// History Anim

const inViewport = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-inViewport");
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

const ELs_inViewport = document.querySelectorAll("[data-inviewport]");
ELs_inViewport.forEach((EL) => {
  Obs.observe(EL, obsOptions);
});

// Skills Anim
let currentSelectedIndex = 0;
let currentSkill =
  document.querySelectorAll(".skills-icons img")[currentSelectedIndex].alt;

var intervalID = null;

function intervalManager(flag) {
  if (flag)
    intervalID = setInterval(() => {
      if (currentSkill != null) {
        document.querySelector("." + currentSkill).classList.remove("fade-in");
      }
      currentSkill =
        document.querySelectorAll(".skills-icons img")[currentSelectedIndex]
          .alt;
      UpdateColors();
      let content = document.querySelector("." + currentSkill);
      content.classList.add("fade-in");

      if (
        currentSelectedIndex ==
        document.querySelectorAll(".skills-icons img").length - 1
      )
        currentSelectedIndex = 0;
      else currentSelectedIndex++;
    }, 8000);
  else clearInterval(intervalID);
}

let timeout;

document.querySelectorAll(".skills-icons img").forEach((element) => {
  element.addEventListener("click", () => {
    intervalManager(false);
    if (timeout != null) clearTimeout(timeout);
    if (currentSkill != null) {
      document.querySelector("." + currentSkill).classList.remove("fade-in");
    }
    currentSkill = element.alt;
    UpdateColors();
    let content = document.querySelector("." + currentSkill);
    content.classList.add("fade-in");

    timeout = setTimeout(() => {
      intervalManager(true);
    }, 20000);
  });
});

function UpdateColors() {
  document.querySelectorAll(".skills-icons img").forEach((element) => {
    if (element.alt == currentSkill)
      element.src = `./src/${currentSkill}-Selected.svg`;
    else element.src = `./src/${element.alt}.svg`;
  });
}

intervalManager(true);

// Last Update Projects
const githubApiEndpoint = "https://api.github.com/repos/";
const projects = document.querySelectorAll(".projects-list .project");

projects.forEach(async (project) => {
  const url = project.querySelector(".link p").innerHTML.trim();
  const lastUpdate = await (await fetch(githubApiEndpoint + url)).json();

  let span = document.createElement("span")
  span.innerHTML = ` • ${FormatDate(lastUpdate.pushed_at)}`
  span.className = "last-update-project"

  project.querySelector(".link").appendChild(span)
});

function FormatDate(sDate) {
  const date = new Date(sDate);
  const now = new Date()

  const diffTime = Math.abs(now - date);
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if(diffSeconds < 10){
    return "Maintenant"
  } else if (diffSeconds < 60) {
    return `Il y a ${diffSeconds} secondes`;
  } else if (diffMinutes < 60) {
    return `Il y a ${diffMinutes} minutes`;
  } else if (diffHours < 24) {
    return `Il y a ${diffHours} heures`;
  } else if (diffDays == 1) {
    return "Hier";
  } else if (diffDays < 30) {
    return `Il y a ${diffDays} jours`;
  } else if (diffMonths < 12) {
    return `Il y a ${diffMonths} mois`;
  } else if (diffYears == 1) {
    return "L'année dernière";
  } else {
    return `Il y a ${diffYears} ans`;
  }
}
