# PROMPT: Mapeamento Completo de Páginas e Componentes - SaaS Jonatas
## Data: 2025-06-04 03:34:18 UTC | User: pereira162

## 🎯 OBJETIVO DO PROMPT

Você deve criar o **design completo** de todas as páginas e componentes do **SaaS Jonatas** baseado nas especificações dos documentos de referência. Este mapeamento será usado para desenvolver toda a interface do usuário de forma consistente e funcional.

---

## 📱 ESTRUTURA GERAL DO APLICATIVO

### Tipos de Interface:
1. **🌐 Site Público Multi-tenant** (para clientes)
2. **💻 Dashboard Administrativo** (desktop/tablet)
3. **📱 Dashboard Mobile - Entregador** (PWA)
4. **📱 Dashboard Mobile - Garçom** (PWA)
5. **🔐 Páginas de Autenticação** (responsivas)

---

## 🌐 SITE PÚBLICO MULTI-TENANT

### Domínio: `restaurante.saasjonatas.com`

#### 1. **Homepage do Restaurante**
```
URL: /
FUNÇÃO: Página inicial do restaurante
DESCRIÇÃO: Apresenta o restaurante, destaca pratos principais e permite navegação para o cardápio

SEÇÕES:
- Hero com banner personalizado e logo do restaurante
- Destaques do cardápio (produtos em destaque)
- Informações do restaurante (sobre, horários, contato)
- Avaliações de clientes
- Call-to-action para "Ver Cardápio" e "Fazer Pedido"

COMPONENTES:
- RestaurantHero
- FeaturedProducts
- RestaurantInfo
- CustomerReviews
- OrderCTA
```

#### 2. **Cardápio Completo**
```
URL: /cardapio
FUNÇÃO: Exibir todos os produtos organizados por categoria
DESCRIÇÃO: Catálogo navegável com busca, filtros e adição ao carrinho

SEÇÕES:
- Barra de busca e filtros
- Navegação por categorias (sidebar ou tabs)
- Grid de produtos com imagens, preços e descrições
- Modal de detalhes do produto
- Botões de adicionar ao carrinho

COMPONENTES:
- MenuSearch
- CategoryNavigation
- ProductGrid
- ProductCard
- ProductModal
- AddToCartButton
```

#### 3. **Página do Produto**
```
URL: /produto/[slug]
FUNÇÃO: Detalhes completos de um produto específico
DESCRIÇÃO: Informações detalhadas, variações, ingredientes e opções de personalização

SEÇÕES:
- Galeria de imagens do produto
- Informações detalhadas (nome, descrição, preço)
- Seleção de variações (tamanho, adicionais)
- Campo de observações
- Quantidade e botão adicionar ao carrinho
- Produtos relacionados/sugeridos

COMPONENTES:
- ProductGallery
- ProductInfo
- VariationSelector
- QuantitySelector
- RelatedProducts
```

#### 4. **Carrinho de Compras**
```
URL: /carrinho
FUNÇÃO: Revisão dos itens antes da finalização
DESCRIÇÃO: Lista de produtos, edição de quantidades, cálculo de totais

SEÇÕES:
- Lista de itens no carrinho
- Edição de quantidade e remoção
- Resumo de valores (subtotal, taxa de entrega, total)
- Campo de cupom de desconto
- Botão para continuar para checkout

COMPONENTES:
- CartItemList
- CartItem
- OrderSummary
- CouponField
- CheckoutButton
```

#### 5. **Checkout - Dados do Cliente**
```
URL: /checkout/dados
FUNÇÃO: Coleta de informações do cliente
DESCRIÇÃO: Formulário para dados pessoais e endereço de entrega

SEÇÕES:
- Formulário de dados pessoais (nome, telefone, email)
- Seleção/cadastro de endereço de entrega
- Cálculo automático da taxa de entrega
- Validação de área de entrega
- Botão para próxima etapa

COMPONENTES:
- CustomerForm
- AddressSelector
- AddressForm
- DeliveryFeeCalculator
- StepIndicator
```

#### 6. **Checkout - Pagamento**
```
URL: /checkout/pagamento
FUNÇÃO: Seleção da forma de pagamento
DESCRIÇÃO: Opções de pagamento e finalização do pedido

SEÇÕES:
- Seleção de forma de pagamento (dinheiro, cartão, PIX)
- Integração com Stripe (se cartão)
- Campo para troco (se dinheiro)
- Observações do pedido
- Resumo final e confirmação

COMPONENTES:
- PaymentMethodSelector
- StripeCheckout
- ChangeCalculator
- OrderNotes
- FinalOrderSummary
```

#### 7. **Confirmação do Pedido**
```
URL: /pedido/[id]/confirmacao
FUNÇÃO: Confirmação pós-pedido
DESCRIÇÃO: Detalhes do pedido confirmado e próximos passos

SEÇÕES:
- Número do pedido e status
- Resumo completo do pedido
- Tempo estimado de entrega
- Informações de acompanhamento
- Botões para WhatsApp e acompanhamento

COMPONENTES:
- OrderConfirmation
- OrderSummaryCard
- DeliveryEstimate
- TrackingInfo
- ContactActions
```

#### 8. **Acompanhamento do Pedido**
```
URL: /pedido/[id]/acompanhar
FUNÇÃO: Status em tempo real do pedido
DESCRIÇÃO: Timeline do pedido com atualizações automáticas

SEÇÕES:
- Timeline do status do pedido
- Localização do entregador (quando disponível)
- Informações de contato
- Estimativa de entrega atualizada
- Histórico de atualizações

COMPONENTES:
- OrderTimeline
- DeliveryTracking
- ContactInfo
- StatusUpdates
```

#### 9. **Área do Cliente** (Opcional)
```
URL: /minha-conta
FUNÇÃO: Painel do cliente cadastrado
DESCRIÇÃO: Histórico de pedidos e gerenciamento de dados

SEÇÕES:
- Dashboard com resumo
- Histórico de pedidos
- Endereços salvos
- Produtos favoritos
- Dados pessoais

COMPONENTES:
- CustomerDashboard
- OrderHistory
- AddressBook
- FavoritesList
- ProfileSettings
```

---

## 💻 DASHBOARD ADMINISTRATIVO

### Domínio: `app.saasjonatas.com/dashboard`

#### 10. **Dashboard Principal**
```
URL: /dashboard
FUNÇÃO: Visão geral das operações
DESCRIÇÃO: Métricas principais, pedidos recentes e ações rápidas

SEÇÕES:
- Cards de métricas (vendas, pedidos, entregadores)
- Gráficos de performance
- Lista de pedidos recentes
- Ações rápidas
- Notificações importantes

COMPONENTES:
- MetricsCards
- SalesChart
- RecentOrders
- QuickActions
- NotificationPanel
```

#### 11. **Gestão de Pedidos**
```
URL: /dashboard/pedidos
FUNÇÃO: Gerenciamento completo de pedidos
DESCRIÇÃO: Lista, filtros, busca e controle de status dos pedidos

SEÇÕES:
- Filtros e busca avançada
- Lista de pedidos com status
- Detalhes do pedido (modal/sidebar)
- Ações de status (confirmar, cancelar, etc.)
- Impressão de comprovantes

COMPONENTES:
- OrderFilters
- OrdersList
- OrderCard
- OrderDetails
- StatusActions
- PrintActions
```

#### 12. **Gestão de Cardápio**
```
URL: /dashboard/cardapio
FUNÇÃO: CRUD completo do cardápio
DESCRIÇÃO: Gerenciamento de categorias e produtos

SEÇÕES:
- Abas: Categorias e Produtos
- Lista com ações (criar, editar, excluir)
- Formulários de criação/edição
- Upload de imagens
- Configurações de disponibilidade

COMPONENTES:
- MenuTabs
- CategoryList
- ProductList
- CategoryForm
- ProductForm
- ImageUploader
- AvailabilityToggle
```

#### 13. **Gestão de Entregadores**
```
URL: /dashboard/entregadores
FUNÇÃO: Controle completo da equipe de entrega
DESCRIÇÃO: CRUD de entregadores, acompanhamento e métricas

SEÇÕES:
- Lista de entregadores com status
- Mapa com localização em tempo real
- Métricas de performance
- Formulário de cadastro/edição
- Histórico de entregas

COMPONENTES:
- DeliveryPersonsList
- DeliveryMap
- PerformanceMetrics
- DeliveryPersonForm
- DeliveryHistory
```

#### 14. **Gestão de Clientes**
```
URL: /dashboard/clientes
FUNÇÃO: CRM de clientes
DESCRIÇÃO: Base de clientes, histórico e comunicação

SEÇÕES:
- Lista de clientes com busca
- Perfil detalhado do cliente
- Histórico de pedidos
- Conversas WhatsApp
- Segmentação e tags

COMPONENTES:
- CustomersList
- CustomerProfile
- CustomerOrders
- WhatsAppConversations
- CustomerSegmentation
```

#### 15. **Relatórios Financeiros**
```
URL: /dashboard/relatorios
FUNÇÃO: Analytics e relatórios
DESCRIÇÃO: Dashboards financeiros e operacionais

SEÇÕES:
- Resumo financeiro
- Gráficos de vendas
- Relatórios de produtos
- Performance de entregadores
- Exportação de dados

COMPONENTES:
- FinancialSummary
- SalesCharts
- ProductReports
- DeliveryReports
- DataExporter
```

#### 16. **Estoque** (Fase Final)
```
URL: /dashboard/estoque
FUNÇÃO: Controle de inventário
DESCRIÇÃO: Gestão de ingredientes e suprimentos

SEÇÕES:
- Lista de itens de estoque
- Alertas de baixo estoque
- Movimentações de entrada/saída
- Relatórios de consumo
- Configurações de alertas

COMPONENTES:
- InventoryList
- StockAlerts
- StockMovements
- ConsumptionReports
- AlertSettings
```

#### 17. **Conversas WhatsApp**
```
URL: /dashboard/whatsapp
FUNÇÃO: CRM de WhatsApp
DESCRIÇÃO: Central de conversas e automação

SEÇÕES:
- Lista de conversas ativas
- Chat interface
- Templates de mensagens
- Automações configuradas
- Métricas de engajamento

COMPONENTES:
- ConversationsList
- ChatInterface
- MessageTemplates
- AutomationRules
- EngagementMetrics
```

#### 18. **Configurações do Restaurante**
```
URL: /dashboard/configuracoes
FUNÇÃO: Configurações gerais
DESCRIÇÃO: Dados do restaurante, integrações e preferências

SEÇÕES:
- Informações básicas
- Horários de funcionamento
- Área de entrega
- Integrações (WhatsApp, impressora)
- Personalização do site

COMPONENTES:
- RestaurantInfo
- BusinessHours
- DeliveryArea
- IntegrationSettings
- SiteCustomization
```

#### 19. **Gestão de Usuários**
```
URL: /dashboard/usuarios
FUNÇÃO: Controle de acesso
DESCRIÇÃO: Gerenciamento da equipe e permissões

SEÇÕES:
- Lista de usuários
- Formulário de convite
- Configuração de permissões
- Logs de atividade
- Configurações de segurança

COMPONENTES:
- UsersList
- InviteForm
- PermissionsMatrix
- ActivityLogs
- SecuritySettings
```

---

## 📱 DASHBOARD MOBILE - ENTREGADOR

### Domínio: `app.saasjonatas.com/mobile/entregador`

#### 20. **Login Entregador**
```
URL: /mobile/entregador/login
FUNÇÃO: Autenticação específica
DESCRIÇÃO: Login otimizado para mobile com biometria

SEÇÕES:
- Formulário de login
- Opção de biometria
- Recuperação de senha
- Status de conectividade
- Informações de suporte

COMPONENTES:
- MobileLoginForm
- BiometricAuth
- ConnectivityStatus
- SupportContact
```

#### 21. **Dashboard Entregador**
```
URL: /mobile/entregador/dashboard
FUNÇÃO: Central de entregas
DESCRIÇÃO: Lista de entregas e informações do turno

SEÇÕES:
- Header com status e ganhos do dia
- Lista de entregas pendentes
- Botão de status (disponível/ocupado/offline)
- Métricas do dia
- Acesso rápido ao suporte

COMPONENTES:
- DeliveryHeader
- PendingDeliveries
- StatusToggle
- DailyMetrics
- QuickSupport
```

#### 22. **Detalhes da Entrega**
```
URL: /mobile/entregador/entrega/[id]
FUNÇÃO: Informações da entrega específica
DESCRIÇÃO: Todos os dados necessários para a entrega

SEÇÕES:
- Informações do pedido
- Dados do cliente
- Endereço de entrega
- Mapa e navegação
- Ações (aceitar/recusar/concluir)

COMPONENTES:
- OrderInfo
- CustomerInfo
- DeliveryAddress
- NavigationMap
- DeliveryActions
```

#### 23. **Navegação GPS**
```
URL: /mobile/entregador/navegacao/[id]
FUNÇÃO: GPS integrado para entrega
DESCRIÇÃO: Navegação com atualizações em tempo real

SEÇÕES:
- Mapa em tela cheia
- Instruções de navegação
- Informações do destino
- Botões de ação (chegou, problema)
- Chat com restaurante/cliente

COMPONENTES:
- FullScreenMap
- NavigationInstructions
- DestinationInfo
- ActionButtons
- ChatInterface
```

#### 24. **Histórico de Entregas**
```
URL: /mobile/entregador/historico
FUNÇÃO: Registro de entregas realizadas
DESCRIÇÃO: Lista de entregas com filtros e busca

SEÇÕES:
- Filtros por período
- Lista de entregas concluídas
- Detalhes de cada entrega
- Ganhos por entrega
- Avaliações recebidas

COMPONENTES:
- HistoryFilters
- DeliveryHistoryList
- DeliveryDetails
- EarningsInfo
- RatingsReceived
```

#### 25. **Perfil do Entregador**
```
URL: /mobile/entregador/perfil
FUNÇÃO: Dados pessoais e configurações
DESCRIÇÃO: Gerenciamento de informações pessoais

SEÇÕES:
- Foto e dados básicos
- Informações do veículo
- Documentos
- Configurações de notificação
- Suporte e ajuda

COMPONENTES:
- ProfileInfo
- VehicleInfo
- DocumentsUpload
- NotificationSettings
- HelpCenter
```

---

## 📱 DASHBOARD MOBILE - GARÇOM

### Domínio: `app.saasjonatas.com/mobile/garcom`

#### 26. **Login Garçom**
```
URL: /mobile/garcom/login
FUNÇÃO: Autenticação para garçons
DESCRIÇÃO: Login rápido para operação presencial

SEÇÕES:
- Formulário simplificado
- Opção de PIN rápido
- Status do restaurante
- Turno atual
- Acesso de emergência

COMPONENTES:
- QuickLoginForm
- PINAuth
- RestaurantStatus
- ShiftInfo
- EmergencyAccess
```

#### 27. **Dashboard Garçom**
```
URL: /mobile/garcom/dashboard
FUNÇÃO: Central de operações presenciais
DESCRIÇÃO: Gestão de mesas e pedidos presenciais

SEÇÕES:
- Status das mesas
- Pedidos em andamento
- Ações rápidas
- Cardápio resumido
- Comunicação com cozinha

COMPONENTES:
- TableStatus
- ActiveOrders
- QuickActions
- MenuSummary
- KitchenComm
```

#### 28. **Criar Pedido Presencial**
```
URL: /mobile/garcom/pedido/novo
FUNÇÃO: Registro de pedidos no local
DESCRIÇÃO: Interface otimizada para criação rápida

SEÇÕES:
- Seleção de mesa
- Busca rápida de produtos
- Carrinho simplificado
- Observações especiais
- Finalização rápida

COMPONENTES:
- TableSelector
- ProductQuickSearch
- SimpleCart
- SpecialNotes
- QuickCheckout
```

#### 29. **Gestão de Mesas**
```
URL: /mobile/garcom/mesas
FUNÇÃO: Controle de ocupação
DESCRIÇÃO: Status e gerenciamento de mesas

SEÇÕES:
- Layout das mesas
- Status de ocupação
- Pedidos por mesa
- Tempo de ocupação
- Ações (ocupar/liberar)

COMPONENTES:
- TableLayout
- OccupancyStatus
- TableOrders
- OccupancyTimer
- TableActions
```

#### 30. **Comandas e Impressão**
```
URL: /mobile/garcom/comandas
FUNÇÃO: Gestão de comandas
DESCRIÇÃO: Impressão e controle de comandas

SEÇÕES:
- Lista de comandas abertas
- Detalhes da comanda
- Opções de impressão
- Divisão de conta
- Fechamento de mesa

COMPONENTES:
- OpenTabs
- TabDetails
- PrintOptions
- BillSplitting
- TableClosing
```

---

## 🔐 PÁGINAS DE AUTENTICAÇÃO

### Domínio: `app.saasjonatas.com/auth`

#### 31. **Login Principal**
```
URL: /login
FUNÇÃO: Autenticação geral
DESCRIÇÃO: Login para admins e acesso ao dashboard

SEÇÕES:
- Formulário de login
- Opções de recuperação
- Login social (opcional)
- Link para registro
- Informações de suporte

COMPONENTES:
- LoginForm
- ForgotPassword
- SocialAuth
- SignupLink
- SupportInfo
```

#### 32. **Registro de Restaurante**
```
URL: /registro
FUNÇÃO: Cadastro de novos restaurantes
DESCRIÇÃO: Onboarding completo com trial

SEÇÕES:
- Dados do proprietário
- Informações do restaurante
- Escolha de plano
- Termos e condições
- Confirmação de email

COMPONENTES:
- OwnerForm
- RestaurantForm
- PlanSelector
- TermsAcceptance
- EmailConfirmation
```

#### 33. **Recuperação de Senha**
```
URL: /recuperar-senha
FUNÇÃO: Reset de senha
DESCRIÇÃO: Processo de recuperação por email

SEÇÕES:
- Campo de email
- Instruções de recuperação
- Status do envio
- Link para voltar ao login
- Suporte adicional

COMPONENTES:
- EmailForm
- RecoveryInstructions
- SendStatus
- BackToLogin
- AdditionalSupport
```

#### 34. **Definir Nova Senha**
```
URL: /nova-senha
FUNÇÃO: Criação de nova senha
DESCRIÇÃO: Formulário para redefinir senha

SEÇÕES:
- Campo de nova senha
- Confirmação de senha
- Indicador de força
- Regras de senha
- Confirmação de alteração

COMPONENTES:
- PasswordForm
- PasswordStrength
- PasswordRules
- ChangeConfirmation
```

#### 35. **Verificação de Email**
```
URL: /verificar-email
FUNÇÃO: Confirmação de conta
DESCRIÇÃO: Página de verificação pós-registro

SEÇÕES:
- Status da verificação
- Instruções para verificar
- Reenvio de email
- Suporte para problemas
- Próximos passos

COMPONENTES:
- VerificationStatus
- VerificationInstructions
- ResendEmail
- VerificationSupport
- NextSteps
```

---

## 🧩 COMPONENTES GLOBAIS

### Layout e Navegação

#### 36. **Sidebar Administrativa**
```
FUNÇÃO: Navegação principal do dashboard
DESCRIÇÃO: Menu lateral com todas as seções administrativas

ITENS:
- Dashboard principal
- Pedidos
- Cardápio
- Entregadores
- Clientes
- Relatórios
- WhatsApp
- Estoque
- Configurações
- Usuários

COMPONENTES:
- SidebarMenu
- MenuSection
- MenuItem
- UserProfile
- RestaurantSelector
```

#### 37. **Header Administrativo**
```
FUNÇÃO: Cabeçalho do dashboard
DESCRIÇÃO: Informações contextuais e ações globais

ELEMENTOS:
- Logo e nome do restaurante
- Notificações
- Busca global
- Perfil do usuário
- Status online/offline

COMPONENTES:
- AdminHeader
- GlobalNotifications
- GlobalSearch
- UserMenu
- OnlineStatus
```

#### 38. **Bottom Navigation Mobile**
```
FUNÇÃO: Navegação inferior para mobile
DESCRIÇÃO: Acesso rápido às seções principais

ITENS:
- Dashboard
- Entregas (entregador) / Mesas (garçom)
- Histórico
- Perfil
- Suporte

COMPONENTES:
- BottomNav
- NavItem
- BadgeIndicator
```

### Componentes de Interface

#### 39. **Cards de Métricas**
```
FUNÇÃO: Exibição de KPIs
DESCRIÇÃO: Cards responsivos com métricas importantes

TIPOS:
- Vendas do dia/mês
- Número de pedidos
- Entregadores ativos
- Tempo médio de entrega
- Taxa de conversão

COMPONENTES:
- MetricCard
- MetricValue
- MetricTrend
- MetricIcon
```

#### 40. **Tabelas de Dados**
```
FUNÇÃO: Listagem de informações
DESCRIÇÃO: Tabelas responsivas com ações

FUNCIONALIDADES:
- Ordenação
- Filtros
- Busca
- Paginação
- Ações em lote
- Export

COMPONENTES:
- DataTable
- TableHeader
- TableRow
- TableActions
- TablePagination
- TableFilters
```

#### 41. **Formulários Inteligentes**
```
FUNÇÃO: Coleta de dados
DESCRIÇÃO: Formulários com validação e UX otimizada

RECURSOS:
- Validação em tempo real
- Auto-save
- Indicadores de progresso
- Upload de arquivos
- Máscara de campos

COMPONENTES:
- SmartForm
- FormField
- FileUploader
- FormValidation
- ProgressIndicator
```

#### 42. **Modais e Dialogs**
```
FUNÇÃO: Interações contextuais
DESCRIÇÃO: Sobreposições para ações importantes

TIPOS:
- Confirmação de ações
- Detalhes de itens
- Formulários rápidos
- Visualização de imagens
- Alerts importantes

COMPONENTES:
- Modal
- Dialog
- Confirm
- ImageViewer
- AlertDialog
```

#### 43. **Sistema de Notificações**
```
FUNÇÃO: Feedback ao usuário
DESCRIÇÃO: Notificações em tempo real

TIPOS:
- Toast notifications
- Push notifications
- Badges de contagem
- Alertas de sistema
- Status updates

COMPONENTES:
- ToastProvider
- NotificationBadge
- SystemAlert
- StatusIndicator
```

### Componentes Especializados

#### 44. **Mapa Interativo**
```
FUNÇÃO: Geolocalização e rotas
DESCRIÇÃO: Integração com Google Maps

FUNCIONALIDADES:
- Localização de entregadores
- Rotas de entrega
- Área de cobertura
- Marcadores customizados
- Controles de zoom

COMPONENTES:
- InteractiveMap
- MapMarker
- RouteDisplay
- AreaSelector
- MapControls
```

#### 45. **Chat Interface**
```
FUNÇÃO: Comunicação interna
DESCRIÇÃO: Interface de chat para WhatsApp e suporte

RECURSOS:
- Lista de conversas
- Interface de mensagens
- Envio de mídia
- Status de leitura
- Respostas rápidas

COMPONENTES:
- ChatList
- ChatWindow
- MessageBubble
- MediaUploader
- QuickReplies
```

#### 46. **Calendário e Agendamento**
```
FUNÇÃO: Gestão temporal
DESCRIÇÃO: Visualização e controle de horários

USOS:
- Horários de funcionamento
- Agendamento de entregas
- Relatórios por período
- Planejamento de turnos
- Histórico temporal

COMPONENTES:
- Calendar
- TimeSlotPicker
- DateRangePicker
- ScheduleGrid
```

#### 47. **Upload de Imagens**
```
FUNÇÃO: Gestão de mídia
DESCRIÇÃO: Upload otimizado com preview

FUNCIONALIDADES:
- Drag & drop
- Preview instantâneo
- Redimensionamento automático
- Múltiplos formatos
- Progress bar

COMPONENTES:
- ImageUploader
- ImagePreview
- CropTool
- ProgressBar
```

#### 48. **Status Indicators**
```
FUNÇÃO: Estados visuais
DESCRIÇÃO: Indicadores de status em tempo real

TIPOS:
- Status de pedidos
- Status de entregadores
- Conectividade
- Progresso de ações
- Estados de sistema

COMPONENTES:
- StatusBadge
- ProgressBar
- LoadingSpinner
- ConnectivityIcon
```

---

## 🎨 SISTEMA DE DESIGN

### Paleta de Cores
```typescript
const DESIGN_SYSTEM = {
  colors: {
    primary: '#1976d2',      // Azul principal
    secondary: '#dc004e',    // Vermelho secundário
    success: '#2e7d32',      // Verde sucesso
    warning: '#ed6c02',      // Laranja aviso
    error: '#d32f2f',        // Vermelho erro
    background: '#f5f5f5',   // Fundo geral
    surface: '#ffffff',      // Superfícies
    text: {
      primary: '#212121',
      secondary: '#757575'
    }
  },
  
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    sizes: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.75rem',
      h4: '1.5rem',
      h5: '1.25rem',
      h6: '1rem',
      body1: '1rem',
      body2: '0.875rem'
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px'
  }
}
```

### Componentes Base
```typescript
const BASE_COMPONENTS = {
  buttons: {
    primary: 'contained + primary color',
    secondary: 'outlined + primary color',
    text: 'text + primary color',
    danger: 'contained + error color'
  },
  
  cards: {
    elevation: 2,
    borderRadius: '12px',
    padding: '16px'
  },
  
  forms: {
    borderRadius: '8px',
    spacing: '16px',
    validation: 'real-time'
  },
  
  navigation: {
    height: '64px',
    sidebarWidth: '280px',
    bottomNavHeight: '56px'
  }
}
```

---

## 📱 RESPONSIVIDADE

### Breakpoints e Comportamento
```typescript
const RESPONSIVE_BEHAVIOR = {
  desktop: {
    minWidth: '1200px',
    layout: 'sidebar + main content',
    navigation: 'persistent sidebar',
    cards: 'grid layout'
  },
  
  tablet: {
    width: '600px - 1199px',
    layout: 'collapsible sidebar',
    navigation: 'drawer sidebar',
    cards: 'flexible grid'
  },
  
  mobile: {
    maxWidth: '599px',
    layout: 'stack layout',
    navigation: 'bottom navigation',
    cards: 'single column'
  }
}
```

---

## 🎯 INSTRUÇÕES PARA DESENVOLVIMENTO

### Prioridade de Desenvolvimento
```
1. 🔐 Páginas de Autenticação (31-35)
2. 💻 Dashboard Principal + Pedidos (10-11)
3. 🌐 Site Público Core (1-8)
4. 📱 Dashboard Mobile Entregador (20-25)
5. 💻 Gestão Completa Admin (12-19)
6. 📱 Dashboard Mobile Garçom (26-30)
7. 🧩 Componentes Avançados (40-48)
```

### Padrões de Nomenclatura
```typescript
// Arquivos de página
pages/
├── auth/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── ForgotPasswordPage.tsx
├── dashboard/
│   ├── DashboardPage.tsx
│   ├── OrdersPage.tsx
│   └── MenuPage.tsx
└── public/
    ├── HomePage.tsx
    ├── MenuPage.tsx
    └── CheckoutPage.tsx

// Componentes
components/
├── ui/           # Componentes base
├── forms/        # Componentes de formulário
├── layout/       # Componentes de layout
├── charts/       # Gráficos e métricas
└── specialized/  # Componentes específicos
```

### Estrutura de Componente Padrão
```typescript
// Exemplo de estrutura
interface ComponentProps {
  // Props tipadas
}

export function ComponentName({ 
  props 
}: ComponentProps) {
  // Hooks
  // Estados
  // Efeitos
  // Handlers
  
  return (
    <Container>
      {/* JSX */}
    </Container>
  )
}

export default ComponentName
```

---

## 📋 CHECKLIST DE ENTREGA

### Para cada página, entregar:
- [ ] **Layout responsivo** para todos os breakpoints
- [ ] **Estados de carregamento** (loading, error, empty)
- [ ] **Validação de formulários** quando aplicável
- [ ] **Navegação consistente** entre páginas
- [ ] **Acessibilidade** (WCAG 2.1 AA)
- [ ] **Performance otimizada** (lazy loading, code splitting)
- [ ] **Testes unitários** dos componentes
- [ ] **Documentação** dos componentes principais

### Para componentes globais:
- [ ] **Reutilização** em múltiplas páginas
- [ ] **Configurabilidade** via props
- [ ] **Temas** personalizáveis
- [ ] **Estados visuais** (hover, active, disabled)
- [ ] **Animações sutis** para UX
- [ ] **TypeScript** tipagem completa

---

**Data de criação:** 2025-06-04 03:34:18 UTC  
**Responsável:** pereira162  
**Total de Páginas:** 48 páginas + componentes  
**Status:** ✅ PRONTO PARA DESIGN E DESENVOLVIMENTO