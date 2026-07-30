import { useEffect } from 'react'
import { useApp } from '../../context/AppContext.jsx'

export default function Notifications() {
  const { currentUser, db, markNotificationsRead } = useApp()
  const list = (db.notifications[currentUser.id] || []).slice().reverse()

  useEffect(() => { markNotificationsRead(currentUser.id) }, [currentUser.id, markNotificationsRead])

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Notifications</h1>
      {list.length === 0 ? (
        <div className="card p-8 text-center text-ink-500">No notifications yet.</div>
      ) : (
        <div className="space-y-3">
          {list.map((n) => (
            <div key={n.id} className="card p-4 flex justify-between items-center">
              <p className="text-sm text-ink-700">{n.text}</p>
              <span className="text-xs text-ink-500 font-mono shrink-0 ml-4">{new Date(n.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
