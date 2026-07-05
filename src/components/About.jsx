import Image from 'next/image'
import ResumePreview from './ResumePreview'
import aboutData from '../data/about.json'

export default function About() {
  return (
    <section id="about" className="bg-white dark:bg-[#0b0e14] transition-colors duration-300">
      <div className="about container">
        <div className="col-left">
          <div className="about-img">
            <Image src="/img/img-2.jpg" alt="About Image" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className="col-right">
          <h1 className="section-title">About <span>me</span></h1>
          <h2 className='mt-[20px] text-[#0f172a] dark:text-slate-100'>{aboutData.title}</h2>
          <p className="dark:text-slate-300 whitespace-pre-line">{aboutData.text}</p>
          <ResumePreview />
        </div>
      </div>
    </section>
  )
}
