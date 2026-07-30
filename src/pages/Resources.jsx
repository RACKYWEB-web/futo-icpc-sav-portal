import { useState } from 'react'
import { resources, faqs } from '../data/mockData.js'
import { SectionHeader } from '../components/Cards.jsx'

export default function Resources() {
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const filtered = resources.filter((r) => (r.title + r.category + r.type).toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="container-page section-pad py-16 md:py-20">
      <SectionHeader eyebrow="Media & resource center" title="Educational materials, in one place" sub="Articles, videos, infographics and documents on integrity and anti-corruption." />
      <input
        value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder="Search resources…"
        className="w-full max-w-md mb-8 rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {filtered.map((r) => (
          <div key={r.id} className="card card-hover p-5">
            <span className="badge-pill bg-navy-900/[0.05] text-navy-800">{r.type}</span>
            <h3 className="font-display font-semibold text-navy-950 mt-3">{r.title}</h3>
            <p className="text-xs text-ink-500 mt-1 font-mono">{r.category}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-ink-500 text-sm">No resources match &ldquo;{query}&rdquo;.</p>}
      </div>

      <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
      <div className="max-w-2xl space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="card overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 flex justify-between items-center gap-4">
              <span className="font-medium text-navy-950">{f.q}</span>
              <span className={`transition-transform ${openFaq === i ? 'rotate-45' : ''} text-gold-600 text-xl leading-none`}>+</span>
            </button>
            {openFaq === i && <p className="px-5 pb-4 text-sm text-ink-500 leading-relaxed">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
