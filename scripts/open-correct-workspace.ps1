#!/usr/bin/env pwsh

# Script para garantir que o VS Code abra apenas o workspace local correto
# e não tenha múltiplas pastas no Source Control

Write-Host "🔧 Configurando workspace correto para SaaS-Jonatas..." -ForegroundColor Cyan

# Definir caminhos
$ProjectRoot = "C:\Users\lucas\Documents\SaaS-Jonatas"
$WorkspaceFile = "$ProjectRoot\SaaS-Jonatas.code-workspace"

# Verificar se estamos no diretório correto
if (!(Test-Path $ProjectRoot)) {
    Write-Host "❌ Diretório do projeto não encontrado: $ProjectRoot" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Diretório do projeto encontrado: $ProjectRoot" -ForegroundColor Green

# Navegar para o diretório do projeto
Set-Location $ProjectRoot

# Remover arquivo de workspace se existir (pode causar confusão)
if (Test-Path $WorkspaceFile) {
    Write-Host "🗑️ Removendo arquivo de workspace duplicado..." -ForegroundColor Yellow
    Remove-Item $WorkspaceFile -Force
    Write-Host "✅ Arquivo de workspace removido" -ForegroundColor Green
}

# Verificar se é um repositório Git válido
if (!(Test-Path ".git")) {
    Write-Host "❌ Este não é um repositório Git válido" -ForegroundColor Red
    exit 1
}

# Verificar status do Git
Write-Host "📊 Status do repositório Git:" -ForegroundColor Cyan
git status --porcelain

# Verificar se existe subdiretório duplicado
$DuplicateDir = "$ProjectRoot\SaaS-Jonatas"
if (Test-Path $DuplicateDir) {
    Write-Host "⚠️ Subdiretório duplicado encontrado: $DuplicateDir" -ForegroundColor Yellow
    Write-Host "Tentando remover..." -ForegroundColor Yellow
    
    try {
        Remove-Item $DuplicateDir -Recurse -Force -ErrorAction Stop
        Write-Host "✅ Subdiretório duplicado removido" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Não foi possível remover automaticamente o subdiretório duplicado" -ForegroundColor Red
        Write-Host "Remova manualmente: $DuplicateDir" -ForegroundColor Yellow
    }
}

# Abrir VS Code no diretório correto
Write-Host "🚀 Abrindo VS Code no diretório correto..." -ForegroundColor Cyan
Write-Host "Diretório: $ProjectRoot" -ForegroundColor Gray

# Tentar abrir VS Code
try {
    & code . 2>$null
    Write-Host "✅ VS Code aberto com sucesso!" -ForegroundColor Green
}
catch {
    Write-Host "⚠️ Não foi possível abrir o VS Code automaticamente" -ForegroundColor Yellow
    Write-Host "Abra manualmente: File > Open Folder > $ProjectRoot" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📋 Instruções finais:" -ForegroundColor Cyan
Write-Host "  1. Certifique-se de que apenas uma pasta aparece no Source Control" -ForegroundColor Gray
Write-Host "  2. A pasta deve ser: SaaS-Jonatas (não pereira162/SaaS-Jonatas)" -ForegroundColor Gray
Write-Host "  3. Se ainda houver múltiplas pastas, feche e reabra o VS Code" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Setup concluído!" -ForegroundColor Green
