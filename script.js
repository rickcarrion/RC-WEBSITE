document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }

  const sectorRoot = document.querySelector("#portfolio-sectors");
  const cardRoot = document.querySelector("#portfolio-carousel-card");
  const timerBar = document.querySelector("#portfolio-timer-bar");

  if (sectorRoot && cardRoot && timerBar) {
    // Assumption: current portfolio order is newest to oldest.
    const portfolioProjects = [
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

    const sectorIcons = {
    beverage: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M10 3h4M10.5 3v4.5l-2 2.5V18a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-8l-2-2.5V3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    retail: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M8 8V6a4 4 0 0 1 8 0v2M5 8h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    construction: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 12.5V11a8 8 0 0 1 16 0v1.5M6 12.5v4.5M18 12.5v4.5M4 17h16M9 17v4M15 17v4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    banking: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 9 12 4l9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 19h18" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    insurance: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 3 6 5v5c0 4.4 2.5 8.5 6 10 3.5-1.5 6-5.6 6-10V5l-6-2ZM9.5 12l1.7 1.7 3.3-3.7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    consulting: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M8 7V5.75C8 4.231 9.231 3 10.75 3h2.5C14.769 3 16 4.231 16 5.75V7M4 8h16v10.5A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5V8Zm8 0v12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    delivery: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 15h9V8H9M13 10h4l3 3v2h-2M7 18.5A1.5 1.5 0 1 0 7 21a1.5 1.5 0 0 0 0-2.5Zm10 0A1.5 1.5 0 1 0 17 21a1.5 1.5 0 0 0 0-2.5Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    healthcare: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 5v14M5 12h14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="4" y="4" width="16" height="16" rx="4" stroke-width="1.8"/>
      </svg>`,
  };

    const sectors = [];
    const projectsBySector = new Map();

    portfolioProjects.forEach((project, index) => {
      const projectWithIndex = { ...project, originalIndex: index };

      if (!projectsBySector.has(project.sector)) {
        projectsBySector.set(project.sector, []);
        sectors.push({
          id: project.sector,
          label: project.sectorLabel,
          icon: sectorIcons[project.sector],
        });
      }

      projectsBySector.get(project.sector).push(projectWithIndex);
    });

    const playbackProjects = [];
    const firstProjectBySector = new Map();
    const playbackIndexByOriginalIndex = new Map();

    sectors.forEach((sector) => {
      const sectorProjects = projectsBySector.get(sector.id) || [];

      firstProjectBySector.set(sector.id, playbackProjects.length);

      sectorProjects.forEach((project) => {
        playbackIndexByOriginalIndex.set(
          project.originalIndex,
          playbackProjects.length,
        );
        playbackProjects.push(project);
      });
    });

    const statValues = {
      projects: portfolioProjects.length,
      industries: sectors.length,
      roles: document.querySelectorAll(".experience-card").length,
    };

    document.querySelectorAll("[data-stat-card]").forEach((card) => {
      const statKey = card.getAttribute("data-stat-card");
      const valueNode = card.querySelector("[data-stat-value]");

      if (valueNode && statKey && statValues[statKey] !== undefined) {
        valueNode.textContent = String(statValues[statKey]);
      }
    });

    let activeIndex = 0;
    let startedAt = performance.now();
    let rafId = 0;
    let sectorButtons = [];
    const cycleDuration = 5000;

    function formatCounter(index) {
      return `${String(index + 1).padStart(2, "0")} / ${String(
        playbackProjects.length,
      ).padStart(2, "0")}`;
    }

    function getActiveProject() {
      return playbackProjects[activeIndex];
    }

    function jumpToProject(nextIndex, now = performance.now()) {
      activeIndex = nextIndex;
      startedAt = now;
      renderProject();
      updateSectorState(0);
      timerBar.style.width = "0%";
    }

    function renderProject() {
      const project = getActiveProject();
      const sectorProjects = projectsBySector.get(project.sector) || [];
      const sectorProjectIndex = sectorProjects.findIndex(
        (item) => item.originalIndex === project.originalIndex,
      );

      cardRoot.innerHTML = `
      <div class="portfolio-carousel-top">
        <div>
          <p class="portfolio-carousel-counter">Project ${formatCounter(activeIndex)}</p>
          <h3>${project.title}</h3>
        </div>
        <div class="portfolio-sector-badge">${project.sectorLabel}</div>
      </div>
      <p class="portfolio-meta-display">
        <span class="portfolio-meta-icon" aria-hidden="true">&#8599;</span>
        ${project.industry} &middot; ${project.region}
      </p>
      <p class="portfolio-body">${project.description}</p>
      <div class="portfolio-related-shell">
        <div class="portfolio-related-head">
          <p class="portfolio-related-label">${project.sectorLabel} sequence</p>
          <p class="portfolio-related-caption">
            ${sectorProjectIndex + 1} of ${sectorProjects.length} in this industry
          </p>
        </div>
        <div class="portfolio-related-list">
          ${sectorProjects
            .map((item, index) => {
              const playbackIndex = playbackIndexByOriginalIndex.get(
                item.originalIndex,
              );
              const isActive = item.originalIndex === project.originalIndex;

              return `
                <button
                  class="portfolio-related-item${isActive ? " is-active" : ""}"
                  type="button"
                  data-playback-index="${playbackIndex}"
                  aria-pressed="${isActive ? "true" : "false"}"
                >
                  <span class="portfolio-related-step">${String(index + 1).padStart(2, "0")}</span>
                  <span class="portfolio-related-copy">
                    <strong>${item.title}</strong>
                    <small>${item.region}</small>
                  </span>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>
      <div class="tag-row">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    `;

      [...cardRoot.querySelectorAll("[data-playback-index]")].forEach((button) => {
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
        .map((sector) => {
          return `
          <button
            class="portfolio-sector"
            type="button"
            data-sector="${sector.id}"
            aria-pressed="false"
            style="--sector-progress: 0%;"
          >
            <span class="portfolio-sector-ring">
              <span class="portfolio-sector-icon" aria-hidden="true">${sector.icon}</span>
            </span>
            <span class="portfolio-sector-label">${sector.label}</span>
          </button>
        `;
        })
        .join("");

      sectorButtons = [...sectorRoot.querySelectorAll("[data-sector]")];

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
      const activeSector = getActiveProject().sector;

      sectorButtons.forEach((button) => {
        const isActive = button.getAttribute("data-sector") === activeSector;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
        button.style.setProperty(
          "--sector-progress",
          isActive ? `${Math.round(progress * 100)}%` : "0%",
        );
      });
    }

    function advanceProject(now) {
      jumpToProject((activeIndex + 1) % playbackProjects.length, now);
    }

    function animate(now) {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / cycleDuration, 1);

      timerBar.style.width = `${progress * 100}%`;
      updateSectorState(progress);

      if (progress >= 1) {
        advanceProject(now);
      }

      rafId = window.requestAnimationFrame(animate);
    }

    initializeSectors();
    jumpToProject(0, performance.now());
    rafId = window.requestAnimationFrame(animate);

    window.addEventListener("beforeunload", () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    });
  }

  const educationEntries = [...document.querySelectorAll(".education-entry")];
  const educationMarkers = [...document.querySelectorAll(".education-marker")];
  const educationRoutes = [...document.querySelectorAll(".education-route")];
  const educationActiveSchool = document.querySelector("#education-active-school");
  const educationActiveSummary = document.querySelector("#education-active-summary");
  const educationActiveLocation = document.querySelector("#education-active-location");
  const educationActivePeriod = document.querySelector("#education-active-period");
  const educationActiveHighlights = document.querySelector("#education-active-highlights");

  if (
    educationEntries.length &&
    educationMarkers.length &&
    educationActiveSchool &&
    educationActiveSummary &&
    educationActiveLocation &&
    educationActivePeriod &&
    educationActiveHighlights
  ) {
    function setActiveEducation(id) {
      const activeEntry = educationEntries.find(
        (entry) => entry.dataset.edu === id,
      );

      if (!activeEntry) {
        return;
      }

      educationEntries.forEach((entry) => {
        entry.classList.toggle("is-active", entry.dataset.edu === id);
      });

      educationMarkers.forEach((marker) => {
        const isActive = marker.dataset.edu === id;
        marker.classList.toggle("is-active", isActive);
        marker.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      educationRoutes.forEach((route) => {
        route.classList.toggle("is-active", route.dataset.route === id);
      });

      educationActiveSchool.textContent = activeEntry.dataset.school || "";
      educationActiveSummary.textContent = activeEntry.dataset.summary || "";
      educationActiveLocation.textContent = activeEntry.dataset.location || "";
      educationActivePeriod.textContent = activeEntry.dataset.period || "";

      const highlights = (activeEntry.dataset.highlights || "")
        .split("|")
        .map((item) => item.trim())
        .filter(Boolean);

      educationActiveHighlights.innerHTML = highlights
        .map((item) => `<span>${item}</span>`)
        .join("");
    }

    educationEntries.forEach((entry) => {
      entry.addEventListener("click", () => setActiveEducation(entry.dataset.edu));
      entry.addEventListener("mouseenter", () =>
        setActiveEducation(entry.dataset.edu),
      );
      entry.addEventListener("focus", () => setActiveEducation(entry.dataset.edu));
      entry.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActiveEducation(entry.dataset.edu);
        }
      });
    });

    educationMarkers.forEach((marker) => {
      marker.setAttribute("aria-pressed", "false");
      marker.addEventListener("click", () => setActiveEducation(marker.dataset.edu));
      marker.addEventListener("mouseenter", () =>
        setActiveEducation(marker.dataset.edu),
      );
      marker.addEventListener("focus", () => setActiveEducation(marker.dataset.edu));
    });

    const initialEducation =
      document.querySelector(".education-entry.is-active")?.dataset.edu ||
      educationEntries[0].dataset.edu;

    setActiveEducation(initialEducation);
  }
});
