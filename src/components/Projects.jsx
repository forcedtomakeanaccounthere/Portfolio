'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[1.2rem] font-bold text-[#DC143C] uppercase tracking-[0.4em] mb-4">
            Portfolio
          </h2>
          <h1 className="section-title">Featured <span>Projects</span></h1>
          <div className="w-16 h-[2px] bg-[#DC143C] mx-auto mt-6" />
        </div>

        <div className="flex flex-col">
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onSeeMore={setSelectedProject}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            href="/project" 
            className="inline-flex items-center gap-4 px-12 py-5 bg-[#29323C] text-white text-[1.6rem] font-bold rounded-2xl hover:bg-[#DC143C] transition-all duration-300 shadow-xl shadow-slate-200 group"
          >
            See All Projects
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
