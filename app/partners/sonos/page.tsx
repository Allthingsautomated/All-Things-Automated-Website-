import { BrandPageView, brandMeta } from "../../brand-page";
import { brandPages } from "../../partners";

export const metadata = brandMeta(brandPages.sonos);

export default function Page() { return <BrandPageView brand={brandPages.sonos} />; }
