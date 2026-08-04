import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70 mt-24">
      <div className="container-page section-pad py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 font-display text-lg text-white">Shun Corruption — It&rsquo;s Evil</p>
          <p className="mt-3 text-sm max-w-xs">A student anti-corruption initiative at the Federal University of Technology, Owerri — not an official ICPC portal.</p>
        </div>
        <div>
          <div className="eyebrow text-white/40 mb-4">Quick links</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/actu" className="hover:text-white">ACTU</Link></li>
            <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
            <li><Link to="/academy" className="hover:text-white">Courses</Link></li>
            <li><Link to="/campaigns" className="hover:text-white">Campaigns</Link></li>
            <li><Link to="/events" className="hover:text-white">Events</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-white/40 mb-4">Vanguard</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/report" className="hover:text-white">Report an issue</Link></li>
            <li><Link to="/pledge" className="hover:text-white">Take the pledge</Link></li>
            <li><Link to="/verify" className="hover:text-white">Verify a certificate</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow text-white/40 mb-4">Legal</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/privacy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page section-pad py-6 flex flex-col sm:flex-row gap-2 justify-between text-xs text-white/40">
          <span>&copy; {new Date().getFullYear()} FUTO ICPC/SAV Student Vanguard. All rights reserved.</span>
          <span>Federal University of Technology, Owerri</span>
        </div>
        <div className="container-page section-pad pb-6 flex justify-center">
          <span className="inline-flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.16em] text-gold-400/70">
            <span className="w-1 h-1 rounded-full bg-gold-400/60" />
            Portal crafted by Operation Edward Prince — Class of 2029
            <span className="w-1 h-1 rounded-full bg-gold-400/60" />
          </span>
        </div>
      </div>
    </footer>
  )
}