import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useBooks() {
  const [readIds, setReadIds] = useState(new Set())
  const [userBooks, setUserBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('book_reads').select('book_id'),
      supabase.from('user_books').select('*').order('added_at', { ascending: true }),
    ]).then(([{ data: reads }, { data: books }]) => {
      if (reads)  setReadIds(new Set(reads.map(r => r.book_id)))
      if (books)  setUserBooks(books)
      setLoading(false)
    })
  }, [])

  const toggleRead = useCallback(async (bookId) => {
    const isRead = readIds.has(bookId)
    setReadIds(prev => {
      const next = new Set(prev)
      isRead ? next.delete(bookId) : next.add(bookId)
      return next
    })
    if (isRead) {
      await supabase.from('book_reads').delete().eq('book_id', bookId)
    } else {
      await supabase.from('book_reads').upsert({ book_id: bookId }, { onConflict: 'book_id' })
    }
  }, [readIds])

  const addUserBook = useCallback(async (title, author) => {
    const { data } = await supabase.from('user_books').insert({ title, author }).select().single()
    if (data) setUserBooks(prev => [...prev, data])
  }, [])

  const toggleUserRead = useCallback(async (bookId) => {
    const key = `u_${bookId}`
    const isRead = readIds.has(key)
    setReadIds(prev => {
      const next = new Set(prev)
      isRead ? next.delete(key) : next.add(key)
      return next
    })
    if (isRead) {
      await supabase.from('book_reads').delete().eq('book_id', key)
    } else {
      await supabase.from('book_reads').upsert({ book_id: key }, { onConflict: 'book_id' })
    }
  }, [readIds])

  return { readIds, userBooks, loading, toggleRead, addUserBook, toggleUserRead }
}
