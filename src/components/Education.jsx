import educationData from '../data/education.json'

export default function Education() {
  return (
    <section id="education" className="py-32 bg-[#F9F9F9] dark:bg-[#0b0e14] selection:bg-crimson/10 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="section-title">Edu<span>c</span>ation</h1>
          <div className="h-[3px] bg-[#DC143C] mx-auto mt-4 w-[60px]" />
        </div>

        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <div
              key={edu.id || index}
              className="p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-[2rem] font-bold text-[#DC143C] mb-2">{edu.degree}</h3>
                  <p className="text-[1.6rem] text-[#0f172a] dark:text-slate-200 font-medium mb-2">{edu.college}</p>
                  <p className="text-[1.3rem] text-gray-600 dark:text-slate-400">{edu.location}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-4 py-2 bg-[#DC143C]/10 text-[#DC143C] rounded-xl text-[1.3rem] font-semibold">
                    {edu.duration}
                  </span>
                  {edu.cgpa && (
                    <div className="mt-3">
                      <span className="inline-block px-4 py-2 bg-gray-100 dark:bg-slate-700 text-[#0f172a] dark:text-slate-200 rounded-xl text-[1.3rem] font-semibold">
                        CGPA: {edu.cgpa}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
