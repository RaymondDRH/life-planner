import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getToday } from '../lib/dateUtils'

export function useDailyTasks(date) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!date) return
    supabase.from('daily_tasks')
      .select('*')
      .eq('date', date)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setTasks(data || [])
        setLoading(false)
      })
  }, [date])

  const addTask = useCallback(async (text) => {
    const { data } = await supabase.from('daily_tasks')
      .insert({ date, text, done: false })
      .select().single()
    if (data) setTasks(prev => [...prev, data])
  }, [date])

  const toggleTask = useCallback(async (id, done) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !done } : t))
    await supabase.from('daily_tasks').update({ done: !done }).eq('id', id)
  }, [])

  const deleteTask = useCallback(async (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    await supabase.from('daily_tasks').delete().eq('id', id)
  }, [])

  return { tasks, loading, addTask, toggleTask, deleteTask }
}
