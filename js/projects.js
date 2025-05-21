// Projects Filters
let currentFilter = 0;
let filters = [];
const projectsGrid = document.getElementById("projects-grid");
const projectsFiltersBtn = Array.from(
  document.getElementsByClassName("projects-filter")
);

function updateFilters() {
  projectsFiltersBtn.forEach((e) => e.classList.remove("selected"));
  projectsFiltersBtn
    .find((pf) => pf.id == "projects-filter-" + currentFilter)
    .classList.add("selected");

  switch (currentFilter) {
    case 0:
      filters = ["more"];
      break;

    case 1:
      filters = ["more", "films", "photos"];
      break;

    case 2:
      filters = ["more", "dev", "photos"];
      break;

    case 3:
      filters = ["more", "dev", "films"];
      break;

    default:
      break;
  }

  projectsGrid.innerHTML = "";
  renderProjectsGrid(projectsGrid, filters);
}

projectsFiltersBtn.forEach((pf) => {
  pf.addEventListener("click", (e) => {
    currentFilter = parseInt(e.target.id.split("-").slice(-1));
    updateFilters();
  });
});

function render() {
  const footerDiv = document.getElementById("socials");
  const navbar = document.getElementById("navbar");

  renderNavBar(navbar);
  renderFooter(footerDiv);
}

render();
updateFilters();
