# Nikhil Agarwal — Portfolio

Personal portfolio site. **React (Vite)** frontend + **Spring Boot 3 / Java 21** backend.
All content lives in one JSON file and can be edited from a built-in admin page, so no code changes are needed to update the site.

```
Portfolio/
├── backend/                     Spring Boot API (serves the built React app too)
│   └── src/main/resources/
│       ├── seed/portfolio.json  Initial content (copied to data/ on first run)
│       └── application.properties
├── frontend/                    React app
│   ├── public/resume.pdf        Résumé linked from the "Download résumé" button
│   └── src/
│       ├── Site.jsx             Public portfolio page
│       ├── admin/               /admin editor (form editor, raw JSON, messages)
│       └── styles.css           Theme colours, fonts, layout
└── Dockerfile                   One-image build for deployment
```

## Run locally (development)

Two terminals:

```powershell
# 1. Backend on :8080 (the token is your admin password; pick anything)
cd backend
$env:PORTFOLIO_ADMIN_TOKEN = "choose-a-strong-password"
.\mvnw.cmd spring-boot:run
```

```powershell
# 2. Frontend on :5173 with hot reload (proxies /api to :8080)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The editor is at http://localhost:5173/admin.

## How to edit your content

You have three options, and they all change the same file (`backend/data/portfolio.json`):

1. **Admin page (easiest):** go to `/admin`, log in with your `PORTFOLIO_ADMIN_TOKEN`, edit the fields, and click **Save**. Lists can be added to, reordered (↑ ↓), and removed (✕).
2. **Raw JSON tab** in the admin page, for bulk edits or adding new fields.
3. **Edit `data/portfolio.json` directly** in VS Code, then restart the backend.

The previous version is kept as `data/portfolio.backup.json` on every save.
The `data/` folder is git-ignored (it also holds contact messages). To make your current content
the default for fresh deployments, copy `data/portfolio.json` over `backend/src/main/resources/seed/portfolio.json` and commit.
Contact-form submissions appear under **Admin → Messages**.

Other things you might change:

| What | Where |
|---|---|
| Résumé PDF | replace `frontend/public/resume.pdf` |
| Colours / fonts | CSS variables at the top of `frontend/src/styles.css` |
| Page sections & layout | `frontend/src/Site.jsx` |
| Content for a fresh install | `backend/src/main/resources/seed/portfolio.json` |

> Empty `url` / `repoUrl` / `liveUrl` / `phone` fields are hidden on the site, so fill them in when you're ready (e.g. your LinkedIn and GitHub links).

## Build a single deployable jar

```powershell
cd frontend; npm run build          # writes into backend/src/main/resources/static
cd ..\backend; .\mvnw.cmd -DskipTests package
$env:PORTFOLIO_ADMIN_TOKEN = "..."; java -jar target\portfolio-1.0.0.jar
```

Then the whole site, including `/admin`, is served from http://localhost:8080.

## Deploy to GitHub Pages (static, current live site)

Live at **https://nikhilag2021.github.io/NikhilsPortfolio/**. GitHub Pages can't run Java, so this is a
static build of the same React app (`npm run build:pages`):

- Content is bundled from `backend/src/main/resources/seed/portfolio.json`, so **edit that file** and redeploy
- The contact form opens the visitor's email app with the message pre-filled, since there's no server to receive it
- `/admin` is not available (it needs the backend)

To publish changes, commit them, then run from Git Bash:

```bash
./deploy-pages.sh
```

It builds `frontend/dist` and pushes it to the `gh-pages` branch. Pages updates within a minute or two.

## Deploy the full version (with admin editor + contact inbox)

The full site needs a Java host with a **persistent disk**, because edits are saved to a file. Good options:

- **Railway** / **Render** / **Fly.io**: deploy with the included `Dockerfile`, attach a volume at `/data`, and set the env var `PORTFOLIO_ADMIN_TOKEN`.
- **Azure App Service (Java 21)**: fits your AZ-104. Upload the jar, set `PORTFOLIO_ADMIN_TOKEN`, and set `PORTFOLIO_DATA_DIR=/home/data` (the `/home` directory is persistent).

Without a persistent disk the site still works, but admin edits are lost on each redeploy. In that case, edit locally and copy `data/portfolio.json` into the seed file before committing.

## Configuration

| Env var | Default | Purpose |
|---|---|---|
| `PORTFOLIO_ADMIN_TOKEN` | *(empty)* | Admin password. If empty, editing is disabled. |
| `PORTFOLIO_DATA_DIR` | `./data` | Where `portfolio.json` and `messages.json` are stored |
| `PORT` | `8080` | HTTP port |

## API

| Method | Path | Auth |
|---|---|---|
| GET | `/api/portfolio` | public |
| POST | `/api/contact` | public (validated, honeypot, 20/hour cap) |
| POST | `/api/admin/login` | `X-Admin-Token` |
| PUT | `/api/admin/portfolio` | `X-Admin-Token` |
| GET / DELETE | `/api/admin/messages[/{id}]` | `X-Admin-Token` |
