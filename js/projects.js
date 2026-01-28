// Id Filters
const params = new URLSearchParams(window.location.search);
const projectIds =
  params
    .get("ids")
    ?.split(",")
    .map((id) => parseInt(id))
    .filter((id) => !isNaN(id)) || [];

// Order Filters
const projectsOrder =
  params
    .get("order")
    ?.split(",")
    .map((id) => parseInt(id))
    .filter((id) => !isNaN(id)) || [];

// Projects Filters
const anchors = ["", "#it", "#films", "#photos"];
let currentFilter = anchors.indexOf(window.location.hash || "");
if (currentFilter == -1) {
  currentFilter = 0;
}
history.replaceState(null, null, window.location.pathname);

let filters = [];
const projectsGrid = document.getElementById("projects-grid");
const projectsFiltersBtn = Array.from(
  document.getElementsByClassName("projects-filter"),
);

function updateFilters() {
  let filters = {
    types: [],
    favoriteOnly: false,
    order: projectsOrder,
    ids: projectIds,
  };
  projectsFiltersBtn.forEach((e) => e.classList.remove("selected"));
  projectsFiltersBtn
    .find((pf) => pf.id == "projects-filter-" + currentFilter)
    .classList.add("selected");

  switch (currentFilter) {
    case 0:
      filters.types = ["films", "dev", "photos"];
      break;

    case 1:
      filters.types = ["dev"];
      break;

    case 2:
      filters.types = ["films"];
      break;

    case 3:
      filters.types = ["photos"];
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
