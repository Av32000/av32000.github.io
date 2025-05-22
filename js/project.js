const project = projects.find((p) => p.id == projectId);
document.title = `Av32000 - ${project.name}`;

function render() {
  const navBar = document.getElementById("navbar");
  const header = document.getElementById("project-header");
  const contentDiv = document.getElementById("content");
  const projectCard = document.getElementById("project-card");
  const footerDiv = document.getElementById("socials");

  renderProjectHeader(header, project);
  renderNavBar(navBar);
  renderProjectContent(contentDiv, project);
  renderProjectCard(projectCard, project);
  renderFooter(footerDiv);
}

// Images Viewer
let currentIndex = 0;
let currentImages = [];

function loadFullscreenImage(images, index = 0) {
  currentImages = images;
  currentIndex = index;
  const container = document.getElementById("fullscreen-image");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const img = container.querySelector("img");

  if (images.length > 1) {
    nextBtn.style.display = "block";
    prevBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
  }

  img.src = images[index];
  container.classList.add("show");
}

function closeFullscreenImage() {
  const container = document.getElementById("fullscreen-image");
  container.classList.remove("show");
  currentImages = [];
  currentIndex = 0;
}

function navigateImage(direction) {
  if (currentImages.length === 0) return;
  currentIndex =
    (currentIndex + direction + currentImages.length) % currentImages.length;
  const img = document.querySelector("#fullscreen-image img");
  img.src = currentImages[currentIndex];
}

document.addEventListener("keydown", (event) => {
  const container = document.getElementById("fullscreen-image");
  if (!container.classList.contains("show")) return;

  if (event.key === "ArrowRight") {
    navigateImage(1);
  } else if (event.key === "ArrowLeft") {
    navigateImage(-1);
  } else if (event.key === "Escape") {
    closeFullscreenImage();
  }
});

render();
