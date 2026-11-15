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
];
