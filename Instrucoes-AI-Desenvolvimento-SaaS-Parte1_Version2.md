# Instruções para AI - Desenvolvimento SaaS Jonatas
## Parte 1: Fundamentos e Stack Tecnológica
## Versão 2.0 - Atualizada em 04/06/2025

## 1. Contexto e Propósito

### 1.1 Sobre o Projeto
Você está desenvolvendo o **SaaS Jonatas**, uma plataforma completa para gestão de restaurantes brasileiros com delivery próprio. Este é um projeto de alta complexidade que combina múltiplas tecnologias modernas para criar uma solução única no mercado brasileiro.

### 1.2 Seu Papel
Como AI assistente de desenvolvimento, você deve:
- Seguir rigorosamente estas instruções e documentos de referência
- Manter consistência técnica e de padrões em todo o projeto
- Priorizar qualidade, segurança e performance desde o primeiro commit
- Documentar todas as decisões técnicas importantes
- Sugerir melhorias e otimizações quando apropriado
- Entregar código production-ready com testes automatizados

### 1.3 Princípios Fundamentais OBRIGATÓRIOS
- **Código Limpo:** Legível, bem documentado, testável, reutilizável
- **Segurança First:** Validações, sanitização, autenticação, auditoria
- **Performance:** Otimização constante, monitoring, caching inteligente
- **Escalabilidade:** Arquitetura preparada para milhares de restaurantes
- **UX/UI:** Interface intuitiva, responsiva e acessível
- **Qualidade:** 80%+ test coverage, CI/CD automatizado

## 2. Stack Tecnológica OBRIGATÓRIA

### 2.1 Frontend Core
```json
{
  "framework": "Next.js 14+ (App Router obrigatório)",
  "ui_library": "Material UI (MUI) v5+",
  "state_management": "React Context API + React Query v5",
  "authentication": "Supabase Auth",
  "styling": "MUI System + CSS-in-JS + Responsive design",
  "forms": "React Hook Form + Zod validation",
  "icons": "Material Icons + Lucide React",
  "charts": "Recharts ou Chart.js",
  "notifications": "React Hot Toast + Push notifications",
  "offline": "PWA com Service Worker",
  "maps": "Google Maps API (para rotas de entrega)"
}
```

### 2.2 Backend Core
```json
{
  "database": "Supabase PostgreSQL (primary)",
  "auth": "Supabase Auth",
  "storage": "Supabase Storage",
  "realtime": "Supabase Realtime",
  "api_principal": "Next.js API Routes",
  "api_integrações": "Node.js + Express (microservices)",
  "orm": "Prisma (para API Node.js quando necessário)",
  "validation": "Zod para schemas compartilhados",
  "caching": "React Query + Redis (futuro)"
}
```

### 2.3 Integrações OBRIGATÓRIAS
```json
{
  "payments": "Stripe (Brasil compliance)",
  "whatsapp": "WPPConnect ou Z-API (decisão durante dev)",
  "thermal_printing": "Escpos.js + Node.js API backup",
  "email": "Resend via Supabase",
  "maps": "Google Maps API + Directions API",
  "sms": "Twilio (backup para WhatsApp)",
  "cdn": "Vercel Edge Network",
  "monitoring": "Sentry + Vercel Analytics",
  "mcp": "Model Context Protocol servers customizados"
}
```

### 2.4 DevOps e Deploy
```json
{
  "versionamento": "Git + GitHub",
  "ci_cd": "GitHub Actions",
  "deploy_mvp": "GitHub Pages",
  "deploy_production": "Vercel",
  "dns": "Cloudflare (subdomínios)",
  "monitoring": "Sentry + Uptime Robot",
  "testing": "Jest + Testing Library + Playwright",
  "linting": "ESLint + Prettier + Husky + Commitlint"
}
```

## 3. Estrutura de Projeto OBRIGATÓRIA

### 3.1 Arquitetura Monorepo
```
saas-jonatas/
├── .env.local
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── next.config.js
├── middleware.ts
├── jest.config.js
├── playwright.config.ts
├── docker-compose.yml (opcional)
│
├── apps/
│   ├── web/                    # Dashboard principal
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── reset-password/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── orders/
│   │   │   │   ├── menu/
│   │   │   │   ├── delivery/      # Gestão entregadores
│   │   │   │   ├── customers/
│   │   │   │   ├── reports/
│   │   │   │   ├── inventory/     # Estoque (fase final)
│   │   │   │   └── settings/
│   │   │   ├── (mobile)/          # Dashboards móveis
│   │   │   │   ├── waiter/        # Dashboard garçom
│   │   │   │   └── delivery/      # Dashboard entregador
│   │   │   ├── (public)/
│   │   │   │   └── [restaurant]/  # Sites multi-tenant
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   ├── orders/
│   │   │   │   ├── delivery/
│   │   │   │   ├── payments/
│   │   │   │   ├── printing/
│   │   │   │   ├── whatsapp/
│   │   │   │   └── webhooks/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   └── public/
│   │       ├── icons/
│   │       ├── images/
│   │       └── manifest.json     # PWA
│   │
│   └── api/                      # Node.js microservices
│       ├── printing/             # Impressão térmica
│       ├── whatsapp/             # WhatsApp automation
│       ├── delivery/             # Otimização rotas
│       └── analytics/            # Relatórios avançados
│
├── packages/
│   ├── ui/                       # Design system
│   │   ├── components/
│   │   │   ├── admin/           # Componentes admin
│   │   │   ├── mobile/          # Componentes mobile
│   │   │   ├── public/          # Componentes site público
│   │   │   └── shared/          # Componentes compartilhados
│   │   ├── styles/
│   │   └── themes/
│   │
│   ├── database/                 # Schemas e migrations
│   │   ├── schemas/
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── policies/            # RLS policies
│   │
│   ├── auth/                     # Auth compartilhado
│   │   ├── providers/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── integrations/             # Integrações externas
│   │   ├── stripe/
│   │   ├── whatsapp/
│   │   ├── maps/
│   │   ├── printing/
│   │   └── email/
│   │
│   └── mcp/                      # MCP servers
│       ├── supabase-mcp/
│       ├── printing-mcp/
│       ├── whatsapp-mcp/
│       └── delivery-mcp/
│
├── tools/
│   ├── scripts/                  # Scripts automação
│   │   ├── setup.sh
│   │   ├── deploy.sh
│   │   ├── migrate.sh
│   │   └── seed.sh
│   │
│   └── testing/                  # Configurações teste
│       ├── fixtures/
│       ├── mocks/
│       └── helpers/
│
├── docs/                         # Documentação
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   ├── CONTRIBUTING.md
│   ├── ARCHITECTURE.md
│   └── USER_GUIDES/
│
└── tests/                        # Testes E2E globais
    ├── e2e/
    ├── integration/
    └── performance/
```

## 4. Configurações Base OBRIGATÓRIAS

### 4.1 package.json
```json
{
  "name": "saas-jonatas",
  "version": "1.0.0",
  "private": true,
  "description": "SaaS completo para gestão de restaurantes com delivery próprio",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "db:generate": "supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/types/database.ts",
    "db:reset": "supabase db reset",
    "db:migrate": "supabase migration up",
    "prepare": "husky install"
  },
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/supabase-js": "^2.38.4",
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@tanstack/react-query": "^5.17.0",
    "@tanstack/react-query-devtools": "^5.17.0",
    "@stripe/stripe-js": "^2.4.0",
    "stripe": "^14.10.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.4",
    "react-hook-form": "^7.48.2",
    "@hookform/resolvers": "^3.3.2",
    "zod": "^3.22.4",
    "react-hot-toast": "^2.4.1",
    "lucide-react": "^0.300.0",
    "recharts": "^2.8.0",
    "date-fns": "^3.0.6",
    "escpos": "^3.0.0-alpha.6",
    "@google/maps": "^1.1.3"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.4",
    "@typescript-eslint/eslint-plugin": "^6.16.0",
    "@typescript-eslint/parser": "^6.16.0",
    "prettier": "^3.1.1",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "@playwright/test": "^1.40.1",
    "supabase": "^1.123.4"
  }
}
```

### 4.2 next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      // Rewrite para sites multi-tenant
      {
        source: '/',
        destination: '/api/tenant-router',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.saasjonatas\\.com',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### 4.3 middleware.ts
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Verificar sessão do usuário
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const hostname = req.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]

  // Lógica multi-tenant
  if (subdomain && !['www', 'admin', 'api', 'app'].includes(subdomain)) {
    // É um subdomínio de restaurante
    const url = req.nextUrl.clone()
    url.pathname = `/restaurant/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // Proteger rotas do dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard') || 
      req.nextUrl.pathname.startsWith('/mobile')) {
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirectTo', req.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  // Redirecionar usuários autenticados da página de login
  if (req.nextUrl.pathname.startsWith('/login') && session) {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### 4.4 Configuração ESLint
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-console": "warn",
    "react-hooks/exhaustive-deps": "warn"
  },
  "overrides": [
    {
      "files": ["**/*.test.ts", "**/*.test.tsx"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
```

### 4.5 Configuração Prettier
```json
// .prettierrc
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 4.6 Configuração Husky e Lint-Staged
```json
// .lintstagedrc.json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
```

```json
// .commitlintrc.json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "revert"
      ]
    ]
  }
}
```

## 5. Variáveis de Ambiente

### 5.1 .env.example
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# WhatsApp (escolher uma opção)
WPPCONNECT_SECRET_KEY=your_wppconnect_key
# OU
ZAPI_TOKEN=your_zapi_token
ZAPI_INSTANCE_ID=your_zapi_instance

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Email
RESEND_API_KEY=your_resend_api_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="SaaS Jonatas"
NEXT_PUBLIC_SUPPORT_EMAIL=suporte@saasjonatas.com

# Node.js APIs
PRINTING_API_URL=http://localhost:3001
WHATSAPP_API_URL=http://localhost:3002
DELIVERY_API_URL=http://localhost:3003

# Database (para APIs Node.js)
DATABASE_URL=postgresql://postgres:password@localhost:54322/postgres

# Redis (futuro)
REDIS_URL=redis://localhost:6379
```

## 6. Configuração PWA

### 6.1 manifest.json
```json
{
  "name": "SaaS Jonatas",
  "short_name": "SaaS Jonatas",
  "description": "Gestão completa para restaurantes com delivery",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1976d2",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 6.2 Service Worker Básico
```javascript
// public/sw.js
const CACHE_NAME = 'saas-jonatas-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})
```

---

## 📋 RESUMO PARTE 1

Esta primeira parte estabelece:
✅ **Fundamentos do projeto** e responsabilidades da AI
✅ **Stack tecnológica completa** e obrigatória
✅ **Estrutura de arquivos** detalhada (monorepo)
✅ **Configurações base** (package.json, Next.js, linting)
✅ **Variáveis de ambiente** necessárias
✅ **PWA setup** básico

**Próxima parte:** Padrões de código, validações e componentes
**Parte 3:** Integrações, testes e deploy

**Continue sempre seguindo estes padrões estabelecidos!**