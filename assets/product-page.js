// OMAVI — Product page interactions
(function () {
  // Nav scroll
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Reveal observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // Quantity
  document.querySelectorAll('.qty').forEach(qty => {
    const input = qty.querySelector('input');
    qty.querySelector('.qty-dec').addEventListener('click', () => {
      const v = Math.max(1, parseInt(input.value || '1') - 1);
      input.value = v;
    });
    qty.querySelector('.qty-inc').addEventListener('click', () => {
      const v = Math.min(99, parseInt(input.value || '1') + 1);
      input.value = v;
    });
  });

  // Add to cart toast
  const toast = document.getElementById('toast');
  document.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (toast) {
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(() => toast.classList.remove('show'), 2400);
      }
    });
  });

  // Gallery thumbs — swap active state + main view
  const galleryMain = document.getElementById('galleryMain');
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      if (!galleryMain) return;
      const view = thumb.dataset.view;
      const fullImg = document.getElementById('galleryFullImg');
      if (view === 'full' && fullImg) {
        galleryMain.classList.add('full-active');
        fullImg.classList.add('show');
      } else {
        galleryMain.classList.remove('full-active');
        if (fullImg) fullImg.classList.remove('show');
      }
    });
  });
})();
