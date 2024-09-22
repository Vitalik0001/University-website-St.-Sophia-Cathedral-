const pageContent = document.getElementById("page-content");

// Function to load content from a folder
const loadContent = (folderName) => {
  fetch(`./src/pages/${folderName}/index.html`)
    .then((response) => response.text())
    .then((data) => {
      if (pageContent) {
        pageContent.innerHTML = data;
      }
    })
    .catch((error) => {
      console.error("Error loading page:", error);
    });
};

// Define routes with the corresponding folder to load
const routes = {
  "/University-website-St.-Sophia-Cathedral-/": "home",
  "/University-website-St.-Sophia-Cathedral-/history": "history",
  "/University-website-St.-Sophia-Cathedral-/architecture": "architecture",
  "/University-website-St.-Sophia-Cathedral-/influence": "influence",
};

// Handle navigation and dynamic page loading
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = () => {
  const currentRoute = window.location.pathname;
  const folderName = routes[currentRoute] || "errorPage";
  loadContent(folderName);
};

// Listen for link clicks
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu__item");
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const link = e.target.closest("[data-link]");
      if (link) {
        navigateTo(link.getAttribute("href"));
      }
    });
  });

  router(); // Load the initial route
});

// Listen for back/forward navigation
window.addEventListener("popstate", router);
