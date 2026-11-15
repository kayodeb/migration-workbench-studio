import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/programme", label: "Programme" },
  { to: "/salles", label: "Salles" },
  { to: "/intervenants", label: "Intervenants" },
] as const;

export function SiteHeader() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (v) navigate({ to: "/intervenants", search: { q: v } });
  };
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-5">
        <Link to="/" className="shrink-0 font-display text-xl font-bold">
          <span className="text-brand">CAF</span> <span className="hidden text-sm font-medium text-muted-foreground sm:inline">Cyber Africa Forum</span>
        </Link>
        <form onSubmit={submit} className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un intervenant…"
            aria-label="Rechercher un intervenant"
            className="w-44 rounded-md border border-input bg-card py-1.5 pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </form>
        <nav className="flex min-w-0 gap-0.5 overflow-x-auto text-[13px] [scrollbar-width:none] sm:gap-1 sm:text-sm">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="shrink-0 whitespace-nowrap rounded-md px-2 py-2 text-muted-foreground transition-colors hover:text-foreground sm:px-3" activeProps={{ className: "bg-secondary text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
