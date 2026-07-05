import skillCategories from '../data/skills.json'

export default function Skills() {

  return (
    <section id="skills" className="bg-white dark:bg-[#0b0e14] min-h-[600px] w-full py-20 px-4 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-[4rem] font-light text-black dark:text-slate-100 uppercase tracking-[0.2rem]">
            Ski<span className="text-[#DC143C]">ll</span>s
          </h1>
        </div>

        <div className="border-t border-[#E5E5E5] dark:border-slate-800">
          {skillCategories.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row border-b border-[#E5E5E5] dark:border-slate-800 py-8 px-4 transition-all duration-300 hover:border-l-[3px] hover:border-l-[#DC143C] hover:bg-gray-50/50 dark:hover:bg-white/5"
            >
              <div className="w-full md:w-1/3 mb-2 md:mb-0">
                <h2 className="text-[1.4rem] font-bold uppercase tracking-[0.1rem] text-black dark:text-slate-100 group-hover:text-[#DC143C] transition-colors duration-300">
                  {item.category}
                </h2>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-[1.8rem] font-light leading-[1.8] tracking-[0.05rem] text-black dark:text-slate-300">
                  {item.skills}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
