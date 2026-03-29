document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => observer.observe(element));

  const progressBar = document.querySelector('.scroll-progress');
  const updateScrollProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  const interactiveCards = document.querySelectorAll('.interactive-card');
  interactiveCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 7;
      const rotateX = ((y / rect.height) - 0.5) * -7;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const form = document.querySelector('.contact-form');
  const feedback = document.querySelector('.form-feedback');

  if (!form || !feedback) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      feedback.textContent = 'Bitte fülle alle Felder korrekt aus.';
      feedback.style.color = '#ff9c9c';
      return;
    }

    feedback.textContent = 'Sende Nachricht...';
    feedback.style.color = '#d8c08e';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Form submit failed');
      }

      feedback.textContent = 'Danke! Deine Nachricht wurde erfolgreich gesendet.';
      feedback.style.color = '#9be8bf';
      form.reset();
    } catch {
      feedback.textContent =
        'Senden fehlgeschlagen. Bitte versuche es später erneut oder schreibe direkt an nicogleichmann1@gmail.com.';
      feedback.style.color = '#ff9c9c';
    }
  });
});
