import { useEffect, useMemo, useState } from 'react'
import type { MalayalamCard, MalayalamCardType } from './data/cards'
import { malayalamCards } from './data/cards'
import './App.css'

type FilterOption = MalayalamCardType | 'all'

const filters: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'All letters' },
  { id: 'vowel', label: 'Swaram (vowels)' },
  { id: 'consonant', label: 'Vyanjanam (consonants)' },
]

const AUTO_DELAY_MS = 4500

function App() {
  const [deck, setDeck] = useState<MalayalamCard[]>(malayalamCards)
  const [filter, setFilter] = useState<FilterOption>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)

  const visibleCards = useMemo(
    () =>
      deck.filter((card) => {
        if (filter === 'all') return true
        return card.type === filter
      }),
    [deck, filter],
  )

  useEffect(() => {
    setCurrentIndex(0)
  }, [filter, deck])

  useEffect(() => {
    if (!autoPlay || visibleCards.length === 0) {
      return
    }
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visibleCards.length)
    }, AUTO_DELAY_MS)
    return () => window.clearInterval(id)
  }, [autoPlay, visibleCards.length])

  const currentCard = visibleCards[currentIndex]
  const speechSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window

  const shuffleDeck = () => {
    const next = [...malayalamCards]
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
    }
    setDeck(next)
  }

  const resetDeck = () => setDeck(malayalamCards)

  const goTo = (index: number) => {
    setCurrentIndex(index)
    if (autoPlay) setAutoPlay(false)
  }

  const speakCurrent = () => {
    if (!speechSupported || !currentCard) return
    const utterance = new SpeechSynthesisUtterance(
      `${currentCard.letter}. ${currentCard.word}. ${currentCard.meaning}`,
    )
    utterance.lang = 'ml-IN'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Malayalam Flash Cards</p>
          <h1>You say the letter. The card shows the friend from the poster.</h1>
          <p className="lede">
            Tap through the deck, filter vowels vs consonants, let it auto-play
            for story time, or jump straight to a favourite letter.
          </p>
        </div>
        <div className="hero-actions">
          <button className="pill" onClick={shuffleDeck}>
            Shuffle deck
          </button>
          <button className="pill pill-muted" onClick={resetDeck}>
            Reset order
          </button>
        </div>
      </header>

      <section className="filters">
        {filters.map((option) => (
          <button
            key={option.id}
            className={`filter-btn ${
              filter === option.id ? 'filter-btn-active' : ''
            }`}
            onClick={() => setFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
        <div className="auto-toggle">
          <label>
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={(event) => setAutoPlay(event.target.checked)}
            />
            Auto-play every {AUTO_DELAY_MS / 1000}s
          </label>
        </div>
      </section>

      {currentCard ? (
        <section className="card-stage">
          <div className="card-panel" role="group" aria-live="polite">
            <div className="card-letter" aria-label="Malayalam letter">
              {currentCard.letter}
            </div>
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
          <div className="card-actions">
            <button
              className="nav-btn"
              onClick={() =>
                goTo((currentIndex - 1 + visibleCards.length) % visibleCards.length)
              }
            >
              ← Back
            </button>
            <p className="progress">
              Card {currentIndex + 1} / {visibleCards.length}
            </p>
            <button
              className="nav-btn"
              onClick={() => goTo((currentIndex + 1) % visibleCards.length)}
            >
              Next →
            </button>
          </div>
          <div className="extras">
            <button className="pill" onClick={() => goTo(0)}>
              Start from beginning
            </button>
            {speechSupported && (
              <button className="pill pill-muted" onClick={speakCurrent}>
                🔊 Hear it
              </button>
            )}
          </div>
        </section>
      ) : (
        <p className="empty-state">
          No cards available. Try a different filter or reset the deck.
        </p>
      )}

      <section className="letter-grid">
        <h3>Jump to a letter</h3>
        <div className="grid">
          {visibleCards.map((card, index) => (
            <button
              key={card.key}
              className={`grid-btn ${
                index === currentIndex ? 'grid-btn-active' : ''
              }`}
              onClick={() => goTo(index)}
            >
              <span className="grid-letter">{card.letter}</span>
              <span className="grid-word">{card.word}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
