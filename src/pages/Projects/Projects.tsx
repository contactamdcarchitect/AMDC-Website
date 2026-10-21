import { useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import type { Project } from '@/types/project';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Footer from '@/components/Footer/Footer';
import styles from './Projects.module.scss';

const ProjectModal = lazy(() => import('@/components/ProjectModal/ProjectModal'));

const categories = ['All', 'Residential', 'Commercial', 'Hospitality', 'Cultural & Institutional'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Projects | AMDC Interior Design Portfolio</title>
        <meta
          name="description"
          content="Browse AMDC's complete portfolio of luxury interior design projects — residential villas, commercial spaces, boutique hotels, and more across India."
        />
        <meta property="og:title" content="Projects | AMDC Interior Design Portfolio" />
        <link rel="canonical" href="https://amdc.in/projects" />
      </Helmet>

      <main>
        {/* ── Page Hero ───────────────────────────────── */}
        <section className={styles.hero} aria-labelledby="projects-hero-title">
          <div className={styles.heroBg} aria-hidden="true">
            <img
              src="/images/amdcprojects/final website project images/Residential/terrace design sec 57 ggn/Residence terrace view 1 (7).jpg"
              alt="AMDC project portfolio"
            />
          </div>
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Our Portfolio</p>
            <h1 id="projects-hero-title">
              Selected <em>Projects</em>
            </h1>
            <p className={styles.heroSub}>
              {projects.length}+ luxury spaces crafted across India
            </p>
          </div>
        </section>

        {/* ── Filters + Grid ──────────────────────────── */}
        <section className={styles.section} aria-label="Project portfolio">
          <div className={styles.container}>

            {/* Filter bar */}
            <div className={styles.filterBar} role="group" aria-label="Filter projects by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filter} ${activeCategory === cat ? styles.active : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                  <span className={styles.filterCount}>
                    {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className={styles.grid} role="list" aria-label="Projects">
              {filtered.map((project) => (
                <div key={project.id} className={styles.card} role="listitem">
                  <ProjectCard project={project} onClick={setSelectedProject} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </main>

      <Footer />
    </>
  );
}
