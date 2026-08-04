import { useApp } from '../../context/AppContext.jsx'
import { trainingPhotos, dutyPhotos, leadership, updates } from '../../data/mockData.js'
import { GalleryPhotoCard } from '../../components/Cards.jsx'

export default function Community() {
  const { currentUser, db } = useApp()
  const members = db.users.filter((u) => u.role === 'member').slice().sort((a, b) => b.integrityPoints - a.integrityPoints)

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-1">Vanguard community</h1>
      <p className="text-sm text-ink-500 mb-6">Every student who has joined SAV, ranked by integrity points earned through courses, campaigns and the pledge.</p>

      <div className="eyebrow mb-4">Leadership</div>
      <div className="space-y-6 mb-10">
        {leadership.map((group) => (
          <div key={group.category}>
            <div className="text-xs font-mono uppercase tracking-wide text-ink-500 mb-2">{group.category}</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {group.members.map((p) => (
                <div key={p.id} className="card p-4 flex items-center gap-3">
                  {p.photo ? (
                    <img src={p.photo} alt={p.role} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-navy-900/5 flex items-center justify-center shrink-0 text-ink-500 text-[9px] text-center px-1.5">Photo coming soon</div>
                  )}
                  <div>
                    <div className="font-display font-semibold text-navy-950 text-sm">{p.name || 'Name to be added'}</div>
                    <div className="text-[11px] text-gold-600 font-mono uppercase mt-1">{p.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="eyebrow mb-4">Information panel — Vanguard updates</div>
      <div className="space-y-3 mb-10">
        {updates.map((u) => (
          <div key={u.id} className="card p-4">
            <div className="flex justify-between items-baseline gap-3 mb-1">
              <div className="font-display font-semibold text-navy-950 text-sm">{u.title}</div>
              <span className="text-xs font-mono text-ink-500 shrink-0">{u.date}</span>
            </div>
            <p className="text-sm text-ink-500">{u.body}</p>
          </div>
        ))}
      </div>

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

      <div className="eyebrow mb-4">Fitness & road drills</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {trainingPhotos.slice(0, 8).map((img, i) => <GalleryPhotoCard key={i} image={img} aspect="aspect-square" />)}
      </div>

      <div className="eyebrow mb-4">ICPC SAV Drills Memories</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {dutyPhotos.slice(0, 8).map((img, i) => <GalleryPhotoCard key={i} image={img} aspect="aspect-square" />)}
      </div>
    </div>
  )
}