import { Link } from 'react-router-dom'
import { SectionHeader } from '../components/Cards.jsx'
import { aboutUnit, leadership } from '../data/mockData.js'

const functions = [
  {
    title: 'Monitoring & Oversight',
    body: 'Keeping watch on everyday campus processes — registration, exams, facility use — for signs of abuse of office or unfair advantage.',
  },
  {
    title: 'Transparency Advocacy',
    body: 'Pushing for clear, accountable processes across student life, and encouraging institutions to communicate openly with students.',
  },
  {
    title: 'Education & Sensitization',
    body: 'Running the Academy, campaigns and drills that build a shared, practical understanding of what corruption looks like and why it matters.',
  },
  {
    title: 'Safe Reporting Channel',
    body: 'Operating a reporting platform where students can flag concerns — anonymously or otherwise — for review by the Vanguard.',
  },
]

const cmo = leadership.find((g) => g.category === 'Executive')?.members.find((m) => m.id === 'cmo')

export default function Actu() {
  return (
    <div className="container-page section-pad py-16 md:py-24">
      <SectionHeader
        eyebrow="A closer look"
        title="Anti-Corruption & Transparency Unit (ACTU)"
        sub="The Anti-Corruption & Transparency Unit is the working arm of FUTO ICPC/SAV — the part of the Vanguard responsible for monitoring, transparency advocacy, education and safe reporting on campus."
      />

      <div className="card p-6 md:p-8 mb-16">
        <div className="eyebrow mb-2">What ACTU is</div>
        <p className="text-sm text-ink-700 leading-relaxed max-w-3xl">{aboutUnit.savBlurb}</p>
      </div>

      <div className="mb-16">
        <div className="eyebrow mb-5">What ACTU does</div>
        <div className="grid sm:grid-cols-2 gap-5">
          {functions.map((f) => (
            <div key={f.title} className="card card-hover p-6">
              <h3 className="font-display font-semibold text-lg text-navy-950 mb-2">{f.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>

     {cmo && (
        <div className="mb-16">
          <div className="eyebrow mb-5">Unit lead</div>
          {cmo.name ? (
            <div className="card p-6 flex items-center gap-5 max-w-xl">
              {cmo.photo ? (
                <img src={cmo.photo} alt={cmo.role} className="w-20 h-20 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-navy-900/5 flex items-center justify-center shrink-0 text-ink-500 text-xs text-center px-2">Photo coming soon</div>
              )}
              <div>
                <div className="font-display font-semibold text-navy-950">{cmo.name}</div>
                <div className="text-xs text-gold-600 font-mono uppercase mt-1">{cmo.role}</div>
                <p className="text-sm text-ink-500 mt-2 leading-relaxed">Oversees ACTU&rsquo;s monitoring and reporting functions on behalf of the Vanguard.</p>
              </div>
            </div>
          ) : (
            <div className="card p-6 max-w-xl border-dashed border-2 border-ink-900/10 bg-transparent shadow-none">
              <div className="w-12 h-12 rounded-xl bg-navy-900/5 flex items-center justify-center text-ink-500 text-[10px] font-mono uppercase tracking-wide mb-4">TBA</div>
              <div className="text-xs text-gold-600 font-mono uppercase mb-1">{cmo.role}</div>
              <p className="text-sm text-ink-500 leading-relaxed">This section isn&rsquo;t available yet — the Chief Monitoring Officer&rsquo;s profile will be added here once confirmed.</p>
            </div>
          )}
        </div>
      )}

      <div className="card p-6 md:p-8 bg-navy-950 text-white border-none">
        <div className="eyebrow text-gold-300 mb-2">See something? Say something.</div>
        <p className="text-sm text-white/60 leading-relaxed max-w-2xl mb-6">
          If you&rsquo;ve witnessed bribery, extortion, examination malpractice, bullying, fraud, or any other unethical practice on campus, ACTU&rsquo;s reporting channel is open to you.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/report" className="btn-gold">Report an issue</Link>
          <Link to="/pledge" className="btn-outline">Take the pledge</Link>
        </div>
      </div>
    </div>
  )
}