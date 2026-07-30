export default function Logo({ light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path d="M17 1.5L31 6.5V16C31 24.5 25.5 30.5 17 32.5C8.5 30.5 3 24.5 3 16V6.5L17 1.5Z"
          stroke={light ? '#e8c766' : '#c9a338'} strokeWidth="1.6" fill={light ? 'rgba(232,199,102,0.08)' : 'rgba(201,163,56,0.06)'} />
        <path d="M11 17.2L15 21L23.5 12" stroke={light ? '#e8c766' : '#0a1628'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="leading-none">
        <div className={`font-display font-semibold text-[15px] tracking-tight ${light ? 'text-white' : 'text-navy-950'}`}>FUTO ICPC<span className="text-gold-500">/</span>SAV</div>
        <div className={`font-mono text-[9px] tracking-[0.16em] uppercase ${light ? 'text-white/50' : 'text-ink-500'}`}>Student Anti-Corruption Vanguard</div>
      </div>
    </div>
  )
}
