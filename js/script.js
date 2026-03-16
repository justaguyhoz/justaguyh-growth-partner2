const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}



const tabs = document.querySelectorAll(".services-tab");
const sections = document.querySelectorAll(".service-section");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  tabs.forEach(tab => {

    tab.classList.remove("active");

    if (tab.getAttribute("href") === "#" + current) {
      tab.classList.add("active");
    }

  });

});
