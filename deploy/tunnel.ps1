<#
  Installs Cloudflare Tunnel (cloudflared) on this Windows VPS and connects it
  to your Cloudflare account using the tunnel TOKEN from the dashboard.

  Run in an ELEVATED PowerShell on the server:
    irm https://raw.githubusercontent.com/ishan1030/Bhandari-Ventures/main/deploy/tunnel.ps1 | iex

  You'll be prompted to paste the token (a long "eyJ..." string). The token is
  a secret - paste it here on the server only, never into a chat.
#>

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# --- must be elevated ---
$id = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
if (-not $id.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  throw 'Please run this in an ELEVATED PowerShell (Run as administrator).'
}

$dir = 'C:\Program Files\cloudflared'
$exe = Join-Path $dir 'cloudflared.exe'
New-Item -ItemType Directory -Force -Path $dir | Out-Null

Write-Host "`n==> Downloading cloudflared..." -ForegroundColor Cyan
Invoke-WebRequest 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' `
  -OutFile $exe -UseBasicParsing
Write-Host ("    installed: " + (& $exe --version))

# --- remove any previous service so re-runs are clean ---
if (Get-Service -Name cloudflared -ErrorAction SilentlyContinue) {
  Write-Host "`n==> Removing existing cloudflared service..." -ForegroundColor Cyan
  & $exe service uninstall 2>$null
  Start-Sleep -Seconds 2
}

Write-Host "`nPaste the Tunnel TOKEN (the long eyJ... value) from the Cloudflare dashboard." -ForegroundColor Yellow
Write-Host "Tip: you can paste the whole 'cloudflared.exe service install eyJ...' line too." -ForegroundColor DarkGray
$raw = (Read-Host 'Token').Trim()
# Be forgiving: accept the bare token OR the full install command it was copied from.
$i = $raw.IndexOf('eyJ')
$token = if ($i -ge 0) { $raw.Substring($i).Trim() } else { $raw }
if ($token -notmatch '^eyJ[A-Za-z0-9_\-]+') {
  throw "That doesn't look like a tunnel token. It should be a long string starting with 'eyJ'."
}

Write-Host "`n==> Installing and starting the cloudflared service..." -ForegroundColor Cyan
& $exe service install $token
Start-Sleep -Seconds 3
Start-Service cloudflared -ErrorAction SilentlyContinue

Write-Host "`n==> Service status:" -ForegroundColor Cyan
Get-Service cloudflared | Select-Object Status, Name, DisplayName | Format-Table -AutoSize

Write-Host "`nDONE. The tunnel should now show CONNECTED / HEALTHY in the Cloudflare dashboard." -ForegroundColor Green
Write-Host "Next (in the dashboard): add a Public Hostname" -ForegroundColor Yellow
Write-Host "    bhandariventures.com   ->   HTTP   ->   localhost:80"
Write-Host "    www.bhandariventures.com -> HTTP -> localhost:80"
