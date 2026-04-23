const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const {
  getJobs, createJob, updateJob,
  deleteJob, addNote, addContact
} = require('../controllers/jobs.controller')

router.use(auth)

router.get('/', getJobs)
router.post('/', createJob)
router.patch('/:id', updateJob)
router.delete('/:id', deleteJob)
router.post('/:id/notes', addNote)
router.post('/:id/contacts', addContact)

module.exports = router