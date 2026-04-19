/* ============================================================
   SPARKLING FACILITY SOLUTIONS — Core JavaScript
   ============================================================ */

'use strict';

// ── Nav Scroll Effect ──────────────────────────────────────
const nav = document.getElementById('main-nav');
if (nav) {
  const handleNavScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
}

// ── Mobile Nav Toggle ─────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });

  // Close on mobile link click
  mobileNav.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// ── Active Nav Link ────────────────────────────────────────
(function markActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link, .nav__dropdown-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
})();

// ── Scroll Animations (Intersection Observer) ──────────────
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
};

// ── Counter Animation ──────────────────────────────────────
const animateCounters = () => {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = (timestamp, start) => {
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(ts => step(ts, start));
        };
        requestAnimationFrame(ts => step(ts, ts));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
};

// ── Particle Canvas ────────────────────────────────────────
const initParticles = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.4 + 0.05;
      this.size = Math.random() * 1.5 + 0.5;
      this.color = Math.random() > 0.5 ? '0,212,255' : '0,71,255';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  const init = () => {
    resize();
    particles = Array.from({ length: 60 }, () => new Particle());
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(draw);
  };

  init();
  draw();
  window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
};

// ── AI Intake Chatbot ──────────────────────────────────────
const initAIIntake = () => {
  const toggle = document.getElementById('ai-toggle');
  const panel = document.getElementById('ai-panel');
  const messagesEl = document.getElementById('ai-messages');
  const inputEl = document.getElementById('ai-input');
  const sendBtn = document.getElementById('ai-send');
  const optionsEl = document.getElementById('ai-options');

  if (!toggle || !panel) return;

  // Chat state machine
  const state = {
    step: 0,
    data: {},
    open: false
  };

  const conversation = [
    {
      bot: "👋 Hi! I'm SPARK, your dedicated AI assistant for Sparkling Facility Solutions.\n\nAre you looking for a quote or have a question about our Florida commercial cleaning services?",
      options: ['Get a Quote', 'Learn About Services', 'Post-Construction Cleaning', 'Facility / Janitorial'],
      field: null
    },
    {
      bot: "Great! I'll connect you with the right specialist. First — what type of project are you working on?",
      options: ['Post-Construction Clean', 'Ongoing Janitorial', 'Turnover / Move-In Ready', 'One-Time Deep Clean', 'Floor Care', 'Multiple Services'],
      field: 'projectType'
    },
    {
      bot: "Got it! And what type of facility or building is this for?",
      options: ['Office / Corporate', 'New Construction', 'Retail / Commercial', 'Medical / Dental', 'Warehouse / Industrial', 'HOA / Multi-Unit', 'Other'],
      field: 'facilityType'
    },
    {
      bot: "Perfect. What's the approximate square footage of the space?",
      options: ['Under 2,000 sq ft', '2,000–5,000 sq ft', '5,000–15,000 sq ft', '15,000–50,000 sq ft', '50,000+ sq ft'],
      field: 'squareFootage'
    },
    {
      bot: "Which Florida region are you located in?",
      options: ['Miami / Ft Lauderdale', 'West Palm Beach', 'Tampa / St. Pete', 'Orlando / Central FL', 'Jacksonville', 'Naples / Ft Myers', 'Statewide / Multiple'],
      field: 'location'
    },
    {
      bot: "Almost done! What's your timeline?",
      options: ['Urgent (48 hrs)', 'This Week', 'Within 2 Weeks', 'This Month', 'Planning Phase'],
      field: 'timeline'
    },
    {
      bot: "Excellent! We're ready to build your custom proposal. Please type your name and company so we can route your request to the right specialist:",
      options: [],
      field: 'contact'
    },
    {
      bot: (data) => `Thank you, ${data.contact || 'there'}! 🎉\n\nYour intake summary has been captured:\n• Project: ${data.projectType || 'N/A'}\n• Facility: ${data.facilityType || 'N/A'}\n• Size: ${data.squareFootage || 'N/A'}\n• Region: ${data.location || 'N/A'}\n• Timeline: ${data.timeline || 'N/A'}\n\nA senior Sparkling Facility Solutions specialist will contact you within 2 hours with a tailored proposal.\n\n📋 For faster service, head to our full quote form to upload your floor plans!`,
      options: ['Get Full Quote Form ➜'],
      field: null,
      final: true
    }
  ];

  const addMessage = (text, isBot = true, animate = true) => {
    const msg = document.createElement('div');
    msg.className = `ai-intake__msg ai-intake__msg--${isBot ? 'bot' : 'user'}`;

    const bubble = document.createElement('div');
    bubble.className = 'ai-intake__msg-bubble';
    bubble.textContent = text;

    msg.appendChild(bubble);
    messagesEl.appendChild(msg);

    if (animate) {
      bubble.style.opacity = '0';
      bubble.style.transform = 'translateY(8px)';
      requestAnimationFrame(() => {
        bubble.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        bubble.style.opacity = '1';
        bubble.style.transform = 'translateY(0)';
      });
    }

    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  };

  const showTyping = () => {
    const typing = document.createElement('div');
    typing.className = 'ai-intake__msg ai-intake__msg--bot';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const hideTyping = () => {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  };

  const showOptions = (options) => {
    optionsEl.innerHTML = '';
    if (!options || !options.length) return;

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'ai-intake__option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        handleOption(opt);
      });
      optionsEl.appendChild(btn);
    });
  };

  const handleOption = (value) => {
    if (state.step >= conversation.length - 1) {
      if (value.includes('Quote Form')) {
        window.location.href = 'quote.html';
      }
      return;
    }

    const current = conversation[state.step];
    if (current.field) {
      state.data[current.field] = value;
    }

    addMessage(value, false);
    optionsEl.innerHTML = '';

    state.step++;
    const next = conversation[state.step];

    showTyping();
    setTimeout(() => {
      hideTyping();
      const text = typeof next.bot === 'function' ? next.bot(state.data) : next.bot;
      addMessage(text, true);
      showOptions(next.options);

      if (next.final) {
        saveLeadData(state.data);
      }
    }, 800 + Math.random() * 400);
  };

  const handleUserInput = () => {
    const val = inputEl.value.trim();
    if (!val) return;

    if (state.step >= conversation.length - 1) return;

    const current = conversation[state.step];
    if (current.field) {
      state.data[current.field] = val;
    }

    addMessage(val, false);
    inputEl.value = '';
    optionsEl.innerHTML = '';

    state.step++;
    if (state.step >= conversation.length) return;

    const next = conversation[state.step];
    showTyping();
    setTimeout(() => {
      hideTyping();
      const text = typeof next.bot === 'function' ? next.bot(state.data) : next.bot;
      addMessage(text, true);
      showOptions(next.options);
      if (next.final) saveLeadData(state.data);
    }, 800);
  };

  const saveLeadData = async (data) => {
    try {
      await fetch('tables/ai_leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'AI Chatbot',
          timestamp: new Date().toISOString()
        })
      });
    } catch (e) {
      // Silently fail - not blocking UX
    }
  };

  // Toggle panel
  toggle.addEventListener('click', () => {
    state.open = !state.open;
    panel.classList.toggle('open', state.open);

    // Initialize conversation on first open
    if (state.open && messagesEl.children.length === 0) {
      setTimeout(() => {
        showTyping();
        setTimeout(() => {
          hideTyping();
          addMessage(conversation[0].bot, true);
          showOptions(conversation[0].options);
        }, 600);
      }, 200);
    }

    toggle.innerHTML = state.open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-robot"></i>';
  });

  // Send events
  sendBtn.addEventListener('click', handleUserInput);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserInput();
  });
};

// ── Toast Notification ─────────────────────────────────────
const showToast = (message, type = 'success', duration = 4000) => {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'} toast__icon"></i>
    <span class="toast__text">${message}</span>
    <button class="toast__close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
  `;

  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  const dismiss = () => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  };

  toast.querySelector('.toast__close').addEventListener('click', dismiss);
  setTimeout(dismiss, duration);
};

// ── Form Validation ────────────────────────────────────────
const validateForm = (formEl) => {
  let valid = true;
  formEl.querySelectorAll('[required]').forEach(field => {
    const parent = field.closest('.form-group');
    const errorEl = parent ? parent.querySelector('.form-error') : null;

    if (!field.value.trim()) {
      field.style.borderColor = '#ff4444';
      if (errorEl) errorEl.style.display = 'block';
      valid = false;
    } else {
      field.style.borderColor = '';
      if (errorEl) errorEl.style.display = 'none';
    }
  });
  return valid;
};

// ── File Upload Handler ────────────────────────────────────
const initFileUpload = (zoneId, fileListId, acceptedTypes) => {
  const zone = document.getElementById(zoneId);
  const fileInput = zone ? zone.querySelector('input[type="file"]') : null;
  const listEl = document.getElementById(fileListId);

  if (!zone || !fileInput || !listEl) return [];

  let files = [];

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (name) => {
    const ext = name.split('.').pop().toLowerCase();
    const icons = {
      pdf: 'fa-file-pdf', doc: 'fa-file-word', docx: 'fa-file-word',
      xls: 'fa-file-excel', xlsx: 'fa-file-excel',
      jpg: 'fa-file-image', jpeg: 'fa-file-image', png: 'fa-file-image',
      dwg: 'fa-drafting-compass', dxf: 'fa-drafting-compass',
      zip: 'fa-file-zipper', rar: 'fa-file-zipper'
    };
    return `fa-solid ${icons[ext] || 'fa-file'}`;
  };

  const renderFiles = () => {
    listEl.innerHTML = '';
    files.forEach((file, i) => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `
        <i class="${getFileIcon(file.name)} file-item__icon"></i>
        <span class="file-item__name">${file.name}</span>
        <span class="file-item__size">${formatSize(file.size)}</span>
        <button class="file-item__remove" data-index="${i}" aria-label="Remove file">
          <i class="fa-solid fa-xmark"></i>
        </button>
      `;
      listEl.appendChild(item);
    });

    listEl.querySelectorAll('.file-item__remove').forEach(btn => {
      btn.addEventListener('click', () => {
        files.splice(parseInt(btn.dataset.index), 1);
        renderFiles();
      });
    });
  };

  const addFiles = (newFiles) => {
    const maxSize = 50 * 1024 * 1024; // 50MB per file
    Array.from(newFiles).forEach(f => {
      if (f.size > maxSize) {
        showToast(`${f.name} exceeds the 50MB limit`, 'error');
        return;
      }
      if (files.length >= 10) {
        showToast('Maximum 10 files allowed', 'error');
        return;
      }
      files.push(f);
    });
    renderFiles();
  };

  // Drag & drop
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    addFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', () => {
    addFiles(fileInput.files);
    fileInput.value = '';
  });

  // Return getter for files
  return { getFiles: () => files };
};

// ── Multi-Step Form ────────────────────────────────────────
const initMultiStepForm = () => {
  const form = document.getElementById('multi-step-form');
  if (!form) return;

  const steps = form.querySelectorAll('.form-step');
  const indicators = document.querySelectorAll('.step-indicator__step');
  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => {
      step.style.display = i === index ? 'block' : 'none';
    });

    indicators.forEach((ind, i) => {
      ind.classList.remove('active', 'completed');
      if (i < index) ind.classList.add('completed');
      if (i === index) ind.classList.add('active');
    });

    window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
  };

  form.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const step = steps[currentStep];
      const requiredFields = step.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ff4444';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  form.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  showStep(0);
};

// ── Quote Form Submission ──────────────────────────────────
const initQuoteForm = () => {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch('tables/quote_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'Quote Form',
          submitted_at: new Date().toISOString()
        })
      });

      // Show success state
      form.innerHTML = `
        <div class="text-center" style="padding: 3rem 0;">
          <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--color-primary),var(--color-accent));display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 1.5rem;box-shadow:0 0 30px rgba(0,212,255,0.4);">✓</div>
          <h3 style="font-size:1.5rem;margin-bottom:0.75rem;font-family:var(--font-heading);">Quote Request Submitted!</h3>
          <p style="color:var(--color-text-secondary);margin-bottom:1.5rem;max-width:400px;margin-left:auto;margin-right:auto;">
            A senior Sparkling Facility Solutions specialist will review your project details and contact you within 2 business hours with a tailored proposal.
          </p>
          <div style="padding:1.25rem;background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.2);border-radius:12px;margin-bottom:2rem;text-align:left;max-width:400px;margin-left:auto;margin-right:auto;">
            <div style="font-size:0.8rem;font-weight:700;color:var(--color-primary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.75rem;">What Happens Next</div>
            <div style="display:flex;flex-direction:column;gap:0.5rem;">
              <div style="display:flex;gap:0.75rem;align-items:center;font-size:0.82rem;color:var(--color-text-secondary);"><span style="color:var(--color-primary);">1.</span> Our team reviews your project scope</div>
              <div style="display:flex;gap:0.75rem;align-items:center;font-size:0.82rem;color:var(--color-text-secondary);"><span style="color:var(--color-primary);">2.</span> We prepare a customized proposal</div>
              <div style="display:flex;gap:0.75rem;align-items:center;font-size:0.82rem;color:var(--color-text-secondary);"><span style="color:var(--color-primary);">3.</span> A specialist calls you to confirm scope</div>
              <div style="display:flex;gap:0.75rem;align-items:center;font-size:0.82rem;color:var(--color-text-secondary);"><span style="color:var(--color-primary);">4.</span> We deliver your written proposal</div>
            </div>
          </div>
          <a href="index.html" class="btn btn--primary">Return to Homepage</a>
        </div>
      `;
    } catch (err) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showToast('Something went wrong. Please call us at (305) 434-6070.', 'error');
    }
  });
};

// ── Smooth Scroll for Anchor Links ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Tab System ─────────────────────────────────────────────
const initTabs = (containerSelector) => {
  document.querySelectorAll(containerSelector).forEach(container => {
    const tabs = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-tab-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.style.display = 'none');

        tab.classList.add('active');
        const panel = container.querySelector(`[data-tab-panel="${target}"]`);
        if (panel) panel.style.display = 'block';
      });
    });

    // Init first tab
    if (tabs.length) tabs[0].click();
  });
};

// ── FAQ Accordion ──────────────────────────────────────────
const initFAQ = () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.faq-content').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
};

// ── Initialize Everything ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  animateCounters();
  initAIIntake();
  initParticles('particle-canvas');
  initMultiStepForm();
  initQuoteForm();
  initTabs('.tabs-container');
  initFAQ();
});
