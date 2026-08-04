import { SectionHeader } from '../components/Cards.jsx'
import { leadership, updates, generalsByYear, aboutUnit } from '../data/mockData.js'

const values = ['Integrity', 'Accountability', 'Transparency', 'Justice', 'Responsibility', 'Leadership', 'Service']

export default function About() {
  return (
    <div className="container-page section-pad py-16 md:py-24">
      <SectionHeader eyebrow="About FUTO ICPC/SAV" title="A student initiative for a culture of integrity" sub="FUTO ICPC/SAV is the Student Anti-Corruption Vanguard at the Federal University of Technology, Owerri — inspired by ICPC's mandate, led by students, for students." />

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="card p-6">
          <div className="font-mono text-xs uppercase tracking-wide text-gold-600 mb-2">Nationally — ICPC</div>
          <p className="text-sm text-ink-700 leading-relaxed">{aboutUnit.icpcBlurb}</p>
        </div>
        <div className="card p-6">
          <div className="font-mono text-xs uppercase tracking-wide text-gold-600 mb-2">At FUTO — the Vanguard</div>
          <p className="text-sm text-ink-700 leading-relaxed">{aboutUnit.savBlurb}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="card p-6">
          <div className="eyebrow mb-2">Mission</div>
          <p className="font-display text-xl text-navy-950 leading-snug">&ldquo;To empower students with the knowledge, courage and ethical values required to reject corruption and promote integrity.&rdquo;</p>
        </div>
        <div className="card p-6">
          <div className="eyebrow mb-2">Vision</div>
          <p className="font-display text-xl text-navy-950 leading-snug">A campus community where integrity is the standard for academic life, leadership and public service.</p>
        </div>
      </div>

      <div className="mb-16">
        <div className="eyebrow mb-4">Core values</div>
        <div className="flex flex-wrap gap-2.5">
          {values.map((v) => <span key={v} className="badge-pill bg-navy-900/[0.05] text-navy-800 text-sm px-4 py-2">{v}</span>)}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {[
          ['Objectives', 'Raise awareness, educate students, and provide safe channels to report concerns on campus.'],
          ['Membership', 'Open to registered FUTO students who support the mission and complete registration.'],
          ['Activities', 'Academy courses, campaigns, events, the Integrity Pledge, and a student reporting platform.'],
        ].map(([k, v]) => (
          <div key={k} className="card p-6">
            <div className="font-display font-semibold text-navy-950 mb-2">{k}</div>
            <p className="text-sm text-ink-500 leading-relaxed">{v}</p>
          </div>
        ))}
      </div>

      <div className="mb-16">
        <div className="eyebrow mb-4">Leadership</div>
        <div className="space-y-8">
          {leadership.map((group) => (
            <div key={group.category}>
              <div className="text-xs font-mono uppercase tracking-wide text-ink-500 mb-3">{group.category}</div>
              <div className="grid sm:grid-cols-2 gap-5">
                {group.members.map((p) => (
                  <div key={p.id} className="card p-5 flex items-center gap-4">
                    {p.photo ? (
                      <img src={p.photo} alt={p.role} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-navy-900/5 flex items-center justify-center shrink-0 text-ink-500 text-xs text-center px-2">Photo coming soon</div>
                    )}
                    <div>
                      <div className="font-display font-semibold text-navy-950">{p.name || 'Name to be added'}</div>
                      <div className="text-xs text-gold-600 font-mono uppercase mt-1">{p.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="eyebrow mb-4">Generals — by year served</div>
        <div className="space-y-8">
          {generalsByYear.map((set) => (
            <div key={set.year}>
              <div className="text-xs font-mono uppercase tracking-wide text-ink-500 mb-3">{set.year}</div>
              <div className="grid sm:grid-cols-2 gap-5">
                {set.members.map((m) => (
                  <div key={m.id} className="card p-5 flex items-center gap-4">
                    {m.photo ? (
                      <img src={m.photo} alt={set.year} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-navy-900/5 flex items-center justify-center shrink-0 text-ink-500 text-xs text-center px-2">Photo coming soon</div>
                    )}
                    <div>
                      <div className="font-display font-semibold text-navy-950">{m.name || 'Name to be added'}</div>
                      <div className="text-xs text-gold-600 font-mono uppercase mt-1">General · {set.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="eyebrow mb-4">Information panel — Vanguard updates</div>
        <div className="space-y-3">
          {updates.map((u) => (
            <div key={u.id} className="card p-5">
              <div className="flex justify-between items-baseline gap-3 mb-1.5">
                <div className="font-display font-semibold text-navy-950">{u.title}</div>
                <span className="text-xs font-mono text-ink-500 shrink-0">{u.date}</span>
              </div>
              <p className="text-sm text-ink-500 leading-relaxed">{u.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 md:p-8 bg-navy-950 text-white border-none">
        <div className="eyebrow text-gold-300 mb-2">A note on identity</div>
        <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
          FUTO ICPC/SAV is a student-led anti-corruption vanguard operating in the spirit of the Independent Corrupt Practices and Other Related Offences Commission (ICPC)&rsquo;s mission. It is a campus initiative, not an official ICPC portal, and does not speak on the ICPC&rsquo;s behalf.
        </p>
      </div>
    </div>
  )
}