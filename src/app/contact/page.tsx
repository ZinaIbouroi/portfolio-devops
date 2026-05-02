'use client'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, Briefcase, Globe, Clock } from 'lucide-react'
import { profile } from '@/data/portfolio'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    emailjs.send(
      'service_ses477v',
      'template_h6wdepx',
      {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      'XEba1Gz0VE398dh7K'
    )
    .then(() => {
      setLoading(false)
      setSent(true)
    })
    .catch(() => {
      setLoading(false)
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    })
  }

  const inp: React.CSSProperties = {
    width:'100%', padding:'11px 14px', border:'1.5px solid #E2E8F0',
    borderRadius:9, fontSize:14, color:'#0F172A', background:'white',
    outline:'none', transition:'border-color .2s', fontFamily:'inherit',
  }

  return (
    <div style={{ minHeight:'80vh' }}>

      {/* ── En-tête sombre enrichie ── */}
      <div className='contact-header' style={{ background:'linear-gradient(135deg,#0F172A 0%,#1E3A5F 60%,#1d4ed8 100%)', padding:'50px 0 44px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:280, height:280, background:'rgba(37,99,235,.14)', borderRadius:'50%', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-70, left:-30, width:220, height:220, background:'rgba(37,99,235,.09)', borderRadius:'50%', pointerEvents:'none' }}/>

        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#93C5FD', marginBottom:8 }}>Parlons-en</div>
            <h1 style={{ fontSize:'clamp(1.7rem,3.5vw,2.4rem)', fontWeight:900, color:'white', marginBottom:10, letterSpacing:'-0.02em' }}>
              Travaillons ensemble
            </h1>
            <p style={{ color:'#94A3B8', fontSize:14, lineHeight:1.7, maxWidth:480 }}>
              Ingénieure DevOps disponible immédiatement. Ouverte à toute proposition qui correspond à mon profil.
            </p>
          </div>

          {/* 3 cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }} className="header-cards">
            {[
              { icon:<Briefcase size={17}/>, title:'Type de poste', items:['CDI en interne', 'Mission'], color:'#3B82F6' },
              { icon:<Globe size={17}/>, title:'Mobilité', items:['Île-de-France', 'Full remote', 'Hybride'], color:'#10B981' },
              { icon:<Clock size={17}/>, title:'Disponibilité', items:['Immédiate', 'Après le processus de recrutement'], color:'#F59E0B' },
            ].map(c=>(
              <div key={c.title} style={{ background:'rgba(255,255,255,.07)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.11)', borderRadius:12, padding:'14px 16px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:9 }}>
                  <div style={{ color:c.color }}>{c.icon}</div>
                  <span style={{ fontWeight:700, fontSize:13, color:'white' }}>{c.title}</span>
                </div>
                {c.items.map(item=>(
                  <div key={item} style={{ display:'flex', gap:7, alignItems:'center', marginBottom:5 }}>
                    <CheckCircle size={11} style={{ color:c.color, flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:'#CBD5E1' }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Corps ── */}
      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:24, alignItems:'start' }} className="contact-grid">

            {/* Gauche */}
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {/* Dispo */}
              <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:12, padding:16 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <span className="pulse-dot" style={{ width:8, height:8, borderRadius:'50%', background:'#10B981', display:'inline-block' }}/>
                  <span style={{ fontWeight:800, fontSize:13, color:'#15803D' }}>Disponible immédiatement</span>
                </div>
                <p style={{ fontSize:12, color:'#475569', lineHeight:1.6 }}>
                  Je suis disponible dès la fin du processus de recrutement.
                </p>
              </div>

              {/* Pourquoi me contacter */}
              <div className="card" style={{ padding:'16px 18px' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#0F172A', marginBottom:10 }}>💡 Pourquoi me contacter ?</div>
                {[
                  { emoji:'⚙️', text:'Automatiser vos déploiements avec Ansible et CI/CD' },
                  { emoji:'🐳', text:'Conteneuriser vos applications (Docker, Kubernetes)' },
                  { emoji:'☁️', text:'Construire votre infrastructure AWS avec Terraform' },
                  { emoji:'🔄', text:'Fiabiliser vos processus de mise en production' },
                ].map(r=>(
                  <div key={r.text} style={{ display:'flex', gap:9, marginBottom:8, alignItems:'flex-start' }}>
                    <span style={{ fontSize:15, flexShrink:0 }}>{r.emoji}</span>
                    <span style={{ fontSize:12, color:'#475569', lineHeight:1.5 }}>{r.text}</span>
                  </div>
                ))}
              </div>

              {/* Coordonnées */}
              {[
                { icon:<Mail size={16}/>, label:'Email', val:profile.email, href:`mailto:${profile.email}`, color:'#2563EB' },
                { icon:<Phone size={16}/>, label:'Téléphone', val:profile.phone, href:`tel:${profile.phone}`, color:'#10B981' },
                { icon:<MapPin size={16}/>, label:'Localisation', val:profile.location, color:'#7C3AED' },
                { icon:<Github size={16}/>, label:'GitHub', val:'ZinaIbouroi', href:profile.github, color:'#0F172A' },
                { icon:<Linkedin size={16}/>, label:'LinkedIn', val:'Zina Ibouroi', href:profile.linkedin, color:'#0A66C2' },
              ].map(c=>(
                <div key={c.label} className="card" style={{ padding:'11px 16px', display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:`${c.color}12`, display:'flex', alignItems:'center', justifyContent:'center', color:c.color, flexShrink:0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize:10, color:'#94A3B8', fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em' }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:12, fontWeight:600, color:c.color }}>{c.val}</a>
                      : <span style={{ fontSize:12, fontWeight:600, color:'#0F172A' }}>{c.val}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Droite – formulaire */}
            <div className="card" style={{ padding:26 }}>
              {sent ? (
                <div style={{ textAlign:'center', padding:'40px 20px' }}>
                  <CheckCircle size={44} style={{ color:'#10B981', marginBottom:14 }}/>
                  <h2 style={{ fontSize:19, fontWeight:800, color:'#0F172A', marginBottom:8 }}>Message envoyé !</h2>
                  <p style={{ color:'#64748B', fontSize:13 }}>Votre client mail s&apos;est ouvert. Je vous répondrai rapidement.</p>
                  <button onClick={()=>{setSent(false);setForm({name:'',email:'',subject:'',message:''})}}
                    className="btn-outline" style={{ marginTop:18, fontSize:13 }}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:13 }}>
                  <div>
                    <h2 style={{ fontSize:17, fontWeight:800, color:'#0F172A', marginBottom:3 }}>Envoyer un message</h2>
                    <p style={{ fontSize:12, color:'#64748B' }}>
                      Ouvre votre client mail · Ou écrivez à{' '}
                      <a href={`mailto:${profile.email}`} style={{ color:'#2563EB', fontWeight:600 }}>{profile.email}</a>
                    </p>
                  </div>

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:'#475569', display:'block', marginBottom:4 }}>Nom *</label>
                      <input required value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}
                        placeholder="Votre nom" style={inp}
                        onFocus={e=>e.target.style.borderColor='#2563EB'} onBlur={e=>e.target.style.borderColor='#E2E8F0'}/>
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:'#475569', display:'block', marginBottom:4 }}>Email *</label>
                      <input required type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}
                        placeholder="votre@email.com" style={inp}
                        onFocus={e=>e.target.style.borderColor='#2563EB'} onBlur={e=>e.target.style.borderColor='#E2E8F0'}/>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize:12, fontWeight:600, color:'#475569', display:'block', marginBottom:4 }}>Objet</label>
                    <input value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))}
                      placeholder="Ex: Opportunité DevOps CDI / Mission Ansible" style={inp}
                      onFocus={e=>e.target.style.borderColor='#2563EB'} onBlur={e=>e.target.style.borderColor='#E2E8F0'}/>
                    {/* Suggestions rapides */}
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:7 }}>
                      {['Opportunité CDI', 'Mission', 'Question sur mon profil', 'Collaboration'].map(s=>(
                        <button key={s} type="button" onClick={()=>setForm(p=>({...p,subject:s}))}
                          style={{ background:form.subject===s?'#EFF6FF':'#F8FAFC', border:`1px solid ${form.subject===s?'#BFDBFE':'#E2E8F0'}`, color:form.subject===s?'#2563EB':'#64748B', borderRadius:5, padding:'3px 9px', fontSize:11, fontWeight:600, cursor:'pointer', transition:'all .2s' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
                    <label style={{ fontSize:12, fontWeight:600, color:'#475569', display:'block', marginBottom:4 }}>Message *</label>
                    <textarea required value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                      placeholder="Décrivez votre projet, votre besoin ou votre opportunité…"
                      style={{ ...inp, resize:'vertical', height:220, minHeight:180 }}
                      onFocus={e=>e.target.style.borderColor='#2563EB'} onBlur={e=>e.target.style.borderColor='#E2E8F0'}/>
                  </div>

                  <button type="submit" disabled={loading} style={{
                    display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                    background:loading?'#94A3B8':'#2563EB', color:'white',
                    padding:'13px 24px', borderRadius:9, fontSize:14, fontWeight:700,
                    border:'none', cursor:loading?'not-allowed':'pointer',
                    boxShadow:'0 4px 14px rgba(37,99,235,.28)', transition:'background .2s', width:'100%',
                  }}
                    onMouseOver={e=>{if(!loading)e.currentTarget.style.background='#1d4ed8'}}
                    onMouseOut={e=>{if(!loading)e.currentTarget.style.background='#2563EB'}}
                  >
                    <Send size={15}/>
                    {loading ? 'Ouverture du mail…' : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .header-cards { grid-template-columns: repeat(3, 1fr); }
        .contact-grid { grid-template-columns: 1fr 1.5fr; }
        @media (max-width: 900px) {
          .header-cards { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .header-cards { grid-template-columns: 1fr !important; }
          /* Header compact mobile */
          .contact-header { padding: 28px 0 24px !important; }
          .contact-header h1 { font-size: 1.5rem !important; margin-bottom: 8px !important; }
          .contact-header p { font-size: 13px !important; margin-bottom: 16px !important; }
          .contact-header .header-cards { display: none !important; }
        }
      `}</style>
    </div>
  )
}
