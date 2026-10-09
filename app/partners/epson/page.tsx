import { BrandPageView, brandMeta } from "../../brand-page";
import { brandPages } from "../../partners";

export const metadata = brandMeta(brandPages.epson);

export default function Page() { return <BrandPageView brand={brandPages.epson} />; }
