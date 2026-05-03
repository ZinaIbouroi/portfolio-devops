'use client'
import { useEffect, useState } from 'react'

const API_URL = 'COLLE_TON_URL_ICI'

interface Metric {
  value: number
  timestamp: string | null
}

interface Metrics {
  requests: Metric
  errors5xx: Metric
  errors4xx: Metric
  cacheHitRate: Metric
  bytes: Metric
}

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  const fetchMetrics = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setMetrics(data)
      setLastUpdate(new Date().toLocaleTimeString('fr-FR'))
      setError(null)
    } catch (err) {
      setError('Impossible de récupérer les métriques')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>📊</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#475569' }}>Chargement des métriques...</div>
      </div>
    </div>
  )

  if (error) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>❌</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#EF4444' }}>{error}</div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '80vh', background: '#F8FAFC' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#0F172A 0%,#1e3a5f 55%,#1d4ed8 100%)', padding: '48px 0 40px' }}>
        <div className="container">
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#93C5FD', marginBottom: 8 }}>
            Infrastructure
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: 'white', marginBottom: 8 }}>
            Monitoring
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14 }}>
            Métriques en temps réel · Dernière mise à jour : {lastUpdate}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} className="pulse-dot" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#10B981' }}>Site en ligne</span>
          </div>
        </div>
      </div>

      {/* Métriques */}
      <div className="container" style={{ padding: '28px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }} className="metrics-grid">

          {/* Requêtes */}
          <div style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginBottom: 8 }}>Requêtes (1h)</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#0F172A' }}>
              {metrics?.requests.value.toFixed(0) || '0'}
            </div>
            <div style={{ fontSize: 12, color: '#10B981', marginTop: 4 }}>👥 Visiteurs</div>
          </div>

          {/* Erreurs 5xx */}
          <div style={{ background: 'white', border: `1.5px solid ${(metrics?.errors5xx.value || 0) > 5 ? '#FCA5A5' : '#E2E8F0'}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginBottom: 8 }}>Erreurs 5xx</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: (metrics?.errors5xx.value || 0) > 5 ? '#EF4444' : '#0F172A' }}>
              {metrics?.errors5xx.value.toFixed(2) || '0'}%
            </div>
            <div style={{ fontSize: 12, color: (metrics?.errors5xx.value || 0) > 5 ? '#EF4444' : '#10B981', marginTop: 4 }}>
              {(metrics?.errors5xx.value || 0) > 5 ? '🔴 Critique' : '✅ Normal'}
            </div>
          </div>

          {/* Erreurs 4xx */}
          <div style={{ background: 'white', border: `1.5px solid ${(metrics?.errors4xx.value || 0) > 10 ? '#FCA5A5' : '#E2E8F0'}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginBottom: 8 }}>Erreurs 4xx</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: (metrics?.errors4xx.value || 0) > 10 ? '#EF4444' : '#0F172A' }}>
              {metrics?.errors4xx.value.toFixed(2) || '0'}%
            </div>
            <div style={{ fontSize: 12, color: (metrics?.errors4xx.value || 0) > 10 ? '#EF4444' : '#10B981', marginTop: 4 }}>
              {(metrics?.errors4xx.value || 0) > 10 ? '🔴 Élevé' : '✅ Normal'}
            </div>
          </div>

          {/* Cache Hit Rate */}
          <div style={{ background: 'white', border: `1.5px solid ${(metrics?.cacheHitRate.value || 0) < 80 ? '#FDE68A' : '#E2E8F0'}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginBottom: 8 }}>Cache Hit Rate</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: (metrics?.cacheHitRate.value || 0) < 80 ? '#F59E0B' : '#0F172A' }}>
              {metrics?.cacheHitRate.value.toFixed(1) || '0'}%
            </div>
            <div style={{ fontSize: 12, color: (metrics?.cacheHitRate.value || 0) < 80 ? '#F59E0B' : '#10B981', marginTop: 4 }}>
              {(metrics?.cacheHitRate.value || 0) < 80 ? '⚠️ Faible' : '✅ Optimal'}
            </div>
          </div>

          {/* Bande passante */}
          <div style={{ background: 'white', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginBottom: 8 }}>Bande passante (1h)</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#0F172A' }}>
              {((metrics?.bytes.value || 0) / 1024 / 1024).toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>📦 MB téléchargés</div>
          </div>

          {/* Bouton refresh */}
          <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ fontSize: 32 }}>🔄</div>
            <button
              onClick={fetchMetrics}
              style={{ background: '#2563EB', color: 'white', border: 'none', borderRadius: 9, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              Actualiser
            </button>
            <div style={{ fontSize: 11, color: '#64748B', textAlign: 'center' }}>
              Auto-refresh toutes les 60s
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .metrics-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 768px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}