// src/app/page.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
    document.body.style.overflow = isNavOpen ? 'auto' : 'hidden'
  }

  const closeNav = () => {
    setIsNavOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      {/* Header */}
      <header id="header" className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header container">
          <div className="nav-bar">
            <div className="brand">
              <a href="#hero">
                <h1 id="namee">
                  <span>A</span>bhishek <br />
                  <span>A</span>nand
                </h1>
              </a>
            </div>
            <nav className="nav-list">
              <div className="hamburger" onClick={toggleNav}>
                <div className={`bar ${isNavOpen ? 'active' : ''}`}></div>
              </div>
              <ul className={isNavOpen ? 'active' : ''}>
                <li><a href="#hero" onClick={closeNav} data-after="Home">Home</a></li>
                <li><a href="#services" onClick={closeNav} data-after="Services">Domains</a></li>
                <li><a href="#skills" onClick={closeNav} data-after="Skills">Skills</a></li>
                <li><a href="#projects" onClick={closeNav} data-after="Projects">Projects</a></li>
                <li><a href="#about" onClick={closeNav} data-after="About">About</a></li>
                <li><a href="#contact" onClick={closeNav} data-after="Contact">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero">
        <div className="hero container">
          <div>
            <h1>Hello, <span></span></h1>
            <h1>My Name is <span></span></h1>
            <h1>Abhishek Anand <span></span></h1>
            <a href="#projects" className="cta">Portfolio</a>
          </div>
        </div>
      </section>

      {/* Services Section (Domains) */}
      <section id="services">
        <div className="services container">
          <div className="service-top">
            <h1 className="section-title">Dom<span>a</span>ins</h1>
            <p>These are some of the domains where I'm either actively building projects, or exploring new ideas, or diving deeper into to broaden my expertise. Whether I'm fully immersed in development or just testing the waters to expand my skill set, each area represents my commitment to continuous learning and innovation.</p>
          </div>
          <div className="service-bottom">
            <div className="service-item">
              <div className="icon">
                <Image src="https://img.icons8.com/bubbles/100/cloud-backup-restore.png" alt="cloud-backup-restore" width={80} height={80} />
              </div>
              <h2>Cloud Computing & GenAI</h2>
              <p>Currently exploring the field, diving into a range of cloud-native technologies, focusing on solutions that are robust and cost-effective, balancing performance and expense of cloud resources.</p>
              <h3 className="certificate"><a href="https://www.cloudskillsboost.google/public_profiles/919c1af2-b303-4e1a-998e-b9d5ca87a2b2">Certifications</a></h3>
            </div>
            <div className="service-item">
              <div className="icon">
                <Image src="https://img.icons8.com/bubbles/100/000000/services.png" alt="services" width={80} height={80} />
              </div>
              <h2>Web Design</h2>
              <p>As a Web Developer with an eye for both aesthetics and functionality, I'm committed to creating seamless user experiences that blend design and usability, focussing on responsive designs, catering to a broad range of users while also prioritizing performance.</p>
            </div>
            <div className="service-item">
              <div className="icon">
                <Image src="https://img.icons8.com/bubbles/100/for-experienced.png" alt="for-experienced" width={80} height={80} />
              </div>
              <h2>AI & ML Models</h2>
              <p>Passionate about Artificial Intelligence and Machine Learning and the innovations AI can bring to various industries, getting my hands dirty with projects related to real-life applications using fields like Deep learning, CV and NLP</p>
              <h3 className="certificate"><a href="https://www.coursera.org/account/accomplishments/specialization/2KA6FXHXM3LV">Certifications</a></h3>
            </div>
            <div className="service-item">
              <div className="icon">
                <Image src="https://img.icons8.com/bubbles/100/combo-chart.png" alt="combo-chart" width={80} height={80} />
              </div>
              <h2>Data Analysis</h2>
              <p>With a growing skillset in AI and ML, I also possess the analytical abilities essential for data-driven decision-making. My interest in machine learning provides a strong basis for uncovering insights and creating predictive models from data.</p>
            </div>
            <div className="service-item">
              <div className="icon">
                <Image src="https://img.icons8.com/bubbles/100/blockchain-technology.png" alt="blockchain-technology" width={80} height={80} />
              </div>
              <h2>Blockchain & Web 3.0</h2>
              <p>My interest in making robust web applications and in complex problem-solving makes blockchain and Web 3.0 areas of future interest, especially with the overlap in secure, decentralized applications.</p>
              <h3 className="certificate"><a href="img/Web3.0 Summer School & hackathon.jpg">Certifications</a></h3>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="projects container">
          <div className="projects-header">
            <h1 className="section-title">Recent <span>Projects</span></h1>
          </div>
          <div className="all-projects">
            <div className="project-item">
              <div className="project-info">
                <h1>Project 1 : Sarcasm Predictor</h1>
                <h2>Uses NLP and DL</h2>
                <p>This project can be used to <b>recognize the sentiment</b> of statement and tell the difference if the statement is sarcastic or not. The model is trained on <b>Newspaper Headlines</b> and popular <b>Tweets</b> recognizing sentiments using NLP concepts like embeddings, vectorization, etc.</p>
                <h3 className="project-link"><a href="https://github.com/forcedtomakeanaccounthere/sarcasm_detector">Project Link</a></h3>
              </div>
              <div className="project-img">
                <Image src="/img/sarcasm.jpg" alt="Sarcasm Predictor" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="project-item">
              <div className="project-info">
                <h1>Project 2 : Churn prevention Recommender System</h1>
                <h2>Uses Content-Based filtering recommender system and ML</h2>
                <p>Analyses the data of a telecom company and <b>recognises a pattern</b> which is followed majorly in the churn of customers. Accordingly it generates recommendations to give different kinds of <b>personalised offers to customers to reduce churn</b>.</p>
                <h3 className="project-link"><a href="https://github.com/forcedtomakeanaccounthere/Churn-prevention-recommender-system">Project Link</a></h3>
              </div>
              <div className="project-img">
                <Image src="/img/churn2.0.jpg" alt="Churn Prevention" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="project-item">
              <div className="project-info">
                <h1>Project 3 : Media & Marketing investment Recommender</h1>
                <h2>Uses ML and DL</h2>
                <p>Takes data of various Social Media platforms and decides how much <b>investment in advertisements</b> is actually converted into <b>profitable revenue</b> for the company by monitoring the number of clicks on Ads and actual buying of the product.</p>
                <h3 className="project-link"><a href="https://github.com/forcedtomakeanaccounthere/media-and-marketing-investment">Project Link</a></h3>
              </div>
              <div className="project-img">
                <Image src="/img/media2.0.jpg" alt="Media Investment" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="project-item">
              <div className="project-info">
                <h1>Project 4 : Crop Recommender System</h1>
                <h2>Uses Recommender system and ML concepts</h2>
                <p>Takes into account the <b>weather and soil conditions of a region</b> like temperature, rainfall, humidity, soil pH, nutrients in soil and the recommends the kind of crops that should be grown for <b>maximum yield and benifit</b> to farmer.</p>
                <h3 className="project-link"><a href="https://github.com/forcedtomakeanaccounthere/crop_recommendation">Project Link</a></h3>
              </div>
              <div className="project-img">
                <Image src="/img/img-1.png" alt="Crop Recommender" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="container-skills">
          <div className="service-top">
            <h1 className="section-title">Ski<span>ll</span>s</h1>
          </div>
          <div className="service-bottom">
            <div className="skills">
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/clouds/100/python.png" alt="python" width={40} height={40} />
                Python
              </span>
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/color/48/tensorflow.png" alt="tensorflow" width={40} height={40} />
                TensorFlow
              </span>
              <span className="skill-tag">
                <Image className="skill-icons-imag" src="https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png" alt="Scikit-Learn" width={40} height={40} />
                Scikit-Learn
              </span>
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-machine-learning-robotics-flaticons-lineal-color-flat-icons.png" alt="Machine Learning" width={40} height={40} />
                Machine Learning
              </span>
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/external-becris-lineal-color-becris/64/external-deep-learning-artificial-intelligence-becris-lineal-color-becris.png" alt="Deep Learning" width={40} height={40} />
                Deep Learning
              </span>
              <span className="skill-tag">
                <Image className="skill-icons-width" src="https://img.icons8.com/color/48/html-5--v1.png" alt="HTML" width={40} height={40} />
                HTML
              </span>
              <span className="skill-tag">
                <Image className="skill-icons-width" src="https://img.icons8.com/fluency/48/css3.png" alt="CSS" width={40} height={40} />
                CSS
              </span>
              <span className="skill-tag">
                <Image className="skill-icons-width" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-natural-language-processing-big-data-flaticons-lineal-color-flat-icons.png" alt="NLP" width={40} height={40} />
                NLP
              </span>
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/external-smashingstocks-outline-color-smashing-stocks/66/external-data-analysis-seo-and-marketing-smashingstocks-outline-color-smashing-stocks.png" alt="Data Analysis" width={40} height={40} />
                Data Analysis
              </span>
              <span className="skill-tag">
                <Image className="skill-icons-width-sql" src="https://img.icons8.com/color/48/my-sql.png" alt="MySQL" width={40} height={40} />
                MySQL
              </span>
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/color/48/javascript--v1.png" alt="JavaScript" width={40} height={40} />
                JavaScript
              </span>
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png" alt="Java" width={40} height={40} />
                Java
              </span>
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/color/48/c-plus-plus-logo.png" alt="C++" width={40} height={40} />
                C++
              </span>
              <span className="skill-tag">
                <Image className="skill-icons-width" src="https://img.icons8.com/color/48/c-programming.png" alt="C" width={40} height={40} />
                C
              </span>
              <span className="skill-tag">
                <Image className="skill-icons" src="https://img.icons8.com/color/48/pandas.png" alt="Pandas" width={40} height={40} />
                Pandas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
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
            <p>I am currently pursuing Bachelor of Technology in Computer Science [2nd year B.Tech CSE] from IIIT-Sri City, Chittoor. I'm proficient in Python and its advanced libraries and Database Management, passionate about AI/ML and Data Science solving real-world problems through projects by application of my knowledge in the Web development and ML fields and problem solving skills <br /> <br /> AI/ML & DS Core Member at [Google Developer Groups] GDG IIIT-Sri City</p>
            <a href="https://drive.google.com/file/d/1H6bz9tZne9CRko-3m8eFB_und8zDKj9b/view?usp=sharing" className="cta">Download Resume</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="contact container">
          <div>
            <h1 className="section-title">Contact <span>info</span></h1>
          </div>
          <div className="contact-items">
            <div className="contact-item">
              <div className="icon">
                <Image src="https://img.icons8.com/bubbles/100/000000/phone.png" alt="phone" width={70} height={70} />
              </div>
              <div className="contact-info">
                <h1>Phone</h1>
                <h2>+91 7386811239</h2>
                <h2>+91 7208658365</h2>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">
                <Image src="https://img.icons8.com/bubbles/100/000000/new-post.png" alt="email" width={70} height={70} />
              </div>
              <div className="contact-info">
                <h1>Email</h1>
                <h2>abhishek.a23@iiits.in</h2>
                <h2>abhishekanandvii@gmail.com</h2>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">
                <Image src="https://img.icons8.com/bubbles/100/000000/map-marker.png" alt="address" width={70} height={70} />
              </div>
              <div className="contact-info">
                <h1>Address</h1>
                <h2>IIIT-Sri City, Chittoor, Andhra Pradesh</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="footer container">
          <div className="brand">
            <h1><span>A</span>bhishek <span>A</span>nand</h1>
          </div>
          <h2>Let's Connect</h2>
          <div className="social-icon">
            <div className="social-item">
              <a href="https://www.linkedin.com/in/abhishek-anand-97529128a/">
                <Image src="/img/linkedin.jpg" alt="LinkedIn" width={50} height={50} />
              </a>
            </div>
            <div className="social-item">
              <a href="https://www.instagram.com/abhi_rehnedo">
                <Image src="/img/insta.jpg" alt="Instagram" width={50} height={50} />
              </a>
            </div>
            <div className="social-item">
              <a href="twitter account unavailable">
                <Image src="/img/twitter.jpg" alt="Twitter" width={50} height={50} />
              </a>
            </div>
            <div className="social-item">
              <a href="https://github.com/forcedtomakeanaccounthere">
                <Image src="/img/git.jpg" alt="GitHub" width={50} height={50} />
              </a>
            </div>
          </div>
          <p>Copyright © 2024 Abhishek. All rights reserved</p>
        </div>
      </footer>
    </>
  )
}