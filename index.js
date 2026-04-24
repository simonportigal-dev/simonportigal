/* ======= Page Transition (without SWUP) ======= */
function handlePageTransition(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');

    // Skip empty hrefs, anchors, external links, and special protocols
    if (!href ||
        link.getAttribute('target') === '_blank' ||
        href.startsWith('mailto:') ||
        href.startsWith('javascript:') ||
        href.startsWith('#') ||
        href.startsWith('http')) {
        return;
    }

    e.preventDefault();

    document.body.classList.add('page-transitioning-out');

    setTimeout(() => {
        window.location.href = href;
    }, 600);
}

/* ======= Initialize on Load ======= */
document.addEventListener('DOMContentLoaded', function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Add fade-in on page load
    document.body.classList.add('page-loaded');

    // Initialize features
    initLanguage();
    markPastEvents();

    // Add transition handlers to all internal links
    document.addEventListener('click', handlePageTransition);
});

// Handle back/forward navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.body.classList.remove('page-transitioning-out');
        document.body.classList.add('page-loaded');
    }
});


/* ======= Calendar: Auto-strikethrough Past Events ======= */
function markPastEvents() {
    const items = document.querySelectorAll('.cal_item[data-date]');
    if (!items.length) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    items.forEach(item => {
        const eventDate = new Date(item.dataset.date + 'T00:00:00');
        if (eventDate < today) item.classList.add('past');
    });
}

if (window.location.pathname.includes('choreography.html')) {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', () => video.play());
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// TRANSLATIONS

// ============================================
// Bilingual EN/FR content for simonportigal.com
// ============================================

const translations = {

  en: {
    // --- NAVIGATION ---
    "nav-about":        "about",
    "nav-works":        "works",
    "nav-support":      "donate",
    "nav-calendar":     "activities",
    "nav-lang":         "fr",

    // --- FOOTER ---
    "footer-contact-header":  "Contact",
    "footer-contact-email":   "simon.portigal@gmail.com",
    "footer-socials-header":  "Socials",
    "footer-support-header":  "Donate",
    "footer-support-fundrazr": "Fundrazr",
    "footer-support-kofi":    "Ko-Fi",
    "footer-copyright":       "©2026 Simon Portigal",

    // --- ABOUT PAGE ---
    "about-header":     "About",
    "about-h3":         "I'm Simon Portigal, a contemporary dance artist based in Montréal with a research-based choreographic practice.",
    "about-p1":         "My work adopts a dense, multifaceted structure shaped by my lived experience as a queer, first-generation child of the internet and \"third culture kid\" raised overseas, as well as my academic training in post-modern Western concert dance. Through these lenses, I investigate the body's entanglement with identity, borders, thresholds, movement, and digitality, drawing on references that range across 2SLGBTQIA+ and popular cultures, post-internet aesthetics, animation, reality television, cinema, and video games. I situate these influences within the broader choreographic histories and theoretical frameworks that shape my practice, asking how the body negotiates conflict, contradiction, and multiplicity — and how to move through the world at the intersection of cultural displacement, digital technology, and queerness.",
    "about-p2":         "Trained at L'EDCMTL and then at PARTS, I began my performance career at Dancemakers in 2012 under the direction of Michael Trent, and have been based in Montréal as an independent performer and choreographer since 2015. In 2017, I was awarded a danceWEB Scholarship to attend the ImPulsTanz Festival in Vienna.",
    "about-p3":         "My evening-length, iterative solo limbic cum rag was developed through residencies at Dancemakers, Danse Danse Révolution, the Third Floor Residency, and Montréal, Arts Interculturels (MAI), and has been shown at the MAI, SummerWorks Performance Festival, Performance Mix Festival, and the OFFTA. My first group work, fragile & useless, was developed through residencies at The Stable, LA SERRE – arts vivants, and La Chapelle Scènes Contemporaines; it premiered as a co-presentation by La Chapelle and the MAI, with an excerpt also shown as part of Fierté Montréal's out-of-season programming.",
    "about-p4":         "I have performed in and contributed to works by Dana Michel, Jassem Hindi, Dancemakers / Michael Trent, Clara Furey, Andrew Tay + Stephen Thompson, Sasha Kleinplatz, Eroca Nicols, Ellen Furey, Public Recordings / Ame Henderson, Benoit Lachambre, Adam Kinner, Mårten Spångberg, Benjamin Kamino, Heidi Strauss, Chris Curreri, Annie MacDonell, Zoja Smutny, Amelia Ehrhardt, Brendan Fernandes, Dora Garcia, and Isabel Lewis — a collaborative history that continues to shape how I approach making and performing.",
    "about-p5":         "My work has been shown in Toronto, Montréal, New York, Berlin, and Reykjavik. I'm always looking to expand its reach and connect with new audiences, presenters, and collaborators.",
    "about-p6":         "If my work resonates with you, your support means a great deal — and you can contribute <a href=\"support.html\"><b>here</b></a>!",

    // --- CHOREOGRAPHY PAGE ---
    "choreo-header-past":    "Works",
    "choreo-header-wip":     "Works-In-Progress",
    "choreo-fragile-title":  "fragile & useless",
    "choreo-fragile-desc":   "fragile & useless imagines a contemporary folk dance made in and of the era of hyperdigitization.",
    "choreo-limbic-title":   "limbic cum rag",
    "choreo-limbic-desc":    "Explores the performer's body as a site of projection - literally and figuratively.",
    "choreo-flesh-title":    "Flesh-Nexus, Human Sword",
    "choreo-flesh-desc":     "AI-generated scores reimagine the space between us as a \"virtual social fascia\".",
    "choreo-studies-title":  "Studies in Virtuality",
    "choreo-studies-desc":   "A collaborative multimedia project experimenting with forms of simulation.",
    "choreo-paradise-title": "Paradise",
    "choreo-paradise-desc":  "A rules-based choreographic score exploring themes of collective survival under contemporary capitalism.",

    // --- FRAGILE & USELESS ---
    "fragile-header":         "fragile & useless (2022)",
    "fragile-body-header":    "fragile & useless imagines a contemporary folk dance made in and of the era of hyperdigitization.",
    "fragile-p1":             "Direction, Choreography, Sound Design: Simon Portigal",
    "fragile-p2":             "Performance: Justin de Luna, Emile Pineault, Louise-Michel Jackson",
    "fragile-p3":             "Light Design: Nien-Tzu Weng",
    "fragile-p4":             "Digital Animation: Timothy Thomasson",
    "fragile-p5":             "Outside-eye/Rehearsal Direction: Sasha Kleinplatz",
    "fragile-p6":             "Stage Management: Michael Martini",
    "fragile-p7":             "Movement Research: Hanako Hoshimi-Caines, Nathan Yaffe, Winnie Ho, Scott McCabe, Zoe Vos, Paige Culley, Justin de Luna, Sovann Prom Tep, Louise-Michel Jackson, Emile Pineault",
    "fragile-p8":             "Thanks to Lara Oundjian, Sebastian Kann, and Dana Gingras",
    "fragile-p9":             "Created with the support of Montreal, arts interculturels and La Chapelle Scènes Contemporaines",
    "fragile-p10":            "Made possible by funds from the Canada Council for the Arts and le Conseil des Art et Lettres du Québec",

    // --- LIMBIC CUM RAG ---
    "limbic-header":          "limbic cum rag (2015-2019)",
    "limbic-body-header":     "An iterative performance, limbic cum rag uses the green-screen as a conceptual framework to explore how a performer's body becomes a site of projection - both literally and figuratively.",
    "limbic-p1":              "Direction, Choreography, Performance, Video, Sound Design: Simon Portigal",
    "limbic-p2":              "Light Design: Tim Rodrigues, Hugo Dalphond",
    "limbic-p3":              "Thanks to Ellen Furey, Dana Michel, Andrew Tay, Sasha Kleinplatz, Summerworks Performance Festival, OFFTA",
    "limbic-p4":              "Created with the support of Montreal, arts interculturels",

    // --- FLESH-NEXUS ---
    "flesh-header":           "Flesh-Nexus, Human Sword (wip)",
    "flesh-body-header":      "Blending digital logic into somatic practice, Flesh-Nexus, Human Sword uses AI-generated movement scores and meditations to explore interconnectedness, collective movement, and reimagining the space between us as a \"virtual social fascia\" - dancing in the perverse threshold between physical and digital entanglement.",
    "flesh-p1":               "*In development",
    // "flesh-p2":               "Creative Collaboration/Outside-eye: Katie Ward",
    // "flesh-p3":               "Dramaturgy/Sound Consultation: Jassem Hindi",
    // "flesh-p4":               "Interpreters:",

    // --- STUDIES IN VIRTUALITY ---
    "studies-header":         "Studies in Virtuality (wip)",
    "studies-body-header":    "By experimenting with forms of simulation in various media, Studies in Virtuality explores death and dying through a live experience of virtuality - treating ordinary immaterialities as inconspicuous windows to the afterlife.",
    "studies-p1":             "Direction, Choreography: Simon Portigal",
    "studies-p2":             "Collaborators: Justin de Luna, Jeremy Hervieux, Timothy Thomasson",
    "studies-p3":             "This project has currently benefitted from residencies at Parbleux and Studio 303.",

    // --- PARADISE PAGE ---
    "paradise-header":        "Paradise (wip)",
    "paradise-body-header":   "Through a rules-based choreographic score, Paradise explores how individual and group identities, along with concepts of scarcity and collective survival, are gamified and thus intensified in the context of contemporary capitalism.",
    "paradise-p1":            "Direction, Choreography: Simon Portigal",
    "paradise-p2":            "Research Collaborators:",

    // --- CALENDAR PAGE ---
    "cal-header":               "Activities",

    // --- SUPPORT PAGE ---
    "support-header-funding":   "Project Funding",
    "support-header-ongoing":   "Ongoing Support",
    "support-header-social":    "Social Support",
    "support-p-flesh":          "Help support a week-long research residency for a new group work titled Flesh-Nexus, Human Sword <a href=\"\" target=\"_blank\">here</a>.",
    "support-p-ongoing":        "Help support my ongoing capacity to continue my choreographic practice, pursue my educational goals, and attain my financial goals as an artist <a href=\"https://ko-fi.com/simonportigal\" target=\"_blank\">here</a>.",
    "support-p-social":         "If you'd prefer to direct your support elsewhere, please consider these organizations:",
  },

  fr: {
    // --- NAVIGATION ---
    "nav-about":        "à propos",
    "nav-works":        "œuvres",
    "nav-support":      "don",
    "nav-calendar":     "activités",
    "nav-lang":         "en",

    // --- FOOTER ---
    "footer-contact-header":  "Contact",
    "footer-contact-email":   "simon.portigal@gmail.com",
    "footer-socials-header":  "Réseaux",
    "footer-support-header":  "Don",
    "footer-support-fundrazr": "Fundrazr",
    "footer-support-kofi":    "Ko-Fi",
    "footer-copyright":       "©2026 Simon Portigal",

    // --- ABOUT PAGE ---
    "about-header":     "À propos",
    "about-h3":         "Je suis Simon Portigal, artiste en danse contemporaine basé à Montréal, avec une pratique chorégraphique fondée sur la recherche artistique.",
    "about-p1":         "Mon travail adopte une structure complexe et multifacette, façonnée par mon vécu en tant que personne queer, enfant de première génération de l'internet et « enfant de troisième culture » élevé à l'étranger, ainsi que par ma formation académique en danse de concert postmoderne occidentale. À travers ces prismes, j'explore l'enchevêtrement du corps avec l'identité, les frontières, les seuils, le mouvement et le numérique — puisant dans des références qui s'étendent aux cultures 2SLGBTQIA+ et populaires, à l'esthétique post-internet, à l'animation, à la télé-réalité, au cinéma et aux jeux vidéo. Je situe ces influences dans le cadre plus large des histoires chorégraphiques et des cadres théoriques qui façonnent ma pratique, en me demandant comment le corps négocie le conflit, la contradiction et la multiplicité — et comment avancer dans le monde à l'intersection du déplacement culturel, de la technologie numérique, et du queer.",
    "about-p2":         "Formé à l'EDCMTL puis à P.A.R.T.S., j'ai débuté ma carrière de performeur chez Dancemakers en 2012 sous la direction de Michael Trent, et je suis basé à Montréal en tant que performeur et chorégraphe indépendant depuis 2015. En 2017, j'ai reçu une bourse danceWEB pour participer au Festival ImPulsTanz à Vienne.",
    "about-p3":         "Mon solo itératif limbic cum rag a été développé lors de résidences à Dancemakers, Dance Danse Révolution, la Third Floor Residency et Montréal, Arts Interculturels (MAI), et a été présenté au MAI, au Festival de performance SummerWorks, au Performance Mix Festival et à l'OFFTA. Mon premier travail de groupe, fragile & useless, a été développé lors de résidences à The Stable, LA SERRE – arts vivants et La Chapelle Scènes Contemporaines; il a été créé en coprésentation par La Chapelle et le MAI, avec un extrait également présenté dans le cadre de la programmation hors-saison de Fierté Montréal.",
    "about-p4":         "J'ai performé et contribué à des œuvres de Dana Michel, Jassem Hindi, Dancemakers / Michael Trent, Clara Furey, Andrew Tay + Stephen Thompson, Sasha Kleinplatz, Eroca Nicols, Ellen Furey, Public Recordings / Ame Henderson, Benoit Lachambre, Adam Kinner, Mårten Spångberg, Benjamin Kamino, Heidi Strauss, Chris Curreri, Annie MacDonell, Zoja Smutny, Amelia Ehrhardt, Brendan Fernandes, Dora Garcia et Isabel Lewis — une histoire collaborative qui continue de façonner ma façon d'aborder la création et la performance.",
    "about-p5":         "Mon travail a été présenté à Toronto, Montréal, New York, Berlin et Reykjavik. Je cherche toujours à élargir sa portée et à me connecter avec de nouveaux publics, diffuseurs, et collaborateurs.",
    "about-p6":         "Si mon travail vous touche, votre soutien compte beaucoup — et vous pouvez contribuer <a href=\"support.html\"><b>ici</b></a>!",

    // --- CHOREOGRAPHY PAGE ---
    "choreo-header-past":    "Œuvres",
    "choreo-header-wip":     "Travaux en cours",
    "choreo-fragile-title":  "fragile & inutile",
    "choreo-fragile-desc":   "fragile & inutile imagine une danse folklorique contemporaine créée dans et de l'ère de l'hyperdigitalisation.",
    "choreo-limbic-title":   "limbic cum rag",
    "choreo-limbic-desc":    "Explore le corps du performeur comme site de projection — littéralement et figurativement.",
    "choreo-flesh-title":    "Flesh-Nexus, Human Sword",
    "choreo-flesh-desc":     "Des partitions générées par IA réimaginent l'espace entre nous comme un « fascia social virtuel ».",
    "choreo-studies-title":  "Études en Virtualité",
    "choreo-studies-desc":   "Un projet multimédia collaboratif expérimentant avec de la simulation.",
    "choreo-paradise-title": "Paradis",
    "choreo-paradise-desc":  "Une partition chorégraphique à règles explorant les thèmes de la survie collective sous le capitalisme contemporain.",

    // --- FRAGILE & USELESS ---
    "fragile-header":         "fragile & inutile (2022)",
    "fragile-body-header":    "fragile & inutile imagine une danse folklorique contemporaine créée dans et de l'ère de l'hyperdigitalisation.",
    "fragile-p1":             "Direction, chorégraphie, conception sonore : Simon Portigal",
    "fragile-p2":             "Interprétation : Justin de Luna, Emile Pineault, Louise-Michel Jackson",
    "fragile-p3":             "Conception lumières : Nien-Tzu Weng",
    "fragile-p4":             "Animation numérique : Timothy Thomasson",
    "fragile-p5":             "Regard extérieur/direction de répétition : Sasha Kleinplatz",
    "fragile-p6":             "Régie de scène : Michael Martini",
    "fragile-p7":             "Recherche en mouvement : Hanako Hoshimi-Caines, Nathan Yaffe, Winnie Ho, Scott McCabe, Zoe Vos, Paige Culley, Justin de Luna, Sovann Prom Tep, Louise-Michel Jackson, Emile Pineault",
    "fragile-p8":             "Remerciements à Lara Oundjian, Sebastian Kann et Dana Gingras",
    "fragile-p9":             "Créé avec le soutien de Montréal, arts interculturels et La Chapelle Scènes Contemporaines",
    "fragile-p10":            "Rendu possible grâce au Conseil des arts du Canada et au Conseil des arts et des lettres du Québec",

    // --- LIMBIC CUM RAG ---
    "limbic-header":          "limbic cum rag (2015-2019)",
    "limbic-body-header":     "Performance itérative, limbic cum rag utilise l'écran vert comme cadre conceptuel pour explorer comment le corps du performeur devient un site de projection — à la fois littéralement et figurativement.",
    "limbic-p1":              "Direction, chorégraphie, interprétation, vidéo, conception sonore : Simon Portigal",
    "limbic-p2":              "Conception lumières : Tim Rodrigues, Hugo Dalphond",
    "limbic-p3":              "Remerciements à Ellen Furey, Dana Michel, Andrew Tay, Sasha Kleinplatz, Summerworks Performance Festival, OFFTA",
    "limbic-p4":              "Créé avec le soutien de Montréal, arts interculturels",

    // --- FLESH-NEXUS ---
    "flesh-header":           "Flesh-Nexus, Human Sword (wip)",
    "flesh-body-header":      "En intégrant la logique numérique à la pratique somatique, Flesh-Nexus, Human Sword utilise des partitions de mouvement et des méditations générées par IA pour explorer l'interconnexion, le mouvement collectif, et la réimagination de l'espace entre nous comme un « fascia social virtuel » — dansant dans le seuil pervers entre l'enchevêtrement physique et numérique.",
    "flesh-p1":               "*En développement",
    // "flesh-p2":               "Collaboration créative/regard extérieur : Katie Ward",
    // "flesh-p3":               "Dramaturgie/consultation sonore : Jassem Hindi",
    // "flesh-p4":               "Interprètes :",

    // --- STUDIES IN VIRTUALITY ---
    "studies-header":         "Études en Virtualité (wip)",
    "studies-body-header":    "En expérimentant avec des formes de simulation dans divers médias, Études en Virtualité explore la mort et le mourir à travers une expérience vivante de la virtualité — traitant les immatérialités ordinaires comme des fenêtres discrètes sur l'au-delà.",
    "studies-p1":             "Direction, chorégraphie: Simon Portigal",
    "studies-p2":             "Collaborateurs: Justin de Luna, Jeremy Hervieux, Timothy Thomasson",
    "studies-p3":             "Ce projet a bénéficié de résidences à Parbleux et au Studio 303.",

    // --- PARADISE PAGE ---
    "paradise-header":        "Paradis (wip)",
    "paradise-body-header":   "À travers une partition chorégraphique à règles, Paradis explore comment les identités individuelles et collectives, ainsi que les concepts de rareté et de survie collective, sont gamifiés et ainsi intensifiés dans le contexte du capitalisme contemporain.",
    "paradise-p1":            "Concept, direction, chorégraphie : Simon Portigal",
    "paradise-p2":            "Collaborateurs de recherche :",

    // --- CALENDAR PAGE ---
    "cal-header":               "Activités",

    // --- SUPPORT PAGE ---
    "support-header-funding":   "Financement de projets",
    "support-header-ongoing":   "Soutien continu",
    "support-header-social":    "Soutien communautaire",
    "support-p-flesh":          "Aidez à financer une résidence de recherche d'une semaine pour une nouvelle œuvre de groupe intitulée Flesh-Nexus, Human Sword <a href=\"\" target=\"_blank\">ici</a>.",
    "support-p-ongoing":        "Aidez à soutenir ma capacité continue de poursuivre ma pratique chorégraphique, mes objectifs éducatifs et mes objectifs financiers en tant qu'artiste <a href=\"https://ko-fi.com/simonportigal\" target=\"_blank\">ici</a>.",
    "support-p-social":         "Si vous préférez orienter votre soutien vers d'autres organisations, veuillez considérer celles-ci:",
  }

};

/* ======= Language Switching ======= */

function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    // Plain text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    // HTML elements (for content containing links/markup)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}

function initLanguage() {
    const saved = localStorage.getItem('lang') || 'en';
    applyTranslations(saved);

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const current = localStorage.getItem('lang') || 'en';
            applyTranslations(current === 'en' ? 'fr' : 'en');
        });
    }
}
