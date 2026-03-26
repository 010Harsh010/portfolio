import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import projects from "../data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-gray-900 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-6">Project not found</h1>
          <p className="text-gray-600 mb-4">
            We couldn't find a project with this title. Please go back to projects.
          </p>
          <button
            onClick={() => navigate('/portfolio/projects')}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
          >
            Back to all projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 w-full z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/portfolio" className="text-2xl font-light tracking-wide hover:text-gray-600">
            Harsh Singh
          </Link>
          <div className="flex items-center gap-5 text-sm text-gray-600">
            <Link to="/portfolio" className="hover:text-gray-900">
              Home
            </Link>
            <Link to="/portfolio/projects" className="hover:text-gray-900">
              Projects
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 hover:text-gray-900"
            >
              <ArrowLeft size={14} /> Back
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="text-sm text-gray-500">
              {project.year}
              {project.status ? ` • ${project.status}` : ""}
            </div>
            <h1 className="text-5xl font-semibold mb-3">{project.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{project.subtitle}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {project.about || project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  <ArrowUpRight size={16} /> Live Demo
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-100"
                >
                  <Github size={16} /> GitHub
                </a>
              )}
            </div>
          </div>

          <div className="w-full rounded-2xl overflow-hidden border border-gray-100 mb-10">
            <img
              src={project?.image}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </div>

          <section className="space-y-5">
            <h2 className="text-3xl font-semibold">About this project</h2>
            {project.sections && project.sections.map((section, index) => (
  <section key={index} className="mb-10">
    <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
      {section.content}
    </p>
  </section>
))}
            {/* <p className="text-gray-500 text-sm">
              Use this section to include workflow notes, architecture, responsibilities, and outcome metrics.
            </p> */}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
