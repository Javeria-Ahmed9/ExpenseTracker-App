import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Transaction from './models/Transaction.js'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/expenses')
  .then(() => console.log('MongoDB connected'))

app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.find().sort({ createdAt: -1 })
  res.json(transactions)
})

app.post('/transactions', async (req, res) => {
  const transaction = await Transaction.create({
    description: req.body.description,
    amount: req.body.amount
  })
  res.json(transaction)
})

app.delete('/transactions/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

app.listen(3001, () => console.log('Server running on port 3001'))
