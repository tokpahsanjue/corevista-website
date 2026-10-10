# CoreVista Technologies website

Static, framework-free website for CoreVista Technologies, a planned internet cafe and business service center in Monrovia, Liberia.

The homepage is `index.html` in the project root. Supporting pages and assets remain in `public/`. The site pages are: `index.html`, `services.html`, `technology.html`, `about.html`, `help.html`, `faq.html`, `contact.html`, `privacy.html`, and `404.html`.

## Preview locally

From the project folder, run:

```powershell
py -m http.server 8080
```

Open `http://localhost:8080`.

## Edit the public configuration

Edit `public/assets/js/site-config.js`. It contains public information only:

- Change `launchStatus` when the launch stage is confirmed.
- Add approved `phone`, `whatsapp` and `email` values. Leave them empty until confirmed; empty fields stay hidden and do not create broken links.
- Change `futureServices` values to honest labels such as `Planned`, `Available` or `Paused`.
- Change the location only when a public address is confirmed.

Edit page copy in `index.html` and `public/privacy.html`. Styles are in `public/assets/css/styles.css`; enhancement behavior is in `public/assets/js/main.js`.

## GitHub

```powershell
git init
git add .
git commit -m "Create CoreVista Technologies website"
git branch -M main
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

Keep private reference documents in `reference-private/`; `.gitignore` excludes that folder from Git and deployment.

## Cloudflare Pages

- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.` (project root)

Do not add canonical URLs, sitemap URLs or structured business details until the final website address and relevant facts are confirmed. After publishing, update the repository, wait for the Pages build, and review the live URL at phone and desktop widths.

## Before public launch

Confirm the public phone number, WhatsApp number, email, exact address, opening hours, prices, payment details and which planned services are actually available. Review all wording and replace the launch status only when the business is ready.
