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
    parentDiv.append(renderProjectCardSmall(projectsToRender[i], parentDiv));
  }
}

function renderProjectCardSmall(project) {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project-card-small");
  projectDiv.addEventListener("click", () => {
    if (project.url) {
      window.location = project.url;
    } else {
      window.location = `/projects/details.html?id=${project.id}`;
    }
  });

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

async function renderProjectCard(projectDiv, project) {
  projectDiv.classList.add("project-card");

  // Link
  if (project.link) {
    const linkDiv = document.createElement("div");
    linkDiv.classList.add("link");

    const linkIcon = document.createElement("img");
    linkIcon.src = `/assets/${project.link.icon}`;
    linkIcon.alt = project.link.icon;

    const linkText = document.createElement("p");
    linkText.innerText = project.link.text;
    linkText.addEventListener("click", () => window.open(project.link.url));

    linkDiv.append(linkIcon, linkText);
    projectDiv.append(linkDiv);
  }

  // Content
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const topDiv = document.createElement("div");
  topDiv.classList.add("top");

  const projectName = document.createElement("p");
  projectName.classList.add("accent");
  projectName.innerText = project.name;

  const projectIcon = document.createElement("img");
  projectIcon.src = `/assets/projects/icons/${project.type}.svg`;
  projectIcon.alt = project.type;

  topDiv.append(projectName, projectIcon);
  contentDiv.append(topDiv);

  if (project.description) {
    const description = document.createElement("p");
    description.innerText = project.description;
    contentDiv.append(description);
  }

  if (project.cardFields) {
    const fieldsDiv = document.createElement("div");
    fieldsDiv.classList.add("fields");

    for (let i = 0; i < project.cardFields.length; i++) {
      const field = project.cardFields[i];
      const fieldDiv = document.createElement("div");
      fieldDiv.classList.add("field");

      switch (field.type) {
        case "key":
          fieldDiv.innerHTML = `<span class="accent">${field.key}</span>: ${field.value}`;
          break;

        case "last-commit":
          fieldDiv.innerHTML = `<span class="accent">${
            field.key
          }</span>: ${await getLastCommit(field.value)}`;
        default:
          break;
      }
      fieldsDiv.append(fieldDiv);
    }

    contentDiv.append(fieldsDiv);
  }

  projectDiv.append(contentDiv);
}

function renderProjectCover(project) {
  let cover = document.createElement("div");
  cover.classList.add("project-small-cover");
  let coverContent;
  switch (project.cover.type) {
    case "image":
      coverContent = document.createElement("img");
      coverContent.classList.add("background-image");
      coverContent.src = "/assets/projects/cover/" + project.cover.value;
      coverContent.draggable = false;
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
    icon.src = `/assets/${social.social}.svg`;
    icon.alt = social.social;

    const username = document.createElement("p");
    username.innerText = social.username;

    socialDiv.append(icon, username);
    footerDiv.appendChild(socialDiv);
  }
}

function renderNavBar(navBarDiv) {
  navBarDiv.classList.add("navbar");

  const userDiv = document.createElement("div");
  userDiv.classList.add("user");
  userDiv.addEventListener("click", () => (window.location = "/"));

  const icon = document.createElement("img");
  icon.src = "/assets/icon.jpg";
  icon.alt = "Account Icon";

  const username = document.createElement("p");
  username.innerText = "Av32000";

  const linksDiv = document.createElement("div");
  linksDiv.classList.add("links");

  const homeLink = document.createElement("p");
  homeLink.innerText = "Home";
  homeLink.addEventListener("click", () => (window.location = "/"));

  const projectsLink = document.createElement("p");
  projectsLink.innerText = "Projects";
  projectsLink.addEventListener(
    "click",
    () => (window.location = "/projects.html")
  );

  const contactLink = document.createElement("p");
  contactLink.innerText = "Contact";
  contactLink.addEventListener(
    "click",
    () => (window.location = "/contact.html")
  );

  userDiv.append(icon, username);
  linksDiv.append(homeLink, projectsLink, contactLink);

  navBarDiv.append(userDiv, linksDiv);
}

function renderProjectHeader(headerDiv, project) {
  headerDiv.classList.add("project-header");
  headerDiv.innerHTML = renderProjectCover(project).innerHTML;

  const projectName = document.createElement("p");
  projectName.classList.add("project-name");
  projectName.innerText = project.name;

  headerDiv.append(projectName);
}

function renderProjectContent(contentDiv, project) {
  if (!project.contentBlocks) return;

  contentDiv.classList.add("content");

  for (let i = 0; i < project.contentBlocks.length; i++) {
    const block = project.contentBlocks[i];

    switch (block.type) {
      case "text":
        const textBlock = document.createElement("p");
        textBlock.innerHTML = block.value;
        contentDiv.append(textBlock);
        break;

      case "quote":
        const quoteBlock = document.createElement("p");
        quoteBlock.classList.add("quote-text");
        quoteBlock.innerHTML = block.value;
        contentDiv.append(quoteBlock);
        break;

      case "images":
        const imagesBlock = document.createElement("div");
        imagesBlock.classList.add("images-block");
        block.value.forEach((image, i) => {
          const imageBlock = document.createElement("div");
          imageBlock.classList.add("image-container");

          const imageElem = document.createElement("img");
          imageElem.src = `/assets/projects/images/${image}`;
          imageElem.addEventListener("click", () =>
            loadFullscreenImage(
              block.value.map((image) => `/assets/projects/images/${image}`),
              i
            )
          );
          imageBlock.append(imageElem);
          imagesBlock.append(imageBlock);
        });
        contentDiv.append(imagesBlock);
        break;

      case "image":
        const imageBlock = document.createElement("img");
        imageBlock.style.cursor = "pointer";
        imageBlock.src = `/assets/projects/images/${block.value}`;
        imageBlock.addEventListener("click", () =>
          loadFullscreenImage([imageBlock.src])
        );
        contentDiv.append(imageBlock);
        break;

      case "youtube":
        const embed = document.createElement("iframe");
        embed.src = `https://www.youtube-nocookie.com/embed/${block.value}`;
        embed.allowFullscreen = true;
        embed.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        embed.setAttribute("frameborder", 0);
        embed.referrerPolicy = "strict-origin-when-cross-origin";
        contentDiv.append(embed);
        break;

      case "related":
        const selectedProjects = projects
          .filter(
            (p) =>
              (block.value.includes(p.type) && p.id != project.id) ||
              block.value.includes(p.id)
          )
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);

        if (selectedProjects.length == 0) break;

        const relatedProjects = document.createElement("div");
        relatedProjects.classList.add("related-projects");

        const title = document.createElement("p");
        title.innerText = "You might like";

        const projectsList = document.createElement("div");
        projectsList.classList.add("projects-list");

        selectedProjects.forEach((p) =>
          projectsList.append(renderProjectCardSmall(p))
        );

        relatedProjects.append(title, projectsList);
        contentDiv.append(relatedProjects);
        break;
      default:
        break;
    }
  }
}

function renderSkillsWheel(wheelDiv, skills) {
  wheelDiv.classList.add("wheel-container");

  const wheel = document.createElement("div");
  wheel.classList.add("wheel");

  const content = document.createElement("div");
  content.classList.add("wheel-content", "fade-in");
  const title = document.createElement("p");
  title.classList.add("title");
  title.innerText = skills[0].name;

  content.appendChild(title);

  skills[0].content.forEach((str) => {
    const contentText = document.createElement("p");
    contentText.innerHTML = str;
    content.appendChild(contentText);
  });

  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];

    const skillContainer = document.createElement("div");
    skillContainer.classList.add("skill-container");
    skillContainer.setAttribute("skillid", i);

    const icon = document.createElement("img");
    icon.alt = skill.name;
    skillContainer.append(icon);
    wheel.append(skillContainer);
  }

  wheelDiv.append(wheel, content);
  startSkillsWheel(wheelDiv, skills);
}

async function getLastCommit(repo) {
  const githubApiEndpoint = "https://api.github.com/repos/";
  const lastUpdate = await (await fetch(githubApiEndpoint + repo)).json();
  return FormatDate(lastUpdate.pushed_at);
}

function FormatDate(sDate) {
  const date = new Date(sDate);
  const now = new Date();

  const diffTime = Math.abs(now - date);
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffSeconds < 10) {
    return "just now";
  } else if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays === 1) {
    return "yesterday";
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else if (diffYears === 1) {
    return "last year";
  } else {
    return `${diffYears} years ago`;
  }
}
