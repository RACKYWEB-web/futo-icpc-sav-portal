import { useState } from 'react'
import { sectorEffects } from '../data/mockData.js'

// Illustrative diversion weights per sector (for storytelling only, not real data)
const diversion = {
  education: 0.34, healthcare: 0.29, infrastructure: 0.41,
  economy: 0.22, employment: 0.31, security: 0.18, governance: 0.26, youth: 0.37,
}

export default function PriceOfCorruption() {
  const [leaking, setLeaking] = useState(false)
  const [active, setActive] = useState('education')
  const activeSector = sectorEffects.find((s) => s.id === active)

  return (
    <div className="rounded-3xl bg-navy-950 text-white p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <div className="eyebrow text-gold-300/80">The Price of Corruption</div>
          <h3 className="font-display text-2xl md:text-3xl font-semibold mt-2">Follow the funds. See what changes.</h3>
          <p className="text-white/50 text-sm mt-2 max-w-xl">Public funds are meant to flow fully into the services students and communities depend on. Toggle the switch to see how diversion reduces what actually arrives.</p>
        </div>
        <button
          onClick={() => setLeaking((v) => !v)}
          className={`shrink-0 flex items-center gap-3 rounded-full px-4 py-2.5 border transition-colors ${leaking ? 'border-gold-400/60 bg-gold-500/10' : 'border-white/20 bg-white/5'}`}
        >
          <span className={`w-9 h-5 rounded-full relative transition-colors ${leaking ? 'bg-gold-500' : 'bg-white/20'}`}>
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${leaking ? 'left-4' : 'left-0.5'}`} />
          </span>
          <span className="text-sm font-medium">{leaking ? 'Showing diversion' : 'Show diversion'}</span>
        </button>
      </div>

      {/* Source node */}
      <div className="relative flex flex-col items-center mb-6">
        <div className="glass-dark rounded-2xl px-6 py-3 font-mono text-sm tracking-wide">PUBLIC FUNDS · 100%</div>
        <svg width="2" height="28" className="my-1"><line x1="1" y1="0" x2="1" y2="28" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="4 4" /></svg>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {sectorEffects.map((s) => {
          const loss = leaking ? diversion[s.id] : 0
          const delivered = Math.round((1 - loss) * 100)
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`text-left rounded-xl p-4 border transition-all duration-300 ${isActive ? 'border-gold-400/70 bg-white/[0.07]' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'}`}
            >
              <div className="text-xs font-mono text-white/50 mb-2">{s.label}</div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700 ease-out"
                  style={{ width: `${delivered}%` }}
                />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-display text-lg font-semibold tabular-nums">{delivered}%</span>
                {loss > 0 && <span className="text-[11px] font-mono text-gold-300/70">−{Math.round(loss * 100)}%</span>}
              </div>
            </button>
          )
        })}
      </div>

      <div className="relative mt-8 rounded-2xl bg-white/[0.04] border border-white/10 p-5">
        <div className="text-xs font-mono text-gold-300/70 uppercase tracking-wide mb-2">{activeSector.label} · impact</div>
        <p className="text-sm text-white/70 leading-relaxed">{activeSector.note}</p>
      </div>
    </div>
  )
}
