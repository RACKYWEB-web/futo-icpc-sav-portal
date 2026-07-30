import { useApp } from '../../context/AppContext.jsx'

export default function Certificates() {
  const { currentUser, db } = useApp()
  const certificates = db.certificates.filter((c) => c.userId === currentUser.id)

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Certificates</h1>
      {certificates.length === 0 ? (
        <div className="card p-8 text-center text-ink-500">Complete a course quiz to earn your first certificate.</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {certificates.map((c) => (
            <div key={c.id} className="card p-6 relative overflow-hidden border-gold-500/30">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full -mr-10 -mt-10" />
              <div className="eyebrow mb-2">Certificate of Completion</div>
              <p className="font-display text-lg text-navy-950">{c.title}</p>
              <p className="text-sm text-ink-500 mt-2">Awarded to {currentUser.fullName}</p>
              <p className="text-xs text-ink-500 mt-1">{new Date(c.issuedAt).toLocaleDateString()}</p>
              <p className="font-mono text-xs text-gold-600 mt-4">{c.id}</p>
              <div className="flex gap-3 mt-4">
                <button onClick={() => window.print()} className="text-sm font-semibold text-navy-900 hover:text-gold-600">Download / Print</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
