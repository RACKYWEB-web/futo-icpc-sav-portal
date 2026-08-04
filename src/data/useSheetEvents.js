import { useEffect, useState } from 'react'

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5hWzThzaIuZ620LzEnHWvBQTIN39e_1UbkKnFt7sLfzD1CmX6hPCDYKuXxCZ-_u1apFRnnsnFYM3q/pub?gid=0&single=true&output=csv'

// A small, dependency-free CSV parser that correctly handles quoted fields
// containing commas (Google Sheets quotes any field with a comma in it).
function parseCSV(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') { field += '"'; i++ }
      else if (char === '"') { inQuotes = false }
      else { field += char }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(field); field = ''
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && next === '\n') i++
      row.push(field); field = ''
      if (row.length > 1 || row[0] !== '') rows.push(row)
      row = []
    } else {
      field += char
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

// Reads the shared FUTO ICPC/SAV events sheet and turns it into the same
// event-object shape the rest of the site expects. Any SAV head with Editor
// access on the sheet can add/update rows and it shows up here automatically.
export function useSheetEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(`${SHEET_CSV_URL}&cachebust=${Date.now()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load the events sheet')
        return res.text()
      })
      .then((text) => {
        if (cancelled) return
        const rows = parseCSV(text).filter((r) => r.some((cell) => cell.trim() !== ''))
        const [header, ...dataRows] = rows
        const cols = (header || []).map((h) => h.trim().toLowerCase())

        const parsed = dataRows
          .map((r, i) => {
            const get = (name) => {
              const idx = cols.indexOf(name)
              return idx === -1 ? '' : (r[idx] || '').trim()
            }
            return {
              id: `sheet-${i}`,
              title: get('title'),
              date: get('date'),
              time: get('time'),
              location: get('location'),
              description: get('description'),
              capacity: Number(get('capacity')) || 0,
              registered: 0,
            }
          })
          .filter((e) => e.title)

        setEvents(parsed)
        setLoading(false)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { events, loading, error }
}