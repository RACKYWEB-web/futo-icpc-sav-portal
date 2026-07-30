import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import { RequireMember, RequireAdmin } from './components/ProtectedRoute.jsx'

import Landing from './pages/Landing.jsx'
import About from './pages/About.jsx'
import Education from './pages/Education.jsx'
import Academy from './pages/Academy.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import Campaigns from './pages/Campaigns.jsx'
import Events from './pages/Events.jsx'
import Resources from './pages/Resources.jsx'
import Report from './pages/Report.jsx'
import Pledge from './pages/Pledge.jsx'
import Contact from './pages/Contact.jsx'
import Verify from './pages/Verify.jsx'
import { Privacy, Terms } from './pages/Legal.jsx'

import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'

import Overview from './pages/dashboard/Overview.jsx'
import Community from './pages/dashboard/Community.jsx'
import Profile from './pages/dashboard/Profile.jsx'
import MyAcademy from './pages/dashboard/MyAcademy.jsx'
import MyCampaigns from './pages/dashboard/MyCampaigns.jsx'
import MyEvents from './pages/dashboard/MyEvents.jsx'
import MyReports from './pages/dashboard/MyReports.jsx'
import Certificates from './pages/dashboard/Certificates.jsx'
import Notifications from './pages/dashboard/Notifications.jsx'
import Settings from './pages/dashboard/Settings.jsx'

import AdminOverview from './pages/admin/AdminOverview.jsx'
import AdminMembers from './pages/admin/AdminMembers.jsx'
import AdminReports from './pages/admin/AdminReports.jsx'
import AdminCampaigns from './pages/admin/AdminCampaigns.jsx'
import AdminEvents from './pages/admin/AdminEvents.jsx'

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/education" element={<PublicLayout><Education /></PublicLayout>} />
      <Route path="/academy" element={<PublicLayout><Academy /></PublicLayout>} />
      <Route path="/academy/:id" element={<PublicLayout><CourseDetail /></PublicLayout>} />
      <Route path="/campaigns" element={<PublicLayout><Campaigns /></PublicLayout>} />
      <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
      <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
      <Route path="/report" element={<PublicLayout><Report /></PublicLayout>} />
      <Route path="/pledge" element={<PublicLayout><Pledge /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/verify" element={<PublicLayout><Verify /></PublicLayout>} />
      <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
      <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />

      {/* Auth */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Member dashboard */}
      <Route path="/dashboard" element={<RequireMember><DashboardLayout><Overview /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/community" element={<RequireMember><DashboardLayout><Community /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/profile" element={<RequireMember><DashboardLayout><Profile /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/academy" element={<RequireMember><DashboardLayout><MyAcademy /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/campaigns" element={<RequireMember><DashboardLayout><MyCampaigns /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/events" element={<RequireMember><DashboardLayout><MyEvents /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/reports" element={<RequireMember><DashboardLayout><MyReports /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/certificates" element={<RequireMember><DashboardLayout><Certificates /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/notifications" element={<RequireMember><DashboardLayout><Notifications /></DashboardLayout></RequireMember>} />
      <Route path="/dashboard/settings" element={<RequireMember><DashboardLayout><Settings /></DashboardLayout></RequireMember>} />

      {/* Admin dashboard */}
      <Route path="/admin" element={<RequireAdmin><AdminLayout><AdminOverview /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/members" element={<RequireAdmin><AdminLayout><AdminMembers /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/reports" element={<RequireAdmin><AdminLayout><AdminReports /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/campaigns" element={<RequireAdmin><AdminLayout><AdminCampaigns /></AdminLayout></RequireAdmin>} />
      <Route path="/admin/events" element={<RequireAdmin><AdminLayout><AdminEvents /></AdminLayout></RequireAdmin>} />

      <Route path="*" element={<PublicLayout><div className="container-page section-pad py-24 text-center"><h1 className="font-display text-3xl font-semibold text-navy-950">Page not found</h1></div></PublicLayout>} />
    </Routes>
  )
}
