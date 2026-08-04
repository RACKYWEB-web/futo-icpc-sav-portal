import { Link } from 'react-router-dom'
import { stats, courses, campaigns, mythsFacts, galleryImages, dutyPhotos, communityMemories } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'
import StatCounter from '../components/StatCounter.jsx'
import PriceOfCorruption from '../components/PriceOfCorruption.jsx'
import { SectionHeader, CourseCard, CampaignCard, EventCard } from '../components/Cards.jsx'
import { useEffect, useRef, useState } from 'react'
import Logo from "../components/Logo.jsx";

const assetPath = (path) => `${import.meta.env.BASE_URL}images/gallery/${path}`

const leadershipImages = [
  { role: 'Chief Monitoring Officer', name: 'SAV CMO', image: assetPath('cmo-officer.jpg'), size: 'large' },
  { role: 'Legal Unit', name: 'Barr. Dr. Prosecutor Owuna Joseph Monday', image: assetPath('legal-unit.jpg'), size: 'large' },
  { role: 'ICPC State Command', name: 'SAV Induction Ceremony', image: assetPath('induction-ceremony.jpg') },
  { role: 'Vanguard Executives', name: 'Current Executive Council', image: assetPath('executives.jpg') },
  { role: 'Chairman and Generals', name: 'Leadership and Coordinators', image: assetPath('generals_01.jpeg') },
  { role: 'My vanguard my PRIDE', name: 'SAV Family', image: assetPath('sav-family_02.jpeg') },
]

const drillImages = Array.from({ length: 18 }, (_, index) => ({
  title: index < 4 ? ['SAV Drills', 'Fitness Exercise', 'Team Conditioning', 'Discipline and Readiness'][index] : 'FUTO ICPC/SAV on duty for shunning corruption',
  image: assetPath(`drill-${String(index + 1).padStart(2, '0')}.jpg`),
}))

// Scroll-triggered fade + rise. Wrap any block in this to have it animate in
// only once it's actually scrolled into view, instead of on page load.
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function ReliableImage({ src, alt, className, eager = false, fallback = null }) {
  const [attempt, setAttempt] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setAttempt(0)
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return fallback || <div className={`${className} bg-navy-900/60`} aria-label={`${alt} unavailable`} />
  }

  return (
    <img
      key={attempt}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'low'}
      decoding="async"
      onError={() => {
        if (attempt < 1) {
          window.setTimeout(() => setAttempt((a) => a + 1), 400)
        } else {
          setFailed(true)
        }
      }}
      className={className}
    />
  )
}

// Myth/Fact cards now play a fresh rise-fade animation on every toggle, not
// just an instant text swap. The `key` change forces the paragraph to remount.
function MythFactCard({ item }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <button onClick={() => setRevealed((r) => !r)} className="card p-5 text-left w-full hover:shadow-cardHover transition-all overflow-hidden">
      <span className="eyebrow text-ink-500">{revealed ? 'Fact' : 'Myth'}</span>
      <p key={revealed ? 'fact' : 'myth'} className="reveal font-display text-lg mt-2 text-navy-950 leading-snug">{revealed ? item.fact : item.myth}</p>
      <span className="text-xs text-gold-600 font-mono mt-3 inline-block">{revealed ? '← back to myth' : 'tap to reveal the fact →'}</span>
    </button>
  )
}

// MEMORIES — a quiet, image-first archive. Combines duty photos with the
// looser community-memory shots, with a "view all" expand so we don't
// force-load every photo up front.
const allMemories = [...dutyPhotos, ...communityMemories]

function MemoriesSection() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? allMemories : allMemories.slice(0, 10)

  useEffect(() => {
    if (activeIndex === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % allMemories.length)
      if (event.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + allMemories.length) % allMemories.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex])

  const active = activeIndex !== null ? allMemories[activeIndex] : null

  return (
    <section className="section-pad py-20 md:py-32 bg-navy-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl animate-pulseSoft" />
      <div className="container-page relative">
        <Reveal>
          <SectionHeader light eyebrow="Field archive" title="Memories" sub="Moments from meetings, drills, courtesy visits, campus walks and simply being a family — the everyday record of the Vanguard's work." />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-10">
          {visible.map((photo, i) => {
            const num = allMemories.indexOf(photo) + 1
            return (
              <Reveal key={photo.url} delay={(i % 10) * 60} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(num - 1)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActiveIndex(num - 1) }}
                  className="image-card group cursor-pointer w-full h-full"
                  style={{ aspectRatio: i === 0 ? '1/1' : '4/5' }}
                  aria-label={`View: ${photo.caption}`}
                >
                  <ReliableImage src={photo.url} alt={photo.caption} eager className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wider text-gold-300">
                    {String(num).padStart(2, '0')} / {String(allMemories.length).padStart(2, '0')}
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium leading-snug">
                    {photo.caption}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>

        {allMemories.length > 10 && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="btn border border-white/20 text-white hover:bg-white/10 hover:-translate-y-0.5"
            >
              {showAll ? 'Show fewer' : `View all ${allMemories.length} memories`}
            </button>
          </div>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/95 backdrop-blur-lg" role="dialog" aria-modal="true" onClick={() => setActiveIndex(null)}>
          <button type="button" className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-2xl hover:border-gold-400 hover:text-gold-400" onClick={() => setActiveIndex(null)} aria-label="Close">×</button>
          <button type="button" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center text-xl hover:border-gold-400 hover:text-gold-400" onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i - 1 + allMemories.length) % allMemories.length) }} aria-label="Previous">←</button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[70vh]">
              <ReliableImage src={active.url} alt={active.caption} eager className="w-full h-full object-contain max-h-[70vh] bg-navy-950" />
            </div>
            <p className="text-white/70 text-sm mt-4 text-center">{active.caption}</p>
          </div>
          <button type="button" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center text-xl hover:border-gold-400 hover:text-gold-400" onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i + 1) % allMemories.length) }} aria-label="Next">→</button>
        </div>
      )}
    </section>
  )
}

export default function Landing() {
  const { events, eventsLoading, eventsError } = useApp()
  return (
    <div>
      {/* HERO */}
    <section className="relative bg-navy-950 text-white overflow-hidden">
  <div
    className="absolute inset-0 opacity-[0.06]"
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
      backgroundSize: "30px 30px",
    }}
  />

  <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl animate-pulseSoft" />
  <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-navy-700/30 blur-3xl animate-pulseSoft" style={{ animationDelay: '1.1s' }} />

  <div className="container-page section-pad relative pt-24 pb-24 md:pt-36 md:pb-32">

    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* LEFT SIDE */}
      <div className="max-w-3xl reveal">

        <span className="section-kicker text-gold-300">
          FUTO ICPC / Student Anti-Corruption Vanguard
        </span>

        <h1 className="font-display font-bold text-5xl md:text-7xl leading-[0.98] mt-6 tracking-tight max-w-3xl">
          Shun Corruption <span className="text-gold-400">—</span> It&rsquo;s Evil.
        </h1>

        <p className="mt-7 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
          Building a generation of students committed to integrity,
          transparency, accountability and responsible leadership.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/register" className="btn-gold btn-shine">
            Join the Vanguard
          </Link>

          <Link to="/report" className="btn-outline">
            Report an Issue
          </Link>

          <Link to="/education" className="btn-outline">
            Learn About Corruption
          </Link>

          <Link to="/actu" className="btn-outline">
            Meet ACTU
          </Link>
        </div>

      </div>

      {/* RIGHT SIDE — CHAIRMAN PORTRAIT */}
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-sm reveal" style={{ animationDelay: '160ms' }}>
          <div className="absolute -inset-3 rounded-[2rem] border border-gold-300/25 pointer-events-none" />
          <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden border border-gold-300/30 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <ReliableImage
              src={assetPath('chairman.jpg')}
              alt="Chairman, FUTO ICPC/SAV"
              eager
              className="w-full h-full object-cover"
              fallback={
                <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-950 flex flex-col items-center justify-center text-center px-6">
                  <Logo light className="justify-center scale-110" />
                  <span className="mt-6 text-xs font-mono uppercase tracking-[0.16em] text-white/40">Chairman&rsquo;s portrait coming soon</span>
                </div>
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="eyebrow text-gold-300">Chairman — 001 of the Vanguard</span>
              <h3 className="font-display text-2xl font-semibold mt-1">Leading with Integrity</h3>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

  <div className="relative border-t border-white/10">
    <div className="container-page section-pad grid grid-cols-2 md:grid-cols-4 gap-8 py-10 md:py-12">
      {stats.map((s) => (
        <StatCounter
          key={s.label}
          value={s.value}
          suffix={s.suffix}
          label={s.label}
        />
      ))}
    </div>
  </div>
</section>

      {/* PUBLIC AWARENESS */}
      <section className="section-pad py-24 md:py-32 bg-mist border-b border-ink-900/[0.04]">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Reveal>
              <SectionHeader
                eyebrow="Public awareness"
                title="See something, say something."
                sub="Corruption thrives in silence. If you notice any of the following happening around you, the Vanguard's reporting channel is open."
              />
            </Reveal>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {['Bribery', 'Extortion', 'Examination malpractice', 'Bullying', 'Fraud', 'Other unethical practices'].map((t, i) => (
                <Reveal key={t} delay={i * 70}>
                  <span className="badge-pill bg-navy-900/[0.05] text-navy-800">{t}</span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <div className="card p-6">
                <div className="eyebrow mb-3">Report any incident of corruption to ICPC/SAV FUTO</div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-700">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wide text-ink-500 mb-1">Phone</div>
                    <div>08145453521 · 0903864818 · 07026136067</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wide text-ink-500 mb-1">Facebook</div>
                    <div>ICPC SAV FUTO</div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-xs font-mono uppercase tracking-wide text-ink-500 mb-1">Email</div>
                    <div>icpcsavfuto@gmail.com</div>
                  </div>
                </div>
                <Link to="/report" className="btn-gold btn-shine mt-6 w-full sm:w-auto">Report an issue now</Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="relative rounded-[1.75rem] overflow-hidden border border-navy-900/10 bg-navy-950 shadow-cardHover mx-auto max-w-md">
              <div className="aspect-[4/5] flex items-center justify-center p-3">
                <ReliableImage
                  src={assetPath('awareness-poster.jpg')}
                  alt="See Something, Say Something — ICPC/SAV FUTO awareness poster"
                  eager
                  className="w-full h-full object-contain rounded-xl"
                  fallback={
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-sm text-center px-6">
                      Awareness poster coming soon
                    </div>
                  }
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY INTEGRITY MATTERS */}
      <section className="section-pad py-24 md:py-32">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
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
          </Reveal>
          <Reveal delay={150}>
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
          </Reveal>
        </div>
      </section>

      {/* PRICE OF CORRUPTION — signature interactive */}
      <section className="section-pad pb-20 md:pb-28">
        <Reveal className="container-page"><PriceOfCorruption /></Reveal>
      </section>

      {/* ACADEMY PREVIEW */}
      <section className="section-pad py-24 md:py-32 bg-mist border-y border-ink-900/[0.04]">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <SectionHeader eyebrow="Anti-Corruption Academy" title="Learn it. Practice it. Get certified." sub="Short, practical courses built for student life — each ending in a quiz and a verifiable digital certificate." />
              <Link to="/academy" className="btn-outline-dark shrink-0">View all courses</Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.slice(0, 3).map((c, i) => (
              <Reveal key={c.id} delay={i * 100}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MYTH VS FACT */}
      <section className="section-pad py-24 md:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeader center eyebrow="Corruption myth vs. fact" title="Tap a card to see what's really true" />
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {mythsFacts.map((m, i) => (
              <Reveal key={i} delay={i * 100}>
                <MythFactCard item={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENTS ON THE GROUND — a quieter, secondary strip */}
      <section className="section-pad py-14 md:py-16">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
              <div>
                <span className="eyebrow">Campaigns in action</span>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-navy-950 mt-2">Students on the ground</h3>
                <p className="text-sm text-ink-500 mt-1 max-w-md">A quieter look — awareness walks, orientation days and everyday sensitization around campus.</p>
              </div>
              <Link to="/campaigns" className="text-sm font-semibold text-navy-900 hover:text-gold-600 shrink-0">See campaigns →</Link>
            </div>
          </Reveal>

          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory scroll-smooth">
            {galleryImages.map((img, i) => (
              <Reveal key={i} delay={(i % 6) * 70} className={`shrink-0 w-44 sm:w-52 snap-start ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}>
                <div className="bg-white p-2 pb-4 rounded-lg border border-ink-900/[0.06] shadow-card hover:shadow-cardHover hover:-translate-y-1 hover:rotate-0 transition-all duration-300">
                  <div className="aspect-[4/5] rounded overflow-hidden bg-mist">
                    <ReliableImage src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11px] text-ink-500 mt-2.5 px-1 leading-snug line-clamp-2">{img.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MemoriesSection />

      {/* LEADERSHIP ARCHIVE */}
      <section className="section-pad py-20 md:py-28 bg-navy-950 text-white">
        <div className="container-page">
          <Reveal>
            <SectionHeader light eyebrow="The Vanguard" title="People who carry the mission" sub="A home for the Chairman, CMO, executive council, past EXCOs and the generals who keep the Vanguard moving." />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 gap-5 mt-10">
            {leadershipImages.map((person, i) => (
              <Reveal key={person.role} delay={i * 90} className={`${person.size === 'large' ? 'sm:col-span-2 lg:col-span-6 lg:row-span-2' : 'lg:col-span-3'} ${i === 2 ? 'lg:row-span-2' : ''}`}>
                <article className="image-card group w-full h-full" style={{ aspectRatio: person.size === 'large' ? '1/1' : '4/5' }}>
                  <ReliableImage src={person.image} alt={person.name} eager className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <span className="eyebrow text-gold-300">{person.role}</span>
                    <h3 className="font-display text-lg md:text-2xl font-semibold mt-1">{person.name}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="text-white/50 text-xs mt-5">Official leadership photographs are shown here as they are provided.</p>
        </div>
      </section>

      {/* DRILLS AND FITNESS */}
      <section className="section-pad py-20 md:py-28 bg-mist">
        <div className="container-page">
          <Reveal>
            <SectionHeader eyebrow="SAV drills and fitness" title="Ready in body. Steady in character." sub="A dedicated space for drills, fitness exercises, team conditioning and the discipline behind service." />
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
            {drillImages.map((drill, i) => (
              <Reveal key={drill.image} delay={(i % 6) * 70} className={i === 0 ? 'col-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}>
                <article className="rounded-2xl overflow-hidden border border-ink-900/[0.06] shadow-card group transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover w-full h-full aspect-square">
                  <ReliableImage src={drill.image} alt={drill.title} eager className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </article>
              </Reveal>
            ))}
          </div>
          <p className="text-xs text-ink-500 mt-5">Drill and fitness photographs can be updated with official SAV activity images.</p>
        </div>
      </section>

      {/* CAMPAIGNS + EVENTS PREVIEW */}
      <section className="section-pad py-20 md:py-28 bg-mist">
        <div className="container-page grid lg:grid-cols-2 gap-14">
          <Reveal>
            <SectionHeader eyebrow="Campaigns" title="Active on campus" />
            <div className="grid gap-5">
              {campaigns.slice(0, 2).map((c) => <CampaignCard key={c.id} campaign={c} />)}
            </div>
            <Link to="/campaigns" className="inline-block mt-6 text-sm font-semibold text-navy-900 hover:text-gold-600">All campaigns →</Link>
          </Reveal>
          <Reveal delay={120}>
            <SectionHeader eyebrow="Events" title="Upcoming on calendar" />
            {eventsLoading ? (
              <p className="text-sm text-ink-500">Loading events…</p>
            ) : eventsError ? (
              <p className="text-sm text-ink-500">Events are temporarily unavailable — please check back shortly.</p>
            ) : events.length === 0 ? (
              <p className="text-sm text-ink-500">No upcoming events yet — check back soon.</p>
            ) : (
              <div className="grid gap-4">
                {events.slice(0, 3).map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            )}
            <Link to="/events" className="inline-block mt-6 text-sm font-semibold text-navy-900 hover:text-gold-600">All events →</Link>
          </Reveal>
        </div>
      </section>

      {/* PLEDGE CTA */}
      <section className="section-pad py-24">
        <div className="container-page">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 text-white p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
              <div className="relative max-w-xl mx-auto">
                <span className="eyebrow text-gold-300">The Integrity Pledge</span>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mt-4">&ldquo;I choose integrity.&rdquo;</h2>
                <p className="text-white/60 mt-4">Make it personal. Commit to a set of concrete, everyday choices — and get a digital confirmation you can keep.</p>
                <Link to="/pledge" className="btn-gold btn-shine mt-7 inline-flex">Take the pledge</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}