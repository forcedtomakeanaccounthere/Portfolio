'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { motion } from 'motion/react';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F9F9F9] dark:bg-[#0b0e14] pt-40 pb-32 transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-32"
          >
            <h2 className="text-[1.2rem] font-bold text-[#DC143C] uppercase tracking-[0.4em] mb-4">
              Explore My Work
            </h2>
            <h1 className="text-[5rem] md:text-[7rem] font-bold text-[#29323C] dark:text-slate-100 leading-none mb-8 tracking-tighter">
              All <span>Projects</span>
            </h1>
            <p className="text-[1.8rem] text-slate-500 dark:text-slate-400 font-light max-w-[600px] mx-auto leading-relaxed">
              A deep dive into my engineering journey, from full-stack ecosystems to AI-driven solutions and workflow automation.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onSeeMore={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
