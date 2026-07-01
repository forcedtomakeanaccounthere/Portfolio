import { color } from "motion";

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero container">
        <div>
          <h1>Hello, <span></span></h1>
          <h1>My Name is <span></span></h1>
          <h1>Abhishek Anand <span></span></h1>
          <a href="#projects" className="cta" style={{ color: 'white' }}>Portfolio</a>
        </div>
      </div>
    </section>
  )
}