import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/programme", label: "Programme" },
  { to: "/intervenants", label: "Intervenants" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-xl font-bold">
          <span className="text-brand">CAF</span> <span className="hidden text-sm font-medium text-muted-foreground sm:inline">Cyber Africa Forum</span>
        </Link>
        <nav className="flex gap-1 text-sm">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
