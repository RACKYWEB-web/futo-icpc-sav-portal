import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo.jsx'
import { useApp } from '../context/AppContext.jsx'

const nav = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/members', label: 'Members' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/campaigns', label: 'Campaigns' },
  { to: '/admin/events', label: 'Events' },
]

export default function AdminLayout({ children }) {
  const { logout, currentUser } = useApp()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleLogout = () => { logout(); navigate('/') }

  const SidebarContent = (
    <>
      <div className="px-5 py-6 border-b border-white/10"><Logo light /><span className="badge-pill bg-gold-500/15 text-gold-300 mt-3">Admin</span></div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/55 hover:text-white hover:bg-white/5'}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-white/55 hover:text-white hover:bg-white/5">Logout</button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-mist flex">
      <aside className="hidden lg:flex flex-col w-64 bg-navy-950 shrink-0">{SidebarContent}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-navy-950 flex flex-col">{SidebarContent}</aside>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-ink-900/[0.06] h-16 flex items-center justify-between px-5 lg:px-8">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M2 5h18M2 11h18M2 17h18" stroke="#0a1628" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          <div className="hidden lg:block font-display font-medium text-navy-950">Admin Console</div>
          <span className="text-sm text-ink-500">{currentUser?.fullName}</span>
        </div>
        <main className="px-5 lg:px-8 py-8 max-w-6xl">{children}</main>
      </div>
    </div>
  )
}
