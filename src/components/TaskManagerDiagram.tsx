'use client'
import { useEffect, useState } from 'react'

interface CardNode {
  emoji: string
  label: string
  sub: string
  border: string
  badge?: { text: string; color: string }
  tooltip: string
}

function Card({ node }: { node: CardNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:'white', border:`1.5px solid ${node.border}`,
        borderRadius:14, padding:'10px 8px 8px',
        display:'flex', flexDirection:'column', alignItems:'center', gap:4,
        cursor:'default', position:'relative',
        transition:'transform .2s, box-shadow .2s',
        transform: hovered ? 'translateY(-3px) scale(1.03)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,.1)' : 'none',
        flex:1, minWidth:0,
      }}
    >
      {node.badge && (
        <div style={{ position:'absolute', top:-8, right:-8, background:node.badge.color, color:'white', fontSize:8, fontWeight:700, borderRadius:20, padding:'2px 6px' }}>
          {node.badge.text}
        </div>
      )}
      <div style={{ fontSize:22, lineHeight:1 }}>{node.emoji}</div>
      <div style={{ fontSize:11, fontWeight:700, color:'#0F172A', textAlign:'center', lineHeight:1.3 }}>{node.label}</div>
      <div style={{ fontSize:9, color:'#64748B', textAlign:'center', lineHeight:1.3 }}>{node.sub}</div>
      {hovered && (
        <div style={{ position:'absolute', bottom:'calc(100% + 8px)', left:'50%', transform:'translateX(-50%)', background:'white', border:'1.5px solid #E2E8F0', borderRadius:10, padding:'6px 10px', fontSize:10, color:'#0F172A', whiteSpace:'nowrap', zIndex:50, boxShadow:'0 4px 16px rgba(0,0,0,.09)', pointerEvents:'none' }}>
          {node.tooltip}
        </div>
      )}
    </div>
  )
}

function Arrow({ color, reverse = false }: { color: string; reverse?: boolean }) {
  return (
    <div style={{ flexShrink:0, width:24, height:2, margin:'0 2px', marginBottom:18, background:`repeating-linear-gradient(90deg,${color} 0,${color} 5px,transparent 5px,transparent 9px)`, position:'relative' }}>
      <div style={{ position:'absolute', [reverse?'left':'right']:-4, top:-3, width:0, height:0, borderLeft:reverse?undefined:`6px solid ${color}`, borderRight:reverse?`6px solid ${color}`:undefined, borderTop:'4px solid transparent', borderBottom:'4px solid transparent' }}/>
    </div>
  )
}

function DownArrow({ color }: { color: string }) {
  return (
    <div style={{ width:2, height:20, margin:'2px auto', background:`repeating-linear-gradient(180deg,${color} 0,${color} 5px,transparent 5px,transparent 9px)`, position:'relative' }}>
      <div style={{ position:'absolute', bottom:-4, left:-3, width:0, height:0, borderTop:`6px solid ${color}`, borderLeft:'4px solid transparent', borderRight:'4px solid transparent' }}/>
    </div>
  )
}

function MobileCard({ node, number }: { node: CardNode; number: number }) {
  return (
    <div style={{ background:'white', border:`1.5px solid ${node.border}`, borderRadius:12, padding:'10px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:4, position:'relative' }}>
      {node.badge && (
        <div style={{ position:'absolute', top:-7, right:-7, background:node.badge.color, color:'white', fontSize:7, fontWeight:700, borderRadius:20, padding:'2px 5px' }}>{node.badge.text}</div>
      )}
      <div style={{ position:'absolute', top:-7, left:-7, width:16, height:16, borderRadius:'50%', background:'#2563EB', color:'white', fontSize:8, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{number}</div>
      <div style={{ fontSize:20 }}>{node.emoji}</div>
      <div style={{ fontSize:10, fontWeight:700, color:'#0F172A', textAlign:'center', lineHeight:1.3 }}>{node.label}</div>
      <div style={{ fontSize:8, color:'#64748B', textAlign:'center', lineHeight:1.3 }}>{node.sub}</div>
    </div>
  )
}

export default function TaskManagerDiagram() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!mounted) return null

  const cicdRow1: CardNode[] = [
    { emoji:'🐙', label:'GitHub', sub:'git push main', border:'#CBD5E1', badge:{ text:'AUTO', color:'#185FA5' }, tooltip:'Déclenche le pipeline automatiquement' },
    { emoji:'📦', label:'Install deps', sub:'pip install', border:'#BFDBFE', tooltip:'Installation des dépendances Python' },
    { emoji:'🧪', label:'Tests pytest', sub:'Tests unitaires', border:'#FDE68A', tooltip:'Validation automatique du code' },
    { emoji:'🔒', label:'pip-audit', sub:'Scan sécurité', border:'#FECACA', tooltip:'Détection de vulnérabilités' },
    { emoji:'🐳', label:'Docker build', sub:'Build image', border:'#BAE6FD', tooltip:'Construction de l\'image Docker' },
  ]
  const cicdRow2: CardNode[] = [
    { emoji:'🐋', label:'Docker Hub', sub:'izh0407/devops-app', border:'#BAE6FD', tooltip:'Image publiée sur Docker Hub' },
    { emoji:'✅', label:'Test API', sub:'/, /health, /tasks', border:'#BBF7D0', tooltip:'Validation des endpoints' },
    { emoji:'▶️', label:'Run container', sub:'docker run :5000', border:'#9FE1CB', tooltip:'Démarrage du conteneur pour les tests' },
  ]
  const appNodes: CardNode[] = [
    { emoji:'🐍', label:'Flask', sub:'API REST Python', border:'#DDD6FE', tooltip:'GET /tasks · POST /tasks · DELETE · GET /health' },
    { emoji:'⚙️', label:'Gunicorn', sub:'Serveur WSGI', border:'#E9D5FF', tooltip:'Serveur web production pour Flask' },
    { emoji:'🐳', label:'Docker', sub:'Conteneurisation', border:'#BAE6FD', tooltip:'Image Docker publiée sur Docker Hub' },
    { emoji:'☁️', label:'Render', sub:'Déploiement cloud', border:'#9FE1CB', tooltip:'Déploiement automatique depuis GitHub' },
    { emoji:'👤', label:'Utilisateur', sub:'devops-app-7704', border:'#BBF7D0', badge:{ text:'LIVE', color:'#10B981' }, tooltip:'Interface web + API accessible publiquement' },
  ]
  const obsNodes: CardNode[] = [
    { emoji:'💚', label:'Healthcheck', sub:'/health endpoint', border:'#9FE1CB', tooltip:'Vérifie que l\'app est opérationnelle' },
    { emoji:'📝', label:'Logging', sub:'Application logs', border:'#FDE68A', tooltip:'Logs applicatifs pour le débogage' },
    { emoji:'🔥', label:'Prometheus', sub:'Métriques', border:'#FED7AA', tooltip:'Collecte des métriques applicatives' },
    { emoji:'📊', label:'Grafana', sub:'Dashboards', border:'#FED7AA', tooltip:'Visualisation des métriques Prometheus' },
  ]

  return (
    <div style={{ fontFamily:'inherit' }}>
      <style>{`
        @keyframes tmBlink { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes tmPulse { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
      `}</style>

      {/* HEADER */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:8 }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:'#0F172A' }}>Architecture – Task Manager</div>
          <div style={{ fontSize:10, color:'#64748B' }}>Flask · Docker · GitHub Actions · Render · Prometheus · Grafana</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7, background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:20, padding:'4px 10px' }}>
          <div style={{ position:'relative', width:8, height:8, flexShrink:0 }}>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#10B981', animation:'tmBlink 1.2s ease-in-out infinite' }}/>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid #10B981', animation:'tmPulse 1.6s ease-out infinite' }}/>
          </div>
          <span style={{ fontSize:10, fontWeight:700, color:'#10B981' }}>Live sur Render</span>
        </div>
      </div>

      {/* ── CI/CD ── */}
      <div style={{ background:'#F8FAFC', borderRadius:14, padding:'12px 12px 16px', marginBottom:10 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:12 }}>
          🚀 Pipeline CI/CD — GitHub Actions — chaque push sur main
        </div>

        {isMobile ? (
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:6 }}>
              {cicdRow1.map((n,i) => <MobileCard key={i} node={n} number={i+1}/>)}
            </div>
            <DownArrow color="#0EA5E9"/>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:6 }}>
              {[...cicdRow2].reverse().map((n,i) => <MobileCard key={i} node={n} number={cicdRow2.length - i + 5}/>)}
            </div>
          </div>
        ) : (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:6 }}>
              {cicdRow1.map((n,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', flex:i<cicdRow1.length-1?'auto':1, minWidth:0 }}>
                  <div style={{ flex:1, minWidth:0 }}><Card node={n}/></div>
                  {i < cicdRow1.length-1 && <Arrow color={['#185FA5','#F59E0B','#EF4444','#0EA5E9'][i]}/>}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <div style={{ width:'20%', display:'flex', justifyContent:'center', marginBottom:4 }}>
                <DownArrow color="#0EA5E9"/>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:0, flexDirection:'row-reverse' }}>
              {cicdRow2.map((n,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', flex:i<cicdRow2.length-1?'auto':1, minWidth:0 }}>
                  <div style={{ flex:1, minWidth:0 }}><Card node={n}/></div>
                  {i < cicdRow2.length-1 && <Arrow color={i===0?'#0EA5E9':'#0F6E56'} reverse/>}
                </div>
              ))}
              <div style={{ flex:'0 0 24px', height:2, marginBottom:18 }}/><div style={{ flex:1 }}/>
              <div style={{ flex:'0 0 24px', height:2, marginBottom:18 }}/><div style={{ flex:1 }}/>
              <div style={{ flex:'0 0 24px', height:2, marginBottom:18 }}/><div style={{ flex:1 }}/>
            </div>
          </>
        )}
      </div>

      {/* ── APPLICATION ── */}
      <div style={{ background:'#F8FAFC', borderRadius:14, padding:'12px 12px 16px', marginBottom:10 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:12 }}>
          🏗️ Application — Stack technique
        </div>
        {isMobile ? (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
            {appNodes.map((n,i) => <MobileCard key={i} node={n} number={i+1}/>)}
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:0 }}>
            {appNodes.map((n,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', flex:i<appNodes.length-1?'auto':1, minWidth:0 }}>
                <div style={{ flex:1, minWidth:0 }}><Card node={n}/></div>
                {i < appNodes.length-1 && <Arrow color={['#6D28D9','#0EA5E9','#0F6E56','#10B981'][i]}/>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── OBSERVABILITÉ ── */}
      <div style={{ background:'#F8FAFC', borderRadius:14, padding:'12px 12px 16px', marginBottom:10 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:12 }}>
          📊 Observabilité
        </div>
        {isMobile ? (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {obsNodes.map((n,i) => <MobileCard key={i} node={n} number={i+1}/>)}
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:0 }}>
            {obsNodes.map((n,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', flex:i<obsNodes.length-1?'auto':1, minWidth:0 }}>
                <div style={{ flex:1, minWidth:0 }}><Card node={n}/></div>
                {i < obsNodes.length-1 && <Arrow color={['#10B981','#F59E0B','#F97316'][i]}/>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STATS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
        {[
          { icon:'🐍', label:'Language', val:'Python' },
          { icon:'🐳', label:'Runtime', val:'Docker' },
          { icon:'⚡', label:'CI/CD', val:'GitHub Actions' },
          { icon:'☁️', label:'Cloud', val:'Render' },
        ].map((s,i) => (
          <div key={i} style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:10, padding:'10px 6px', textAlign:'center' }}>
            <div style={{ fontSize:16, marginBottom:3 }}>{s.icon}</div>
            <div style={{ fontSize:9, color:'#64748B', marginBottom:2 }}>{s.label}</div>
            <div style={{ fontSize:11, fontWeight:700, color:'#0F172A' }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
