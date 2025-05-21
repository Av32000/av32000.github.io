const project = projects.find((p) => p.id == projectId);

function render() {
  const navBar = document.getElementById("navbar");
  const header = document.getElementById("project-header");

  renderProjectHeader(header, project);
  renderNavBar(navBar);
}

render();
