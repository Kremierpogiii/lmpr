const projects = [
  {
    id: 1,
    title: 'Azure Residential Towers',
    category: 'residential',
    location: 'Bonifacio Global City',
    client: 'Prime Developers Inc.',
    year: '2025',
    desc: 'A 25-storey residential tower combining premium finishes, efficient planning, smart-home systems, and a generous rooftop amenity deck.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 2,
    title: 'Northgate Commercial Hub',
    category: 'commercial',
    location: 'Quezon City',
    client: 'Northgate Holdings',
    year: '2024',
    desc: 'A mixed-use business destination bringing together flexible offices, street-level retail, landscaped public space, and transport access.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 3,
    title: 'Laguna Industrial Complex',
    category: 'industrial',
    location: 'Laguna',
    client: 'Pacific Manufacturing Corp.',
    year: '2025',
    desc: 'A 50,000-square-metre manufacturing and logistics campus engineered for safe operations, efficient flows, and future expansion.',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 4,
    title: 'Verdana Residences',
    category: 'residential',
    location: 'Cavite',
    client: 'Verdana Estates',
    year: '2024',
    desc: 'A contemporary residential community of 200 homes with a clubhouse, pool, landscaped parks, and connected walking routes.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 5,
    title: 'Makati Corporate Tower',
    category: 'commercial',
    location: 'Makati City',
    client: 'Private Developer',
    year: '2025',
    desc: 'A high-performance office tower delivered with sustainable material choices, energy-efficient systems, and adaptable floor plates.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 6,
    title: 'Cebu Logistics Facility',
    category: 'industrial',
    location: 'Cebu City',
    client: 'Cebu Logistics Inc.',
    year: '2024',
    desc: 'A temperature-controlled storage and distribution facility designed for resilient operations and reliable product handling.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85'
  }
];

const header = document.getElementById('siteHeader');
const nav = document.getElementById('mainNav');
const menu = document.getElementById('hamburger');
const grid = document.getElementById('portfolioGrid');
const modal = document.getElementById('projectModal');

function onScroll() {
  const y = window.scrollY;
  const range = document.documentElement.scrollHeight - innerHeight;

  header.classList.toggle('scrolled', y > 30);

  document
    .getElementById('scrollTop')
    .classList.toggle('show', y > 550);

  document.getElementById('progressBar').style.width =
    `${range ? (y / range) * 100 : 0}%`;
}

addEventListener('scroll', onScroll, { passive: true });
onScroll();

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');

  menu.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});

nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  })
);

function render(filter = 'all') {
  grid.innerHTML = projects
    .filter(p => filter === 'all' || p.category === filter)
    .map(
      p => `
        <article
          class="portfolio-item reveal visible"
          data-id="${p.id}"
          tabindex="0"
          role="button"
          aria-label="View ${p.title}"
        >
          <img
            src="${p.image}"
            alt="${p.title}"
            loading="lazy"
          >

          <span class="project-arrow">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </span>

          <div class="portfolio-info">
            <span class="tag">${p.category}</span>
            <h3>${p.title}</h3>

            <p>
              <span>${p.location}</span>
              <span>${p.year}</span>
            </p>
          </div>
        </article>
      `
    )
    .join('');

  grid.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      openProject(+item.dataset.id);
    });

    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        openProject(+item.dataset.id);
      }
    });
  });
}

function openProject(id) {
  const p = projects.find(x => x.id === id);

  if (!p) return;

  document.getElementById('modalImage').src = p.image;
  document.getElementById('modalImage').alt = p.title;
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalClient').textContent = p.client;
  document.getElementById('modalYear').textContent = p.year;

  modal.classList.add('active');

  document.body.style.overflow = 'hidden';

  document.getElementById('closeModal').focus();
}

function closeProject() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.filter-btn').forEach(btn =>
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.filter-btn')
      .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    render(btn.dataset.filter);
  })
);

document
  .getElementById('closeModal')
  .addEventListener('click', closeProject);

modal.addEventListener('click', e => {
  if (e.target === modal) {
    closeProject();
  }
});

addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeProject();
  }
});

document
  .getElementById('scrollTop')
  .addEventListener('click', () =>
    scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  );

document
  .getElementById('contactForm')
  .addEventListener('submit', e => {
    e.preventDefault();

    document
      .getElementById('formSuccess')
      .classList.add('show');

    e.currentTarget.reset();
  });

const observer = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
  {
    threshold: 0.12
  }
);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

render();