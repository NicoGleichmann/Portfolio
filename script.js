// Kleine Verbesserungen – die Seite funktioniert auch ohne JavaScript vollständig.
document.documentElement.classList.add('has-js');

document.addEventListener('DOMContentLoaded', () => {
  // ----- Mobile Navigation -----
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('hauptnavigation');

  if (toggle && nav) {
    toggle.hidden = false;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-header')) setOpen(false);
    });
  }

  // ----- Aktiven Abschnitt in der Navigation markieren -----
  const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  // Der Startbereich (#top) hat keinen Menüpunkt und hebt die Markierung wieder auf.
  const sections = [document.getElementById('top')]
    .concat(navLinks.map((link) => document.querySelector(link.getAttribute('href'))))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${entry.target.id}`;
            if (active) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
  }

  // ----- E-Mail-Adresse kopieren -----
  const copyButton = document.querySelector('.copy-email');
  const copyFeedback = document.querySelector('.copy-feedback');

  if (copyButton && copyFeedback && navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    let resetTimer;

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyButton.dataset.email);
        copyFeedback.textContent = 'Adresse kopiert.';
      } catch {
        copyFeedback.textContent = 'Kopieren nicht möglich – bitte die Adresse oben verwenden.';
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        copyFeedback.textContent = '';
      }, 4000);
    });
  }

  // ----- Jahr im Footer -----
  document.querySelectorAll('.current-year').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
});
