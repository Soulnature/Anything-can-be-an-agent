const state = {
  projects: [],
  domainFilter: new Set(),
  surfaceFilter: new Set(),
  search: "",
  sort: "stars",
  view: "grid",
  selectedId: null,
};

const els = {
  domainSummary: document.getElementById("domain-summary"),
  domainFilters: document.getElementById("domain-filters"),
  surfaceFilters: document.getElementById("surface-filters"),
  projectList: document.getElementById("project-list"),
  searchInput: document.getElementById("search-input"),
  sortSelect: document.getElementById("sort-select"),
  viewSelect: document.getElementById("view-select"),
  clearFilters: document.getElementById("clear-filters"),
  visibleCount: document.getElementById("visible-count"),
  selectedDomainCount: document.getElementById("selected-domain-count"),
  resultsHint: document.getElementById("results-hint"),
  metricProjects: document.getElementById("metric-projects"),
  metricDomains: document.getElementById("metric-domains"),
  metricMeta: document.getElementById("metric-meta"),
  detailTitle: document.getElementById("detail-title"),
  detailSummary: document.getElementById("detail-summary"),
  detailDomain: document.getElementById("detail-domain"),
  detailRole: document.getElementById("detail-role"),
  detailSurfaces: document.getElementById("detail-surfaces"),
  detailLanguage: document.getElementById("detail-language"),
  detailUpdated: document.getElementById("detail-updated"),
  detailStars: document.getElementById("detail-stars"),
  detailAppRole: document.getElementById("detail-app-role"),
  detailLink: document.getElementById("detail-link"),
  cardTemplate: document.getElementById("project-card-template"),
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value || 0);
}

function formatDate(value) {
  if (!value) {
    return "Unknown";
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function normalize(text) {
  return String(text || "").toLowerCase();
}

function buildDomainSummary(projects) {
  const counts = new Map();
  projects.forEach((project) => {
    counts.set(project.domain, (counts.get(project.domain) || 0) + 1);
  });

  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  els.domainSummary.innerHTML = "";
  sorted.forEach(([domain, count]) => {
    const card = document.createElement("article");
    card.innerHTML = `
      <span>${domain.includes("Meta Resources") ? "Reference Layer" : "Domain Pack"}</span>
      <h3>${domain}</h3>
      <p><strong>${count}</strong> curated repositories</p>
    `;
    els.domainSummary.appendChild(card);
  });

  const nonMetaDomains = sorted.filter(([domain]) => !domain.includes("Meta Resources"));
  els.metricProjects.textContent = projects.filter((project) => !project.domain.includes("Meta Resources")).length;
  els.metricDomains.textContent = nonMetaDomains.length;
  els.metricMeta.textContent = sorted.filter(([domain]) => domain.includes("Meta Resources")).reduce((sum, [, count]) => sum + count, 0);
}

function createFilterButton(label, isActive, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `filter-pill${isActive ? " active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function buildFilters(projects) {
  const domains = [...new Set(projects.map((project) => project.domain))];
  const surfaces = [...new Set(projects.flatMap((project) => project.integration_surfaces || []))].sort();

  const orderedDomains = [
    ...domains.filter((domain) => !domain.includes("Meta Resources")).sort(),
    ...domains.filter((domain) => domain.includes("Meta Resources")).sort(),
  ];

  els.domainFilters.innerHTML = "";
  orderedDomains.forEach((domain) => {
    els.domainFilters.appendChild(
      createFilterButton(domain, state.domainFilter.has(domain), () => {
        if (state.domainFilter.has(domain)) {
          state.domainFilter.delete(domain);
        } else {
          state.domainFilter.add(domain);
        }
        render();
      })
    );
  });

  els.surfaceFilters.innerHTML = "";
  surfaces.forEach((surface) => {
    els.surfaceFilters.appendChild(
      createFilterButton(surface, state.surfaceFilter.has(surface), () => {
        if (state.surfaceFilter.has(surface)) {
          state.surfaceFilter.delete(surface);
        } else {
          state.surfaceFilter.add(surface);
        }
        render();
      })
    );
  });
}

function filteredProjects() {
  return state.projects
    .filter((project) => {
      const query = state.search.trim();
      const haystack = [
        project.project_name,
        project.repo,
        project.role,
        project.domain,
        project.summary,
        project.language,
        ...(project.integration_surfaces || []),
      ]
        .map(normalize)
        .join(" ");

      const matchesSearch = !query || haystack.includes(normalize(query));
      const matchesDomain = !state.domainFilter.size || state.domainFilter.has(project.domain);
      const matchesSurface =
        !state.surfaceFilter.size ||
        (project.integration_surfaces || []).some((surface) => state.surfaceFilter.has(surface));

      return matchesSearch && matchesDomain && matchesSurface;
    })
    .sort((a, b) => {
      if (state.sort === "recent") {
        return new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0);
      }
      if (state.sort === "name") {
        return a.project_name.localeCompare(b.project_name);
      }
      return (b.stars || 0) - (a.stars || 0);
    });
}

function updateDetail(project) {
  if (!project) {
    els.detailTitle.textContent = "Select a project";
    els.detailSummary.textContent =
      "Pick any card to inspect its role, integration surfaces, recency, and how it fits into an application stack.";
    els.detailDomain.textContent = "-";
    els.detailRole.textContent = "-";
    els.detailSurfaces.textContent = "-";
    els.detailLanguage.textContent = "-";
    els.detailUpdated.textContent = "-";
    els.detailStars.textContent = "-";
    els.detailAppRole.textContent = "-";
    els.detailLink.classList.add("disabled");
    els.detailLink.href = "#";
    return;
  }

  els.detailTitle.textContent = project.project_name;
  els.detailSummary.textContent = project.summary || "No summary available.";
  els.detailDomain.textContent = project.domain;
  els.detailRole.textContent = project.role || "Unknown";
  els.detailSurfaces.textContent = (project.integration_surfaces || []).join(", ") || "Unknown";
  els.detailLanguage.textContent = project.language || "Unknown";
  els.detailUpdated.textContent = formatDate(project.pushed_at);
  els.detailStars.textContent = formatNumber(project.stars || 0);
  els.detailAppRole.textContent = project.suggested_app_role || "No suggested role available.";
  els.detailLink.classList.remove("disabled");
  els.detailLink.href = project.url;
}

function renderProjects(projects) {
  els.projectList.className = `project-list ${state.view}`;
  els.projectList.innerHTML = "";

  if (!projects.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No projects match the current filters.";
    els.projectList.appendChild(empty);
    updateDetail(null);
    return;
  }

  const selected = projects.find((project) => project.repo === state.selectedId) || projects[0];
  state.selectedId = selected.repo;
  updateDetail(selected);

  projects.forEach((project) => {
    const fragment = els.cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".project-card");
    card.classList.toggle("active", project.repo === state.selectedId);
    card.addEventListener("click", () => {
      state.selectedId = project.repo;
      render();
    });

    fragment.querySelector(".project-domain").textContent = project.domain;
    fragment.querySelector(".project-stars").textContent = `${formatNumber(project.stars || 0)} stars`;
    fragment.querySelector(".project-title").textContent = project.project_name;
    fragment.querySelector(".project-role").textContent = project.role || "Unknown role";
    fragment.querySelector(".project-summary").textContent = project.summary || "No summary available.";

    const surfaces = fragment.querySelector(".project-surfaces");
    (project.integration_surfaces || []).forEach((surface) => {
      const tag = document.createElement("span");
      tag.className = "surface-pill";
      tag.textContent = surface;
      surfaces.appendChild(tag);
    });

    els.projectList.appendChild(fragment);
  });
}

function render() {
  buildFilters(state.projects);
  const visible = filteredProjects();
  renderProjects(visible);
  els.visibleCount.textContent = visible.length;
  els.selectedDomainCount.textContent = state.domainFilter.size || new Set(visible.map((project) => project.domain)).size;
  els.resultsHint.textContent = `${visible.length} projects shown across ${new Set(visible.map((project) => project.domain)).size} domains.`;
}

async function init() {
  try {
    const response = await fetch("results.json");
    state.projects = await response.json();
    buildDomainSummary(state.projects);
    render();
  } catch (error) {
    els.resultsHint.textContent = "Failed to load results.json.";
    els.projectList.innerHTML = '<div class="empty-state">The dataset could not be loaded. Make sure results.json is available next to the site files.</div>';
    console.error(error);
  }
}

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

els.sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  render();
});

els.viewSelect.addEventListener("change", (event) => {
  state.view = event.target.value;
  render();
});

els.clearFilters.addEventListener("click", () => {
  state.domainFilter.clear();
  state.surfaceFilter.clear();
  state.search = "";
  state.sort = "stars";
  state.view = "grid";
  els.searchInput.value = "";
  els.sortSelect.value = "stars";
  els.viewSelect.value = "grid";
  render();
});

init();
