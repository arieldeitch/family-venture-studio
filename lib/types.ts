export type IdeaStatus = 'Discovery' | 'PRD' | 'Architecture' | 'Backlog' | 'Build' | 'Deploy'

export interface Idea {
  id: string
  title: string
  description: string
  status: IdeaStatus
  created_at: string
}

export interface IdeaFormData {
  title: string
  description: string
}
