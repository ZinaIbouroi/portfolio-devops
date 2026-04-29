'use client'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { profile } from '@/data/portfolio'

export default function Footer() {
  return (
    <footer style={{ background:'#0F172A', color:'white', padding:'32px 0' }}>
      <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div>
          <div style={{ fontWeight:800, fontSize:16, marginBottom:2 }}>Zina Ibouroi<span style={{ color:'#2563EB' }}>.</span></div>
          <div style={{ color:'#64748B', fontSize:13 }}>Ingénieure DevOps · La Norville (91290)</div>
        </div>
        <div style={{ color:'#475569', fontSize:13 }}>© 2026 Ibouroi Zina Habiba</div>
        <div style={{ display:'flex', gap:10 }}>
          {[
            { icon: <Github size={18}/>, href: profile.github },
            { icon: <Linkedin size={18}/>, href: profile.linkedin },
            { icon: <Mail size={18}/>, href: `mailto:${profile.email}` },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              width:36, height:36, borderRadius:8, background:'#1E293B', color:'#94A3B8',
              display:'flex', alignItems:'center', justifyContent:'center',
              border:'1px solid #334155', transition:'all .2s',
            }}
              onMouseOver={e => { e.currentTarget.style.color='white'; e.currentTarget.style.borderColor='#2563EB' }}
              onMouseOut={e => { e.currentTarget.style.color='#94A3B8'; e.currentTarget.style.borderColor='#334155' }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
