import { BrandPageView, brandMeta } from "../../brand-page";
import { brandPages } from "../../partners";

export const metadata = brandMeta(brandPages.nest);

export default function Page() { return <BrandPageView brand={brandPages.nest} />; }
