import { useState } from 'react'
import { SectionHeader } from '../components/Cards.jsx'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div className="container-page section-pad py-16 md:py-20 max-w-xl">
      <SectionHeader eyebrow="Contact & support" title="Get in touch" sub="Questions about membership, campaigns or the academy — reach the coordination team below." />
      {sent ? (
        <div className="card p-6 text-center">
          <p className="font-display text-lg text-navy-950">Message sent. The coordination team will respond shortly.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
          <input required placeholder="Full name" className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          <input required type="email" placeholder="Email address" className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          <textarea required rows={5} placeholder="Your message" className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          <button type="submit" className="btn-gold w-full">Send message</button>
        </form>
      )}
      <div className="mt-10 grid sm:grid-cols-2 gap-4 text-sm text-ink-500">
        <div className="card p-5"><div className="eyebrow mb-1">Email</div>info@futosav.org (placeholder)</div>
        <div className="card p-5"><div className="eyebrow mb-1">Campus location</div>Student Affairs Complex, FUTO (placeholder)</div>
      </div>
    </div>
  )
}
