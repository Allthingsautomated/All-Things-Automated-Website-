// Minimal type for the Workers runtime module used by worker/lead.ts.
declare module "cloudflare:email" {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
  }
}
