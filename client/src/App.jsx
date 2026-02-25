import { useEffect, useState } from 'react'

const API = 'http://localhost:3001'

export default function App() {
  const [transactions, setTransactions] = useState([])
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    fetch(`${API}/transactions`)
      .then(r => r.json())
      .then(setTransactions)
  }, [])

  async function addTransaction() {
    if (!desc.trim() || !amount) return
    const t = await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: desc, amount: parseFloat(amount) })
    }).then(r => r.json())
    setTransactions([t, ...transactions])
    setDesc('')
    setAmount('')
  }

  async function deleteTransaction(id) {
    await fetch(`${API}/transactions/${id}`, { method: 'DELETE' })
    setTransactions(transactions.filter(t => t._id !== id))
  }

  const income = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const expense = transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0)
  const balance = income + expense

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-8">Expense Tracker</h1>

        {/* Balance */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-4 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Balance</p>
          <p className={`text-4xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
            Rs. {balance.toLocaleString()}
          </p>
        </div>

        {/* Income / Expense */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4 text-center">
            <p className="text-xs uppercase tracking-widest text-emerald-400 mb-1">Income</p>
            <p className="text-xl font-bold text-emerald-400">Rs. {income.toLocaleString()}</p>
          </div>
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4 text-center">
            <p className="text-xs uppercase tracking-widest text-red-400 mb-1">Expense</p>
            <p className="text-xl font-bold text-red-400">Rs. {Math.abs(expense).toLocaleString()}</p>
          </div>
        </div>

        {/* Add form */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Add Transaction</p>
          <div className="flex flex-col gap-3">
            <input
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25 placeholder:text-gray-600 transition-colors"
              placeholder="Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25 placeholder:text-gray-600 transition-colors"
                placeholder="Amount (use - for expense)"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTransaction()}
              />
              <button
                onClick={addTransaction}
                className="bg-white text-black px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors shrink-0"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">History</p>
        <div className="space-y-2">
          {transactions.map(t => (
            <div key={t._id} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3 group">
              <div className={`w-1 self-stretch rounded-full shrink-0 ${t.amount > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="flex-1 text-sm text-gray-200">{t.description}</span>
              <span className={`text-sm font-medium ${t.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {t.amount > 0 ? '+' : ''}Rs. {t.amount.toLocaleString()}
              </span>
              <button
                onClick={() => deleteTransaction(t._id)}
                className="text-transparent group-hover:text-gray-600 hover:!text-red-400 text-sm transition-colors ml-2"
              >
                ✕
              </button>
            </div>
          ))}
          {transactions.length === 0 && (
            <p className="text-center text-gray-700 py-8 text-sm">No transactions yet.</p>
          )}
        </div>

      </div>
    </div>
  )
}
