'use client'
import { Download, ExternalLink, MapPin, Mail, Phone, Github, Linkedin, CheckCircle } from 'lucide-react'
import { profile, experience, skills, certifications, missionBNP } from '@/data/portfolio'

const skillIcons: Record<string, string> = {
  devops:'⚙️', docker:'🐳', cloud:'☁️', code:'🐍', monitoring:'📊', agile:'🔄',
}
const expIcons: Record<string, string> = {
  code:'💻', building:'🏢', school:'🎓', globe:'🌍', heart:'💝',
}

export default function CVPage() {
  return (
    <div style={{ minHeight:'80vh', background:'#F8FAFC' }}>

      {/* ── En-tête sombre style Projets/Contact ── */}
      <div style={{ background:'linear-gradient(135deg,#0F172A 0%,#1e3a5f 55%,#1d4ed8 100%)', padding:'48px 0 40px', position:'relative', overflow:'hidden' }}>
        {/* Décos */}
        <div style={{ position:'absolute', top:-60, right:-60, width:260, height:260, background:'rgba(37,99,235,.12)', borderRadius:'50%', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-50, left:40, width:180, height:180, background:'rgba(16,185,129,.07)', borderRadius:'50%', pointerEvents:'none' }}/>

        <div className="container" style={{ position:'relative', zIndex:2, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#93C5FD', marginBottom:8 }}>Curriculum Vitae</div>
            <h1 style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:900, color:'white', marginBottom:8, letterSpacing:'-0.02em' }}>CV</h1>
            <p style={{ fontSize:14, color:'#94A3B8', lineHeight:1.6, maxWidth:400 }}>
              Mon parcours complet : expériences, compétences et formations.
            </p>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <a href={profile.cv} download
              style={{ display:'flex', alignItems:'center', gap:8, background:'white', color:'#0F172A', padding:'11px 20px', borderRadius:9, fontSize:13, fontWeight:700, transition:'all .2s' }}
              onMouseOver={e => { e.currentTarget.style.background='#EFF6FF'; e.currentTarget.style.color='#2563EB' }}
              onMouseOut={e => { e.currentTarget.style.background='white'; e.currentTarget.style.color='#0F172A' }}
            >
              <Download size={15}/> Télécharger le PDF
            </a>
            <a href={profile.cv} target="_blank" rel="noopener noreferrer"
              style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,.1)', color:'white', padding:'11px 20px', borderRadius:9, fontSize:13, fontWeight:600, border:'1px solid rgba(255,255,255,.2)', transition:'all .2s', backdropFilter:'blur(6px)' }}
              onMouseOver={e => { e.currentTarget.style.background='rgba(255,255,255,.18)' }}
              onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,.1)' }}
            >
              <ExternalLink size={14}/> Ouvrir dans un onglet
            </a>
          </div>
        </div>
      </div>

      {/* ── Corps : 2 colonnes ── */}
      <div className="container" style={{ padding:'28px 16px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 340px', gap:20, alignItems:'start' }} className="cv-grid">

          {/* ── Colonne gauche : PDF viewer ── */}
          <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:14, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,.05)' }}>
            {/* Fausse barre de navigateur */}
            <div style={{ background:'#F8FAFC', borderBottom:'1px solid #E2E8F0', padding:'8px 14px', display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:'#FC5C65' }}/>
              <div style={{ width:10, height:10, borderRadius:'50%', background:'#FED330' }}/>
              <div style={{ width:10, height:10, borderRadius:'50%', background:'#26de81' }}/>
              <span style={{ fontSize:12, color:'#94A3B8', marginLeft:8 }}>cv-zina-ibouroi.pdf</span>
            </div>
            {/* iFrame PDF */}
            <iframe
              src="/cv-zina-ibouroi.pdf"
              style={{ width:'100%', height:780, border:'none', display:'block' }}
              title="CV Zina Ibouroi"
            />
          </div>

          {/* ── Colonne droite : résumé ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>

            {/* Identité */}
            <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:20, boxShadow:'0 2px 8px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize:17, fontWeight:800, color:'#0F172A', marginBottom:2 }}>{profile.name}</div>
              <div style={{ fontSize:13, fontWeight:700, color:'#2563EB', marginBottom:14 }}>{profile.title}</div>
              {[
                { icon:<Mail size={13}/>, val:profile.email, href:`mailto:${profile.email}` },
                { icon:<Phone size={13}/>, val:profile.phone, href:`tel:${profile.phone}` },
                { icon:<MapPin size={13}/>, val:profile.location },
                { icon:<Github size={13}/>, val:'GitHub', href:profile.github },
                { icon:<Linkedin size={13}/>, val:'LinkedIn', href:profile.linkedin },
              ].map((r,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, color:'#475569', fontSize:12 }}>
                  <span style={{ color:'#2563EB', flexShrink:0 }}>{r.icon}</span>
                  {r.href
                    ? <a href={r.href} target="_blank" rel="noopener noreferrer" style={{ color:'#2563EB', fontWeight:500 }}>{r.val}</a>
                    : <span>{r.val}</span>
                  }
                </div>
              ))}
              <div style={{ marginTop:12, padding:'7px 12px', background:'#F0FDF4', border:'1px solid #BBF7D0', borderRadius:7, fontSize:11, fontWeight:700, color:'#15803D', textAlign:'center' }}>
                ✅ Disponible immédiatement
              </div>
            </div>

            {/* Compétences clés */}
            <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:18, boxShadow:'0 2px 8px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#0F172A', marginBottom:12 }}>Compétences clés</div>
              {skills.slice(0,4).map(s => (
                <div key={s.category} style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                    <span style={{ fontSize:13 }}>{skillIcons[s.icon]}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:'#0F172A' }}>{s.category}</span>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                    {s.items.slice(0,4).map(item => (
                      <span key={item} style={{ background:`${s.color}10`, color:s.color, border:`1px solid ${s.color}25`, borderRadius:4, padding:'2px 7px', fontSize:10, fontWeight:600 }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:18, boxShadow:'0 2px 8px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#0F172A', marginBottom:10 }}>Certifications</div>
              {certifications.map(c => (
                <div key={c.name} style={{ display:'flex', gap:8, marginBottom:8, alignItems:'flex-start' }}>
                  <span style={{ fontSize:13, flexShrink:0 }}>{c.done ? '✅' : '📚'}</span>
                  <div>
                    <div style={{ fontSize:11, fontWeight:600, color:'#0F172A', lineHeight:1.3 }}>{c.name}</div>
                    <div style={{ fontSize:10, color:'#64748B' }}>{c.org} · {c.year}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expérience récente */}
            <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:18, boxShadow:'0 2px 8px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'#0F172A', marginBottom:12 }}>Expérience récente</div>
              {experience.slice(0,4).map((e, i) => (
                <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                  <div style={{ width:26, height:26, borderRadius:7, background:e.current?'#2563EB':e.pause?'#FDF2F8':'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }}>
                    <span style={{ filter:e.current?'brightness(10)':'none' }}>{expIcons[e.icon]}</span>
                  </div>
                  <div>
                    <div style={{ fontSize:10, color:e.pause?'#BE185D':'#2563EB', fontWeight:700 }}>{e.period}</div>
                    <div style={{ fontSize:11, fontWeight:700, color:'#0F172A', lineHeight:1.3 }}>{e.title}</div>
                    {e.company && <div style={{ fontSize:10, color:'#64748B' }}>{e.company}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Version mobile : juste les boutons + infos ── */}
        <div className="cv-mobile-only" style={{ display:'none', flexDirection:'column', gap:14 }}>
          {/* CTA download */}
          <div style={{ background:'#EFF6FF', border:'1.5px solid #BFDBFE', borderRadius:14, padding:24, textAlign:'center' }}>
            <div style={{ fontSize:36, marginBottom:12 }}>📄</div>
            <div style={{ fontWeight:700, color:'#0F172A', fontSize:15, marginBottom:6 }}>Mon CV en PDF</div>
            <p style={{ color:'#64748B', fontSize:13, marginBottom:18, lineHeight:1.5 }}>
              Téléchargez ou ouvrez le PDF pour le consulter dans son intégralité.
            </p>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              <a href={profile.cv} download
                style={{ display:'flex', alignItems:'center', gap:7, background:'#2563EB', color:'white', padding:'11px 20px', borderRadius:9, fontSize:14, fontWeight:700 }}>
                <Download size={15}/> Télécharger
              </a>
              <a href={profile.cv} target="_blank" rel="noopener noreferrer"
                style={{ display:'flex', alignItems:'center', gap:7, background:'white', color:'#0F172A', padding:'11px 20px', borderRadius:9, fontSize:14, fontWeight:600, border:'1.5px solid #E2E8F0' }}>
                <ExternalLink size={14}/> Ouvrir
              </a>
            </div>
          </div>

          {/* Résumé identité */}
          <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:20 }}>
            <div style={{ fontSize:16, fontWeight:800, color:'#0F172A', marginBottom:2 }}>{profile.name}</div>
            <div style={{ fontSize:13, fontWeight:700, color:'#2563EB', marginBottom:12 }}>{profile.title}</div>
            {[
              { icon:<Mail size={14}/>, val:profile.email, href:`mailto:${profile.email}` },
              { icon:<Phone size={14}/>, val:profile.phone, href:`tel:${profile.phone}` },
              { icon:<MapPin size={14}/>, val:profile.location },
            ].map((r,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7, fontSize:13, color:'#475569' }}>
                <span style={{ color:'#2563EB' }}>{r.icon}</span>
                {r.href ? <a href={r.href} style={{ color:'#2563EB', fontWeight:500 }}>{r.val}</a> : <span>{r.val}</span>}
              </div>
            ))}
          </div>

          {/* Compétences mobile */}
          <div style={{ background:'white', border:'1.5px solid #E2E8F0', borderRadius:12, padding:18 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#0F172A', marginBottom:12 }}>Compétences clés</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {skills.flatMap(s => s.items).map(item => (
                <span key={item} style={{ background:'#EFF6FF', color:'#2563EB', border:'1px solid #BFDBFE', borderRadius:5, padding:'3px 9px', fontSize:12, fontWeight:600 }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cv-grid { grid-template-columns: 1fr 340px; }
        .cv-mobile-only { display: none; }

        @media (max-width: 900px) {
          .cv-grid { grid-template-columns: 1fr 300px !important; }
        }
        @media (max-width: 700px) {
          /* Sur mobile : masquer le viewer PDF, afficher la version simplifiée */
          .cv-grid { display: none !important; }
          .cv-mobile-only { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
