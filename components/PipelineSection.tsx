'use client'

import { Idea, IdeaStatus } from '@/lib/types'
import StatusBadge from './StatusBadge'

interface PipelineSectionProps {
  ideas: Idea[]
}

const statuses: IdeaStatus[] = ['Discovery', 'PRD', 'Architecture', 'Backlog', 'Build', 'Deploy']

export default function PipelineSection({ ideas }: PipelineSectionProps) {
  const getIdeasByStatus = (status: IdeaStatus) => ideas.filter((idea) => idea.status === status)

  const stats = {
    total: ideas.length,
    inProgress: ideas.filter((i) => ['PRD', 'Architecture', 'Backlog', 'Build'].includes(i.status)).length,
    deployed: ideas.filter((i) => i.status === 'Deploy').length,
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Pipeline Status</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Ideas</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats.deployed}</div>
          <div className="text-sm text-gray-600">Deployed</div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-4">
        {statuses.map((status) => {
          const stageIdeas = getIdeasByStatus(status)
          return (
            <div key={status} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={status} />
                  <span className="text-sm font-medium text-gray-600">({stageIdeas.length})</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {stageIdeas.length === 0 ? (
                  <span className="text-xs text-gray-400">No ideas</span>
                ) : (
                  stageIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="text-xs bg-gray-100 px-2 py-1 rounded truncate hover:bg-gray-200 cursor-default"
                      title={idea.title}
                    >
                      {idea.title}
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
