import Image from 'next/image'

export default function Contact() {
  return (
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
  )
}