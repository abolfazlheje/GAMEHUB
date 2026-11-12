# MOLTOL — Security Model

## Secret access is not client-side secrecy

The product uses mystery, discovery, and secret-zone presentation as part of its experience. This is a UX mechanic, not a security guarantee.

Use these classifications:

- **Discoverable:** intentionally hidden from normal navigation; content is still public.
- **Authenticated:** requires a verified user session.
- **Permissioned:** requires a server-side authorization decision for each protected operation.

## Rules

1. Never commit real credentials, tokens, private keys, or production environment files.
2. Never expose private credentials through `NEXT_PUBLIC_*` variables.
3. Validate all input at server boundaries.
4. Check authorization on every protected API request; do not trust UI state.
5. Apply rate limits to login, AI, and expensive generation endpoints.
6. Use secure, HTTP-only, same-site cookies for session identifiers.
7. Avoid logging secrets, session tokens, or sensitive user content.
8. Keep dependencies updated and review security advisories.
9. Use least-privilege access for database and provider credentials.
10. Provide a clear account/data deletion process before storing personal data.

## Before production

- Add a reviewed authentication provider and session strategy.
- Define roles/entitlements and server-side policy checks.
- Add CSRF protections where applicable.
- Add rate limiting and abuse monitoring.
- Configure security headers and a Content Security Policy.
- Run dependency, secret, and static analysis scans in CI.
- Document data retention and privacy practices.

The initial UI is a prototype. Its reveal button does not authenticate or protect content.
