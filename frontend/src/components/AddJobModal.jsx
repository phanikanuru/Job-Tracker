import { useState } from 'react'
import api from '../api/axios'

export default function AddJobModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    company: '', role: '', status: 'WISHLIST',
    location: '', salary: '', jobUrl: '', deadline: ''
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    try {
      await api.post('/jobs', form)
      onAdded()
      onClose()
    } catch {
      alert('Failed to add job')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add new job</h2>
        <div className="space-y-3">
          {['company', 'role', 'location', 'salary', 'jobUrl'].map(field => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
          ))}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            {['WISHLIST','APPLIED','INTERVIEW','OFFER','REJECTED'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
          />
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700">
            Add job
          </button>
        </div>
      </div>
    </div>
  )
}