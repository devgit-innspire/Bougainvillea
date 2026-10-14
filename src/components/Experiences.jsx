import { EXPERIENCES } from '../data/site.js';
import { img } from '../lib/asset.js';
import { Eyebrow, Wave, Bloom } from './Botanical.jsx';

export default function Experiences() {
  return (
    <section className="experiences section" id="experiences" aria-labelledby="exp-title">
      <Wave variant="b" />
      <div className="wrap">
        <div className="section-head">
          <Eyebrow>Experiences</Eyebrow>
          <h2 id="exp-title">Made for the way you travel.</h2>
        </div>
        <div className="exp-grid">
          {EXPERIENCES.map((x) => (
            <article className="exp" key={x.title}>
              <div className="exp__media">
                <img src={img(x.img, true)} alt={x.alt} loading="lazy" width="800" height="533" />
                <Bloom className="exp__bloom" />
              </div>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
