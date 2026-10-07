import { LocationPage, locationMeta } from "../location-page";
import { locations } from "../locations";

export const metadata = locationMeta(locations["bradenton"]);

export default function Page() { return <LocationPage slug="bradenton" />; }
