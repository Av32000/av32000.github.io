function renderProjectsGrid(parentDiv, filters = [], favoriteOnly = false) {
  let projectsToRender = projects;

  if (favoriteOnly)
    projectsToRender = projectsToRender
      .filter((p) => p.favorite >= 0)
      .sort((a, b) => a.favorite - b.favorite);

  if (filters.length > 0) {
    projectsToRender = projectsToRender.filter(
      (p) => !filters.includes(p.type)
    );
  }

  for (let i = 0; i < projectsToRender.length; i++) {
    parentDiv.append(renderProject(projectsToRender[i], parentDiv));
  }
}

function renderProject(project) {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project-card-small");

  let cover = document.createElement("div");
  cover.classList.add("project-small-cover");
  let coverContent;
  switch (project.cover.type) {
    case "image":
      coverContent = document.createElement("img");
      coverContent.src = "/assets/projects/cover/" + project.cover.value;
      break;

    case "text":
      coverContent = document.createElement("div");
      coverContent.classList.add("rendered-cover");

      const text = document.createElement("p");
      text.innerText = project.cover.value;
      coverContent.appendChild(text);
      break;

    case "icon":
      coverContent = document.createElement("div");
      coverContent.classList.add("rendered-cover");

      const icon = document.createElement("img");
      icon.src = "/assets/" + project.cover.value;
      coverContent.appendChild(icon);
      break;

    default:
      break;
  }
  cover.append(coverContent);

  const cardFooter = document.createElement("p");
  cardFooter.classList.add("project-small-footer");
  const projectName = document.createElement("p");
  projectName.innerText = project.name;
  const projectIcon = document.createElement("img");
  projectIcon.src = `/assets/projects/icons/${project.type}.svg`;
  cardFooter.append(projectName, projectIcon);

  projectDiv.append(cover, cardFooter);
  return projectDiv;
}
