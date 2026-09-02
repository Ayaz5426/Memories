import { useState } from 'react';
import { Link } from 'react-router-dom';

const moments = [
  {
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=85',
    alt: 'A sunlit coastal view',
    className: 'love-photo love-photo-tall',
    secret: 'Even the sea feels quieter when I am looking at it with you.',
  },
  {
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85',
    alt: 'A quiet garden path',
    className: 'love-photo',
    secret: 'My favorite part of every adventure is the moment you smile.',
  },
  {
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=85',
    alt: 'A colorful city street',
    className: 'love-photo love-photo-wide',
    secret: 'I would happily get lost with you again and again.',
  },
];

const gameQuestions = [
  { question: 'How should our perfect evening end?', answers: ['Dessert, soft music, and a slow dance', 'Checking emails', 'Going home early'], correct: 0 },
  { question: 'What will I always make time for?', answers: ['A perfect schedule', 'A quiet moment alone with you', 'Another work call'], correct: 1 },
  { question: 'What do I want more of in our life together?', answers: ['More reasons to celebrate us', 'More busy weekends', 'More time apart'], correct: 0 },
];

const dateIdeas = [
  'Dress up for a candlelit dinner at home, phones away.',
  'Take a late-night drive, choose the music, and stop somewhere beautiful.',
  'Make dessert together, slow dance in the living room, and stay up talking.',
  'Book one beautiful night away and leave the rest of the world behind.',
];

const moods = [
  { name: 'Candlelight', line: 'Dim lights, dressed-up feelings, and a dinner that lasts all night.', prompt: 'Tonight, I want to hear the story behind your favorite smile.' },
  { name: 'Midnight', line: 'A late drive, one shared playlist, and nowhere we need to be tomorrow.', prompt: 'Tonight, let us choose a road and leave the clock behind.' },
  { name: 'Closer', line: 'Phones away, music low, and the kind of quiet that only belongs to us.', prompt: 'Tonight, I want to hold you close and tell you everything I love about you.' },
];

const eveningLooks = [
  { title: 'The little black dress', detail: 'Simple, confident, and impossible for me not to admire.', color: 'black' },
  { title: 'The sunset dress', detail: 'Soft fabric, bare shoulders, and the color of our favorite hour.', color: 'rose' },
  { title: 'The after-dinner look', detail: 'A short hem, your favorite perfume, and one more dance before bed.', color: 'gold' },
];

export default function WifePage() {
  const [secretOpen, setSecretOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameIndex, setGameIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [secretWord, setSecretWord] = useState('');
  const [wordUnlocked, setWordUnlocked] = useState(false);
  const [dateIdea, setDateIdea] = useState(0);
  const [mood, setMood] = useState(0);

  function answerGame(answerIndex: number) {
    if (answerIndex === gameQuestions[gameIndex].correct) setScore((current) => current + 1);
    if (gameIndex === gameQuestions.length - 1) setGameFinished(true);
    else setGameIndex((current) => current + 1);
  }

  function resetGame() {
    setGameIndex(0);
    setScore(0);
    setGameFinished(false);
  }

  return (
    <div className="page love-page">
      <Link to="/" className="back-link">← Back to our memories</Link>

      <section className="love-intro">
        <p className="eyebrow">My heart belongs to you</p>
        <h1>Sadiya Anam,<br /><em>you are my forever.</em></h1>
        <p className="love-copy">
          I loved you yesterday, I love you more today, and I will keep finding new reasons to
          love you tomorrow. Every place becomes beautiful when your hand is in mine, and every
          ordinary day feels like a gift because I get to spend it with you.
        </p>
        <p className="love-signature">You are my favorite hello and my hardest goodbye,<br /><strong>Forever yours</strong></p>
      </section>

      <section className="love-gallery" aria-label="Our favorite moments">
        {moments.map((moment, index) => (
          <button
            key={moment.image}
            type="button"
            className={`${moment.className} love-photo-button`}
            onClick={() => setSelectedPhoto(selectedPhoto === index ? null : index)}
            aria-label={`Reveal a secret about this memory: ${moment.alt}`}
          >
            <img src={moment.image} alt={moment.alt} />
            {selectedPhoto === index && <span className="photo-secret">{moment.secret}</span>}
          </button>
        ))}
        <button type="button" className="love-seal" onClick={() => setSecretOpen((open) => !open)} aria-label="Reveal a secret love message">♥</button>
      </section>

      {secretOpen && (
        <aside className="secret-note" role="status">
          <span>Secret message unlocked</span>
          <p>Sadiya, if I could relive one moment, I would choose the next one with you.</p>
        </aside>
      )}

      <section className="private-note">
        <div>
          <p className="eyebrow">Private little puzzle</p>
          <h2>What word describes us best?</h2>
          <p>Hint: it is what I promise you, in every season and every lifetime.</p>
        </div>
        {!wordUnlocked ? (
          <form onSubmit={(event) => { event.preventDefault(); if (secretWord.trim().toLowerCase() === 'forever') setWordUnlocked(true); }}>
            <input aria-label="Secret word" value={secretWord} onChange={(event) => setSecretWord(event.target.value)} placeholder="Type the secret word" />
            <button type="submit">Unlock</button>
          </form>
        ) : (
          <div className="unlocked-letter" role="status">You found it. My promise is forever, and my favorite future is the one with you.</div>
        )}
      </section>

      <section className="quote-grid" aria-label="Love notes">
        <blockquote>“Sadiya, you are the softest part of my life and the brightest part of every tomorrow.”</blockquote>
        <blockquote>“I would choose your hand, your laugh, and your heart in every version of this life.”</blockquote>
        <blockquote>“My favorite place will always be wherever you are.”</blockquote>
      </section>

      <section className="couple-game">
        {!gameOpen ? (
          <button type="button" className="game-launch" onClick={() => { setGameOpen(true); resetGame(); }}>
            Play our little love game <span>♥</span>
          </button>
        ) : gameFinished ? (
          <div className="game-result">
            <p className="eyebrow">A little truth</p>
            <h2>{score === gameQuestions.length ? 'You know exactly where my heart is.' : 'The answer is always you.'}</h2>
            <p>{score} of {gameQuestions.length} lovely choices. Whatever the question, I would still choose another evening with you.</p>
            <button type="button" onClick={resetGame}>Play again</button>
          </div>
        ) : (
          <div className="game-panel">
            <p className="eyebrow">After dark, just us · {gameIndex + 1} of {gameQuestions.length}</p>
            <h2>{gameQuestions[gameIndex].question}</h2>
            <div className="game-answers">
              {gameQuestions[gameIndex].answers.map((answer, index) => (
                <button key={answer} type="button" onClick={() => answerGame(index)}>{answer}</button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="date-deck">
        <div>
          <p className="eyebrow">For our next night together</p>
          <h2>Pick a little escape</h2>
          <p>{dateIdeas[dateIdea]}</p>
        </div>
        <button type="button" onClick={() => setDateIdea((current) => (current + 1) % dateIdeas.length)}>Another idea ↻</button>
      </section>

      <section className="after-hours">
        <div className="after-hours-heading">
          <p className="eyebrow">A private evening for two</p>
          <h2>After hours, with you.</h2>
          <p>Choose the feeling. I will bring the rest.</p>
        </div>
        <div className="mood-tabs" role="tablist" aria-label="Choose an evening mood">
          {moods.map((item, index) => (
            <button key={item.name} type="button" role="tab" aria-selected={mood === index} className={mood === index ? 'active' : ''} onClick={() => setMood(index)}>{item.name}</button>
          ))}
        </div>
        <div className="mood-card" role="tabpanel">
          <span className="mood-number">0{mood + 1}</span>
          <h3>{moods[mood].line}</h3>
          <p>{moods[mood].prompt}</p>
        </div>
      </section>

      <section className="evening-edit">
        <div className="evening-edit-heading">
          <p className="eyebrow">For the next chapter of us</p>
          <h2>Tonight, let me fall for you all over again.</h2>
          <p>Wear whatever makes you feel beautiful, Sadiya. I will be waiting to admire you, hold your hand, and make one ordinary evening feel like our own little honeymoon.</p>
        </div>
        <div className="look-grid">
          {eveningLooks.map((look) => (
            <article className={`look-card look-${look.color}`} key={look.title}>
              <span>♡</span>
              <h3>{look.title}</h3>
              <p>{look.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="love-footer-note">
        <span>01</span>
        <p>One heart. One life. All my love, Sadiya.</p>
        <Link to="/">Open our full gallery ↗</Link>
      </section>
    </div>
  );
}