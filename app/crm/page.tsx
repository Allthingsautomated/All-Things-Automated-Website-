import type { Metadata } from "next";
import { CrmApp } from "./crm-app";

// Private: the worker only serves /crm to the signed-in owner (Cloudflare Access + token check).
export const metadata: Metadata = {
  title: { absolute: "ATA CRM" },
  robots: { index: false, follow: false },
};

export default function CrmPage() {
  return <CrmApp />;
}
