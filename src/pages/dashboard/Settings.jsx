import { useState } from 'react'
import { useApp } from '../../context/AppContext.jsx'

export default function Settings() {
  const { currentUser } = useApp()
  const [saved, setSaved] = useState(false)

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Settings</h1>
      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000) }} className="card p-6 max-w-lg space-y-4">
        <div>
          <label className="text-sm font-medium text-navy-950 block mb-1.5">Email</label>
          <input defaultValue={currentUser.email} className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 block mb-1.5">Phone</label>
          <input defaultValue={currentUser.phone} className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
        </div>
        <label className="flex items-center gap-2.5 text-sm text-ink-700">
          <input type="checkbox" defaultChecked className="accent-gold-500" /> Email notifications
        </label>
        <button type="submit" className="btn-gold">Save changes</button>
        {saved && <p className="text-sm text-gold-600">Saved.</p>}
      </form>
    </div>
  )
}
