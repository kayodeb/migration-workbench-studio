import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { initials, parsePerson, speakerId, speakerInitials, type Speaker } from "@/data/speakers";

/** Une ligne d'intervenant, avec lien vers sa fiche quand on la connaît. */
export function Person({ text }: { text: string }) {
  const { prefix, name, rest, speaker } = parsePerson(text);
  if (!speaker) return <>{text}</>;
  return (
    <>
      {prefix}
      <Link to="/intervenants" search={{ q: "" }} hash={speakerId(speaker)} className="font-medium text-foreground underline decoration-primary underline-offset-4 hover:text-primary">
        {name}&nbsp;↗
      </Link>
      {rest}
    </>
  );
}

/** Petite photo ronde, avec repli sur les initiales. */
export function Avatar({ speaker, name, className = "h-9 w-9" }: { speaker?: Speaker | undefined; name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const letters = speaker ? speakerInitials(speaker) : initials(name);
  if (speaker?.photo && !failed) {
    return <img src={speaker.photo} alt="" loading="lazy" onError={() => setFailed(true)} className={`${className} shrink-0 rounded-full object-cover object-top`} />;
  }
  return (
    <span aria-hidden className={`${className} flex shrink-0 items-center justify-center rounded-full bg-secondary font-display text-xs font-bold text-muted-foreground`}>
      {letters}
    </span>
  );
}
