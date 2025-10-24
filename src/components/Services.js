import Image from 'next/image'

export default function Services() {
  return (
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
  )
}