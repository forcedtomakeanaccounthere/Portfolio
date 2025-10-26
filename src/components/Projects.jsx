import Image from 'next/image'

export default function Projects() {
  return (
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
  )
}