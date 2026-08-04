// Force a clean provider remount when Fast Refresh updates this context module.
// This prevents stale consumers from rendering outside the refreshed provider.
/* @refresh reset */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { courses, campaigns, events as staticEvents } from '../data/mockData.js'
import { useSheetEvents } from '../data/useSheetEvents.js'

const AppContext = createContext(null)
const DB_KEY = 'futo_sav_db_v1'

function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Could not read local data, starting fresh.', e)
  }
  return seedDB()
}

function seedDB() {
  const now = new Date().toISOString()
  return {
    users: [
      {
        id: 'u-admin',
        fullName: 'Coordinator Admin',
        email: 'admin@futosav.org',
        username: 'admin',
        password: 'admin123',
        matric: '—',
        department: 'SAV Coordination',
        faculty: '—',
        level: '—',
        gender: '—',
        role: 'admin',
        joinedAt: now,
        integrityPoints: 0,
        badges: [],
      },
      {
        id: 'u-demo',
        fullName: 'Chidinma Okafor',
        email: 'demo@futosav.org',
        username: 'demo',
        password: 'demo1234',
        matric: '20201234567',
        department: 'Computer Science',
        faculty: 'School of Computing',
        level: '300',
        gender: 'Female',
        role: 'member',
        joinedAt: now,
        integrityPoints: 40,
        badges: ['Integrity Champion'],
      },
    ],
    currentUserId: null,
    courseProgress: {
      'u-demo': {
        'c1': { completedLessons: [1, 2, 3], quizScore: 80, completed: false },
      },
    },
    campaignParticipation: { 'u-demo': ['camp-2'] },
    eventRegistrations: { 'u-demo': ['ev-1'] },
    reports: [],
    pledges: {},
    notifications: {
      'u-demo': [
        { id: 'n1', text: 'Welcome to FUTO SAV. Your membership is active.', read: false, createdAt: now },
      ],
    },
    certificates: [],
  }
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

let refCounter = 1000

export function AppProvider({ children }) {
  const [db, setDb] = useState(loadDB)
  const { events: sheetEvents, loading: eventsLoading, error: eventsError } = useSheetEvents()

  // While the sheet is loading, or if it's briefly unreachable, fall back to
  // the static demo events so the app never shows a blank screen. Once the
  // sheet loads successfully, live data takes over everywhere automatically.
  const events = (eventsLoading || eventsError) ? staticEvents : sheetEvents

  useEffect(() => {
    saveDB(db)
  }, [db])

  const currentUser = db.users.find((u) => u.id === db.currentUserId) || null

  const update = useCallback((fn) => {
    setDb((prev) => {
      const next = structuredClone(prev)
      fn(next)
      return next
    })
  }, [])

  const register = useCallback((form) => {
    let result = { ok: false, message: '' }
    update((next) => {
      if (next.users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) {
        result = { ok: false, message: 'An account with this email already exists.' }
        return
      }
      if (next.users.some((u) => u.username.toLowerCase() === form.username.toLowerCase())) {
        result = { ok: false, message: 'That username is taken. Please choose another.' }
        return
      }
      const id = 'u-' + Date.now()
      next.users.push({
        id,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        matric: form.matric,
        department: form.department,
        faculty: form.faculty,
        level: form.level,
        gender: form.gender,
        username: form.username,
        password: form.password,
        role: 'member',
        joinedAt: new Date().toISOString(),
        integrityPoints: 10,
        badges: [],
      })
      next.notifications[id] = [
        { id: 'n-' + Date.now(), text: 'Registration received. Welcome to the Vanguard.', read: false, createdAt: new Date().toISOString() },
      ]
      next.currentUserId = id
      result = { ok: true, message: 'Account created.' }
    })
    return result
  }, [update])

  const login = useCallback((identifier, password) => {
    let result = { ok: false, message: '' }
    update((next) => {
      const user = next.users.find(
        (u) => (u.username.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === identifier.toLowerCase()) && u.password === password
      )
      if (!user) {
        result = { ok: false, message: 'Incorrect username/email or password.' }
        return
      }
      next.currentUserId = user.id
      result = { ok: true, role: user.role }
    })
    return result
  }, [update])

  const logout = useCallback(() => {
    update((next) => { next.currentUserId = null })
  }, [update])

  const submitReport = useCallback((report) => {
    const refNumber = 'SAV-' + new Date().getFullYear() + '-' + (refCounter++).toString().padStart(5, '0')
    update((next) => {
      next.reports.push({
        id: 'r-' + Date.now(),
        refNumber,
        userId: report.anonymous ? null : (next.currentUserId || null),
        type: report.type,
        date: report.date,
        location: report.location,
        description: report.description,
        anonymous: report.anonymous,
        status: 'Submitted',
        createdAt: new Date().toISOString(),
      })
    })
    return refNumber
  }, [update])

  const updateReportStatus = useCallback((reportId, status) => {
    update((next) => {
      const r = next.reports.find((r) => r.id === reportId)
      if (r) r.status = status
    })
  }, [update])

  const completeLesson = useCallback((userId, courseId, lessonId) => {
    update((next) => {
      if (!next.courseProgress[userId]) next.courseProgress[userId] = {}
      if (!next.courseProgress[userId][courseId]) next.courseProgress[userId][courseId] = { completedLessons: [], quizScore: null, completed: false }
      const progress = next.courseProgress[userId][courseId]
      if (!progress.completedLessons.includes(lessonId)) progress.completedLessons.push(lessonId)
    })
  }, [update])

  const submitQuiz = useCallback((userId, courseId, score, passMark) => {
    let earnedCert = null
    update((next) => {
      if (!next.courseProgress[userId]) next.courseProgress[userId] = {}
      if (!next.courseProgress[userId][courseId]) next.courseProgress[userId][courseId] = { completedLessons: [], quizScore: null, completed: false }
      const progress = next.courseProgress[userId][courseId]
      progress.quizScore = score
      if (score >= passMark && !progress.completed) {
        progress.completed = true
        const course = courses.find((c) => c.id === courseId)
        const certId = 'CERT-' + Date.now().toString().slice(-8)
        next.certificates.push({
          id: certId,
          userId,
          title: course ? course.title : 'Course',
          issuedAt: new Date().toISOString(),
        })
        const user = next.users.find((u) => u.id === userId)
        if (user) user.integrityPoints += 20
        earnedCert = certId
      }
    })
    return earnedCert
  }, [update])

  const joinCampaign = useCallback((userId, campaignId) => {
    update((next) => {
      if (!next.campaignParticipation[userId]) next.campaignParticipation[userId] = []
      if (!next.campaignParticipation[userId].includes(campaignId)) {
        next.campaignParticipation[userId].push(campaignId)
        const user = next.users.find((u) => u.id === userId)
        if (user) user.integrityPoints += 5
      }
    })
  }, [update])

  const registerEvent = useCallback((userId, eventId) => {
    update((next) => {
      if (!next.eventRegistrations[userId]) next.eventRegistrations[userId] = []
      if (!next.eventRegistrations[userId].includes(eventId)) {
        next.eventRegistrations[userId].push(eventId)
      }
    })
  }, [update])

  const signPledge = useCallback((userId, commitments) => {
    update((next) => {
      next.pledges[userId] = { signedAt: new Date().toISOString(), commitments }
      const user = next.users.find((u) => u.id === userId)
      if (user) {
        user.integrityPoints += 15
        if (!user.badges.includes('Integrity Advocate')) user.badges.push('Integrity Advocate')
      }
    })
  }, [update])

  const markNotificationsRead = useCallback((userId) => {
    update((next) => {
      const list = next.notifications[userId] || []
      list.forEach((n) => { n.read = true })
    })
  }, [update])

  const value = {
    db,
    currentUser,
    courses,
    campaigns,
    events,
    eventsLoading,
    eventsError,
    register,
    login,
    logout,
    submitReport,
    updateReportStatus,
    completeLesson,
    submitQuiz,
    joinCampaign,
    registerEvent,
    signPledge,
    markNotificationsRead,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}