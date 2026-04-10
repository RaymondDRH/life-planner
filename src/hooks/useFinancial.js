import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getWeekDates } from '../lib/dateUtils'

export function useEmergencyFund() {
  const [fund, setFund] = useState({ amount: 0, goal: 3000, id: null })

  useEffect(() => {
    supabase.from('emergency_fund').select('*').limit(1).single()
      .then(({ data }) => { if (data) setFund(data) })
  }, [])

  const update = useCallback(async (amount) => {
    setFund(prev => ({ ...prev, amount }))
    await supabase.from('emergency_fund').update({
      amount,
      updated_at: new Date().toISOString()
    }).eq('id', fund.id)
  }, [fund.id])

  return { fund, update }
}

export function useTradingEntries() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const dates = getWeekDates()

  useEffect(() => {
    supabase.from('trading_entries')
      .select('*')
      .gte('date', dates[0])
      .lte('date', dates[6])
      .order('date', { ascending: false })
      .then(({ data }) => { setEntries(data || []); setLoading(false) })
  }, [])

  const addEntry = useCallback(async (entry) => {
    const { data } = await supabase.from('trading_entries').insert(entry).select().single()
    if (data) setEntries(prev => [data, ...prev])
  }, [])

  const weeklyNet = entries.reduce((sum, e) => sum + (parseFloat(e.result) || 0), 0)

  return { entries, loading, addEntry, weeklyNet, count: entries.length }
}

export function useIncomeEntries() {
  const [entries, setEntries] = useState([])
  const dates = getWeekDates()

  useEffect(() => {
    supabase.from('income_entries')
      .select('*')
      .gte('date', dates[0])
      .lte('date', dates[6])
      .then(({ data }) => setEntries(data || []))
  }, [])

  const addEntry = useCallback(async (entry) => {
    const { data } = await supabase.from('income_entries').insert(entry).select().single()
    if (data) setEntries(prev => [data, ...prev])
  }, [])

  const aicrafterTotal = entries
    .filter(e => e.source === 'aicrafterlab')
    .reduce((s, e) => s + parseFloat(e.amount), 0)

  const amazonTotal = entries
    .filter(e => e.source === 'amazon_fba')
    .reduce((s, e) => s + parseFloat(e.amount), 0)

  return { entries, addEntry, aicrafterTotal, amazonTotal }
}
