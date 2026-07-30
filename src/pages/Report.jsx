import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { SectionHeader } from '../components/Cards.jsx'

const reportTypes = ['Bribery', 'Examination malpractice', 'Fraud', 'Abuse of office', 'Procurement irregularity', 'Other']

export default function Report() {
  const { submitReport } = useApp()
  const [form, setForm] = useState({ type: reportTypes[0], date: '', location: '', description: '', anonymous: false })
  const [refNumber, setRefNumber] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const ref = submitReport(form)
    setRefNumber(ref)
  }

  if (refNumber) {
    return (
      <div className="container-page section-pad py-24 max-w-lg text-center">
        <div className="w-14 h-14 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" stroke="#c9a338" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1 className="font-display text-2xl font-semibold text-navy-950">Report submitted</h1>
        <p className="text-ink-500 mt-2">Your reference number is</p>
        <p className="font-mono text-xl text-gold-600 mt-2 mb-6">{refNumber}</p>
        <p className="text-sm text-ink-500">Keep this reference number to track your report&rsquo;s status. It will move through Submitted → Under Review → Assessment → Resolved.</p>
      </div>
    )
  }

  return (
    <div className="container-page section-pad py-16 md:py-20 max-w-xl">
      <SectionHeader eyebrow="Reporting platform" title="Submit a concern" sub="Reports are reviewed by authorized coordinators and are never shared publicly. You may report anonymously." />
      <div className="rounded-xl bg-navy-950 text-white/70 text-sm p-4 mb-8">
        Please do not submit false, malicious or defamatory reports. Misuse of this platform undermines its purpose.
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-navy-950 block mb-1.5">Report type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400">
            {reportTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-navy-950 block mb-1.5">Date</label>
            <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-950 block mb-1.5">Location</label>
            <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Faculty of Engineering" className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 block mb-1.5">Description</label>
          <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe what happened, as factually as possible…" className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-950 block mb-1.5">Supporting evidence (optional)</label>
          <input type="file" className="w-full text-sm text-ink-500" />
        </div>
        <label className="flex items-center gap-2.5 text-sm text-ink-700">
          <input type="checkbox" checked={form.anonymous} onChange={(e) => setForm({ ...form, anonymous: e.target.checked })} className="accent-gold-500" />
          Submit anonymously
        </label>
        <button type="submit" className="btn-gold w-full">Submit report</button>
      </form>
    </div>
  )
}
