'use client'
import { useEffect, useState } from 'react'

interface CardNode {
  emoji: string
  label: string
  sub: string
  border: string
  badge?: { text: string; color: string }
  tooltip: string
  animDelay?: string
}

function Card({ node, delay = 0 }: { node: CardNode; delay?: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        border: `1.5px solid ${node.border}`,
        borderRadius: 14,
        padding: '10px 8px 8px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        cursor: 'default',
        position: 'relative',
        transition: 'transform .2s, box-shadow .2s',
        transform: hovered ? 'translateY(-4px) scale(1.04)' : 'none',
        boxShadow: hovered ? '0 10px 28px rgba(0,0,0,.1)' : 'none',
        flex: 1, minWidth: 0,
      }}
    >
      {node.badge && (
        <div style={{
          position: 'absolute', top: -8, right: -8,
          background: node.badge.color, color: 'white',
          fontSize: 8, fontWeight: 700, borderRadius: 20, padding: '2px 6px',
        }}>{node.badge.text}</div>
      )}
      <div style={{ fontSize: 22, lineHeight: 1 }}>{node.emoji}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#0F172A', textAlign: 'center', lineHeight: 1.3 }}>{node.label}</div>
      <div style={{ fontSize: 9, color: '#64748B', textAlign: 'center', lineHeight: 1.3 }}>{node.sub}</div>
      {hovered && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)',
          background: 'white', border: '1.5px solid #E2E8F0',
          borderRadius: 10, padding: '6px 10px',
          fontSize: 10, color: '#0F172A',
          whiteSpace: 'nowrap', zIndex: 50,
          boxShadow: '0 4px 16px rgba(0,0,0,.09)',
          pointerEvents: 'none',
        }}>{node.tooltip}</div>
      )}
    </div>
  )
}

function Arrow({ color, reverse = false }: { color: string; reverse?: boolean }) {
  return (
    <div style={{
      flexShrink: 0, width: 28, height: 2, margin: '0 2px', marginBottom: 18,
      background: `repeating-linear-gradient(90deg,${color} 0,${color} 5px,transparent 5px,transparent 9px)`,
      position: 'relative',
      animationName: 'tmArrow', animationDuration: '1.1s',
      animationTimingFunction: 'linear', animationIterationCount: 'infinite',
    }}>
      <div style={{
        position: 'absolute',
        [reverse ? 'left' : 'right']: -4, top: -3,
        width: 0, height: 0,
        borderLeft: reverse ? undefined : `6px solid ${color}`,
        borderRight: reverse ? `6px solid ${color}` : undefined,
        borderTop: '4px solid transparent',
        borderBottom: '4px solid transparent',
      }}/>
    </div>
  )
}

function DownArrow({ color }: { color: string }) {
  return (
    <div style={{ width: 2, height: 24, margin: '0 auto', position: 'relative',
      background: `repeating-linear-gradient(180deg,${color} 0,${color} 5px,transparent 5px,transparent 9px)`,
      animationName: 'tmArrowV', animationDuration: '1.1s',
      animationTimingFunction: 'linear', animationIterationCount: 'infinite',
    }}>
      <div style={{ position: 'absolute', bottom: -4, left: -3, width: 0, height: 0,
        borderTop: `6px solid ${color}`,
        borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
      }}/>
    </div>
  )
}

export default function TaskManagerDiagram() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <style>{`
        @keyframes tmArrow { from{background-position:0 0} to{background-position:28px 0} }
        @keyframes tmArrowV { from{background-position:0 0} to{background-position:0 28px} }
        @keyframes tmBlink { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes tmPulse { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
      `}</style>

      {/* HEADER */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:'#0F172A' }}>Architecture – Task Manager</div>
          <div style={{ fontSize:11, color:'#64748B' }}>Flask · Docker · GitHub Actions · Render · Prometheus · Grafana</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7, background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:20, padding:'5px 12px' }}>
          <div style={{ position:'relative', width:10, height:10, flexShrink:0 }}>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#10B981', animation:'tmBlink 1.2s ease-in-out infinite' }}/>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid #10B981', animation:'tmPulse 1.6s ease-out infinite' }}/>
          </div>
          <span style={{ fontSize:11, fontWeight:700, color:'#10B981' }}>Live sur Render</span>
        </div>
      </div>

      {/* ── CI/CD ── */}
      <div style={{ background:'#F8FAFC', borderRadius:16, padding:'14px 14px 18px', marginBottom:12 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:14 }}>
          🚀 Pipeline CI/CD — GitHub Actions — chaque push sur main
        </div>

        {/* ROW 1 */}
        <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:6 }}>
          <Card delay={0} node={{ emoji:'🐙', label:'GitHub', sub:'git push main', border:'#CBD5E1', badge:{ text:'AUTO', color:'#185FA5' }, tooltip:'Déclenche le pipeline automatiquement' }}/>
          <Arrow color="#185FA5"/>
          <Card delay={100} node={{ emoji:'📦', label:'Install deps', sub:'pip install', border:'#BFDBFE', tooltip:'Installation des dépendances Python' }}/>
          <Arrow color="#F59E0B"/>
          <Card delay={200} node={{ emoji:'🧪', label:'Tests pytest', sub:'Tests unitaires', border:'#FDE68A', tooltip:'Validation automatique du code' }}/>
          <Arrow color="#EF4444"/>
          <Card delay={300} node={{ emoji:'🔒', label:'pip-audit', sub:'Scan sécurité', border:'#FECACA', tooltip:'Détection de vulnérabilités dans les dépendances' }}/>
          <Arrow color="#0EA5E9"/>
          <Card delay={400} node={{ emoji:'🐳', label:'Docker build', sub:'Build image', border:'#BAE6FD', tooltip:'Construction de l\'image Docker' }}/>
        </div>

        {/* Flèche bas alignée sur Docker build (dernier) */}
        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <div style={{ width:'calc(20%)', display:'flex', justifyContent:'center', marginBottom:6 }}>
            <DownArrow color="#0EA5E9"/>
          </div>
        </div>

        {/* ROW 2 inversé */}
        <div style={{ display:'flex', alignItems:'center', gap:0, flexDirection:'row-reverse' }}>
          <Card delay={500} node={{ emoji:'🐋', label:'Docker Hub', sub:'izh0407/devops-app', border:'#BAE6FD', tooltip:'Image publiée publiquement sur Docker Hub' }}/>
          <Arrow color="#0EA5E9" reverse/>
          <Card delay={600} node={{ emoji:'✅', label:'Test API', sub:'/, /health, /tasks', border:'#BBF7D0', tooltip:'Validation des endpoints après démarrage du conteneur' }}/>
          <Arrow color="#0F6E56" reverse/>
          <Card delay={700} node={{ emoji:'▶️', label:'Run container', sub:'docker run :5000', border:'#9FE1CB', tooltip:'Démarrage du conteneur pour les tests de validation' }}/>
          {/* Spacers */}
          <div style={{ flex:'0 0 28px', height:2, marginBottom:18 }}/>
          <div style={{ flex:1 }}/>
          <div style={{ flex:'0 0 28px', height:2, marginBottom:18 }}/>
          <div style={{ flex:1 }}/>
          <div style={{ flex:'0 0 28px', height:2, marginBottom:18 }}/>
          <div style={{ flex:1 }}/>
        </div>
      </div>

      {/* ── APPLICATION ── */}
      <div style={{ background:'#F8FAFC', borderRadius:16, padding:'14px 14px 18px', marginBottom:12 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:14 }}>
          🏗️ Application — Stack technique
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:0 }}>
          <Card delay={800} node={{ emoji:'🐍', label:'Flask', sub:'API REST Python', border:'#DDD6FE', tooltip:'GET /tasks · POST /tasks · DELETE /tasks/:id · GET /health' }}/>
          <Arrow color="#6D28D9"/>
          <Card delay={900} node={{ emoji:'⚙️', label:'Gunicorn', sub:'Serveur WSGI', border:'#E9D5FF', tooltip:'Serveur web production pour Flask' }}/>
          <Arrow color="#0EA5E9"/>
          <Card delay={1000} node={{ emoji:'🐳', label:'Docker', sub:'Conteneurisation', border:'#BAE6FD', tooltip:'Image Docker publiée sur Docker Hub' }}/>
          <Arrow color="#0F6E56"/>
          <Card delay={1100} node={{ emoji:'☁️', label:'Render', sub:'Déploiement cloud', border:'#9FE1CB', tooltip:'Déploiement automatique depuis GitHub' }}/>
          <Arrow color="#10B981"/>
          <Card delay={1200} node={{ emoji:'👤', label:'Utilisateur', sub:'devops-app-7704.onrender.com', border:'#BBF7D0', badge:{ text:'LIVE', color:'#10B981' }, tooltip:'Interface web + API accessible publiquement' }}/>
        </div>
      </div>

      {/* ── OBSERVABILITÉ ── */}
      <div style={{ background:'#F8FAFC', borderRadius:16, padding:'14px 14px 18px', marginBottom:12 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:14 }}>
          📊 Observabilité
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:0 }}>
          <Card delay={1300} node={{ emoji:'💚', label:'Healthcheck', sub:'/health endpoint', border:'#9FE1CB', tooltip:'Vérifie que l\'app est opérationnelle' }}/>
          <Arrow color="#10B981"/>
          <Card delay={1400} node={{ emoji:'📝', label:'Logging', sub:'Application logs', border:'#FDE68A', tooltip:'Logs applicatifs pour le débogage et l\'observabilité' }}/>
          <Arrow color="#F59E0B"/>
          <Card delay={1500} node={{ emoji:'🔥', label:'Prometheus', sub:'Métriques', border:'#FED7AA', tooltip:'Collecte des métriques applicatives en temps réel' }}/>
          <Arrow color="#F97316"/>
          <Card delay={1600} node={{ emoji:'📊', label:'Grafana', sub:'Dashboards', border:'#FED7AA', tooltip:'Visualisation des métriques Prometheus' }}/>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
        {[
          { icon:'🐍', label:'Language', val:'Python' },
          { icon:'🐳', label:'Runtime', val:'Docker' },
          { icon:'⚡', label:'CI/CD', val:'GitHub Actions' },
          { icon:'☁️', label:'Cloud', val:'Render' },
        ].map((s,i) => (
          <div key={i} style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
            <div style={{ fontSize:10, color:'#64748B', marginBottom:3 }}>{s.label}</div>
            <div style={{ fontSize:13, fontWeight:700, color:'#0F172A' }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
