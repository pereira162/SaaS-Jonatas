Write-Host "🚀 Iniciando ambiente de desenvolvimento SaaS Jonatas..." -ForegroundColor Green

# Verifica se o Docker está rodando
try {
    docker info | Out-Null
    Write-Host "✅ Docker está rodando" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker não está rodando. Por favor, inicie o Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verifica se o Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js 18+." -ForegroundColor Red
    exit 1
}

# Verifica se as dependências estão instaladas
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

Write-Host "✅ Dependências instaladas" -ForegroundColor Green

# Verifica se o Supabase está configurado
if (!(Test-Path "supabase/config.toml")) {
    Write-Host "🔧 Configurando Supabase..." -ForegroundColor Yellow
    npx supabase init
}

Write-Host "✅ Supabase configurado" -ForegroundColor Green

# Inicia o Supabase local
Write-Host "🗄️ Iniciando Supabase local..." -ForegroundColor Yellow
npx supabase start

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Supabase iniciado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 URLs disponíveis:" -ForegroundColor Cyan
    Write-Host "   - API: http://127.0.0.1:54321"
    Write-Host "   - Studio: http://127.0.0.1:54323"
    Write-Host "   - Email: http://127.0.0.1:54324"
    Write-Host ""
    Write-Host "Para iniciar o Next.js, execute:" -ForegroundColor Yellow
    Write-Host "   npm run dev"
    Write-Host ""
    Write-Host "Para parar o Supabase:" -ForegroundColor Yellow
    Write-Host "   npm run supabase:stop"
} else {
    Write-Host "❌ Erro ao iniciar Supabase" -ForegroundColor Red
    exit 1
}
