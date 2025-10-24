import Image from 'next/image'

export default function Footer() {
  return (
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
        <p>Copyright © 2025 Abhishek. All rights reserved</p>
      </div>
    </footer>
  )
}