# Product Requirements Document (PRD) - SaaS Jonatas
## Versão 2.0 - Atualizada em 2025-06-04 03:30:31 UTC
## Desenvolvido por: pereira162

---

## 1. VISÃO GERAL DO PRODUTO

### 1.1 Visão do Produto
Tornar-se a **plataforma SaaS líder no Brasil** para gestão completa de restaurantes com delivery próprio, oferecendo uma solução integrada que substitui múltiplas ferramentas por uma única plataforma escalável, segura e intuitiva.

### 1.2 Declaração do Problema
Restaurantes brasileiros que fazem delivery próprio enfrentam dificuldades para:
- Gerenciar pedidos, cardápio e clientes em sistemas separados
- Controlar e otimizar equipe de entregadores
- Manter comunicação eficiente com clientes via WhatsApp
- Ter presença digital profissional sem dependência de marketplaces
- Acessar relatórios financeiros e operacionais em tempo real
- Integrar impressão térmica com o sistema de gestão

### 1.3 Proposta de Valor
**"Uma plataforma completa que transforma a gestão do seu restaurante"**

#### Diferenciais Únicos:
- **Sites Multi-tenant Personalizados:** Cada restaurante tem seu próprio site otimizado
- **Gestão Completa de Entregadores:** Dashboard mobile, rotas GPS, rastreamento real-time
- **WhatsApp CRM Integrado:** Automação completa de comunicação com clientes
- **Dashboards Específicos por Usuário:** Admin, garçom e entregador com interfaces otimizadas
- **Impressão Térmica Nativa:** Integração direta com impressoras ESC/POS
- **Relatórios Financeiros Avançados:** Analytics em tempo real para tomada de decisão

### 1.4 Objetivos de Negócio
#### Curto Prazo (6 meses):
- ✅ Lançar MVP com funcionalidades core
- ✅ Adquirir 100 restaurantes ativos
- ✅ Atingir MRR de R$ 15.000
- ✅ Estabelecer base sólida de usuários beta

#### Médio Prazo (12 meses):
- ✅ Expandir para 500 restaurantes
- ✅ Atingir MRR de R$ 50.000
- ✅ Implementar todas as integrações planejadas
- ✅ Consolidar presença no mercado brasileiro

#### Longo Prazo (24 meses):
- ✅ Tornar-se referência em SaaS para restaurantes
- ✅ Expandir para 2.000+ restaurantes
- ✅ Desenvolver marketplace de integrações
- ✅ Considerar expansão para outros países da América Latina

---

## 2. ANÁLISE DE MERCADO E PERSONAS

### 2.1 Mercado Alvo
- **TAM (Total Addressable Market):** 1.2 milhão de restaurantes no Brasil
- **SAM (Serviceable Addressable Market):** 300 mil restaurantes com delivery
- **SOM (Serviceable Obtainable Market):** 30 mil restaurantes (delivery próprio)

### 2.2 Segmentação de Clientes
#### Primário (70% do foco):
- **Restaurantes Pequenos/Médios:** 1-3 unidades, 20-200 pedidos/dia
- **Faturamento:** R$ 10K - R$ 100K/mês
- **Localização:** Grandes centros urbanos brasileiros
- **Necessidade:** Sistema completo e acessível

#### Secundário (30% do foco):
- **Redes Pequenas:** 4-10 unidades, necessidade de gestão centralizada
- **Dark Kitchens:** Foco exclusivo em delivery
- **Restaurantes Premium:** Precisam de personalização avançada

### 2.3 Personas Detalhadas

#### Persona 1: João - Proprietário de Pizzaria (Usuário Principal)
```
Demografia:
- Idade: 35-50 anos
- Localização: São Paulo, Rio, Belo Horizonte
- Negócio: Pizzaria com 50-80 pedidos/dia
- Faturamento: R$ 30K/mês

Dores:
- Controla pedidos no WhatsApp e caderno
- Não tem controle financeiro adequado
- Entregadores próprios sem gestão
- Site inexistente ou desatualizado
- Impressão manual de pedidos

Objetivos:
- Profissionalizar a operação
- Aumentar vendas
- Reduzir custos operacionais
- Ter controle financeiro
- Melhorar experiência do cliente

Comportamento:
- Usa WhatsApp Business
- Ativo no Instagram
- Busca soluções simples
- Valoriza suporte em português
- Sensível a preço vs. valor
```

#### Persona 2: Maria - Gerente de Rede (Usuário Avançado)
```
Demografia:
- Idade: 28-40 anos
- Posição: Gerente operacional
- Negócio: Rede de hamburguerias (5 unidades)
- Faturamento: R$ 150K/mês

Dores:
- Dificuldade para acompanhar múltiplas unidades
- Relatórios manuais e desatualizados
- Gestão de equipe descentralizada
- Falta de padronização entre unidades

Objetivos:
- Centralizar operações
- Ter visibilidade de todas as unidades
- Padronizar processos
- Otimizar resultados
- Escalar eficientemente

Comportamento:
- Usa planilhas avançadas
- Familiarizada com SaaS
- Foca em métricas e KPIs
- Valoriza integrações
- Disposta a pagar por qualidade
```

#### Persona 3: Carlos - Entregador (Usuário Mobile)
```
Demografia:
- Idade: 20-35 anos
- Ocupação: Entregador (próprio ou terceirizado)
- Localização: Centros urbanos
- Experiência: Trabalhou com iFood/Uber

Dores:
- Apps ruins ou inexistentes
- Falta de organização de entregas
- Não tem GPS integrado
- Comunicação ruim com restaurante
- Controle manual de ganhos

Objetivos:
- Fazer mais entregas
- Rotas otimizadas
- Comunicação eficiente
- Acompanhar ganhos
- Interface simples

Comportamento:
- Mobile-first
- Usa WhatsApp constantemente
- Valoriza praticidade
- Precisa de informações claras
- Quer feedback rápido
```

---

## 3. FUNCIONALIDADES DETALHADAS

### 3.1 Sistema de Autenticação e Usuários

#### 3.1.1 Tipos de Usuários
```typescript
interface UserTypes {
  admin: {
    access: 'full_dashboard'
    devices: ['desktop', 'tablet', 'mobile']
    permissions: ['manage_menu', 'view_reports', 'manage_users', 'manage_orders', 'manage_delivery']
  }
  
  waiter: {
    access: 'limited_mobile_dashboard'
    devices: ['mobile', 'tablet']
    permissions: ['create_orders', 'view_tables', 'print_tickets']
  }
  
  delivery: {
    access: 'delivery_mobile_only'
    devices: ['mobile']
    permissions: ['view_assigned_orders', 'update_delivery_status', 'gps_navigation']
  }
}
```

#### 3.1.2 Autenticação
- **Método Principal:** Email + senha com Supabase Auth
- **2FA:** SMS ou app authenticator (opcional)
- **Login Social:** Google, Facebook (opcional)
- **Recuperação:** Email com token seguro
- **Sessões:** JWT tokens com refresh automático

### 3.2 Dashboard Administrativo (Desktop/Tablet)

#### 3.2.1 Visão Geral
```typescript
interface AdminDashboard {
  metricsCards: {
    todayOrders: number
    todayRevenue: number
    activeDeliveries: number
    averageOrderValue: number
  }
  
  realtimeCharts: {
    ordersPerHour: ChartData
    revenuePerDay: ChartData
    deliveryPerformance: ChartData
  }
  
  quickActions: {
    newOrder: () => void
    printReports: () => void
    manageMenu: () => void
    viewDeliveries: () => void
  }
  
  recentActivity: {
    newOrders: Order[]
    completedDeliveries: Delivery[]
    lowStock: InventoryItem[]
  }
}
```

#### 3.2.2 Gestão de Cardápio
```typescript
interface MenuManagement {
  categories: {
    crud: CategoryCRUD
    sortable: boolean
    imageSupport: boolean
    activeToggle: boolean
  }
  
  products: {
    crud: ProductCRUD
    imageOptimization: boolean
    variations: ProductVariation[]
    ingredients: Ingredient[]
    nutritionalInfo: NutritionalData
    prepTime: number
    availability: AvailabilitySchedule
  }
  
  pricing: {
    bulkUpdate: boolean
    promotionalPricing: boolean
    timeBasedPricing: boolean
    customerGroupPricing: boolean
  }
}
```

#### 3.2.3 Gestão de Pedidos
```typescript
interface OrderManagement {
  orderList: {
    realTimeUpdates: boolean
    statusFilters: OrderStatus[]
    searchAndSort: boolean
    bulkActions: boolean
  }
  
  orderDetails: {
    customerInfo: CustomerData
    itemsWithNotes: OrderItem[]
    paymentInfo: PaymentData
    deliveryTracking: DeliveryTracking
    timeline: OrderTimeline
  }
  
  statusManagement: {
    workflow: ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered']
    automatedTransitions: boolean
    notificationTriggers: boolean
    estimatedTimes: boolean
  }
}
```

#### 3.2.4 Gestão de Entregadores (NOVA FUNCIONALIDADE CRÍTICA)
```typescript
interface DeliveryManagement {
  deliveryPersons: {
    crud: DeliveryPersonCRUD
    documents: DocumentManagement
    vehicleInfo: VehicleData
    performanceMetrics: DeliveryMetrics
    commissionSettings: CommissionConfig
  }
  
  routeOptimization: {
    googleMapsIntegration: boolean
    multipleDeliveries: boolean
    realTimeTraffic: boolean
    automaticAssignment: boolean
  }
  
  realTimeTracking: {
    liveLocation: GeolocationData
    deliveryStatus: DeliveryStatus
    estimatedArrival: TimeEstimate
    customerNotifications: boolean
  }
  
  analytics: {
    deliveryTimes: AnalyticsData
    customerRatings: RatingData
    routeEfficiency: EfficiencyMetrics
    earnings: EarningsReport
  }
}
```

### 3.3 Dashboard Mobile - Entregador (NOVA FUNCIONALIDADE)

#### 3.3.1 Interface Principal
```typescript
interface DeliveryDashboard {
  header: {
    restaurantLogo: string
    deliveryPersonName: string
    currentStatus: DeliveryStatus
    todayEarnings: number
  }
  
  pendingDeliveries: {
    ordersList: PendingOrder[]
    quickAccept: boolean
    orderDetails: OrderDetails
    customerContact: ContactMethods
  }
  
  navigationTools: {
    googleMapsIntegration: boolean
    gpsNavigation: boolean
    alternativeRoutes: boolean
    trafficUpdates: boolean
  }
  
  communication: {
    chatWithRestaurant: WhatsAppIntegration
    customerMessages: MessageHistory
    emergencyContact: ContactInfo
  }
}
```

#### 3.3.2 Fluxo de Entrega
```typescript
interface DeliveryFlow {
  orderAcceptance: {
    viewOrderDetails: () => OrderDetails
    estimateTime: () => TimeEstimate
    acceptOrder: () => Promise<boolean>
    declineReason: string[]
  }
  
  pickup: {
    navigateToRestaurant: () => void
    confirmPickup: () => void
    reportIssues: (issue: string) => void
  }
  
  delivery: {
    navigateToCustomer: () => void
    contactCustomer: () => void
    confirmDelivery: () => void
    captureProof: () => PhotoCapture
    collectPayment: () => PaymentConfirmation
  }
  
  completion: {
    customerRating: () => RatingSubmission
    earningsUpdate: () => EarningsData
    nextDelivery: () => NextOrderSuggestion
  }
}
```

### 3.4 Dashboard Mobile - Garçom

#### 3.4.1 Interface Otimizada
```typescript
interface WaiterDashboard {
  quickOrder: {
    customerSearch: CustomerLookup
    menuBrowser: MobileMenuBrowser
    orderBuilder: MobileOrderBuilder
    paymentSelection: PaymentMethods
  }
  
  tableManagement: {
    tableStatus: TableStatusGrid
    orderTracking: TableOrders
    billSplitting: BillSplitOptions
    tableTransfer: OrderTransfer
  }
  
  kitchenCommunication: {
    orderNotes: SpecialInstructions
    urgentOrders: PriorityFlags
    modificationRequests: OrderChanges
  }
}
```

### 3.5 Sites Multi-tenant (FUNCIONALIDADE CORE)

#### 3.5.1 Arquitetura Multi-tenant
```typescript
interface MultiTenantArchitecture {
  subdomainRouting: {
    pattern: 'restaurante.saasjonatas.com'
    customDomains: 'www.restaurante.com.br'
    sslCertificates: boolean
    cdnIntegration: boolean
  }
  
  dataIsolation: {
    databaseLevel: 'RLS_policies'
    storageLevel: 'bucket_isolation'
    cacheLevel: 'tenant_specific'
  }
  
  customization: {
    branding: RestaurantBranding
    themes: CustomThemes
    layout: LayoutOptions
    seoSettings: SEOConfiguration
  }
}
```

#### 3.5.2 Site Público do Restaurante
```typescript
interface PublicSite {
  homepage: {
    hero: BrandedHeroSection
    menu: MenuHighlights
    about: RestaurantInfo
    contact: ContactMethods
    hours: BusinessHours
  }
  
  menuCatalog: {
    categories: CategoryNavigation
    products: ProductGrid
    search: MenuSearch
    filters: CategoryFilters
    productDetails: ProductModal
  }
  
  orderingSystem: {
    cart: ShoppingCart
    checkout: CheckoutFlow
    customerInfo: CustomerForm
    paymentMethods: PaymentOptions
    orderConfirmation: ConfirmationPage
  }
  
  customerArea: {
    orderHistory: OrderHistory
    favoriteItems: FavoriteProducts
    addressBook: SavedAddresses
    loyaltyProgram: LoyaltyPoints
  }
}
```

### 3.6 Sistema de Relatórios Financeiros

#### 3.6.1 Dashboard Financeiro
```typescript
interface FinancialDashboard {
  salesOverview: {
    dailySales: SalesData
    weeklySales: SalesData
    monthlySales: SalesData
    yearlyComparison: ComparisonData
  }
  
  productAnalytics: {
    bestSellers: ProductRanking
    worstPerformers: ProductRanking
    profitMargins: ProfitabilityData
    inventoryTurnover: TurnoverMetrics
  }
  
  deliveryAnalytics: {
    deliveryPersonPerformance: DeliveryMetrics
    averageDeliveryTime: TimeMetrics
    deliveryFeeRevenue: RevenueData
    routeEfficiency: EfficiencyData
  }
  
  operationalCosts: {
    ingredientCosts: CostBreakdown
    laborCosts: LaborData
    deliveryCosts: DeliveryCostData
    overheadCosts: OverheadData
  }
}
```

#### 3.6.2 Relatórios Avançados
```typescript
interface AdvancedReports {
  profitLoss: {
    revenue: RevenueData
    costs: CostData
    netProfit: ProfitData
    margins: MarginAnalysis
  }
  
  cashFlow: {
    dailyCashFlow: CashFlowData
    projections: CashFlowProjections
    receivables: ReceivablesData
    payables: PayablesData
  }
  
  customerAnalytics: {
    acquisitionCost: CAC
    lifetimeValue: LTV
    churnRate: ChurnAnalysis
    segmentation: CustomerSegments
  }
  
  forecastReports: {
    salesForecast: ForecastData
    demandPlanning: DemandData
    seasonalTrends: TrendAnalysis
    growthProjections: GrowthData
  }
}
```

### 3.7 Integrações Externas

#### 3.7.1 WhatsApp CRM
```typescript
interface WhatsAppIntegration {
  automation: {
    orderConfirmation: AutoMessage
    statusUpdates: StatusMessages
    deliveryNotifications: DeliveryMessages
    satisfactionSurvey: SurveyMessages
    promotionalCampaigns: MarketingMessages
  }
  
  conversationManagement: {
    chatHistory: ConversationHistory
    quickReplies: QuickReplyTemplates
    autoResponses: AutoResponseRules
    escalationRules: EscalationConfig
  }
  
  analytics: {
    messageDeliveryRates: DeliveryMetrics
    responseRates: ResponseAnalytics
    customerEngagement: EngagementMetrics
    conversionTracking: ConversionData
  }
}
```

#### 3.7.2 Impressão Térmica
```typescript
interface ThermalPrinting {
  printerSupport: {
    escPosCompatible: boolean
    networkPrinters: boolean
    usbPrinters: boolean
    bluetoothPrinters: boolean
  }
  
  printLayouts: {
    kitchenOrders: KitchenTicket
    customerReceipts: CustomerReceipt
    deliverySlips: DeliverySlip
    dailyReports: ReportFormat
  }
  
  automation: {
    autoPrintOrders: boolean
    conditionalPrinting: PrintConditions
    printScheduling: ScheduleConfig
    errorHandling: ErrorRecovery
  }
}
```

#### 3.7.3 Pagamentos com Stripe
```typescript
interface StripeIntegration {
  paymentMethods: {
    creditCards: CardPayments
    debitCards: DebitPayments
    pix: PixPayments
    bankTransfer: BankTransferPayments
  }
  
  subscriptionManagement: {
    planUpgrades: PlanUpgradeFlow
    billingCycles: BillingManagement
    invoiceGeneration: InvoiceSystem
    paymentRetries: RetryLogic
  }
  
  security: {
    pciCompliance: boolean
    tokenization: boolean
    fraudDetection: boolean
    secureCheckout: boolean
  }
}
```

### 3.8 Gestão de Estoque (Fase Final)

#### 3.8.1 Controle de Inventário
```typescript
interface InventoryManagement {
  items: {
    ingredients: IngredientInventory
    supplies: SupplyInventory
    packaging: PackagingInventory
  }
  
  tracking: {
    realTimeUpdates: boolean
    lowStockAlerts: AlertSystem
    expirationTracking: ExpirationAlerts
    costTracking: CostManagement
  }
  
  automation: {
    autoDeduction: boolean
    reorderPoints: ReorderSystem
    supplierIntegration: SupplierAPI
    wasteTracking: WasteManagement
  }
}
```

---

## 4. ESPECIFICAÇÕES TÉCNICAS

### 4.1 Arquitetura do Sistema

#### 4.1.1 Stack Tecnológica
```typescript
const TECH_STACK = {
  frontend: {
    framework: 'Next.js 14+',
    ui: 'Material UI v5+',
    stateManagement: 'React Context + React Query v5',
    styling: 'MUI System + CSS-in-JS',
    forms: 'React Hook Form + Zod',
    pwa: 'Service Workers + Workbox'
  },
  
  backend: {
    database: 'Supabase PostgreSQL',
    auth: 'Supabase Auth',
    storage: 'Supabase Storage',
    realtime: 'Supabase Realtime',
    api: 'Next.js API Routes + Node.js'
  },
  
  integrations: {
    payments: 'Stripe',
    whatsapp: 'WPPConnect',
    maps: 'Google Maps API',
    printing: 'Escpos.js + Node.js',
    email: 'Resend',
    monitoring: 'Sentry + Vercel Analytics'
  }
}
```

#### 4.1.2 Database Schema
```sql
-- Principais entidades
restaurants (id, name, slug, settings, plan_id, owner_id)
user_profiles (id, restaurant_id, role, name, permissions)
categories (id, restaurant_id, name, sort_order)
products (id, restaurant_id, category_id, name, price, variations)
customers (id, restaurant_id, name, phone, addresses)
delivery_persons (id, restaurant_id, name, status, location)
orders (id, restaurant_id, customer_id, delivery_person_id, status, total)
order_items (id, order_id, product_id, quantity, price)
deliveries (id, order_id, delivery_person_id, route, status)
whatsapp_conversations (id, restaurant_id, phone_number)
whatsapp_messages (id, conversation_id, content, direction)
transactions (id, restaurant_id, order_id, amount, type)
```

### 4.2 Performance e Escalabilidade

#### 4.2.1 Métricas de Performance
```typescript
const PERFORMANCE_TARGETS = {
  frontend: {
    firstContentfulPaint: '<1.5s',
    largestContentfulPaint: '<2.5s',
    cumulativeLayoutShift: '<0.1',
    firstInputDelay: '<100ms'
  },
  
  backend: {
    apiResponseTime: '<200ms (95th percentile)',
    databaseQueryTime: '<50ms (average)',
    uptime: '>99.5%',
    errorRate: '<0.1%'
  },
  
  scalability: {
    concurrentUsers: '10,000+',
    ordersPerSecond: '100+',
    restaurantSupport: '10,000+',
    storageCapacity: 'unlimited'
  }
}
```

#### 4.2.2 Estratégias de Otimização
- **Frontend:** Code splitting, lazy loading, image optimization, CDN
- **Backend:** Connection pooling, query optimization, caching, horizontal scaling
- **Database:** Proper indexing, RLS optimization, read replicas
- **Real-time:** WebSocket optimization, selective subscriptions

### 4.3 Segurança e Compliance

#### 4.3.1 Medidas de Segurança
```typescript
const SECURITY_MEASURES = {
  authentication: {
    method: 'JWT tokens (Supabase Auth)',
    passwordPolicy: 'Strong passwords required',
    twoFactor: 'SMS/App authenticator (optional)',
    sessionManagement: 'Secure session handling'
  },
  
  authorization: {
    rbac: 'Role-based access control',
    rls: 'Row Level Security (PostgreSQL)',
    apiSecurity: 'Rate limiting + validation',
    dataIsolation: 'Multi-tenant isolation'
  },
  
  dataProtection: {
    encryption: 'Data encrypted at rest and in transit',
    backups: 'Automated encrypted backups',
    audit: 'Comprehensive audit logs',
    privacy: 'LGPD compliance'
  }
}
```

#### 4.3.2 Compliance LGPD
- **Transparência:** Política de privacidade clara
- **Consentimento:** Opt-in para coleta de dados
- **Portabilidade:** Exportação de dados do usuário
- **Exclusão:** Direito ao esquecimento
- **Minimização:** Coleta apenas de dados necessários

---

## 5. MODELO DE DADOS DETALHADO

### 5.1 Entidades Principais

#### 5.1.1 Restaurantes
```typescript
interface Restaurant {
  id: string
  name: string
  slug: string // para subdomain
  email: string
  phone: string
  address: Address
  location: GeoLocation // PostGIS
  logo_url?: string
  banner_url?: string
  settings: RestaurantSettings
  theme_settings: ThemeSettings
  business_hours: BusinessHours
  delivery_settings: DeliverySettings
  is_active: boolean
  plan_id: string
  owner_id: string
  created_at: Date
  updated_at: Date
}

interface RestaurantSettings {
  currency: 'BRL'
  timezone: 'America/Sao_Paulo'
  language: 'pt-BR'
  order_auto_accept: boolean
  delivery_auto_assign: boolean
  print_auto_kitchen: boolean
  whatsapp_notifications: boolean
}
```

#### 5.1.2 Usuários e Permissões
```typescript
interface UserProfile {
  id: string // refs auth.users
  restaurant_id: string
  role: 'admin' | 'waiter' | 'delivery'
  name: string
  phone?: string
  avatar_url?: string
  permissions: UserPermissions
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface UserPermissions {
  orders: {
    view: boolean
    create: boolean
    update: boolean
    delete: boolean
  }
  menu: {
    view: boolean
    manage: boolean
  }
  reports: {
    view: boolean
    export: boolean
  }
  delivery: {
    view: boolean
    manage: boolean
    track: boolean
  }
}
```

#### 5.1.3 Gestão de Entregadores
```typescript
interface DeliveryPerson {
  id: string
  restaurant_id: string
  user_id?: string // refs auth.users
  name: string
  phone: string
  email?: string
  vehicle_type: 'motorcycle' | 'bicycle' | 'car' | 'walking'
  vehicle_plate?: string
  documents: Documents
  status: 'available' | 'busy' | 'offline'
  current_location?: GeoLocation
  max_deliveries_per_day: number
  commission_rate: number // percentage
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface Documents {
  cpf?: string
  cnh?: string
  vehicle_documents?: string
  profile_photo?: string
}

interface Delivery {
  id: string
  order_id: string
  delivery_person_id: string
  pickup_location: GeoLocation
  delivery_location: GeoLocation
  route?: GoogleMapsRoute
  distance_km?: number
  estimated_duration_minutes?: number
  assigned_at: Date
  picked_up_at?: Date
  delivered_at?: Date
  current_location?: GeoLocation
  tracking_updates: TrackingUpdate[]
  delivery_photo_url?: string
  customer_signature?: string
  delivery_notes?: string
  created_at: Date
  updated_at: Date
}
```

#### 5.1.4 Pedidos Completos
```typescript
interface Order {
  id: string
  restaurant_id: string
  customer_id?: string
  delivery_person_id?: string
  number: string // auto-generated sequence
  status: OrderStatus
  
  // Customer data (snapshot for history)
  customer_name: string
  customer_phone: string
  customer_email?: string
  
  // Delivery info
  delivery_address: Address
  delivery_fee: number
  
  // Financial
  subtotal: number
  total: number
  
  // Payment
  payment_method: 'cash' | 'card' | 'pix'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  stripe_payment_intent_id?: string
  
  // Timing
  estimated_prep_time?: number
  estimated_delivery_time?: number
  confirmed_at?: Date
  ready_at?: Date
  out_for_delivery_at?: Date
  delivered_at?: Date
  
  notes?: string
  cancellation_reason?: string
  
  created_at: Date
  updated_at: Date
  
  // Relations
  order_items: OrderItem[]
  customer?: Customer
  delivery_person?: DeliveryPerson
  delivery?: Delivery
}

type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled'

interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  
  // Product snapshot
  product_name: string
  product_price: number
  
  quantity: number
  unit_price: number
  total_price: number
  variations?: ProductVariations
  notes?: string
  
  created_at: Date
}
```

### 5.2 Integrações e Comunicação

#### 5.2.1 WhatsApp CRM
```typescript
interface WhatsAppConversation {
  id: string
  restaurant_id: string
  customer_id?: string
  phone_number: string
  last_message_at: Date
  is_active: boolean
  created_at: Date
}

interface WhatsAppMessage {
  id: string
  conversation_id: string
  message_id?: string // WhatsApp message ID
  direction: 'inbound' | 'outbound'
  content: string
  message_type: 'text' | 'image' | 'audio' | 'document'
  status: 'sent' | 'delivered' | 'read' | 'failed'
  created_at: Date
}
```

#### 5.2.2 Transações Financeiras
```typescript
interface Transaction {
  id: string
  restaurant_id: string
  order_id?: string
  type: TransactionType
  amount: number
  description?: string
  stripe_transaction_id?: string
  metadata?: Record<string, any>
  created_at: Date
}

type TransactionType = 
  | 'order_payment'
  | 'subscription_payment'
  | 'refund'
  | 'delivery_commission'
  | 'platform_fee'
  | 'adjustment'
```

---

## 6. JORNADAS DO USUÁRIO

### 6.1 Jornada do Proprietário (Admin)

#### 6.1.1 Onboarding Inicial
```
1. Cadastro e Verificação
   ├── Registro com email/senha
   ├── Verificação de email
   ├── Configuração inicial do restaurante
   └── Upload de logo/banner

2. Setup do Cardápio
   ├── Criação de categorias
   ├── Adição de produtos
   ├── Upload de fotos
   └── Definição de preços

3. Configuração de Delivery
   ├── Definição de área de entrega
   ├── Configuração de taxas
   ├── Cadastro de entregadores
   └── Teste de impressão

4. Integração WhatsApp
   ├── Conexão da conta
   ├── Configuração de mensagens automáticas
   └── Teste de envio

5. Personalização do Site
   ├── Escolha do tema
   ├── Configuração de cores/logo
   ├── Definição de horários
   └── Publicação do site
```

#### 6.1.2 Operação Diária
```
1. Início do Dia
   ├── Check-in no dashboard
   ├── Verificação de entregadores disponíveis
   ├── Revisão do cardápio/disponibilidade
   └── Confirmação de configurações

2. Gestão de Pedidos
   ├── Monitoramento de novos pedidos
   ├── Confirmação e tempo estimado
   ├── Atribuição de entregadores
   └── Acompanhamento de entregas

3. Relatórios e Análises
   ├── Vendas do dia
   ├── Performance de entregadores
   ├── Produtos mais vendidos
   └── Feedback de clientes

4. Fechamento do Dia
   ├── Relatório financeiro
   ├── Fechamento de caixa
   ├── Backup de dados
   └── Planejamento do próximo dia
```

### 6.2 Jornada do Entregador (Mobile)

#### 6.2.1 Início de Turno
```
1. Login no App
   ├── Autenticação biométrica/PIN
   ├── Verificação de localização
   ├── Status para "disponível"
   └── Recebimento de briefing do dia

2. Primeira Entrega
   ├── Notificação de novo pedido
   ├── Visualização de detalhes
   ├── Aceitação da entrega
   └── Navegação para o restaurante

3. Coleta no Restaurante
   ├── Chegada e check-in
   ├── Confirmação dos itens
   ├── Foto do pedido (opcional)
   └── Início da rota para cliente
```

#### 6.2.2 Processo de Entrega
```
1. Navegação
   ├── GPS com rota otimizada
   ├── Atualizações de trânsito
   ├── Comunicação com cliente (se necessário)
   └── Localização em tempo real

2. Entrega
   ├── Chegada no endereço
   ├── Contato com cliente
   ├── Entrega do pedido
   ├── Confirmação e foto
   └── Coleta de pagamento (se dinheiro)

3. Finalização
   ├── Atualização de status
   ├── Avaliação do cliente (opcional)
   ├── Cálculo de comissão
   └── Próxima entrega ou fim do turno
```

### 6.3 Jornada do Cliente (Site Público)

#### 6.3.1 Descoberta e Pedido
```
1. Chegada ao Site
   ├── Acesso via link/busca
   ├── Visualização do cardápio
   ├── Navegação por categorias
   └── Busca de produtos

2. Seleção de Produtos
   ├── Visualização de detalhes
   ├── Escolha de variações
   ├── Adição ao carrinho
   └── Continuação da compra

3. Checkout
   ├── Revisão do carrinho
   ├── Preenchimento de dados
   ├── Escolha de endereço
   ├── Seleção de pagamento
   └── Finalização do pedido

4. Acompanhamento
   ├── Confirmação por WhatsApp
   ├── Atualizações de status
   ├── Rastreamento da entrega
   └── Recebimento do pedido
```

---

## 7. CRITÉRIOS DE ACEITAÇÃO

### 7.1 Funcionalidades Core (MVP)

#### 7.1.1 Sistema de Autenticação
```
✅ DADO que sou um usuário não cadastrado
QUANDO acesso a tela de registro
ENTÃO posso criar uma conta com email/senha
E recebo email de verificação
E após verificar posso fazer login

✅ DADO que sou um usuário cadastrado
QUANDO faço login
ENTÃO acesso o dashboard apropriado ao meu tipo de usuário
E minha sessão permanece ativa por 7 dias
E posso fazer logout a qualquer momento
```

#### 7.1.2 Gestão de Cardápio
```
✅ DADO que sou um admin
QUANDO acesso a gestão de cardápio
ENTÃO posso criar/editar/excluir categorias
E posso criar/editar/excluir produtos
E posso fazer upload de imagens
E posso definir preços e variações
E posso ativar/desativar itens

✅ DADO que um produto está inativo
QUANDO um cliente acessa o site
ENTÃO o produto não aparece no cardápio público
E não pode ser adicionado ao carrinho
```

#### 7.1.3 Sistema de Pedidos
```
✅ DADO que sou um cliente
QUANDO finalizo um pedido no site
ENTÃO o pedido aparece no dashboard do admin
E recebo confirmação por WhatsApp
E o restaurante recebe notificação sonora
E o pedido é impresso automaticamente (se configurado)

✅ DADO que sou um admin
QUANDO recebo um novo pedido
ENTÃO posso ver todos os detalhes
E posso confirmar ou cancelar
E posso estimar tempo de preparo
E posso atribuir um entregador
```

#### 7.1.4 Gestão de Entregadores
```
✅ DADO que sou um admin
QUANDO cadastro um entregador
ENTÃO ele recebe acesso ao app mobile
E pode receber notificações de entregas
E posso acompanhar sua localização
E posso ver métricas de performance

✅ DADO que sou um entregador
QUANDO recebo uma notificação de entrega
ENTÃO vejo detalhes do pedido e endereço
E posso aceitar ou recusar
E recebo navegação GPS
E posso atualizar status da entrega
```

### 7.2 Sites Multi-tenant

#### 7.2.1 Isolamento de Dados
```
✅ DADO que existem múltiplos restaurantes
QUANDO um admin faz login
ENTÃO vê apenas dados do seu restaurante
E não consegue acessar dados de outros
E o subdomínio redireciona para o site correto

✅ DADO que um cliente acessa restaurante1.saasjonatas.com
QUANDO navega pelo site
ENTÃO vê apenas o cardápio do Restaurante 1
E a identidade visual é personalizada
E pode fazer pedidos apenas deste restaurante
```

#### 7.2.2 Personalização
```
✅ DADO que sou um admin
QUANDO acesso configurações do site
ENTÃO posso personalizar cores, logo e banner
E posso definir horários de funcionamento
E posso configurar área de entrega
E as mudanças refletem imediatamente no site público
```

### 7.3 Integrações

#### 7.3.1 WhatsApp
```
✅ DADO que o WhatsApp está conectado
QUANDO um pedido é confirmado
ENTÃO o cliente recebe mensagem automática
E quando o status muda, recebe atualizações
E quando sai para entrega, recebe notificação
E quando é entregue, recebe confirmação

✅ DADO que um cliente responde uma mensagem
QUANDO o admin acessa o CRM
ENTÃO vê o histórico completo da conversa
E pode responder manualmente
E pode configurar respostas automáticas
```

#### 7.3.2 Stripe
```
✅ DADO que um cliente escolhe pagar online
QUANDO finaliza o pedido
ENTÃO é redirecionado para checkout Stripe
E após pagamento volta ao site com confirmação
E o admin vê o status "pago" no pedido
E a transação é registrada no sistema

✅ DADO que sou um restaurante
QUANDO minha assinatura vence
ENTÃO recebo notificações antecipadas
E o sistema continua funcionando por 7 dias
E após isso, sou redirecionado para renovação
```

#### 7.3.3 Impressão Térmica
```
✅ DADO que uma impressora está configurada
QUANDO um pedido é confirmado
ENTÃO imprime automaticamente na cozinha
E contém todos os detalhes e observações
E usa o layout configurado pelo restaurante
E em caso de erro, tenta reconectar automaticamente
```

### 7.4 Performance

#### 7.4.1 Frontend
```
✅ DADO que acesso qualquer página
QUANDO a página carrega
ENTÃO o First Contentful Paint é < 1.5s
E o Largest Contentful Paint é < 2.5s
E o Cumulative Layout Shift é < 0.1
E o First Input Delay é < 100ms
```

#### 7.4.2 Backend
```
✅ DADO que faço uma requisição à API
QUANDO a requisição é processada
ENTÃO 95% das respostas são < 200ms
E queries de banco são < 50ms em média
E o uptime é > 99.5%
E a taxa de erro é < 0.1%
```

### 7.5 Segurança

#### 7.5.1 Autenticação e Autorização
```
✅ DADO que sou um usuário
QUANDO acesso dados sensíveis
ENTÃO minha identidade é verificada
E tenho acesso apenas ao permitido
E todas as ações são logadas
E sessões expiram automaticamente

✅ DADO que sou um entregador
QUANDO acesso o app
ENTÃO vejo apenas minhas entregas
E não consigo acessar dados administrativos
E não vejo informações de outros entregadores
```

#### 7.5.2 Proteção de Dados
```
✅ DADO que dados são armazenados
QUANDO são transmitidos ou salvos
ENTÃO são criptografados
E backups são automáticos e seguros
E logs de auditoria são mantidos
E conformidade LGPD é garantida
```

---

## 8. ROADMAP DE DESENVOLVIMENTO

### 8.1 Fase 1: MVP Core (8 semanas)

#### Semanas 1-2: Fundação
```
Sprint 1.1 (Semana 1):
✅ Setup do projeto (Next.js + Supabase + MUI)
✅ Configuração de CI/CD
✅ Autenticação básica
✅ Database schema inicial
✅ Deploy GitHub Pages

Sprint 1.2 (Semana 2):
✅ Sistema de usuários com roles
✅ Dashboard admin básico
✅ Layout responsivo
✅ Navegação principal
✅ Testes unitários iniciais
```

#### Semanas 3-4: Core Features
```
Sprint 2.1 (Semana 3):
✅ CRUD de categorias
✅ CRUD de produtos
✅ Upload de imagens
✅ Gestão de cardápio completa

Sprint 2.2 (Semana 4):
✅ Sistema de pedidos básico
✅ CRUD de clientes
✅ Status de pedidos
✅ Notificações em tempo real
```

#### Semanas 5-6: Multi-tenant
```
Sprint 3.1 (Semana 5):
✅ Middleware para roteamento
✅ RLS policies
✅ Sites públicos por restaurante
✅ Personalização básica

Sprint 3.2 (Semana 6):
✅ Carrinho de compras
✅ Checkout básico
✅ Finalização de pedidos
✅ Confirmação automática
```

#### Semanas 7-8: Entregadores
```
Sprint 4.1 (Semana 7):
✅ CRUD de entregadores
✅ Dashboard mobile básico
✅ PWA setup
✅ Notificações push

Sprint 4.2 (Semana 8):
✅ Sistema de entregas
✅ Google Maps integração
✅ Rastreamento básico
✅ Testes E2E completos
```

### 8.2 Fase 2: Integrações (6 semanas)

#### Semanas 9-10: Comunicação
```
Sprint 5.1 (Semana 9):
✅ WhatsApp integration (WPPConnect)
✅ Mensagens automáticas
✅ CRM básico
✅ Templates de mensagens

Sprint 5.2 (Semana 10):
✅ Impressão térmica (Escpos.js)
✅ API Node.js para impressão
✅ Layouts configuráveis
✅ Fallback strategies
```

#### Semanas 11-12: Pagamentos e Dashboards
```
Sprint 6.1 (Semana 11):
✅ Stripe integration completa
✅ Checkout online
✅ Webhooks
✅ Gestão de assinaturas

Sprint 6.2 (Semana 12):
✅ Dashboard entregador completo
✅ Dashboard garçom
✅ Permissões granulares
✅ Interface mobile otimizada
```

#### Semanas 13-14: MCP e Otimizações
```
Sprint 7.1 (Semana 13):
✅ MCP servers implementação
✅ Automação avançada
✅ Performance optimization
✅ Caching strategies

Sprint 7.2 (Semana 14):
✅ Migração para Vercel
✅ Monitoramento completo
✅ Testes de carga
✅ Security audit
```

### 8.3 Fase 3: Advanced Features (4 semanas)

#### Semanas 15-16: Analytics e Estoque
```
Sprint 8.1 (Semana 15):
✅ Relatórios financeiros avançados
✅ Dashboard analytics
✅ Métricas de performance
✅ Exportação de dados

Sprint 8.2 (Semana 16):
✅ Sistema de estoque básico
✅ Alertas de baixo estoque
✅ Integração com cardápio
✅ Relatórios de consumo
```

#### Semanas 17-18: Production Ready
```
Sprint 9.1 (Semana 17):
✅ Documentação completa
✅ Onboarding automatizado
✅ Centro de ajuda
✅ Suporte ao cliente

Sprint 9.2 (Semana 18):
✅ Testes finais completos
✅ Performance tuning
✅ Security hardening
✅ Launch preparation
```

---

## 9. MÉTRICAS E KPIs

### 9.1 Métricas de Produto

#### 9.1.1 Adoção e Engagement
```typescript
interface ProductMetrics {
  userAdoption: {
    signupRate: number // novos registros/mês
    activationRate: number // usuários que completam onboarding
    timeToValue: number // tempo até primeiro pedido
    featureAdoption: Record<string, number> // uso por funcionalidade
  }
  
  engagement: {
    dailyActiveUsers: number
    weeklyActiveUsers: number
    monthlyActiveUsers: number
    sessionDuration: number
    pageViews: number
    retention: {
      day1: number
      day7: number
      day30: number
    }
  }
}
```

#### 9.1.2 Business Metrics
```typescript
interface BusinessMetrics {
  revenue: {
    mrr: number // Monthly Recurring Revenue
    arr: number // Annual Recurring Revenue
    arpu: number // Average Revenue Per User
    ltv: number // Lifetime Value
  }
  
  growth: {
    customerAcquisitionCost: number
    churnRate: number
    growthRate: number
    expansionRevenue: number
  }
  
  operational: {
    supportTickets: number
    resolutionTime: number
    customerSatisfaction: number
    nps: number // Net Promoter Score
  }
}
```

### 9.2 Métricas Técnicas

#### 9.2.1 Performance
```typescript
interface TechnicalMetrics {
  performance: {
    coreWebVitals: {
      lcp: number // Largest Contentful Paint
      fid: number // First Input Delay
      cls: number // Cumulative Layout Shift
    }
    apiMetrics: {
      responseTime: number
      throughput: number
      errorRate: number
      uptime: number
    }
  }
  
  quality: {
    testCoverage: number
    bugReports: number
    securityVulnerabilities: number
    codeQuality: number
  }
}
```

### 9.3 Metas por Fase

#### 9.3.1 MVP (Primeiros 6 meses)
```
🎯 Usuários:
- 100 restaurantes cadastrados
- 70% taxa de ativação
- 5,000 pedidos processados

🎯 Financeiro:
- MRR: R$ 15,000
- CAC: < R$ 300
- Churn: < 10%

🎯 Técnico:
- Uptime: > 99%
- Test coverage: > 80%
- Core Web Vitals: todos verdes
```

#### 9.3.2 Scale (6-12 meses)
```
🎯 Usuários:
- 500 restaurantes ativos
- 80% taxa de ativação
- 50,000 pedidos/mês

🎯 Financeiro:
- MRR: R$ 50,000
- CAC payback: < 6 meses
- NPS: > 50

🎯 Técnico:
- Uptime: > 99.5%
- API response: < 200ms
- Zero security incidents
```

#### 9.3.3 Growth (12+ meses)
```
🎯 Usuários:
- 2,000 restaurantes ativos
- Market share: 5% do TAM
- 200,000 pedidos/mês

🎯 Financeiro:
- ARR: R$ 2,000,000
- Profitable unit economics
- International expansion ready

🎯 Técnico:
- Auto-scaling infrastructure
- AI-powered features
- API marketplace
```

---

## 10. RISCOS E MITIGAÇÕES

### 10.1 Riscos Técnicos

#### 10.1.1 Escalabilidade
```
RISCO: Sistema não suporta crescimento de usuários
PROBABILIDADE: Média
IMPACTO: Alto

MITIGAÇÃO:
✅ Arquitetura cloud-native desde o início
✅ Load testing desde MVP
✅ Monitoramento proativo
✅ Estratégia de scaling horizontal
✅ CDN para assets estáticos
```

#### 10.1.2 Integrações Externas
```
RISCO: Falha nas integrações críticas (WhatsApp, Stripe)
PROBABILIDADE: Média
IMPACTO: Alto

MITIGAÇÃO:
✅ Fallback para múltiplas APIs WhatsApp
✅ Circuit breakers para APIs externas
✅ Retry logic com backoff
✅ Monitoramento de health das integrações
✅ Notificações proativas de falhas
```

### 10.2 Riscos de Negócio

#### 10.2.1 Competição
```
RISCO: Entrada de grandes players no mercado
PROBABILIDADE: Alta
IMPACTO: Alto

MITIGAÇÃO:
✅ Foco em nicho específico (delivery próprio)
✅ Diferenciação por funcionalidades únicas
✅ Network effects (entregadores + restaurantes)
✅ Switching costs (dados históricos)
✅ Execução rápida e iteração constante
```

#### 10.2.2 Regulamentação
```
RISCO: Mudanças em regulamentações (LGPD, delivery)
PROBABILIDADE: Média
IMPACTO: Médio

MITIGAÇÃO:
✅ Compliance by design
✅ Monitoramento de mudanças regulatórias
✅ Flexibilidade arquitetural
✅ Legal counsel especializado
✅ Comunidade de restaurantes para advocacy
```

### 10.3 Riscos Operacionais

#### 10.3.1 Suporte ao Cliente
```
RISCO: Volume de suporte maior que capacidade
PROBABILIDADE: Alta
IMPACTO: Médio

MITIGAÇÃO:
✅ Documentação self-service abrangente
✅ Onboarding automatizado
✅ Chatbot para questões comuns
✅ Escalabilidade do time de suporte
✅ Métricas proativas de satisfação
```

---

## 11. CONCLUSÃO

### 11.1 Resumo Executivo

O **SaaS Jonatas** representa uma oportunidade única no mercado brasileiro de gestão para restaurantes, focando especificamente no segmento de delivery próprio. Com uma arquitetura moderna, funcionalidades diferenciadas e estratégia de go-to-market bem definida, o produto está posicionado para capturar uma fatia significativa de um mercado em crescimento.

### 11.2 Próximos Passos

#### Imediatos (Próximas 2 semanas):
1. ✅ **Validação técnica:** Proof of concept das integrações críticas
2. ✅ **Setup do projeto:** Configuração completa do ambiente de desenvolvimento
3. ✅ **Team assembly:** Definição da equipe de desenvolvimento
4. ✅ **Roadmap detalhado:** Planning das próximas 18 semanas

#### Curto prazo (2-8 semanas):
1. ✅ **Desenvolvimento MVP:** Funcionalidades core operacionais
2. ✅ **Beta testing:** 10-20 restaurantes parceiros
3. ✅ **Refinamento:** Baseado no feedback dos beta users
4. ✅ **Preparação launch:** Marketing e sales materials

#### Médio prazo (2-6 meses):
1. ✅ **Launch público:** Abertura para o mercado brasileiro
2. ✅ **Growth hacking:** Estratégias de aquisição e retenção
3. ✅ **Feature expansion:** Funcionalidades avançadas
4. ✅ **Market consolidation:** Estabelecimento da base de usuários

### 11.3 Fatores Críticos de Sucesso

1. **✅ Execução técnica excelente:** Performance, confiabilidade e UX superiores
2. **✅ Product-market fit:** Solução que realmente resolve as dores do mercado
3. **✅ Go-to-market eficiente:** Estratégia de aquisição e retenção eficaz
4. **✅ Suporte ao cliente:** Experience excepcional desde o onboarding
5. **✅ Iteração rápida:** Capacidade de evoluir baseado no feedback do mercado

---

**Data de criação:** 2025-06-04 03:30:31 UTC  
**Responsável:** pereira162  
**Versão:** 2.0 (PRD Completo Atualizado)  
**Status:** ✅ APROVADO PARA DESENVOLVIMENTO