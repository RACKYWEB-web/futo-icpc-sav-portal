import { useApp } from '../../context/AppContext.jsx'
import { EventCard } from '../../components/Cards.jsx'

export default function MyEvents() {
  const { currentUser, db, events, registerEvent } = useApp()
  const registered = db.eventRegistrations[currentUser.id] || []

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Events</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {events.map((e) => (
          <EventCard key={e.id} event={e} registered={registered.includes(e.id)} onRegister={(id) => registerEvent(currentUser.id, id)} />
        ))}
      </div>
    </div>
  )
}
