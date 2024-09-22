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
  "/": "home",
  "/history": "history",
  "/architecture": "architecture",
  "/influence": "influence",
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
  const menuItem = document.querySelectorAll(".menu__item");
  menuItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.href);
      }
    });
  });

  router(); // Load the initial route
});

// Listen for back/forward navigation
window.addEventListener("popstate", router);
