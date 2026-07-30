import { useApp } from '../../context/AppContext.jsx'

export default function AdminEvents() {
  const { events, db } = useApp()

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Events</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-mono uppercase text-ink-500 border-b border-ink-900/[0.06]">
              <th className="px-5 py-3">Event</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Registered</th>
              <th className="px-5 py-3">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => {
              const liveRegs = Object.values(db.eventRegistrations).filter((list) => list.includes(e.id)).length
              return (
                <tr key={e.id} className="border-b border-ink-900/[0.04] last:border-0">
                  <td className="px-5 py-3 font-medium text-navy-950">{e.title}</td>
                  <td className="px-5 py-3 text-ink-500">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="px-5 py-3 text-ink-500">{e.location}</td>
                  <td className="px-5 py-3 text-ink-500">{e.registered + liveRegs}</td>
                  <td className="px-5 py-3 text-ink-500">{e.capacity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
