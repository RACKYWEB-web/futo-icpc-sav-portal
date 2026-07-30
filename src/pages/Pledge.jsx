import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { pledgeCommitments } from '../data/mockData.js'
import { SectionHeader } from '../components/Cards.jsx'

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

  if (existing) {
    return (
      <div className="container-page section-pad py-24 max-w-lg text-center">
        <span className="eyebrow">Integrity pledge</span>
        <h1 className="font-display text-3xl font-semibold text-navy-950 mt-3">You&rsquo;ve made it personal.</h1>
        <div className="card p-6 mt-8 text-left">
          <p className="font-mono text-xs text-ink-500 mb-3">Signed {new Date(existing.signedAt).toLocaleDateString()} by {currentUser.fullName}</p>
          <ul className="space-y-2">
            {existing.commitments.map((c, i) => (
              <li key={i} className="text-sm text-ink-700 flex gap-2"><span className="text-gold-600">✓</span>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page section-pad py-16 md:py-20 max-w-xl">
      <SectionHeader eyebrow="The integrity pledge" title="&ldquo;I choose integrity.&rdquo;" sub="Check each commitment to make it yours, then sign digitally." />
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
  )
}
