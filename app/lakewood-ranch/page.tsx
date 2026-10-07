import { LocationPage, locationMeta } from "../location-page";
import { locations } from "../locations";

export const metadata = locationMeta(locations["lakewood-ranch"]);

export default function Page() { return <LocationPage slug="lakewood-ranch" />; }
