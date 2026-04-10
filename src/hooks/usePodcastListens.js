import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getToday } from '../lib/dateUtils'

export function usePodcastListens(showKey) {
  const [listens, setListens] = useState([])
  const [loading, setLoading] = useState(true)
  const today = getToday()

  useEffect(() => {
    if (!showKey) return
    supabase
      .from('podcast_listens')
      .select('*')
      .eq('show_key', showKey)
      .order('date', { ascending: false })
      .then(({ data }) => {
        setListens(data || [])
        setLoading(false)
      })
  }, [showKey])

  const todayListen = listens.find(l => l.date === today)

  const markToday = useCallback(async (episodeTitle = '') => {
    if (todayListen) return
    const { data } = await supabase
      .from('podcast_listens')
      .upsert({ date: today, show_key: showKey, episode_title: episodeTitle || null }, { onConflict: 'date,show_key' })
      .select().single()
    if (data) setListens(prev => [data, ...prev])
  }, [today, showKey, todayListen])

  return { listens, loading, todayListen, markToday, total: listens.length }
}
