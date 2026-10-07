import { AssessmentBand, PageShell, pageMeta } from "../site";
import projectData from "./projects.json";
import { type Project, WorkGrid } from "./work-grid";

export const metadata = pageMeta({
  path: "/work",
  title: "Our Work | All Things Automated",
  description: "Lighting control, landscape lighting, security, networking, EV and solar projects by All Things Automated across Sarasota and the Gulf Coast.",
});

const projects = projectData as Project[];

export default function Work() {
  return (
    <PageShell>
      <section className="indexHero shell">
        <p className="eyebrow">Our work</p>
        <h1>Recent projects<br /><em>on the Gulf Coast.</em></h1>
        <p>Projects are identified by city or neighborhood only.</p>
      </section>
      <section className="work shell">
        {projects.length ? (
          <WorkGrid projects={projects} />
        ) : (
          <p className="workEmpty">Project photography is being added. Ask us to walk you through recent work during your assessment.</p>
        )}
      </section>
      <AssessmentBand />
    </PageShell>
  );
}
