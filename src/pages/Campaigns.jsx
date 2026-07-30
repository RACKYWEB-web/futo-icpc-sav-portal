import { useApp } from '../context/AppContext.jsx'
import { SectionHeader, CampaignCard } from '../components/Cards.jsx'
import { useNavigate } from 'react-router-dom'

export default function Campaigns() {
  const { campaigns, currentUser, db, joinCampaign } = useApp()
  const navigate = useNavigate()
  const joined = currentUser ? (db.campaignParticipation[currentUser.id] || []) : []

  const handleJoin = (id) => {
    if (!currentUser) return navigate('/login')
    joinCampaign(currentUser.id, id)
  }

  return (
    <div className="container-page section-pad py-16 md:py-20">
      <SectionHeader eyebrow="Campaigns" title="Awareness in motion" sub="Faculty-wide drives and campus-level initiatives students can join and track." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} joined={joined.includes(c.id)} onJoin={handleJoin} />
        ))}
      </div>
      {campaigns.map((c) => (
        <div key={c.id} className="card p-6 mb-4">
          <h3 className="font-display font-semibold text-lg text-navy-950">{c.title}</h3>
          <div className="eyebrow mt-2 mb-1">Objectives</div>
          <ul className="text-sm text-ink-500 list-disc list-inside space-y-1">
            {c.objectives.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}
