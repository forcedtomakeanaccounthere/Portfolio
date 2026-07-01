import Image from 'next/image'
import ResumePreview from './ResumePreview'

export default function About() {
  return (
    <section id="about">
      <div className="about container">
        <div className="col-left">
          <div className="about-img">
            <Image src="/img/img-2.jpg" alt="About Image" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className="col-right">
          <h1 className="section-title">About <span>me</span></h1>
          <h2 className='mt-[20px]'>CSE Undergrad</h2>
          <p>I'm a 3rd-year B.Tech CSE student at IIIT Sri City, Chittoor, with a deep passion for building impactful web applications that tackle real-world challenges. Specializing in full-stack web development, I work with modern technologies like Next.js, React, Node.js, and Python to create scalable, user-friendly digital solutions.<br /> <br /> I also have a strong foundation in AI/ML and Data Science, which allows me to integrate intelligent algorithms into web applications to enhance functionality. As an active AI/ML Domain Lead at GDG IIIT-Sri City, I continually seek opportunities to merge my web development expertise with machine learning to deliver innovative, data-driven solutions. <br /> <br /> SDE Intern at Cogzin Technologies.</p>
          <ResumePreview />
        </div>
      </div>
    </section>
  )
}

