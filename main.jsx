import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'

const transactions = [
  { name: 'Amazon India', type: 'Shopping', amount: '−₹2,499', date: 'Today', icon: 'A' },
  { name: 'Salary Credit', type: 'Income', amount: '+₹48,000', date: 'Yesterday', icon: '₹' },
  { name: 'Swiggy', type: 'Food', amount: '−₹640', date: 'Yesterday', icon: 'S' },
  { name: 'Electricity Bill', type: 'Utilities', amount: '−₹1,280', date: '2 Oct', icon: 'E' }
]

function TransferModal({ onClose, onSuccess }) {
  const dialogRef = useRef(null)
  const firstRef = useRef(null)
  const [recipient, setRecipient] = useState('Alex Morgan')
  const [amount, setAmount] = useState('5000')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const previous = document.activeElement
    firstRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll(
        'button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previous?.focus?.()
    }
  }, [onClose])

  const submit = (event) => {
    event.preventDefault()
    if (!amount || Number(amount) <= 0) {
      setMessage('Please enter an amount greater than zero.')
      return
    }
    setMessage(`Transfer of ₹${Number(amount).toLocaleString('en-IN')} to ${recipient} is ready for confirmation.`)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="transfer-title" ref={dialogRef}>
        <div className="modal-head">
          <div>
            <p className="eyebrow">SECURE TRANSFER</p>
            <h2 id="transfer-title">Send money</h2>
          </div>
          <button className="icon-button" aria-label="Close transfer dialog" onClick={onClose}>×</button>
        </div>

        <form onSubmit={submit}>
          <label htmlFor="recipient">Recipient</label>
          <select id="recipient" value={recipient} onChange={e => setRecipient(e.target.value)}>
            <option>Alex Morgan</option>
            <option>Priya Sharma</option>
            <option>Rahul Verma</option>
          </select>

          <label htmlFor="transfer-amount">Amount</label>
          <div className="money-input">
            <span aria-hidden="true">₹</span>
            <input
              id="transfer-amount"
              ref={firstRef}
              type="number"
              min="1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              aria-describedby="amount-note"
            />
          </div>
          <p id="amount-note" className="hint">Transfers are protected by secure verification.</p>

          {message && <div className="status" role="status">{message}</div>}

          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>Cancel</button>
            <button type="submit" onClick={() => message && onSuccess()}>Review transfer</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function App() {
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [activeTab, setActiveTab] = useState('Overview')

  const closeModal = () => setOpen(false)

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="#overview" aria-label="AccessBank home">
          <span className="brand-mark" aria-hidden="true">A</span>
          AccessBank
        </a>

        <nav aria-label="Primary navigation">
          {['Overview', 'Payments', 'Insights'].map(tab => (
            <button
              key={tab}
              className={`nav-button ${activeTab === tab ? 'active' : ''}`}
              aria-current={activeTab === tab ? 'page' : undefined}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <button className="profile-button" aria-label="Open profile menu">
          <span aria-hidden="true">SM</span>
          <span className="desktop-only">Shivani</span>
        </button>
      </header>

      {notice && (
        <div className="toast" role="status">
          <span aria-hidden="true">✓</span>{notice}
          <button aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button>
        </div>
      )}

      <section className="hero" id="overview">
        <div className="hero-copy">
          <p className="eyebrow">MONDAY, 5 OCTOBER</p>
          <h1>Good evening, Shivani.</h1>
          <p>Here’s a quick view of your money and recent activity.</p>
        </div>
        <button className="primary-large" onClick={() => setOpen(true)}>
          <span aria-hidden="true">＋</span> Send money
        </button>
      </section>

      <section className="dashboard-grid" aria-label="Account summary">
        <article className="balance-card">
          <div className="card-top">
            <span>Available balance</span>
            <button className="more-button" aria-label="More balance options">•••</button>
          </div>
          <strong className="balance">₹72,640<span>.50</span></strong>
          <p className="positive">↑ 8.4% <span>from last month</span></p>
          <div className="balance-footer">
            <span>**** 2841</span>
            <span>Updated just now</span>
          </div>
        </article>

        <article className="stat-card">
          <span className="stat-label">Monthly spending</span>
          <strong>₹18,420</strong>
          <div className="progress" aria-label="Monthly spending is 61 percent of budget">
            <span style={{width: '61%'}}></span>
          </div>
          <p><b>61%</b> of ₹30,000 budget</p>
        </article>

        <article className="stat-card">
          <span className="stat-label">Savings goal</span>
          <strong>₹38,500</strong>
          <div className="goal-row">
            <span>₹50,000 goal</span><b>77%</b>
          </div>
          <div className="progress"><span style={{width: '77%'}}></span></div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">RECENT ACTIVITY</p>
              <h2>Transactions</h2>
            </div>
            <button className="text-button" onClick={() => setNotice('Showing all transactions.')}>View all →</button>
          </div>

          <ul className="transactions" aria-label="Recent transactions">
            {transactions.map(t => (
              <li key={t.name}>
                <span className="transaction-icon" aria-hidden="true">{t.icon}</span>
                <span className="transaction-info">
                  <b>{t.name}</b><small>{t.type} · {t.date}</small>
                </span>
                <strong className={t.amount.startsWith('+') ? 'income' : ''}>{t.amount}</strong>
              </li>
            ))}
          </ul>
        </article>

        <aside className="panel tips" id="insights">
          <p className="eyebrow">SMART INSIGHT</p>
          <h2>You're on track</h2>
          <p>Your spending is 12% lower than your average for this point in the month.</p>
          <div className="insight-visual" aria-hidden="true">
            <span style={{height: '35%'}}></span>
            <span style={{height: '55%'}}></span>
            <span style={{height: '45%'}}></span>
            <span style={{height: '72%'}}></span>
            <span style={{height: '63%'}}></span>
            <span style={{height: '88%'}}></span>
          </div>
          <button className="secondary full" onClick={() => setNotice('Insights opened.')}>Explore insights</button>
        </aside>
      </section>

      <section className="accessibility-banner">
        <div>
          <p className="eyebrow">ACCESSIBILITY FIRST</p>
          <h2>Designed for every way of using the web.</h2>
          <p>Keyboard navigation, screen-reader labels, visible focus and accessible dialogs are built into this prototype.</p>
        </div>
        <div className="a11y-badges" aria-label="Accessibility features">
          <span>⌨ Keyboard</span>
          <span>◉ Screen reader</span>
          <span>✓ WCAG</span>
        </div>
      </section>

      <footer>
        <span>AccessBank Accessibility Audit Project</span>
        <span>React · WCAG · a11y</span>
      </footer>

      {open && <TransferModal onClose={closeModal} onSuccess={() => setNotice('Transfer review prepared successfully.')} />}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
