'use client'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, CheckCircle } from 'lucide-react'
import { projects, missionBNP } from '@/data/portfolio'

const projectIcons: Record<string, string> = { terminal:'💻', globe:'🌐' }

/* ── Pipeline animé ── */
const pipelineSteps = [
  { icon:'📝', label:'Code', sub:'Push Git', color:'#EFF6FF', border:'#BFDBFE', text:'#1d4ed8' },
  { icon:'🔍', label:'CI', sub:'Tests & Lint', color:'#FFF7ED', border:'#FED7AA', text:'#C2410C' },
  { icon:'🐳', label:'Build', sub:'Image Docker', color:'#EFF6FF', border:'#BFDBFE', text:'#0EA5E9' },
  { icon:'🔒', label:'Sécurité', sub:'Scan vulnérabilités', color:'#F5F3FF', border:'#DDD6FE', text:'#7C3AED' },
  { icon:'☁️', label:'Deploy', sub:'Cloud auto', color:'#F0FDF4', border:'#BBF7D0', text:'#15803D' },
  { icon:'📊', label:'Monitor', sub:'Logs & alertes', color:'#FDF2F8', border:'#F9A8D4', text:'#BE185D' },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function DevOpsPipeline() {
  const { ref, visible } = useInView(0.2)
  const [active, setActive] = useState(-1)
  const [running, setRunning] = useState(false)

  const runAnim = async () => {
    if (running) return
    setRunning(true)
    setActive(-1)
    for (let i = 0; i < pipelineSteps.length; i++) {
      await new Promise(r => setTimeout(r, 420))
      setActive(i)
    }
    setRunning(false)
  }

  useEffect(() => { if (visible && active === -1) setTimeout(runAnim, 400) }, [visible])

  return (
    <div ref={ref} style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:18, padding:'28px 24px', boxShadow:'0 4px 24px rgba(0,0,0,.05)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
        <div>
          <div style={{ fontSize:14, fontWeight:800, color:'#0F172A', marginBottom:3 }}>⚡ Le pipeline DevOps en action</div>
          <div style={{ fontSize:13, color:'#64748B' }}>Chaque commit déclenche ce cycle automatiquement</div>
        </div>
        <button onClick={runAnim} disabled={running} style={{
          background: running ? '#94A3B8' : '#2563EB', color:'white',
          border:'none', borderRadius:8, padding:'8px 16px',
          fontSize:13, fontWeight:700, cursor: running ? 'not-allowed' : 'pointer',
          transition:'background .2s', display:'flex', alignItems:'center', gap:6,
        }}>
          {running ? '⏳ En cours...' : '▶ Rejouer'}
        </button>
      </div>

      {/* Steps */}
      <div style={{ overflowX:'auto', overflowY:'visible', paddingBottom:4 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:0, minWidth:500, padding:'10px 4px' }}>
          {pipelineSteps.map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', flex:'1 1 0' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flex:1 }}>
                {/* Cercle icône */}
                <div style={{
                  width:54, height:54, borderRadius:'50%', flexShrink:0,
                  background: active >= i ? s.color : '#F8FAFC',
                  border: `2px solid ${active >= i ? s.border : '#E2E8F0'}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:22,
                  transition:'transform .35s ease, background .35s ease, border-color .35s ease, box-shadow .35s ease',
                  transform: active === i ? 'scale(1.18)' : 'scale(1)',
                  boxShadow: active === i ? `0 6px 18px ${s.border}` : active > i ? `0 2px 8px ${s.border}80` : 'none',
                  willChange:'transform',
                }}>
                  {s.icon}
                </div>
                {/* Labels */}
                <div style={{ textAlign:'center', minWidth:70 }}>
                  <div style={{ fontSize:11, fontWeight:700, color: active >= i ? s.text : '#94A3B8', transition:'color .3s' }}>{s.label}</div>
                  <div style={{ fontSize:10, color:'#94A3B8', lineHeight:1.3, marginTop:1 }}>{s.sub}</div>
                </div>
              </div>
              {/* Connecteur */}
              {i < pipelineSteps.length - 1 && (
                <div style={{ flex:'0 0 24px', height:3, borderRadius:2, background:'#E2E8F0', position:'relative', overflow:'hidden', marginBottom:30, flexShrink:0 }}>
                  <div style={{ position:'absolute', inset:0, background:'#2563EB', width: active > i ? '100%' : '0%', transition:'width .4s ease' }}/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Why */}
      <div style={{ marginTop:20, padding:'14px 18px', background:'#F8FAFC', borderRadius:12, border:'1px solid #E2E8F0' }}>
        <div style={{ fontSize:12, fontWeight:700, color:'#0F172A', marginBottom:6 }}>💡 Pourquoi ces projets ?</div>
        <p style={{ fontSize:13, color:'#475569', lineHeight:1.7 }}>
          Après une pause professionnelle, j&apos;ai voulu <strong>démontrer concrètement</strong> ma pratique DevOps :
          pas juste la théorie, mais un vrai cycle complet — de l&apos;idée au déploiement en production.
          Chaque projet suit ce pipeline et tourne réellement en ligne.
        </p>
      </div>
    </div>
  )
}

export default function ProjetsPage() {
  return (
    <div style={{ minHeight:'80vh' }}>
      {/* ── Header immersif ── */}
      <div className='projets-header' style={{ background:'linear-gradient(135deg,#0F172A 0%,#1e3a5f 55%,#1d4ed8 100%)', padding:'52px 0 44px', position:'relative', overflow:'hidden' }}>
        {/* Décos */}
        <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, background:'rgba(37,99,235,.12)', borderRadius:'50%', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-60, left:60, width:200, height:200, background:'rgba(16,185,129,.08)', borderRadius:'50%', pointerEvents:'none' }}/>

        <div className="container" style={{ position:'relative', zIndex:2 }}>
          {/* Label */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', borderRadius:20, padding:'4px 14px', marginBottom:18 }}>
            <span style={{ fontSize:12 }}>⚡</span>
            <span style={{ fontSize:12, fontWeight:700, color:'#93C5FD' }}>Pratique DevOps · De l'idée au déploiement</span>
          </div>

          <h1 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, color:'white', marginBottom:12, letterSpacing:'-0.02em', lineHeight:1.1 }}>
            Mes projets DevOps
          </h1>
          <p style={{ color:'#94A3B8', fontSize:15, lineHeight:1.7, maxWidth:520, marginBottom:28 }}>
            Deux projets concrets réalisés pour <strong style={{ color:'#CBD5E1' }}>démontrer et maintenir mes compétences</strong> pendant ma recherche : CI/CD, conteneurisation, infrastructure cloud — du code à la prod.
          </p>

          {/* Stats rapides */}
          <div className='projets-header-stats' style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {[
              { icon:'🔄', label:'Pipelines CI/CD', val:'GitHub Actions' },
              { icon:'🐳', label:'Conteneurisation', val:'Docker + Docker Hub' },
              { icon:'☁️', label:'Cloud', val:'AWS · Render' },
              { icon:'✅', label:'En ligne', val:'Démos accessibles' },
            ].map(s=>(
              <div key={s.label} style={{ background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)', borderRadius:10, padding:'10px 16px', backdropFilter:'blur(6px)' }}>
                <div style={{ fontSize:18, marginBottom:3 }}>{s.icon}</div>
                <div style={{ fontSize:11, color:'#64748B' }}>{s.label}</div>
                <div style={{ fontSize:12, fontWeight:700, color:'white' }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline animé */}
      <section className="section" style={{ background:'#F8FAFC' }}>
        <div className="container">
          <DevOpsPipeline />
        </div>
      </section>

      {/* Projects */}
      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div className="section-label">Réalisations</div>
          <h2 className="section-title" style={{ marginBottom:28 }}>Mes projets</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            {projects.map(p => (
              <div key={p.id} className="card" style={{ padding:0, overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:'180px 1fr' }} className="project-card-grid">
                  {/* Accent */}
                  <div style={{ background:p.color, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:28, gap:10, minHeight:160 }}>
                    <div style={{ width:60, height:60, borderRadius:16, background:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, boxShadow:'0 4px 14px rgba(0,0,0,.07)' }}>
                      {projectIcons[p.icon]}
                    </div>
                    <div style={{ fontSize:11, fontWeight:700, color:p.iconColor, textAlign:'center', textTransform:'uppercase', letterSpacing:'.04em' }}>{p.year}</div>
                    {p.status === 'live' && (
                      <div style={{ display:'flex', alignItems:'center', gap:5, background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:12, padding:'2px 10px' }}>
                        <span className="pulse-dot" style={{ width:6, height:6, borderRadius:'50%', background:'#10B981', display:'inline-block' }}/>
                        <span style={{ fontSize:11, fontWeight:700, color:'#15803D' }}>Live</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding:'22px 26px' }}>
                    <h2 style={{ fontSize:17, fontWeight:800, color:'#0F172A', marginBottom:7 }}>{p.title}</h2>
                    <p style={{ color:'#475569', fontSize:13, lineHeight:1.7, marginBottom:14 }}>{p.longDescription}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
                      {p.tags.map((t,i)=><span key={t} className={`tag ${p.tagClasses[i]}`}>{t}</span>)}
                    </div>

                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:18 }} className="project-detail-grid">
                      <div>
                        <div style={{ fontSize:11, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:7 }}>Points clés</div>
                        {p.highlights.map(h=>(
                          <div key={h} style={{ display:'flex', gap:7, marginBottom:5, alignItems:'flex-start' }}>
                            <CheckCircle size={12} style={{ color:'#2563EB', flexShrink:0, marginTop:1 }}/>
                            <span style={{ fontSize:12, color:'#475569', lineHeight:1.4 }}>{h}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ fontSize:11, fontWeight:700, color:'#64748B', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:7 }}>Stack</div>
                        {Object.entries(p.stack).map(([cat,items])=>(
                          <div key={cat} style={{ marginBottom:5 }}>
                            <span style={{ fontSize:11, color:'#94A3B8', fontWeight:600 }}>{cat} : </span>
                            <span style={{ fontSize:12, color:'#0F172A' }}>{(items as string[]).join(', ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                      <a href={p.links.github} target="_blank" rel="noopener noreferrer"
                        style={{ display:'flex', alignItems:'center', gap:6, background:'#F8FAFC', border:'1.5px solid #E2E8F0', borderRadius:8, padding:'7px 14px', fontSize:12, fontWeight:600, color:'#0F172A', transition:'all .2s' }}
                        onMouseOver={e=>{e.currentTarget.style.borderColor='#2563EB';e.currentTarget.style.color='#2563EB'}}
                        onMouseOut={e=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.color='#0F172A'}}
                      ><Github size={14}/> Code source</a>
                      {p.links.demo && p.links.demo !== '#' && (
                        <a href={p.links.demo} target="_blank" rel="noopener noreferrer"
                          style={{ display:'flex', alignItems:'center', gap:6, background:'#2563EB', borderRadius:8, padding:'7px 14px', fontSize:12, fontWeight:600, color:'white', transition:'background .2s' }}
                          onMouseOver={e=>e.currentTarget.style.background='#1d4ed8'}
                          onMouseOut={e=>e.currentTarget.style.background='#2563EB'}
                        ><ExternalLink size={14}/> Voir la démo</a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BNP */}
      <section className="section" style={{ background:'#F8FAFC' }}>
        <div className="container">
          <div className="section-label">Expérience professionnelle</div>
          <h2 className="section-title">Mission BNP Paribas</h2>
          <p className="section-sub" style={{ marginBottom:28 }}>
            Via IT Europe Consulting (ITEC) · {missionBNP.period}
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }} className="two-col">
            <div className="card" style={{ padding:22 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', marginBottom:14 }}>Réalisations</div>
              {missionBNP.highlights.map(h=>(
                <div key={h} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                  <CheckCircle size={14} style={{ color:'#2563EB', flexShrink:0, marginTop:1 }}/>
                  <span style={{ fontSize:13, color:'#475569', lineHeight:1.5 }}>{h}</span>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding:22 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', marginBottom:14 }}>Environnement technique</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                {missionBNP.env.map(t=>(
                  <span key={t} style={{ background:'#EFF6FF', color:'#2563EB', border:'1px solid #BFDBFE', borderRadius:7, padding:'4px 12px', fontSize:12, fontWeight:600 }}>{t}</span>
                ))}
              </div>
              <div style={{ marginTop:18, padding:'12px 14px', background:'#F8FAFC', borderRadius:9, border:'1px solid #E2E8F0' }}>
                <div style={{ fontSize:11, color:'#64748B' }}>Contexte</div>
                <div style={{ fontSize:13, fontWeight:600, color:'#0F172A', marginTop:3 }}>Pré-production et production · Secteur bancaire</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .project-card-grid { grid-template-columns: 180px 1fr; }
        .project-detail-grid { grid-template-columns: 1fr 1fr; }
        .two-col { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .project-card-grid { grid-template-columns: 1fr !important; }
          .project-detail-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          /* Header compact mobile */
          .projets-header { padding: 28px 0 24px !important; }
          .projets-header h1 { font-size: 1.4rem !important; margin-bottom: 8px !important; }
          .projets-header p { font-size: 13px !important; margin-bottom: 16px !important; }
          .projets-header-stats { gap: 8px !important; }
          .projets-header-stats > div { padding: 8px 10px !important; }
        }
      `}</style>
    </div>
  )
}
