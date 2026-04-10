import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useOKRs() {
  const [okrs, setOkrs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const { data } = await supabase
      .from('okr_key_results')
      .select('*')
      .order('project')
      .order('sort_order')
    setOkrs(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [])

  const updateKR = useCallback(async (id, newValue) => {
    setOkrs(prev => prev.map(o => o.id === id ? { ...o, current_value: newValue } : o))
    await supabase.from('okr_key_results').update({
      current_value: newValue,
      updated_at: new Date().toISOString()
    }).eq('id', id)
  }, [])

  return { okrs, loading, updateKR }
}
