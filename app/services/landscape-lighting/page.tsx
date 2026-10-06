import { services } from "../../content";
import { ServicePage, serviceMeta } from "../../site";

export const metadata = serviceMeta(services.landscape);

export default function Page() { return <ServicePage service={services.landscape} />; }
