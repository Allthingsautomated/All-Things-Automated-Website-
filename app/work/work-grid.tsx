"use client";

import { useState } from "react";

// A real ATA project. Images must be real job photos in public/work/ — never the editorial images in public/img/.
export type Project = {
  title: string; // "Siesta Key · Lutron RA3 + landscape lighting" (city or neighborhood only, never a client name or address)
  neighborhood: string;
  systems: string[]; // values from `filters`
  images: string[]; // "/work/siesta-key-ra3-01.jpg"
  year: number;
};

export const filters = ["Lighting", "Landscape", "Security", "Networking", "A/V", "EV", "Solar"];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? projects.filter(project => project.systems.includes(active)) : projects;
  return (
    <>
      <div className="chips" role="group" aria-label="Filter by system">
        <button type="button" aria-pressed={active === null} onClick={() => setActive(null)}>All</button>
        {filters.map(filter => (
          <button type="button" key={filter} aria-pressed={active === filter} onClick={() => setActive(filter)}>{filter}</button>
        ))}
      </div>
      <div className="workGrid">
        {shown.map(project => (
          <article className="workCard" key={project.title}>
            {project.images[0] && <img src={project.images[0]} alt={project.title} loading="lazy" decoding="async" />}
            <p className="eyebrow">{project.neighborhood} · {project.year}</p>
            <h2>{project.title}</h2>
            <p>{project.systems.join(" · ")}</p>
          </article>
        ))}
        {!shown.length && <p className="workEmpty">No projects in this category yet.</p>}
      </div>
    </>
  );
}
