const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const counters = document.querySelectorAll('.count');
if (counters.length > 0) {
  let countersStarted = false;

  const startCounting = () => {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute('data-target'));
      let count = 0;

      const update = () => {
        const increment = Math.max(target / 80, 1);
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

  const metricsSection = document.querySelector('.results-bar');
  if (metricsSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounting();
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.35 });

    counterObserver.observe(metricsSection);
  } else {
    startCounting();
  }
}

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length > 0) {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('in-view'));
  }
}

const serviceTabs = document.querySelectorAll('.services-tab');
const serviceSections = Array.from(document.querySelectorAll('#websites, #shopify, #paid-ads'));

if (serviceTabs.length > 0 && serviceSections.length > 0) {
  const activeMap = new Map(serviceTabs.length ? Array.from(serviceTabs).map((tab) => [tab.getAttribute('href'), tab]) : []);

  const setActiveTab = (id) => {
    serviceTabs.forEach((tab) => tab.classList.toggle('active', tab.getAttribute('href') === `#${id}`));
  };

  serviceTabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      const href = tab.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      setActiveTab(target.id);
      history.replaceState(null, '', href);
      const offset = target.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  const updateActiveFromScroll = () => {
    const headerOffset = 220;
    let currentId = serviceSections[0].id;
    for (const section of serviceSections) {
      if (window.scrollY + headerOffset >= section.offsetTop) {
        currentId = section.id;
      }
    }
    setActiveTab(currentId);
  };

  updateActiveFromScroll();
  window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
}

const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };

  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
}

const packageItems = document.querySelectorAll('.package-item');
if (packageItems.length > 0) {
  packageItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      const group = item.closest('.package-accordion');
      if (!group) return;
      group.querySelectorAll('.package-item').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}
