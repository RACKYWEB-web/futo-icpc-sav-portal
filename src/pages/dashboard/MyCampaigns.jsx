import { useApp } from '../../context/AppContext.jsx'
import { CampaignCard } from '../../components/Cards.jsx'

export default function MyCampaigns() {
  const { currentUser, db, campaigns, joinCampaign } = useApp()
  const joined = db.campaignParticipation[currentUser.id] || []

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Campaigns</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} joined={joined.includes(c.id)} onJoin={(id) => joinCampaign(currentUser.id, id)} />
        ))}
      </div>
    </div>
  )
}
