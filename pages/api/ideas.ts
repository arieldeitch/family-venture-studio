import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { Idea, IdeaFormData } from '@/lib/types'

type ResponseData = {
  ideas?: Idea[]
  idea?: Idea
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ ideas: data || [] })
  }

  if (req.method === 'POST') {
    const { title, description } = req.body as IdeaFormData

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }

    const { data, error } = await supabase
      .from('ideas')
      .insert([{
        title,
        description,
        status: 'Discovery',
        created_at: new Date().toISOString(),
      }])
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(201).json({ idea: data?.[0] })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
