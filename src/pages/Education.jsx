import { useState } from 'react'
import { sectorEffects, globalFacts } from '../data/mockData.js'
import { SectionHeader } from '../components/Cards.jsx'

const forms = [
  { name: 'Bribery', note: 'Offering, giving, receiving or soliciting something of value to influence an action.' },
  { name: 'Fraud', note: 'Deception carried out for unlawful or unfair gain.' },
  { name: 'Embezzlement', note: 'Misappropriating funds or property entrusted to one\u2019s care.' },
  { name: 'Nepotism', note: 'Favoring relatives or friends, especially in appointments, regardless of merit.' },
  { name: 'Favoritism', note: 'Unfair preferential treatment that sidelines merit-based decisions.' },
  { name: 'Extortion', note: 'Obtaining something through coercion or threats.' },
  { name: 'Abuse of office', note: 'Using an official position for personal benefit rather than public duty.' },
  { name: 'Examination malpractice', note: 'Dishonest practices that undermine fair assessment of learning.' },
  { name: 'Procurement fraud', note: 'Manipulating contracting or purchasing processes for private gain.' },
  { name: 'Money laundering', note: 'Disguising the origins of illegally obtained funds.' },
  { name: 'Conflict of interest', note: 'Personal interests improperly influencing official decisions.' },
  { name: 'Misuse of public resources', note: 'Using public funds, time or property for private purposes.' },
]

export default function Education() {
  const [sector, setSector] = useState(sectorEffects[0].id)
  const active = sectorEffects.find((s) => s.id === sector)

  return (
    <div>
      <div className="container-page section-pad py-16 md:py-20">
        <SectionHeader eyebrow="Anti-corruption education" title="What is corruption?" sub="In simple terms: corruption is the abuse of entrusted power — public or private — for personal gain, at the expense of fairness, trust and shared resources." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {forms.map((f) => (
            <div key={f.name} className="card p-5">
              <div className="font-display font-semibold text-navy-950">{f.name}</div>
              <p className="text-sm text-ink-500 mt-2 leading-relaxed">{f.note}</p>
            </div>
          ))}
        </div>

        <SectionHeader eyebrow="Effects of corruption in Nigeria" title="How it reaches everyday life" sub="Select a sector to see how diverted resources and weakened accountability can play out. These are illustrative, general patterns — not claims about specific incidents." />
        <div className="flex flex-wrap gap-2 mb-6">
          {sectorEffects.map((s) => (
            <button key={s.id} onClick={() => setSector(s.id)}
              className={`badge-pill px-4 py-2 text-sm transition-colors ${sector === s.id ? 'bg-navy-950 text-white' : 'bg-navy-900/[0.05] text-navy-800 hover:bg-navy-900/10'}`}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="card p-8 mb-20">
          <div className="eyebrow mb-2">{active.label}</div>
          <p className="font-display text-xl text-navy-950 leading-snug max-w-2xl">{active.note}</p>
        </div>

        <SectionHeader eyebrow="Corruption around the world" title="A global challenge" sub="Corruption affects economic development, poverty, public services, governance, human rights and public trust worldwide. We avoid unsupported claims about specific countries — see sources below for verified data." />
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {globalFacts.map((f, i) => (
            <div key={i} className="card p-5 flex gap-3">
              <span className="font-mono text-gold-600 text-sm shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm text-ink-700 leading-relaxed">{f}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-mist border border-ink-900/[0.06] p-5 text-xs text-ink-500">
          <span className="font-semibold text-ink-700">Sources & references: </span>
          Transparency International (transparency.org), United Nations Office on Drugs and Crime (unodc.org), World Bank (worldbank.org). Verify current figures directly with these sources before citing them elsewhere.
        </div>
      </div>
    </div>
  )
}
