import { useApp } from '../../context/AppContext.jsx'
import { galleryImages } from '../../data/mockData.js'

export default function Community() {
  const { currentUser, db } = useApp()
  const members = db.users.filter((u) => u.role === 'member').slice().sort((a, b) => b.integrityPoints - a.integrityPoints)

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-1">Vanguard community</h1>
      <p className="text-sm text-ink-500 mb-6">Every student who has joined SAV, ranked by integrity points earned through courses, campaigns and the pledge.</p>

      <div className="card overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-mono uppercase text-ink-500 border-b border-ink-900/[0.06]">
              <th className="px-5 py-3">Rank</th>
              <th className="px-5 py-3">Member</th>
              <th className="px-5 py-3">Department</th>
              <th className="px-5 py-3">Badges</th>
              <th className="px-5 py-3">Points</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={m.id} className={`border-b border-ink-900/[0.04] last:border-0 ${m.id === currentUser.id ? 'bg-gold-500/5' : ''}`}>
                <td className="px-5 py-3 font-mono text-ink-500">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</td>
                <td className="px-5 py-3 font-medium text-navy-950">
                  {m.fullName}
                  {m.id === currentUser.id && <span className="text-xs text-gold-600 font-semibold ml-2">(you)</span>}
                </td>
                <td className="px-5 py-3 text-ink-500">{m.department}</td>
                <td className="px-5 py-3 text-ink-500">{m.badges.length}</td>
                <td className="px-5 py-3 text-navy-950 font-semibold">{m.integrityPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display font-semibold text-navy-950 mb-4">Campaigns in action</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {galleryImages.map((img, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden aspect-square group">
            <img src={img.url} alt={img.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 right-2 text-white text-[11px] font-medium leading-snug">{img.caption}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-ink-500 mt-3">Illustrative campus photography. Credits: {galleryImages.map((i) => i.credit).join(' · ')}.</p>
    </div>
  )
}
