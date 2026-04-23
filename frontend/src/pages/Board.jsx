import { useState, useEffect } from 'react'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { useAuth } from '../context/AuthContext'
import KanbanColumn from '../components/KanbanColumn'
import AddJobModal from '../components/AddJobModal'
import JobCard from '../components/JobCard'
import api from '../api/axios'

const STATUSES = ['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']

export default function Board() {
  const { user, logout } = useAuth()
  const [jobs, setJobs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [activeJob, setActiveJob] = useState(null)

  const fetchJobs = async () => {
    const res = await api.get('/jobs')
    setJobs(res.data)
  }

  useEffect(() => { fetchJobs() }, [])

  const handleDragStart = (event) => {
    const job = jobs.find(j => j.id === event.active.id)
    setActiveJob(job)
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    setActiveJob(null)
    if (!over) return

    const job = jobs.find(j => j.id === active.id)
    const newStatus = STATUSES.includes(over.id) ? over.id : job.status

    if (job.status !== newStatus) {
      setJobs(prev => prev.map(j =>
        j.id === job.id ? { ...j, status: newStatus } : j
      ))
      await api.patch(`/jobs/${job.id}`, { status: newStatus })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Job Tracker</h1>
          <p className="text-sm text-gray-500">Hey {user?.name}, let's land that job!</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + Add job
          </button>
          <button
            onClick={logout}
            className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {STATUSES.map(status => (
              <KanbanColumn
                key={status}
                status={status}
                jobs={jobs.filter(j => j.status === status)}
                onCardClick={(job) => console.log('clicked', job)}
              />
            ))}
            <DragOverlay>
              {activeJob && <JobCard job={activeJob} />}
            </DragOverlay>
          </DndContext>
        </div>
      </main>

      {showModal && (
        <AddJobModal
          onClose={() => setShowModal(false)}
          onAdded={fetchJobs}
        />
      )}
    </div>
  )
}