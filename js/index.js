// Text Anim

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

// Platoform EasterEgg
// https://stackoverflow.com/a/38241481/18031156
function getOS() {
  const userAgent = window.navigator.userAgent,
    platform =
      window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

function applyOSMessage() {
  const span = document.getElementById("os-message");
  if (!span) return;

  switch (getOS()) {
    case "Windows":
      span.innerText = "I see you 👀 windows user";
      break;
    case "Linux":
      span.innerText = "Hi fellow Linux User 🤗 !";
      break;
    case "Mac OS":
      span.innerText = "You're on MacOS ! Why ?";
      break;

    default:
      break;
  }
}

// Header Scroll Btn
function scrollToProjects() {
  const projectsBlocks = document.getElementById("favorite-projects");
  if (projectsBlocks.clientHeight <= window.innerHeight) {
    projectsBlocks.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    document.getElementById("favorite-projects-title").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Project Rendering
function render() {
  const favoriteProjectsGrid = document.getElementById(
    "favorite-projects-grid",
  );
  const navbar = document.getElementById("navbar");
  const footerDiv = document.getElementById("socials");
  const itSkillsDiv = document.getElementById("it-skills-wheel");

  renderProjectsGrid(favoriteProjectsGrid, { favoriteOnly: true });
  renderNavBar(navbar);
  renderFooter(footerDiv);
  renderSkillsWheel(itSkillsDiv, itSkills, 0);
}

render();
