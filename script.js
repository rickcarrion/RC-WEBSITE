document.addEventListener("DOMContentLoaded", () => {
  const LANGUAGE_STORAGE_KEY = "rc-site-language";
  const DEFAULT_LANGUAGE = "en";
  const WHATSAPP_URL = "https://wa.me/18576055571";
  const data = window.RC_DATA || { en: { projects: [], companies: [] }, es: { projects: [], companies: [] } };

  // English copy lives in index.html and is captured on load; Spanish lives here.
  // Every data-i18n key in index.html needs an entry below.
  const copy = {
    en: {
      "meta.title": document.title,
      "meta.description": document.querySelector('meta[name="description"]').content,
      "work.all": "All",
      "whatsapp.general":
        "Hello Ricardo, I visited your website and I would like to ask you a question about your services.",
      "whatsapp.service":
        "Hello Ricardo, I visited your website and I am interested in your {service} service. I would like to ask you a question about it.",
      "whatsapp.case":
        "Hello Ricardo, I visited your website and I would like to request a detailed case study of your work.",
      "whatsapp.service.automation": "process automation",
      "whatsapp.service.cloud": "cloud deployment",
      "whatsapp.service.chatbot": "chatbot",
      "whatsapp.service.forecast": "sales forecasting",
      "whatsapp.service.recommend": "recommendation engine",
      "whatsapp.service.segment": "customer segmentation",
    },
    es: {
      "meta.title": "Ricardo Carrión | Soluciones de datos e IA que llegan a producción",
      "meta.description":
        "Ricardo Carrión diseña y construye soluciones de datos e IA sobre big data y nube, con base estadística. Automatización de procesos, despliegue en la nube, chatbots, pronóstico de ventas, motores de recomendación y segmentación de clientes en LATAM y Estados Unidos.",
      "nav.skip": "Ir al contenido",
      "nav.label": "Principal",
      "nav.language": "Idioma",
      "nav.services": "Servicios",
      "nav.approach": "Enfoque",
      "nav.demo": "Demo",
      "nav.work": "Proyectos",
      "nav.experience": "Experiencia",
      "nav.education": "Educación",
      "nav.contact": "Contacto",
      "hero.title": "Construyo soluciones de datos e IA que llegan a producción.",
      "hero.lede":
        "Diseño y construyo soluciones de datos e IA, sobre big data y nube y con base estadística, que se convierten en productos reales y resultados medibles.",
      "chooser.question": "¿Qué te trae por aquí?",
      "chooser.automation.tab": "¿Haces el mismo trabajo manual una y otra vez?",
      "chooser.automation.name": "Automatización de procesos",
      "chooser.automation.text": "La misma extracción, el mismo Excel, los mismos correos, cada semana. Automatizo toda la rutina para que tome segundos en lugar de horas.",
      "chooser.automation.li1": "Datos extraídos y limpiados de tus sistemas automáticamente",
      "chooser.automation.li2": "Reportes, hojas de cálculo y documentos que se generan solos",
      "chooser.automation.li3": "Correos y notificaciones recurrentes enviados sin que nadie escriba",
      "chooser.automation.proof": "Ya lo hice: la recepción de documentos de una aseguradora peruana, que pasó de procesamiento manual a extracción y aprobación automáticas.",
      "chooser.cloud.tab": "¿Tienes un programa que solo funciona en tu computadora?",
      "chooser.cloud.name": "Despliegue en la nube",
      "chooser.cloud.text": "Funciona bien en tu computadora, y solo ahí. Lo pongo en línea para que todo tu equipo use el mismo producto desde cualquier lugar.",
      "chooser.cloud.li1": "Tu programa funcionando en la nube, disponible a toda hora",
      "chooser.cloud.li2": "Acceso seguro para cada persona de tu equipo",
      "chooser.cloud.li3": "Preparado para seguir funcionando cuando más personas lo usen",
      "chooser.cloud.proof": "Ya lo hice: cinco años de datos de proyectos de una constructora colombiana, convertidos en una herramienta en línea que sus clientes consultan cuando la necesitan.",
      "chooser.chatbot.tab": "¿Quieres un chatbot que de verdad entienda a tus clientes?",
      "chooser.chatbot.name": "Chatbots",
      "chooser.chatbot.text": "La mayoría de los chatbots no entiende la pregunta y deja a la gente sin solución. Construyo uno que entiende lo que tu cliente necesita y lo resuelve.",
      "chooser.chatbot.li1": "Tus preguntas más frecuentes respondidas automáticamente",
      "chooser.chatbot.li2": "Todo lo demás derivado a la persona correcta de tu equipo",
      "chooser.chatbot.li3": "Disponible en tu sitio web, línea telefónica o app",
      "chooser.chatbot.proof": "Ya lo hice: la atención al cliente de uno de los bancos más grandes de Perú, automatizada en chat web, teléfono y app móvil.",
      "chooser.forecast.tab": "¿Necesitas saber cuánto vas a vender?",
      "chooser.forecast.name": "Pronóstico de ventas",
      "chooser.forecast.text": "Conoce cómo se verán tus ventas antes de que empiece el mes. Construyo el pronóstico sobre tu propio historial para que planifiques inventario, personal y presupuesto.",
      "chooser.forecast.li1": "Pronósticos de ventas por producto, tienda o región",
      "chooser.forecast.li2": "Actualizados automáticamente cuando llegan datos nuevos",
      "chooser.forecast.li3": "Entregados en números claros con los que tu equipo puede actuar",
      "chooser.forecast.proof": "Ya lo hice: una plataforma de pronóstico para una de las tres mayores compañías de bebidas del mundo, usada por cientos de embotelladoras en Sudamérica.",
      "chooser.recommend.tab": "¿No sabes qué ofrecerle a cada cliente?",
      "chooser.recommend.name": "Motores de recomendación",
      "chooser.recommend.text": "Tienes muchos clientes y muchos productos. Construyo el motor que te dice qué ofrecerle a cada uno, según lo que ya compra.",
      "chooser.recommend.li1": "Sugerencias personalizadas para cada cliente",
      "chooser.recommend.li2": "Oportunidades de venta cruzada encontradas en tu historial de compras",
      "chooser.recommend.li3": "Conectado a los sistemas que ya usas",
      "chooser.recommend.proof": "Ya lo hice: un retailer nacional en Bolivia que creció en ingresos sin clientes nuevos, con tres sugerencias personalizadas por interacción.",
      "chooser.segment.tab": "¿Quieres saber quiénes son realmente tus clientes?",
      "chooser.segment.name": "Segmentación de clientes",
      "chooser.segment.text": "Entiende a tus clientes y aumenta tu ganancia apuntando a los correctos. Los agrupo según cómo compran de verdad, para que cada campaña tenga una audiencia clara.",
      "chooser.segment.li1": "Grupos de clientes claros, construidos a partir de su comportamiento real de compra",
      "chooser.segment.li2": "Listas preparadas para email marketing y promociones",
      "chooser.segment.li3": "Ofertas dirigidas a los clientes con mayor probabilidad de responder",
      "chooser.segment.proof": "Ya lo hice: buyer personas para una app de delivery que opera en cuatro países de Sudamérica.",
      "cta.whatsapp": "Escríbeme por WhatsApp",
      "cta.work": "Ver los proyectos",
      "proof.label": "Trayectoria",
      "proof.years": "años liderando proyectos de datos e IA para las empresas más grandes de LATAM",
      "proof.projects": "proyectos entregados en ocho industrias",
      "proof.revenue": "de aumento en ingresos",
      "proof.efficiency": "de mejora en eficiencia",
      "about.heading":
        "La mayoría de las empresas tiene datos. La mayoría tiene herramientas de IA. Pocas tienen resultados.",
      "about.gap": "En esa brecha es donde trabajo.",
      "about.p1":
        "Durante más de 5 años he liderado transformaciones de datos e IA para algunas de las empresas más grandes de LATAM en retail, banca, salud y seguros. La estrategia y la ejecución son la misma persona: escribo el Python, diseño la arquitectura y entrego el resultado.",
      "about.p2":
        "El 80% de los proyectos de IA falla en la base. Por eso cada proyecto empieza por los datos, no por el modelo. ¿Están limpios, conectados y son confiables? Después la IA va donde genera una ventaja real.",
      "about.p3":
        "Vivo en Boston, trabajo en inglés y en español, y estoy cursando un MS en Financial Management en Boston University, para que el caso de ROI hable el idioma del CFO.",
      "about.portraitAlt": "Retrato de Ricardo Carrión",
      "steps.heading": "Cómo se desarrolla cada proyecto",
      "steps.1.title": "Diagnosticar",
      "steps.1.text": "Auditar la base de datos y definir el número que el proyecto va a cambiar.",
      "steps.2.title": "Diseñar",
      "steps.2.text": "Dar forma a la estrategia y la arquitectura alrededor de ese número.",
      "steps.3.title": "Desplegar",
      "steps.3.text": "Construir la solución y ponerla en producción en tu nube.",
      "steps.4.title": "Escalar",
      "steps.4.text": "Llevar el piloto a toda la empresa y demostrar que el número se movió.",
      "demo.heading": "Cómo se ve una empresa guiada por datos",
      "demo.tab": "Motor de recomendación",
      "demo.intro":
        "Juega a ser tendero por un minuto. Tienes una pequeña tienda de abarrotes y quieres ofrecerle a cada cliente un producto más. Primero adivina y luego mira lo que dicen tus datos.",
      "work.heading": "Proyectos",
      "work.intro":
        "Doce soluciones en ocho industrias. Los nombres de los clientes son confidenciales; hay casos detallados disponibles a solicitud.",
      "work.filterLabel": "Filtrar por industria",
      "work.all": "Todos",
      "work.request": "Solicita un caso por WhatsApp",
      "experience.heading": "Experiencia",
      "experience.intro":
        "De científico de datos a estar a cargo de la arquitectura de datos en la nube de una empresa y de sus primeras iniciativas de IA.",
      "education.heading": "Educación",
      "education.intro":
        "Economía para el rigor, un MBA para la estrategia y finanzas para ponerle un número a ambos.",
      "education.bu.when": "Sep 2026 – May 2027, en curso",
      "education.bu.degree": "Master of Science en Financial Management",
      "education.bu.note": "Boston, Estados Unidos",
      "education.egade.when": "Sep 2025 – Sep 2026",
      "education.egade.degree": "Maestría en Administración de Empresas (MBA)",
      "education.egade.note": "Monterrey, México. GPA 9.54/10",
      "education.usfq.when": "May 2014 – May 2019",
      "education.usfq.degree": "Economía, minor en Seguros. Magna Cum Laude",
      "education.usfq.note": "Quito, Ecuador. GPA 3.82/4",
      "education.esade.when": "Jul – Ago 2018",
      "education.esade.degree": "Programa Internacional de Verano en Emprendimiento e Innovación",
      "education.esade.note": "Barcelona, España",
      "education.uncw.when": "2017 – 2018",
      "education.uncw.degree": "Programa de intercambio académico",
      "education.uncw.note": "Wilmington, Estados Unidos",
      "contact.heading": "Primero los datos. Después la IA. Después los resultados.",
      "contact.lede": "Cuéntame qué número quieres cambiar. WhatsApp es la forma más rápida de contactarme.",
      "contact.linkedin": "Conecta en LinkedIn",
      "contact.location": "Con base en Boston, Massachusetts. Trabajo en LATAM y Estados Unidos.",
      "footer.location": "Con base en Boston, Massachusetts",
      "footer.rights": "© 2026 Ricardo Carrión. Todos los derechos reservados.",
      "whatsapp.general":
        "Hola Ricardo, visité tu sitio web y me gustaría hacerte una consulta sobre tus servicios.",
      "whatsapp.service":
        "Hola Ricardo, visité tu sitio web y me interesa tu servicio de {service}. Me gustaría hacerte una consulta al respecto.",
      "whatsapp.case":
        "Hola Ricardo, visité tu sitio web y me gustaría solicitar un caso de estudio detallado de tu trabajo.",
      "whatsapp.service.automation": "automatización de procesos",
      "whatsapp.service.cloud": "despliegue en la nube",
      "whatsapp.service.chatbot": "chatbots",
      "whatsapp.service.forecast": "pronóstico de ventas",
      "whatsapp.service.recommend": "motores de recomendación",
      "whatsapp.service.segment": "segmentación de clientes",
    },
  };

  const sectorLabels = {
    banking: { en: "Banking", es: "Banca" },
    retail: { en: "Retail", es: "Retail" },
    insurance: { en: "Insurance", es: "Seguros" },
    healthcare: { en: "Healthcare", es: "Salud" },
    construction: { en: "Construction", es: "Construcción" },
    beverage: { en: "Beverage", es: "Bebidas" },
    delivery: { en: "Delivery", es: "Delivery" },
    consulting: { en: "Consulting", es: "Consultoría" },
  };

  const translatableAttributes = ["aria-label", "alt"];
  const languageButtons = [...document.querySelectorAll("[data-language-option]")];
  const workFilters = document.getElementById("work-filters");
  const workList = document.getElementById("work-list");
  const experienceList = document.getElementById("experience-list");

  let language = DEFAULT_LANGUAGE;
  let activeSector = "all";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function captureEnglishContent() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      copy.en[element.dataset.i18n] = element.textContent.replace(/\s+/g, " ").trim();
    });
    translatableAttributes.forEach((attribute) => {
      document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
        copy.en[element.getAttribute(`data-i18n-${attribute}`)] = element.getAttribute(attribute);
      });
    });
  }

  function t(key) {
    return copy[language][key] ?? copy.en[key] ?? "";
  }

  function whatsappHref(kind) {
    const service = t(`whatsapp.service.${kind}`);
    const message = service ? t("whatsapp.service").replace("{service}", service) : t(`whatsapp.${kind}`);
    return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  }

  function safelyGetStoredLanguage() {
    try {
      return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function safelyStoreLanguage(value) {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    } catch (error) {
      // Storage can be unavailable (private mode); the choice just won't persist.
    }
  }

  function resolveInitialLanguage() {
    const stored = safelyGetStoredLanguage();
    if (stored === "en" || stored === "es") {
      return stored;
    }
    return (navigator.language || "").toLowerCase().startsWith("es") ? "es" : DEFAULT_LANGUAGE;
  }

  function applyStaticTranslations() {
    document.documentElement.lang = language;
    document.title = t("meta.title");
    document.querySelector('meta[name="description"]').content = t("meta.description");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    translatableAttributes.forEach((attribute) => {
      document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
        element.setAttribute(attribute, t(element.getAttribute(`data-i18n-${attribute}`)));
      });
    });

    languageButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.languageOption === language));
    });

    // Each WhatsApp button opens the chat with a message already written, in
    // the visitor's language and naming the service they were looking at.
    document.querySelectorAll("[data-whatsapp]").forEach((link) => {
      link.href = whatsappHref(link.dataset.whatsapp);
    });
  }

  function renderWorkFilters() {
    const projects = data[language].projects;
    const sectors = Object.keys(sectorLabels).filter((sector) =>
      projects.some((project) => project.sector === sector),
    );
    const options = [{ key: "all", label: t("work.all"), count: projects.length }].concat(
      sectors.map((sector) => ({
        key: sector,
        label: sectorLabels[sector][language],
        count: projects.filter((project) => project.sector === sector).length,
      })),
    );

    workFilters.innerHTML = options
      .map(
        (option) =>
          `<button type="button" data-sector="${option.key}" aria-pressed="${option.key === activeSector}">${escapeHtml(option.label)} (${option.count})</button>`,
      )
      .join("");
  }

  function renderWorkList() {
    const projects = data[language].projects.filter(
      (project) => activeSector === "all" || project.sector === activeSector,
    );

    workList.innerHTML = projects
      .map(
        (project) => `
          <details class="work-row" name="work">
            <summary>
              <span class="work-title">${escapeHtml(project.title)}</span>
              <span class="work-meta">${escapeHtml(project.industry)}, ${escapeHtml(project.region)}</span>
            </summary>
            <div class="work-body">
              <p>${escapeHtml(project.description)}</p>
              <ul class="tags">${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
            </div>
          </details>`,
      )
      .join("");
  }

  function renderExperience() {
    experienceList.innerHTML = data[language].companies
      .map(
        (company, companyIndex) => `
          <article class="company">
            <div>
              <h3>${escapeHtml(company.name)}</h3>
              <p class="company-meta">${escapeHtml(company.dates)}<br />${escapeHtml(company.location)}</p>
            </div>
            <ol class="roles">
              ${company.roles
                .map(
                  (role, roleIndex) => `
                    <li>
                      <details class="role"${companyIndex === 0 && roleIndex === 0 ? " open" : ""}>
                        <summary>
                          <span class="role-title">${escapeHtml(role.title)}</span>
                          <span class="role-period">${escapeHtml(role.period)}</span>
                        </summary>
                        <ul>${role.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
                      </details>
                    </li>`,
                )
                .join("")}
            </ol>
          </article>`,
      )
      .join("");
  }

  function setLanguage(value, { persist = true } = {}) {
    language = value === "es" ? "es" : "en";
    if (persist) {
      safelyStoreLanguage(language);
    }
    applyStaticTranslations();
    renderWorkFilters();
    renderWorkList();
    renderExperience();
    if (window.RC_GAME) {
      window.RC_GAME.setLanguage(language);
    }
  }

  function initChooser() {
    const tabs = [...document.querySelectorAll('.chooser-tabs [role="tab"]')];

    function selectTab(tab, { focus = false } = {}) {
      tabs.forEach((candidate) => {
        const isSelected = candidate === tab;
        candidate.setAttribute("aria-selected", String(isSelected));
        candidate.tabIndex = isSelected ? 0 : -1;
        document.getElementById(candidate.getAttribute("aria-controls")).hidden = !isSelected;
      });
      // On phones the tabs are a horizontal strip: bring the active one into view.
      const strip = tab.parentElement;
      if (strip.scrollWidth > strip.clientWidth) {
        strip.scrollTo({ left: tab.offsetLeft, behavior: "smooth" });
      }
      if (focus) {
        tab.focus({ preventScroll: true });
      }
    }

    // Auto-rotation: the banner moves to the next service every ROTATION_MS.
    // The active tab fills like a progress bar (styles.css, .is-rotating) and
    // the jump happens when it is full. Hovering or focusing the banner
    // freezes the fill where it is (.is-paused) and it resumes from there;
    // picking a tab by hand stops the rotation for good.
    const ROTATION_MS = 5000;
    const chooser = document.querySelector(".chooser");
    const grid = chooser.querySelector(".chooser-grid");
    let rotationTimer = null;
    let rotationStopped = false;
    let remainingMs = ROTATION_MS;
    let resumedAt = 0;

    function pauseRotation() {
      if (rotationStopped || chooser.classList.contains("is-paused")) {
        return;
      }
      window.clearTimeout(rotationTimer);
      remainingMs = Math.max(0, remainingMs - (Date.now() - resumedAt));
      chooser.classList.add("is-paused");
    }

    function resumeRotation() {
      if (rotationStopped || grid.matches(":hover") || grid.contains(document.activeElement)) {
        return;
      }
      window.clearTimeout(rotationTimer);
      chooser.classList.remove("is-paused");
      resumedAt = Date.now();
      rotationTimer = window.setTimeout(() => {
        const current = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
        selectTab(tabs[(current + 1) % tabs.length]);
        remainingMs = ROTATION_MS;
        resumeRotation();
      }, remainingMs);
    }

    function stopRotation() {
      rotationStopped = true;
      window.clearTimeout(rotationTimer);
      chooser.classList.remove("is-rotating", "is-paused");
    }

    chooser.style.setProperty("--rotation-time", `${ROTATION_MS}ms`);
    chooser.classList.add("is-rotating", "is-paused");
    grid.addEventListener("mouseenter", pauseRotation);
    grid.addEventListener("focusin", pauseRotation);
    grid.addEventListener("mouseleave", resumeRotation);
    grid.addEventListener("focusout", () => window.setTimeout(resumeRotation, 0));
    resumeRotation();

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        stopRotation();
        selectTab(tab);
      });
      tab.addEventListener("keydown", (event) => {
        const moves = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        let target = null;
        if (event.key in moves) {
          target = tabs[(index + moves[event.key] + tabs.length) % tabs.length];
        } else if (event.key === "Home") {
          target = tabs[0];
        } else if (event.key === "End") {
          target = tabs[tabs.length - 1];
        }
        if (target) {
          event.preventDefault();
          stopRotation();
          selectTab(target, { focus: true });
        }
      });
    });
  }

  workFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-sector]");
    if (!button) {
      return;
    }
    activeSector = button.dataset.sector;
    renderWorkFilters();
    renderWorkList();
    workFilters.querySelector(`[data-sector="${activeSector}"]`).focus();
  });

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.languageOption));
  });

  // game.js builds its own WhatsApp link, in the current language.
  window.RC_WHATSAPP_HREF = whatsappHref;
  if (window.RC_GAME) {
    window.RC_GAME.init(document.getElementById("game"));
  }

  captureEnglishContent();
  initChooser();
  setLanguage(resolveInitialLanguage(), { persist: false });
});
