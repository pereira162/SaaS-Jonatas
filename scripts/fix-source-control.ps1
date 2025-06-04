# Script PowerShell para reorganizar o projeto SaaS-Jonatas
# Este script resolve o problema de múltiplas pastas no Source Control

Write-Host "🧹 Limpando estrutura do projeto..." -ForegroundColor Cyan

# Parar processos que podem estar usando os arquivos
Write-Host "⏹️ Parando processos Node.js..." -ForegroundColor Yellow
try {
    taskkill /F /IM node.exe 2>$null
} catch {
    Write-Host "Nenhum processo Node.js encontrado" -ForegroundColor Gray
}

# Aguardar um pouco
Start-Sleep -Seconds 3

# Tentar remover o subdiretório duplicado
Write-Host "🗂️ Tentando remover diretório duplicado..." -ForegroundColor Yellow
if (Test-Path "SaaS-Jonatas") {
    try {
        Remove-Item -Recurse -Force "SaaS-Jonatas"
        Write-Host "✅ Subdiretório removido com sucesso!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Não foi possível remover automaticamente. Você pode remover manualmente se necessário." -ForegroundColor Orange
        Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "✅ Nenhum subdiretório duplicado encontrado" -ForegroundColor Green
}

# Verificar status do git
Write-Host "`n📊 Status do Git:" -ForegroundColor Cyan
git status

Write-Host "`n✅ Limpeza concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 INSTRUÇÕES PARA O VS CODE:" -ForegroundColor Cyan
Write-Host "1. Feche todas as janelas do VS Code" -ForegroundColor White
Write-Host "2. Abra apenas o diretório: C:\Users\lucas\Documents\SaaS-Jonatas" -ForegroundColor White  
Write-Host "3. Não abra subdiretórios ou múltiplas pastas" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Diretório correto de trabalho:" -ForegroundColor Green
Write-Host "   C:\Users\lucas\Documents\SaaS-Jonatas\" -ForegroundColor Yellow
Write-Host ""
