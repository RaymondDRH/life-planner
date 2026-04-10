import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getToday } from '../lib/dateUtils'

export function useBibleSessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const today = getToday()

  useEffect(() => {
    supabase.from('bible_sessions')
      .select('*')
      .order('date', { ascending: false })
      .limit(60)
      .then(({ data }) => {
        setSessions(data || [])
        setLoading(false)
      })
  }, [])

  const todaySession = sessions.find(s => s.date === today)

  const markToday = useCallback(async (phase, book) => {
    if (todaySession) return // ya marcado hoy
    const { data } = await supabase.from('bible_sessions')
      .upsert({ date: today, phase, book }, { onConflict: 'date' })
      .select().single()
    if (data) setSessions(prev => [data, ...prev])
  }, [today, todaySession])

  // Racha consecutiva
  const streak = (() => {
    if (sessions.length === 0) return 0
    let count = 0
    const d = new Date()
    for (let i = 0; i < 60; i++) {
      const dateStr = d.toLocaleDateString('en-CA')
      if (sessions.find(s => s.date === dateStr)) {
        count++
        d.setDate(d.getDate() - 1)
      } else {
        break
      }
    }
    return count
  })()

  return { sessions, loading, todaySession, markToday, streak }
}
