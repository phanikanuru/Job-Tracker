import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function JobCard({ job, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: job.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-blue-300 transition"
    >
      <p className="font-medium text-gray-800 text-sm">{job.company}</p>
      <p className="text-gray-500 text-xs mt-1">{job.role}</p>
      {job.deadline && (
        <p className="text-xs text-orange-500 mt-2">
          Due: {new Date(job.deadline).toLocaleDateString()}
        </p>
      )}
      {job.salary && (
        <p className="text-xs text-green-600 mt-1">{job.salary}</p>
      )}
    </div>
  )
}