import Image from 'next/image'

export default function Skills() {
  return (
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
  )
}