'use client'
import { useState, useEffect } from 'react'
import { Download, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { profile } from '@/data/portfolio'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/projets', label: 'Projets' },
  { href: '/cv', label: 'CV' },
  { href: '/monitoring', label: 'Monitoring' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Avant hydratation : rendu neutre sans état actif
  const isActive = (href: string) => mounted && pathname === href

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E2E8F0',
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,.06)' : 'none',
      transition: 'box-shadow .2s',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:60 }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:'#0F172A', letterSpacing:'-0.02em' }}>
          Zina Ibouroi<span style={{ color:'#2563EB' }}>.</span>
        </Link>

        {/* Desktop */}
        <div style={{ display:'flex', gap:4 }} className="hide-mobile">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding:'6px 16px', borderRadius:8, fontSize:14,
              fontWeight: isActive(l.href) ? 700 : 500,
              color: isActive(l.href) ? '#2563EB' : '#475569',
              background: isActive(l.href) ? '#EFF6FF' : 'transparent',
              transition:'all .2s',
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <a href={profile.cv} download
            style={{ display:'flex', alignItems:'center', gap:7, background:'#2563EB', color:'white', padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:700, transition:'background .2s' }}
            className="hide-mobile"
            onMouseOver={e => e.currentTarget.style.background='#1d4ed8'}
            onMouseOut={e => e.currentTarget.style.background='#2563EB'}
          >
            <Download size={14}/> Télécharger CV
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="hide-desktop"
            style={{ background:'none', border:'none', cursor:'pointer', color:'#0F172A', padding:4 }}>
            {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ background:'white', borderTop:'1px solid #E2E8F0', padding:'12px 20px 16px' }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              display:'block', padding:'11px 14px', borderRadius:8, fontSize:15, fontWeight:600, marginBottom:4,
              color: isActive(l.href) ? '#2563EB' : '#475569',
              background: isActive(l.href) ? '#EFF6FF' : 'transparent',
            }}>
              {l.label}
            </Link>
          ))}
          <a href={profile.cv} download style={{ display:'flex', alignItems:'center', gap:8, marginTop:8, padding:'11px 14px', background:'#2563EB', color:'white', borderRadius:8, fontWeight:700, fontSize:14 }}>
            <Download size={15}/> Télécharger le CV
          </a>
        </div>
      )}
    </nav>
  )
}
