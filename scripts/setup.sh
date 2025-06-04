#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento SaaS Jonatas..."

# Verifica se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker Desktop."
    exit 1
fi

echo "✅ Docker está rodando"

# Verifica se o Node.js está instalado
if ! command -v node > /dev/null 2>&1; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 18+."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Verifica se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

echo "✅ Dependências instaladas"

# Verifica se o Supabase está configurado
if [ ! -f "supabase/config.toml" ]; then
    echo "🔧 Configurando Supabase..."
    npx supabase init
fi

echo "✅ Supabase configurado"

# Inicia o Supabase local
echo "🗄️ Iniciando Supabase local..."
npx supabase start

# Verifica se iniciou corretamente
if [ $? -eq 0 ]; then
    echo "✅ Supabase iniciado com sucesso!"
    echo ""
    echo "🌐 URLs disponíveis:"
    echo "   - API: http://127.0.0.1:54321"
    echo "   - Studio: http://127.0.0.1:54323"
    echo "   - Email: http://127.0.0.1:54324"
    echo ""
    echo "Para iniciar o Next.js, execute:"
    echo "   npm run dev"
    echo ""
    echo "Para parar o Supabase:"
    echo "   npm run supabase:stop"
else
    echo "❌ Erro ao iniciar Supabase"
    exit 1
fi
