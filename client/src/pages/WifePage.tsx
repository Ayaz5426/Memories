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
        <p className="eyebrow">A little note for you</p>
        <h1>To my favorite person,<br /><em>in every place.</em></h1>
        <p className="love-copy">
          Every journey is better because I get to take it with you. These are not just
          photographs of places we have seen. They are proof of all the beautiful ordinary
          moments that became extraordinary because you were there.
        </p>
        <p className="love-signature">Always choosing you,<br /><strong>Your husband</strong></p>
      </section>

      <section className="love-gallery" aria-label="Our favorite moments">
        {moments.map((moment) => (
          <img key={moment.image} className={moment.className} src={moment.image} alt={moment.alt} />
        ))}
        <div className="love-seal" aria-hidden="true">♥</div>
      </section>

      <section className="love-footer-note">
        <span>01</span>
        <p>More adventures, more laughs, more us.</p>
        <Link to="/">Open our full gallery ↗</Link>
      </section>
    </div>
  );
}