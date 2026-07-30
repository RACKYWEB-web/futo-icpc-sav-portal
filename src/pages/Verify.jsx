import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { SectionHeader } from '../components/Cards.jsx'

export default function Verify() {
  const { db } = useApp()
  const [id, setId] = useState('')
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const cert = db.certificates.find((c) => c.id.toLowerCase() === id.trim().toLowerCase())
    const user = cert ? db.users.find((u) => u.id === cert.userId) : null
    setResult(cert ? { ...cert, holder: user?.fullName } : null)
    setSearched(true)
  }

  return (
    <div className="container-page section-pad py-16 md:py-20 max-w-lg">
      <SectionHeader eyebrow="Certificate verification" title="Verify a certificate" sub="Enter a certificate ID to confirm it was issued by FUTO ICPC/SAV." />
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. CERT-12345678" className="flex-1 rounded-xl border border-ink-900/10 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold-400" />
        <button type="submit" className="btn-navy">Verify</button>
      </form>
      {searched && (
        result ? (
          <div className="card p-6 bg-gold-500/10 border-gold-500/30">
            <p className="font-display text-lg text-navy-950">Valid certificate</p>
            <div className="text-sm text-ink-700 mt-3 space-y-1">
              <p><span className="text-ink-500">Holder:</span> {result.holder}</p>
              <p><span className="text-ink-500">Course:</span> {result.title}</p>
              <p><span className="text-ink-500">Issued:</span> {new Date(result.issuedAt).toLocaleDateString()}</p>
              <p><span className="text-ink-500">ID:</span> <span className="font-mono">{result.id}</span></p>
            </div>
          </div>
        ) : (
          <div className="card p-6">
            <p className="text-ink-500 text-sm">No certificate found with that ID.</p>
          </div>
        )
      )}
    </div>
  )
}
