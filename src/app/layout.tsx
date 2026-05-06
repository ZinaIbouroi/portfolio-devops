import type { Metadata } from 'next'
import type {} from './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClientOnly from '@/components/ClientOnly'

export const metadata: Metadata = {
  title: 'Zina Ibouroi – Ingénieure DevOps',
  description: "Portfolio de Zina Ibouroi, Ingénieure DevOps avec 3 ans d'expérience. Spécialisée en Ansible, CI/CD, Docker, Kubernetes et AWS.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-24KBE0T9HQ"/>
      <script dangerouslySetInnerHTML={{ __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-24KBE0T9HQ');
      `}}/>
      </head>
      <body suppressHydrationWarning>
        <ClientOnly>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  )
}
