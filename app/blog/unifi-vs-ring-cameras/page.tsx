import { articles } from "../../content";
import { ArticlePage, articleMeta } from "../../site";

export const metadata = articleMeta(articles["unifi-vs-ring-cameras"]);

export default function Page() { return <ArticlePage article={articles["unifi-vs-ring-cameras"]} />; }
