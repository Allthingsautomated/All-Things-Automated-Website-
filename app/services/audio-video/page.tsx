import { services } from "../../content";
import { ServicePage, serviceMeta } from "../../site";

export const metadata = serviceMeta(services.audio);

export default function Page() { return <ServicePage service={services.audio} />; }
