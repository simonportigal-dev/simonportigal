function getModalVideo(dialog) {
  var media = dialog.querySelector('.project-modal__media');
  return media && media.tagName === 'VIDEO' ? media : null;
}

function syncMuteButton(dialog) {
  var video = getModalVideo(dialog);
  var btn = dialog.querySelector('[data-mute-toggle]');
  if (!video || !btn) return;
  btn.setAttribute('aria-pressed', String(video.muted));
  btn.textContent = video.muted ? 'unmute' : 'mute';
}

function startModalVideo(dialog) {
  var video = getModalVideo(dialog);
  if (!video) return;
  try { video.currentTime = 0; } catch (err) {}
  // Try to autoplay with sound (allowed here because opening the modal is a
  // user gesture); if the browser still blocks it, fall back to muted playback.
  video.muted = false;
  syncMuteButton(dialog);
  var attempt = video.play();
  if (attempt && typeof attempt.catch === 'function') {
    attempt.catch(function () {
      video.muted = true;
      syncMuteButton(dialog);
      video.play().catch(function () {});
    });
  }
}

function stopModalVideo(dialog) {
  var video = getModalVideo(dialog);
  if (video) video.pause();
}

document.querySelectorAll('[data-modal]').forEach(function (trigger) {
  trigger.addEventListener('click', function (event) {
    event.preventDefault();
    var dialog = document.getElementById(trigger.dataset.modal);
    if (!dialog) return;
    dialog.showModal();
    startModalVideo(dialog);
  });
});

document.querySelectorAll('.project-modal').forEach(function (dialog) {
  var closeBtn = dialog.querySelector('.project-modal__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      dialog.close();
    });
  }

  var muteBtn = dialog.querySelector('[data-mute-toggle]');
  if (muteBtn) {
    muteBtn.addEventListener('click', function () {
      var video = getModalVideo(dialog);
      if (!video) return;
      video.muted = !video.muted;
      syncMuteButton(dialog);
    });
  }

  dialog.addEventListener('close', function () {
    stopModalVideo(dialog);
  });

  dialog.addEventListener('click', function (event) {
    var rect = dialog.getBoundingClientRect();
    var clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!clickedInside) dialog.close();
  });
});

// English is never stored here — it's read live from the HTML (see ORIGINAL_* caches
// below), so editing English text in index.html just works without touching this file.
// Only the French translation needs to be kept in sync when English content changes.
var TRANSLATIONS = {
  projects: { fr: 'Projets' },
  info: { fr: 'Infos' },
  contact: { fr: 'Contact' },
  support: { fr: 'Soutien' },
  close: { fr: 'Fermer' },

  'hero': {
    fr: "Un interprète en équilibre avec une boîte en carton sur la tête pendant une performance de danse"
  },

  'table.role': { fr: 'Rôle' },
  'table.project': { fr: 'Projet' },
  'table.artist': { fr: 'Artiste' },
  'table.location': { fr: 'Lieu' },
  'table.year': { fr: 'Année' },

  'info.bio1': {
    fr: 'Je suis Simon Portigal, artiste en danse contemporaine basé à Montréal, avec une pratique chorégraphique axée sur la recherche. Mon travail adopte une structure dense et multifacette, façonnée par mon vécu en tant que personne queer, enfant de la première génération de l\'internet et « enfant de la troisième culture » ayant grandi à l\'étranger, ainsi que par ma formation académique en danse concert occidentale postmoderne. À travers ces perspectives, j\'explore l\'enchevêtrement du corps avec l\'identité, les frontières, les seuils, le mouvement et la numérisation, en puisant dans des références allant des cultures 2ELGBTQIA+ et populaires à l\'esthétique post-internet, l\'animation, la télé-réalité, le cinéma et les jeux vidéo. Je situe ces influences dans les histoires chorégraphiques et les cadres théoriques plus larges qui façonnent ma pratique, en interrogeant comment le corps négocie le conflit, la contradiction et la multiplicité — et comment se mouvoir dans le monde à l\'intersection du déplacement culturel, de la technologie numérique et de la queerness.'
  },
  'info.bio2': {
    fr: 'J\'ai également une pratique de design web et graphique sous le nom <a class="is-featured" href="http://arthr.ca" target="_blank" rel="noopener noreferrer">arthr.ca</a>'
  },

  'support.text': {
    fr: 'Soutenez mes projets en cours, ma pratique chorégraphique, et aidez-moi à atteindre mes objectifs financiers en tant qu\'artiste <a class="is-featured" href="https://ko-fi.com/simonportigal" target="_blank" rel="noopener noreferrer">ici</a>.'
  },

  'fragile.description': {
    fr: 'fragile & useless imagine une danse folklorique contemporaine, faite dans et de l\'ère de l\'hypernumérisation.'
  },
  'fragile.credit1': { fr: 'Direction, chorégraphie, conception sonore : Simon Portigal' },
  'fragile.credit2': { fr: 'Interprétation : Justin de Luna, Emile Pineault, Louise-Michel Jackson' },
  'fragile.credit3': { fr: 'Conception d\'éclairage : Nien-Tzu Weng' },
  'fragile.credit4': { fr: 'Animation numérique : Timothy Thomasson' },
  'fragile.credit5': { fr: 'Regard extérieur/Direction de répétition : Sasha Kleinplatz' },
  'fragile.credit6': { fr: 'Régie : Michael Martini' },
  'fragile.credit7': { fr: 'Recherche chorégraphique : Hanako Hoshimi-Caines, Nathan Yaffe, Winnie Ho, Scott McCabe, Zoe Vos, Paige Culley, Justin de Luna, Sovann Prom Tep, Louise-Michel Jackson, Emile Pineault' },
  'fragile.credit8': { fr: 'Merci à Lara Oundjian, Sebastian Kann, Dana Gingras / The Stable, et LA SERRE - art vivants.' },
  'fragile.credit9': { fr: 'Créé avec le soutien de Montréal, arts interculturels et La Chapelle Scènes Contemporaines' },
  'fragile.credit10': { fr: 'Rendu possible grâce au soutien financier du Conseil des arts du Canada et du Conseil des arts et des lettres du Québec' },

  'limbic.description': {
    fr: 'Performance solo itérative, limbic cum rag utilise l\'écran vert comme cadre conceptuel pour explorer le corps d\'un·e interprète comme site de projection — à la fois littéralement et figurativement.'
  },
  'limbic.credit1': { fr: 'Direction, chorégraphie, interprétation, vidéo, conception sonore : Simon Portigal' },
  'limbic.credit2': { fr: 'Conception d\'éclairage : Tim Rodrigues, Hugo Dalphond' },
  'limbic.credit3': { fr: 'Merci à Ellen Furey, Dana Michel, Andrew Tay, Christopher Willes, Dancemakers, et la Third Floor Residency' },
  'limbic.credit4': { fr: 'Créé avec le soutien de Montréal, arts interculturels' }
};

var ROLE_TRANSLATIONS = {
  'Tour Management': 'Régie de tournée',
  'Production': 'Production',
  'Residency': 'Résidence',
  'Interpretation': 'Interprétation',
  'Rehearsal Direction': 'Direction de répétition',
  'Consultation': 'Consultation',
  'Research': 'Recherche',
  'Choreography': 'Chorégraphie',
  'Collaboration': 'Collaboration',
  'Collaboration + Interpretation': 'Collaboration et interprétation'
};

var ROLE_TRANSLATIONS_REVERSE = Object.keys(ROLE_TRANSLATIONS).reduce(function (acc, en) {
  acc[ROLE_TRANSLATIONS[en]] = en;
  return acc;
}, {});

var LANG_KEY = 'site-lang';

// English is captured straight from the HTML, once, before any translation runs —
// so it's always whatever's actually written in index.html, never a hardcoded copy.
var ORIGINAL_HTML = new WeakMap();
var ORIGINAL_ALT = new WeakMap();
var ORIGINAL_ARIA = new WeakMap();

document.querySelectorAll('[data-i18n]').forEach(function (el) {
  ORIGINAL_HTML.set(el, el.innerHTML);
});
document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
  ORIGINAL_ALT.set(el, el.getAttribute('alt'));
});
document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
  ORIGINAL_ARIA.set(el, el.getAttribute('aria-label'));
});

function getLang() {
  return localStorage.getItem(LANG_KEY) === 'fr' ? 'fr' : 'en';
}

function applyLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var original = ORIGINAL_HTML.get(el);
    if (lang === 'en') {
      el.innerHTML = original;
      return;
    }
    var entry = TRANSLATIONS[el.dataset.i18n];
    el.innerHTML = entry && entry.fr ? entry.fr : original;
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
    var original = ORIGINAL_ALT.get(el);
    if (lang === 'en') {
      el.setAttribute('alt', original);
      return;
    }
    var entry = TRANSLATIONS[el.dataset.i18nAlt];
    el.setAttribute('alt', entry && entry.fr ? entry.fr : original);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
    var original = ORIGINAL_ARIA.get(el);
    if (lang === 'en') {
      el.setAttribute('aria-label', original);
      return;
    }
    var entry = TRANSLATIONS[el.dataset.i18nAria];
    el.setAttribute('aria-label', entry && entry.fr ? entry.fr : original);
  });

  document.querySelectorAll('.projects__table tbody tr > td:first-child').forEach(function (cell) {
    var text = cell.textContent.trim();
    if (lang === 'fr' && ROLE_TRANSLATIONS[text]) {
      cell.textContent = ROLE_TRANSLATIONS[text];
    } else if (lang === 'en' && ROLE_TRANSLATIONS_REVERSE[text]) {
      cell.textContent = ROLE_TRANSLATIONS_REVERSE[text];
    }
  });

  var toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang === 'fr' ? 'EN' : 'FR';
}

var langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', function (event) {
    event.preventDefault();
    var next = getLang() === 'fr' ? 'en' : 'fr';
    localStorage.setItem(LANG_KEY, next);
    applyLang(next);
  });
}

applyLang(getLang());
