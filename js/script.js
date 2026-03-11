const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
// Animated counters
const counters = document.querySelectorAll(".count");

if (counters.length > 0) {

  const startCounting = () => {

    counters.forEach(counter => {

      const target = +counter.getAttribute("data-target");
      let count = 0;

      const update = () => {

        const increment = target / 80;
        count += increment;

        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }

      };

      update();

    });

  };

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        startCounting();
        observer.disconnect();
      }

    });

  });

  const metricsSection = document.querySelector(".results-bar");

  if (metricsSection) {
    observer.observe(metricsSection);
  }

}
