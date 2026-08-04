import { Link } from 'react-router-dom'

export function SectionHeader({ eyebrow, title, sub, center = false, light = false }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} mb-10`}>
      {eyebrow && <div className={`eyebrow mb-3 ${light ? 'text-gold-300' : ''}`}>{eyebrow}</div>}
      <h2 className={`font-display text-3xl md:text-4xl font-semibold leading-tight ${light ? 'text-white' : 'text-navy-950'}`}>{title}</h2>
      {sub && <p className={`mt-3 text-[15px] leading-relaxed ${light ? 'text-white/60' : 'text-ink-500'}`}>{sub}</p>}
      <div className={`divider-gold mt-5 ${center ? 'mx-auto' : ''}`} />
    </div>
  )
}

export function GalleryPhotoCard({ image, className = '', aspect = 'aspect-[5/4]' }) {
  return (
    <div className={`group relative overflow-hidden rounded-[1.35rem] border border-navy-900/[0.08] bg-white/70 p-1 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.45)] ${aspect} ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[1.15rem]">
        <img
          src={image.url}
          alt={image.caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent transition-opacity duration-300" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[1.15rem]" />
        <span className="absolute bottom-3 left-3 right-3 text-white text-[11px] sm:text-xs font-medium leading-snug">
          {image.caption}
        </span>
      </div>
    </div>
  )
}

export function CourseCard({ course, progress }) {
  const completedCount = progress?.completedLessons?.length || 0
  const pct = Math.round((completedCount / course.lessons.length) * 100)
  return (
    <Link to={`/academy/${course.id}`} className="card card-hover p-5 flex flex-col group">
      <span className="badge-pill bg-navy-900/5 text-navy-800 w-fit">{course.category}</span>
      <h3 className="font-display font-semibold text-lg mt-3 text-navy-950 group-hover:text-navy-700">{course.title}</h3>
      <p className="text-sm text-ink-500 mt-2 leading-relaxed flex-1">{course.description}</p>
      <div className="mt-4">
        <div className="h-1.5 rounded-full bg-ink-900/[0.06] overflow-hidden">
          <div className="h-full bg-gold-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-ink-500 font-mono">
          <span>{course.lessons.length} lessons</span>
          <span>{progress?.completed ? 'Completed' : `${pct}%`}</span>
        </div>
      </div>
    </Link>
  )
}

export function CampaignCard({ campaign, joined, onJoin }) {
  return (
    <div className="card card-hover p-5 flex flex-col">
      <div className="h-28 rounded-xl mb-4 relative overflow-hidden">
        {campaign.image ? (
          <img src={campaign.image} alt="" loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-900 to-navy-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
        <span className="absolute bottom-2 left-3 font-display text-white/95 text-sm tracking-wide">{campaign.title}</span>
      </div>
      <p className="text-sm text-ink-500 leading-relaxed flex-1">{campaign.description}</p>
      <div className="flex items-center justify-between mt-4 text-xs text-ink-500 font-mono">
        <span>{campaign.date}</span>
        <span>{campaign.participants} joined</span>
      </div>
      {onJoin && (
        <button onClick={() => onJoin(campaign.id)} disabled={joined}
          className={`mt-4 btn ${joined ? 'bg-ink-900/[0.06] text-ink-500' : 'btn-navy'} w-full text-sm`}>
          {joined ? 'Participating' : 'Join campaign'}
        </button>
      )}
    </div>
  )
}

export function EventCard({ event, registered, onRegister }) {
  const date = new Date(event.date)
  return (
    <div className="card card-hover p-5 flex gap-4">
      <div className="shrink-0 w-16 h-16 rounded-xl bg-navy-950 text-white flex flex-col items-center justify-center">
        <span className="font-mono text-[10px] uppercase text-gold-300">{date.toLocaleString('en-US', { month: 'short' })}</span>
        <span className="font-display text-xl font-semibold">{date.getDate()}</span>
      </div>
      <div className="flex-1">
        <h3 className="font-display font-semibold text-navy-950">{event.title}</h3>
        <p className="text-xs text-ink-500 mt-1">{event.time} · {event.location}</p>
        <p className="text-sm text-ink-500 mt-2 leading-relaxed">{event.description}</p>
        {onRegister && (
          <button onClick={() => onRegister(event.id)} disabled={registered}
            className={`mt-3 text-sm font-semibold ${registered ? 'text-ink-500' : 'text-navy-900 hover:text-gold-600'}`}>
            {registered ? '✓ Registered' : 'Register →'}
          </button>
        )}
      </div>
    </div>
  )
}