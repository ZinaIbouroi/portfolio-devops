'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, CheckCircle } from 'lucide-react'
import { profile, roles, experience, skills, certifications, softSkills, missionBNP } from '@/data/portfolio'

const skillIcons: Record<string, string> = {
  devops:'⚙️', docker:'🐳', cloud:'☁️', code:'🐍', monitoring:'📊', agile:'🔄',
}
const expIcons: Record<string, string> = {
  code:'💻', building:'🏢', school:'🎓', globe:'🌍', heart:'💝',
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Timeline pause horizontale ── */
const pauseItems = [
  { icon:'👶', date:'Août 2024', title:'Pause volontaire', desc:"Arrêt pour m'occuper de Sofia à plein temps", color:'#FDF2F8', border:'#F9A8D4', text:'#BE185D' },
  { icon:'📰', date:'2024–2025', title:'Veille technique', desc:'Suivi des actualités DevOps, cloud et outils du marché', color:'#F8FAFC', border:'#CBD5E1', text:'#475569' },
  { icon:'🚗', date:'Avr. 2025', title:'Code de la route', desc:'Obtention du code en avril 2025', color:'#FFF7ED', border:'#FED7AA', text:'#C2410C' },
  { icon:'🧒', date:'Sept. 2025', title:'Conduite supervisée', desc:'Cours de conduite débutés, conduite supervisée en cours', color:'#FFF7ED', border:'#FED7AA', text:'#C2410C' },
  { icon:'🔍', date:'Janv. 2026', title:"Recherche d'emploi", desc:'Recherches actives + remise à niveau : AWS, Kubernetes', color:'#EFF6FF', border:'#BFDBFE', text:'#1D4ED8' },
  { icon:'💻', date:'2026', title:'Task Manager', desc:'CI/CD, Docker, déploiement cloud', color:'#F0FDF4', border:'#BBF7D0', text:'#15803D' },
  { icon:'🌐', date:'2026', title:'Ce portfolio', desc:'Terraform, AWS, GitHub Actions', color:'#F0FDF4', border:'#BBF7D0', text:'#15803D' },
]

function PauseTimeline() {
  const { ref, visible } = useInView(0.05)
  return (
    <div ref={ref} style={{ overflowX:'auto', paddingBottom:4 }}>
      <div style={{ display:'flex', minWidth:720, gap:0 }}>
        {pauseItems.map((item, i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', flex:'1 1 0', minWidth:0 }}>
            <div style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:6, flex:1, minWidth:0,
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(12px)',
              transition: `opacity .45s ${i*70}ms ease, transform .45s ${i*70}ms ease`,
            }}>
              {/* Icône */}
              <div style={{
                width:40, height:40, borderRadius:'50%', flexShrink:0,
                background:'white', border:`2px solid ${item.border}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:18, boxShadow:`0 2px 8px ${item.border}60`,
              }}>{item.icon}</div>
              {/* Texte */}
              <div style={{ background:item.color, border:`1.5px solid ${item.border}`, borderRadius:10, padding:'8px 10px', textAlign:'center', width:'100%', boxSizing:'border-box' }}>
                <div style={{ fontSize:10, color:item.text, fontWeight:700, marginBottom:2 }}>{item.date}</div>
                <div style={{ fontSize:11, fontWeight:800, color:'#0F172A', marginBottom:2, lineHeight:1.3 }}>{item.title}</div>
                <div style={{ fontSize:10, color:'#64748B', lineHeight:1.4 }}>{item.desc}</div>
              </div>
            </div>
            {/* Connecteur */}
            {i < pauseItems.length - 1 && (
              <div style={{ paddingTop:19, flexShrink:0, width:10 }}>
                <div style={{ height:2, width:'100%', background: visible ? `linear-gradient(to right,${item.border},${pauseItems[i+1].border})` : '#E2E8F0', transition:`background .4s ${i*70+100}ms` }}/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const role = roles[roleIdx]
    let i = typing ? 0 : role.length
    const iv = setInterval(() => {
      if (typing) {
        setDisplayed(role.slice(0, ++i))
        if (i === role.length) { clearInterval(iv); setTimeout(() => setTyping(false), 1800) }
      } else {
        setDisplayed(role.slice(0, --i))
        if (i === 0) { clearInterval(iv); setRoleIdx(p => (p + 1) % roles.length); setTyping(true) }
      }
    }, typing ? 75 : 45)
    return () => clearInterval(iv)
  }, [roleIdx, typing])

  return (
    <>
      {/* ══ HERO ══ */}
      <section style={{ position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#EFF6FF 0%,#F8FAFC 55%,#EFF6FF 100%)' }}>

        {/* Image — positionnée dans le container, pas en pleine largeur */}
        <div className="hero-img-outer">
          <div style={{ position:'relative', width:'100%', height:'100%' }}>
            <Image src="/hero-illustration.png" alt="Zina Ibouroi" fill style={{ objectFit:'cover', objectPosition:'center top' }} priority/>
            {/* Fondu gauche */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,#EFF6FF 0%,rgba(239,246,255,.5) 22%,transparent 48%)' }}/>
            {/* Fondu bas — très léger */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(248,250,252,.7) 0%,transparent 22%)' }}/>
            {/* Fondu droit */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to left,#EFF6FF 0%,transparent 10%)' }}/>
          </div>
        </div>

        <div className="container" style={{ position:'relative', zIndex:2, padding:'52px 16px' }}>
          <div style={{ maxWidth:500 }}>
            {/* Badge dispo */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:20, padding:'4px 14px', marginBottom:20 }}>
              <span className="pulse-dot" style={{ width:8, height:8, borderRadius:'50%', background:'#10B981', display:'inline-block' }}/>
              <span style={{ fontSize:12, fontWeight:700, color:'#15803D' }}>Disponible · Ouverte à toute proposition</span>
            </div>

            <p style={{ color:'#2563EB', fontWeight:600, fontSize:14, marginBottom:6 }}>Bonjour, je suis</p>
            <h1 style={{ fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:900, color:'#0F172A', lineHeight:1.08, marginBottom:10, letterSpacing:'-0.03em' }}>
              {profile.shortName}
            </h1>
            <div style={{ fontSize:'clamp(1rem,2.2vw,1.4rem)', fontWeight:700, color:'#2563EB', marginBottom:18, minHeight:40, display:'flex', alignItems:'center', gap:4 }}>
              <span suppressHydrationWarning>{displayed}</span><span className="cursor-blink" style={{ borderRight:'2.5px solid #2563EB', height:'1.2em', marginLeft:1 }}/>
            </div>
            <p style={{ color:'#475569', fontSize:15, lineHeight:1.8, marginBottom:10, textAlign:'justify' }}>{profile.bio}</p>
            <div style={{ display:'flex', alignItems:'center', gap:6, color:'#64748B', fontSize:13, marginBottom:28 }}>
              <MapPin size={14}/> {profile.location}
            </div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:22 }}>
              <Link href="/projets" className="btn-primary">Voir mes projets <ArrowRight size={15}/></Link>
              <a href={profile.cv} download className="btn-outline"><Download size={15}/> Mon CV</a>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              {[
                { icon:<Github size={18}/>, href:profile.github, label:'GitHub' },
                { icon:<Linkedin size={18}/>, href:profile.linkedin, label:'LinkedIn' },
                { icon:<Mail size={18}/>, href:`mailto:${profile.email}`, label:'Email' },
              ].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width:38, height:38, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,.85)', color:'#64748B', border:'1.5px solid #E2E8F0', backdropFilter:'blur(4px)', transition:'all .2s' }}
                  onMouseOver={e=>{e.currentTarget.style.borderColor='#2563EB';e.currentTarget.style.color='#2563EB';e.currentTarget.style.background='#EFF6FF'}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor='#E2E8F0';e.currentTarget.style.color='#64748B';e.currentTarget.style.background='rgba(255,255,255,.85)'}}
                >{s.icon}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Badges flottants — en bas à droite, sous le visage */}
        <div className="hero-badges hide-mobile">
          {[
            { sub:'Expérience', val:'3 ans · DevOps', border:'#BFDBFE', valColor:'#0F172A', delay:'0s' },
            { sub:'Mission', val:'BNP Paribas ✓', border:'#BBF7D0', valColor:'#10B981', delay:'.5s' },
            { sub:'Certifiée', val:'SAFe ✓', border:'#DDD6FE', valColor:'#7C3AED', delay:'1s' },
          ].map(b=>(
            <div key={b.val} className="float" style={{ background:'rgba(255,255,255,.93)', backdropFilter:'blur(8px)', border:`1.5px solid ${b.border}`, borderRadius:12, padding:'9px 14px', boxShadow:'0 4px 16px rgba(0,0,0,.07)', animationDelay:b.delay }}>
              <div style={{ fontSize:10, color:'#64748B', fontWeight:600 }}>{b.sub}</div>
              <div style={{ fontSize:13, fontWeight:800, color:b.valColor }}>{b.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ COMPÉTENCES TECHNIQUES ══ */}
      <section className="section" style={{ background:'#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <div className="section-label">Expertise</div>
            <h2 className="section-title">Compétences techniques</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:16 }} className="skills-grid">
            {skills.map(s=>(
              <div key={s.category} className="card" style={{ padding:'14px 16px', cursor:'default' }}>
                <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:9 }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:`${s.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{skillIcons[s.icon]}</div>
                  <span style={{ fontWeight:700, fontSize:13, color:'#0F172A' }}>{s.category}</span>
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                  {s.items.map(item=>(
                    <span key={item} style={{ background:`${s.color}10`, color:s.color, border:`1px solid ${s.color}30`, borderRadius:4, padding:'2px 7px', fontSize:11, fontWeight:600 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:'14px 20px' }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', marginBottom:10 }}>🏆 Certifications & Formations</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
              {certifications.map(c=>(
                <div key={c.name} style={{ display:'flex', alignItems:'center', gap:6, background:c.done?'#F0FDF4':'#F8FAFC', border:`1px solid ${c.done?'#BBF7D0':'#E2E8F0'}`, borderRadius:8, padding:'5px 11px' }}>
                  <span style={{ fontSize:13 }}>{c.done?'✅':'📚'}</span>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:'#0F172A', lineHeight:1.2 }}>{c.name}</div>
                    <div style={{ fontSize:10, color:'#64748B' }}>{c.org} · {c.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ À PROPOS + EXPÉRIENCE — dans des cards ══ */}
      <section className="section" style={{ background:'white' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, alignItems:'start' }} className="two-col">

            {/* Card Mon profil */}
            <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:16, padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,.04)' }}>
              <div className="section-label">À propos</div>
              <h2 className="section-title" style={{ marginBottom:14 }}>Mon profil</h2>
              <p style={{ color:'#475569', fontSize:14, lineHeight:1.8, marginBottom:14 }}>{profile.bio}</p>
              <p style={{ color:'#475569', fontSize:13, lineHeight:1.7, marginBottom:20 }}>
                Ouverte à toutes propositions : CDI, mission. Île-de-France ou full remote.
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:20 }}>
                {[
                  { n:'3 ans', l:"Expérience DevOps", c:'#EFF6FF', b:'#BFDBFE', t:'#1d4ed8' },
                  { n:'BNP', l:'Env. bancaire', c:'#F0FDF4', b:'#BBF7D0', t:'#15803D' },
                  { n:'SAFe', l:'Certifiée', c:'#F5F3FF', b:'#DDD6FE', t:'#6D28D9' },
                  { n:'Dispo', l:'Immédiatement', c:'#FFF7ED', b:'#FED7AA', t:'#C2410C' },
                ].map(s=>(
                  <div key={s.n} style={{ background:s.c, border:`1.5px solid ${s.b}`, borderRadius:10, padding:'10px 12px' }}>
                    <div style={{ fontSize:17, fontWeight:900, color:s.t }}>{s.n}</div>
                    <div style={{ fontSize:11, color:'#64748B', marginTop:1 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              {/* Soft skills */}
              <div style={{ borderTop:'1px solid #F1F5F9', paddingTop:16 }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#94A3B8', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:11 }}>Savoir-être</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {softSkills.map(s=>(
                    <div key={s.label} style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
                      <span style={{ fontSize:15, flexShrink:0 }}>{s.icon}</span>
                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:'#0F172A' }}>{s.label}</div>
                        <div style={{ fontSize:11, color:'#94A3B8' }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Parcours pro */}
            <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:16, padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,.04)' }}>
              <div className="section-label">Expériences</div>
              <h2 className="section-title" style={{ marginBottom:18 }}>Parcours pro</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ display:'flex', gap:12, position:'relative' }}>
                    {i < experience.length - 1 && (
                      <div style={{ position:'absolute', left:14, top:32, width:2, height:'calc(100% - 4px)', background: exp.pause?'#FCE7F3':'#BFDBFE' }}/>
                    )}
                    <div style={{
                      width:28, height:28, borderRadius:8, flexShrink:0, zIndex:1,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:13,
                      background: exp.current?'#2563EB': exp.pause?'#FDF2F8':'#EFF6FF',
                      border:`1.5px solid ${exp.current?'#2563EB':exp.pause?'#F9A8D4':'#BFDBFE'}`,
                    }}>
                      <span style={{ filter:exp.current?'brightness(10)':'none' }}>{expIcons[exp.icon]}</span>
                    </div>
                    <div style={{ paddingBottom:16 }}>
                      <div style={{ fontSize:10, color:exp.pause?'#BE185D':'#2563EB', fontWeight:700, marginBottom:1 }}>{exp.period}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', lineHeight:1.3 }}>{exp.title}</div>
                      {exp.company && <div style={{ fontSize:11, color:'#64748B', marginTop:1 }}>{exp.company}</div>}
                    </div>
                  </div>
                ))}
              </div>
              {/* Detail ITEC/BNP */}
              <div style={{ background:'#F8FAFC', border:'1.5px solid #E2E8F0', borderRadius:11, padding:14, marginTop:4 }}>
                <div style={{ fontSize:12, fontWeight:800, color:'#0F172A', marginBottom:3 }}>IT Europe Consulting (ITEC) · 2021 – Août 2024</div>
                <div style={{ fontSize:11, color:'#2563EB', fontWeight:600, marginBottom:8 }}>{missionBNP.client}</div>
                {missionBNP.highlights.slice(0,3).map(h=>(
                  <div key={h} style={{ display:'flex', gap:7, marginBottom:5, alignItems:'flex-start' }}>
                    <CheckCircle size={11} style={{ color:'#2563EB', flexShrink:0, marginTop:1 }}/>
                    <span style={{ fontSize:11, color:'#475569', lineHeight:1.5 }}>{h}</span>
                  </div>
                ))}
                <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:8 }}>
                  {missionBNP.env.slice(0,5).map(t=><span key={t} className="tag" style={{ fontSize:10 }}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PAUSE MATERNITÉ ══ */}
      <section style={{ padding:'40px 0', background:'linear-gradient(135deg,#FDF9FF,#F0FDF4)', borderTop:'1px solid #FCE7F3', borderBottom:'1px solid #D1FAE5' }}>
        <div className="container">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:22 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#BE185D', marginBottom:4 }}>Transparence</div>
              <h2 style={{ fontSize:'clamp(1rem,2vw,1.3rem)', fontWeight:800, color:'#0F172A', marginBottom:3 }}>2024 – 2026 · Une pause, pas un vide</h2>
              <p style={{ fontSize:13, color:'#64748B', maxWidth:440 }}>
                Pause pour m&apos;occuper de Sofia 💝 · Reprise active dès que la garde a été assurée.
              </p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10, background:'white', border:'1.5px solid #F9A8D4', borderRadius:14, padding:'10px 16px' }}>
              <span style={{ fontSize:22 }}>👶</span>
              <div>
                <div style={{ fontWeight:800, fontSize:13, color:'#0F172A' }}>Sofia</div>
                <div style={{ fontSize:11, color:'#BE185D' }}>2 ans 💝</div>
              </div>
            </div>
          </div>
          <PauseTimeline />
          <div style={{ marginTop:14, display:'flex', justifyContent:'center' }}>
            <div style={{ background:'white', border:'1.5px solid #BBF7D0', borderRadius:10, padding:'9px 18px', fontSize:13, fontWeight:700, color:'#0F172A' }}>
              ✅ Disponible immédiatement · Prête et motivée à reprendre
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'44px 0', background:'white' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(1.1rem,2.5vw,1.5rem)', fontWeight:800, color:'#0F172A', marginBottom:8 }}>Envie de voir mes projets DevOps ?</h2>
          <p style={{ color:'#64748B', fontSize:14, marginBottom:20 }}>Task Manager, pipeline CI/CD, déploiement AWS…</p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/projets" className="btn-primary">Voir les projets <ArrowRight size={15}/></Link>
            <Link href="/contact" className="btn-outline"><Mail size={15}/> Me contacter</Link>
          </div>
        </div>
      </section>

      <style>{`
        /* ── Hero image positionnée à droite, alignée sur le conteneur texte ── */
        .hero-img-outer {
          position: absolute;
          top: 0;
          /* S'arrête au niveau du bas du padding du container (52px) */
          bottom: 0;
          right: max(16px, calc((100vw - 1280px) / 2 + 16px));
          width: min(44%, 500px);
          pointer-events: none;
        }

        /* ── Badges sous le visage, ancrés à droite du container ── */
        .hero-badges {
          position: absolute;
          bottom: 52px;
          right: max(16px, calc((100vw - 1280px) / 2 + 16px));
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 3;
        }

        .two-col { grid-template-columns: 1fr 1fr; }
        .skills-grid { grid-template-columns: repeat(3, 1fr); }

        @media (max-width: 1000px) {
          .hero-img-outer { width: 42% !important; }
        }
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-img-outer { width: 55% !important; opacity: .25; }
          .hero-badges { display: none !important; }
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          /* On mobile: show as full-width background, very faded */
          .hero-img-outer {
            width: 100% !important;
            right: 0 !important;
            opacity: .15 !important;
          }
        }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </>
  )
}
