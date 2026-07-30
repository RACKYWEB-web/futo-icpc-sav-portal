import { Link } from 'react-router-dom'
import { stats, courses, campaigns, events, mythsFacts, galleryImages } from '../data/mockData.js'
import StatCounter from '../components/StatCounter.jsx'
import PriceOfCorruption from '../components/PriceOfCorruption.jsx'
import { SectionHeader, CourseCard, CampaignCard, EventCard } from '../components/Cards.jsx'
import { useState } from 'react'

function MythFactCard({ item }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <button onClick={() => setRevealed((r) => !r)} className="card p-5 text-left w-full hover:shadow-cardHover transition-all">
      <span className="eyebrow text-ink-500">{revealed ? 'Fact' : 'Myth'}</span>
      <p className="font-display text-lg mt-2 text-navy-950 leading-snug">{revealed ? item.fact : item.myth}</p>
      <span className="text-xs text-gold-600 font-mono mt-3 inline-block">{revealed ? '← back to myth' : 'tap to reveal the fact →'}</span>
    </button>
  )
}

export default function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-page section-pad relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl reveal">
            <span className="eyebrow text-gold-300">FUTO ICPC / Student Anti-Corruption Vanguard</span>
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.05] mt-5">
              Shun Corruption <span className="text-gold-400">—</span> It&rsquo;s Evil.
            </h1>
            <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-xl">
              Building a generation of students committed to integrity, transparency, accountability and responsible leadership.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/register" className="btn-gold">Join the Vanguard</Link>
              <Link to="/report" className="btn-outline">Report an Issue</Link>
              <Link to="/education" className="btn-outline">Learn About Corruption</Link>
              <Link to="/dashboard" className="btn-outline">Explore Dashboard</Link>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10">
          <div className="container-page section-pad grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {stats.map((s) => <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
          </div>
        </div>
      </section>

      {/* WHY INTEGRITY MATTERS */}
      <section className="section-pad py-20 md:py-28">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Why integrity matters</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-950 mt-3 leading-tight">
              Corruption is not only about stolen money.
            </h2>
            <p className="mt-5 text-ink-500 leading-relaxed">
              It can steal opportunities, weaken institutions, destroy trust and limit the future of communities. Integrity connects directly to education, leadership, innovation, entrepreneurship, justice and national growth.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Education', 'Leadership', 'Innovation', 'Entrepreneurship', 'Justice', 'Development'].map((t) => (
                <span key={t} className="badge-pill bg-navy-900/[0.05] text-navy-800">{t}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['Mission', 'Empower students with knowledge, courage and ethical values.'],
              ['Vision', 'A campus culture where integrity is the norm, not the exception.'],
              ['Values', 'Integrity, accountability, transparency, justice, service.'],
              ['Reach', 'Faculties, hostels, clubs and student government.'],
            ].map(([k, v]) => (
              <div key={k} className="card p-5">
                <div className="font-mono text-xs uppercase tracking-wide text-gold-600">{k}</div>
                <p className="text-sm text-ink-700 mt-2 leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE OF CORRUPTION — signature interactive */}
      <section className="section-pad pb-20 md:pb-28">
        <div className="container-page"><PriceOfCorruption /></div>
      </section>

      {/* ACADEMY PREVIEW */}
      <section className="section-pad py-20 md:py-28 bg-mist">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeader eyebrow="Anti-Corruption Academy" title="Learn it. Practice it. Get certified." sub="Short, practical courses built for student life — each ending in a quiz and a verifiable digital certificate." />
            <Link to="/academy" className="btn-outline-dark shrink-0">View all courses</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.slice(0, 3).map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>

      {/* MYTH VS FACT */}
      <section className="section-pad py-20 md:py-28">
        <div className="container-page">
          <SectionHeader center eyebrow="Corruption myth vs. fact" title="Tap a card to see what's really true" />
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {mythsFacts.map((m, i) => <MythFactCard key={i} item={m} />)}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="section-pad py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeader eyebrow="Campaigns in action" title="Students on the ground" sub="Awareness walks, orientation days and community sensitization — this is what the Vanguard looks like on campus." />
            <Link to="/campaigns" className="btn-outline-dark shrink-0">See campaigns →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2' : ''}`} style={{ aspectRatio: i === 0 ? '1/1' : '3/4' }}>
                <img src={img.url} alt={img.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium leading-snug">{img.caption}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-500 mt-4">Illustrative campus photography, free-license. Credits: {galleryImages.map((i) => i.credit).join(' · ')}.</p>
        </div>
      </section>

      {/* CAMPAIGNS + EVENTS PREVIEW */}
      <section className="section-pad py-20 md:py-28 bg-mist">
        <div className="container-page grid lg:grid-cols-2 gap-14">
          <div>
            <SectionHeader eyebrow="Campaigns" title="Active on campus" />
            <div className="grid gap-5">
              {campaigns.slice(0, 2).map((c) => <CampaignCard key={c.id} campaign={c} />)}
            </div>
            <Link to="/campaigns" className="inline-block mt-6 text-sm font-semibold text-navy-900 hover:text-gold-600">All campaigns →</Link>
          </div>
          <div>
            <SectionHeader eyebrow="Events" title="Upcoming on calendar" />
            <div className="grid gap-4">
              {events.slice(0, 3).map((e) => <EventCard key={e.id} event={e} />)}
            </div>
            <Link to="/events" className="inline-block mt-6 text-sm font-semibold text-navy-900 hover:text-gold-600">All events →</Link>
          </div>
        </div>
      </section>

      {/* PLEDGE CTA */}
      <section className="section-pad py-24">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 text-white p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
            <div className="relative max-w-xl mx-auto">
              <span className="eyebrow text-gold-300">The Integrity Pledge</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold mt-4">&ldquo;I choose integrity.&rdquo;</h2>
              <p className="text-white/60 mt-4">Make it personal. Commit to a set of concrete, everyday choices — and get a digital confirmation you can keep.</p>
              <Link to="/pledge" className="btn-gold mt-7 inline-flex">Take the pledge</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
