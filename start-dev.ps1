# ROYAL DALE - local dev helper
$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot

Set-Location $ProjectRoot

if (-not (Test-Path "$ProjectRoot\package.json")) {
    Write-Host "ERROR: package.json not found in $ProjectRoot" -ForegroundColor Red
    Write-Host "Make sure you run this script from the inner royaldale-main folder." -ForegroundColor Yellow
    exit 1
}

function Test-Command($name) {
    $null -ne (Get-Command $name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command "npm")) {
    Write-Host ""
    Write-Host "Node.js / npm is NOT installed or not on your PATH." -ForegroundColor Red
    Write-Host ""
    Write-Host "Install Node.js LTS: https://nodejs.org/" -ForegroundColor Cyan
    Write-Host "Or run:  winget install OpenJS.NodeJS.LTS" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installing, CLOSE this terminal, open a new one, and run:" -ForegroundColor Yellow
    Write-Host "  cd `"$ProjectRoot`"" -ForegroundColor White
    Write-Host "  npm install" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "Installing dependencies..." -ForegroundColor Green
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Starting dev server..." -ForegroundColor Green
npm run dev
