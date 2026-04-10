import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getToday } from '../lib/dateUtils'

export function useDailyLog() {
  const [log, setLog] = useState({ energy: null, sleep_hours: null })
  const [loading, setLoading] = useState(true)
  const today = getToday()

  useEffect(() => {
    supabase
      .from('daily_log')
      .select('energy, sleep_hours')
      .eq('date', today)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setLog({ energy: data.energy, sleep_hours: data.sleep_hours })
        setLoading(false)
      })
  }, [today])

  const updateLog = useCallback(async (energy, sleep_hours) => {
    setLog({ energy, sleep_hours })
    await supabase.from('daily_log').upsert(
      { date: today, energy, sleep_hours, updated_at: new Date().toISOString() },
      { onConflict: 'date' }
    )
  }, [today])

  return { log, loading, updateLog }
}
