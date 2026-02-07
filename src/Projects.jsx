import React, { useEffect, useState } from "react";
import { ArrowUpRight, Search, Filter } from "lucide-react";

const Projects = () => {
  const [query, setQuery] = useState("");
  const [activeYear, setActiveYear] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      title: "StreamX",
      subtitle: "Video Sharing Platform",
      tech: ["Node.js", "React.js", "MongoDB", "OAuth 2.0", "Redis", "WebRTC"],
      description:
        "A full-stack video platform with OAuth 2.0 authentication, video upload/streaming, and creator-based publishing using React, Node.js, and MongoDB. Integrated a real-time streaming pipeline service using WebRTC with STUN/TURN for NAT traversal. Developed a hybrid recommendation system combining TF-IDF, collaborative filtering, and NLP-based metadata similarity, Improved recommendation response latency by caching similarity results in Redis",
      year: "2024",
      image: "./stream.jpg",
      url: "https://streamsx.vercel.app/",
    },
    {
      title: "Web Ride Booking Service",
      subtitle: "Ride Booking Platform",
      tech: [
        "React.js",
        "Node.js",
        "MongoDB",
        "Google Maps API",
        "Socket.io",
        "Razorpay",
      ],
      description:
        "Developed a full-stack ride-booking system with real-time driver tracking, ride lifecycle management, and Razorpay payments. , with an event-driven real-time architecture using Socket.io to push ride status updates, driver location changes, and chat messages. Integrated Google Maps API for live geolocation, route distance estimation, and fare calculation.",
      year: "2024",
      image: "Uber.jpg",
      url: "https://github.com/010Harsh010/Uber-clone",
    },
    {
      title: "Smart Delhi Router",
      subtitle: "AI-Powered Navigation",
      tech: ["LLM", "LangChain", "Tools", "Reinforcement Learning", "GNN"],
      description:
        "Travel-routing assistant combining LLM with GNN + RL for path prediction beyond classical Dijkstra routing. Used a Graph Neural Network to learn edge weights from real-world factors such as traffic density, enabling improved ETA estimation with 0.15 loss. Applied Reinforcement Learning to optimize route selection under live-traffic conditions by minimizing travel time and rerouting cost.",
      year: "2025",
      status: "Present",
      image: "route.jpg",
      url: "https://colab.research.google.com/drive/1NIfYJTiNBW5A1k41RUNTBWr-zYWoFVTB?usp=sharing",
    },
    {
      title: "AgriGuard",
      subtitle: "Agriculture Logistics Management",
      tech: ["Langchain", "langgraph", "FastMCP", "SLM", "Ollama", "Knowledge Graph"],
      description:
        "Building an agriculture logistics management system using knowledge-graph reasoning and a fine-tuned small language model (SLM) for decision support. Designing a priority-based dispatch workflow to reduce warehouse-to-market transport delays by reasoning over supply urgency, route constraints, and inventory dependencies.",
      year: "2026",
      status: "Present",
      image: "agrigaurd.jpeg",
      url: "",
    },
    {
      title: "YouTube Transcript Q/A",
      subtitle: "RAG-based System",
      tech: ["Python", "LangChain", "HuggingFace", "FAISS"],
      description:
        "Intelligent system for summarizing and answering questions from YouTube video transcripts using vector similarity search.",
      year: "2024",
      image: "youtube.jpg",
      url: "https://colab.research.google.com/drive/124QsmjcgtedExPwU-WYrJ3220ztA8wZU?usp=sharing",
    },
    {
      title: "Verbose LLM",
      subtitle: "Language Model Implementation",
      tech: ["PyTorch", "GPT-2", "QLoRA"],
      description:
        "Complete GPT-2 architecture implementation from scratch with QLoRA fine-tuning for efficient model adaptation.",
      year: "2024",
      image: "llm.jpg",
      url: "https://colab.research.google.com/drive/1wC0ZVZjpq62pGFEr6lt3Ga_vrkKLOPwB?usp=sharing",
    },
    {
      title: "Video Chat App",
      subtitle: "Real-time Communication",
      tech: ["React.js", "WebRTC", "Socket.io", "Redis"],
      description:
        "Peer-to-peer video chat platform with group rooms and Redis-based session management.",
      year: "2024",
      image: "chat.jpg",
      url: "https://chitterchatters.vercel.app/",
    },
  ];

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
          <a href="/" className="text-2xl font-light tracking-wide hover:text-gray-600 transition-colors">
            Harsh Singh
          </a>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="/projects" className="hover:text-gray-900 transition-colors">
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

                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-3xl font-light text-gray-900">
                        {project.title}
                      </h2>

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