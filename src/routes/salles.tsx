import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { days, roomOf, roomSlug, roomsOf, type Session } from "@/data/programme";
import { parsePerson, speakerId } from "@/data/speakers";
import { Avatar, Person } from "@/components/Person";

type Search = { jour?: number | undefined; salle?: string | undefined };

const defaultDay = Math.max(0, days.findIndex((d) => roomsOf(d).length > 0));

export const Route = createFileRoute("/salles")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const jour = Number(s["jour"]);
    return {
      jour: Number.isInteger(jour) && jour >= 0 && jour < days.length ? jour : undefined,
      salle: typeof s["salle"] === "string" ? s["salle"] : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Salles — Cyber Africa Forum 2026" },
      { name: "description", content: "Le programme du Cyber Africa Forum 2026 salle par salle : sessions et intervenants de chaque espace, jour par jour." },
      { property: "og:title", content: "Salles — Cyber Africa Forum 2026" },
      { property: "og:description", content: "Qui intervient où, et quand, au Sofitel Cotonou Marina." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Salles,
});

const kindStyle = { plenary: "border-l-accent", side: "border-l-primary", break: "border-l-muted-foreground" } as const;
const kindLabel = { plenary: "Plénière", side: "Side event" } as const;

const start = (s: Session) => s.time.split("–")[0]!.trim();
const end = (s: Session) => (s.time.split("–")[1] ?? s.time).trim();

/** Intervenants uniques d'une liste de sessions (modérateurs compris). */
function peopleOf(sessions: Session[]) {
  const seen = new Map<string, ReturnType<typeof parsePerson>>();
  for (const s of sessions) {
    for (const line of s.people ?? []) {
      const p = parsePerson(line);
      const key = p.speaker ? speakerId(p.speaker) : p.name;
      const prev = seen.get(key);
      if (!prev) seen.set(key, p);
      else if (p.moderator && !prev.moderator) seen.set(key, { ...prev, moderator: true });
    }
  }
  return [...seen.values()];
}

function SessionItem({ s }: { s: Session }) {
  return (
    <li className={`grid gap-1 rounded-md border border-border border-l-4 bg-background/40 p-4 sm:grid-cols-[120px_1fr] sm:gap-4 ${s.kind ? kindStyle[s.kind] : "border-l-border"}`}>
      <time className="font-display text-sm font-bold text-primary">{s.time}</time>
      <div className="min-w-0">
        {s.kind && s.kind !== "break" && <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{kindLabel[s.kind]}</p>}
        <h3 className={`font-bold ${s.kind === "break" ? "text-muted-foreground" : ""}`}>{s.title}</h3>
        {s.theme && <p className="mt-1 text-sm italic text-foreground/85">{s.theme}</p>}
        {s.people && (
          <ul className="mt-2 space-y-0.5 text-sm text-muted-foreground">
            {s.people.map((p) => <li key={p}>— <Person text={p} /></li>)}
          </ul>
        )}
      </div>
    </li>
  );
}

function RoomSection({ room, sessions }: { room: string; sessions: Session[] }) {
  const people = peopleOf(sessions);
  const from = sessions.map(start).sort()[0];
  const to = sessions.map(end).sort().at(-1);
  return (
    <section id={roomSlug(room)} className="scroll-mt-24 overflow-hidden rounded-lg border border-border bg-card">
      <header className="flex flex-wrap items-end justify-between gap-2 border-b border-border p-5">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold"><MapPin className="h-5 w-5 text-primary" />{room}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {sessions.length} session{sessions.length > 1 ? "s" : ""} · {people.length} intervenant{people.length > 1 ? "s" : ""}
          </p>
        </div>
        {from && to && <p className="font-display text-sm font-bold text-primary">{from} – {to}</p>}
      </header>
      <div className="h-1 bg-brand" />
      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_280px]">
        <ol className="space-y-3">
          {sessions.map((s, i) => <SessionItem key={i} s={s} />)}
        </ol>
        {people.length > 0 && (
          <aside>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground">Intervenants dans cette salle</h3>
            <ul className="mt-3 space-y-2">
              {people.map((p) => (
                <li key={p.name}>
                  {p.speaker ? (
                    <Link to="/intervenants" search={{ q: "" }} hash={speakerId(p.speaker)} className="flex items-center gap-3 rounded-md p-1 hover:bg-secondary">
                      <Avatar speaker={p.speaker} name={p.name} />
                      <span className="min-w-0 text-sm leading-tight">
                        <span className="block font-medium">{p.name}</span>
                        {p.moderator && <span className="text-xs text-primary">Modération</span>}
                      </span>
                    </Link>
                  ) : (
                    <span className="flex items-center gap-3 p-1">
                      <Avatar name={p.name} />
                      <span className="text-sm leading-tight text-muted-foreground">{p.name}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </section>
  );
}

function Salles() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/salles" });
  const active = search.jour ?? defaultDay;
  const day = days[active]!;
  const rooms = roomsOf(day);
  const selected = rooms.find((r) => roomSlug(r) === search.salle);
  const shown = selected ? [selected] : rooms;
  const outside = day.sessions.filter((s) => !roomOf(s));
  const go = (next: Search) => navigate({ search: next, replace: true, resetScroll: false });

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-sm uppercase tracking-widest text-primary">Répartition</p>
      <h1 className="mt-2 text-4xl font-bold md:text-5xl">Salles</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">Le programme salle par salle : choisissez un jour, puis une salle pour voir ses sessions et ses intervenants.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {days.map((d, i) => (
          <button key={d.label} onClick={() => go({ jour: i })} className={`rounded-md px-4 py-2 text-left text-sm transition-colors ${i === active ? "bg-brand text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            <span className="block font-bold">{d.label}</span>
            <span className="text-xs opacity-80">{d.date}</span>
          </button>
        ))}
      </div>
      {day.venue && <p className="mt-6 text-sm text-muted-foreground">Lieu : {day.venue}</p>}

      {rooms.length > 0 ? (
        <>
          <div className="sticky top-16 z-20 -mx-5 mt-6 flex gap-2 overflow-x-auto bg-background/95 [scrollbar-width:none] px-5 py-3 backdrop-blur">
            <button onClick={() => go({ jour: active })} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${!selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
              Toutes les salles
            </button>
            {rooms.map((r) => (
              <button key={r} onClick={() => go({ jour: active, salle: roomSlug(r) })} className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${selected === r ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {r}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-8">
            {shown.map((r) => <RoomSection key={r} room={r} sessions={day.sessions.filter((s) => roomOf(s) === r)} />)}
          </div>
        </>
      ) : (
        <p className="mt-6 rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground">Aucune salle n'est attribuée pour ce jour : les événements se tiennent {day.venue ? `au ${day.venue}` : "sur un lieu à préciser"}.</p>
      )}

      {!selected && outside.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">Hors salles</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pauses, networking et événements sans salle attribuée.</p>
          <ol className="mt-4 space-y-3">
            {outside.map((s, i) => <SessionItem key={i} s={s} />)}
          </ol>
        </section>
      )}
    </main>
  );
}
