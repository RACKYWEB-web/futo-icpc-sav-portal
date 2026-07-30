import { useApp } from '../../context/AppContext.jsx'

export default function AdminCampaigns() {
  const { campaigns, db } = useApp()

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Campaigns</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {campaigns.map((c) => {
          const liveParticipants = Object.values(db.campaignParticipation).filter((list) => list.includes(c.id)).length
          return (
            <div key={c.id} className="card p-5">
              <h3 className="font-display font-semibold text-navy-950">{c.title}</h3>
              <p className="text-sm text-ink-500 mt-2 leading-relaxed">{c.description}</p>
              <div className="flex justify-between text-xs font-mono text-ink-500 mt-4">
                <span>{c.date}</span>
                <span>{c.participants + liveParticipants} total participants</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
