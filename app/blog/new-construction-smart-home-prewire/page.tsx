import { articles } from "../../content";
import { ArticlePage, articleMeta } from "../../site";

export const metadata = articleMeta(articles["new-construction-smart-home-prewire"]);

export default function Page() { return <ArticlePage article={articles["new-construction-smart-home-prewire"]} />; }
