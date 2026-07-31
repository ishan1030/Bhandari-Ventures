# Deploying Bhandari Ventures to a Windows VPS (IIS)

The site is a **static** build (`dist/`), so the server only needs IIS — no Node,
no database.

## Fast path (recommended)

1. **Remote Desktop** into the server:
   - Windows: press `Win + R`, type `mstsc`, Enter.
   - Computer: `43.242.227.73:49867`
   - User: `Administrator` (enter your password on the server, not anywhere else).
2. On the server, open **PowerShell as administrator**
   (Start → type *PowerShell* → right-click → **Run as administrator**).
3. Paste and run:

   ```powershell
   irm https://raw.githubusercontent.com/ishan1030/Bhandari-Ventures/main/deploy/setup.ps1 | iex
   ```

   This installs IIS, downloads the built site, deploys it to the default web
   site, and opens the firewall. When it finishes, browse `http://localhost/`
   on the server to confirm.

To **update the site later**, run the same one-liner again.

## Point your domain at the server

In your domain's DNS manager (NestNepal client area → your domain → DNS):

| Type | Host | Value            |
| ---- | ---- | ---------------- |
| A    | `@`  | `43.242.227.73`  |
| A    | `www`| `43.242.227.73`  |

DNS can take from a few minutes up to a few hours to propagate. Note: web
traffic uses ports **80/443** — the `:49867` in the server details is only the
Remote Desktop port, not the website.

## Free HTTPS (Let's Encrypt) — after DNS points here

Once your domain resolves to the server, get a free certificate with
[win-acme](https://www.win-acme.com/):

1. On the server, download win-acme, unzip, run `wacs.exe` as administrator.
2. Choose **N** (new certificate) → pick your IIS site → follow the prompts.
   It installs the cert and sets up auto-renewal.

## Manual deploy (if the script can't reach GitHub)

1. On your PC, run `npm run build` to produce `dist/`.
2. Copy the **contents** of `dist/` (including `web.config`) into
   `C:\inetpub\wwwroot\` on the server (RDP clipboard copy works).
3. In IIS Manager, make sure **Default Web Site** is started.

## Troubleshooting

- **Blank/unstyled page** — the `assets/` folder or `web.config` didn't land in
  the site root. Re-check `C:\inetpub\wwwroot\`.
- **Can't reach it from outside** — confirm your host/provider allows inbound
  80/443 to the VPS (Windows Firewall is handled by the script).
- **403 Forbidden** — `index.html` isn't in the site root, or the default
  document isn't set (the included `web.config` sets it).
