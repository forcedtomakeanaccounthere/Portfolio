import Image from 'next/image'

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
          <h2>CSE Undergrad</h2>
          <p>I am currently pursuing Bachelor of Technology in Computer Science [3rd year B.Tech CSE] from IIIT-Sri City, Chittoor. I'm proficient in Web Development and Data Science/ML tasks. Python and its advanced libraries and Database Management, passionate about AI/ML and Data Science solving real-world problems through projects by application of my knowledge in the Web development and ML fields and problem solving skills <br /> <br /> AI/ML & DS Core Member at [Google Developer Groups] GDG IIIT-Sri City</p>
          <a href="/Resume_Abhishek_Anand.pdf" className="cta">Download Resume</a>
        </div>
      </div>
    </section>
  )
}