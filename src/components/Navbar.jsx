import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import { useApp } from '../context/AppContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/education', label: 'Anti-Corruption' },
  { to: '/resources', label: 'Resources' },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/events', label: 'Events' },
  { to: '/report', label: 'Reports' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { currentUser } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [navigate])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(10,22,40,0.06)]' : 'bg-white/70 backdrop-blur-sm'}`}>
      <div className="container-page section-pad flex items-center justify-between h-16">
        <Link to="/" aria-label="FUTO ICPC/SAV home"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) =>
              `text-sm font-medium transition-colors ${isActive ? 'text-navy-900' : 'text-ink-700 hover:text-navy-900'}`
            }>{l.label}</NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <Link to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} className="btn-navy">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-ink-700 hover:text-navy-900 px-3">Login</Link>
              <Link to="/register" className="btn-gold">Join SAV</Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className={`absolute block h-[1.5px] w-6 bg-navy-950 transition-all duration-300 ${open ? 'rotate-45' : '-translate-y-2'}`} />
          <span className={`absolute block h-[1.5px] w-6 bg-navy-950 transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute block h-[1.5px] w-6 bg-navy-950 transition-all duration-300 ${open ? '-rotate-45' : 'translate-y-2'}`} />
        </button>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-[560px]' : 'max-h-0'}`}>
        <nav className="flex flex-col gap-1 px-6 pb-6" aria-label="Mobile">
          {links.map((l, i) => (
            <NavLink key={l.to} to={l.to} style={{ transitionDelay: `${i * 30}ms` }}
              className={({ isActive }) => `py-2.5 text-sm font-medium border-b border-ink-900/[0.05] ${isActive ? 'text-navy-900' : 'text-ink-700'}`}>
              {l.label}
            </NavLink>
          ))}
          <div className="flex gap-3 pt-4">
            {currentUser ? (
              <Link to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} className="btn-navy w-full">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn-outline-dark w-full">Login</Link>
                <Link to="/register" className="btn-gold w-full">Join SAV</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
