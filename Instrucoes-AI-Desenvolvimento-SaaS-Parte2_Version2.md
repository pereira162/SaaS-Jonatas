# Instruções para AI - Desenvolvimento SaaS Jonatas
## Parte 2: Padrões de Código e Componentes
## Versão 2.0 - Atualizada em 04/06/2025

## 1. Padrões de Código OBRIGATÓRIOS

### 1.1 Nomenclatura e Estrutura
```typescript
// ✅ CORRETO - Componentes
const OrderCard = () => { }              // PascalCase
const DeliveryPersonCard = () => { }     // PascalCase
const WhatsAppIntegration = () => { }    // PascalCase

// ✅ CORRETO - Hooks
const useOrderData = () => { }           // camelCase com "use"
const useDeliveryPersons = () => { }     // camelCase com "use"
const useWhatsAppMessages = () => { }    // camelCase com "use"

// ✅ CORRETO - Constantes
const API_BASE_URL = ""                  // UPPER_SNAKE_CASE
const WHATSAPP_WEBHOOK_SECRET = ""       // UPPER_SNAKE_CASE
const DEFAULT_DELIVERY_RADIUS = 10       // UPPER_SNAKE_CASE

// ✅ CORRETO - Funções e variáveis
const handleOrderSubmit = () => { }      // camelCase
const calculateDeliveryFee = () => { }   // camelCase
const formatCurrency = () => { }         // camelCase

// ✅ CORRETO - Tipos e Interfaces
interface OrderData { }                  // PascalCase
type OrderStatus = ""                    // PascalCase
type DeliveryStatus = ""                 // PascalCase

// ❌ INCORRETO - Evitar
const ordercard = () => { }              // Componente em lowercase
const OrderData = () => { }              // Hook sem "use" prefix
const apiBaseUrl = ""                    // Constante em camelCase
```

### 1.2 Estrutura de Componentes PADRÃO
```typescript
'use client' // Quando necessário

import React, { useState, useEffect, useCallback } from 'react'
import { Box, Card, CardContent, Typography, Button } from '@mui/material'
import { Order, DeliveryPerson } from '@/lib/types'
import { useOrders, useDeliveryPersons } from '@/hooks'
import { formatCurrency, formatDateTime } from '@/lib/utils'

// Props interface sempre tipada
interface OrderCardProps {
  order: Order
  onStatusChange: (orderId: string, status: OrderStatus) => void
  onAssignDelivery?: (orderId: string, deliveryPersonId: string) => void
  className?: string
}

// Componente com documentação JSDoc
/**
 * Componente para exibir informações de um pedido
 * @param order - Dados completos do pedido
 * @param onStatusChange - Callback para mudança de status
 * @param onAssignDelivery - Callback para atribuir entregador
 */
export function OrderCard({ 
  order, 
  onStatusChange, 
  onAssignDelivery,
  className 
}: OrderCardProps) {
  // 1. HOOKS primeiro (ordem específica)
  const { updateOrderStatus, isLoading: orderLoading } = useOrders()
  const { deliveryPersons, isLoading: deliveryLoading } = useDeliveryPersons()
  const [isExpanded, setIsExpanded] = useState(false)

  // 2. EFEITOS
  useEffect(() => {
    // Lógica de efeito com cleanup se necessário
    const interval = setInterval(() => {
      // Auto-refresh do status se necessário
    }, 30000)

    return () => clearInterval(interval)
  }, [order.id])

  // 3. HANDLERS (sempre useCallback para performance)
  const handleStatusChange = useCallback(async (newStatus: OrderStatus) => {
    if (orderLoading) return
    
    try {
      await updateOrderStatus(order.id, newStatus)
      onStatusChange(order.id, newStatus)
    } catch (error) {
      console.error('Error updating order status:', error)
      // TODO: Implementar toast de erro
    }
  }, [order.id, orderLoading, updateOrderStatus, onStatusChange])

  const handleAssignDelivery = useCallback(async (deliveryPersonId: string) => {
    if (!onAssignDelivery) return
    
    try {
      await onAssignDelivery(order.id, deliveryPersonId)
    } catch (error) {
      console.error('Error assigning delivery:', error)
    }
  }, [order.id, onAssignDelivery])

  // 4. RENDERS CONDICIONAIS (early returns)
  if (!order) {
    return null
  }

  // 5. RENDER PRINCIPAL
  return (
    <Card className={className} elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pedido #{order.number}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2" color="textSecondary">
            {formatDateTime(order.created_at)}
          </Typography>
          <Typography variant="h6" color="primary">
            {formatCurrency(order.total)}
          </Typography>
        </Box>

        {/* Resto do componente */}
      </CardContent>
    </Card>
  )
}

// Export default opcional (prefer named exports)
export default OrderCard
```

### 1.3 Gerenciamento de Estado PADRÃO

#### Context API para Estado Global
```typescript
// contexts/restaurant-context.tsx
'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Restaurant, User } from '@/lib/types'
import { supabase } from '@/lib/supabase'

interface RestaurantState {
  restaurant: Restaurant | null
  currentUser: User | null
  loading: boolean
  error: string | null
}

type RestaurantAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RESTAURANT'; payload: Restaurant | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }

const initialState: RestaurantState = {
  restaurant: null,
  currentUser: null,
  loading: true,
  error: null,
}

const RestaurantContext = createContext<{
  state: RestaurantState
  dispatch: React.Dispatch<RestaurantAction>
} | null>(null)

function restaurantReducer(state: RestaurantState, action: RestaurantAction): RestaurantState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_RESTAURANT':
      return { ...state, restaurant: action.payload, loading: false }
    case 'SET_USER':
      return { ...state, currentUser: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(restaurantReducer, initialState)

  useEffect(() => {
    // Initialize restaurant data
    const initializeRestaurant = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('User not authenticated')

        dispatch({ type: 'SET_USER', payload: user })

        const { data: restaurant, error } = await supabase
          .from('restaurants')
          .select('*')
          .eq('owner_id', user.id)
          .single()

        if (error) throw error

        dispatch({ type: 'SET_RESTAURANT', payload: restaurant })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      }
    }

    initializeRestaurant()
  }, [])

  return (
    <RestaurantContext.Provider value={{ state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider')
  }
  return context
}
```

#### React Query para Server State
```typescript
// hooks/use-orders.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Order, CreateOrderData } from '@/lib/types'
import { toast } from 'react-hot-toast'

export function useOrders(restaurantId: string) {
  return useQuery({
    queryKey: ['orders', restaurantId],
    queryFn: async (): Promise<Order[]> => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name, price)
          ),
          customers (name, phone, email),
          delivery_persons (name, phone)
        `)
        .eq('restaurant_id', restaurantId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!restaurantId,
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchInterval: 1000 * 30, // 30 segundos (real-time backup)
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (orderData: CreateOrderData): Promise<Order> => {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order-metrics'] })
      
      toast.success(`Pedido #${data.number} criado com sucesso!`)
    },
    onError: (error) => {
      console.error('Error creating order:', error)
      toast.error('Erro ao criar pedido. Tente novamente.')
    },
  })
}
```

### 1.4 Validação com Zod OBRIGATÓRIA
```typescript
// lib/validations/order.ts
import { z } from 'zod'

export const createOrderSchema = z.object({
  customer_name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  
  customer_phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Telefone inválido')
    .transform(phone => phone.replace(/\D/g, '')), // Remove caracteres não numéricos
  
  customer_email: z.string()
    .email('Email inválido')
    .optional(),
  
  items: z.array(z.object({
    product_id: z.string().uuid('ID do produto inválido'),
    quantity: z.number().min(1, 'Quantidade deve ser maior que 0'),
    price: z.number().positive('Preço deve ser positivo'),
    notes: z.string().max(500, 'Observações muito longas').optional(),
  })).min(1, 'Pedido deve ter pelo menos 1 item'),
  
  delivery_address: z.object({
    street: z.string().min(5, 'Endereço deve ser mais detalhado'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, 'Bairro é obrigatório'),
    city: z.string().min(2, 'Cidade é obrigatória'),
    zipcode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
    reference: z.string().optional(),
  }),
  
  payment_method: z.enum(['cash', 'card', 'pix'], {
    errorMap: () => ({ message: 'Método de pagamento inválido' })
  }),
  
  delivery_fee: z.number().min(0, 'Taxa de entrega não pode ser negativa'),
  
  notes: z.string().max(1000, 'Observações muito longas').optional(),
})

export type CreateOrderData = z.infer<typeof createOrderSchema>

// Uso em formulários
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function CreateOrderForm() {
  const form = useForm<CreateOrderData>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customer_name: '',
      customer_phone: '',
      items: [],
      delivery_address: {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        zipcode: '',
      },
      payment_method: 'cash',
      delivery_fee: 0,
    },
  })

  const onSubmit = async (data: CreateOrderData) => {
    try {
      // Dados já validados pelo Zod
      await createOrder(data)
    } catch (error) {
      console.error('Validation error:', error)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

## 2. Material UI - Configuração e Padrões

### 2.1 Tema Customizado
```typescript
// lib/theme/theme.ts
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    error: {
      main: '#d32f2f',
      light: '#f44336',
      dark: '#c62828',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})
```

### 2.2 ThemeProvider Setup
```typescript
// app/providers.tsx
'use client'

import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { theme } from '@/lib/theme/theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
          return false
        }
        return failureCount < 3
      },
    },
    mutations: {
      retry: 1,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4caf50',
                secondary: '#fff',
              },
            },
          }}
        />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 2.3 Componentes Base Padronizados
```typescript
// components/ui/loading-button.tsx
import { LoadingButton as MuiLoadingButton } from '@mui/lab'
import { LoadingButtonProps } from '@mui/lab/LoadingButton'

interface CustomLoadingButtonProps extends LoadingButtonProps {
  loadingText?: string
}

export function LoadingButton({ 
  loading, 
  loadingText = 'Carregando...', 
  children, 
  ...props 
}: CustomLoadingButtonProps) {
  return (
    <MuiLoadingButton
      loading={loading}
      variant="contained"
      disableElevation
      {...props}
    >
      {loading ? loadingText : children}
    </MuiLoadingButton>
  )
}

// components/ui/data-table.tsx
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

interface DataTableProps extends Omit<DataGridProps, 'rows' | 'columns'> {
  data: any[]
  columns: GridColDef[]
  loading?: boolean
  title?: string
  emptyMessage?: string
}

export function DataTable({ 
  data, 
  columns, 
  loading = false,
  title,
  emptyMessage = 'Nenhum dado encontrado',
  ...props 
}: DataTableProps) {
  return (
    <Box>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        localeText={{
          noRowsLabel: emptyMessage,
          noResultsOverlayLabel: 'Nenhum resultado encontrado.',
          errorOverlayDefaultLabel: 'Ocorreu um erro.',
        }}
        {...props}
      />
    </Box>
  )
}

// components/ui/status-chip.tsx
import { Chip, ChipProps } from '@mui/material'
import { OrderStatus, DeliveryStatus } from '@/lib/types'

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: OrderStatus | DeliveryStatus
  variant?: 'filled' | 'outlined'
}

const statusConfig = {
  // Order statuses
  pending: { color: 'warning', label: 'Pendente' },
  confirmed: { color: 'info', label: 'Confirmado' },
  preparing: { color: 'secondary', label: 'Preparando' },
  ready: { color: 'success', label: 'Pronto' },
  out_for_delivery: { color: 'primary', label: 'Saiu para entrega' },
  delivered: { color: 'success', label: 'Entregue' },
  cancelled: { color: 'error', label: 'Cancelado' },
  
  // Delivery statuses
  available: { color: 'success', label: 'Disponível' },
  busy: { color: 'warning', label: 'Ocupado' },
  offline: { color: 'default', label: 'Offline' },
} as const

export function StatusChip({ status, variant = 'filled', ...props }: StatusChipProps) {
  const config = statusConfig[status] || { color: 'default', label: status }
  
  return (
    <Chip
      label={config.label}
      color={config.color as any}
      variant={variant}
      size="small"
      {...props}
    />
  )
}

// components/ui/currency-display.tsx
import { Typography, TypographyProps } from '@mui/material'

interface CurrencyDisplayProps extends TypographyProps {
  value: number
  currency?: string
  showSymbol?: boolean
}

export function CurrencyDisplay({ 
  value, 
  currency = 'BRL',
  showSymbol = true,
  ...props 
}: CurrencyDisplayProps) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: currency,
    minimumFractionDigits: 2,
  })

  return (
    <Typography {...props}>
      {formatter.format(value)}
    </Typography>
  )
}
```

## 3. Utilitários e Helpers

### 3.1 Formatação e Validação
```typescript
// lib/utils/formatters.ts
export function formatCurrency(value: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}

export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{5})(\d{3})$/)
  
  if (match) {
    return `${match[1]}-${match[2]}`
  }
  
  return cep
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${timestamp}${random}`
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}
```

### 3.2 Validadores
```typescript
// lib/utils/validators.ts
export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')
  
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false
  }
  
  let sum = 0
  let remainder
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i-1, i)) * (11 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false
  
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i-1, i)) * (12 - i)
  }
  
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false
  
  return true
}

export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '')
  
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false
  }
  
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj[i]) * weights1[i]
  }
  
  let remainder = sum % 11
  if (remainder < 2) remainder = 0
  else remainder = 11 - remainder
  
  if (remainder !== parseInt(cnpj[12])) return false
  
  sum = 0
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj[i]) * weights2[i]
  }
  
  remainder = sum % 11
  if (remainder < 2) remainder = 0
  else remainder = 11 - remainder
  
  return remainder === parseInt(cnpj[13])
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.length >= 10 && cleaned.length <= 11
}

export function isValidCEP(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, '')
  return cleaned.length === 8
}
```

### 3.3 Hooks Customizados
```typescript
// hooks/use-debounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// hooks/use-local-storage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

// hooks/use-geolocation.ts
import { useState, useEffect } from 'react'

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocalização não é suportada pelo navegador',
        loading: false,
      }))
      return
    }

    const success = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false,
      })
    }

    const error = (error: GeolocationPositionError) => {
      setState(prev => ({
        ...prev,
        error: error.message,
        loading: false,
      }))
    }

    navigator.geolocation.getCurrentPosition(success, error)
  }, [])

  return state
}
```

---

## 📋 RESUMO PARTE 2

Esta segunda parte estabelece:
✅ **Padrões de código** rigorosos e consistentes
✅ **Estrutura de componentes** padronizada
✅ **Gerenciamento de estado** (Context + React Query)
✅ **Validação Zod** obrigatória
✅ **Material UI** customizado e configurado
✅ **Componentes base** reutilizáveis
✅ **Utilitários** essenciais (formatação, validação)
✅ **Hooks customizados** para funcionalidades comuns

**Próxima parte:** Supabase, integrações, testes e deploy

**Continue sempre seguindo estes padrões estabelecidos!**