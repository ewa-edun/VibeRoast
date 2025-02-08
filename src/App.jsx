import { useState, useEffect } from 'react'
import { moodWorkouts, harshRoasts, repeatedMoodRoasts } from './data/workoutData'
import './App.css'

function App() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [currentRoast, setCurrentRoast] = useState('')
  const [isRoastVisible, setIsRoastVisible] = useState(false)
  const [isHypeMode, setIsHypeMode] = useState(false)
  const [roastClickCount, setRoastClickCount] = useState(0)
  const [moodCounts, setMoodCounts] = useState({})
  
  const getRandomMessage = (messages) => {
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    setMoodCounts(prev => ({
      ...prev,
      [mood]: (prev[mood] || 0) + 1
    }))
    
    // Get appropriate message based on conditions
    let message
    if (isHypeMode) {
      message = getRandomMessage(moodWorkouts[mood].hypeMessages)
    } else if (moodCounts[mood] >= 7) {
      message = getRandomMessage(repeatedMoodRoasts[mood])
    } else {
      message = getRandomMessage(moodWorkouts[mood].roasts)
    }
    
    setCurrentRoast(message)
    setIsRoastVisible(true)
    setRoastClickCount(0) // Reset count on new mood selection
  }

  const handleNewRoast = () => {
    const newCount = roastClickCount + 1
    setRoastClickCount(newCount)
    
    let message
    if (newCount >= 10) {
      message = getRandomMessage(harshRoasts)
    } else if (isHypeMode) {
      message = getRandomMessage(moodWorkouts[selectedMood].hypeMessages)
    } else {
      message = getRandomMessage(moodWorkouts[selectedMood].roasts)
    }
    
    setCurrentRoast(message)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this savage roast from VibeRoast! 🔥',
        text: currentRoast,
        url: window.location.href
      })
    }
  }

  return (
    <div className="container">
      <header>
        <h1>VibeRoast</h1>
        <p className="tagline">Your Personal Roast Coach</p>
        <button 
          className={`mode-toggle ${isHypeMode ? 'hype' : 'roast'}`}
          onClick={() => setIsHypeMode(!isHypeMode)}
        >
          {isHypeMode ? '🔥 HYPE MODE' : '🔪 ROAST MODE'}
        </button>
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
              
              <div className="media-links">
                <a href={moodWorkouts[selectedMood].media.youtube} target="_blank" rel="noopener noreferrer">
                  📺 Watch Workout
                </a>
                <a href={moodWorkouts[selectedMood].media.playlist} target="_blank" rel="noopener noreferrer">
                  🎵 Workout Playlist
                </a>
              </div>

              <div className={`message ${isHypeMode ? 'hype' : 'roast'}`}>
                <p>{currentRoast}</p>
                <div className="button-group">
                  <button 
                    className={`message-button ${isHypeMode ? 'hype' : 'roast'}`} 
                    onClick={handleNewRoast}
                  >
                    {isHypeMode ? 'More Hype!' : 'Roast Me Again'}
                  </button>
                  <button className="share-button" onClick={handleShare}>
                    Share This 🔥
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Motivating you through {isHypeMode ? 'excessive enthusiasm' : 'pure disrespect'}.</p>
      </footer>
    </div>
  )
}

export default App
