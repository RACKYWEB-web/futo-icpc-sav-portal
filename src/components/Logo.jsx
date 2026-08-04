const assetPath = (path) => `${import.meta.env.BASE_URL}images/gallery/${path}`

export default function Logo({ light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={assetPath('icpc-logo.jpg')} alt="ICPC" className="w-8 h-8 object-contain shrink-0" />
      <div className="leading-none">
        <div className={`font-display font-semibold text-[15px] tracking-tight ${light ? 'text-white' : 'text-navy-950'}`}>FUTO ICPC<span className="text-gold-500">/</span>SAV</div>
        <div className={`font-mono text-[9px] tracking-[0.16em] uppercase ${light ? 'text-white/50' : 'text-ink-500'}`}>Student Anti-Corruption Vanguard</div>
      </div>
    </div>
  )
}