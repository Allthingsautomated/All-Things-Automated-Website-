import { BrandPageView, brandMeta } from "../../brand-page";
import { brandPages } from "../../partners";

export const metadata = brandMeta(brandPages.ring);

export default function Page() { return <BrandPageView brand={brandPages.ring} />; }
