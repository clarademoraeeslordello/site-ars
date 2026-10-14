An audit-readiness platform must itself be auditable. These are the controls we apply today.

## Access and identity
- Centralised sign-in with open standards (OIDC), on an identity provider we operate.
- **Mandatory second factor (MFA)** for administrative accounts and a strong password policy.
- Invitations through a **single-use activation link valid for 72 hours**; we never send passwords by email.
- Role-based permissions; consultancies and external auditors only get access through an authorisation with an
  expiry date, a limited role and revocation at any time by the customer's administrator.

## Isolation and data
- Each organisation is isolated on every query, with **automated tests** that check for leaks between
  customers.
- The platform is hosted in the **European Union** (Netherlands); encryption in transit (HTTPS) on every
  connection; databases without public access.
- Evidence is available only through **temporary signed links (up to 15 minutes)**. Uploaded files go through a
  quarantine area and their integrity is recorded by the server.

## Continuity
- **Daily encrypted backups** of the databases, protected against deletion for 35 days, with a **weekly
  automatic restore test**.
- Automatic protections against configuration mistakes between environments.

## Traceability
- **Audit trail** with a verifiable integrity chain.
- Logging of sign-in events and administrative actions, with operational alerts.
- A formal incident response procedure; affected customers are notified within 48 hours of confirmation (see the
  [DPA](legal:dpa)).

## Shared responsibility

| Audit Cockpits | Customer |
|---|---|
| Infrastructure, isolation, encryption, backups, audit trail | Who is invited and with which role; removing leavers |
| Providing and enforcing MFA for administrators | Keeping MFA on and protecting credentials and devices |
| Consultancy access controls (expiry, limits, revocation) | Reviewing and revoking consultancy authorisations |
| Protecting stored content | Not uploading sensitive or unnecessary data; lawfulness of content |

## Internal policies

The security programme follows a set of policies aligned with ISO/IEC 27001 and SOC 2 (access control,
cryptography, backup, logging, vulnerabilities, secure development, suppliers, continuity, information
classification and incidents). Customers may request summaries under a confidentiality agreement.

## Reporting a vulnerability

Found something? Write to **`dpo@auditcockpits.com`** and follow the
[Responsible Disclosure Policy](legal:divulgacao-responsavel).
