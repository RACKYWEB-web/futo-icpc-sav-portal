import { useApp } from '../../context/AppContext.jsx'
import { CourseCard } from '../../components/Cards.jsx'

export default function MyAcademy() {
  const { currentUser, db, courses } = useApp()
  const progress = db.courseProgress[currentUser.id] || {}
  const inProgress = courses.filter((c) => progress[c.id] && !progress[c.id].completed)
  const completed = courses.filter((c) => progress[c.id]?.completed)
  const notStarted = courses.filter((c) => !progress[c.id])

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy-950 mb-6">Academy & courses</h1>

      {inProgress.length > 0 && (
        <>
          <h2 className="eyebrow mb-3">In progress</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {inProgress.map((c) => <CourseCard key={c.id} course={c} progress={progress[c.id]} />)}
          </div>
        </>
      )}

      {completed.length > 0 && (
        <>
          <h2 className="eyebrow mb-3">Completed</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {completed.map((c) => <CourseCard key={c.id} course={c} progress={progress[c.id]} />)}
          </div>
        </>
      )}

      <h2 className="eyebrow mb-3">Not started</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {notStarted.map((c) => <CourseCard key={c.id} course={c} progress={progress[c.id]} />)}
      </div>
    </div>
  )
}
