'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DatabaseStatus {
  connected: boolean
  tablesCount: number | null
}

export default function Home() {
  const [dbStatus, setDbStatus] = useState<DatabaseStatus>({
    connected: false,
    tablesCount: null
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    checkDatabaseConnection()
  }, [])

  const checkDatabaseConnection = async () => {
    try {
      // Testa a conexão fazendo uma query simples
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
        .maybeSingle()

      // Se não der erro crítico, consideramos conectado
      if (error && !['PGRST116', '42P01'].includes(error.code)) {
        console.error('Database connection error:', error)
        setDbStatus({ connected: false, tablesCount: null })
      } else {
        setDbStatus({
          connected: true,
          tablesCount: error ? 0 : 1 // Se table não existe = 0, senão = 1+
        })
      }
    } catch (error) {
      console.error('Database connection error:', error)
      setDbStatus({ connected: false, tablesCount: null })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SaaS Jonatas Platform
          </h1>
          <p className="text-xl text-gray-600">
            Plataforma desenvolvida com Next.js e Supabase
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Status do Ambiente */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Status do Ambiente</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Supabase Local:</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  dbStatus.connected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {loading ? 'Verificando...' : (dbStatus.connected ? 'Conectado' : 'Desconectado')}
                </span>
              </div>

              {dbStatus.connected && (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tabelas no Banco:</span>
                  <span className="text-gray-600">{dbStatus.tablesCount}</span>
                </div>
              )}

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">URLs de Desenvolvimento:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">API:</span>{' '}
                    <a 
                      href="http://127.0.0.1:54321" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      http://127.0.0.1:54321
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Studio:</span>{' '}
                    <a 
                      href="http://127.0.0.1:54323" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      http://127.0.0.1:54323
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Email (Inbucket):</span>{' '}
                    <a 
                      href="http://127.0.0.1:54324" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      http://127.0.0.1:54324
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recursos Disponíveis */}
          <div className="card">
            <h2 className="text-2xl font-semibold mb-4">Recursos Disponíveis</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Autenticação (Auth)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Base de Dados (PostgreSQL)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Storage de Arquivos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Realtime</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Edge Functions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Email Testing</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <button 
                onClick={checkDatabaseConnection}
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Verificando...' : 'Testar Conexão'}
              </button>
            </div>
          </div>
        </div>

        {/* Scripts de Desenvolvimento */}
        <div className="mt-8 card">
          <h2 className="text-2xl font-semibold mb-4">Scripts de Desenvolvimento</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Supabase:</h3>
              <div className="space-y-1 text-sm font-mono bg-gray-50 p-3 rounded">
                <div>npm run supabase:start</div>
                <div>npm run supabase:stop</div>
                <div>npm run supabase:status</div>
                <div>npm run supabase:studio</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Next.js:</h3>
              <div className="space-y-1 text-sm font-mono bg-gray-50 p-3 rounded">
                <div>npm run dev</div>
                <div>npm run build</div>
                <div>npm run start</div>
                <div>npm run lint</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
