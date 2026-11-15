export type Session = {
  time: string;
  title: string;
  kind?: "break" | "plenary" | "side";
  room?: string;
  theme?: string;
  people?: string[];
};
export type Day = { label: string; date: string; venue?: string; sessions: Session[] };

// "Plénière" et "Plénière Dôme" désignent la même salle dans le programme source.
const roomAliases: Record<string, string> = { "Plénière": "Plénière Dôme" };

/** Nom de salle normalisé d'une session (undefined si aucune salle n'est attribuée). */
export const roomOf = (s: Session) => (s.room ? (roomAliases[s.room] ?? s.room) : undefined);

export const roomSlug = (room: string) =>
  room.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Salles d'un jour, dans l'ordre où elles apparaissent au programme. */
export const roomsOf = (day: Day) => [...new Set(day.sessions.map(roomOf).filter((r): r is string => !!r))];

export const formats = [
  { name: "Agora de la Tech", sub: "Stands", text: "Espace dédié à l'innovation concrète et à l'entrepreneuriat numérique africain. Startups, projets innovants, technologies adaptées aux réalités locales : on y vient pour voir, tester, découvrir et investir." },
  { name: "Innovation Talk", sub: "Keynotes & Net Discover", text: "La scène des prises de parole qui marquent. Formats inattendus, personnalités qui ont quelque chose à présenter : l'espace qui ouvre les esprits et pose les bases des grandes conversations du Forum." },
  { name: "Digital Africa Stage", sub: "Enjeux stratégiques", text: "Cybersécurité, souveraineté numérique, infrastructures critiques, gouvernance, IA, identité numérique, cyberdiplomatie. Inspiré des assemblées internationales, il produit des recommandations concrètes." },
];

export const days: Day[] = [
  { label: "Jour J-2", date: "14 novembre 2026", sessions: [
    { time: "09h00 – 15h00", title: "EPITECH × Cyber Africa Women", kind: "side" },
  ]},
  { label: "Jour J-1", date: "15 novembre 2026", venue: "Benin Royal Hotel", sessions: [
    { time: "19h00 – 21h00", title: "Dîner Cyber Africa Women × Africaines In Tech", kind: "side" },
  ]},
  { label: "Jour 1", date: "16 novembre 2026", venue: "Sofitel Cotonou Marina", sessions: [
    { time: "09h30 – 10h30", title: "Cérémonie d'ouverture — Discours officiel", kind: "plenary", room: "Plénière Dôme", people: [
      "Franck KIÉ, Commissaire Général du Cyber Africa Forum",
      "Didier KLA, Directeur Technologique, Groupe KAYDAN et Président, Comité d'Organisation CAF",
      "Mahuna AKPLOGAN, Ministre de la Transformation Digitale et de l'Innovation, République du Bénin"]},
    { time: "10h30 – 11h20", title: "Panel d'ouverture", kind: "plenary", room: "Plénière Dôme", theme: "Confiance numérique et souveraineté : quels choix stratégiques pour l'Afrique ? — suivi de la remise du Prix Léon Koffi Konan (LKK)", people: [
      "Modération : Ghislain DE SALINS, Lead pour la Cybersécurité, Banque Mondiale",
      "Mahuna AKPLOGAN, Ministre de la Transformation Digitale et de l'Innovation, République du Bénin",
      "Yvon DÉTCHÉNOU, Ministre de la Justice et de la Législation, République du Bénin",
      "Ambroise DEPOUILLY, Managing Partner (CEO), Deloitte Afrique Francophone",
      "Mohamed DEMBELE, Managing Partner, Cybersecurity Business Unit, Cybastion",
      "Chançard Moïse KANGA, Directeur Général Afrique, HCLSoftware"]},
    { time: "11h20 – 11h35", title: "Pause-café / Visite des stands", kind: "break" },
    { time: "11h40 – 11h55", title: "Net Discover Deloitte", room: "Plénière", theme: "« Étude Deloitte Cyber Sécurité Monde et Afrique 2026 »", people: ["Tamim KHODER, Directeur Cybersécurité, Deloitte France", "Dhia HACHICHA, Leader Cyber Sécurité, Deloitte"]},
    { time: "11h40 – 11h55", title: "Net Discover IMO2TUN & Africa Valley", room: "Salle Annexe A (Alibori)", theme: "« Évaluation indicative de la maturité cyber d'une organisation et offre vCISO »", people: ["Gildas GNIDEHOU, Founder, AFRICA VALLEY", "Biblis ABATTI, Spécialiste GRC"]},
    { time: "11h40 – 11h55", title: "Side event AAIS & Ciberobs Consulting", room: "Salle Annexe B (Guézo)", theme: "« Cyber : passer du ponctuel au continu grâce à l'IA »", people: ["Hervé BAH, Managing Partner, Ciberobs Consulting", "Hermann KOUDAFOKE, Vice-Président"]},
    { time: "11h55 – 12h55", title: "Panel 1 — Anatomie d'une crise de confiance numérique en Afrique", kind: "plenary", room: "Plénière", people: [
      "Modération : Dr Redda BEN GELOUNE, Président Directeur Général et Fondateur, AITEK Group",
      "Ouanilo MEDEGAN FAGLA, Directeur Général, CNIN, République du Bénin",
      "Aristide ADJINACOU, Directeur Général de l'ASIN, République du Bénin",
      "Thelma Efua QUAYE, Chief Digital Infrastructure, Skills and Empowerment Officer, Smart Africa"]},
    { time: "11h55 – 12h55", title: "Side event CNIN — Enquête spéciale Sextorsion", kind: "side", room: "Salle Annexe A (Alibori)", people: [
      "Modération : Nérys TCHIBOZO, CNIN",
      "Huguette BOKPE GNACADJA, Présidente, INF",
      "Elon'm Mario METONOU, Procureur Spécial, CRIET",
      "Diane ASSIKIDANA, Responsable Service Statistiques, Études et Formation, CNIN",
      "Marilyse AHOUANGONOU, Direction des Collectes et des Analyses, CNIN",
      "Ilham ADIOS, Direction des Collectes et des Analyses, CNIN"]},
    { time: "11h55 – 15h40", title: "ASIN / Smart Africa — Cotonou GovTech Delivery Exchange 2026", kind: "side", room: "Salle Annexe C (Toffa)" },
    { time: "13h00 – 14h00", title: "Déjeuner VIP SaH Analytics / Visite des stands", kind: "break" },
    { time: "14h00 – 14h15", title: "Net Discover Kaspersky", room: "Plénière", theme: "« La prochaine bataille cyber se gagnera par l'intelligence, pas seulement par la technologie »", people: ["Hervé Iro MONDOUHO, Enterprise Account Manager, Kaspersky"]},
    { time: "14h00 – 15h40", title: "The New Era of CyberCrime", room: "Salle Annexe A (Alibori)", people: [
      "Modération : Olivier BEAUDET LABRECQUE, Doyen, ILCE, HEG Arc",
      "Jonathan BOURGUIGNON, Crime Prevention and Criminal Justice Officer, UNODC",
      "Dr Richmond TIEMOKO, Représentant résident au Bénin, UNFPA",
      "Tamim KHODER, Directeur Cybersécurité, Deloitte France",
      "FRANCOPOL", "INTERPOL"]},
    { time: "14h00 – 15h40", title: "Side event ASIN — Forum des RSSI de la sous-région (session privée)", kind: "side", room: "Salle Annexe B (Guézo)" },
    { time: "14h15 – 14h25", title: "Conversation with", room: "Plénière", people: ["Olushegun ADJADI BAKARI, Ministre du Tourisme et du Commerce Extérieur, en charge de l'Industrie et de la Promotion de l'investissement privé, République du Bénin"]},
    { time: "14h25 – 14h40", title: "Net Discover Visa", room: "Plénière", theme: "« Sécuriser l'avenir numérique de l'Afrique : confiance, partenariat et croissance inclusive »", people: ["Ismahill DIABY, Vice-Président, Directeur Général Afrique de l'Ouest & Centrale Francophone et Lusophone, Visa"]},
    { time: "14h40 – 15h40", title: "Panel 2 — Capitaux, risques et opportunités : où en est l'investissement numérique en Afrique ?", kind: "plenary", room: "Les Collines", people: [
      "Modération : Eugène SAINT-GRÉGOIRE, Managing Partner, Dama & Co",
      "Marc WABI, Associé, Adenka",
      "Isabelle DJENI, Directrice Générale Adjointe, Genesis Holding Company",
      "Ghislaine SAMAKÉ, Directrice Générale, Ecobank Guinée-Bissau",
      "Segun YAYI, Vice President, Technology Risk Advisory, Goldman Sachs",
      "Stanislas ZÉZÉ-BAYARD, CEO & President, Bloomfield"]},
    { time: "15h40 – 16h00", title: "Net Discover APDP", room: "Les Collines", theme: "« Protection des données personnelles et l'Intelligence Artificielle »", people: ["Luciano HOUNKPONOU, Président, APDP, République du Bénin"]},
    { time: "16h00 – 16h15", title: "Pause-café / Visite des stands", kind: "break" },
    { time: "16h15 – 17h15", title: "Cyber Africa Women — Keynote & Panel 3", kind: "plenary", room: "Les Collines", theme: "Keynote Africaines In Tech : résultats du baromètre et plaidoyer pour l'investissement dans les femmes de la tech. Panel : « Transformer les entreprises en confiance : comment concilier innovation, maîtrise des risques et réalités du terrain ? »", people: [
      "Modération : Anne Emmanuelle KOUADIO-N'GORAN, Fondatrice, Studio Tequoia",
      "Experte en cybersécurité (à confirmer)",
      "Membre du bureau d'Amazones In Tech au Bénin",
      "Melinda PRUDENCIO, Deputy Country Manager & Sales Manager, Gozem Bénin"]},
    { time: "18h00 – 20h00", title: "Networking — Side event Visa (sur invitation)", kind: "side" },
    { time: "18h00 – 20h00", title: "Networking — Side event Sèmè City", kind: "side" },
    { time: "18h00 – 20h30", title: "MTN Tech Republic — Innovation Lab : l'envers du décor", kind: "side" },
  ]},
  // Source : CAF26-Agenda-New-Format JOUR 2 - V1.pdf
  { label: "Jour 2", date: "17 novembre 2026", venue: "Sofitel Cotonou Marina", sessions: [
    { time: "09h00 – 09h10", title: "Keynote", kind: "plenary", room: "Les Collines", people: [
      "SEM. Benjamin Ignace Bodounrin HOUNKPATIN, Ministre de la Santé, République du Bénin"]},
    { time: "09h00 – 09h15", title: "Net Discover COMTEL", room: "Salle Annexe A (Alibori)", theme: "« Le marché du SOC souverain »", people: [
      "Corentin ADJOVI, Directeur Général, Comtel Technologies"]},
    { time: "09h00 – 10h00", title: "Panel — L'Afrique à l'ère de l'IA : spectatrice ou actrice de la révolution ?", room: "Salle Annexe B (Guézo)", people: [
      "Modération : Paul NGUYEN, Spécialiste principal du Numérique et IA, Afrique de l'Ouest et du Centre - Banque mondiale",
      "Kevin DEGILA, Directeur de la Valorisation des Innovations, des Technologies et de l'Expérimentation, Ministère de la Transformation Digitale et de l'Innovation, Bénin",
      "Charlette N'GUESSAN, Lead AI Ecosystem Development for Sovereign AI Infrastructure, Amini",
      "Serge-Éric GNAMKEY, Country Manager, Yango Food in CIV and Senegal",
      "Dr Moussa TRAORÉ, Ph.D., Directeur Général, SaH Analytics France et Directeur Général Adjoint chargé de l'Innovation et de la Recherche & Développement, SaH Analytics International",
      "Hervé Iro MONDOUHO, Enterprise Account Manager, Kaspersky"]},
    { time: "09h10 – 10h10", title: "Panel d'ouverture — Stabilité du cyberespace : ce que la cyberdiplomatie encadre et ce qui lui échappe", kind: "plenary", room: "Les Collines", people: [
      "Modération : Dorothy ALEXANDRE, Fondatrice et PDG, Académie internationale en communication – La Force de Nos Convictions",
      "Abdul-Hakeem AJIJOLA, Chair, African Union Cybersecurity Expert Group",
      "Dr Farell FOLLY, Directeur Général, Agence Nationale de Cybersécurité et de la Résilience, République du Bénin",
      "Rodolphe Sevi ADJAIGBE, Chef des Affaires Juridiques, des Partenariats et de la Cyberdiplomatie, CNIN, République du Bénin",
      "Mohamed DEMBELE, Managing Partner, Cybersecurity Business Unit, Cybastion",
      "Hubert NZAKIMUENA, Chef de Mission, CICR Bénin"]},
    { time: "09h15 – 10h10", title: "Panel — Infrastructures critiques : la dépendance avant la menace", room: "Salle Annexe A (Alibori)", people: [
      "Modération : Romaric DOFFOU, Senior Manager, Cybersécurité offensive, Deloitte",
      "Gildas HOUESSINSONON, Fondateur et Dirigeant, Digisec",
      "Nir KALRON, Cofondateur et Président, 240 Analytics",
      "Inza CISSÉ, Directeur Général Adjoint, GUCE-CI",
      "Papa Dame SAMBA, CEO - Founder, TALIXMAN GROUP"]},
    { time: "10h10 – 10h25", title: "Pause-café / Visite des stands", kind: "break" },
    { time: "10h10 – 11h55", title: "CAF CIO/CISO Club", room: "Salle Annexe A (Alibori)", theme: "« Piloter la confiance à l'ère de l'IA : innover en toute sécurité et surmonter les crises cyber » — 2 ateliers en groupes, 1 panel et signature officielle du partenariat CAF × APSI-BJ", people: [
      "Modération : Dr Athanase M. ATCHOME, Président du Club RSSI Bénin (modérateur général)"]},
    { time: "10h10 – 11h55", title: "CIO/CISO Club · Atelier groupe 1", room: "Salle Annexe A (Alibori)", theme: "IA générative et agents autonomes : comment accélérer les usages sans perdre le contrôle des données et des actions exécutées ?", people: [
      "Modération : Marius OUPOH, Président APSI-CI",
      "Roméo Stévens AZANDEGBE, VP APSI-BJ",
      "KPANDJA Tafamba, APSI-TG",
      "Alexandre GNACADJA, CJ APSI-BJ",
      "Alain DOSSOUHOUAN, APSI-BJ",
      "Marlyse KIKISSAGBE, bjWhiteHats",
      "Henri DA SYLVA, Club RSSI Bénin"]},
    { time: "10h10 – 11h55", title: "CIO/CISO Club · Atelier groupe 2", room: "Salle Annexe A (Alibori)", theme: "Identités, accès et dépendances : comment sécuriser la chaîne de confiance d'un service numérique critique ?", people: [
      "Modération : Christelle FAIHUN AGO, TG APSI-BJ",
      "Nick-Aurel HOUESSOU, SG APSI-BJ",
      "Adeshina YESSOUFOU, OG APSI-BJ",
      "Harold ADJAHO, Coordinateur, Bénin DNS Forum",
      "Hermine GOUKODADJA, ISOC Bénin",
      "Marius GNANCADJA, CC APSI-BJ",
      "Gérard ADETOLA, Club RSSI Bénin"]},
    { time: "10h10 – 11h55", title: "CIO/CISO Club · Panel", room: "Salle Annexe A (Alibori)", theme: "Cyberrésilience des organisations africaines à l'ère de l'IA : quels arbitrages entre sécurité, continuité des activités et confiance numérique ?", people: [
      "Modération : Dr Athanase M. ATCHOME, Président du Club RSSI Bénin",
      "Jean Claude SIGUI, Président du Club des DSI Côte d'Ivoire",
      "Bernadin TONOUDJI, Manager du bjCSIRT / ASIN",
      "Grégoire GOUCLOUNON, RSSI",
      "Responsable continuité ou gestion de crise, ASIN"]},
    { time: "10h25 – 10h40", title: "Net Discover IMO2TUN et NYQUIST-SHANNON", room: "Les Collines", theme: "« Le baromètre de la signature électronique »", people: [
      "Éric BOSSOU, CEO, NYQUIST-SHANNON",
      "Karel DOGUE, DG, ERSUMA-OHADA",
      "Intervenant à confirmer, Banque Mondiale Bénin"]},
    { time: "10h25 – 11h10", title: "Side event Quality Corporate", kind: "side", room: "Salle Annexe B (Guézo)", people: [
      "Kévin AGOLI-AGBO, Directeur des Opérations et de la Relation Client, Quality Corporate",
      "Armandine ANAGO, Cheffe du département Confiance Numérique et Développement, Quality Corporate"]},
    { time: "10h40 – 11h40", title: "Panel 2 — L'identité numérique africaine entre confiance et vulnérabilité", kind: "plenary", room: "Les Collines", people: [
      "Modération : Gabi ADOTEVI, Senior Program Officer, Digital Public Infrastructure, Gates Foundation",
      "Marc-André Akinolu LOKO, Directeur Général, Agence Nationale d'Identification des Personnes (ANIP), République du Bénin",
      "Sabin SOGAN, Responsable, Département Confiance et Conformité, ASIN",
      "Mohamed SOUNKERE, Fondateur et Président, VEONE",
      "Pierre CHAMPSAVOIR, Expert Green IT et Écoconception des Services Numériques, Programme BeDigital-LuxDev",
      "Dhia HACHICHA, Leader Cyber Sécurité, Deloitte Afrique Francophone"]},
    { time: "11h10 – 11h40", title: "Side event Fondation Kaydan", kind: "side", room: "Salle Annexe B (Guézo)" },
    { time: "11h40 – 11h55", title: "Net Discover ARTEFACT", room: "Les Collines", theme: "« Rethinking Sovereign AI in Africa »", people: [
      "Fabrice ZAPFACK, Partner Côte d'Ivoire, ARTEFACT"]},
    { time: "11h40 – 12h10", title: "Démo Sharp Vision", room: "Salle Annexe B (Guézo)", people: [
      "Awa CISSE, Directrice, Sharp Vision Afrique de l'Ouest"]},
    { time: "11h55 – 12h55", title: "Panel 3 — Sécurité des paiements digitaux en Afrique : levier de confiance et d'adoption numérique durable", kind: "plenary", room: "Les Collines", people: [
      "Modération : Brice KOFFI, Expert en stratégie de transformation digitale | Résilience & Paiements",
      "Gilles KOUNOU, Chief Executive Officer, OPEN SI-KKIAPAY",
      "Jeannot MUFUNGIZI, Senior Director | Head of Risk, Visa, West & Central Africa",
      "Bertrand NGONO ONGOLO, Senior Manager, Enterprise Information Security, Network Technologies MTN",
      "Romaric DOFFOU, Senior Manager, Cybersécurité offensive, Deloitte"]},
    { time: "11h55 – 12h55", title: "Session StreamScan", room: "Salle Annexe A (Alibori)", theme: "« Simulation d'une cyberattaque : cas de ransomware impliquant une exfiltration de données de cartes bancaires »", people: [
      "Dr Abdoul Karim GANAME, Fondateur et Chef de la cybersécurité, StreamScan, Enseignant à l'École Polytechnique de Montréal",
      "Alioune SOW, Director of Sales & Business Development, StreamScan"]},
    { time: "12h55 – 14h00", title: "Déjeuner VIP / Visite des stands", kind: "break" },
    { time: "14h00 – 14h15", title: "Conversation with", room: "Les Collines", people: [
      "Modération : Ornella TCHUENTE, Executive Personal Branding & Reputation Strategist | Founder – Goddess Agency | Créatrice de l'Indice d'Influence Africaine",
      "SEM. Yassine LATOUNDJI, Ministre de la Culture, des Arts et du Patrimoine, République du Bénin"]},
    { time: "14h00 – 15h00", title: "Panel — Innover pour mieux protéger : les nouvelles frontières de la résilience numérique en Afrique", room: "Salle Annexe A (Alibori)", people: [
      "Modération : Dorothy ALEXANDRE, Fondatrice et PDG, Académie internationale en communication – La Force de Nos Convictions",
      "Dr Eyal PINKO, CEO, SAIFORT",
      "Benjamin (Benny) TOMER, Vice-Président des ventes et du développement commercial, DCG-Tech",
      "Genevoix BOKA, Manager Senior Cybersécurité, Kaydan Technology",
      "Awa CISSE, Directrice, Sharp Vision Afrique de l'Ouest",
      "Joël-Hervé MAFORIKAN, Directeur Général, Quality Corporate"]},
    { time: "14h00 – 16h30", title: "Collège des experts (session privée)", room: "Salle Annexe B (Guézo)", theme: "Contributions collectives et recommandations · Formalisation" },
    { time: "14h15 – 15h00", title: "Panel 4 — ICC · Tech 4 Creative Industries : panel tech & industries créatives africaines", kind: "plenary", room: "Les Collines", people: [
      "Modération : Ornella TCHUENTE, Executive Personal Branding & Reputation Strategist | Founder – Goddess Agency | Créatrice de l'Indice d'Influence Africaine",
      "Claude BORNA, Managing Director and Chief Innovation Officer, Sèmè City Development Agency - Presidency",
      "Charles KIÉ, Chairman & CEO, Genesis Holding Company",
      "ADS"]},
    { time: "15h00 – 15h15", title: "Keynote", kind: "plenary", room: "Les Collines", theme: "« Apprendre en confiance à l'ère de l'IA : bâtir une transformation numérique de l'éducation fiable et inclusive »", people: [
      "Sèdami MEDEGAN FAGLA, Ministre de l'Enseignement Supérieur et de la Recherche Scientifique, chargée de la Formation Technique, République du Bénin"]},
    { time: "15h00 – 16h00", title: "Panel — Données africaines : souveraineté, protection et infrastructures à l'heure du cloud", room: "Salle Annexe A (Alibori)", people: [
      "Modération : Cyrille ZOUHON, Directeur de la Transformation Digitale et de l'Innovation du Ministère de la Justice et de la Législation",
      "Nériah SOSSOU, Directeur des Services Numériques, Kaydan Technology",
      "Chary DOUMBIA, General Manager Enterprise Business Unit, MTN",
      "Apastes Semevo AICHEOU, Founder & General Manager, Selys Africa",
      "Rolande FALLET, Product Lead, EQUANS",
      "Dhia HACHICHA, Leader Cyber Sécurité, Deloitte Afrique Francophone"]},
    { time: "15h15 – 16h15", title: "Panel 5 — Recherche, innovation et confiance numérique en Afrique : quelles réponses aux défis de demain ?", kind: "plenary", room: "Les Collines", theme: "Session spéciale chercheurs et universitaires", people: [
      "Modération : Amadou Tidiane DIAWARA, Président, Cyber Réserviste Côte d'Ivoire",
      "Dr Farell FOLLY, Directeur Général, Agence Nationale de Cybersécurité et de la Résilience, République du Bénin",
      "Victorien DOUGNON, Professeur – Bénin & Directeur Général, Agence Béninoise de Télé-enseignement",
      "Paul-Alexandre DAGRY, Associé, Stratégie & Performance, Adenka",
      "Dr Abdoul Karim GANAME, Fondateur et Chef de la cybersécurité, StreamScan, Enseignant à l'École Polytechnique de Montréal",
      "DELOITTE"]},
    { time: "16h15 – 16h30", title: "Pause-café / Visite des stands", kind: "break" },
    { time: "16h30 – 16h45", title: "Keynote de clôture", kind: "plenary", room: "Les Collines" },
    { time: "16h45 – 18h00", title: "Cérémonie de clôture", kind: "plenary", room: "Les Collines", theme: "Networking final – Plaidoyer Jeunes Talents · Cérémonie des Awards CAF 2026 – Remise des prix LKK Achievement et Honneur · Annonce des lauréats de la compétition (HackerLab) · Hackathon HACK4HER" },
  ]},
];
