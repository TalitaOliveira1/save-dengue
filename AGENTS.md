# AGENTS.md

## Project Context

This is a Base44 app repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Base44 References

- CLI overview: https://docs.base44.com/developers/references/cli/get-started/overview.md
- Agent skills: https://docs.base44.com/developers/backend/overview/skills.md

If your agent supports Agent Skills, install or update Base44 skills before Base44-specific work:

```bash
npx skills add base44/skills
```

## Key Files

- `src/`: frontend application source.
- `src/api/base44Client.js`: frontend Base44 SDK client.
- `vite.config.js`: Vite config and Base44 Vite plugin setup.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `base44 dev` as the default local development command when you need the local Base44 backend. It can run the backend and frontend together.
- When docs or code mention the frontend being started automatically, that usually means the Base44 project config includes `site.serveCommand`, for example `"serveCommand": "npm run dev"` in `base44/config.jsonc`.
- Use `npm run dev` only for frontend-only work against the hosted Base44 backend.
- Prefer the existing Base44 CLI workflow over adding new npm scripts for Base44-specific tasks.
- Reuse the existing SDK client and Vite plugin patterns before adding new Base44 integration paths.
- Run the relevant checks from `package.json` before finishing code changes.

## Base44 sandbox preview

The sandbox runs this app through `docker-compose.base44.yml` rather than the Base44 CLI:
the CLI needs an interactive Base44 account login plus Deno, and serves on 5173.

- `web` service: `node:22-bookworm` (vite 8 requires node ^20.19 || >=22.12), source
  bind-mounted at `/app`, dependencies installed at startup with `npm install` from the
  bind mount (the repo carries no lockfile), Vite dev server on host port 3000.
- This is the **frontend + hosted backend** wiring, i.e. what `base44 dev --remote` does:
  with `VITE_BASE44_APP_BASE_URL` set, `@base44/vite-plugin` proxies `/api` to the
  published app, so auth and the `smsRecifeData` function hit the app's real backend.
  Logins and any writes therefore touch production data, not a local throwaway backend.
- `VITE_BASE44_APP_ID` / `VITE_BASE44_APP_BASE_URL` are public identifiers taken from the
  published URL `https://save-dengue-copy-b2dfbf8e.base44.app`; no credentials are needed
  to boot. Both are overridable from the shell environment (compose `${VAR:-default}`).
- `BASE44_PREVIEW_MODE` is passed through to the service. No source or config behaviour
  depends on it: the dev server needs no host-allowlist or watch-polling override, because
  the platform-provided `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` already covers the preview
  host. With the flag unset, nothing changes.
- Anonymous visitors land on `/login` — that is the app's own route gate, not a sandbox
  artefact. The signed-in app UI can only be exercised with real app credentials.
- Verify the stack: `curl -sf http://localhost:3000/` (dev server + live source) and
  `curl -s http://localhost:3000/api/apps/public/prod/public-settings/by-id/6ab812b660ae4e77b2dfbf8e`
  (expect `{"id":"6ab812b660ae4e77b2dfbf8e","public_settings":"public_without_login"}`),
  or `docker compose -f docker-compose.base44.yml ps` for the container healthcheck.
