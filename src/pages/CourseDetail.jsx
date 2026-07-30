import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function CourseDetail() {
  const { id } = useParams()
  const { courses, currentUser, db, completeLesson, submitQuiz } = useApp()
  const course = courses.find((c) => c.id === id)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  if (!course) return <div className="container-page section-pad py-20">Course not found. <Link to="/academy" className="text-gold-600">Back to Academy</Link></div>

  const progress = currentUser ? db.courseProgress[currentUser.id]?.[course.id] : null
  const completedLessons = progress?.completedLessons || []

  const handleLesson = (lessonId) => {
    if (!currentUser) return
    completeLesson(currentUser.id, course.id, lessonId)
  }

  const handleQuizSubmit = (e) => {
    e.preventDefault()
    if (!currentUser) return
    const correct = course.quiz.filter((q, i) => answers[i] === q.answer).length
    const score = Math.round((correct / course.quiz.length) * 100)
    const certId = submitQuiz(currentUser.id, course.id, score, course.passMark)
    setResult({ score, passed: score >= course.passMark, certId })
  }

  const allLessonsDone = completedLessons.length >= course.lessons.length

  return (
    <div className="container-page section-pad py-16 md:py-20 max-w-3xl">
      <Link to="/academy" className="text-sm text-ink-500 hover:text-navy-900">← Academy</Link>
      <span className="eyebrow block mt-4">{course.category}</span>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy-950 mt-2">{course.title}</h1>
      <p className="text-ink-500 mt-3 leading-relaxed">{course.description}</p>

      {!currentUser && (
        <div className="mt-6 rounded-xl bg-gold-500/10 border border-gold-500/30 p-4 text-sm text-navy-900">
          <Link to="/login" className="font-semibold underline">Log in</Link> or <Link to="/register" className="font-semibold underline">join SAV</Link> to track lesson progress and earn a certificate.
        </div>
      )}

      <div className="mt-10">
        <div className="eyebrow mb-4">Lessons</div>
        <div className="space-y-3">
          {course.lessons.map((l) => {
            const done = completedLessons.includes(l.id)
            return (
              <div key={l.id} className="card p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-navy-950">{l.title}</div>
                  <div className="text-xs text-ink-500 font-mono mt-1">{l.duration}</div>
                </div>
                <button onClick={() => handleLesson(l.id)} disabled={!currentUser || done}
                  className={`btn text-xs px-4 py-2 ${done ? 'bg-gold-500/15 text-gold-600' : 'btn-navy'}`}>
                  {done ? '✓ Done' : 'Mark complete'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-12">
        <div className="eyebrow mb-4">Quiz {!allLessonsDone && currentUser && <span className="text-ink-500 normal-case font-body">(complete all lessons first)</span>}</div>
        {progress?.completed ? (
          <div className="card p-6 bg-gold-500/10 border-gold-500/30">
            <p className="font-display text-lg text-navy-950">Course completed — score {progress.quizScore}%.</p>
            <Link to="/dashboard/certificates" className="text-sm text-gold-600 font-semibold mt-2 inline-block">View your certificate →</Link>
          </div>
        ) : (
          <form onSubmit={handleQuizSubmit} className={`space-y-6 ${(!currentUser || !allLessonsDone) ? 'opacity-50 pointer-events-none' : ''}`}>
            {course.quiz.map((q, i) => (
              <div key={i} className="card p-5">
                <p className="font-medium text-navy-950 mb-3">{i + 1}. {q.q}</p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label key={oi} className="flex items-center gap-2.5 text-sm text-ink-700 cursor-pointer">
                      <input type="radio" name={`q${i}`} className="accent-gold-500" onChange={() => setAnswers((a) => ({ ...a, [i]: oi }))} required />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" className="btn-gold">Submit quiz</button>
          </form>
        )}
        {result && (
          <div className={`mt-5 card p-5 ${result.passed ? 'bg-gold-500/10 border-gold-500/30' : 'bg-red-50 border-red-200'}`}>
            <p className="font-display text-lg text-navy-950">Score: {result.score}% — {result.passed ? 'Passed! Certificate issued.' : `Need ${course.passMark}% to pass. Review the lessons and try again.`}</p>
            {result.passed && <Link to="/dashboard/certificates" className="text-sm text-gold-600 font-semibold mt-2 inline-block">View your certificate →</Link>}
          </div>
        )}
      </div>
    </div>
  )
}
