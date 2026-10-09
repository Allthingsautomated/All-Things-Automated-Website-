import { BrandPageView, brandMeta } from "../../brand-page";
import { brandPages } from "../../partners";

export const metadata = brandMeta(brandPages.leviton);

export default function Page() { return <BrandPageView brand={brandPages.leviton} />; }
