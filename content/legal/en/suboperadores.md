These are the suppliers that process personal data so that Audit Cockpits can work:

| Supplier | Purpose | Data | Location | Safeguard |
|---|---|---|---|---|
| Railway | Platform hosting (application, database and identity provider) | Platform data | European Union (Netherlands) | Contract and supplier DPA |
| Railway | Corporate website hosting | Demo requests and newsletter subscriptions | United States | Contract, supplier DPA and standard contractual clauses |
| Cloudflare | DNS, protection in front of the sign-in, storage of evidence and backups (R2) and forwarding of received emails | Traffic in transit; evidence and backups; messages sent to dpo@ and suporte@ | Storage in the EU; global edge network | Supplier DPA and standard contractual clauses |
| Google (Gmail / Google Workspace) | Destination mailbox for emails sent to dpo@ and suporte@ | Data subject requests and support tickets | United States and other locations of Google's infrastructure | Supplier data protection terms and standard contractual clauses |
| Resend | Transactional emails (invitations, activation, alerts) and the website newsletter | Name, email, notification content | United States | Supplier DPA and standard contractual clauses |
| GitHub | Weekly automatic backup restore test | Encrypted backups; during the weekly restore test the copy is decrypted in a temporary GitHub Actions environment and discarded at the end of the test | United States | Supplier DPA and standard contractual clauses |

The identity provider (sign-in, passwords and MFA) is operated by Audit Cockpits itself. AI features are not
active; if they are switched on, the provider will be added here before use.

**How we announce changes:** we update this page and email customer administrators at least **30 days** in advance, during which they may object (see the [DPA](legal:dpa), clause 6).

**Contact:** `dpo@auditcockpits.com`.
