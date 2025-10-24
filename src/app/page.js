// src/app/page.js
import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </>
  )
}