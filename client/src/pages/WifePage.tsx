import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import './WifePage.css';

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

const romancePhotos = [
  { image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85', alt: 'Couple at sunset', label: 'Our golden hour', quote: 'My favorite sunsets are the ones I get to share with you.' },
  { image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=85', alt: 'Romantic couple', label: 'Just you and me', quote: 'In a crowded world, I would still find your hand first.' },
  { image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=900&q=85', alt: 'Elegant beach moment', label: 'Beautiful, always', quote: 'You carry sunshine with you, Sadiya, wherever you go.' },
  { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85', alt: 'Tropical beach', label: 'Our little paradise', quote: 'Anywhere can feel like paradise when I am beside you.' },
];

const puzzleQuestions = [
  { question: 'What word describes the promise I want to keep with you?', hint: 'It has seven letters.', answer: 'forever' },
  { question: 'Who has completely stolen my heart?', hint: 'You already know her name. 😉', answer: 'sadiya' },
  { question: 'What do I want more of in our life?', hint: 'Think about nights when the world disappears.', answer: 'us' },
];

const chemistryQuestions = [
  { question: 'What makes me happiest?', answers: ['A perfect schedule', 'You ❤️', 'Another work call'], correct: 1 },
  { question: 'How should our perfect evening end?', answers: ['Dessert, music and a slow dance', 'Checking emails', 'Going home early'], correct: 0 },
  { question: 'What will I always make time for?', answers: ['Work', 'A quiet moment alone with you', 'My phone'], correct: 1 },
  { question: 'What do I secretly want more of?', answers: ['More time together', 'More meetings', 'More distance'], correct: 0 },
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

const reasons = [
  'Because your smile can completely change my day.',
  'Because you somehow became my favorite person.',
  'Because your voice can calm me down instantly.',
  'Because ordinary moments feel special with you.',
  'Because I love the way you look at me.',
  'Because you make me laugh when I need it most.',
  'Because being beside you feels like home.',
  'Because I still get butterflies around you.',
  'Because you are beautiful inside and out.',
  'Because I want to make memories with you.',
  'Because your hand fits perfectly in mine.',
  'Because I can be myself with you.',
  'Because you make my future look brighter.',
  'Because you are my favorite notification.',
  'Because I love your little habits.',
  'Because you make even boring days better.',
  'Because I would choose you again.',
  'Because your happiness matters to me.',
  'Because you are my safe place.',
  'Because simply... you are you. ❤️',
];

const truthChallenges = [
  'What is the naughtiest thought you have had about me recently?',
  'What do you find most irresistible about me?',
  'What is something you have wanted to tell me but were too shy to say?',
  'When do you find me the most attractive?',
  'What is your favorite way for me to tease you?',
  'What is one romantic fantasy you would like to share with me?',
  'What do I do that instantly gives you butterflies?',
  'If we had an entire night with no phones and no interruptions, what would you want to do?',
];

const dareChallenges = [
  'Give me a slow, passionate kiss.',
  'Whisper your naughtiest thought in my ear.',
  'Tell me exactly what you find irresistible about me.',
  'Give me a long hug and do not let go for 30 seconds.',
  'Send me a private selfie just for me.',
  'Give me three different kinds of kisses.',
  'Tell me something you have been too shy to say.',
  'Plan our next private date.',
  'Choose something about me you want to kiss.',
  'Tell me how you would like me to tease you.',
];

const futurePlans = [
  ['🏠', 'Our dream home', 'A place where lazy mornings and late-night conversations belong to us.'],
  ['✈️', 'Places we will travel', 'New cities, beautiful views and your hand in mine.'],
  ['🍽️', 'Dates we will have', 'Fancy dinners, roadside chai and everything between.'],
  ['🌙', 'Nights we will remember', 'The kind of nights we talk about years later.'],
  ['📸', 'Memories we will create', 'A thousand little moments worth keeping.'],
  ['❤️', 'Forever plans', 'Still choosing each other, every single day.'],
];

const initialUnlocked = Number(localStorage.getItem('wife-page-unlocked') || 0);

export default function WifePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [selectedRomance, setSelectedRomance] = useState<number | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [puzzleInput, setPuzzleInput] = useState('');
  const [puzzleMessage, setPuzzleMessage] = useState('');
  const [puzzleUnlocked, setPuzzleUnlocked] = useState(initialUnlocked >= 2);
  const [gameOpen, setGameOpen] = useState(false);
  const [gameIndex, setGameIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [dateIdea, setDateIdea] = useState(0);
  const [mood, setMood] = useState(0);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [adultOpen, setAdultOpen] = useState(false);
  const [adultConsent, setAdultConsent] = useState(false);
  const [adultMode, setAdultMode] = useState<'truth' | 'dare'>('truth');
  const [challenge, setChallenge] = useState(truthChallenges[0]);
  const [flirtLevel, setFlirtLevel] = useState(50);
  const [kissCount, setKissCount] = useState(0);
  const [confession, setConfession] = useState('');
  const [confessionSaved, setConfessionSaved] = useState(false);
  const [secretPassword, setSecretPassword] = useState('');
  const [passwordUnlocked, setPasswordUnlocked] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [finalUnlocked, setFinalUnlocked] = useState(initialUnlocked >= 100);

  function track(eventType: string, eventValue?: string | number) {
    void api.recordInteraction(eventType, eventValue).catch(() => undefined);
  }

  const progress = useMemo(() => {
    const values = [
      selectedPhoto !== null,
      puzzleUnlocked,
      selectedRomance !== null,
      gameFinished,
      adultConsent,
      passwordUnlocked,
      kissCount >= 10,
      confessionSaved,
      finalUnlocked,
    ];
    return Math.min(100, initialUnlocked + values.filter(Boolean).length * 8);
  }, [
    selectedPhoto, puzzleUnlocked, selectedRomance, gameFinished,
    adultConsent, passwordUnlocked, kissCount, confessionSaved, finalUnlocked
  ]);

  useEffect(() => {
    localStorage.setItem('wife-page-unlocked', String(progress));
  }, [progress]);

  function submitPuzzle(event: React.FormEvent) {
    event.preventDefault();
    const answer = puzzleInput.trim().toLowerCase();
    if (answer === puzzleQuestions[puzzleIndex].answer) {
      track('puzzle_solved', `${puzzleIndex + 1}: ${puzzleQuestions[puzzleIndex].question}`);
      setPuzzleMessage('Correct. You found another piece of my heart. ❤️');
      if (puzzleIndex === puzzleQuestions.length - 1) {
        setPuzzleUnlocked(true);
      } else {
        setPuzzleIndex((i) => i + 1);
      }
      setPuzzleInput('');
    } else {
      track('puzzle_attempt_failed', `${puzzleIndex + 1}: ${answer || '(empty)'}`);
      setPuzzleMessage('Not quite... think about us again. 😏');
    }
  }

  function answerGame(index: number) {
    const correct = index === chemistryQuestions[gameIndex].correct;
    track('chemistry_answer', `${chemistryQuestions[gameIndex].question} -> ${chemistryQuestions[gameIndex].answers[index]} (${correct ? 'correct' : 'wrong'})`);
    if (correct) setScore((s) => s + 1);
    if (gameIndex === chemistryQuestions.length - 1) setGameFinished(true);
    else setGameIndex((i) => i + 1);
  }

  function resetGame() {
    setGameIndex(0);
    setScore(0);
    setGameFinished(false);
  }

  function randomChallenge(mode = adultMode) {
    const list = mode === 'truth' ? truthChallenges : dareChallenges;
    const nextChallenge = list[Math.floor(Math.random() * list.length)];
    setChallenge(nextChallenge);
    track(`${mode}_challenge_selected`, nextChallenge);
  }

  function changeAdultMode(mode: 'truth' | 'dare') {
    setAdultMode(mode);
    track('adult_mode_selected', mode);
    randomChallenge(mode);
  }

  function handleKiss() {
    setKissCount((count) => {
      const nextCount = count + 1;
      track('kiss_claimed', nextCount);
      return nextCount;
    });
  }

  function flirtMessage() {
    if (flirtLevel < 25) return "You're being cute. 😇";
    if (flirtLevel < 50) return "Okay... I see where this is going. 👀";
    if (flirtLevel < 75) return "Someone's getting dangerous. 😏";
    if (flirtLevel < 100) return "Now you're making it difficult to behave. 🔥";
    return "Okay... bedroom eyes detected. 🔥😈";
  }

  function unlockPassword(event: React.FormEvent) {
    event.preventDefault();
    if (secretPassword.trim().toLowerCase() === 'sadiya') {
      track('secret_password_unlocked');
      setPasswordUnlocked(true);
      setFinalUnlocked(true);
    }
    else track('secret_password_failed');
  }

  async function saveConfession(event: React.FormEvent) {
    event.preventDefault();
    if (!confession.trim()) return;
    await api.createConfession(confession);
    track('confession_submitted', 'Private confession submitted');
    setConfession('');
    setConfessionSaved(true);
  }

  return (
    <div className="page love-page">
      <Link to="/" className="back-link">← Back to our memories</Link>

      <div className="love-progress" aria-label={`Our story ${progress}% unlocked`}>
        <span>Our Story</span>
        <div><i style={{ width: `${progress}%` }} /></div>
        <strong>{progress}% unlocked ❤️</strong>
      </div>

      <section className="love-intro">
        <p className="eyebrow">A private little universe for Sadiya Anam</p>
        <h1>Sadiya Anam,<br /><em>you are my forever.</em></h1>
        <p className="love-copy">
          I loved you yesterday, I love you more today, and I will keep finding new reasons to
          love you tomorrow. Every place becomes beautiful when your hand is in mine.
        </p>
        <p className="love-signature">
          You are my favorite hello and my hardest goodbye,<br />
          <strong>Forever yours ❤️</strong>
        </p>
      </section>

      <section className="love-gallery" aria-label="Our favorite moments">
        {moments.map((moment, index) => (
          <button
            key={moment.image}
            type="button"
            className={`${moment.className} love-photo-button`}
            onClick={() => {
              setSelectedPhoto(selectedPhoto === index ? null : index);
              track('memory_image_clicked', moment.alt);
            }}
          >
            <img src={moment.image} alt={moment.alt} />
            {selectedPhoto === index && <span className="photo-secret">{moment.secret}</span>}
          </button>
        ))}
        <button
          type="button"
          className="love-seal"
          onClick={() => {
            setSecretOpen((open) => !open);
            setEasterEggClicks((c) => c + 1);
            track('heart_secret_clicked');
          }}
          aria-label="Reveal secret"
        >
          ♥
        </button>
      </section>

      {secretOpen && (
        <aside className="secret-note" role="status">
          <span>🔓 Secret message unlocked</span>
          <p>Sadiya, if I could relive one moment, I would choose the next one with you.</p>
        </aside>
      )}

      <section className="romance-strip">
        {romancePhotos.map((photo, index) => (
          <figure key={photo.image}>
            <button
              type="button"
              className="romance-photo-button"
              onClick={() => {
                setSelectedRomance(selectedRomance === index ? null : index);
                track('romance_image_clicked', photo.label);
              }}
            >
              <img src={photo.image} alt={photo.alt} loading="lazy" />
              {selectedRomance === index && <span className="romance-quote">{photo.quote}</span>}
            </button>
            <figcaption>{photo.label}</figcaption>
          </figure>
        ))}
      </section>

      <section className="private-note">
        <div>
          <p className="eyebrow">Chapter 2 · The secret keys</p>
          <h2>Can you unlock what I really mean?</h2>
          <p>{puzzleQuestions[puzzleIndex].question}</p>
          <small>Hint: {puzzleQuestions[puzzleIndex].hint}</small>
        </div>

        {!puzzleUnlocked ? (
          <form onSubmit={submitPuzzle}>
            <input
              value={puzzleInput}
              onChange={(e) => setPuzzleInput(e.target.value)}
              placeholder="Type your answer..."
              aria-label="Puzzle answer"
            />
            <button type="submit">Unlock 🔑</button>
            {puzzleMessage && <span className="form-message">{puzzleMessage}</span>}
          </form>
        ) : (
          <div className="unlocked-letter">
            🔓 All keys found. My promise is forever, and my favorite future is the one with you.
          </div>
        )}
      </section>

      <section className="quote-grid">
        <blockquote>“Sadiya, you are the softest part of my life and the brightest part of every tomorrow.”</blockquote>
        <blockquote>“I would choose your hand, your laugh, and your heart in every version of this life.”</blockquote>
        <blockquote>“My favorite place will always be wherever you are.”</blockquote>
      </section>

      <section className="reasons-section">
        <div>
          <p className="eyebrow">Chapter 3 · Little truths</p>
          <h2>One of 20 reasons I love you</h2>
          <p>{reasons[reasonIndex]}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            const nextReason = (reasonIndex + 1) % reasons.length;
            setReasonIndex(nextReason);
            track('reason_revealed', reasons[nextReason]);
          }}
        >
          Another reason ❤️
        </button>
      </section>

      <section className="couple-game">
        {!gameOpen ? (
          <button
            type="button"
            className="game-launch"
            onClick={() => { setGameOpen(true); resetGame(); track('chemistry_game_started'); }}
          >
            Play our little love game <span>♥</span>
          </button>
        ) : gameFinished ? (
          <div className="game-result">
            <p className="eyebrow">A little truth</p>
            <h2>{score === chemistryQuestions.length ? 'You know exactly where my heart is.' : 'The answer is always you.'}</h2>
            <p>{score} of {chemistryQuestions.length} lovely choices.</p>
            <button type="button" onClick={resetGame}>Play again</button>
          </div>
        ) : (
          <div className="game-panel">
            <p className="eyebrow">Just us · {gameIndex + 1} of {chemistryQuestions.length}</p>
            <h2>{chemistryQuestions[gameIndex].question}</h2>
            <div className="game-answers">
              {chemistryQuestions[gameIndex].answers.map((answer, index) => (
                <button key={answer} type="button" onClick={() => answerGame(index)}>
                  {answer}
                </button>
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
        <button type="button" onClick={() => {
          const nextIdea = (dateIdea + 1) % dateIdeas.length;
          setDateIdea(nextIdea);
          track('date_idea_selected', dateIdeas[nextIdea]);
        }}>
          Another idea ↻
        </button>
      </section>

      <section className="after-hours">
        <div className="after-hours-heading">
          <p className="eyebrow">Chapter 5 · After hours</p>
          <h2>After hours, with you. 😏</h2>
          <p>Choose the feeling. I will bring the rest.</p>
        </div>
        <div className="mood-tabs" role="tablist">
          {moods.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={mood === index}
              className={mood === index ? 'active' : ''}
              onClick={() => {
                setMood(index);
                track('mood_selected', item.name);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="mood-card" role="tabpanel">
          <span className="mood-number">0{mood + 1}</span>
          <h3>{moods[mood].line}</h3>
          <p>{moods[mood].prompt}</p>
        </div>
      </section>

      <section className="kiss-bank">
        <p className="eyebrow">Chapter 6 · Physical affection tax</p>
        <h2>Kisses I owe you 💋</h2>
        <div className="kiss-counter">{kissCount}</div>
        <button type="button" onClick={handleKiss}>💋 Claim a kiss</button>
        <p>
          {kissCount === 0 ? 'You have not claimed your first one yet.' :
           kissCount < 5 ? 'Only a few? You are being far too polite. 😏' :
           kissCount < 10 ? 'You are getting greedy... and I like it.' :
           'Okay. This website cannot possibly contain all the kisses I owe you. ❤️'}
        </p>
      </section>

      {!adultOpen ? (
        <section className="adult-gate">
          <p className="eyebrow">Private · 18+ · Just us</p>
          <h2>FOR YOUR EYES ONLY 🔥</h2>
          <p>This room is private, playful, flirty and a little naughty.</p>
          <button type="button" onClick={() => { setAdultOpen(true); track('private_room_opened'); }}>
            Enter our secret room 😈
          </button>
        </section>
      ) : !adultConsent ? (
        <section className="adult-gate adult-consent">
          <span className="adult-badge">18+</span>
          <h2>Our private room</h2>
          <p>
            Everything here is just for fun. If either of us is not comfortable,
            we skip it. No pressure. No judgment. Just us. ❤️
          </p>
          <div className="adult-actions">
            <button type="button" onClick={() => { setAdultConsent(true); track('private_room_consent', 'play'); randomChallenge(); }}>
              Let's play 😈
            </button>
            <button type="button" onClick={() => { setAdultOpen(false); track('private_room_consent', 'keep_sweet'); }}>
              Keep it sweet ❤️
            </button>
          </div>
        </section>
      ) : (
        <section className="adult-room">
          <div className="adult-room-heading">
            <span className="adult-badge">18+ PRIVATE</span>
            <p className="eyebrow">Chapter 7 · For your eyes only</p>
            <h2>The side of us nobody else gets to see. 🔥</h2>
            <p>Private. Playful. A little naughty. Just us.</p>
          </div>

          <div className="truth-dare-tabs">
            <button type="button" className={adultMode === 'truth' ? 'active' : ''} onClick={() => changeAdultMode('truth')}>
              Truth 🔥
            </button>
            <button type="button" className={adultMode === 'dare' ? 'active' : ''} onClick={() => changeAdultMode('dare')}>
              Dare 😈
            </button>
          </div>

          <div className="challenge-card">
            <span>{adultMode === 'truth' ? 'TRUTH' : 'DARE'}</span>
            <h3>{challenge}</h3>
            <button type="button" onClick={() => randomChallenge()}>
              Random challenge 🔥
            </button>
          </div>

          <div className="flirt-meter">
            <p className="eyebrow">How badly do you want me?</p>
            <div className="flirt-labels"><span>Innocent 😇</span><span>Can't resist me 😈</span></div>
              <input
                type="range"
                min="0"
                max="100"
                value={flirtLevel}
                onChange={(e) => {
                  const nextLevel = Number(e.target.value);
                  setFlirtLevel(nextLevel);
                  track('flirt_level_changed', nextLevel);
                }}
              />
            <h3>{flirtMessage()}</h3>
          </div>

          <div className="fantasy-grid">
            {['🌙 Slow & Romantic', '🔥 Passionate', '😈 Naughty', '💋 Tease Me', '🖤 Your Choice'].map((item) => (
              <button key={item} type="button" onClick={() => {
                setAdultMode('dare');
                  const selectedFantasy = item.replace(/^.{2}\s/, '');
                  setChallenge(selectedFantasy + ': choose something fun, intimate and consensual for tonight. 😏');
                  track('fantasy_selected', selectedFantasy);
              }}>
                {item}
              </button>
            ))}
          </div>

          <div className="confession-box">
            <p className="eyebrow">No more being shy</p>
            <h3>Tell me something you've been too shy to say...</h3>
            {!confessionSaved ? (
              <form onSubmit={saveConfession}>
                <textarea
                  value={confession}
                  onChange={(e) => setConfession(e.target.value)}
                  placeholder="Something romantic, naughty, or completely irresistible..."
                  rows={4}
                />
                <button type="submit">Keep my secret 🔐</button>
              </form>
            ) : (
              <p className="saved-confession">Confession received. ❤️ Your secret stays between us.</p>
            )}
          </div>
        </section>
      )}

      <section className="password-secret">
        <p className="eyebrow">One more locked door</p>
        <h2>You know the password... 🔐</h2>
        {!passwordUnlocked ? (
          <form onSubmit={unlockPassword}>
            <input
              value={secretPassword}
              onChange={(e) => setSecretPassword(e.target.value)}
              placeholder="Enter the secret password"
              type="password"
            />
            <button type="submit">Unlock</button>
          </form>
        ) : (
          <div className="unlocked-letter">
            I knew you would remember. Come closer... ❤️<br />
            <strong>Final surprise unlocked.</strong>
          </div>
        )}
      </section>

      <section className="future-section">
        <p className="eyebrow">Chapter 8 · Our future</p>
        <h2>Things I still want to do with you.</h2>
        <div className="future-grid">
          {futurePlans.map(([icon, title, text]) => (
            <article key={title}>
              <span>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="easter-egg">
        <button
          type="button"
          onClick={() => setEasterEggClicks((c) => c + 1)}
          aria-label="Secret heart"
        >
          ❤️
        </button>
        <p>Some things are better discovered than announced.</p>
        {easterEggClicks >= 5 && (
          <div className="easter-reveal">You found a secret: I still get butterflies because of you. 🦋❤️</div>
        )}
      </section>

      {finalUnlocked && (
        <section className="final-secret">
          <p className="eyebrow">The last key 🔓</p>
          <h2>You solved the puzzles...</h2>
          <p>You opened the letters...</p>
          <p>You survived the questions...</p>
          <p>You unlocked our secrets...</p>
          <div className="final-heart">♥</div>
          <h3>But there is one thing you never had to unlock.</h3>
          <h1>MY HEART.</h1>
          <p className="final-message">
            Unfortunately for you... you already stole it. 😘
          </p>
          <strong>
            Whatever happens, wherever life takes us, I want to keep choosing you.
            Again. And again. And again. ❤️
          </strong>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            💖 Replay our story
          </button>
        </section>
      )}

      <section className="evening-edit">
        <p className="eyebrow">For Sadiya Anam · the next chapter of us</p>
        <h2>Tonight, let me fall for you all over again.</h2>
        <p>
          Wear whatever makes you feel beautiful, Sadiya. I will be waiting to admire you,
          hold your hand, and make one ordinary evening feel like our own little honeymoon.
        </p>
      </section>

      <section className="love-footer-note">
        <span>∞</span>
        <p>One heart. One life. All my love, Sadiya.</p>
        <Link to="/">Open our full gallery ↗</Link>
      </section>
    </div>
  );
}
