import { useEffect, useState } from 'react'
import { profile } from '../data/site'

const format = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: profile.timeZone,
})

// "Kochi · 21:04 IST", rendered client-side, refreshed every 30 seconds.
export function LocalClock() {
  const [time, setTime] = useState(() => format.format(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setTime(format.format(new Date())), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className="tabular-nums">
      {profile.city} · {time} {profile.timeZoneLabel}
    </span>
  )
}
