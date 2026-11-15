import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { speakers, speakerId } from "@/data/speakers";

export const Route = createFileRoute("/intervenants")({
  head: () => ({
    meta: [
      { title: "Intervenants — Cyber Africa Forum 2026" },
      { name: "description", content: "Les personnalités qui interviennent au Cyber Africa Forum 2026 à Cotonou." },
      { property: "og:title", content: "Intervenants — Cyber Africa Forum 2026" },
      { property: "og:description", content: "Ministres, dirigeants et experts de la cybersécurité en Afrique." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Intervenants,
});

const normQ = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

function Intervenants() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    const pick = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id === "recherche") document.getElementById("recherche")?.focus();
      if (!id || id === "recherche") return setSelected(null);
      setSelected(id);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" }));
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);
  const list = speakers.filter((s) => `${s.first} ${s.last} ${s.role} ${s.org ?? ""}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").includes(normQ(q)));
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-sm uppercase tracking-widest text-primary">Personnalités</p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">Intervenants du Forum</h1>
      <div className="relative mt-8 max-w-md"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input id="recherche" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un nom, une organisation…" className="w-full rounded-md border border-input bg-card py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <article key={s.first + s.last} id={speakerId(s)} className={`scroll-mt-24 overflow-hidden rounded-lg border bg-card transition-all ${selected === speakerId(s) ? "speaker-selected border-primary" : "border-border"}`}>
            {s.photo ? (
              <img src={s.photo} alt={`${s.first} ${s.last}`} loading="lazy" className="aspect-[1.1] w-full object-cover object-top" />
            ) : (
              <div className="flex aspect-[1.1] w-full flex-col items-center justify-center bg-secondary">
                <span className="font-display text-5xl font-bold text-muted-foreground">{s.first[0]}{s.last[0]}</span>
                <span className="mt-2 text-xs text-muted-foreground">Photo à venir</span>
              </div>
            )}
            <div className="h-1 bg-brand" />
            <div className="p-5">
              <p className="text-sm text-primary">{s.first}</p>
              <h2 className="text-xl font-bold">{s.last}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.role}</p>
              {s.org && <p className="mt-1 text-sm font-medium text-primary">{s.org}</p>}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
