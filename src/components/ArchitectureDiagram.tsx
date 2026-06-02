'use client'
import { useEffect, useState } from 'react'

interface Node {
  emoji: string
  label: string
  sub: string
  border: string
  badge?: { text: string; color: string }
  tooltip: string
  anim?: string
}

function Card({ node }: { node: Node }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white', border: `1.5px solid ${node.border}`,
        borderRadius: 14, padding: '10px 8px 8px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        cursor: 'default', position: 'relative',
        transition: 'transform .2s, box-shadow .2s',
        transform: hovered ? 'translateY(-3px) scale(1.03)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,.1)' : 'none',
        flex: 1, minWidth: 0,
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
    <div style={{ width:2, height:20, margin:'0 auto', background:`repeating-linear-gradient(180deg,${color} 0,${color} 5px,transparent 5px,transparent 9px)`, position:'relative' }}>
      <div style={{ position:'absolute', bottom:-4, left:-3, width:0, height:0, borderTop:`6px solid ${color}`, borderLeft:'4px solid transparent', borderRight:'4px solid transparent' }}/>
    </div>
  )
}

function TfLine({ label }: { label: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:4, padding:'3px 0' }}>
      <div style={{ flex:1, height:1, background:'repeating-linear-gradient(90deg,#6D28D9 0px,#6D28D9 4px,transparent 4px,transparent 8px)' }}/>
      <div style={{ fontSize:9, color:'#6D28D9', fontWeight:600, whiteSpace:'nowrap' }}>{label}</div>
    </div>
  )
}

/* ── Mobile grid card ── */
function MobileCard({ node, number }: { node: Node; number: number }) {
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

export default function ArchitectureDiagram() {
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

  const cicdNodes1 = [
    { emoji:'🐙', label:'GitHub', sub:'git push main', border:'#CBD5E1', badge:{ text:'AUTO', color:'#185FA5' }, tooltip:'Tu pousses du code → tout se déclenche !' },
    { emoji:'⚡', label:'GitHub Actions', sub:'CI/CD pipeline', border:'#BFDBFE', tooltip:'Tests + build automatisés sur chaque push' },
    { emoji:'🏗️', label:'Next.js build', sub:'npm run build', border:'#DDD6FE', tooltip:'Compile le portfolio en fichiers statiques' },
  ]
  const cicdNodes2 = [
    { emoji:'🪣', label:'AWS S3', sub:'Fichiers statiques', border:'#FED7AA', tooltip:'Stockage HTML/CSS/JS ultra fiable' },
    { emoji:'🌍', label:'CloudFront', sub:'CDN mondial + HTTPS', border:'#9FE1CB', badge:{ text:'CDN', color:'#0F6E56' }, tooltip:'Site distribué mondialement en millisecondes' },
    { emoji:'👩🏾‍💻', label:'Visiteur', sub:'Site accessible mondialement', border:'#BBF7D0', badge:{ text:'LIVE', color:'#10B981' }, tooltip:'Ton portfolio en ligne partout dans le monde !' },
  ]
  const monitoringNodes = [
    { emoji:'📈', label:'Page monitoring', sub:'Auto-refresh 60s', border:'#DDD6FE', tooltip:'Métriques CloudWatch en temps réel' },
    { emoji:'🚪', label:'API Gateway', sub:'GET /metrics', border:'#BFDBFE', tooltip:'Expose l\'API Lambda de façon sécurisée' },
    { emoji:'⚡', label:'Lambda', sub:'Serverless Node.js', border:'#F5C4B3', tooltip:'0€ quand personne ne regarde !' },
    { emoji:'👁️', label:'CloudWatch', sub:'Alertes 5xx / 4xx', border:'#DDD6FE', tooltip:'Surveille les erreurs et le trafic en temps réel' },
    { emoji:'🔔', label:'SNS', sub:'Email alertes', border:'#F4C0D1', tooltip:'Email si quelque chose cloche !' },
  ]

  return (
    <div style={{ fontFamily:'inherit' }}>
      <style>{`
        @keyframes arrowFlow { from{background-position:0 0} to{background-position:28px 0} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
        @keyframes spinSlow { to{transform:rotate(360deg)} }
      `}</style>

      {/* HEADER */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, flexWrap:'wrap', gap:8 }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:'#0F172A' }}>Architecture DevOps</div>
          <div style={{ fontSize:10, color:'#64748B' }}>Portfolio Zina Ibouroi · Infrastructure complète AWS</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7, background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:20, padding:'4px 10px' }}>
          <div style={{ position:'relative', width:8, height:8, flexShrink:0 }}>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#10B981', animation:'blink 1.2s ease-in-out infinite' }}/>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid #10B981', animation:'pulseRing 1.6s ease-out infinite' }}/>
          </div>
          <span style={{ fontSize:10, fontWeight:700, color:'#10B981' }}>Site en ligne</span>
        </div>
      </div>

      {/* ── CI/CD ── */}
      <div style={{ background:'#F8FAFC', borderRadius:14, padding:'12px 12px 16px', marginBottom:10 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:12 }}>
          🚀 Pipeline CI/CD — git push → prod en moins de 3 min
        </div>

        {isMobile ? (
          /* MOBILE : grille numérotée */
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:8 }}>
              {cicdNodes1.map((n, i) => <MobileCard key={i} node={n} number={i+1}/>)}
            </div>
            <DownArrow color="#BA7517"/>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:8 }}>
              {[...cicdNodes2].reverse().map((n, i) => <MobileCard key={i} node={n} number={cicdNodes2.length - i + 3}/>)}
            </div>
          </div>
        ) : (
          /* DESKTOP : lignes avec flèches */
          <>
            <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:8 }}>
              {cicdNodes1.map((n, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', flex: i < cicdNodes1.length-1 ? 'auto' : 1, minWidth:0 }}>
                  <div style={{ flex:1, minWidth:0 }}><Card node={n}/></div>
                  {i < cicdNodes1.length-1 && <Arrow color={['#185FA5','#6D28D9'][i]}/>}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', marginBottom:4, paddingLeft:'calc(66.66% - 1px)' }}>
              <DownArrow color="#BA7517"/>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:0, flexDirection:'row-reverse' }}>
              {cicdNodes2.map((n, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', flex: i < cicdNodes2.length-1 ? 'auto' : 1, minWidth:0 }}>
                  <div style={{ flex:1, minWidth:0 }}><Card node={n}/></div>
                  {i < cicdNodes2.length-1 && <Arrow color="#0F6E56" reverse/>}
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop:12, padding:'8px 10px', background:'white', border:'1px solid #E2E8F0', borderRadius:9 }}>
          <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:5 }}>
            <span style={{ fontSize:14, animation:'spinSlow 8s linear infinite', display:'inline-block' }}>🔧</span>
            <span style={{ fontSize:11, fontWeight:700, color:'#6D28D9' }}>Terraform</span>
            <span style={{ fontSize:10, color:'#94A3B8' }}>— provisionne :</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
            <TfLine label="→ AWS S3"/>
            <TfLine label="→ CloudFront + CF Function"/>
          </div>
        </div>
      </div>

      {/* ── MONITORING ── */}
      <div style={{ background:'#F8FAFC', borderRadius:14, padding:'12px 12px 16px', marginBottom:10 }}>
        <div style={{ fontSize:10, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:12 }}>
          📊 Monitoring temps réel — alertes automatiques
        </div>

        {isMobile ? (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
            {monitoringNodes.map((n, i) => <MobileCard key={i} node={n} number={i+1}/>)}
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:0, marginBottom:12 }}>
            {monitoringNodes.map((n, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', flex: i < monitoringNodes.length-1 ? 'auto' : 1, minWidth:0 }}>
                <div style={{ flex:1, minWidth:0 }}><Card node={n}/></div>
                {i < monitoringNodes.length-1 && <Arrow color={['#993C1D','#993C1D','#534AB7','#BE185D'][i]}/>}
              </div>
            ))}
          </div>
        )}

        <div style={{ padding:'8px 10px', background:'white', border:'1px solid #E2E8F0', borderRadius:9 }}>
          <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:5 }}>
            <span style={{ fontSize:14, animation:'spinSlow 8s linear infinite', display:'inline-block' }}>🔧</span>
            <span style={{ fontSize:11, fontWeight:700, color:'#6D28D9' }}>Terraform</span>
            <span style={{ fontSize:10, color:'#94A3B8' }}>— provisionne également :</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap:4 }}>
            <TfLine label="→ Lambda"/>
            <TfLine label="→ CloudWatch + Alarmes"/>
            <TfLine label="→ SNS + Abonnement email"/>
          </div>
        </div>
      </div>

      {/* LÉGENDE */}
      <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <div style={{ width:20, height:2, background:'#185FA5' }}/>
          <span style={{ fontSize:10, color:'#64748B' }}>Flux de données</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <div style={{ width:20, height:1, background:'repeating-linear-gradient(90deg,#6D28D9 0px,#6D28D9 4px,transparent 4px,transparent 8px)' }}/>
          <span style={{ fontSize:10, color:'#64748B' }}>Provisionné par Terraform</span>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
        {[
          { icon:'🌐', label:'Disponibilité', val:'99.9%', color:'#10B981' },
          { icon:'⚡', label:'Déploiement', val:'< 3 min', color:'#0F172A' },
          { icon:'💰', label:'Coût/mois', val:'~0.02€', color:'#0F172A' },
          { icon:'🔒', label:'Sécurité', val:'HTTPS+IAM', color:'#0F172A' },
        ].map((s,i) => (
          <div key={i} style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:10, padding:'10px 6px', textAlign:'center' }}>
            <div style={{ fontSize:16, marginBottom:3 }}>{s.icon}</div>
            <div style={{ fontSize:9, color:'#64748B', marginBottom:2 }}>{s.label}</div>
            <div style={{ fontSize:12, fontWeight:700, color:s.color }}>{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
