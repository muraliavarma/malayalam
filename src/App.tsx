import { useMemo, useState } from 'react'
import type { MalayalamCard, MalayalamCardType } from './data/cards'
import { malayalamCards } from './data/cards'
import './App.css'

type FilterOption = MalayalamCardType | 'all'
type GameResult = 'correct' | 'wrong' | null
type Screen = 'setup' | 'play' | 'trail' | 'summary'

const filters: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'vowel', label: 'Vowels' },
  { id: 'consonant', label: 'Consonants' },
  { id: 'chillu', label: 'Bonus' },
]

const MIN_GAME_SIZE = 5
const MAX_GAME_SIZE = 15

const screenMeta: { id: Screen; label: string; emoji: string }[] = [
  { id: 'setup', label: 'Setup', emoji: '🎯' },
  { id: 'play', label: 'Play', emoji: '🎲' },
  { id: 'trail', label: 'Trail', emoji: '🗺️' },
  { id: 'summary', label: 'Score', emoji: '🏁' },
]

function App() {
  const [filter, setFilter] = useState<FilterOption>('all')
  const [gameSize, setGameSize] = useState(10)
  const [gameCards, setGameCards] = useState<MalayalamCard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<Record<string, GameResult>>({})
  const [screen, setScreen] = useState<Screen>('setup')

  const filteredCards = useMemo(
    () =>
      malayalamCards.filter((card) => {
        if (filter === 'all') return true
        return card.type === filter
      }),
    [filter],
  )

  const currentCard = gameCards[currentIndex] ?? null
  const answeredCount = gameCards.filter(
    (card) => results[card.key] !== null && results[card.key] !== undefined,
  ).length
  const completed =
    gameCards.length > 0 && answeredCount === gameCards.length
  const score = gameCards.filter((card) => results[card.key] === 'correct').length

  const shuffle = <T,>(list: T[]): T[] => {
    const next = [...list]
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
    }
    return next
  }

  const startGame = () => {
    if (filteredCards.length === 0) return
    const size = Math.min(gameSize, filteredCards.length)
    const selection = shuffle(filteredCards).slice(0, size)
    const initialResults: Record<string, GameResult> = {}
    selection.forEach((card) => {
      initialResults[card.key] = null
    })
    setGameCards(selection)
    setResults(initialResults)
    setCurrentIndex(0)
    setScreen('play')
  }

  const clearGame = () => {
    setGameCards([])
    setResults({})
    setCurrentIndex(0)
    setScreen('setup')
  }

  const handleResult = (value: Exclude<GameResult, null>) => {
    if (!currentCard) return
    setResults((prev) => ({
      ...prev,
      [currentCard.key]: value,
    }))
    if (currentIndex < gameCards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      return
    }
    if (answeredCount + 1 === gameCards.length) {
      setScreen('summary')
    }
  }

  const goTo = (index: number) => setCurrentIndex(index)

  const renderSetup = () => (
    <div className="screen-card">
      <div>
        <p className="eyebrow">Malayalam Letter Quest</p>
        <h1>Build a kid-sized practice round</h1>
        <p className="lede">
          Choose the letters you want (vowels, consonants, bonus chillus) and the
          number of cards. Everything fits inside one cosy screen on your phone.
        </p>
      </div>
      <div className="filter-row">
        {filters.map((option) => (
          <button
            key={option.id}
            className={`filter-pill ${
              filter === option.id ? 'filter-pill-active' : ''
            }`}
            onClick={() => setFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="range-box">
        <label htmlFor="game-size">Cards per round</label>
        <strong>{Math.min(gameSize, filteredCards.length)}</strong>
        <input
          id="game-size"
          type="range"
          min={MIN_GAME_SIZE}
          max={MAX_GAME_SIZE}
          value={gameSize}
          onChange={(event) => setGameSize(Number(event.target.value))}
        />
        <p>
          {filteredCards.length < gameSize
            ? `Only ${filteredCards.length} cards available in this filter`
            : 'Short rounds keep the excitement high'}
        </p>
      </div>
      <div className="button-stack">
        <button className="big-btn big-btn-primary" onClick={startGame}>
          ▶️ Start adventure
        </button>
        <button className="big-btn big-btn-muted" onClick={clearGame}>
          Reset everything
        </button>
      </div>
    </div>
  )

  const renderPlay = () => {
    if (!currentCard) {
      return (
        <div className="screen-card">
          <p className="lede center">
            Tap the setup tab to pick a deck, then come back to play.
          </p>
        </div>
      )
    }
    return (
      <div className="screen-card play-card">
        <div className="card-panel">
          <div className="card-letter">{currentCard.letter}</div>
          <div className="card-details">
            <p className="card-transliteration">
              {currentCard.transliteration.toUpperCase()}
            </p>
            <h2>{currentCard.word}</h2>
            <p className="card-meaning">
              {currentCard.wordTransliteration} · {currentCard.meaning}
            </p>
            <p className="card-hint">{currentCard.hint}</p>
          </div>
        </div>
        <p className="progress">
          Card {currentIndex + 1}/{gameCards.length} ·{' '}
          <strong>{answeredCount}</strong> marked
        </p>
        <div className="judge-buttons">
          <button
            className="judge-btn judge-btn-correct"
            onClick={() => handleResult('correct')}
          >
            ✅ Nailed it!
          </button>
          <button
            className="judge-btn judge-btn-wrong"
            onClick={() => handleResult('wrong')}
          >
            ❌ Try again
          </button>
        </div>
        <div className="nav-row">
          <button
            className="nav-chip"
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? gameCards.length - 1 : prev - 1,
              )
            }
          >
            ← Back
          </button>
          <button
            className="nav-chip"
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === gameCards.length - 1 ? 0 : prev + 1,
              )
            }
          >
            Next →
          </button>
        </div>
      </div>
    )
  }

  const renderTrail = () => {
    if (gameCards.length === 0) {
      return (
        <div className="screen-card">
          <p className="lede center">No trail yet! Start a game to fill this map.</p>
        </div>
      )
    }
    return (
      <div className="screen-card trail-card">
        <h2>Adventure trail</h2>
        <p className="trail-note">
          Tap a tile to jump to that card. Green = got it, Red = practice again.
        </p>
        <div className="tracker-grid tight">
          {gameCards.map((card, index) => {
            const status = results[card.key]
            return (
              <button
                key={card.key}
                className={`tracker-chip ${
                  index === currentIndex ? 'tracker-chip-active' : ''
                } ${
                  status === 'correct'
                    ? 'tracker-chip-correct'
                    : status === 'wrong'
                      ? 'tracker-chip-wrong'
                      : ''
                }`}
                onClick={() => {
                  goTo(index)
                  setScreen('play')
                }}
              >
                <span className="tracker-letter">{card.letter}</span>
                <span className="tracker-word">{card.word}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const renderSummary = () => {
    if (!completed) {
      return (
        <div className="screen-card">
          <p className="lede center">Finish the round to see the score card.</p>
        </div>
      )
    }
    return (
      <div className="screen-card summary-card">
        <p className="confetti" aria-hidden="true">
          🎉🎈✨
        </p>
        <h1>
          {score}/{gameCards.length}
        </h1>
        <p className="lede center">
          Celebrate the wins, hug it out for the reds, and tap replay for a fresh
          set.
        </p>
        <div className="button-stack">
          <button className="big-btn big-btn-primary" onClick={startGame}>
            Play another round
          </button>
          <button className="big-btn big-btn-muted" onClick={clearGame}>
            Back to setup
          </button>
        </div>
      </div>
    )
  }

  const renderScreen = () => {
    switch (screen) {
      case 'setup':
        return renderSetup()
      case 'play':
        return renderPlay()
      case 'trail':
        return renderTrail()
      case 'summary':
        return renderSummary()
      default:
        return null
    }
  }

  const isTabDisabled = (id: Screen) => {
    if (id === 'setup') return false
    if (id === 'play' || id === 'trail') return gameCards.length === 0
    if (id === 'summary') return !completed
    return false
  }

  return (
    <div className="app-shell">
      <div className="screen-body">{renderScreen()}</div>
      <nav className="tab-bar">
        {screenMeta.map((item) => (
          <button
            key={item.id}
            className={`tab-btn ${screen === item.id ? 'tab-btn-active' : ''}`}
            onClick={() => {
              if (!isTabDisabled(item.id)) setScreen(item.id)
            }}
            disabled={isTabDisabled(item.id)}
          >
            <span aria-hidden="true">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
