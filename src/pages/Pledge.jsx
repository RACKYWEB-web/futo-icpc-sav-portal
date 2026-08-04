import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { pledgeCommitments } from '../data/mockData.js'
import { SectionHeader } from '../components/Cards.jsx'

const anthemLines = [
  { text: 'I have decided to shun corruption', repeat: 3 },
  { text: 'No turning back', repeat: 2 },
  { text: 'I have decided to shun corruption.', repeat: 1 },
  { text: 'No turning back', repeat: 2 },
]

const pledgeLines = [
  'I am somebody for whom the time has come',
  'To say no to corruption and violence,',
  'To obey all laws, rules and regulations.',
  'To do my best for my country, my community',
  'And myself at all times',
  'To promote freedom, justice and peace and',
  'To realize my full potentials as a responsible citizen of Nigeria.',
]

export default function Pledge() {
  const { currentUser, db, signPledge } = useApp()
  const [checked, setChecked] = useState(() => pledgeCommitments.map(() => false))
  const existing = currentUser ? db.pledges[currentUser.id] : null

  const toggle = (i) => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))
  const allChecked = checked.every(Boolean)

  const handleSign = () => {
    if (!currentUser || !allChecked) return
    signPledge(currentUser.id, pledgeCommitments)
  }

  return (
    <div className="container-page section-pad py-16 md:py-24 max-w-3xl">
      <div className="reveal">
        <span className="section-kicker text-gold-600">Integrity made easy</span>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy-950 mt-4 leading-tight">
          Help ICPC fight corruption by building and promoting integrity in your lifestyle.
        </h1>
        <p className="mt-4 text-ink-500 italic">Always shun corruption, because it is evil.</p>
        <div className="divider-gold mt-6" />
      </div>

      {/* THE ANTHEM */}
      <div className="card p-6 md:p-8 mt-12 reveal" style={{ animationDelay: '80ms' }}>
        <div className="eyebrow mb-5">A. The Anti-Corruption Anthem</div>
        <div className="space-y-4">
          {anthemLines.map((line, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <p className="font-display text-lg md:text-xl text-navy-950 leading-snug">&ldquo;{line.text}&rdquo;</p>
              {line.repeat > 1 && (
                <span className="badge-pill bg-gold-500/10 text-gold-600 shrink-0 text-xs">×{line.repeat}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* THE OFFICIAL PLEDGE */}
      <div className="rounded-3xl bg-navy-950 text-white p-8 md:p-12 mt-8 relative overflow-hidden reveal" style={{ animationDelay: '140ms' }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="relative">
          <div className="eyebrow text-gold-300 mb-6">B. The Anti-Corruption Pledge</div>
          <blockquote className="space-y-1.5">
            {pledgeLines.map((line, i) => (
              <p key={i} className="font-display text-xl md:text-2xl leading-relaxed text-white/95">{line}</p>
            ))}
          </blockquote>
          <p className="mt-8 text-xs font-mono uppercase tracking-[0.14em] text-white/40">
            Education Department<br />
            Independent Corrupt Practices And Other Related Offences Commission
          </p>
        </div>
      </div>

      {/* MAKE IT PERSONAL */}
      {existing ? (
        <div className="card p-6 md:p-8 mt-12 text-center reveal" style={{ animationDelay: '200ms' }}>
          <span className="eyebrow">You&rsquo;ve made it personal</span>
          <h2 className="font-display text-2xl font-semibold text-navy-950 mt-3">Signed and confirmed.</h2>
          <p className="font-mono text-xs text-ink-500 mt-3 mb-6">Signed {new Date(existing.signedAt).toLocaleDateString()} by {currentUser.fullName}</p>
          <ul className="space-y-2 text-left max-w-md mx-auto">
            {existing.commitments.map((c, i) => (
              <li key={i} className="text-sm text-ink-700 flex gap-2"><span className="text-gold-600">✓</span>{c}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-12 reveal" style={{ animationDelay: '200ms' }}>
          <SectionHeader eyebrow="Make it personal" title="Turn the pledge into everyday choices" sub="Check each commitment below to make it yours, then sign digitally." />
          <div className="space-y-3 mb-8">
            {pledgeCommitments.map((c, i) => (
              <label key={i} className="card p-4 flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="accent-gold-500 w-4 h-4" />
                <span className="text-sm text-ink-700">{c}</span>
              </label>
            ))}
          </div>
          {!currentUser ? (
            <div className="rounded-xl bg-gold-500/10 border border-gold-500/30 p-4 text-sm text-navy-900">
              <Link to="/login" className="font-semibold underline">Log in</Link> to sign the pledge and receive your digital confirmation.
            </div>
          ) : (
            <button onClick={handleSign} disabled={!allChecked} className={`btn-gold w-full ${!allChecked ? 'opacity-40 pointer-events-none' : ''}`}>
              Sign the pledge
            </button>
          )}
        </div>
      )}
    </div>
  )
}