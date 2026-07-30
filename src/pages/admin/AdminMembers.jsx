import { useApp } from '../../context/AppContext.jsx'

export default function AdminMembers() {
  const { db } = useApp()
  const members = db.users.filter((u) => u.role === 'member')

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Members</h1>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-mono uppercase text-ink-500 border-b border-ink-900/[0.06]">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Department</th>
              <th className="px-5 py-3">Level</th>
              <th className="px-5 py-3">Points</th>
              <th className="px-5 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-ink-900/[0.04] last:border-0">
                <td className="px-5 py-3 font-medium text-navy-950">{m.fullName}</td>
                <td className="px-5 py-3 text-ink-500">{m.department}</td>
                <td className="px-5 py-3 text-ink-500">{m.level}</td>
                <td className="px-5 py-3 text-ink-500">{m.integrityPoints}</td>
                <td className="px-5 py-3 text-ink-500">{new Date(m.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {members.length === 0 && <p className="p-6 text-sm text-ink-500">No members yet.</p>}
      </div>
    </div>
  )
}
