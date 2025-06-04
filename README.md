# SaaS Jonatas

Plataforma SaaS desenvolvida com Next.js, TypeScript, Tailwind CSS e Supabase.

## 🚀 Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js 18+ 
- Docker Desktop
- Git
- VS Code (recomendado)

### Configuração Inicial

1. **Clone o repositório**
```bash
git clone https://github.com/pereira162/SaaS-Jonatas.git
cd SaaS-Jonatas
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Supabase Local**
```bash
# Inicialize o Supabase (se não foi feito)
npx supabase init

# Inicie o ambiente local
npx supabase start
```

4. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.local.example .env.local

# As variáveis já estão configuradas para desenvolvimento local
```

### 🔧 Scripts Disponíveis

#### Next.js
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint

#### Supabase
- `npm run supabase:start` - Inicia Supabase local
- `npm run supabase:stop` - Para Supabase local
- `npm run supabase:status` - Status dos serviços
- `npm run supabase:studio` - Abre Supabase Studio
- `npm run supabase:reset` - Reset do banco local

#### Banco de Dados
- `npm run db:migrate` - Aplica migrações
- `npm run db:reset` - Reset do banco
- `npm run type-gen` - Gera tipos TypeScript do banco

### 🌐 URLs de Desenvolvimento

Quando o Supabase local está rodando:

- **Next.js App**: http://localhost:3000
- **Supabase API**: http://127.0.0.1:54321
- **Supabase Studio**: http://127.0.0.1:54323
- **Mailpit (Email)**: http://127.0.0.1:54324
- **Database**: postgresql://postgres:postgres@127.0.0.1:54322/postgres

### 📁 Estrutura do Projeto

```
SaaS-Jonatas/
├── src/
│   ├── app/              # App Router (Next.js 13+)
│   │   ├── globals.css   # Estilos globais
│   │   ├── layout.tsx    # Layout principal
│   │   └── page.tsx      # Página inicial
│   ├── components/       # Componentes React
│   ├── lib/             # Bibliotecas e utilitários
│   │   └── supabase.ts  # Cliente Supabase
│   └── utils/           # Funções utilitárias
├── supabase/            # Configurações Supabase
│   ├── config.toml      # Configurações locais
│   └── migrations/      # Migrações do banco
├── types/               # Tipos TypeScript
│   └── supabase.ts      # Tipos do banco
├── .vscode/
│   ├── settings.json    # Configurações VS Code
│   └── mcp.json         # Configuração MCP
├── .env.local           # Variáveis de ambiente local
└── package.json
```

### 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Development**: Docker, Supabase CLI

### 📝 Desenvolvimento

1. **Inicie o ambiente**
```bash
npm run supabase:start
npm run dev
```

2. **Acesse a aplicação**
- App: http://localhost:3000
- Studio: http://127.0.0.1:54323

3. **Para parar os serviços**
```bash
npm run supabase:stop
```

### 🔍 Model Context Protocol (MCP)

O projeto inclui configuração MCP para integração com VS Code:

- **Supabase Local**: Acesso ao banco local
- **Postgres**: Conexão direta ao PostgreSQL
- **Filesystem**: Acesso aos arquivos do projeto

### 📚 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### 🐛 Troubleshooting

**Problema**: Docker não está rodando
```bash
# Verifique se o Docker Desktop está iniciado
docker ps
```

**Problema**: Supabase não conecta
```bash
# Reset do ambiente local
npm run supabase:stop
npm run supabase:start
```

**Problema**: Erro de tipos TypeScript
```bash
# Regenere os tipos do Supabase
npm run type-gen
```