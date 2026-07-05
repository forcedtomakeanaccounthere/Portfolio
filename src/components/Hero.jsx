import { mestika } from '@/fonts/mestika'
import { cafenty } from '@/fonts/cafenty'
import { karmen } from '@/fonts/karmen'
import profile from '../data/profile.json'

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero container">
        <div>
          <h1 className={mestika.className}>
            hello , <span></span>
          </h1> 
          {/* <h1>
            <span className={mestika.className}>hello</span>. <span></span>
          </h1> */}
          <h1 className='-mt-9'>My Name is <span></span></h1>
          <h1 className={`${karmen.className}`}> {profile.name} <span></span> </h1>
          {/* <h1>{profile.name} <span></span></h1> */}
          <a href="#projects" className="cta" style={{ color: 'white' }}>Portfolio</a>
        </div>
      </div>
    </section>
  )
}
