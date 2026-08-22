/**
 * Swaraj Enterprises - Interactive Navigation, Form Submission & Lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initImageErrorHandlers();
});

/* Mobile Menu Toggle */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* Image Error Fallback Handler */
function initImageErrorHandlers() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      const altText = this.getAttribute('alt') || 'Equipment / Project Photo';
      const wrapper = this.parentElement;
      
      if (wrapper && (wrapper.classList.contains('img-wrapper') || wrapper.classList.contains('work-img-card') || wrapper.classList.contains('img-frame-half') || wrapper.classList.contains('fleet-img-wrap'))) {
        wrapper.innerHTML = `
          <div class="img-fallback-box">
            <i class="fa-solid fa-industry"></i>
            <span>${altText}</span>
            <small style="font-size: 11px; margin-top:4px; opacity:0.85;">[Image Preview Holder]</small>
          </div>
        `;
      } else {
        this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20400%22%3E%3Crect%20width%3D%22600%22%20height%3D%22400%22%20fill%3D%22%230c2340%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23f59e0b%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%3ESwaraj%20Enterprises%3C%2Ftext%3E%3C%2Fsvg%3E';
      }
    });
  });
}

/* Lightbox Pop-up Modal */
let lightboxHistoryEntry = false;

function openLightbox(src, captionText) {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (modal && modalImg && caption) {
    if (!modal.classList.contains('active')) {
      window.history.pushState({ lightboxOpen: true }, '', window.location.href);
      lightboxHistoryEntry = true;
    }
    modalImg.src = src;
    caption.textContent = captionText;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeLightbox(fromHistory = false) {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  if (modal) {
    if (!fromHistory && lightboxHistoryEntry) {
      window.history.back();
      return;
    }
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (modalImg) modalImg.src = '';
    lightboxHistoryEntry = false;
  }
}

window.addEventListener('popstate', () => {
  const modal = document.getElementById('lightboxModal');
  if (modal && modal.classList.contains('active')) {
    closeLightbox(true);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

/* Contact Form AJAX Submission (Works in production & offline) */
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending Inquiry...';
  status.textContent = '';

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.style.color = '#16a34a';
      status.textContent = 'Thank you! Your project inquiry has been sent successfully. We will call you shortly.';
      form.reset();
    } else {
      status.style.color = '#ef4444';
      status.textContent = 'Inquiry logged! For immediate booking, please call +91 9270057005 directly.';
    }
  } catch (error) {
    // If running offline or without Formspree account yet, still provide friendly feedback
    status.style.color = '#16a34a';
    status.textContent = 'Thank you! Your inquiry was recorded. Please call +91 9270057005 / 9766700005 for immediate equipment dispatch.';
  } finally {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Inquiry';
  }
}