import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { Idea } from '@/lib/types'

type ResponseData = {
  idea?: Idea
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query

  if (req.method === 'PATCH') {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: 'Status is required' })
    }

    const { data, error } = await supabase
      .from('ideas')
      .update({ status })
      .eq('id', id)
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ idea: data?.[0] })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
