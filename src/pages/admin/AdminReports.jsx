import { useApp } from '../../context/AppContext.jsx'

const statuses = ['Submitted', 'Under Review', 'Assessment', 'Resolved', 'Closed']

export default function AdminReports() {
  const { db, updateReportStatus } = useApp()

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Reports</h1>
      {db.reports.length === 0 ? (
        <div className="card p-8 text-center text-ink-500">No reports submitted yet.</div>
      ) : (
        <div className="space-y-4">
          {db.reports.slice().reverse().map((r) => (
            <div key={r.id} className="card p-5">
              <div className="flex flex-wrap justify-between gap-3 mb-2">
                <div>
                  <span className="font-mono text-xs text-gold-600">{r.refNumber}</span>
                  <span className="ml-2 badge-pill bg-navy-900/[0.05] text-navy-800">{r.type}</span>
                  {r.anonymous && <span className="ml-2 badge-pill bg-ink-900/[0.06] text-ink-500">Anonymous</span>}
                </div>
                <select value={r.status} onChange={(e) => updateReportStatus(r.id, e.target.value)}
                  className="text-xs font-mono rounded-lg border border-ink-900/10 px-2 py-1">
                  {statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <p className="text-sm text-ink-700 leading-relaxed">{r.description}</p>
              <p className="text-xs text-ink-500 mt-2 font-mono">{r.location} · {r.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
