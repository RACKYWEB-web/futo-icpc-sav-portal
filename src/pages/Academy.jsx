import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { SectionHeader, CourseCard } from '../components/Cards.jsx'

export default function Academy() {
  const { courses, currentUser, db } = useApp()
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(courses.map((c) => c.category))]
  const filtered = category === 'All' ? courses : courses.filter((c) => c.category === category)
  const progress = currentUser ? db.courseProgress[currentUser.id] || {} : {}

  return (
    <div className="container-page section-pad py-16 md:py-20">
      <SectionHeader eyebrow="SAV Anti-Corruption Academy" title="Practical courses for student life" sub="Each course pairs short lessons with a quiz. Passing issues a verifiable digital certificate." />
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`badge-pill px-4 py-2 text-sm ${category === c ? 'bg-navy-950 text-white' : 'bg-navy-900/[0.05] text-navy-800 hover:bg-navy-900/10'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => <CourseCard key={c.id} course={c} progress={progress[c.id]} />)}
      </div>
    </div>
  )
}
