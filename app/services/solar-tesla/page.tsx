import { services } from "../../content";
import { ServicePage, serviceMeta } from "../../site";

export const metadata = serviceMeta(services.solar);

export default function Page() { return <ServicePage service={services.solar} />; }
