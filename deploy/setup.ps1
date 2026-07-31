<#
  Bhandari Ventures - one-shot IIS deploy for a Windows VPS.

  Run in an ELEVATED PowerShell (Run as administrator) on the server:

    irm https://raw.githubusercontent.com/ishan1030/Bhandari-Ventures/main/deploy/setup.ps1 | iex

  It installs IIS, downloads the built site from GitHub, deploys it to the
  default web site, and opens the firewall for HTTP/HTTPS. No Node needed.
#>

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$repo     = 'ishan1030/Bhandari-Ventures'
$branch   = 'main'
$siteRoot = 'C:\inetpub\wwwroot'
$work     = Join-Path $env:TEMP 'bhandari-deploy'

function Step($m) { Write-Host "`n==> $m" -ForegroundColor Cyan }

# --- 0) Must be elevated ------------------------------------------------------
$id = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
if (-not $id.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  throw 'Please re-run this in an ELEVATED PowerShell (right-click > Run as administrator).'
}

# --- 1) Install IIS -----------------------------------------------------------
Step 'Installing IIS (static content + compression)...'
if (Get-Command Install-WindowsFeature -ErrorAction SilentlyContinue) {
  # Windows Server
  Install-WindowsFeature -Name Web-Server,Web-Static-Content,Web-Default-Doc,`
    Web-Stat-Compression,Web-Dyn-Compression,Web-Mgmt-Console `
    -IncludeManagementTools | Out-Null
} else {
  # Windows client (10/11)
  $feats = 'IIS-WebServerRole','IIS-WebServer','IIS-StaticContent','IIS-DefaultDocument',
           'IIS-HttpCompressionStatic','IIS-HttpCompressionDynamic','IIS-ManagementConsole'
  foreach ($f in $feats) {
    Enable-WindowsOptionalFeature -Online -FeatureName $f -All -NoRestart | Out-Null
  }
}

# --- 2) Download the built site ----------------------------------------------
Step 'Downloading the site from GitHub...'
if (Test-Path $work) { Remove-Item $work -Recurse -Force }
New-Item -ItemType Directory -Path $work | Out-Null
$zip = Join-Path $work 'src.zip'
Invoke-WebRequest "https://github.com/$repo/archive/refs/heads/$branch.zip" `
  -OutFile $zip -UseBasicParsing
Expand-Archive $zip -DestinationPath $work -Force

$dist = Get-ChildItem $work -Directory |
  ForEach-Object { Join-Path $_.FullName 'dist' } |
  Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $dist) { throw 'Built "dist" folder not found in the download.' }

# --- 3) Deploy to the default site root --------------------------------------
Step "Deploying to $siteRoot ..."
Get-ChildItem $siteRoot -Force -ErrorAction SilentlyContinue |
  Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item (Join-Path $dist '*') -Destination $siteRoot -Recurse -Force

# --- 4) Firewall for web traffic ---------------------------------------------
Step 'Opening the firewall for HTTP (80) and HTTPS (443)...'
foreach ($p in 80,443) {
  $name = "Bhandari Web $p"
  if (-not (Get-NetFirewallRule -DisplayName $name -ErrorAction SilentlyContinue)) {
    New-NetFirewallRule -DisplayName $name -Direction Inbound -Action Allow `
      -Protocol TCP -LocalPort $p | Out-Null
  }
}

# --- 5) Start IIS -------------------------------------------------------------
Step 'Starting IIS...'
iisreset /start *> $null
Import-Module WebAdministration -ErrorAction SilentlyContinue
Start-Website -Name 'Default Web Site' -ErrorAction SilentlyContinue

Write-Host "`nDONE. The site is deployed." -ForegroundColor Green
Write-Host "  On the server:  http://localhost/"
Write-Host "  Public IP:      http://43.242.227.73/   (once ports 80/443 are reachable)"
Write-Host ""
Write-Host "Next: point your domain's DNS A record to 43.242.227.73, then browse your domain." -ForegroundColor Yellow
Write-Host "To re-deploy after future changes, just run this script again."
