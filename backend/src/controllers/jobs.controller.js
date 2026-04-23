const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { userId: req.userId },
      include: { notes: true, contacts: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(jobs)
  } catch {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.createJob = async (req, res) => {
  try {
    const { company, role, status, location, salary, jobUrl, deadline } = req.body
    const job = await prisma.job.create({
      data: {
        company, role, status, location,
        salary, jobUrl, deadline: deadline ? new Date(deadline) : null,
        userId: req.userId
      }
    })
    res.status(201).json(job)
  } catch {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.updateJob = async (req, res) => {
  try {
    const job = await prisma.job.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.json(job)
  } catch {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.deleteJob = async (req, res) => {
  try {
    await prisma.job.delete({ where: { id: req.params.id } })
    res.json({ message: 'Job deleted' })
  } catch {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.addNote = async (req, res) => {
  try {
    const note = await prisma.note.create({
      data: { body: req.body.body, jobId: req.params.id }
    })
    res.status(201).json(note)
  } catch {
    res.status(500).json({ error: 'Something went wrong' })
  }
}

exports.addContact = async (req, res) => {
  try {
    const contact = await prisma.contact.create({
      data: { ...req.body, jobId: req.params.id }
    })
    res.status(201).json(contact)
  } catch {
    res.status(500).json({ error: 'Something went wrong' })
  }
}