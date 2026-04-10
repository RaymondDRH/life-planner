import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getToday } from '../lib/dateUtils'

export function useChecklist() {
  const [completions, setCompletions] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const today = getToday()

  useEffect(() => {
    supabase
      .from('checklist_completions')
      .select('item_key')
      .eq('date', today)
      .then(({ data }) => {
        if (data) setCompletions(new Set(data.map(r => r.item_key)))
        setLoading(false)
      })
  }, [today])

  const toggle = useCallback(async (key) => {
    const done = completions.has(key)
    // Optimistic update
    setCompletions(prev => {
      const next = new Set(prev)
      done ? next.delete(key) : next.add(key)
      return next
    })
    if (done) {
      await supabase.from('checklist_completions').delete().match({ date: today, item_key: key })
    } else {
      await supabase.from('checklist_completions').upsert({ date: today, item_key: key }, { onConflict: 'date,item_key' })
    }
  }, [completions, today])

  return { completions, loading, toggle }
}
