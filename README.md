# FUTO ICPC/SAV — Student Anti-Corruption Vanguard Platform

A premium, responsive civic-tech web application for the FUTO Independent Corrupt Practices and Other Related Offences Commission (ICPC) Student Anti-Corruption Vanguard (SAV).

**"Shun Corruption — It's Evil."**

## What's included

- **Public site** — landing page with animated stats and the "Price of Corruption" interactive resource-flow visualization, About, Anti-Corruption Education (forms of corruption, effects in Nigeria by sector, global corruption facts), Academy course catalog, Campaigns, Events, Resource Center + FAQ, Reporting platform, Integrity Pledge, Contact, Certificate Verification.
- **Authentication** — Register (full student fields), Login, Forgot Password (all mocked client-side — no real backend).
- **Member Dashboard** — Overview stats, Profile with badges, Academy course progress + quizzes + certificates, Campaigns, Events, My Reports with status tracker, Certificates, Notifications, Settings.
- **Admin Dashboard** — Overview stats, Members table, Reports management (status updates), Campaigns, Events.
- **Gamification** — integrity points, badges, the Integrity Pledge.

## Important: this is a frontend prototype

All data (accounts, reports, course progress, certificates, campaign/event participation) is stored in the browser's `localStorage` — there is **no real backend, database, or authentication server**. This is intentional: it lets you demo the full experience immediately, but before going live you'll want to:

- Replace the mock auth in `src/context/AppContext.jsx` with real authentication (e.g. a Node/Express + PostgreSQL API, or a BaaS like Supabase/Firebase).
- Move `courses`, `campaigns`, `events`, `resources` from `src/data/mockData.js` into a real database.
- Add Paystack/Flutterwave integration for any paid features.
- Add real email verification and password reset flows.
- Add server-side validation and access control — the current role checks are client-side only and not secure on their own.

## Demo accounts

| Role   | Username | Password  |
|--------|----------|-----------|
| Member | `demo`   | `demo1234`|
| Admin  | `admin`  | `admin123`|

Or register a brand-new member account from `/register`.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Tech stack

- React 18 + Vite
- React Router v6
- Tailwind CSS (custom navy/gold institutional design tokens in `tailwind.config.js`)
- No external UI kit — all components are hand-built in `src/components`

## Project structure

```
src/
  components/     Navbar, Footer, Logo, dashboard/admin layouts, cards, route guards
  context/        AppContext.jsx — auth + all app state, persisted to localStorage
  data/           mockData.js — courses, campaigns, events, FAQs, resources, etc.
  pages/          Public pages
  pages/auth/     Register, Login, Forgot Password
  pages/dashboard/ Member dashboard pages
  pages/admin/    Admin dashboard pages
```

## Content note

Per the design brief, this platform avoids fabricating ICPC/FUTO/government statistics. Landing page numbers and course participation counts are illustrative placeholders — swap them for verified figures before publishing. The Global Corruption section points to Transparency International, UNODC and World Bank as starting sources for real data.
