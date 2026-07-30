import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo.jsx'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 md:p-10">
        <div className="flex justify-center mb-6"><Logo /></div>
        <h1 className="font-display text-2xl font-semibold text-navy-950 text-center">Reset your password</h1>
        <p className="text-ink-500 text-sm text-center mt-1 mb-8">Enter your account email and we&rsquo;ll send reset instructions.</p>
        {sent ? (
          <div className="rounded-xl bg-gold-500/10 border border-gold-500/30 p-4 text-sm text-navy-900 text-center">
            If an account exists for that email, reset instructions have been sent.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
            <input type="email" required placeholder="Email address" className="w-full rounded-xl border border-ink-900/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
            <button type="submit" className="btn-gold w-full">Send reset link</button>
          </form>
        )}
        <p className="text-center text-sm text-ink-500 mt-6"><Link to="/login" className="text-gold-600 font-semibold">Back to login</Link></p>
      </div>
    </div>
  )
}
