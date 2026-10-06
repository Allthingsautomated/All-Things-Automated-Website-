import { articles } from "../../content";
import { ArticlePage, articleMeta } from "../../site";

export const metadata = articleMeta(articles["smart-bulbs-vs-lighting-system"]);

export default function Page() { return <ArticlePage article={articles["smart-bulbs-vs-lighting-system"]} />; }
