const projects = [
{
  id: 1,
  slug: "streamx",
  title: "StreamX",
  subtitle: "Video Sharing Platform",
  tech: ["Node.js", "React.js", "MongoDB", "OAuth 2.0", "Redis", "WebRTC", "AWS", "Grafana", "Prometheus", "k6"],
  year: "2024",
  image: "./stream.jpg",
  url: "https://bit.ly/stream_x",
  github: "https://github.com/010Harsh010/Stream",

  sections: [
    {
      title: "Overview",
      content: `
StreamX is a streamming video platform that replicates core YouTube workflows including video upload, streaming, real-time communication, and personalized recommendations.
      `
    },
    {
      title: "System Architecture",
      content: `
Frontend (React) → Nginx → Backend (Node.js) → MongoDB + Redis  
Media handled via Cloudinary CDN  
Prometheus + Grafana used for observability
k6 grafana for testing
      `
    },
    {
      title: "How It Works",
      content: `
1. User uploads video (Multer → backend)
2. Metadata stored in MongoDB
3. Video stored in Cloudinary
4. Feed generated using aggregation + recommendation engine
5. Redis caches frequent queries
6. Client fetches and streams video
      `
    },
    {
      title: "Backend Architecture (Most Important)",
      content: `
- MVC structure (controllers, services, models)
- Stateless APIs with JWT authentication
- Middleware pipeline (auth, validation, error handling)
- Scalable design for horizontal deployment
      `
    },
    {
  title: "CI/CD & Deployment Pipeline",
  content: `
StreamX uses a fully automated CI/CD pipeline to ensure consistent and reliable deployments.

The pipeline is implemented using GitHub Actions and follows a container-based deployment strategy:

1. Code push to main branch triggers workflow
2. Docker images are built for backend and frontend services
3. Images are pushed to Docker Hub
4. Production server is accessed via SSH
5. Latest images are pulled and deployed using docker-compose
6. Old images are pruned to maintain system hygiene

Separate workflows handle:
- Backend deployment
- Frontend deployment
- Infrastructure updates (Nginx, Prometheus, Grafana)

This setup ensures zero manual intervention, faster iteration cycles, and consistent environment parity between development and production.
`
},
{
  title: "Queue System",
  content: `
StreamX implements a lightweight in-process queue system to handle asynchronous video workflows without blocking API execution.

The queue is implemented using a custom JavaScript function-based queue mechanism (.queue()), designed to manage task sequencing and execution.

Primary use cases:

- Video Upload Pipeline:
  - Each upload task is pushed into the queue
  - Maximum of 3 retry attempts per task
  - If all retries fail, the user is notified via a notification system (also handled asynchronously through queue)

- Database Operations:
  - Video metadata writes and updates are processed through the queue
  - Ensures controlled execution and avoids race conditions under concurrent uploads

- Notification Handling:
  - Failure/success events trigger queued notification jobs
  - Decouples user feedback from core processing logic

Key characteristics:
- Non-blocking request handling
- Controlled retry mechanism for fault tolerance
- Sequential task execution to maintain consistency
- Lightweight design without external queue dependency

This approach improves API responsiveness while maintaining reliability during high-frequency upload operations.
`
},
    {
      title: "Frontend Design",
      content: `
- React + Redux architecture
- Component-based modular design
- Infinite scrolling feed
      `
    },
    {
      title: "Nginx Reverse Proxy",
      content: `
- Routes traffic to backend , frontend, grafana services
- Handles load balancing
- Enables HTTPS and compression
- Improves performance and security
      `
    },
    {
      title: "Monitoring (Prometheus + Grafana)",
      content: `
- Prometheus collects metrics from backend (/metrics)
- Grafana visualizes:
  - Request latency
  - Error rates
  - CPU & memory usage
- Enables real-time system observability
      `
    },
    {
      title: "Load Testing (k6 Results) on /api/health",
      content: `
- Tested with ~300 concurrent users
- Avg response time: ~562ms
- p90 < 92ms
- Error rate < 10%
      `
    }
  ]
},
  {
    id: 2,
    slug: "web-ride-booking-service",
    title: "Web Ride Booking Service",
    subtitle: "Ride Booking Platform",
    tech: ["React.js", "Node.js", "MongoDB", "Google Maps API", "Socket.io", "Razorpay"],
    description:
      "Developed a full-stack ride-booking system with real-time driver tracking, ride lifecycle management, and Razorpay payments. event-driven architecture with live ride status, driver location, and chat.",
    year: "2024",
    image: "Uber.jpg",
    url: "https://github.com/010Harsh010/Uber-clone",
    github: "https://github.com/010Harsh010/Uber-clone",
    about:
      "Complete billing, routing, and real-time dispatch engine with geo-fencing and ETA prediction.",
  },
  {
    id: 3,
    slug: "smart-delhi-router",
    title: "Smart Delhi Router",
    subtitle: "AI-Powered Navigation",
    tech: ["LLM", "LangChain", "Tools", "Reinforcement Learning", "GNN"],
    description:
      "Travel-routing assistant combining LLM with GNN + RL for path prediction beyond classical Dijkstra routing.",
    year: "2025",
    status: "Present",
    image: "route.jpg",
    url: "https://colab.research.google.com/drive/1NIfYJTiNBW5A1k41RUNTBWr-zYWoFVTB?usp=sharing",
    github: "https://github.com/010Harsh010/Smart-Delhi-Router",
    about:
      "GNN-based edge weight learning and RL-based adaptive routing for dynamic urban conditions.",
  },
  {
    id: 4,
    slug: "agriguard",
    title: "AgriGuard",
    subtitle: "Agriculture Logistics Management",
    tech: ["Langchain", "langgraph", "FastMCP", "SLM", "Ollama", "Knowledge Graph"],
    description:
      "Building an agriculture logistics management system using knowledge graph reasoning and a fine-tuned small language model (SLM) for decision support.",
    year: "2026",
    status: "Present",
    image: "agrigaurd.jpeg",
    url: "",
    github: "https://github.com/010Harsh010/AgriGuard",
    about:
      "Priority-based dispatch and batch planning for agro products, reducing transit delays and spoilage.",
  },
  {
    id: 5,
    slug: "youtube-transcript-qa",
    title: "YouTube Transcript Q/A",
    subtitle: "RAG-based System",
    tech: ["Python", "LangChain", "HuggingFace", "FAISS"],
    description:
      "Intelligent system for summarizing and answering questions from YouTube video transcripts using vector similarity search.",
    year: "2024",
    image: "youtube.jpg",
    url: "https://colab.research.google.com/drive/124QsmjcgtedExPwU-WYrJ3220ztA8wZU?usp=sharing",
    github: "https://github.com/010Harsh010/YouTube-Transcript-QA",
    about:
      "Retrieval-augmented generation with embedding-based search and prompt-driven QA pipeline.",
  },
  {
    id: 6,
    slug: "verbose-llm",
    title: "Verbose LLM",
    subtitle: "Language Model Implementation",
    tech: ["PyTorch", "GPT-2", "QLoRA"],
    description:
      "Complete GPT-2 architecture implementation from scratch with QLoRA fine-tuning for efficient model adaptation.",
    year: "2024",
    image: "llm.jpg",
    url: "https://colab.research.google.com/drive/1wC0ZVZjpq62pGFEr6lt3Ga_vrkKLOPwB?usp=sharing",
    github: "https://github.com/010Harsh010/Verbose-LLM",
    about:
      "Full transformer stack, dynamic attention chips, and token-level gradient accumulation for memory-efficient training.",
  },
  {
    id: 7,
    slug: "video-chat-app",
    title: "Video Chat App",
    subtitle: "Real-time Communication",
    tech: ["React.js", "WebRTC", "Socket.io", "Redis"],
    description:
      "Peer-to-peer video chat platform with group rooms and Redis-based session management.",
    year: "2024",
    image: "chat.jpg",
    url: "https://chitterchatters.vercel.app/",
    github: "https://github.com/010Harsh010/Video-Chat-App",
    about:
      "Real-time audio/video signaling with fallback TURN integration and room history persistence.",
  },
];

export default projects;
