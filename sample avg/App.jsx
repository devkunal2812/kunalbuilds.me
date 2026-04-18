import { useState } from 'react'
import AvgCinematic from './AvgCinematic'
import { useAvgTrigger } from './useAvgTrigger'
import styles from './App.module.css'

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')

  const { isCinematicActive, onInputChange, onCinematicComplete } = useAvgTrigger({
    keyword: 'avg',
    onComplete: () => {
      setMessage('The comeback is complete.')
      setInputValue('')
    },
  })

  const handleChange = (e) => {
    const val = e.target.value
    setInputValue(val)
    onInputChange(val)
  }

  return (
    <div className={styles.app}>
      <div className={styles.center}>
        <h1 className={styles.title}>Type <span>avg</span> to begin</h1>

        <input
          className={styles.input}
          value={inputValue}
          onChange={handleChange}
          placeholder="Type avg..."
          autoFocus
        />

        {message && <p className={styles.message}>{message}</p>}
      </div>

      {/* Cinematic overlay — mounts when triggered */}
      <AvgCinematic
        isActive={isCinematicActive}
        onComplete={onCinematicComplete}
      />
    </div>
  )
}
