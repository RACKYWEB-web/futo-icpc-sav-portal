import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export function RequireMember({ children }) {
  const { currentUser } = useApp()
  if (!currentUser) return <Navigate to="/login" replace />
  return children
}

export function RequireAdmin({ children }) {
  const { currentUser } = useApp()
  if (!currentUser) return <Navigate to="/login" replace />
  if (currentUser.role !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}
