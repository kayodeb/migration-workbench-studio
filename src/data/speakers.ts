const photos = import.meta.glob("@/assets/speakers/*.asset.json", { eager: true, import: "default" }) as Record<string, { url: string }>;
const photo = (n: number) => {
  const k = Object.keys(photos).find((p) => p.endsWith(`/s${String(n).padStart(2, "0")}.jpg.asset.json`));
  return k ? photos[k]?.url : undefined;
};

export type Speaker = { first: string; last: string; role: string; org?: string | undefined; photo?: string | undefined };

const raw: [string, string, string, string?][] = [
  ["Franck", "KIÉ", "Commissaire Général du Cyber Africa Forum"],
  ["Didier", "KLA", "Directeur Technologique, Groupe KAYDAN et Président, Comité d'Organisation CAF"],
  ["Mahuna", "AKPLOGAN", "Ministre de la Transformation Digitale et de l'Innovation, en charge de la stratégie nationale d'Intelligence Artificielle", "République du Bénin"],
  ["Ghislain", "DE SALINS", "Lead pour la Cybersécurité", "Banque Mondiale"],
  ["Yvon", "DÉTCHÉNOU", "Ministre de la Justice et de la Législation", "République du Bénin"],
  ["Ambroise", "DEPOUILLY", "Managing Partner (CEO)", "Deloitte Afrique Francophone et Membre du Comité Exécutif, Deloitte France"],
  ["Mohamed", "DEMBELE", "Managing Partner, Cybersecurity Business Unit", "Cybastion"],
  ["Chançard Moïse", "KANGA", "Directeur Général Afrique", "HCLSoftware"],
  ["Tamim", "KHODER", "Directeur Cybersécurité", "Deloitte France"],
  ["Dhia", "HACHICHA", "Leader Cyber Sécurité", "Deloitte"],
  ["Hervé", "BAH", "Managing Partner", "Ciberobs Consulting"],
  ["Hermann", "KOUDAFOKE", "Vice-Président"],
  ["Gildas", "GNIDEHOU", "Founder", "AFRICA VALLEY SARL"],
  ["Biblis", "ABATTI", "Spécialiste GRC"],
  ["Dr Redda", "BEN GELOUNE", "Président Directeur Général et Fondateur", "AITEK Group"],
  ["Ouanilo", "MEDEGAN FAGLA", "Directeur Général", "Centre National d'Investigations Numériques (CNIN), République du Bénin"],
  ["Aristide", "ADJINACOU", "Directeur Général de l'ASIN", "République du Bénin"],
  ["Thelma Efua", "QUAYE", "Chief Digital Infrastructure, Skills and Empowerment Officer", "Smart Africa"],
  ["Nérys", "TCHIBOZO", "Modération du side event", "CNIN"],
  ["Huguette", "BOKPE GNACADJA", "Présidente", "INF"],
  ["Elon'm Mario", "METONOU", "Procureur Spécial", "CRIET"],
  ["Diane", "ASSIKIDANA", "Responsable Service Statistiques, Études et Formation", "CNIN"],
  ["Marilyse", "AHOUANGONOU", "Direction des Collectes et des Analyses", "CNIN"],
  ["Ilham", "ADIOS", "Direction des Collectes et des Analyses", "CNIN"],
  ["Hervé Iro", "MONDOUHO", "Enterprise Account Manager", "Kaspersky"],
  ["Olushegun", "ADJADI BAKARI", "Ministre du Tourisme et du Commerce Extérieur, en charge de l'Industrie et de la Promotion de l'investissement privé", "République du Bénin"],
  ["Ismahill", "DIABY", "Vice-Président, Directeur Général Afrique de l'Ouest & Centrale Francophone et Lusophone", "Visa"],
  ["Olivier", "BEAUDET LABRECQUE", "Doyen, ILCE – Institut de lutte contre la criminalité économique", "HEG Arc"],
  ["Jonathan", "BOURGUIGNON", "Crime Prevention and Criminal Justice Officer (Anti-corruption)", "United Nations Office on Drugs and Crime (UNODC)"],
  ["Dr Richmond", "TIEMOKO", "Représentant résident au Bénin", "Fonds des Nations Unies pour la population (UNFPA)"],
  ["Eugène", "SAINT-GRÉGOIRE", "Avocat à la Cour – Managing Partner – Private Equity, Venture Capital and M&A", "Dama & Co"],
  ["Marc", "WABI", "Associé", "Adenka"],
  ["Isabelle", "DJENI", "Directrice Générale Adjointe", "Genesis Holding Company"],
  ["Ghislaine", "SAMAKÉ", "Directrice Générale", "Ecobank Guinée-Bissau"],
  ["Segun", "YAYI", "Vice President, Technology Risk Advisory", "Goldman Sachs"],
  ["Stanislas", "ZÉZÉ-BAYARD", "Chief Executive Officer & President", "Bloomfield"],
  ["Luciano", "HOUNKPONOU", "Président", "Autorité de Protection des Données à caractère Personnel, République du Bénin"],
  ["Anne Emmanuelle", "KOUADIO-N'GORAN", "Fondatrice", "Studio Tequoia, cabinet de conseil et de technologie"],
  ["Melinda", "PRUDENCIO", "Deputy Country Manager & Sales Manager", "Gozem Bénin"],
];

export const speakers: Speaker[] = raw.map(([first, last, role, org], i) => ({ first, last, role, org, photo: photo(i + 1) }));
