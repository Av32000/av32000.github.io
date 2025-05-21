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

function loadFullscreenImage(imageSrc) {
  const container = document.getElementById("fullscreen-image");
  const img = container.querySelector("img");
  img.src = imageSrc;
  container.classList.add("show");
}

function closeFullscreenImage() {
  const container = document.getElementById("fullscreen-image");
  container.classList.remove("show");
}

render();
