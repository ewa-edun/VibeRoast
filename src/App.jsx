import { useState } from 'react'
import { moodWorkouts } from './data/workoutData'
import './App.css'

function App() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [currentRoast, setCurrentRoast] = useState('')
  const [isRoastVisible, setIsRoastVisible] = useState(false)

  const getRandomRoast = (mood) => {
    const roasts = moodWorkouts[mood].roasts
    return roasts[Math.floor(Math.random() * roasts.length)]
  }

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    setCurrentRoast(getRandomRoast(mood))
    setIsRoastVisible(true)
  }

  const handleNewRoast = () => {
    setCurrentRoast(getRandomRoast(selectedMood))
  }

  return (
    <div className="container">
      <header>
        <h1>VibeRoast</h1>
        <p className="tagline">Your Personal Roast Coach</p>
      </header>

      <main>
        <div className="mood-section">
          <h2>How are you feeling today?</h2>
          <div className="mood-buttons">
            {Object.keys(moodWorkouts).map((mood) => (
              <button
                key={mood}
                className={`mood-button ${selectedMood === mood ? 'selected' : ''}`}
                onClick={() => handleMoodSelect(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {selectedMood && (
          <div className={`workout-section ${isRoastVisible ? 'visible' : ''}`}>
            <div className="workout-card">
              <h3>Your Workout:</h3>
              <p className="workout">{moodWorkouts[selectedMood].workout}</p>
              <div className="roast">
                <p>{currentRoast}</p>
                <button className="roast-button" onClick={handleNewRoast}>
                  Roast Me Again
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Motivating you through pure disrespect.</p>
      </footer>
    </div>
  )
}

export default App
