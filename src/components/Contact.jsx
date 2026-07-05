import Image from 'next/image'

const CARDS = [
  {
    key: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Connect with me on LinkedIn',
    href: 'https://www.linkedin.com/in/abhishek-anand-97529128a/',
    imgDesktop: '/img/contact_linkedin.png',
    imgMobile: '/img/contact_linkedinCrop.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    key: 'gmail',
    title: 'Gmail',
    subtitle: 'Reach out to me via email',
    href: 'mailto:abhishekanandvii@gmail.com',
    imgDesktop: '/img/contact_mail.png',
    imgMobile: '/img/contact_mailCrop.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    key: 'instagram',
    title: 'Instagram',
    subtitle: 'Follow me on Instagram',
    href: 'https://www.instagram.com/abhi_rehnedo',
    imgDesktop: '/img/contact_insta.png',
    imgMobile: '/img/contact_instaCrop.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#f3f4f7] dark:bg-[#10131a] transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="section-title">Contact <span>Me</span></h1>
          <p className="text-[1.6rem] text-slate-500 dark:text-slate-400 mt-4 font-light">
            Let&apos;s connect and create something amazing together.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((card) => (
            <a
              key={card.key}
              href={card.href}
              target={card.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group bg-white dark:bg-[#151922] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.13)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.55)] transition-all duration-400 overflow-hidden flex flex-col"
            >
              {/* Card top */}
              <div className="px-7 pt-7 pb-5 flex items-start justify-between">
                <div>
                  <h2 className="text-[2rem] font-bold text-[#1a1a1a] dark:text-slate-100 mb-2 leading-tight">
                    {card.title}
                  </h2>
                  <p className="text-[1.4rem] text-[#DC143C] font-medium leading-snug">
                    {card.subtitle}
                  </p>
                </div>
                <span className="text-[#1a1a1a] dark:text-slate-300 mt-1 group-hover:text-[#DC143C] transition-colors duration-300 shrink-0 ml-4">
                  {card.icon}
                </span>
              </div>

              {/* Platform screenshot */}
              <div className="relative mx-5 mb-5 rounded-xl overflow-hidden flex-1">
                {/* Desktop image */}
                <div className="hidden md:block relative w-full h-[260px]">
                  <Image
                    src={card.imgDesktop}
                    alt={`${card.title} preview`}
                    fill
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                {/* Mobile image */}
                <div className="block md:hidden relative w-full h-[220px]">
                  <Image
                    src={card.imgMobile}
                    alt={`${card.title} preview`}
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
