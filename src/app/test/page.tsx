'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function TestPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...')
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(() => {
    checkConnection()
    checkAuth()
  }, [])

  const checkConnection = async () => {
    try {
      // Test basic connection by querying the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)

      if (error) {
        setConnectionStatus(`Connection Error: ${error.message}`)
      } else {
        setConnectionStatus('✅ Connected to Supabase Local')
        setProfiles(data || [])
      }
    } catch (err) {
      setConnectionStatus(`Connection Failed: ${err}`)
    }
  }

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const signInAnonymously = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) {
        console.error('Anonymous sign in failed:', error)
      } else {
        setUser(data.user)
        console.log('Anonymous sign in successful:', data.user)
      }
    } catch (err) {
      console.error('Anonymous sign in error:', err)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out failed:', error)
      } else {
        setUser(null)
        console.log('Sign out successful')
      }
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  const createTestProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: crypto.randomUUID(),
            email: `test${Date.now()}@example.com`,
            full_name: `Test User ${Date.now()}`,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (error) {
        console.error('Create profile failed:', error)
      } else {
        console.log('Profile created:', data)
        checkConnection() // Refresh the profiles list
      }
    } catch (err) {
      console.error('Create profile error:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            SaaS-Jonatas Development Test
          </h1>

          {/* Connection Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Supabase Connection Status
            </h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="font-mono text-sm">{connectionStatus}</p>
              <div className="mt-2 text-xs text-gray-600">
                <p>API URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
                <p>Environment: Local Development</p>
              </div>
            </div>
          </div>

          {/* Authentication Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Authentication Status
            </h2>
            <div className="bg-gray-100 rounded-lg p-4">
              {user ? (
                <div>
                  <p className="text-green-600 font-semibold">✅ User Authenticated</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>ID: {user.id}</p>
                    <p>Email: {user.email || 'Anonymous'}</p>
                    <p>Created: {new Date(user.created_at).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={signOut}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-yellow-600 font-semibold">⚠️ No User Authenticated</p>
                  <button
                    onClick={signInAnonymously}
                    className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In Anonymously
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Database Test */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Database Test (Profiles Table)
            </h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  Profiles in database: {profiles.length}
                </p>
                <button
                  onClick={createTestProfile}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Create Test Profile
                </button>
              </div>
              
              {profiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Profiles:</h3>
                  <div className="space-y-2">
                    {profiles.slice(0, 5).map((profile) => (
                      <div key={profile.id} className="bg-white rounded p-3 text-xs">
                        <p><strong>ID:</strong> {profile.id}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Name:</strong> {profile.full_name}</p>
                        <p><strong>Created:</strong> {new Date(profile.created_at).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Environment Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Environment Information
            </h2>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
                  <p><strong>Next.js Version:</strong> 14.2.29</p>
                  <p><strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
                </div>
                <div>
                  <p><strong>Database URL:</strong> postgresql://postgres:postgres@127.0.0.1:54322/postgres</p>
                  <p><strong>Studio URL:</strong> http://127.0.0.1:54323</p>
                  <p><strong>API URL:</strong> http://127.0.0.1:54321</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
