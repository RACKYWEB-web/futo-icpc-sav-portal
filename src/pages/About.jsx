import { SectionHeader } from '../components/Cards.jsx'

const values = ['Integrity', 'Accountability', 'Transparency', 'Justice', 'Responsibility', 'Leadership', 'Service']

export default function About() {
  return (
    <div className="container-page section-pad py-16 md:py-24">
      <SectionHeader eyebrow="About FUTO ICPC/SAV" title="A student initiative for a culture of integrity" sub="FUTO ICPC/SAV is the Student Anti-Corruption Vanguard at the Federal University of Technology, Owerri — inspired by ICPC's mandate, led by students, for students." />

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

      <div className="card p-6 md:p-8 bg-navy-950 text-white border-none">
        <div className="eyebrow text-gold-300 mb-2">A note on identity</div>
        <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
          FUTO ICPC/SAV is a student-led anti-corruption vanguard operating in the spirit of the Independent Corrupt Practices and Other Related Offences Commission (ICPC)&rsquo;s mission. It is a campus initiative, not an official ICPC portal, and does not speak on the ICPC&rsquo;s behalf.
        </p>
      </div>
    </div>
  )
}
