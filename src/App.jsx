import React, { useEffect, useRef, useState } from 'react';
import { 
  Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, 
  Code, Database, Globe, Cpu, Palette, Server, 
  FileCode, Layers, Box, Zap, Brain, Eye
} from 'lucide-react';


const App = () => {
  const scrollRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const initializeScroll = async () => {
      const container = scrollRef.current;
      if (!container) return;

      // Enhanced GSAP-like animations
      const tl = {
        fromTo: (elements, from, to, options = {}) => {
          const els = typeof elements === 'string' ? document.querySelectorAll(elements) : [elements];
          els.forEach((el, index) => {
            if (!el) return;
            
            const delay = (options.delay || 0) + (index * (options.stagger || 0));
            
            // Set initial state
            Object.assign(el.style, {
              opacity: from.opacity ?? '1',
              transform: `translateY(${from.y || 0}px) translateX(${from.x || 0}px) scale(${from.scale || 1}) rotate(${from.rotation || 0}deg)`,
              transition: `all ${options.duration || 1}s ${options.ease || 'cubic-bezier(0.23, 1, 0.32, 1)'}`
            });
            
            // Animate to final state with delay
            setTimeout(() => {
              Object.assign(el.style, {
                opacity: to.opacity ?? '1',
                transform: `translateY(${to.y || 0}px) translateX(${to.x || 0}px) scale(${to.scale || 1}) rotate(${to.rotation || 0}deg)`
              });
            }, delay * 1000);
          });
        }
      };

      // Hero animations with improved timing
      tl.fromTo('.hero-title span', { opacity: 0, y: 120, rotation: 5 }, { opacity: 1, y: 0, rotation: 0 }, { 
        duration: 1.4, delay: 0.3, stagger: 0.1, ease: 'cubic-bezier(0.23, 1, 0.32, 1)'
      });
      tl.fromTo('.hero-subtitle', { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1 }, { 
        duration: 1.2, delay: 1.2 
      });
      tl.fromTo('.hero-location', { opacity: 0, y: 60 }, { opacity: 1, y: 0 }, { 
        duration: 1, delay: 1.6 
      });
      tl.fromTo('.hero-cta', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }, { 
        duration: 0.8, delay: 2 
      });

      // Enhanced scroll-triggered animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            
            if (element.classList.contains('animate-on-scroll')) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0px) scale(1)';
            }
            
            if (element.classList.contains('stagger-children')) {
              const children = element.querySelectorAll('.stagger-item');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.style.opacity = '1';
                  child.style.transform = 'translateY(0px) scale(1)';
                }, index * 150);
              });
            }
          }
        });
      }, observerOptions);

      // Observe elements
      document.querySelectorAll('.animate-on-scroll, .stagger-children').forEach(el => {
        observer.observe(el);
      });

      // Enhanced scroll effects
      const handleScroll = () => {
        const scrolled = window.scrollY;
        setScrollY(scrolled);

        // Header background with blur
        const header = document.querySelector('.header');
        if (header) {
          const opacity = Math.min(scrolled / 100, 0.95);
          const blur = Math.min(scrolled / 50, 10);
          header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
          header.style.backdropFilter = `blur(${blur}px)`;
        }

        // Progress line animation
        const workSection = document.querySelector('#work');
        const progressLine = document.querySelector('.progress-line');
        const progressIndicator = document.querySelector('.progress-indicator');
        
        if (workSection && progressLine && progressIndicator) {
          const workRect = workSection.getBoundingClientRect();
          const workTop = workRect.top + scrolled;
          const workHeight = workRect.height;
          const windowHeight = window.innerHeight;
          
          // Calculate progress through the work section
          const sectionProgress = Math.max(0, Math.min(1, 
            (scrolled + windowHeight - workTop) / (workHeight + windowHeight)
          ));
          
          // Update progress line height
          progressLine.style.height = `${sectionProgress * 100}%`;
          
          // Update indicator position
          const indicatorPosition = sectionProgress * 100;
          progressIndicator.style.top = `${Math.min(indicatorPosition, 95)}%`;
          
          // Show/hide based on section visibility
          const lineContainer = document.querySelector('.progress-line-container');
          if (lineContainer) {
            if (workRect.bottom > 0 && workRect.top < windowHeight) {
              lineContainer.style.opacity = '1';
            } else {
              lineContainer.style.opacity = '0';
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      setIsLoaded(true);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      };
    };

    initializeScroll();
  }, []);

  const projects = [
    {
      title: "SteamX",
      subtitle: "Video Sharing Platform",
      tech: ["Node.js", "React.js", "MongoDB", "WebRTC", "NLP"],
      description: "Full-stack video streaming platform with OAuth authentication, live streaming capabilities, and hybrid recommendation system using TF-IDF and collaborative filtering.",
      year: "2024",
      image: "/stream.png"
    },
    {
      title: "Smart Delhi Router",
      subtitle: "AI-Powered Navigation",
      tech: ["LLM", "Langchain", "GNN", "Reinforcement Learning"],
      description: "Travel helper powered by Graph Neural Networks and Reinforcement Learning for optimized path prediction with real-time traffic analysis.",
      year: "2025",
      status: "In Development",
      image: "/route.jpeg"
    },
    {
      title: "Uber Clone",
      subtitle: "Ride Booking Platform",
      tech: ["React.js", "Node.js", "Google Maps API", "Socket.io"],
      description: "Real-time ride-booking application with live updates, driver-passenger communication, and integrated payment processing.",
      year: "2024",
      image: "/Uber.avif"
    },
    {
      title: "YouTube Transcript Q/A",
      subtitle: "RAG-based System",
      tech: ["Python", "LangChain", "HuggingFace", "FAISS"],
      description: "Intelligent system for summarizing and answering questions from YouTube video transcripts using vector similarity search.",
      year: "2024",
      image: "/youtube.png"
    },
    {
      title: "Verbose LLM",
      subtitle: "Language Model Implementation",
      tech: ["PyTorch", "GPT-2", "QLoRA"],
      description: "Complete GPT-2 architecture implementation from scratch with QLoRA fine-tuning for efficient model adaptation.",
      year: "2024",
      image: "/llm.png"
    },
    {
      title: "Video Chat App",
      subtitle: "Real-time Communication",
      tech: ["React.js", "WebRTC", "Socket.io", "Redis"],
      description: "Peer-to-peer video chat platform with group rooms and Redis-based session management.",
      year: "2024",
      image: "chat.jpg"
    }
  ];

  const skillIcons = {
    // Languages
    "Python": <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path d="M43.847,24c-0.293-1.912-0.958-3.441-1.539-4.479C41.439,17.966,39.774,17,37.964,17H33v-4.964	c0-1.81-0.966-3.475-2.521-4.344C29.101,6.92,26.857,6,24,6s-5.101,0.92-6.479,1.692C15.966,8.561,15,10.226,15,12.036V17h-4.964	c-1.81,0-3.475,0.966-4.344,2.521C5.111,20.559,4.446,22.088,4.153,24H4v2c0,2.857,0.92,5.101,1.692,6.479	C6.561,34.034,8.226,35,10.036,35H15v4.964c0,1.81,0.966,3.475,2.521,4.344C18.899,45.08,21.143,46,24,46s5.101-0.92,6.479-1.692	C32.034,43.439,33,41.774,33,39.964V35h4.964c1.81,0,3.475-0.966,4.344-2.521C43.08,31.101,44,28.857,44,26v-2H43.847z"></path><path fill="#fff" d="M41.436,18.009C40.735,16.757,39.399,16,37.964,16H36h-3h-1v-4v-1.964	c0-1.434-0.757-2.771-2.009-3.471C28.614,5.793,26.571,5,24,5s-4.614,0.793-5.991,1.564C16.757,7.265,16,8.601,16,10.036V12v3v1h-3	h-2.964c-1.435,0-2.771,0.757-3.471,2.009C5.794,19.386,5,21.429,5,24s0.794,4.614,1.564,5.991C7.265,31.243,8.601,32,10.036,32H13	h2h1v4v1.964c0,1.434,0.757,2.771,2.009,3.471C19.386,42.206,21.429,43,24,43s4.614-0.794,5.991-1.564	C31.243,40.735,32,39.399,32,37.964V36v-3v-1h4h1.964c1.435,0,2.771-0.757,3.471-2.009C42.206,28.614,43,26.571,43,24	S42.206,19.386,41.436,18.009z"></path><circle cx="20.5" cy="10.5" r="1.5"></circle><circle cx="27.5" cy="37.5" r="1.5"></circle><path d="M15,33h-4.964c-1.81,0-3.475-0.966-4.344-2.521C4.92,29.101,4,26.857,4,24s0.92-5.101,1.692-6.479	C6.561,15.966,8.226,15,10.036,15H23c0.552,0,1,0.448,1,1s-0.448,1-1,1H10.036c-1.086,0-2.082,0.574-2.599,1.497	C6.781,19.668,6,21.574,6,24s0.781,4.332,1.437,5.503C7.954,30.426,8.949,31,10.036,31H15c0.552,0,1,0.448,1,1S15.552,33,15,33z"></path><path d="M37.964,33H25c-0.552,0-1-0.448-1-1s0.448-1,1-1h12.964c1.086,0,2.082-0.574,2.599-1.497C41.219,28.332,42,26.426,42,24	s-0.781-4.332-1.437-5.503C40.046,17.574,39.051,17,37.964,17H33c-0.552,0-1-0.448-1-1s0.448-1,1-1h4.964	c1.81,0,3.475,0.966,4.344,2.521C43.08,18.899,44,21.143,44,24s-0.92,5.101-1.692,6.479C41.439,32.034,39.774,33,37.964,33z"></path><path d="M24,44c-2.857,0-5.101-0.92-6.479-1.692C15.966,41.439,15,39.774,15,37.964V29c0-3.309,2.691-6,6-6h6c2.206,0,4-1.794,4-4	v-8.964c0-1.086-0.574-2.082-1.497-2.599C28.332,6.781,26.426,6,24,6s-4.332,0.781-5.503,1.437C17.574,7.954,17,8.949,17,10.036V15	c0,0.552-0.448,1-1,1s-1-0.448-1-1v-4.964c0-1.81,0.966-3.475,2.521-4.344C18.899,4.92,21.143,4,24,4s5.101,0.92,6.479,1.692	C32.034,6.561,33,8.226,33,10.036V19c0,3.309-2.691,6-6,6h-6c-2.206,0-4,1.794-4,4v8.964c0,1.086,0.574,2.082,1.497,2.599	C19.668,41.219,21.574,42,24,42s4.332-0.781,5.503-1.437C30.426,40.046,31,39.051,31,37.964V33c0-0.552,0.448-1,1-1s1,0.448,1,1	v4.964c0,1.81-0.966,3.475-2.521,4.344C29.101,43.08,26.857,44,24,44z"></path>
</svg>
,
    "JavaScript": <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path d="M 6.667969 4 C 5.207031 4 4 5.207031 4 6.667969 L 4 43.332031 C 4 44.792969 5.207031 46 6.667969 46 L 43.332031 46 C 44.792969 46 46 44.796875 46 43.332031 L 46 6.667969 C 46 5.207031 44.796875 4 43.332031 4 Z M 6.667969 6 L 43.332031 6 C 43.703125 6 44 6.296875 44 6.667969 L 44 43.332031 C 44 43.703125 43.703125 44 43.332031 44 L 6.667969 44 C 6.296875 44 6 43.703125 6 43.332031 L 6 6.667969 C 6 6.296875 6.296875 6 6.667969 6 Z M 23 23 L 23 35.574219 C 23 37.503906 22.269531 38 21 38 C 19.671875 38 18.75 37.171875 18.140625 36.097656 L 15 38 C 15.910156 39.925781 18.140625 42 21.234375 42 C 24.65625 42 27 40.179688 27 36.183594 L 27 23 Z M 35.453125 23 C 32.046875 23 29.863281 25.179688 29.863281 28.042969 C 29.863281 31.148438 31.695313 32.617188 34.449219 33.789063 L 35.402344 34.199219 C 37.140625 34.960938 38 35.425781 38 36.734375 C 38 37.824219 37.171875 38.613281 35.589844 38.613281 C 33.707031 38.613281 32.816406 37.335938 32 36 L 29 38 C 30.121094 40.214844 32.132813 42 35.675781 42 C 39.300781 42 42 40.117188 42 36.683594 C 42 33.496094 40.171875 32.078125 36.925781 30.6875 L 35.972656 30.28125 C 34.335938 29.570313 33.625 29.109375 33.625 27.964844 C 33.625 27.039063 34.335938 26.328125 35.453125 26.328125 C 36.550781 26.328125 37.253906 26.792969 37.90625 27.964844 L 40.878906 26.058594 C 39.625 23.84375 37.878906 23 35.453125 23 Z"></path>
</svg>
,
    "TypeScript": <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path d="M 5 4 A 1.0001 1.0001 0 0 0 4 5 L 4 45 A 1.0001 1.0001 0 0 0 5 46 L 45 46 A 1.0001 1.0001 0 0 0 46 45 L 46 5 A 1.0001 1.0001 0 0 0 45 4 L 5 4 z M 6 6 L 44 6 L 44 44 L 6 44 L 6 6 z M 15 23 L 15 26.445312 L 20 26.445312 L 20 42 L 24 42 L 24 26.445312 L 29 26.445312 L 29 23 L 15 23 z M 36.691406 23.009766 C 33.576782 22.997369 30.017578 23.941219 30.017578 28.324219 C 30.017578 34.054219 37.738281 34.055625 37.738281 36.640625 C 37.738281 36.885625 37.842187 38.666016 35.117188 38.666016 C 32.392187 38.666016 30.121094 36.953125 30.121094 36.953125 L 30.121094 41.111328 C 30.121094 41.111328 42.001953 44.954062 42.001953 36.289062 C 42.000953 30.664063 34.208984 30.945391 34.208984 28.150391 C 34.208984 27.067391 34.978375 26.054687 37.109375 26.054688 C 39.240375 26.054688 41.126953 27.3125 41.126953 27.3125 L 41.267578 23.607422 C 41.267578 23.607422 39.113892 23.019408 36.691406 23.009766 z"></path>
</svg>
,
    "Java": <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
    <path d="M 17.662109 -0.015625 C 19.190109 3.063375 12.191016 4.9633437 11.541016 7.5273438 C 10.946016 9.8833438 15.696172 12.621094 15.701172 12.621094 C 14.979172 11.647094 14.457422 10.842219 13.732422 9.3242188 C 12.506422 6.7572187 20.966109 4.108375 17.662109 -0.015625 z M 22.722656 4.1972656 C 22.722656 4.1972656 17.386281 4.5194844 17.113281 7.7714844 C 16.992281 9.2194844 18.515594 9.992875 18.558594 11.046875 C 18.595594 11.907875 17.648438 12.623047 17.648438 12.623047 C 17.648438 12.623047 19.211047 12.383312 19.748047 11.070312 C 20.342047 9.6143125 18.747781 8.5517656 18.925781 7.3847656 C 19.095781 6.2687656 22.722656 4.1972656 22.722656 4.1972656 z M 12.761719 12.623047 C 12.761719 12.623047 7.2773438 12.550172 7.2773438 14.076172 C 7.2763438 15.671172 14.457938 15.782734 19.585938 14.802734 C 19.585938 14.802734 20.749281 14.165266 21.113281 13.822266 C 17.753281 14.495266 10.287109 14.300797 10.287109 13.716797 C 10.287109 13.178797 12.761719 12.623047 12.761719 12.623047 z M 23.681641 12.664062 C 23.07915 12.638797 22.419687 12.830578 21.851562 13.236328 C 23.038563 12.979328 24.039063 13.709734 24.039062 14.552734 C 24.039062 16.446734 21.318359 18.240234 21.318359 18.240234 C 21.318359 18.240234 25.53125 17.755625 25.53125 14.640625 C 25.53125 13.354375 24.685791 12.706172 23.681641 12.664062 z M 10.816406 15.431641 C 9.9584062 15.430641 8.6816406 16.111625 8.6816406 16.765625 C 8.6816406 18.081625 15.136062 19.095828 19.914062 17.173828 L 18.259766 16.132812 C 15.020766 17.195812 9.0484062 16.854641 10.816406 15.431641 z M 12.029297 18.238281 C 10.850297 18.238281 10.085938 19.031328 10.085938 19.611328 C 10.085938 21.407328 17.124062 21.468578 19.914062 19.642578 L 18.140625 18.537109 C 16.058625 19.492109 10.824297 19.622281 12.029297 18.238281 z M 6.9199219 20.990234 C 5.2392793 20.937557 4.46875 21.796297 4.46875 22.498047 C 4.46875 26.228047 22.722656 26.049328 22.722656 22.236328 C 22.722656 21.603328 22.017719 21.302203 21.761719 21.158203 C 23.251719 24.803203 6.6503906 24.553344 6.6503906 22.402344 C 6.6503906 21.912344 7.5294375 21.412625 8.6484375 21.640625 C 8.6484375 21.640625 8.2382656 21.164312 7.6972656 21.070312 C 7.4196406 21.022437 7.1600137 20.99776 6.9199219 20.990234 z M 25.53125 23.794922 C 22.63425 26.630922 14.659344 28.352563 7.2773438 26.601562 C 14.694344 29.607563 25.49625 27.275922 25.53125 23.794922 z"></path>
</svg>

,
    "C": <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 128 128"
  fill="none"
  stroke="gray"
  strokeWidth="6"
>
  <polygon points="64,4 8,32 8,96 64,124 120,96 120,32 64,4" fill="none" />
  <path
    d="M84 48a28 28 0 1 0 0 32"
    fill="none"
  />
</svg>
,
    "R": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128" fill="none" stroke="gray" strokeWidth="4">
  <ellipse cx="64" cy="64" rx="56" ry="36" />
  <path d="M32 80V48h28a12 12 0 0 1 0 24H32l36 24" />
</svg>
,
    
    // AI & ML
    "TensorFlow":<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="24" height="24" fill="none" stroke="gray" stroke-width="8">
  <path d="M20 60 L100 20 L180 60" stroke-linejoin="round" />
  <path d="M100 20 L100 180" stroke-linecap="round" />
  <path d="M100 100 L140 80" stroke-linecap="round" />
  <path d="M140 80 L140 130" stroke-linecap="round" />
</svg>
,
    "PyTorch": <img
  src="/pytorch.svg"
  alt="PyTorch"
  width="24"
  height="24"
/>

,
    "Scikit-learn": <Brain className="w-5 h-5" />,
    "OpenCV": <Eye className="w-5 h-5" />,
    "YOLO": <Eye className="w-5 h-5" />,
    "NLP": <Brain className="w-5 h-5" />,
    "LangChain": <Layers className="w-5 h-5" />,
    
    // Frontend
    "React": <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path d="M 34.554688 3.984375 C 33.775003 3.9581582 32.958884 4.0940926 32.140625 4.359375 C 30.504109 4.889941 28.789203 5.9238848 27.029297 7.3554688 C 26.339589 7.9165071 25.643623 8.5578288 24.945312 9.2382812 C 24.262398 8.5751039 23.580733 7.9490442 22.90625 7.4003906 C 21.147758 5.9699557 19.4375 4.9375672 17.804688 4.4082031 C 16.171878 3.8788386 14.547223 3.8624356 13.212891 4.6328125 C 11.878558 5.4031893 11.080619 6.8173558 10.722656 8.4960938 C 10.364693 10.174832 10.402173 12.173992 10.761719 14.412109 C 10.886606 15.189511 11.066671 16.005078 11.269531 16.835938 C 10.507095 17.067004 9.7666767 17.309955 9.0800781 17.578125 C 7.0079817 18.387438 5.2934468 19.355663 4.0449219 20.507812 C 2.7963969 21.659962 1.9902344 23.058304 1.9902344 24.59375 C 1.9902344 26.129196 2.7963969 27.525585 4.0449219 28.677734 C 5.2934468 29.829884 7.0079817 30.800062 9.0800781 31.609375 C 9.8142516 31.896126 10.609118 32.154326 11.429688 32.398438 C 11.134531 33.501278 10.895394 34.571467 10.732422 35.585938 C 10.372587 37.825853 10.334588 39.825265 10.693359 41.507812 C 11.052134 43.19036 11.850478 44.612534 13.191406 45.386719 C 14.532336 46.160905 16.164264 46.141894 17.800781 45.611328 C 19.437297 45.080762 21.15025 44.048772 22.910156 42.617188 C 23.593512 42.061316 24.284757 41.427206 24.976562 40.753906 C 25.671663 41.430886 26.366333 42.068604 27.052734 42.626953 C 28.811227 44.057387 30.523438 45.089776 32.15625 45.619141 C 33.789061 46.148505 35.411762 46.164908 36.746094 45.394531 C 38.080426 44.624154 38.878366 43.209988 39.236328 41.53125 C 39.59429 39.852512 39.554857 37.85335 39.195312 35.615234 C 39.031899 34.598012 38.792614 33.526227 38.496094 32.419922 C 39.343769 32.169866 40.163744 31.904721 40.919922 31.609375 C 42.992018 30.800062 44.706553 29.829884 45.955078 28.677734 C 47.203603 27.525585 48.009766 26.129196 48.009766 24.59375 C 48.009766 23.058304 47.203603 21.659963 45.955078 20.507812 C 44.706553 19.355663 42.992018 18.387438 40.919922 17.578125 C 40.22347 17.306107 39.471688 17.059992 38.697266 16.826172 C 38.901775 15.990221 39.083345 15.168805 39.208984 14.386719 C 39.568819 12.146804 39.606825 10.145439 39.248047 8.4628906 C 38.889279 6.7803434 38.088976 5.3601244 36.748047 4.5859375 C 36.077582 4.1988452 35.334372 4.0105918 34.554688 3.984375 z M 34.462891 6.0195312 C 34.952154 6.03291 35.369535 6.1493386 35.726562 6.3554688 C 36.440618 6.7677287 36.968419 7.5700924 37.25 8.890625 C 37.531581 10.211156 37.521848 11.99533 37.189453 14.064453 C 37.075647 14.772878 36.910402 15.52369 36.722656 16.292969 C 34.677708 15.800829 32.436969 15.435424 30.048828 15.220703 C 28.849094 13.558465 27.615953 12.046374 26.373047 10.703125 C 27.030182 10.061662 27.683063 9.4617259 28.320312 8.9433594 C 29.946026 7.6209332 31.485126 6.7210962 32.769531 6.3046875 C 33.411734 6.0964824 33.973627 6.0061525 34.462891 6.0195312 z M 15.486328 6.0253906 C 15.978419 6.0116533 16.541491 6.1017415 17.185547 6.3105469 C 18.473657 6.7281576 20.015451 7.6275969 21.642578 8.9511719 C 22.266889 9.4590141 22.905452 10.045872 23.548828 10.671875 C 22.296955 12.025781 21.055175 13.553705 19.847656 15.230469 C 17.468002 15.449155 15.235261 15.818024 13.199219 16.3125 C 13.012686 15.546898 12.84964 14.799095 12.736328 14.09375 C 12.403642 12.02283 12.39534 10.236451 12.677734 8.9121094 C 12.960128 7.5877677 13.492238 6.7813032 14.212891 6.3652344 C 14.573216 6.1572002 14.994237 6.0391279 15.486328 6.0253906 z M 24.976562 12.142578 C 25.791064 13.028975 26.606064 13.9993 27.414062 15.042969 C 26.620033 15.009861 25.816288 14.990234 25 14.990234 C 24.167457 14.990234 23.34841 15.010498 22.539062 15.044922 C 23.347352 14.000306 24.16175 13.029737 24.976562 12.142578 z M 25 17.009766 C 26.359894 17.009766 27.685348 17.065647 28.974609 17.160156 C 29.86173 18.434311 30.728648 19.786055 31.554688 21.216797 C 32.280504 22.473948 32.937328 23.729163 33.535156 24.96875 C 32.931017 26.224782 32.263184 27.496972 31.527344 28.771484 C 30.879609 29.893393 30.20319 30.958949 29.515625 31.986328 C 28.059313 32.10805 26.550303 32.175781 25 32.175781 C 23.412375 32.175781 21.869462 32.104031 20.380859 31.976562 C 19.704742 30.963955 19.039735 29.912587 18.402344 28.808594 C 17.668186 27.536996 17.003577 26.269079 16.400391 25.015625 C 17.006106 23.755092 17.673701 22.47818 18.412109 21.199219 C 19.233818 19.775977 20.098207 18.432055 20.980469 17.164062 C 22.283609 17.067424 23.62445 17.009766 25 17.009766 z M 31.550781 17.410156 C 33.198531 17.615819 34.745652 17.90154 36.185547 18.244141 C 35.758129 19.645287 35.231654 21.108808 34.59375 22.619141 C 34.179567 21.820719 33.750599 21.019585 33.287109 20.216797 C 32.725727 19.244455 32.142026 18.315962 31.550781 17.410156 z M 18.34375 17.425781 C 17.764654 18.315097 17.194836 19.224578 16.644531 20.177734 C 16.175094 20.990823 15.737221 21.802736 15.318359 22.611328 C 14.68596 21.110075 14.162654 19.654877 13.738281 18.261719 C 15.168002 17.918363 16.706766 17.633813 18.34375 17.425781 z M 38.164062 18.775391 C 38.872944 18.989877 39.557566 19.21371 40.185547 19.458984 C 42.0957 20.205046 43.60665 21.088493 44.585938 21.992188 C 45.565224 22.895882 45.990234 23.757696 45.990234 24.59375 C 45.990234 25.429804 45.565225 26.291619 44.585938 27.195312 C 43.60665 28.099007 42.0957 28.982454 40.185547 29.728516 C 39.487698 30.001079 38.72096 30.248243 37.923828 30.482422 C 37.355199 28.723643 36.629408 26.888772 35.765625 25.015625 C 36.758785 22.865083 37.561088 20.768289 38.164062 18.775391 z M 11.802734 18.785156 C 12.398795 20.758095 13.190852 22.834207 14.169922 24.962891 C 13.30047 26.846955 12.571087 28.692254 12 30.460938 C 11.23096 30.232919 10.490212 29.992451 9.8144531 29.728516 C 7.9042995 28.982454 6.39335 28.099007 5.4140625 27.195312 C 4.434775 26.291618 4.0097656 25.429804 4.0097656 24.59375 C 4.0097656 23.757696 4.434775 22.895882 5.4140625 21.992188 C 6.39335 21.088493 7.9042995 20.205046 9.8144531 19.458984 C 10.432774 19.217483 11.105915 18.996837 11.802734 18.785156 z M 25 20 C 22.250421 20 20 22.250421 20 25 C 20 27.749579 22.250421 30 25 30 C 27.749579 30 30 27.749579 30 25 C 30 22.250421 27.749579 20 25 20 z M 25 22 C 26.668699 22 28 23.331301 28 25 C 28 26.668699 26.668699 28 25 28 C 23.331301 28 22 26.668699 22 25 C 22 23.331301 23.331301 22 25 22 z M 34.619141 27.363281 C 35.143596 28.604493 35.599462 29.819048 35.982422 30.990234 C 34.779808 31.269089 33.499292 31.504052 32.152344 31.689453 C 32.540071 31.070779 32.922982 30.44057 33.296875 29.792969 C 33.765554 28.981192 34.200846 28.17048 34.619141 27.363281 z M 15.341797 27.365234 C 15.762305 28.177437 16.200272 28.991753 16.671875 29.808594 C 17.041066 30.448052 17.418053 31.072363 17.800781 31.683594 C 16.457817 31.497372 15.181231 31.261605 13.982422 30.982422 C 14.363652 29.81481 14.819744 28.602796 15.341797 27.365234 z M 13.40625 32.923828 C 15.216074 33.352568 17.177716 33.681912 19.257812 33.896484 C 20.646655 35.905245 22.092677 37.70929 23.548828 39.287109 C 22.897813 39.921859 22.252566 40.517583 21.621094 41.03125 C 19.99538 42.353677 18.454326 43.251559 17.169922 43.667969 C 15.885516 44.084378 14.926946 44.029446 14.212891 43.617188 C 13.498835 43.204927 12.972987 42.402563 12.691406 41.082031 C 12.409825 39.761499 12.417606 37.979279 12.75 35.910156 C 12.900793 34.971492 13.12615 33.966374 13.40625 32.923828 z M 36.560547 32.931641 C 36.842786 33.979991 37.069087 34.989811 37.220703 35.933594 C 37.553389 38.004513 37.56169 39.788939 37.279297 41.113281 C 36.996903 42.437623 36.466746 43.24604 35.746094 43.662109 C 35.025442 44.078178 34.059594 44.13441 32.771484 43.716797 C 31.483374 43.299186 29.941578 42.397794 28.314453 41.074219 C 27.678439 40.556858 27.028726 39.958258 26.373047 39.318359 C 27.838664 37.73459 29.295467 35.920758 30.693359 33.900391 C 32.778701 33.687251 34.745791 33.359875 36.560547 32.931641 z M 21.867188 34.101562 C 22.893951 34.157518 23.934244 34.195312 25 34.195312 C 26.030504 34.195312 27.037063 34.159787 28.03125 34.107422 C 27.014961 35.478593 25.979034 36.725149 24.947266 37.847656 C 23.916125 36.722751 22.882145 35.473968 21.867188 34.101562 z"></path>
</svg>,
    "Three.js": <Box className="w-5 h-5" />,
    "Tailwind CSS": <Palette className="w-5 h-5" />,
    "GSAP": <Zap className="w-5 h-5" />,
    "Motion": <Zap className="w-5 h-5" />,
    
    // Backend
    "Node.js": <Server className="w-5 h-5" />,
    "Express.js": <Server className="w-5 h-5" />,
    "REST APIs": <Globe className="w-5 h-5" />,
    "GraphQL": <Globe className="w-5 h-5" />,
    "Socket.io": <Zap className="w-5 h-5" />,
    
    // Databases
    "MongoDB": <Database className="w-5 h-5" />,
    "MySQL": <Database className="w-5 h-5" />,
    "Redis": <Database className="w-5 h-5" />,
    "ChromaDB": <Database className="w-5 h-5" />,
    "FAISS": <Database className="w-5 h-5" />,
    
    // Tools
    "Docker": <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path d="M 20 9 L 20 14 L 10 14 L 10 19 L 5 19 L 5 24 L 1.125 24 C 0.648438 24.007813 0.246094 24.347656 0.15625 24.8125 C 0.15625 24.8125 0 25.667969 0 26.75 C 0 27.4375 0.0703125 28.183594 0.1875 28.9375 C 0.128906 28.953125 0.0507813 28.988281 0 29 L 0.1875 29 C 0.476563 30.808594 1.140625 32.734375 2.25 34.5625 C 2.253906 34.570313 2.246094 34.585938 2.25 34.59375 C 2.257813 34.613281 2.269531 34.636719 2.28125 34.65625 C 2.332031 34.894531 2.464844 35.105469 2.65625 35.25 C 2.675781 35.261719 2.699219 35.273438 2.71875 35.28125 C 3.027344 35.726563 3.351563 36.171875 3.71875 36.59375 C 6.394531 39.679688 10.738281 42 17 42 C 27.222656 42 35.867188 37.644531 40.75 29 L 49.84375 29 C 48.757813 28.726563 46.425781 28.359375 46.8125 26.9375 C 45.519531 28.433594 43.058594 28.621094 41.15625 28.28125 C 41.519531 27.59375 41.871094 26.894531 42.1875 26.15625 C 45.078125 26.082031 47.152344 25.152344 48.3125 24.03125 C 49.582031 22.804688 49.96875 21.4375 49.96875 21.4375 C 50.066406 21.054688 49.933594 20.652344 49.625 20.40625 C 49.625 20.40625 47.097656 18.5625 43.3125 19.1875 C 42.234375 15.652344 39.4375 13.9375 39.4375 13.9375 C 39.230469 13.816406 38.988281 13.769531 38.75 13.8125 C 38.589844 13.847656 38.4375 13.921875 38.3125 14.03125 C 38.3125 14.03125 37.644531 14.601563 37.09375 15.625 C 36.542969 16.648438 36.035156 18.207031 36.21875 20.21875 C 36.304688 21.160156 36.601563 22.054688 37.03125 22.90625 C 36.789063 23.054688 36.648438 23.179688 36.25 23.34375 C 35.421875 23.6875 34.214844 24 32.5 24 L 32 24 L 32 19 L 27 19 L 27 9 Z M 22 11 L 25 11 L 25 14 L 22 14 Z M 12 16 L 15 16 L 15 19 L 12 19 Z M 17 16 L 20 16 L 20 19 L 17 19 Z M 22 16 L 25 16 L 25 19 L 22 19 Z M 39.09375 16.21875 C 39.835938 16.769531 41.179688 17.921875 41.65625 20.4375 C 41.707031 20.714844 41.871094 20.953125 42.109375 21.101563 C 42.347656 21.25 42.636719 21.292969 42.90625 21.21875 C 45.457031 20.519531 46.835938 21.09375 47.59375 21.53125 C 47.449219 21.847656 47.472656 22.042969 46.90625 22.59375 C 45.996094 23.472656 44.453125 24.359375 41.5625 24.25 C 41.140625 24.234375 40.753906 24.484375 40.59375 24.875 C 40.195313 25.871094 39.734375 26.792969 39.25 27.6875 C 39.101563 27.601563 38.976563 27.5 38.875 27.40625 C 37.535156 29.347656 29.761719 28.605469 29.21875 27.09375 C 27.542969 29.0625 22.335938 29.0625 20.65625 27.09375 C 20.113281 28.605469 12.308594 29.347656 10.96875 27.40625 C 9.769531 28.53125 5.035156 29.222656 3.0625 26.9375 C 3.25 27.625 2.765625 28.070313 2.125 28.375 C 2.042969 27.804688 2 27.261719 2 26.75 C 2 26.320313 2.03125 26.28125 2.0625 26 L 32.5 26 C 34.46875 26 35.945313 25.625 37 25.1875 C 38.054688 24.75 38.804688 24.21875 38.90625 24.15625 C 39.148438 24.003906 39.3125 23.757813 39.359375 23.476563 C 39.40625 23.199219 39.332031 22.910156 39.15625 22.6875 C 38.601563 21.964844 38.3125 21.058594 38.21875 20.03125 C 38.074219 18.417969 38.453125 17.289063 38.84375 16.5625 C 38.976563 16.316406 38.984375 16.367188 39.09375 16.21875 Z M 7 21 L 10 21 L 10 24 L 7 24 Z M 12 21 L 15 21 L 15 24 L 12 24 Z M 17 21 L 20 21 L 20 24 L 17 24 Z M 22 21 L 25 21 L 25 24 L 22 24 Z M 27 21 L 30 21 L 30 24 L 27 24 Z M 2.25 29 L 38.5 29 C 33.910156 36.414063 26.289063 40 17 40 C 11.53125 40 7.984375 38.144531 5.65625 35.6875 C 10.09375 35.898438 13.53125 34.71875 13.53125 34.71875 C 14.082031 34.648438 14.476563 34.144531 14.40625 33.59375 C 14.335938 33.042969 13.832031 32.648438 13.28125 32.71875 C 13.226563 32.726563 13.175781 32.734375 13.125 32.75 C 13.039063 32.761719 12.957031 32.78125 12.875 32.8125 C 12.875 32.8125 8.785156 34.207031 4 33.53125 C 3.101563 32.050781 2.535156 30.464844 2.25 29 Z M 16 31 C 15.449219 31 15 31.449219 15 32 C 15 32.550781 15.449219 33 16 33 C 16.550781 33 17 32.550781 17 32 C 17 31.863281 16.988281 31.742188 16.9375 31.625 C 16.867188 31.75 16.714844 31.84375 16.5625 31.84375 C 16.335938 31.84375 16.15625 31.632813 16.15625 31.40625 C 16.15625 31.253906 16.253906 31.132813 16.375 31.0625 C 16.261719 31.019531 16.128906 31 16 31 Z"></path>
</svg>,
    "Git": <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 30 30">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
</svg>,
    "OAuth 2.0": <Cpu className="w-5 h-5" />,
    "WebRTC": <Globe className="w-5 h-5" />,
    "Google Maps API": <MapPin className="w-5 h-5" />,
    "Data Structures": (
    <img
      src="https://img.icons8.com/?size=100&id=GUgQECp3ctUG&format=png&color=000000"
      alt="Data Structures"
      className="w-5 h-5"
    />
  ),
  "Algorithms": (
    <img
      src="https://img.icons8.com/?size=100&id=DXatJyAWPoyE&format=png&color=000000"
      alt="Algorithms"
      className="w-5 h-5"
    />
  ),
  "System Design": (
    <img
      src="https://img.icons8.com/?size=100&id=85953&format=png&color=000000"
      alt="System Design"
      className="w-5 h-5"
    />
  ),
  "Cloud Services (AWS, GCP)": (
    <img
      src="https://img.icons8.com/ios/50/gray/cloud.png"
      alt="Cloud Services"
      className="w-5 h-5"
    />
  ),
  "Reinforcement Learning": (
    <img
      src="https://img.icons8.com/ios/50/gray/artificial-intelligence.png"
      alt="Reinforcement Learning"
      className="w-5 h-5"
    />
  ),
  "Blender": (
    <img
      src="https://img.icons8.com/?size=100&id=lnLOWjnx7wZH&format=png&color=000000"
      alt="Blender"
      className="w-5 h-5"
    />),
    "GNN":(
    <img
      src="https://img.icons8.com/?size=100&id=eEcVfg97Tj3J&format=png&color=000000"
      alt="GNN"
      className="w-5 h-5"
    />
    ),
    "OOPs":(
      <img src="https://img.icons8.com/?size=100&id=_pdyeJRmgjVF&format=png&color=000000" alt="OOPS"
      className="w-5 h-5" />
    ),
    "Computer Networks": (
      <img src="https://img.icons8.com/?size=100&id=3vPtpomlM6YA&format=png&color=000000" alt="Computer Networks" className="w-5 h-5"/>
    ),
    "DBMS": (
      <img src="https://img.icons8.com/?size=100&id=B0vuqxJA1C0b&format=png&color=000000" alt="DBMS" className='w-5 h-5' />
    ),
    "Data Analytics": (
      <img src="https://img.icons8.com/?size=100&id=rWi0LaiOnwiH&format=png&color=000000" alt="Data Analytics" className='w-5 h-5' />
    ),
  };

  const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "Java", "C", "R"] },
  { category: "AI & Machine Learning", items: [
    "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "YOLO", "NLP", "LangChain"
  ]},
  { category: "Frontend", items: [
    "React", "Three.js", "Tailwind CSS", "GSAP", "Framer Motion", "HTML", "CSS",
  ]},
  { category: "Backend", items: [
    "Node.js", "Express.js", "REST APIs", "GraphQL", "Socket.io", "Flask", "JWT", "MongoDB Atlas"
  ]},
  { category: "Databases", items: [
    "MongoDB", "MySQL", "Redis", "ChromaDB", "FAISS",
  ]},
  { category: "Tools & Services", items: [
    "Docker", "Git", "OAuth 2.0", "WebRTC", "Hugging Face", "Google Maps API", "Vite", "Postman"
  ]},
  { category: "Core Knowledge", items: [
    "Data Structures", "Algorithms", "OOPs", "Computer Networks", "DBMS", "Data Analytics",
  ]},
  { category: "Working On", items: [
    "GNN", "Reinforcement Learning", "System Design", "Cloud Services (AWS, GCP)", "Quantization in ML/DL", "Blender"
  ]}
];


  const titleWords = ["AI", "Engineer", "&", "Full-Stack", "Developer"];

  return (
    <div ref={scrollRef} className="bg-white text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="header fixed top-0 w-full z-50 border-b border-gray-100 transition-all duration-500">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-xl font-light tracking-wide">
              <a href="" className="hover:text-gray-600 transition-colors duration-300">Harsh Singh</a>
            </div>
            <div className="hidden md:flex space-x-12 text-sm">
              <a href="#work" className="hover:text-gray-600 transition-colors duration-300 relative group">
                Work
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="hover:text-gray-600 transition-colors duration-300 relative group">
                About
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="hover:text-gray-600 transition-colors duration-300 relative group">
                Contact
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8 relative">
        <div className="max-w-4xl text-center relative z-10">
          <h1 className="hero-title text-5xl md:text-7xl font-light leading-tight mb-8 tracking-tight">
            {titleWords.map((word, index) => (
              <span key={word} className="inline-block opacity-0 mr-4" style={{transitionDelay: `${index * 100}ms`}}>
                {word}
                {index === 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light opacity-0">
            Crafting intelligent solutions at the intersection of artificial intelligence 
            and modern web technologies.
          </p>
          <div className="hero-location mt-12 flex items-center justify-center space-x-6 text-gray-500 opacity-0">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <a target="_blank" rel="noopener noreferrer" href='https://www.google.com/maps?sca_esv=c2df872898b90107&biw=1536&bih=776&output=search&q=bhiwadi&source=lnms&fbs=AIIjpHxCtmkhHKu27CW9pNYJlh4RoZZ_y8scaivnpjp3a9aEstvyzM9WArA0Q4B52rAVe2Sa6zFfiAm8cYa8nfYhOqjaGPs97G_EEy9Tt64nlu2xgJyH7djRPh1Zp4ZyU7slLZJkkl8osrh_3de-FunqNJbi4EoV5I2Eqn4_4eq239ycLLY4F9tiWRzrPEXFMal72TFfbTKm5Y5M7xLma77fv-6n-dHK1rbLNNK3mmEDDwXMVu01E-g&entry=mc&ved=1t:200715&ictx=111'>Alwar, Rajasthan</a>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 7240324397</span>
            </div>
          </div>
        </div>
      </section>

      
      {/* About Section */}
      <section id="about" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-4 animate-on-scroll opacity-0 transform translate-y-12 transition-all duration-1000 ease-out">
              <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">
                About
              </h2>
            </div>
            
            <div className="md:col-span-8 animate-on-scroll opacity-0 transform translate-y-16 transition-all duration-1000 ease-out delay-200">
              <div className="prose prose-lg max-w-none">
                <p className="text-2xl leading-relaxed font-light text-gray-700 mb-12">
                  Currently pursuing B.Tech in Artificial Intelligence and Data Science at 
                  Indian Institute of Information Technology Sricity, with a focus on creating 
                  innovative solutions that bridge theoretical AI concepts with practical applications.
                </p>
                
                <div className="grid md:grid-cols-2 gap-16 mt-20">
                  <div>
                    <h3 className="text-xl font-light mb-8 text-gray-900">Education</h3>
                    <div className="space-y-3">
                      <div className="text-gray-700 flex text-lg"><img className='w-[15%] h-[15%] p-1' src='/logo.png'></img>Indian Institute of Information Technology, Sri City, Chittoor</div>
                      <div className="text-gray-600">B.Tech AI & Data Science</div>
                      <div className="text-gray-500">2023-2027 • CGPA 8.05</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-light mb-8 text-gray-900">Recognition</h3>
                    <div className="space-y-3">
                      <div className="text-gray-700 text-lg">300+ DSA Problems Solved</div>
                      <div className="text-gray-600">LeetCode & Codeforces</div>
                      <div className="text-gray-500">Rating: 891</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-8 relative">
        {/* Progress Line */}
        <div className="progress-line-container hidden md:block absolute left-8 top-32 bottom-32 opacity-0 transition-opacity duration-500">
          <div className="relative h-full">
            {/* Background line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200"></div>
            
            {/* Progress line */}
            <div className="progress-line absolute left-1/2 transform -translate-x-1/2 w-px bg-gray-400 transition-all duration-300 ease-out" style={{height: '0%'}}></div>
            
            {/* Moving indicator */}
            <div className="progress-indicator absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-600 rounded-full transition-all duration-300 ease-out shadow-sm" style={{top: '0%'}}>
              <div className="absolute inset-0 bg-gray-600 rounded-full animate-ping opacity-20"></div>
            </div>
            
            {/* Project dots */}
            {projects.map((_, index) => (
              <div 
                key={index}
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full transition-colors duration-300"
                style={{top: `${(index + 1) * (100 / (projects.length + 1))}%`}}
              ></div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-24 animate-on-scroll opacity-0 transform translate-y-12 transition-all duration-1000 ease-out">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Selected Work
            </h2>
          </div>
          
          <div className="space-y-32 stagger-children md:ml-16">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className="stagger-item opacity-0 transform translate-y-16 transition-all duration-1000 ease-out group relative"
              >
                {/* Background Image for Mobile */}
                <div className="absolute inset-0 md:hidden rounded-2xl overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-white/80"></div>
                </div>
                
                <div className="grid md:grid-cols-12 gap-8 items-start relative z-10">
                  <div className="md:col-span-3">
                    <div className="text-sm text-gray-500 mb-2">{project.year}</div>
                    {project.status && (
                      <div className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full inline-block mb-4">
                        {project.status}
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-6">
                    <h3 className="text-3xl md:text-4xl font-light mb-3 group-hover:text-gray-600 transition-all duration-500 cursor-pointer">
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 font-light">{project.subtitle}</p>
                    <p className="text-gray-700 leading-relaxed mb-8 font-light text-lg">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={tech}
                          className="text-xs px-4 py-2 bg-gray-100 text-gray-600 rounded-full tracking-wide hover:bg-gray-200 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                          style={{
                            transitionDelay: `${techIndex * 50}ms`
                          }}
                        >
                          {skillIcons[tech]}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 flex justify-end">
                    {/* Desktop Image */}
                    <div className="hidden md:block relative">
                      <div className="w-48 h-32 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-500">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-500">
                        <ArrowUpRight className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-px bg-gray-200 mt-16"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 animate-on-scroll opacity-0 transform translate-y-12 transition-all duration-1000 ease-out">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Technical Expertise
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 stagger-children">
            {skills.map((skillGroup, index) => (
              <div 
                key={skillGroup.category}
                className="stagger-item opacity-0 transform translate-y-12 transition-all duration-1000 ease-out group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-gray-200 h-full">
                  <h3 className="text-xl font-light mb-8 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {skillGroup.category}
                  </h3>
                  <div className="space-y-4">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div 
                        key={skill} 
                        className="flex items-center space-x-3 text-gray-600 font-light text-lg hover:text-gray-900 transition-all duration-300 cursor-pointer group/item"
                        style={{
                          transitionDelay: `${skillIndex * 100}ms`
                        }}
                      >
                        <div className="text-gray-400 group-hover/item:text-gray-600 transition-colors duration-300">
                          {skillIcons[skill] || <Code className="w-5 h-5" />}
                        </div>
                        <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-4 animate-on-scroll opacity-0 transform translate-y-12 transition-all duration-1000 ease-out">
              <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">
                Get in Touch
              </h2>
            </div>
            
            <div className="md:col-span-8 animate-on-scroll opacity-0 transform translate-y-16 transition-all duration-1000 ease-out delay-200">
              <div className="mb-16">
                <p className="text-2xl leading-relaxed font-light text-gray-700">
                  Open to discussing new opportunities, collaborations, and innovative projects 
                  in AI, machine learning, and full-stack development.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 stagger-children">
                <div className="space-y-6 stagger-item opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
                  <a 
                    href="mailto:harshsingh794613@gmail.com"
                    className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 transition-colors duration-300 group text-lg"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="group-hover:underline">harshsingh794613@gmail.com</span>
                  </a>
                  
                  <div className="flex items-center space-x-4 text-gray-600 text-lg">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span>+91 7240324397</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 text-lg">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span>Alwar, Rajasthan</span>
                  </div>
                </div>
                
                <div className="space-y-6 stagger-item opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
                  <a 
                    href="#"
                    className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 transition-colors duration-300 group text-lg"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <span className="group-hover:underline">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="#"
                    className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 transition-colors duration-300 group text-lg"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <Github className="w-5 h-5" />
                    </div>
                    <span className="group-hover:underline">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center text-gray-500">
            <div>© 2025 Harsh Singh</div>
            <div>Alwar, Rajasthan</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;