import { mestika } from '@/fonts/mestika'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero container">
        <div>
          <span>
            <span className={mestika.className}>Hello</span>, <span></span>
          </span>
          {/* <h1>
            <span className={mestika.className}>Hello</span>, <span></span>
          </h1> */}
          <h1>My Name is <span></span></h1>
          <h1>Abhishek Anand <span></span></h1>
          <a href="#projects" className="cta" style={{ color: 'white' }}>Portfolio</a>
        </div>
      </div>
    </section>
  )
}
