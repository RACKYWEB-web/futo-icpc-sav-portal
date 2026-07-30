import { useApp } from '../context/AppContext.jsx'
import { SectionHeader, EventCard } from '../components/Cards.jsx'
import { useNavigate } from 'react-router-dom'

export default function EventsPage() {
  const { events, currentUser, db, registerEvent } = useApp()
  const navigate = useNavigate()
  const registered = currentUser ? (db.eventRegistrations[currentUser.id] || []) : []

  const handleRegister = (id) => {
    if (!currentUser) return navigate('/login')
    registerEvent(currentUser.id, id)
  }

  return (
    <div className="container-page section-pad py-16 md:py-20">
      <SectionHeader eyebrow="Events" title="Show up for integrity" sub="Workshops, walks and orientations across campus. Register to receive a confirmation and add it to your schedule." />
      <div className="grid md:grid-cols-2 gap-5">
        {events.map((e) => (
          <EventCard key={e.id} event={e} registered={registered.includes(e.id)} onRegister={handleRegister} />
        ))}
      </div>
    </div>
  )
}
