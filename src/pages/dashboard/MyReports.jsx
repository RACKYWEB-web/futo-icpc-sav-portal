import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'

const stages = ['Submitted', 'Under Review', 'Assessment', 'Resolved']

export default function MyReports() {
  const { currentUser, db } = useApp()
  const reports = db.reports.filter((r) => r.userId === currentUser.id)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950">My reports</h1>
        <Link to="/report" className="btn-navy text-sm">New report</Link>
      </div>
      {reports.length === 0 ? (
        <div className="card p-8 text-center text-ink-500">You haven&rsquo;t submitted any non-anonymous reports yet.</div>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => {
            const stageIndex = stages.indexOf(r.status === 'Closed' ? 'Resolved' : r.status)
            return (
              <div key={r.id} className="card p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-mono text-xs text-gold-600">{r.refNumber}</div>
                    <div className="font-medium text-navy-950 mt-1">{r.type}</div>
                  </div>
                  <span className="text-xs text-ink-500 font-mono">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  {stages.map((s, i) => (
                    <div key={s} className="flex-1">
                      <div className={`h-1.5 rounded-full ${i <= stageIndex ? 'bg-gold-500' : 'bg-ink-900/[0.08]'}`} />
                      <div className={`text-[10px] mt-1 font-mono ${i <= stageIndex ? 'text-navy-900' : 'text-ink-500'}`}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
