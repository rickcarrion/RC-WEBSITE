// Interactive demo: a small recommendation engine the visitor plays against.
// The story shows the first three shoppers; the visitor then makes an offer to
// customers 4, 5 and 6. Each new customer joins the history afterwards, so the
// model always answers from the receipts seen so far. Every number on the page
// is computed from BASKETS, except the ones quoted in the "insights" copy:
// if you change a basket, re-check those sentences and that each round still
// has a single top answer.
(() => {
  const PRODUCTS = {
    pasta: { icon: "🍝", en: "Pasta", es: "Pasta" },
    sauce: { icon: "🥫", en: "Tomato sauce", es: "Salsa de tomate" },
    cheese: { icon: "🧀", en: "Cheese", es: "Queso" },
    bread: { icon: "🍞", en: "Bread", es: "Pan" },
    milk: { icon: "🥛", en: "Milk", es: "Leche" },
    butter: { icon: "🧈", en: "Butter", es: "Mantequilla" },
    coffee: { icon: "☕", en: "Coffee", es: "Café" },
    cookies: { icon: "🍪", en: "Cookies", es: "Galletas" },
  };

  // Customers 1-3 are the story. Customers 4-6 are what each quiz customer ends
  // up buying; their basket is added to the history once their round is over.
  const STORY_CUSTOMERS = 3;
  const BASKETS = [
    ["pasta", "sauce", "cheese"],
    ["bread", "milk", "butter"],
    ["pasta", "sauce", "milk"],
    ["pasta", "sauce", "bread", "milk"],
    ["bread", "milk", "coffee", "cookies"],
    ["pasta", "sauce", "milk"],
  ];

  // Each round: what the new customer already has in the basket, and the four
  // products offered as answers.
  const ROUNDS = [
    { cart: ["pasta"], options: ["cheese", "sauce", "milk", "bread"] },
    { cart: ["bread"], options: ["butter", "milk", "sauce", "cheese"] },
    { cart: ["pasta", "sauce"], options: ["cheese", "milk", "bread", "butter"] },
  ];

  const STORY_STEP_MS = 1300;
  const SCALE_CUSTOMERS = 1000;
  const SCALE_MS = 3000;
  const AVATAR_TONES = 4;
  // Customer faces. They are shuffled for every new game, so each visitor (and
  // each replay) gets a different cast.
  const FACES = ["👩🏻", "👨🏽", "👵🏼", "🧔🏾", "👩🏾‍🦱", "👨🏼‍🦰", "👩🏽‍🦳", "👨🏻‍🦲", "👱🏼‍♀️", "👴🏽", "👩🏿", "🧑🏻‍🦱"];

  const COPY = {
    en: {
      startTitle: "Let’s play a demo to see how a recommendation engine works.",
      startText:
        "Imagine you run a small grocery store. Three customers have come in this morning. Watch what each one bought, then decide what to offer the next ones.",
      startButton: "Start demo",
      storyStep: "This morning's sales",
      storyLine: "Customer {n} buys {items}.",
      and: "and",
      skip: "Skip the story",
      askTitle: "Three customers, three baskets. Now what?",
      askText:
        "Which combo should you create? What should you offer the next customer so they buy more and your average ticket grows? Make your best guess, then see what the data says.",
      askButton: "Make the first offer",
      dataTitle: "Your customers so far",
      customer: "Customer {n}",
      step: "Question {n} of {total}",
      question: "Customer {n} puts {items} in the basket. You can offer one more product. Which one?",
      correct: "Correct.",
      incorrect: "Not this time. Your data says {product}.",
      behind: "The analytics behind it",
      behindText:
        "{count} of your {history} customers so far bought {items}. They are highlighted in the list. This is what else they took:",
      ratio: "{n} of {total}",
      insights: [
        "Easy, and that is the point: with only three receipts the pattern is already there, and the model found it without anyone telling it what pasta is.",
        "Bread and butter is the classic guess. Your receipts disagree: both customers who bought bread took milk, and only one took butter. The model follows your customers, not the cliché.",
        "Pasta, sauce and cheese is the combo anyone would design. Your customers add milk twice as often. Build your combos from receipts, not from recipes.",
      ],
      next: "Next customer",
      toScale: "Now do it for everyone",
      scaleTitle: "Now do it for everyone",
      scaleScore: "You matched the model on {score} of {total}.",
      scaleText:
        "Each answer took you a few seconds, with a handful of receipts and 8 products. A real retailer has thousands of products and new customers every minute. The same model answers for each one instantly.",
      scaleButton: "Serve the next 1,000 customers",
      ticker: "Customer {n} takes {item}. Offer {product}.",
      served: "customers served",
      doneTitle: "1,000 customers served in {seconds} seconds.",
      doneText:
        "Each one got the offer most likely to work for them. That is a data-driven company: every decision uses everything the business already knows.",
      doneReach:
        "It applies the same way to a medium-sized company or a multinational: the model handles catalogs of more than 20,000 SKUs.",
      doneProof:
        "I built this for a national retailer in Bolivia: three personalized suggestions per interaction, and revenue growth without a single new customer.",
      whatsapp: "Message me on WhatsApp",
      again: "Play again",
    },
    es: {
      startTitle: "Juguemos una demo para ver cómo funciona un motor de recomendación.",
      startText:
        "Imagina que tienes una pequeña tienda de abarrotes. Tres clientes han entrado esta mañana. Mira lo que compró cada uno y luego decide qué ofrecerles a los siguientes.",
      startButton: "Iniciar demo",
      storyStep: "Las ventas de esta mañana",
      storyLine: "El cliente {n} compra {items}.",
      and: "y",
      skip: "Saltar la historia",
      askTitle: "Tres clientes, tres canastas. ¿Y ahora?",
      askText:
        "¿Qué combo deberías crear? ¿Qué deberías ofrecerle al próximo cliente para que compre más y tu ticket promedio crezca? Haz tu mejor apuesta y luego mira lo que dicen los datos.",
      askButton: "Hacer la primera oferta",
      dataTitle: "Tus clientes hasta ahora",
      customer: "Cliente {n}",
      step: "Pregunta {n} de {total}",
      question: "El cliente {n} pone {items} en la canasta. Puedes ofrecerle un producto más. ¿Cuál?",
      correct: "Correcto.",
      incorrect: "Esta vez no. Tus datos dicen {product}.",
      behind: "La analítica detrás",
      behindText:
        "{count} de tus {history} clientes hasta ahora compraron {items}. Están resaltados en la lista. Esto es lo que también llevaron:",
      ratio: "{n} de {total}",
      insights: [
        "Fácil, y ese es el punto: con solo tres recibos el patrón ya está ahí, y el modelo lo encontró sin que nadie le explicara qué es la pasta.",
        "Pan con mantequilla es la respuesta clásica. Tus recibos dicen otra cosa: los dos clientes que compraron pan llevaron leche, y solo uno llevó mantequilla. El modelo sigue a tus clientes, no al cliché.",
        "Pasta, salsa y queso es el combo que cualquiera diseñaría. Tus clientes agregan leche el doble de veces. Arma tus combos a partir de los recibos, no de las recetas.",
      ],
      next: "Siguiente cliente",
      toScale: "Ahora hazlo para todos",
      scaleTitle: "Ahora hazlo para todos",
      scaleScore: "Coincidiste con el modelo en {score} de {total}.",
      scaleText:
        "Cada respuesta te tomó unos segundos, con un puñado de recibos y 8 productos. Un retailer real tiene miles de productos y clientes nuevos cada minuto. El mismo modelo responde por cada uno al instante.",
      scaleButton: "Atender a los próximos 1.000 clientes",
      ticker: "El cliente {n} lleva {item}. Ofrece {product}.",
      served: "clientes atendidos",
      doneTitle: "1.000 clientes atendidos en {seconds} segundos.",
      doneText:
        "Cada uno recibió la oferta con más probabilidad de funcionar para él. Eso es una empresa guiada por datos: cada decisión usa todo lo que el negocio ya sabe.",
      doneReach:
        "Se aplica igual a una empresa mediana o a una multinacional: el modelo maneja catálogos de más de 20.000 SKU.",
      doneProof:
        "Construí esto para un retailer nacional en Bolivia: tres sugerencias personalizadas por interacción y crecimiento en ingresos sin un solo cliente nuevo.",
      whatsapp: "Escríbeme por WhatsApp",
      again: "Jugar de nuevo",
    },
  };

  // Phases, in order: start → story → ask → question ⇄ answered → scale → running → done.
  let container = null;
  let language = "en";
  let state = initialState();
  let storyTimer = null;

  function initialState() {
    const faces = [...FACES];
    for (let i = faces.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [faces[i], faces[j]] = [faces[j], faces[i]];
    }
    return { phase: "start", revealed: 0, round: 0, picked: null, score: 0, served: 0, ticker: "", faces };
  }

  function fill(template, values) {
    return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match));
  }

  function name(product) {
    return PRODUCTS[product][language];
  }

  function lower(product) {
    return name(product).toLowerCase();
  }

  function label(product) {
    return `<span class="product-icon" aria-hidden="true">${PRODUCTS[product].icon}</span>${name(product)}`;
  }

  // "pasta", "pasta and tomato sauce", "pasta, tomato sauce and cheese"
  function listItems(products, wrap = (text) => text) {
    const names = products.map((product) => wrap(lower(product)));
    if (names.length === 1) {
      return names[0];
    }
    return `${names.slice(0, -1).join(", ")} ${COPY[language].and} ${names[names.length - 1]}`;
  }

  function avatar(number) {
    const face = state.faces[number % state.faces.length];
    return `<span class="avatar avatar-${number % AVATAR_TONES}" aria-hidden="true">${face}</span>`;
  }

  // The receipts the model may learn from: the story customers plus every quiz
  // customer already served.
  function historyFor(round) {
    return BASKETS.slice(0, STORY_CUSTOMERS + round);
  }

  // The model: of the past baskets that contain everything in `cart`, how many
  // also contain each other product.
  function boughtWith(cart, history) {
    const matching = history.filter((basket) => cart.every((item) => basket.includes(item)));
    const counts = {};
    Object.keys(PRODUCTS).forEach((product) => {
      if (!cart.includes(product)) {
        counts[product] = matching.filter((basket) => basket.includes(product)).length;
      }
    });
    return { total: matching.length, counts };
  }

  function recommend(cart, history) {
    const { counts } = boughtWith(cart, history);
    return Object.keys(counts).reduce((best, product) => (counts[product] > counts[best] ? product : best));
  }

  function renderReceipts() {
    const copy = COPY[language];
    const answered = state.phase === "answered";
    const inStory = state.phase === "story";
    const history = historyFor(state.round);
    const cart = ROUNDS[state.round].cart;
    const best = recommend(cart, history);

    const rows = history
      .map((basket, index) => {
        const isMatch = answered && cart.every((item) => basket.includes(item));
        const chips = basket
          .map((product) => {
            const role = !isMatch ? "" : cart.includes(product) ? " is-item" : product === best ? " is-best" : "";
            return `<span class="chip${role}">${label(product)}</span>`;
          })
          .join("");
        const isNewest = inStory
          ? index === state.revealed - 1
          : state.phase === "question" && state.round > 0 && index === history.length - 1;
        const classes = [
          answered ? (isMatch ? "is-match" : "is-dim") : "",
          inStory && index >= state.revealed ? "is-hidden" : "",
          isNewest ? "is-new" : "",
        ].join(" ");
        return `
          <li class="${classes.trim()}">
            ${avatar(index)}
            <span class="receipt-body">
              <span class="receipt-name">${fill(copy.customer, { n: index + 1 })}</span>
              <span class="chips">${chips}</span>
            </span>
          </li>`;
      })
      .join("");

    return `
      <div class="game-data">
        <h3>${copy.dataTitle}</h3>
        <ol class="receipts">${rows}</ol>
      </div>`;
  }

  function renderStart() {
    const copy = COPY[language];
    return `
      <div class="game-play">
        <div class="avatar-row">${BASKETS.map((basket, index) => avatar(index)).join("")}</div>
        <h3 class="game-question">${copy.startTitle}</h3>
        <p>${copy.startText}</p>
        <button type="button" class="button button-ember" data-action="start">${copy.startButton}</button>
      </div>`;
  }

  function renderStory() {
    const copy = COPY[language];
    const index = Math.max(0, state.revealed - 1);
    const line = state.revealed
      ? fill(copy.storyLine, { n: state.revealed, items: listItems(BASKETS[index]) })
      : "&nbsp;";
    return `
      <div class="game-play">
        <p class="game-step">${copy.storyStep}</p>
        <div class="story-line" aria-live="polite">
          ${state.revealed ? avatar(index) : ""}
          <h3 class="game-question">${line}</h3>
        </div>
        <button type="button" class="text-link" data-action="skip">${copy.skip}</button>
      </div>`;
  }

  function renderAsk() {
    const copy = COPY[language];
    return `
      <div class="game-play">
        <h3 class="game-question">${copy.askTitle}</h3>
        <p>${copy.askText}</p>
        <button type="button" class="button button-ember" data-action="play">${copy.askButton}</button>
      </div>`;
  }

  function renderQuestion() {
    const copy = COPY[language];
    const round = ROUNDS[state.round];
    const history = historyFor(state.round);
    const answered = state.phase === "answered";
    const best = recommend(round.cart, history);
    const { total, counts } = boughtWith(round.cart, history);
    const customerNumber = history.length + 1;

    const options = round.options
      .map((product) => {
        const classes = [
          answered && product === best ? "is-best" : "",
          answered && product === state.picked ? "is-picked" : "",
        ].join(" ");
        return `<button type="button" class="${classes.trim()}" data-option="${product}"${answered ? " disabled" : ""}>${label(product)}</button>`;
      })
      .join("");

    let result = "";
    if (answered) {
      const isCorrect = state.picked === best;
      const bars = [...round.options]
        .sort((a, b) => counts[b] - counts[a])
        .map(
          (product) => `
            <li class="${product === best ? "is-best" : ""}">
              <span class="bar-label">${label(product)}</span>
              <span class="bar"><i style="width: ${(counts[product] / total) * 100}%"></i></span>
              <span class="bar-value">${fill(copy.ratio, { n: counts[product], total })}</span>
            </li>`,
        )
        .join("");
      const isLast = state.round === ROUNDS.length - 1;

      result = `
        <p class="game-verdict${isCorrect ? " is-correct" : ""}">${isCorrect ? copy.correct : fill(copy.incorrect, { product: lower(best) })}</p>
        <h4>${copy.behind}</h4>
        <p>${fill(copy.behindText, { count: total, history: history.length, items: listItems(round.cart) })}</p>
        <ul class="game-bars">${bars}</ul>
        <p class="game-insight">${copy.insights[state.round]}</p>
        <button type="button" class="button button-ember" data-action="next">${isLast ? copy.toScale : copy.next}</button>`;
    }

    const cartIcons = round.cart.map((item) => PRODUCTS[item].icon).join(" ");
    return `
      <div class="game-play">
        <p class="game-step">${fill(copy.step, { n: state.round + 1, total: ROUNDS.length })}</p>
        <div class="story-line">
          ${avatar(customerNumber - 1)}
          <h3 class="game-question">${fill(copy.question, {
            n: customerNumber,
            items: `<span class="product-icon" aria-hidden="true">${cartIcons}</span>${listItems(round.cart, (text) => `<strong>${text}</strong>`)}`,
          })}</h3>
        </div>
        <div class="game-options">${options}</div>
        <div aria-live="polite">${result}</div>
      </div>`;
  }

  function renderScale() {
    const copy = COPY[language];
    const whatsappHref = window.RC_WHATSAPP_HREF ? window.RC_WHATSAPP_HREF("recommend") : "#contact";
    const counter = `
      <p class="game-counter"><strong data-served>${state.served.toLocaleString(language)}</strong> ${copy.served}</p>
      <p class="game-ticker" data-ticker>${state.ticker}</p>`;

    let body = "";
    if (state.phase === "scale") {
      body = `
        <p>${fill(copy.scaleScore, { score: state.score, total: ROUNDS.length })} ${copy.scaleText}</p>
        <button type="button" class="button button-ember" data-action="scale">${copy.scaleButton}</button>`;
    } else if (state.phase === "running") {
      body = counter;
    } else {
      body = `
        ${counter}
        <p>${copy.doneText}</p>
        <p>${copy.doneReach}</p>
        <p class="game-insight">${copy.doneProof}</p>
        <div class="game-actions">
          <a class="button button-ember" href="${whatsappHref}" target="_blank" rel="noreferrer">${copy.whatsapp}</a>
          <button type="button" class="text-link" data-action="again">${copy.again}</button>
        </div>`;
    }

    const title = state.phase === "done" ? fill(copy.doneTitle, { seconds: SCALE_MS / 1000 }) : copy.scaleTitle;
    return `
      <div class="game-play">
        <h3 class="game-question">${title}</h3>
        <div aria-live="${state.phase === "running" ? "off" : "polite"}">${body}</div>
      </div>`;
  }

  function render() {
    if (!container) {
      return;
    }
    const cards = {
      start: renderStart,
      story: renderStory,
      ask: renderAsk,
      question: renderQuestion,
      answered: renderQuestion,
    };
    const card = cards[state.phase];
    const showsReceipts = card && state.phase !== "start";
    container.innerHTML = card ? (showsReceipts ? renderReceipts() : "") + card() : renderScale();
    container.classList.toggle("is-single", !showsReceipts);
  }

  // Reveals one story customer at a time, then asks the business question.
  function runStory() {
    window.clearTimeout(storyTimer);
    state.phase = "story";
    state.revealed = 0;

    function step() {
      if (state.phase !== "story") {
        return;
      }
      if (state.revealed < STORY_CUSTOMERS) {
        state.revealed += 1;
        render();
        storyTimer = window.setTimeout(step, STORY_STEP_MS);
      } else {
        state.phase = "ask";
        render();
      }
    }

    render();
    storyTimer = window.setTimeout(step, 400);
  }

  // Runs the model for 1,000 simulated customers, updating the counter in place.
  function runScale() {
    const items = Object.keys(PRODUCTS);
    const startedAt = performance.now();
    state.phase = "running";
    render();

    function frame(now) {
      if (state.phase !== "running") {
        return;
      }
      const progress = Math.min(1, (now - startedAt) / SCALE_MS);
      state.served = Math.round(progress * SCALE_CUSTOMERS);
      const item = items[(state.served * 7) % items.length];
      state.ticker = fill(COPY[language].ticker, {
        n: (BASKETS.length + state.served).toLocaleString(language),
        item: lower(item),
        product: lower(recommend([item], BASKETS)),
      });

      if (progress < 1) {
        container.querySelector("[data-served]").textContent = state.served.toLocaleString(language);
        container.querySelector("[data-ticker]").textContent = state.ticker;
        window.requestAnimationFrame(frame);
      } else {
        state.phase = "done";
        render();
      }
    }

    window.requestAnimationFrame(frame);
  }

  function focusAfterRender(selector) {
    const target = container.querySelector(selector);
    if (target) {
      target.focus({ preventScroll: true });
    }
  }

  function onClick(event) {
    const option = event.target.closest("[data-option]");
    const action = event.target.closest("[data-action]");
    const actionName = action ? action.dataset.action : "";

    if (option && state.phase === "question") {
      state.picked = option.dataset.option;
      state.phase = "answered";
      if (state.picked === recommend(ROUNDS[state.round].cart, historyFor(state.round))) {
        state.score += 1;
      }
      render();
      focusAfterRender('[data-action="next"]');
    } else if (actionName === "start") {
      runStory();
      focusAfterRender('[data-action="skip"]');
    } else if (actionName === "skip") {
      window.clearTimeout(storyTimer);
      state.phase = "ask";
      render();
      focusAfterRender('[data-action="play"]');
    } else if (actionName === "play") {
      state.phase = "question";
      render();
      focusAfterRender("[data-option]");
    } else if (actionName === "next") {
      if (state.round < ROUNDS.length - 1) {
        state.round += 1;
        state.picked = null;
        state.phase = "question";
      } else {
        state.phase = "scale";
      }
      render();
      focusAfterRender(state.phase === "scale" ? '[data-action="scale"]' : "[data-option]");
    } else if (actionName === "scale") {
      runScale();
    } else if (actionName === "again") {
      state = initialState();
      render();
      focusAfterRender('[data-action="start"]');
    }
  }

  window.RC_GAME = {
    init(element) {
      container = element;
      container.addEventListener("click", onClick);
      render();
    },
    setLanguage(value) {
      language = value === "es" ? "es" : "en";
      render();
    },
  };
})();
