const project = projects.find((p) => p.id == projectId);

function render() {
  const navBar = document.getElementById("navbar");
  const header = document.getElementById("project-header");
  const projectCard = document.getElementById("project-card");
  const footerDiv = document.getElementById("socials");

  renderProjectHeader(header, project);
  renderNavBar(navBar);
  renderProjectCard(projectCard, project);
  renderFooter(footerDiv);
}

render();
