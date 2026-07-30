import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'

function StatCard({ label, value }) {
  return (
    <div className="card p-5">
      <div className="text-xs font-mono uppercase tracking-wide text-ink-500">{label}</div>
      <div className="font-display text-2xl font-semibold text-navy-950 mt-1">{value}</div>
    </div>
  )
}

export default function Overview() {
  const { currentUser, db, courses, events } = useApp()
  const progress = db.courseProgress[currentUser.id] || {}
  const coursesCompleted = Object.values(progress).filter((p) => p.completed).length
  const certificates = db.certificates.filter((c) => c.userId === currentUser.id)
  const campaigns = db.campaignParticipation[currentUser.id] || []
  const eventIds = db.eventRegistrations[currentUser.id] || []
  const reports = db.reports.filter((r) => r.userId === currentUser.id)
  const upcoming = events.filter((e) => eventIds.includes(e.id))
  const notifications = (db.notifications[currentUser.id] || []).slice(-3).reverse()

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950">Welcome back, {currentUser.fullName.split(' ')[0]}.</h1>
      <p className="text-ink-500 mt-1">Here&rsquo;s where things stand with your membership.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard label="Membership" value="Active" />
        <StatCard label="Courses completed" value={`${coursesCompleted}/${courses.length}`} />
        <StatCard label="Certificates" value={certificates.length} />
        <StatCard label="Integrity points" value={currentUser.integrityPoints} />
        <StatCard label="Campaigns joined" value={campaigns.length} />
        <StatCard label="Events registered" value={eventIds.length} />
        <StatCard label="Reports submitted" value={reports.length} />
        <StatCard label="Badges earned" value={currentUser.badges.length} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display font-semibold text-navy-950">Upcoming events</h2>
            <Link to="/dashboard/events" className="text-xs text-gold-600 font-semibold">View all</Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-sm text-ink-500">No upcoming events yet — <Link to="/events" className="text-gold-600">browse events</Link>.</p>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((e) => (
                <li key={e.id} className="flex justify-between text-sm">
                  <span className="text-navy-950 font-medium">{e.title}</span>
                  <span className="text-ink-500 font-mono">{new Date(e.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display font-semibold text-navy-950">Recent announcements</h2>
            <Link to="/dashboard/notifications" className="text-xs text-gold-600 font-semibold">View all</Link>
          </div>
          {notifications.length === 0 ? (
            <p className="text-sm text-ink-500">You&rsquo;re all caught up.</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li key={n.id} className="text-sm text-ink-700">{n.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card p-6 mt-6">
        <h2 className="font-display font-semibold text-navy-950 mb-4">Recommended next course</h2>
        {courses.filter((c) => !progress[c.id]?.completed).slice(0, 1).map((c) => (
          <Link key={c.id} to={`/academy/${c.id}`} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-navy-950">{c.title}</p>
              <p className="text-sm text-ink-500">{c.description}</p>
            </div>
            <span className="text-gold-600 font-semibold text-sm shrink-0 ml-4">Start →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
