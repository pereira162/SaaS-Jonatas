#!/bin/bash

# Script para reorganizar o projeto SaaS-Jonatas
# Este script resolve o problema de múltiplas pastas no Source Control

echo "🧹 Limpando estrutura do projeto..."

# Parar processos que podem estar usando os arquivos
echo "⏹️ Parando processos Node.js..."
taskkill /F /IM node.exe 2>nul || true

# Aguardar um pouco
sleep 3

# Tentar remover o subdiretório duplicado
echo "🗂️ Removendo diretório duplicado..."
if [ -d "SaaS-Jonatas" ]; then
    rm -rf "SaaS-Jonatas" || echo "⚠️ Não foi possível remover automaticamente. Remova manualmente se necessário."
fi

# Verificar status do git
echo "📊 Status do Git:"
git status

echo "✅ Limpeza concluída!"
echo ""
echo "📋 INSTRUÇÕES PARA O VS CODE:"
echo "1. Feche todas as janelas do VS Code"
echo "2. Abra apenas o diretório: C:\Users\lucas\Documents\SaaS-Jonatas"
echo "3. Não abra subdiretórios ou múltiplas pastas"
echo ""
echo "🎯 Diretório correto de trabalho:"
echo "   C:\Users\lucas\Documents\SaaS-Jonatas\"
echo ""
