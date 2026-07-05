// src/app/page.js
import Header from '../components/Header'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Education from '../components/Education'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <About />
      <Contact />
      <Footer />
    </>
  )
}