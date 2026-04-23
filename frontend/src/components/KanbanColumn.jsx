import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import JobCard from './JobCard'

const colors = {
  WISHLIST:  'bg-gray-100 text-gray-600',
  APPLIED:   'bg-blue-100 text-blue-600',
  INTERVIEW: 'bg-yellow-100 text-yellow-700',
  OFFER:     'bg-green-100 text-green-700',
  REJECTED:  'bg-red-100 text-red-600'
}

export default function KanbanColumn({ status, jobs, onCardClick }) {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div className="flex flex-col w-64 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors[status]}`}>
          {status}
        </span>
        <span className="text-xs text-gray-400">{jobs.length}</span>
      </div>
      <div
        ref={setNodeRef}
        className="flex flex-col gap-2 min-h-32 bg-gray-50 rounded-xl p-2"
      >
        <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.map(job => (
            <JobCard key={job.id} job={job} onClick={() => onCardClick(job)} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}