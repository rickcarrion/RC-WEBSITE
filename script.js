document.addEventListener("DOMContentLoaded", () => {
  const LANGUAGE_STORAGE_KEY = "rc-site-language";
  const DEFAULT_LANGUAGE = "en";
  const REGION_SEPARATOR = " · ";
  const spanishCopy = window.RC_SITE_COPY_ES || {};

  const descriptionMeta = document.querySelector('meta[name="description"]');
  const languageSwitch = document.querySelector(".language-switch");
  const languageButtons = [...document.querySelectorAll("[data-language-option]")];
  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const footerLinks = [...document.querySelectorAll(".footer-links a")];
  const serviceCards = [...document.querySelectorAll(".services-grid .service-card")];
  const experienceCards = [...document.querySelectorAll(".experience-journey-card")];
  const coachingCards = [...document.querySelectorAll(".coaching-grid .coaching-card")];
  const contactChips = [...document.querySelectorAll(".contact-info .contact-chip")];
  const formLabels = [...document.querySelectorAll(".contact-form .form-label-text")];
  const interestSelect = document.querySelector('.contact-form select[name="interest"]');
  const languageChangeHandlers = [];

  function q(selector, root = document) {
    return root.querySelector(selector);
  }

  function qa(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  }

  function setText(target, value, root = document) {
    const element = typeof target === "string" ? q(target, root) : target;
    if (element) {
      element.textContent = value;
    }
  }

  function setHTML(target, value, root = document) {
    const element = typeof target === "string" ? q(target, root) : target;
    if (element) {
      element.innerHTML = value;
    }
  }

  function setAttr(target, attribute, value, root = document) {
    const element = typeof target === "string" ? q(target, root) : target;
    if (element) {
      element.setAttribute(attribute, value);
    }
  }

  function setLeadingIconText(target, value, root = document) {
    const element = typeof target === "string" ? q(target, root) : target;
    if (!element) {
      return;
    }

    const firstElement = element.firstElementChild;
    if (!firstElement) {
      element.textContent = value;
      return;
    }

    element.replaceChildren(firstElement, document.createTextNode(` ${value}`));
  }

  function setChipText(target, smallText, strongText) {
    const element = typeof target === "string" ? q(target) : target;
    if (!element) {
      return;
    }

    const small = element.querySelector("small");
    const strong = element.querySelector("strong");

    if (small) {
      small.textContent = smallText;
    }

    if (strong) {
      strong.textContent = strongText;
    }
  }

  function applyTemplate(template, values) {
    return Object.entries(values).reduce(
      (output, [key, value]) => output.replace(`{${key}}`, String(value)),
      template,
    );
  }

  function safelyGetStoredLanguage() {
    try {
      return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function safelyStoreLanguage(language) {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      // Ignore local storage restrictions.
    }
  }

  const englishPortfolioProjects = [
    {
      title: "Analytics Platform",
      sector: "beverage",
      sectorLabel: "Beverage",
      industry: "Beverage Industry",
      region: "LATAM",
      description:
        "One of the three largest beverage companies in the world needed to bring analytics to hundreds of small bottlers across South America. We built a forecasting platform that allowed each bottler, regardless of size or country, to predict their sales and act on real insights. Result: a single scalable model deployed across an entire region, giving small operators the decision power of a large enterprise.",
      tags: ["Forecasting", "Scalable Deployment", "LATAM"],
    },
    {
      title: "Product Recommendation Engine",
      sector: "retail",
      sectorLabel: "Retail",
      industry: "Retail",
      region: "Bolivia",
      description:
        "A national retail leader wanted to grow revenue without acquiring new customers. We built a recommendation system that identified cross-selling opportunities from historical purchase data, offering each client three personalized suggestions per interaction. The engine combined two machine learning techniques and was powered by customer segmentation, deployed directly into their existing infrastructure.",
      tags: ["Machine Learning", "Recommendation", "Cross-selling"],
    },
    {
      title: "Invoice Risk Model",
      sector: "retail",
      sectorLabel: "Retail",
      industry: "Retail",
      region: "Argentina",
      description:
        "A large Argentine retailer needed to reduce financial exposure from advance payment approvals. The challenge: they only had data on approved cases. We built a scorecard model grounded in business logic and expert judgment, one that didn't just flag risk, but gave employees clear context on each supplier's historical behavior to support confident, defensible decisions.",
      tags: ["Risk Modelling", "Scorecard", "Business Logic"],
    },
    {
      title: "Analytics Retainer",
      sector: "construction",
      sectorLabel: "Construction",
      industry: "Construction Retail",
      region: "Ecuador",
      description:
        "We served as an embedded analytics partner for one of Ecuador's leading construction supply retailers. Delivered three initiatives: a product recommendation model across 7,000+ SKUs, an agent profiling tool using decision trees to identify top-performer characteristics, and a web scraping system that gave the sales team early visibility into new construction projects, before competitors could act.",
      tags: ["Embedded Analytics", "Decision Trees", "Web Scraping"],
    },
    {
      title: "Chatbot & Voicebot",
      sector: "banking",
      sectorLabel: "Banking",
      industry: "Banking",
      region: "Peru",
      description:
        "One of the largest banks in Peru and LATAM needed to automate customer service at scale. We architected and deployed a full conversational AI solution, from an informational chatbot on their public website, to a voicebot integrated into their IVR, to a personalized version connected to their private digital channels and mobile app. The final version integrated directly with the bank's microservices to offer products like credit cards and pre-approved loans in real time.",
      tags: ["Conversational AI", "NLP", "Banking Integration"],
    },
    {
      title: "Document Automation",
      sector: "insurance",
      sectorLabel: "Insurance",
      industry: "Insurance",
      region: "Peru",
      description:
        "A major Peruvian insurer was processing agent-change requests manually, receiving paperwork in mixed formats with no standardized flow. We automated the entire intake process using computer vision and NLP to extract information from PDFs, scanned documents, and spreadsheets, then built a machine learning model to approve or flag each request based on historical patterns.",
      tags: ["Computer Vision", "NLP", "Automation"],
    },
    {
      title: "Commercial Analytics Dashboard",
      sector: "consulting",
      sectorLabel: "Consulting",
      industry: "Consulting",
      region: "Internal",
      description:
        "Built an interactive internal dashboard to support the commercial team's decision-making across multiple analytics product lines, including smart basket, customer lifetime value, and churn models. Designed for storytelling, not just reporting: every view was built to drive a specific business conversation.",
      tags: ["Dashboards", "Storytelling", "Business Intelligence"],
    },
    {
      title: "Customer Segmentation",
      sector: "delivery",
      sectorLabel: "Delivery",
      industry: "Delivery App",
      region: "LATAM",
      description:
        "A delivery platform operating across four South American countries needed to understand who their customers actually were. We ran RFM analysis to isolate active users, applied clustering algorithms to find natural groupings, and translated the statistical output into clear buyer personas, giving the commercial team a real framework for targeting and personalization.",
      tags: ["Clustering", "RFM Analysis", "Segmentation"],
    },
    {
      title: "Appointment No-Show Prediction",
      sector: "healthcare",
      sectorLabel: "Healthcare",
      industry: "Healthcare",
      region: "Ecuador",
      description:
        "A health center was losing significant capacity to no-show appointments. We built a neural network model to predict the probability of each patient attending, enabling the operations team to act proactively, reduce waste, and optimize scheduling before the day began.",
      tags: ["Neural Networks", "Healthcare", "Predictive Analytics"],
    },
    {
      title: "Analytics API",
      sector: "construction",
      sectorLabel: "Construction",
      industry: "Construction",
      region: "Colombia",
      description:
        "A Colombian construction company had five years of project data with no way to surface it to customers. We built an API and web interface that delivered on-demand insights by price, sector, and time, turning a static data archive into a live decision-support tool for buyers and developers.",
      tags: ["API Development", "Data Products", "Construction"],
    },
    {
      title: "Store Location Predictor",
      sector: "retail",
      sectorLabel: "Retail",
      industry: "Retail",
      region: "LATAM",
      description:
        "Built a predictive application that recommends where a retail company should open its next store, using historical store performance, geographic data, and macroeconomic indicators. Translated location intelligence into a business recommendation tool for commercial and expansion teams.",
      tags: ["Geospatial Analytics", "Predictive Modeling", "Retail Expansion"],
    },
    {
      title: "Document Classification",
      sector: "banking",
      sectorLabel: "Banking",
      industry: "Banking",
      region: "South America",
      description:
        "An international development bank had decades of project documentation with no way to navigate it. We built an NLP-based classification system that grouped documents by topic and surfaced similar historical projects by keyword, giving analysts instant access to institutional memory that had been effectively invisible.",
      tags: ["NLP", "Classification", "Knowledge Management"],
    },
  ];

  function captureEnglishContent() {
    const content = {
      meta: {
        title: document.title,
        description: descriptionMeta?.getAttribute("content") || "",
      },
      header: {
        navAriaLabel: q(".site-nav")?.getAttribute("aria-label") || "Primary",
        links: navLinks.map((link) => link.textContent.trim()),
        languageSelectorAriaLabel:
          languageSwitch?.getAttribute("aria-label") || "Language selector",
        languageButtons: {
          en: { ariaLabel: "Switch site language to English", title: "Switch to English" },
          es: { ariaLabel: "Switch site language to Spanish", title: "Switch to Spanish" },
        },
      },
      hero: {
        subtitle: q(".hero-subtitle")?.textContent.trim() || "",
        support: q(".hero-support")?.textContent.trim() || "",
        primaryCta: q(".hero-actions .button-primary")?.textContent.trim() || "",
        whatsappCta: q(".hero-actions .button-whatsapp")?.textContent.trim() || "",
        scrollAriaLabel: q(".scroll-indicator")?.getAttribute("aria-label") || "",
      },
      about: {
        heading: q("#about .section-heading h2")?.textContent.trim() || "",
        portraitAlt: q(".portrait-ring img")?.getAttribute("alt") || "",
        experiencePill: q(".experience-pill")?.textContent.trim() || "",
        paragraphs: qa(".about-copy p").map((paragraph) => paragraph.innerHTML.trim()),
        approachTitle: q(".about-info-row .dark-card h3")?.textContent.trim() || "",
        approachItems: qa(".about-info-row .dark-card .approach-list li").map((item) => item.innerHTML.trim()),
        expertiseTitle: q(".about-info-row .gradient-card h3")?.textContent.trim() || "",
        expertiseText: q(".about-info-row .gradient-card p")?.innerHTML.trim() || "",
      },
      services: {
        heading: q("#services .section-heading h2")?.textContent.trim() || "",
        intro:
          "Two focused offers built to create business momentum, career clarity, and stronger professional positioning",
        cards: serviceCards.map((card) => ({
          title: q("h3", card)?.textContent.trim() || "",
          description: q("p", card)?.textContent.trim() || "",
          bullets: qa("ul li", card).map((item) => item.textContent.trim()),
          cta: q(".button", card)?.textContent.trim() || "",
        })),
        wideCta: {
          title: q(".wide-cta h3")?.textContent.trim() || "",
          description: q(".wide-cta p")?.textContent.trim() || "",
          button: q(".wide-cta .button-whatsapp")?.textContent.trim() || "",
        },
      },
      portfolio: {
        heading: q("#portfolio .section-heading h2")?.textContent.trim() || "",
        intro: q("#portfolio .section-heading p")?.textContent.trim() || "",
        sectorRowAriaLabel: q("#portfolio-sectors")?.getAttribute("aria-label") || "Industries worked",
        autoplayNote: q(".portfolio-carousel-note")?.textContent.trim() || "",
        footerNote: q(".portfolio-footer p")?.textContent.trim() || "",
        footerButton: q(".portfolio-footer .button")?.textContent.trim() || "",
        projectLabel: "Project",
        sequenceSuffix: "sequence",
        industryProgress: "{current} of {total} in this industry",
        projects: englishPortfolioProjects,
      },
      experience: {
        heading: q("#experience .section-heading h2")?.textContent.trim() || "",
        intro: q("#experience .section-heading p")?.textContent.trim() || "",
        stats: qa(".stats-grid .stat-card span").map((item) => item.textContent.trim()),
        companies: experienceCards.map((card) => ({
          name: q(".experience-head h3", card)?.textContent.trim() || "",
          trackAriaLabel: q(".experience-track", card)?.getAttribute("aria-label") || "",
          trackSteps: qa(".experience-track-step", card).map((step) => step.textContent.trim()),
          meta: qa(".experience-meta p", card).map((item) => item.textContent.trim()),
          roles: qa(".experience-role-panel", card).map((panel) => ({
            kicker: q(".experience-role-kicker", panel)?.textContent.trim() || "",
            title: q(".role", panel)?.textContent.trim() || "",
            period: q(".experience-role-period", panel)?.textContent.trim() || "",
            bullets: qa(".experience-list p", panel).map((item) => item.textContent.trim()),
          })),
        })),
      },
      education: {
        heading: q("#education .section-heading h2")?.textContent.trim() || "",
        intro: q("#education .section-heading p")?.textContent.trim() || "",
        eyebrow: q(".education-eyebrow")?.textContent.trim() || "",
        mapHint: q(".education-map-hint")?.textContent.trim() || "",
        statusKicker: q(".education-map-status-kicker")?.textContent.trim() || "",
        mapAriaLabel: q("#education-study-map")?.getAttribute("aria-label") || "",
        jumpListAriaLabel: q(".education-map-jump-list")?.getAttribute("aria-label") || "",
        fallback:
          "The live map could not load right now. You can still use the city cards to switch the education journey.",
        timer: { next: "Next city in {seconds}s", traveling: "Traveling..." },
        stats: qa(".education-map-stats div span").map((item) => item.textContent.trim()),
        stops: {},
      },
      coaching: {
        heading: q("#coaching .section-heading h2")?.textContent.trim() || "",
        intro: q("#coaching .section-heading p")?.textContent.trim() || "",
        cards: coachingCards.map((card) => ({
          title: q("h3", card)?.textContent.trim() || "",
          description: q("p", card)?.textContent.trim() || "",
        })),
        benefitsTitle: q(".coaching-benefits h3")?.textContent.trim() || "",
        benefits: qa(".coaching-benefits li").map((item) => item.textContent.trim()),
        offerTitle: q(".coaching-offer h3")?.textContent.trim() || "",
        offerDescription: q(".coaching-offer > p")?.textContent.trim() || "",
        offerDetails: qa(".coaching-offer .offer-inner p").map((item) => item.innerHTML.trim()),
        cta: q(".coaching-offer .button")?.textContent.trim() || "",
        quote: q(".quote-card p")?.textContent.trim() || "",
      },
      contact: {
        heading: q("#contact .section-heading h2")?.textContent.trim() || "",
        intro: q("#contact .section-heading p")?.textContent.trim() || "",
        infoTitle: q(".contact-info h3")?.textContent.trim() || "",
        chips: contactChips.map((chip) => ({
          small: chip.querySelector("small")?.textContent.trim() || "",
          strong: chip.querySelector("strong")?.textContent.trim() || "",
        })),
        form: {
          kicker: q(".contact-form-kicker")?.textContent.trim() || "",
          title: q(".contact-form h3")?.textContent.trim() || "",
          intro: q(".contact-form-intro")?.textContent.trim() || "",
          whatsappFirst: q(".contact-primary-action")?.textContent.trim() || "",
          linkedin: q(".contact-form-link")?.textContent.trim() || "",
          labels: {
            name: formLabels[0]?.textContent.trim() || "Name",
            email: formLabels[1]?.textContent.trim() || "Email",
            interest: formLabels[2]?.textContent.trim() || "I'm interested in",
            message: formLabels[3]?.textContent.trim() || "Message",
          },
          placeholders: {
            name: q('.contact-form input[name="name"]')?.getAttribute("placeholder") || "",
            email: q('.contact-form input[name="email"]')?.getAttribute("placeholder") || "",
            message: q('.contact-form textarea[name="message"]')?.getAttribute("placeholder") || "",
          },
          options: interestSelect ? qa("option", interestSelect).map((option) => option.textContent.trim()) : [],
          submit: q(".contact-submit-button")?.textContent.trim() || "",
          note: q(".contact-note")?.textContent.trim() || "",
          draftGreeting: "Hello Ricardo,",
          draftLabels: { name: "Name", email: "Email", interest: "Interest", message: "Message" },
        },
      },
      footer: {
        description: q(".site-footer .footer-grid > div:first-child p")?.textContent.trim() || "",
        quickLinksTitle: q(".site-footer .footer-grid > div:nth-child(2) h3")?.textContent.trim() || "",
        links: footerLinks.map((link) => link.textContent.trim()),
        connectTitle: q(".site-footer .footer-grid > div:nth-child(3) h3")?.textContent.trim() || "",
        basedIn: q(".site-footer .footer-grid > div:nth-child(3) p")?.textContent.trim() || "",
        copyright: q(".footer-bottom p:first-child")?.textContent.trim() || "",
        values: "Strategic • Pragmatic • Trustworthy",
      },
    };

    qa(".education-entry").forEach((entry) => {
      const id = entry.dataset.edu;
      const marker = q(`.education-marker[data-edu="${id}"]`);
      content.education.stops[id] = {
        country: q(".education-entry-kicker", entry)?.textContent.trim() || "",
        regionLabel: marker?.dataset.regionLabel || "",
        city: marker?.dataset.city || "",
        admin: marker?.dataset.admin || "",
        shortSchool:
          q(".education-marker-subtitle", marker)?.textContent.trim().split("·")[0]?.trim() ||
          "",
        jumpAriaLabel: marker?.getAttribute("aria-label") || "",
        school: entry.dataset.school || q("h3", entry)?.textContent.trim() || "",
        summary: entry.dataset.summary || "",
        location: entry.dataset.location || "",
        period: entry.dataset.period || "",
        highlights: (entry.dataset.highlights || "").split("|").filter(Boolean),
        degree: q(".education-entry-degree", entry)?.textContent.trim() || "",
        meta: qa(".education-entry-meta span", entry).map((item) => item.textContent.trim()),
        notes: qa(".education-entry-notes span", entry).map((item) => item.innerHTML.trim()),
      };
    });

    content.education.stops.egade.school =
      "EGADE Business School - Tecnológico de Monterrey";
    content.education.stops.egade.summary =
      "MBA studies in Mexico reinforcing executive leadership, business strategy, and transformation management for senior decision-making.";
    content.education.stops.egade.location = "Monterrey, Mexico";
    content.education.stops.egade.highlights = [
      "Executive Leadership",
      "Business Strategy",
      "Transformation Management",
    ];

    return content;
  }

  const englishCopy = captureEnglishContent();
  const copyByLanguage = { en: englishCopy, es: spanishCopy };
  let currentLanguage = DEFAULT_LANGUAGE;

  function getCopy() {
    return copyByLanguage[currentLanguage] || englishCopy;
  }

  function onLanguageChange(handler) {
    if (typeof handler === "function") {
      languageChangeHandlers.push(handler);
    }
  }

  function resolveInitialLanguage() {
    const stored = safelyGetStoredLanguage();
    if (stored && copyByLanguage[stored]) {
      return stored;
    }
    const browserLanguages =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language].filter(Boolean);
    if (
      browserLanguages.some((language) =>
        String(language).toLowerCase().startsWith("es"),
      )
    ) {
      return "es";
    }
    return DEFAULT_LANGUAGE;
  }

  function updateLanguageSwitch() {
    const copy = getCopy();
    if (languageSwitch) {
      languageSwitch.setAttribute(
        "aria-label",
        copy.header.languageSelectorAriaLabel,
      );
    }
    languageButtons.forEach((button) => {
      const language = button.dataset.languageOption;
      const isActive = language === currentLanguage;
      const buttonCopy = copy.header.languageButtons[language];
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
      if (buttonCopy) {
        button.setAttribute("aria-label", buttonCopy.ariaLabel);
        button.setAttribute("title", buttonCopy.title);
      }
    });
  }

  function applyStaticTranslations() {
    const copy = getCopy();
    document.documentElement.lang = currentLanguage;
    document.body.dataset.language = currentLanguage;
    document.title = copy.meta.title;
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", copy.meta.description);
    }
    setAttr(".site-nav", "aria-label", copy.header.navAriaLabel);
    navLinks.forEach((link, index) => setText(link, copy.header.links[index] || ""));
    footerLinks.forEach((link, index) => setText(link, copy.footer.links[index] || ""));

    setText(".hero-subtitle", copy.hero.subtitle);
    setText(".hero-support", copy.hero.support);
    setText(".hero-actions .button-primary", copy.hero.primaryCta);
    setLeadingIconText(".hero-actions .button-whatsapp", copy.hero.whatsappCta);
    setAttr(".scroll-indicator", "aria-label", copy.hero.scrollAriaLabel);

    setText("#about .section-heading h2", copy.about.heading);
    setAttr(".portrait-ring img", "alt", copy.about.portraitAlt);
    setText(".experience-pill", copy.about.experiencePill);
    qa(".about-copy p").forEach((paragraph, index) => {
      paragraph.innerHTML = copy.about.paragraphs[index] || "";
    });
    setText(".about-info-row .dark-card h3", copy.about.approachTitle);
    qa(".about-info-row .dark-card .approach-list li").forEach((item, index) => {
      item.innerHTML = copy.about.approachItems[index] || "";
    });
    setText(".about-info-row .gradient-card h3", copy.about.expertiseTitle);
    setHTML(".about-info-row .gradient-card p", copy.about.expertiseText);

    setText("#services .section-heading h2", copy.services.heading);
    setText("#services .section-heading p", copy.services.intro);
    serviceCards.forEach((card, index) => {
      const cardCopy = copy.services.cards[index];
      if (!cardCopy) {
        return;
      }
      setText("h3", cardCopy.title, card);
      setText("p", cardCopy.description, card);
      qa("ul li", card).forEach((item, itemIndex) => {
        item.textContent = cardCopy.bullets[itemIndex] || "";
      });
      setLeadingIconText(q(".button", card), cardCopy.cta);
    });
    setText(".wide-cta h3", copy.services.wideCta.title);
    setText(".wide-cta p", copy.services.wideCta.description);
    setLeadingIconText(".wide-cta .button-whatsapp", copy.services.wideCta.button);

    setText("#portfolio .section-heading h2", copy.portfolio.heading);
    setText("#portfolio .section-heading p", copy.portfolio.intro);
    setAttr("#portfolio-sectors", "aria-label", copy.portfolio.sectorRowAriaLabel);
    setText(".portfolio-carousel-note", copy.portfolio.autoplayNote);
    setText(".portfolio-footer p", copy.portfolio.footerNote);
    setText(".portfolio-footer .button", copy.portfolio.footerButton);

    setText("#experience .section-heading h2", copy.experience.heading);
    setText("#experience .section-heading p", copy.experience.intro);
    qa(".stats-grid .stat-card span").forEach((item, index) => {
      item.textContent = copy.experience.stats[index] || "";
    });

    setText("#education .section-heading h2", copy.education.heading);
    setText("#education .section-heading p", copy.education.intro);
    setText(".education-eyebrow", copy.education.eyebrow);
    setText(".education-map-hint", copy.education.mapHint);
    setText(".education-map-status-kicker", copy.education.statusKicker);
    setAttr("#education-study-map", "aria-label", copy.education.mapAriaLabel);
    setAttr(".education-map-jump-list", "aria-label", copy.education.jumpListAriaLabel);
    qa(".education-map-stats div span").forEach((item, index) => {
      item.textContent = copy.education.stats[index] || "";
    });

    setText("#coaching .section-heading h2", copy.coaching.heading);
    setText("#coaching .section-heading p", copy.coaching.intro);
    coachingCards.forEach((card, index) => {
      const cardCopy = copy.coaching.cards[index];
      if (!cardCopy) {
        return;
      }
      setText("h3", cardCopy.title, card);
      setText("p", cardCopy.description, card);
    });
    setText(".coaching-benefits h3", copy.coaching.benefitsTitle);
    qa(".coaching-benefits li").forEach((item, index) => {
      item.textContent = copy.coaching.benefits[index] || "";
    });
    setText(".coaching-offer h3", copy.coaching.offerTitle);
    setText(".coaching-offer > p", copy.coaching.offerDescription);
    qa(".coaching-offer .offer-inner p").forEach((item, index) => {
      item.innerHTML = copy.coaching.offerDetails[index] || "";
    });
    setLeadingIconText(".coaching-offer .button", copy.coaching.cta);
    setText(".quote-card p", copy.coaching.quote);

    setText("#contact .section-heading h2", copy.contact.heading);
    setText("#contact .section-heading p", copy.contact.intro);
    setText(".contact-info h3", copy.contact.infoTitle);
    contactChips.forEach((chip, index) => {
      const chipCopy = copy.contact.chips[index];
      if (chipCopy) {
        setChipText(chip, chipCopy.small, chipCopy.strong);
      }
    });
    setText(".contact-form-kicker", copy.contact.form.kicker);
    setText(".contact-form h3", copy.contact.form.title);
    setText(".contact-form-intro", copy.contact.form.intro);
    setLeadingIconText(".contact-primary-action", copy.contact.form.whatsappFirst);
    setLeadingIconText(".contact-form-link", copy.contact.form.linkedin);
    const labelValues = [
      copy.contact.form.labels.name,
      copy.contact.form.labels.email,
      copy.contact.form.labels.interest,
      copy.contact.form.labels.message,
    ];
    formLabels.forEach((label, index) => {
      label.textContent = labelValues[index] || "";
    });
    setAttr('.contact-form input[name="name"]', "placeholder", copy.contact.form.placeholders.name);
    setAttr('.contact-form input[name="email"]', "placeholder", copy.contact.form.placeholders.email);
    setAttr('.contact-form textarea[name="message"]', "placeholder", copy.contact.form.placeholders.message);
    if (interestSelect) {
      const selectedIndex = interestSelect.selectedIndex;
      qa("option", interestSelect).forEach((option, index) => {
        option.textContent = copy.contact.form.options[index] || "";
      });
      interestSelect.selectedIndex = Math.max(0, selectedIndex);
    }
    setLeadingIconText(".contact-submit-button", copy.contact.form.submit);
    setText(".contact-note", copy.contact.form.note);

    setText(".site-footer .footer-grid > div:first-child p", copy.footer.description);
    setText(".site-footer .footer-grid > div:nth-child(2) h3", copy.footer.quickLinksTitle);
    setText(".site-footer .footer-grid > div:nth-child(3) h3", copy.footer.connectTitle);
    setText(".site-footer .footer-grid > div:nth-child(3) p", copy.footer.basedIn);
    setText(".footer-bottom p:first-child", copy.footer.copyright);
    setText(".footer-bottom p:last-child", copy.footer.values);

    updateLanguageSwitch();
  }

  function setLanguage(language, options = {}) {
    currentLanguage = copyByLanguage[language] ? language : DEFAULT_LANGUAGE;
    applyStaticTranslations();
    languageChangeHandlers.forEach((handler) => handler(currentLanguage));
    if (options.persist !== false) {
      safelyStoreLanguage(currentLanguage);
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = button.dataset.languageOption;
      if (nextLanguage) {
        setLanguage(nextLanguage);
      }
    });
  });

  const form = q(".contact-form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) {
        return;
      }
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const interest =
        interestSelect?.selectedOptions?.[0]?.textContent?.trim() ||
        String(formData.get("interest") || "").trim();
      const draft = getCopy().contact.form;
      const whatsappDraft = [
        draft.draftGreeting,
        "",
        `${draft.draftLabels.name}: ${name}`,
        `${draft.draftLabels.email}: ${email}`,
        `${draft.draftLabels.interest}: ${interest}`,
        "",
        `${draft.draftLabels.message}:`,
        message,
      ].join("\n");
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(whatsappDraft);
        } catch (error) {
          // Clipboard can be blocked by the browser.
        }
      }
      window.open("https://wa.link/gcfof0", "_blank", "noopener,noreferrer");
    });
  }

  const sectorRoot = q("#portfolio-sectors");
  const cardRoot = q("#portfolio-carousel-card");
  const timerBar = q("#portfolio-timer-bar");

  if (sectorRoot && cardRoot && timerBar) {
    const sectorIcons = {
      beverage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 3h4M10.5 3v4.5l-2 2.5V18a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-8l-2-2.5V3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      retail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 8V6a4 4 0 0 1 8 0v2M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      construction: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12.5V11a8 8 0 0 1 16 0v1.5M6 12.5v4.5M18 12.5v4.5M4 17h16M9 17v4M15 17v4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      banking: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9 12 4l9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 19h18" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      insurance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3 6 5v5c0 4.4 2.5 8.5 6 10 3.5-1.5 6-5.6 6-10V5l-6-2ZM9.5 12l1.7 1.7 3.3-3.7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      consulting: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 7V5.75C8 4.231 9.231 3 10.75 3h2.5C14.769 3 16 4.231 16 5.75V7M4 8h16v10.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5V8Zm8 0v12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      delivery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 15h9V8H9M13 10h4l3 3v2h-2M7 18.5A1.5 1.5 0 1 0 7 21a1.5 1.5 0 0 0 0-2.5Zm10 0A1.5 1.5 0 1 0 17 21a1.5 1.5 0 0 0 0-2.5Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      healthcare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="4" width="16" height="16" rx="4" stroke-width="1.8"/></svg>`,
    };
    let portfolioProjects = [];
    let sectors = [];
    let projectsBySector = new Map();
    let playbackProjects = [];
    let firstProjectBySector = new Map();
    let playbackIndexByOriginalIndex = new Map();
    let activeIndex = 0;
    let startedAt = performance.now();
    let rafId = 0;
    let sectorButtons = [];
    const cycleDuration = 5000;

    function getPortfolioCopy() {
      const translated = getCopy().portfolio.projects || [];
      return englishPortfolioProjects.map((project, index) => ({
        ...project,
        ...(translated[index] || {}),
        originalIndex: index,
      }));
    }

    function updateStats() {
      const values = {
        projects: portfolioProjects.length,
        industries: sectors.length,
        roles: qa("[data-experience-role]").length,
      };
      qa("[data-stat-card]").forEach((card) => {
        const key = card.getAttribute("data-stat-card");
        const valueNode = q("[data-stat-value]", card);
        if (valueNode && key && values[key] !== undefined) {
          valueNode.textContent = String(values[key]);
        }
      });
    }

    function rebuildPortfolioData() {
      portfolioProjects = getPortfolioCopy();
      sectors = [];
      projectsBySector = new Map();
      playbackProjects = [];
      firstProjectBySector = new Map();
      playbackIndexByOriginalIndex = new Map();
      portfolioProjects.forEach((project) => {
        if (!projectsBySector.has(project.sector)) {
          projectsBySector.set(project.sector, []);
          sectors.push({
            id: project.sector,
            label: project.sectorLabel,
            icon: sectorIcons[project.sector],
          });
        }
        projectsBySector.get(project.sector).push(project);
      });
      sectors.forEach((sector) => {
        const sectorProjects = projectsBySector.get(sector.id) || [];
        firstProjectBySector.set(sector.id, playbackProjects.length);
        sectorProjects.forEach((project) => {
          playbackIndexByOriginalIndex.set(project.originalIndex, playbackProjects.length);
          playbackProjects.push(project);
        });
      });
      updateStats();
    }

    function renderPortfolioGrid() {
      const cards = qa(".portfolio-grid .portfolio-card");
      cards.forEach((card, index) => {
        const project = portfolioProjects[index];
        if (!project) {
          return;
        }
        setText("h3", project.title, card);
        const paragraphs = qa("p", card);
        if (paragraphs[0]) {
          paragraphs[0].innerHTML = `<span class="portfolio-meta-icon" aria-hidden="true">&#8599;</span>${project.industry} &middot; ${project.region}`;
        }
        if (paragraphs[1]) {
          paragraphs[1].textContent = `${project.industry}${REGION_SEPARATOR}${project.region}`;
        }
        if (paragraphs[2]) {
          paragraphs[2].textContent = project.description;
        }
        qa(".tag-row span", card).forEach((tag, tagIndex) => {
          tag.textContent = project.tags[tagIndex] || "";
        });
      });
    }

    function formatCounter(index) {
      return `${getCopy().portfolio.projectLabel} ${String(index + 1).padStart(2, "0")} / ${String(playbackProjects.length).padStart(2, "0")}`;
    }

    function formatIndustryProgress(current, total) {
      return applyTemplate(getCopy().portfolio.industryProgress, { current, total });
    }

    function getActiveProject() {
      return playbackProjects[activeIndex];
    }

    function renderProject() {
      const project = getActiveProject();
      if (!project) {
        return;
      }
      const sectorProjects = projectsBySector.get(project.sector) || [];
      const sectorProjectIndex = sectorProjects.findIndex(
        (item) => item.originalIndex === project.originalIndex,
      );
      cardRoot.innerHTML = `
        <div class="portfolio-carousel-top">
          <div>
            <p class="portfolio-carousel-counter">${formatCounter(activeIndex)}</p>
            <h3>${project.title}</h3>
          </div>
          <div class="portfolio-sector-badge">${project.sectorLabel}</div>
        </div>
        <p class="portfolio-meta-display"><span class="portfolio-meta-icon" aria-hidden="true">&#8599;</span>${project.industry} &middot; ${project.region}</p>
        <p class="portfolio-body">${project.description}</p>
        <div class="portfolio-related-shell">
          <div class="portfolio-related-head">
            <p class="portfolio-related-label">${project.sectorLabel} ${getCopy().portfolio.sequenceSuffix}</p>
            <p class="portfolio-related-caption">${formatIndustryProgress(sectorProjectIndex + 1, sectorProjects.length)}</p>
          </div>
          <div class="portfolio-related-list">
            ${sectorProjects.map((item, index) => {
              const playbackIndex = playbackIndexByOriginalIndex.get(item.originalIndex);
              const isActive = item.originalIndex === project.originalIndex;
              return `<button class="portfolio-related-item${isActive ? " is-active" : ""}" type="button" data-playback-index="${playbackIndex}" aria-pressed="${isActive ? "true" : "false"}"><span class="portfolio-related-step">${String(index + 1).padStart(2, "0")}</span><span class="portfolio-related-copy"><strong>${item.title}</strong><small>${item.region}</small></span></button>`;
            }).join("")}
          </div>
        </div>
        <div class="tag-row">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      `;
      qa("[data-playback-index]", cardRoot).forEach((button) => {
        button.addEventListener("click", () => {
          const nextIndex = Number(button.getAttribute("data-playback-index"));
          if (!Number.isNaN(nextIndex)) {
            jumpToProject(nextIndex);
          }
        });
      });
    }

    function initializeSectors() {
      sectorRoot.innerHTML = sectors
        .map((sector) => `<button class="portfolio-sector" type="button" data-sector="${sector.id}" aria-pressed="false" style="--sector-progress: 0%;"><span class="portfolio-sector-ring"><span class="portfolio-sector-icon" aria-hidden="true">${sector.icon}</span></span><span class="portfolio-sector-label">${sector.label}</span></button>`)
        .join("");
      sectorButtons = qa("[data-sector]", sectorRoot);
      sectorButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const sector = button.getAttribute("data-sector");
          const targetIndex = firstProjectBySector.get(sector);
          if (typeof targetIndex === "number") {
            jumpToProject(targetIndex);
          }
        });
      });
    }

    function updateSectorState(progress) {
      const activeProject = getActiveProject();
      if (!activeProject) {
        return;
      }
      sectorButtons.forEach((button) => {
        const isActive = button.getAttribute("data-sector") === activeProject.sector;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
        button.style.setProperty("--sector-progress", isActive ? `${Math.round(progress * 100)}%` : "0%");
      });
    }

    function jumpToProject(nextIndex, now = performance.now()) {
      activeIndex = nextIndex;
      startedAt = now;
      renderProject();
      updateSectorState(0);
      timerBar.style.width = "0%";
    }

    function animate(now) {
      const progress = Math.min((now - startedAt) / cycleDuration, 1);
      timerBar.style.width = `${progress * 100}%`;
      updateSectorState(progress);
      if (progress >= 1) {
        jumpToProject((activeIndex + 1) % playbackProjects.length, now);
      }
      rafId = window.requestAnimationFrame(animate);
    }

    rebuildPortfolioData();
    renderPortfolioGrid();
    initializeSectors();
    jumpToProject(0, performance.now());
    rafId = window.requestAnimationFrame(animate);

    onLanguageChange(() => {
      const nextIndex = Math.min(activeIndex, Math.max(playbackProjects.length - 1, 0));
      rebuildPortfolioData();
      renderPortfolioGrid();
      initializeSectors();
      activeIndex = nextIndex;
      renderProject();
      updateSectorState(0);
      timerBar.style.width = "0%";
      startedAt = performance.now();
    });
  }

  function renderExperienceCards() {
    const copy = getCopy().experience;
    experienceCards.forEach((card, companyIndex) => {
      const company = copy.companies[companyIndex];
      if (!company) {
        return;
      }
      setText(".experience-head h3", company.name, card);
      const track = q(".experience-track", card);
      if (track) {
        track.setAttribute("aria-label", company.trackAriaLabel);
        qa(".experience-track-step", track).forEach((step, index) => {
          step.textContent = company.trackSteps[index] || "";
        });
      }
      qa(".experience-meta p", card).forEach((item, index) => {
        setLeadingIconText(item, company.meta[index] || "");
      });
      qa(".experience-role-panel", card).forEach((panel, roleIndex) => {
        const role = company.roles[roleIndex];
        if (!role) {
          return;
        }
        setText(".experience-role-kicker", role.kicker, panel);
        setLeadingIconText(q(".role", panel), role.title);
        setText(".experience-role-period", role.period, panel);
        qa(".experience-list p", panel).forEach((bullet, bulletIndex) => {
          bullet.textContent = role.bullets[bulletIndex] || "";
        });
      });
    });
  }

  renderExperienceCards();
  onLanguageChange(renderExperienceCards);

  const educationEntries = qa(".education-entry");
  const educationMarkers = qa(".education-marker");
  const educationActiveSchool = q("#education-active-school");
  const educationActiveSummary = q("#education-active-summary");
  const educationActiveLocation = q("#education-active-location");
  const educationActivePeriod = q("#education-active-period");
  const educationActiveHighlights = q("#education-active-highlights");
  const educationMapElement = q("#education-study-map");
  const educationMapFocusCity = q("#education-map-focus-city");
  const educationMapFocusRegion = q("#education-map-focus-region");
  const educationMapTimerLabel = q("#education-map-timer-label");
  const educationMapTimerFill = q("#education-map-timer-fill");

  if (
    educationEntries.length &&
    educationMarkers.length &&
    educationActiveSchool &&
    educationActiveSummary &&
    educationActiveLocation &&
    educationActivePeriod &&
    educationActiveHighlights
  ) {
    const EDUCATION_AUTOPLAY_MS = 3000;
    let educationMap = null;
    let educationJourneyLine = null;
    let educationActiveLeg = null;
    let educationTerritoryZone = null;
    let educationFlightTimeoutId = null;
    let educationAutoPlayTimeoutId = null;
    let educationProgressRafId = null;
    let educationCurrentId = null;
    let educationFlightToken = 0;
    const educationMapLabels = new Map();
    const educationTerritoryZones = {
      usfq: [[0.46, -79.03], [0.72, -78.88], [0.92, -78.61], [0.98, -78.28], [0.88, -78.02], [0.63, -77.82], [0.28, -77.68], [-0.08, -77.68], [-0.39, -77.79], [-0.65, -78.02], [-0.8, -78.35], [-0.76, -78.7], [-0.54, -78.96], [-0.19, -79.08], [0.16, -79.09]],
      uncw: [[36.55, -84.32], [36.56, -83.25], [36.55, -82.18], [36.56, -80.98], [36.55, -79.64], [36.55, -78.48], [36.52, -77.29], [36.19, -76.42], [35.72, -75.83], [35.27, -75.54], [34.83, -75.48], [34.56, -76.08], [34.42, -76.86], [34.45, -77.64], [34.65, -78.52], [34.94, -79.28], [35.01, -80.06], [35.22, -81.14], [35.62, -82.44], [35.97, -83.36], [36.31, -84.02]],
      esade: [[42.84, 0.18], [42.69, 1.18], [42.58, 2.22], [42.43, 3.13], [41.93, 3.28], [41.36, 2.92], [40.87, 2.38], [40.61, 1.53], [40.58, 0.71], [40.89, 0.18], [41.38, 0.12], [41.92, 0.36], [42.39, 0.53], [42.71, 0.36]],
      egade: [[27.79, -101.66], [27.62, -100.92], [27.56, -100.18], [27.41, -99.33], [27.08, -98.68], [26.51, -98.38], [25.88, -98.36], [25.28, -98.55], [24.86, -98.89], [24.67, -99.48], [24.66, -100.17], [24.82, -100.83], [25.16, -101.37], [25.66, -101.68], [26.29, -101.82], [27.01, -101.83]],
    };

    function getEducationCopy(id) {
      return getCopy().education.stops[id] || englishCopy.education.stops[id];
    }

    function renderEducationLanguage() {
      const copy = getCopy().education;
      educationMarkers.forEach((marker) => {
        const markerCopy = getEducationCopy(marker.dataset.edu);
        if (!markerCopy) {
          return;
        }
        marker.dataset.regionLabel = markerCopy.regionLabel;
        marker.dataset.city = markerCopy.city;
        marker.dataset.country = markerCopy.country;
        marker.dataset.admin = markerCopy.admin;
        marker.setAttribute("aria-label", markerCopy.jumpAriaLabel);
        setText(".education-marker-label", markerCopy.city, marker);
        setText(".education-marker-subtitle", `${markerCopy.shortSchool}${REGION_SEPARATOR}${markerCopy.country}`, marker);
      });
      educationEntries.forEach((entry) => {
        const entryCopy = getEducationCopy(entry.dataset.edu);
        if (!entryCopy) {
          return;
        }
        entry.dataset.school = entryCopy.school;
        entry.dataset.summary = entryCopy.summary;
        entry.dataset.location = entryCopy.location;
        entry.dataset.period = entryCopy.period;
        entry.dataset.highlights = entryCopy.highlights.join("|");
        setText(".education-entry-kicker", entryCopy.country, entry);
        setText("h3", entryCopy.school, entry);
        setText(".education-entry-degree", entryCopy.degree, entry);
        qa(".education-entry-meta span", entry).forEach((span, index) => {
          span.textContent = entryCopy.meta[index] || "";
        });
        qa(".education-entry-notes span", entry).forEach((span, index) => {
          span.innerHTML = entryCopy.notes[index] || "";
        });
      });
      if (!window.L && educationMapElement) {
        educationMapElement.classList.add("is-fallback");
        educationMapElement.innerHTML = `<div class="education-map-fallback">${copy.fallback}</div>`;
      }
    }

    const educationStops = educationMarkers
      .map((marker) => {
        const lat = Number(marker.dataset.lat);
        const lng = Number(marker.dataset.lng);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }
        return {
          element: marker,
          id: marker.dataset.edu,
          lat,
          lng,
          territory: educationTerritoryZones[marker.dataset.edu] || null,
          get city() {
            return this.element.dataset.city || "";
          },
          get admin() {
            return this.element.dataset.admin || "";
          },
          get country() {
            return this.element.dataset.country || "";
          },
          get zoom() {
            return Number(this.element.dataset.zoom || "4.8");
          },
        };
      })
      .filter(Boolean);

    function getEducationStopById(id) {
      return educationStops.find((stop) => stop.id === id) || null;
    }

    function timerLabel(seconds) {
      return applyTemplate(getCopy().education.timer.next, {
        seconds: seconds.toFixed(1),
      });
    }

    function createEducationMapLabelIcon(stop, isActive = false) {
      return window.L.divIcon({
        className: "education-map-label-marker",
        html: `<span class="education-map-label-chip${isActive ? " is-active" : ""}"><span class="education-map-label-country">${stop.admin || stop.country}</span><span class="education-map-label-city">${stop.city}</span></span>`,
        iconSize: [1, 1],
        iconAnchor: [0, 0],
      });
    }

    function clearEducationTimers() {
      if (educationFlightTimeoutId) {
        window.clearTimeout(educationFlightTimeoutId);
        educationFlightTimeoutId = null;
      }
      if (educationAutoPlayTimeoutId) {
        window.clearTimeout(educationAutoPlayTimeoutId);
        educationAutoPlayTimeoutId = null;
      }
      if (educationProgressRafId) {
        window.cancelAnimationFrame(educationProgressRafId);
        educationProgressRafId = null;
      }
    }

    function setEducationTimerState(progress = 0, label = timerLabel(EDUCATION_AUTOPLAY_MS / 1000)) {
      if (educationMapTimerFill) {
        educationMapTimerFill.style.width = `${Math.max(0, Math.min(progress, 1)) * 100}%`;
      }
      if (educationMapTimerLabel) {
        educationMapTimerLabel.textContent = label;
      }
    }

    function startEducationAutoPlay(activeId) {
      if (!activeId || educationStops.length < 2) {
        return;
      }
      clearEducationTimers();
      const startedAt = performance.now();
      const deadline = startedAt + EDUCATION_AUTOPLAY_MS;
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / EDUCATION_AUTOPLAY_MS, 1);
        const remainingMs = Math.max(deadline - now, 0);
        setEducationTimerState(progress, timerLabel(remainingMs / 1000));
        if (progress < 1) {
          educationProgressRafId = window.requestAnimationFrame(tick);
        } else {
          educationProgressRafId = null;
        }
      };
      setEducationTimerState(0, timerLabel(EDUCATION_AUTOPLAY_MS / 1000));
      educationProgressRafId = window.requestAnimationFrame(tick);
      educationAutoPlayTimeoutId = window.setTimeout(() => {
        const currentIndex = educationStops.findIndex((stop) => stop.id === activeId);
        const nextStop = educationStops[(currentIndex + 1 + educationStops.length) % educationStops.length];
        if (nextStop) {
          setActiveEducation(nextStop.id, { autoAdvance: true });
        }
      }, EDUCATION_AUTOPLAY_MS);
    }

    function getEducationFocusCenter(stop) {
      if (!educationMap || !stop) {
        return null;
      }
      const projectedTarget = educationMap.project([stop.lat, stop.lng], stop.zoom);
      const offsetX = Math.min(Math.max(educationMapElement?.clientWidth * 0.14 || 0, 72), 168);
      const offsetY = Math.min(Math.max(educationMapElement?.clientHeight * 0.06 || 0, 18), 44);
      return educationMap.unproject(projectedTarget.subtract([offsetX, offsetY]), stop.zoom);
    }

    function refreshMapLabels(activeId) {
      educationMapLabels.forEach((mapLabel, markerId) => {
        const stop = getEducationStopById(markerId);
        if (stop) {
          mapLabel.setIcon(createEducationMapLabelIcon(stop, markerId === activeId));
          mapLabel.setZIndexOffset(markerId === activeId ? 360 : 180);
        }
      });
    }

    function initializeEducationMap() {
      if (!educationMapElement) {
        return;
      }
      if (!window.L) {
        educationMapElement.classList.add("is-fallback");
        educationMapElement.innerHTML = `<div class="education-map-fallback">${getCopy().education.fallback}</div>`;
        return;
      }
      educationMap = window.L.map(educationMapElement, {
        attributionControl: true,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        tapHold: true,
        worldCopyJump: true,
        zoomControl: false,
        zoomSnap: 0.1,
      });
      educationMap.attributionControl.setPrefix(false);
      educationMap.attributionControl.setPosition("topright");
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 2,
      }).addTo(educationMap);
      if (!educationStops.length) {
        return;
      }
      const overviewBounds = window.L.latLngBounds(educationStops.map((stop) => [stop.lat, stop.lng]));
      educationMap.fitBounds(overviewBounds.pad(0.22), { animate: false, padding: [48, 48] });
      educationJourneyLine = window.L.polyline(
        educationStops.map((stop) => [stop.lat, stop.lng]),
        { color: "#7de3f3", dashArray: "8 10", lineCap: "round", lineJoin: "round", opacity: 0.34, weight: 2 },
      ).addTo(educationMap);
      educationJourneyLine.bringToBack();
      const initialStop = getEducationStopById(q(".education-entry.is-active")?.dataset.edu) || educationStops[0];
      educationTerritoryZone = window.L.polygon(initialStop.territory || [], {
        className: "education-map-territory-zone",
        color: "#7de3f3",
        fillColor: "#7de3f3",
        fillOpacity: 0.18,
        opacity: 0.96,
        smoothFactor: 1.1,
        weight: 3,
      }).addTo(educationMap);
      educationTerritoryZone.bringToBack();
      educationActiveLeg = window.L.polyline([], {
        className: "education-map-active-leg",
        color: "#7de3f3",
        dashArray: "10 12",
        lineCap: "round",
        lineJoin: "round",
        opacity: 0.92,
        weight: 3,
      }).addTo(educationMap);
      educationStops.forEach((stop) => {
        const mapLabel = window.L.marker([stop.lat, stop.lng], {
          icon: createEducationMapLabelIcon(stop, stop.id === initialStop.id),
          interactive: false,
          keyboard: false,
          zIndexOffset: stop.id === initialStop.id ? 360 : 180,
        }).addTo(educationMap);
        educationMapLabels.set(stop.id, mapLabel);
      });
      window.requestAnimationFrame(() => educationMap?.invalidateSize());
    }

    function setActiveEducation(id, options = {}) {
      const activeEntry = educationEntries.find((entry) => entry.dataset.edu === id);
      if (!activeEntry) {
        return;
      }
      const previousStop = getEducationStopById(educationCurrentId);
      const activeStop = getEducationStopById(id);
      clearEducationTimers();
      educationFlightToken += 1;
      educationCurrentId = id;
      educationEntries.forEach((entry) => entry.classList.toggle("is-active", entry.dataset.edu === id));
      educationMarkers.forEach((marker) => {
        const isActive = marker.dataset.edu === id;
        marker.classList.toggle("is-active", isActive);
        marker.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      educationActiveSchool.textContent = activeEntry.dataset.school || "";
      educationActiveSummary.textContent = activeEntry.dataset.summary || "";
      educationActiveLocation.textContent = activeEntry.dataset.location || "";
      educationActivePeriod.textContent = activeEntry.dataset.period || "";
      if (educationMapFocusCity) {
        educationMapFocusCity.textContent = activeEntry.dataset.location || "";
      }
      if (educationMapFocusRegion) {
        educationMapFocusRegion.textContent = [activeStop?.admin, activeStop?.country].filter(Boolean).join(REGION_SEPARATOR);
      }
      educationActiveHighlights.innerHTML = (activeEntry.dataset.highlights || "")
        .split("|")
        .filter(Boolean)
        .map((item) => `<span>${item.trim()}</span>`)
        .join("");

      if (educationMap && activeStop) {
        const flightToken = educationFlightToken;
        const adjustedCenter = getEducationFocusCenter(activeStop);
        educationMap.stop();
        refreshMapLabels(id);
        if (educationTerritoryZone && activeStop.territory?.length) {
          educationTerritoryZone.setLatLngs(activeStop.territory);
          educationTerritoryZone.bringToFront();
        }
        if (educationActiveLeg) {
          if (previousStop && previousStop.id !== activeStop.id) {
            educationActiveLeg.setLatLngs([[previousStop.lat, previousStop.lng], [activeStop.lat, activeStop.lng]]);
          } else {
            educationActiveLeg.setLatLngs([[activeStop.lat, activeStop.lng], [activeStop.lat, activeStop.lng]]);
          }
          educationActiveLeg.bringToFront();
        }
        if (options.refreshOnly) {
          startEducationAutoPlay(id);
          return;
        }
        setEducationTimerState(0, getCopy().education.timer.traveling);
        if (adjustedCenter) {
          if (previousStop && previousStop.id !== activeStop.id) {
            const travelBounds = window.L.latLngBounds([[previousStop.lat, previousStop.lng], [activeStop.lat, activeStop.lng]]).pad(0.52);
            educationMap.flyToBounds(travelBounds, {
              animate: true,
              duration: options.autoAdvance ? 1.7 : 1.3,
              easeLinearity: 0.18,
              paddingTopLeft: [Math.round((educationMapElement?.clientWidth || 0) * 0.28), 132],
              paddingBottomRight: [52, Math.round((educationMapElement?.clientHeight || 0) * 0.3)],
              maxZoom: 4.2,
            });
            educationFlightTimeoutId = window.setTimeout(() => {
              if (flightToken !== educationFlightToken) {
                return;
              }
              educationMap.flyTo(adjustedCenter, activeStop.zoom, {
                animate: true,
                duration: options.autoAdvance ? 2.2 : 1.6,
                easeLinearity: 0.16,
              });
            }, options.autoAdvance ? 980 : 720);
          } else {
            educationMap.flyTo(adjustedCenter, activeStop.zoom, {
              animate: true,
              duration: 1.45,
              easeLinearity: 0.16,
            });
          }
        }
      }

      if (!educationMap) {
        startEducationAutoPlay(id);
      }
    }

    renderEducationLanguage();
    initializeEducationMap();

    educationEntries.forEach((entry) => {
      ["click", "mouseenter", "focus"].forEach((eventName) => {
        entry.addEventListener(eventName, () => setActiveEducation(entry.dataset.edu));
      });
      entry.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActiveEducation(entry.dataset.edu);
        }
      });
    });

    educationMarkers.forEach((marker) => {
      marker.setAttribute("aria-pressed", "false");
      ["click", "mouseenter", "focus"].forEach((eventName) => {
        marker.addEventListener(eventName, () => setActiveEducation(marker.dataset.edu));
      });
      marker.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActiveEducation(marker.dataset.edu);
        }
      });
    });

    const initialEducation =
      q(".education-entry.is-active")?.dataset.edu || educationEntries[0].dataset.edu;
    setActiveEducation(initialEducation);

    if (educationMap) {
      window.addEventListener("resize", () => educationMap?.invalidateSize());
      educationMap.on("movestart", () => {
        clearEducationTimers();
        setEducationTimerState(0, getCopy().education.timer.traveling);
      });
      educationMap.on("moveend", () => startEducationAutoPlay(educationCurrentId));
    }

    onLanguageChange(() => {
      renderEducationLanguage();
      refreshMapLabels(educationCurrentId);
      setActiveEducation(educationCurrentId || initialEducation, { refreshOnly: true });
    });
  }

  currentLanguage = resolveInitialLanguage();
  setLanguage(currentLanguage, { persist: false });
});
