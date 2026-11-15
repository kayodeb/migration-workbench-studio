import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { formats } from "@/data/programme";
import { speakers } from "@/data/speakers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cyber Africa Forum 2026 — Cotonou, 16 & 17 novembre" },
      { name: "description", content: "Programme et intervenants du Cyber Africa Forum 2026 au Sofitel Cotonou Marina, Bénin." },
      { property: "og:title", content: "Cyber Africa Forum 2026 — Cotonou" },
      { property: "og:description", content: "« Construire la confiance numérique de demain » — 16 & 17 novembre 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const faces = speakers.filter((s) => s.photo).slice(0, 8);
  return (
    <main>
      <section className="bg-hero">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">16 & 17 novembre 2026 · Sofitel Cotonou Marina, Bénin</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[1.05] md:text-7xl">
            Construire la <span className="text-brand">confiance numérique</span> de demain
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Le Cyber Africa Forum réunit décideurs publics, experts et entrepreneurs autour de la cybersécurité, de la souveraineté numérique et de l'IA en Afrique.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/programme" className="rounded-md bg-brand px-5 py-3 font-medium text-accent-foreground">Voir le programme</Link>
            <Link to="/intervenants" className="rounded-md border border-border px-5 py-3 font-medium hover:bg-secondary">{speakers.length} intervenants</Link>
            <Link to="/intervenants" hash="recherche" className="inline-flex items-center gap-2 rounded-md border border-primary px-5 py-3 font-medium text-primary hover:bg-secondary"><Search className="h-4 w-4" /> Rechercher un intervenant</Link>
          </div>
          <div className="mt-12 flex -space-x-3">
            {faces.map((s) => (
              <img key={s.last} src={s.photo} alt={`${s.first} ${s.last}`} className="h-12 w-12 rounded-full border-2 border-background object-cover" />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-bold">Les 3 formats de sessions</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {formats.map((f) => (
            <article key={f.name} className="rounded-lg border border-border bg-card p-6">
              <div className="h-1 w-12 rounded bg-brand" />
              <h3 className="mt-5 text-xl font-bold">{f.name}</h3>
              <p className="text-sm text-primary">{f.sub}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
