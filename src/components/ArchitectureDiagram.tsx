'use client'
import { useEffect, useState } from 'react'

/* ── Types ── */
interface Node {
  emoji: string
  label: string
  sub: string
  border: string
  badge?: { text: string; color: string }
  tooltip: string
  anim?: string
}

/* ── Composant carte ── */
function Card({ node, delay = 0 }: { node: Node; delay?: number }) {
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
        animationDelay: `${delay}ms`,
        flex: 1,
        minWidth: 0,
      }}
    >
      {node.badge && (
        <div style={{
          position: 'absolute', top: -8, right: -8,
          background: node.badge.color, color: 'white',
          fontSize: 8, fontWeight: 700, borderRadius: 20, padding: '2px 6px',
        }}>{node.badge.text}</div>
      )}
      <div style={{ fontSize: 22, lineHeight: 1, animation: node.anim }}>{node.emoji}</div>
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

/* ── Flèche animée ── */
function Arrow({ color, delay = 0, vertical = false }: { color: string; delay?: number; vertical?: boolean }) {
  return (
    <div style={{
      flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: vertical ? 2 : 28,
      height: vertical ? 28 : 2,
      position: 'relative',
      margin: vertical ? '0 auto' : '0 2px',
      marginBottom: vertical ? 0 : 18,
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: `repeating-linear-gradient(${vertical ? '180deg' : '90deg'}, ${color} 0px, ${color} 5px, transparent 5px, transparent 9px)`,
        animationName: 'arrowFlow',
        animationDuration: '1.2s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationDelay: `${delay}ms`,
      }}/>
      {/* Tête de flèche */}
      <div style={{
        position: 'absolute',
        [vertical ? 'bottom' : 'right']: -4,
        width: 0, height: 0,
        borderLeft: vertical ? '4px solid transparent' : undefined,
        borderRight: vertical ? '4px solid transparent' : `6px solid ${color}`,
        borderTop: vertical ? `6px solid ${color}` : '4px solid transparent',
        borderBottom: vertical ? undefined : '4px solid transparent',
      }}/>
    </div>
  )
}

/* ── Ligne Terraform pointillée ── */
function TfLine({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '3px 0',
    }}>
      <div style={{
        flex: 1, height: 1,
        background: 'repeating-linear-gradient(90deg, #6D28D9 0px, #6D28D9 4px, transparent 4px, transparent 8px)',
      }}/>
      <div style={{ fontSize: 9, color: '#6D28D9', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</div>
    </div>
  )
}

export default function ArchitectureDiagram() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <style>{`
        @keyframes arrowFlow { from { background-position: 0 0; } to { background-position: 28px 0; } }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
        @keyframes spinSlow { to{transform:rotate(360deg)} }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, flexWrap:'wrap', gap:10 }}>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:'#0F172A' }}>Architecture DevOps</div>
          <div style={{ fontSize:11, color:'#64748B' }}>Portfolio Zina Ibouroi · Infrastructure complète AWS</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7, background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:20, padding:'5px 12px' }}>
          <div style={{ position:'relative', width:10, height:10, flexShrink:0 }}>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#10B981', animation:'blink 1.2s ease-in-out infinite' }}/>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid #10B981', animation:'pulseRing 1.6s ease-out infinite' }}/>
          </div>
          <span style={{ fontSize:11, fontWeight:700, color:'#10B981' }}>Site en ligne</span>
        </div>
      </div>

      {/* ── SECTION CI/CD ── */}
      <div style={{ background:'#F8FAFC', borderRadius:16, padding:'14px 14px 20px', marginBottom:12 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:14 }}>
          🚀 Pipeline CI/CD — git push → prod en moins de 3 min
        </div>

        {/* ROW 1 : GitHub → Actions → Build */}
        <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:8 }}>
          <Card delay={0} node={{ emoji:'🐙', label:'GitHub', sub:'git push main', border:'#CBD5E1', tooltip:'Tu pousses du code → tout se déclenche !', anim:'floatA 3.5s ease-in-out infinite' }}/>
          <Arrow color="#185FA5" delay={0}/>
          <Card delay={100} node={{ emoji:'⚡', label:'GitHub Actions', sub:'CI/CD pipeline', border:'#BFDBFE', badge:{ text:'AUTO', color:'#185FA5' }, tooltip:'Tests + build automatisés sur chaque push', anim:'floatB 3s ease-in-out infinite' }}/>
          <Arrow color="#6D28D9" delay={200}/>
          <Card delay={200} node={{ emoji:'🏗️', label:'Next.js build', sub:'npm run build', border:'#DDD6FE', tooltip:'Compile le portfolio en fichiers statiques', anim:'floatA 4s ease-in-out infinite' }}/>
        </div>

        {/* Flèche vers le bas depuis Build */}
        <div style={{ display:'flex', marginBottom:4, paddingLeft:'calc(66.66% - 1px)' }}>
          <Arrow color="#BA7517" vertical/>
        </div>

        {/* ROW 2 : S3 → CloudFront → Visiteur (sens inverse) */}
        <div style={{ display:'flex', alignItems:'center', gap:0, flexDirection:'row-reverse' }}>
          <Card delay={300} node={{ emoji:'🪣', label:'AWS S3', sub:'Fichiers statiques', border:'#FED7AA', tooltip:'Stockage HTML/CSS/JS ultra fiable', anim:'floatB 3.8s ease-in-out infinite' }}/>
          <Arrow color="#0F6E56" delay={300}/>
          <Card delay={400} node={{ emoji:'🌍', label:'CloudFront', sub:'CDN mondial + HTTPS', border:'#9FE1CB', badge:{ text:'CDN', color:'#0F6E56' }, tooltip:'Site distribué mondialement en millisecondes', anim:'floatA 3.2s ease-in-out infinite' }}/>
          <Arrow color="#0F6E56" delay={400}/>
          <Card delay={500} node={{ emoji:'👩🏾‍💻', label:'Visiteur', sub:'Site accessible mondialement', border:'#BBF7D0', badge:{ text:'LIVE', color:'#10B981' }, tooltip:'Ton portfolio en ligne partout dans le monde !', anim:'floatB 3s ease-in-out infinite' }}/>
        </div>

        {/* Terraform liens */}
        <div style={{ marginTop:14, padding:'10px 12px', background:'white', border:'1px solid #E2E8F0', borderRadius:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <span style={{ fontSize:16, animation:'spinSlow 8s linear infinite', display:'inline-block' }}>🔧</span>
            <span style={{ fontSize:11, fontWeight:700, color:'#6D28D9' }}>Terraform</span>
            <span style={{ fontSize:10, color:'#94A3B8' }}>— Infrastructure as Code — provisionne :</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
            <TfLine label="→ AWS S3" />
            <TfLine label="→ CloudFront + CF Function" />
          </div>
        </div>
      </div>

      {/* ── SECTION MONITORING ── */}
      <div style={{ background:'#F8FAFC', borderRadius:16, padding:'14px 14px 20px', marginBottom:12 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:14 }}>
          📊 Monitoring temps réel — alertes automatiques
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:14 }}>
          <Card delay={600} node={{ emoji:'📈', label:'Page monitoring', sub:'Auto-refresh 60s', border:'#DDD6FE', tooltip:'Métriques CloudWatch en temps réel', anim:'floatA 3.5s ease-in-out infinite' }}/>
          <Arrow color="#993C1D" delay={600}/>
          <Card delay={700} node={{ emoji:'🚪', label:'API Gateway', sub:'GET /metrics', border:'#BFDBFE', tooltip:'Expose l\'API Lambda de façon sécurisée', anim:'floatB 3.8s ease-in-out infinite' }}/>
          <Arrow color="#993C1D" delay={700}/>
          <Card delay={800} node={{ emoji:'⚡', label:'Lambda', sub:'Serverless Node.js', border:'#F5C4B3', tooltip:'0€ quand personne ne regarde !', anim:'floatA 4.2s ease-in-out infinite' }}/>
          <Arrow color="#534AB7" delay={800}/>
          <Card delay={900} node={{ emoji:'👁️', label:'CloudWatch', sub:'Alertes 5xx / 4xx', border:'#DDD6FE', tooltip:'Surveille les erreurs et le trafic en temps réel', anim:'floatB 3.6s ease-in-out infinite' }}/>
          <Arrow color="#BE185D" delay={900}/>
          <Card delay={1000} node={{ emoji:'🔔', label:'SNS', sub:'Email alertes', border:'#F4C0D1', tooltip:'Email si quelque chose cloche !', anim:'floatA 3.3s ease-in-out infinite' }}/>
        </div>

        {/* Terraform liens monitoring */}
        <div style={{ padding:'10px 12px', background:'white', border:'1px solid #E2E8F0', borderRadius:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <span style={{ fontSize:16, animation:'spinSlow 8s linear infinite', display:'inline-block' }}>🔧</span>
            <span style={{ fontSize:11, fontWeight:700, color:'#6D28D9' }}>Terraform</span>
            <span style={{ fontSize:10, color:'#94A3B8' }}>— provisionne également :</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:4 }}>
            <TfLine label="→ Lambda" />
            <TfLine label="→ CloudWatch + Alarmes" />
            <TfLine label="→ SNS + Abonnement email" />
          </div>
        </div>
      </div>

      {/* ── LÉGENDE ── */}
      <div style={{ display:'flex', gap:20, flexWrap:'wrap', padding:'0 2px', marginBottom:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:24, height:2, background:'#185FA5' }}/>
          <span style={{ fontSize:10, color:'#64748B' }}>Flux de données</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:24, height:1, background:'repeating-linear-gradient(90deg,#6D28D9 0px,#6D28D9 4px,transparent 4px,transparent 8px)' }}/>
          <span style={{ fontSize:10, color:'#64748B' }}>Provisionné par Terraform</span>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
        {[
          { icon:'🌐', label:'Disponibilité', val:'99.9%', color:'#10B981' },
          { icon:'⚡', label:'Déploiement', val:'< 3 min', color:'#0F172A' },
          { icon:'💰', label:'Coût / mois', val:'~0.02€', color:'#0F172A' },
          { icon:'🔒', label:'Sécurité', val:'HTTPS + IAM', color:'#0F172A' },
        ].map((s, i) => (
          <div key={i} style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
            <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
            <div style={{ fontSize:10, color:'#64748B', marginBottom:3 }}>{s.label}</div>
            <div style={{ fontSize:14, fontWeight:700, color:s.color }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
