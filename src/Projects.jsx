import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search, Filter } from "lucide-react";
import projects from "./data/projects";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [activeYear, setActiveYear] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const years = ["All", ...Array.from(new Set(projects.map((p) => p.year))).sort().reverse()];

  const filteredProjects = projects.filter((p) => {
    const matchesYear = activeYear === "All" || p.year === activeYear;
    const text = `${p.title} ${p.subtitle} ${p.description} ${p.tech.join(" ")}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    return matchesYear && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 w-full z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <a href="/portfolio" className="text-2xl font-light tracking-wide hover:text-gray-600 transition-colors">
            Harsh Singh
          </a>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="/portfolio" className="hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="/portfolio/projects" className="hover:text-gray-900 transition-colors">
              Projects
            </a>
          </div>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              All Projects
            </h1>
            <p className="text-lg text-gray-600 font-light max-w-3xl leading-relaxed">
              A complete list of my work across backend systems, applied AI, real-time applications, and full-stack development.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center mb-14">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects by title, tech, or description..."
                  className="w-full bg-transparent outline-none text-gray-700 font-light"
                />
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={activeYear}
                  onChange={(e) => setActiveYear(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 font-light"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {filteredProjects.map((project) => (
              <div
                key={project.title}
                className="border border-gray-100 rounded-2xl p-10 hover:border-gray-200 hover:shadow-sm transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">
                      {project.year}
                      {project.status ? ` • ${project.status}` : ""}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <h2 className="text-3xl font-light text-gray-900">
                        {project.title}
                      </h2>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/portfolio/projects/${project.slug}`}
                          className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          View details
                        </Link>

                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300"
                          >
                            <ArrowUpRight className="w-5 h-5 text-gray-600" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-lg text-gray-600 font-light mb-6">
                      {project.subtitle}
                    </p>

                    <p className="text-gray-700 font-light leading-relaxed mb-8">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-4 py-2 bg-gray-100 text-gray-600 rounded-full tracking-wide"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-64">
                    <div className="w-full h-44 rounded-2xl overflow-hidden border border-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-gray-600 font-light text-lg">
                No projects found.
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-16 px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-gray-500">
          <div>© 2025 Harsh Singh</div>
          <div>Alwar, Rajasthan</div>
        </div>
      </footer>
    </div>
  );
};

export default Projects;