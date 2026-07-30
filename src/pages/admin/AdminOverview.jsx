import { useApp } from '../../context/AppContext.jsx'

function StatCard({ label, value }) {
  return (
    <div className="card p-5">
      <div className="text-xs font-mono uppercase tracking-wide text-ink-500">{label}</div>
      <div className="font-display text-2xl font-semibold text-navy-950 mt-1">{value}</div>
    </div>
  )
}

export default function AdminOverview() {
  const { db, courses, campaigns, events } = useApp()
  const members = db.users.filter((u) => u.role === 'member')
  const pendingReports = db.reports.filter((r) => r.status === 'Submitted').length
  const certificatesIssued = db.certificates.length

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Admin overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total members" value={members.length} />
        <StatCard label="Pending reports" value={pendingReports} />
        <StatCard label="Courses" value={courses.length} />
        <StatCard label="Certificates issued" value={certificatesIssued} />
        <StatCard label="Campaigns" value={campaigns.length} />
        <StatCard label="Events" value={events.length} />
        <StatCard label="Total reports" value={db.reports.length} />
        <StatCard label="New this session" value={members.filter((m) => Date.now() - new Date(m.joinedAt).getTime() < 1000 * 60 * 60).length} />
      </div>

      <div className="card p-6">
        <h2 className="font-display font-semibold text-navy-950 mb-4">Recent members</h2>
        <div className="space-y-3">
          {members.slice(-5).reverse().map((m) => (
            <div key={m.id} className="flex justify-between text-sm">
              <span className="text-navy-950 font-medium">{m.fullName}</span>
              <span className="text-ink-500">{m.department}</span>
            </div>
          ))}
          {members.length === 0 && <p className="text-sm text-ink-500">No members yet.</p>}
        </div>
      </div>
    </div>
  )
}
