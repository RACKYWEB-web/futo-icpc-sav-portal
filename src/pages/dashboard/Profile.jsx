import { useApp } from '../../context/AppContext.jsx'
import { badgeCatalog } from '../../data/mockData.js'

export default function Profile() {
  const { currentUser } = useApp()
  const fields = [
    ['Full name', currentUser.fullName], ['Email', currentUser.email], ['Phone', currentUser.phone || '—'],
    ['Matric number', currentUser.matric], ['Department', currentUser.department], ['Faculty', currentUser.faculty],
    ['Level', currentUser.level], ['Gender', currentUser.gender],
    ['Member since', new Date(currentUser.joinedAt).toLocaleDateString()],
  ]

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">My profile</h1>
      <div className="card p-6 grid sm:grid-cols-2 gap-5 mb-8">
        {fields.map(([k, v]) => (
          <div key={k}>
            <div className="text-xs font-mono uppercase text-ink-500">{k}</div>
            <div className="text-navy-950 mt-1">{v}</div>
          </div>
        ))}
      </div>

      <h2 className="font-display font-semibold text-navy-950 mb-4">Badges</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {badgeCatalog.map((b) => {
          const earned = currentUser.badges.includes(b.name)
          return (
            <div key={b.name} className={`card p-5 ${earned ? '' : 'opacity-40'}`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{earned ? '🏅' : '⬡'}</span>
                <span className="font-medium text-navy-950">{b.name}</span>
              </div>
              <p className="text-sm text-ink-500 mt-2">{b.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
