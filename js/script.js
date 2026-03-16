const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav = siteNav.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle && siteNav.classList.contains("open")) {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  siteNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Animated counters
const counters = document.querySelectorAll(".count");

if (counters.length > 0) {
  let countersStarted = false;

  const startCounting = () => {
    if (countersStarted) return;
    countersStarted = true;

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

  const metricsSection = document.querySelector(".results-bar");

  if (metricsSection) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting();
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.35 });

    counterObserver.observe(metricsSection);
  }
}

// Scroll reveal animation
const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });
}

// Services page active tabs on scroll
const serviceTabs = document.querySelectorAll(".services-tab");
const serviceSections = document.querySelectorAll("#websites, #shopify, #paid-ads");

if (serviceTabs.length > 0 && serviceSections.length > 0) {
  const setActiveTab = () => {
    let currentId = "";

    serviceSections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });

    serviceTabs.forEach(tab => {
      tab.classList.remove("active");
      const href = tab.getAttribute("href");
      if (href === `#${currentId}`) {
        tab.classList.add("active");
      }
    });
  };

  setActiveTab();
  window.addEventListener("scroll", setActiveTab);
}
