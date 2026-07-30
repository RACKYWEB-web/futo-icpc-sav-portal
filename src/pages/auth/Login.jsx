import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext.jsx'
import Logo from '../../components/Logo.jsx'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(identifier, password)
    if (!result.ok) return setError(result.message)
    navigate(result.role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 md:p-10">
        <div className="flex justify-center mb-6"><Logo /></div>
        <h1 className="font-display text-2xl font-semibold text-navy-950 text-center">Welcome back</h1>
        <p className="text-ink-500 text-sm text-center mt-1 mb-8">Log in to your SAV member account.</p>

        {error && <div className="rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3 mb-5">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-navy-950 block mb-1.5">Username or email</label>
            <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-950 block mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
          <div className="flex justify-end"><Link to="/forgot-password" className="text-xs text-ink-500 hover:text-navy-900">Forgot password?</Link></div>
          <button type="submit" className="btn-gold w-full">Log in</button>
        </form>

        <div className="mt-6 rounded-xl bg-mist p-3 text-xs text-ink-500 font-mono leading-relaxed">
          Demo member — username: <b>demo</b> · password: <b>demo1234</b><br />
          Demo admin — username: <b>admin</b> · password: <b>admin123</b>
        </div>

        <p className="text-center text-sm text-ink-500 mt-6">New to SAV? <Link to="/register" className="text-gold-600 font-semibold">Join the Vanguard</Link></p>
      </div>
    </div>
  )
}
