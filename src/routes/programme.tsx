import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { days } from "@/data/programme";

export const Route = createFileRoute("/programme")({
  head: () => ({
    meta: [
      { title: "Programme — Cyber Africa Forum 2026" },
      { name: "description", content: "Programme prévisionnel du Cyber Africa Forum 2026 : panels, Net Discover, side events et networking." },
      { property: "og:title", content: "Programme — Cyber Africa Forum 2026" },
      { property: "og:description", content: "Toutes les sessions du 14 au 16 novembre 2026 à Cotonou." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Programme,
});

const kindStyle = { plenary: "border-l-accent", side: "border-l-primary", break: "border-l-muted-foreground" } as const;

function Programme() {
  const [active, setActive] = useState(days.length - 1);
  const day = days[active];
  return (
    <main className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-sm uppercase tracking-widest text-primary">Calendrier prévisionnel</p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">Programme</h1>
      <div className="mt-8 flex flex-wrap gap-2">
        {days.map((d, i) => (
          <button key={d.label} onClick={() => setActive(i)} className={`rounded-md px-4 py-2 text-left text-sm transition-colors ${i === active ? "bg-brand text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            <span className="block font-bold">{d.label}</span>
            <span className="text-xs opacity-80">{d.date}</span>
          </button>
        ))}
      </div>
      {day.venue && <p className="mt-6 text-sm text-muted-foreground">Lieu : {day.venue}</p>}
      <ol className="mt-6 space-y-3">
        {day.sessions.map((s, i) => (
          <li key={i} className={`grid gap-2 rounded-lg border border-border border-l-4 bg-card p-5 md:grid-cols-[150px_1fr] ${s.kind ? kindStyle[s.kind] : "border-l-border"}`}>
            <time className="font-display text-sm font-bold text-primary">{s.time}</time>
            <div>
              <h2 className={`font-bold ${s.kind === "break" ? "text-muted-foreground" : "text-lg"}`}>{s.title}</h2>
              {s.room && <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.room}</p>}
              {s.theme && <p className="mt-2 text-sm italic text-foreground/85">{s.theme}</p>}
              {s.people && (
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {s.people.map((p) => <li key={p}>— {p}</li>)}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
