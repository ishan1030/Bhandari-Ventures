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

Write-Host "`nPaste the Tunnel TOKEN from the Cloudflare dashboard" -ForegroundColor Yellow
Write-Host "(Zero Trust > Networks > Tunnels > your tunnel > install command; the long eyJ... value):" -ForegroundColor Yellow
$token = (Read-Host 'Token').Trim()
if ([string]::IsNullOrWhiteSpace($token)) { throw 'No token entered.' }

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
