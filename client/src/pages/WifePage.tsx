import { Link } from 'react-router-dom';

const moments = [
  {
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=85',
    alt: 'A sunlit coastal view',
    className: 'love-photo love-photo-tall',
  },
  {
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85',
    alt: 'A quiet garden path',
    className: 'love-photo',
  },
  {
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=85',
    alt: 'A colorful city street',
    className: 'love-photo love-photo-wide',
  },
];

export default function WifePage() {
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
        {moments.map((moment) => (
          <img key={moment.image} className={moment.className} src={moment.image} alt={moment.alt} />
        ))}
        <div className="love-seal" aria-hidden="true">♥</div>
      </section>

      <section className="quote-grid" aria-label="Love notes">
        <blockquote>“Sadiya, you are the softest part of my life and the brightest part of every tomorrow.”</blockquote>
        <blockquote>“I would choose your hand, your laugh, and your heart in every version of this life.”</blockquote>
        <blockquote>“My favorite place will always be wherever you are.”</blockquote>
      </section>

      <section className="love-footer-note">
        <span>01</span>
        <p>One heart. One life. All my love, Sadiya.</p>
        <Link to="/">Open our full gallery ↗</Link>
      </section>
    </div>
  );
}