import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { getWeekDates } from '../lib/dateUtils'

export function useWeeklyCompletions() {
  const [data, setData] = useState([]) // [{date, item_key}]
  const [loading, setLoading] = useState(true)
  const dates = getWeekDates()

  useEffect(() => {
    supabase
      .from('checklist_completions')
      .select('date, item_key')
      .gte('date', dates[0])
      .lte('date', dates[6])
      .then(({ data: rows }) => {
        setData(rows || [])
        setLoading(false)
      })
  }, [])

  return { data, loading, dates }
}

export function useWeeklyEnergyLog() {
  const [data, setData] = useState([])
  const dates = getWeekDates()

  useEffect(() => {
    supabase
      .from('daily_log')
      .select('date, energy, sleep_hours')
      .gte('date', dates[0])
      .lte('date', dates[6])
      .then(({ data: rows }) => setData(rows || []))
  }, [])

  return { data, dates }
}

export function useMonthlyEnergyLog() {
  const [data, setData] = useState([])

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1).toLocaleDateString('en-CA')
  const lastDay = new Date(year, month + 1, 0).toLocaleDateString('en-CA')
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Array of all dates in current month
  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(year, month, i + 1)
    return d.toLocaleDateString('en-CA')
  })

  useEffect(() => {
    supabase
      .from('daily_log')
      .select('date, energy, sleep_hours')
      .gte('date', firstDay)
      .lte('date', lastDay)
      .then(({ data: rows }) => setData(rows || []))
  }, [])

  return { data, dates, daysInMonth }
}
