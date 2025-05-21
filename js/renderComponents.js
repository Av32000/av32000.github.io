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
  projectDiv.addEventListener("click", () => (window.location = project.url));

  const cover = renderProjectCover(project);

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

function renderProjectCover(project) {
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
  return cover;
}

function renderFooter(footerDiv) {
  footerDiv.classList.add("socials");
  const sortedSocials = socials.sort((a, b) => a.id - b.id);
  for (let i = 0; i < sortedSocials.length; i++) {
    const social = sortedSocials[i];
    const socialDiv = document.createElement("div");
    socialDiv.classList.add("social");
    socialDiv.addEventListener("click", () => window.open(social.url));

    const icon = document.createElement("img");
    icon.src = `./assets/${social.social}.svg`;
    icon.alt = social.social;

    const username = document.createElement("p");
    username.innerText = social.username;

    socialDiv.append(icon, username);
    footerDiv.appendChild(socialDiv);
  }
}

function renderNavBar(navBarDiv) {
  navBarDiv.classList.add("navbar");
  navBarDiv.addEventListener("click", () => (window.location = "/"));
  navBarDiv.style.cursor = "pointer";

  const icon = document.createElement("img");
  icon.src = "/assets/icon.jpg";
  icon.alt = "Account Icon";

  const username = document.createElement("p");
  username.innerText = "Av32000";

  navBarDiv.append(icon, username);
}

function renderProjectHeader(header, project) {
  header.classList.add("project-header");

  header.innerHTML = renderProjectCover(project).innerHTML;
}
