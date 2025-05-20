function renderFavoriteProjectsGrid(parentDiv) {
  console.log(parentDiv);

  const favoriteProjects = projects
    .filter((p) => p.favorite >= 0)
    .sort((a, b) => a.favorite - b.favorite);

  for (let i = 0; i < favoriteProjects.length; i++) {
    const project = favoriteProjects[i];

    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-card-small");

    let cover = document.createElement("div");
    cover.classList.add("project-small-cover");
    let coverContent;
    switch (project.cover.type) {
      case "image":
        coverContent = document.createElement("img");
        coverContent.src = "/src/" + project.cover.value;
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
        icon.src = "/src/" + project.cover.value;
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
    projectIcon.src =
      project.type == "dev" ? "/src/Git.svg" : "/src/Docker.svg";
    cardFooter.append(projectName, projectIcon);

    projectDiv.append(cover, cardFooter);

    parentDiv.append(projectDiv);
  }
}
