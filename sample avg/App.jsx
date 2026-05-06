import { useState } from 'react'
import AvgCinematic from './AvgCinematic'
import { useAvgTrigger } from './useAvgTrigger'
import styles from './App.module.css'

export default function App() {
  const [input, setInput] = useState('')
  const [done, setDone] = useState(false)

  const { isCinematicActive, onInputChange, onCinematicComplete } = useAvgTrigger({
    keyword: 'avg',
    onComplete: () => { setDone(true); setInput('') },
  })

  return (
    <div className={styles.app}>
      <div className={styles.center}>
        <p className={styles.hint}>Type <strong>avg</strong> to witness the snap</p>
        <input
          className={styles.input}
          value={input}
          onChange={e => { setInput(e.target.value); onInputChange(e.target.value) }}
          placeholder="avg..."
          autoFocus
        />
        {done && <p className={styles.afterMsg}>The comeback is complete.</p>}
      </div>

      <AvgCinematic isActive={isCinematicActive} onComplete={onCinematicComplete} />
    </div>
  )
}