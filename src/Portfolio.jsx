import React, { useState, useEffect, useRef } from "react";
import {
  Terminal,
  User,
  Code,
  Flag,
  Trophy,
  FolderGit2,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Terminal State
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isBooting, setIsBooting] = useState(true);

  // Refs
  const terminalBodyRef = useRef(null); // Ref untuk container scrollable
  const inputRef = useRef(null);

  // File System Mockup untuk Terminal
  const fileSystem = {
    "about_me.txt": {
      id: "about",
      content:
        "Halo! Saya [Nama Kamu].\nSeorang Cybersecurity Enthusiast & Fullstack Developer.\nFokus pada Web Exploitation dan Secure Coding.",
    },
    "skills.json": {
      id: "skills",
      content:
        '{ "languages": ["JS", "Python"], "tools": ["Burp Suite", "Docker", "Nmap"] }',
    },
    "ctf_writeups.md": {
      id: "ctf",
      content:
        "Latest Writeups:\n- HackTheBox: Machine X (Pwn)\n- PicoCTF: Web Exploitation\n- Crypto Challenge",
    },
    "achievements.log": {
      id: "achievements",
      content:
        "[2023] Juara 1 National CTF\n[2023] Finalist Hackathon Cyber Defense",
    },
    "projects.py": {
      id: "projects",
      content:
        'def list_projects():\n  return ["Secure Chat App", "Vuln Scanner", "Personal Blog"]',
    },
  };

  const bootText = [
    "> Initiating system...",
    "> Loading user profile...",
    "> Mounting file system...",
    "> Access granted.",
    "> Type 'help' to see available commands.",
  ];

  // Efek Booting Terminal
  useEffect(() => {
    let delay = 0;
    bootText.forEach((text, index) => {
      setTimeout(() => {
        setTerminalOutput((prev) => [
          ...prev,
          { type: "system", content: text },
        ]);
        if (index === bootText.length - 1) {
          setIsBooting(false);
        }
      }, delay);
      delay += 800;
    });
  }, []);

  // PERBAIKAN: Auto scroll hanya pada container terminal, bukan window/body
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
    if (!isBooting) {
      inputRef.current?.focus();
    }
  }, [terminalOutput, isBooting]);

  // Handle User Input Terminal
  const handleCommand = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah default behavior browser
      const command = inputVal.trim();
      const parts = command.split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts[1]; // argument (nama file)

      let output = "";
      let type = "success";

      // Tambahkan command user ke history
      const newHistory = [
        ...terminalOutput,
        { type: "user", content: `root@devsec:~$ ${command}` },
      ];

      switch (cmd) {
        case "help":
          output =
            "Available commands:\n  ls            List files (sections)\n  cat <file>    Read file content\n  cd <file>     Navigate to section\n  clear         Clear terminal";
          break;
        case "ls":
          output = Object.keys(fileSystem).join("   ");
          break;
        case "cat":
          if (!arg) {
            output = "Usage: cat <filename>";
            type = "error";
          } else if (fileSystem[arg]) {
            output = fileSystem[arg].content;
          } else {
            output = `cat: ${arg}: No such file or directory`;
            type = "error";
          }
          break;
        case "cd":
          if (!arg) {
            output = "Usage: cd <filename>";
            type = "error";
          } else if (fileSystem[arg]) {
            output = `Navigating to ${arg}...`;
            // Kita panggil scrollToSection di sini
            // Karena scroll terminal sekarang menggunakan 'scrollTop' internal,
            // ini tidak akan konflik dengan window.scrollTo
            setTimeout(() => scrollToSection(fileSystem[arg].id), 100);
          } else {
            output = `cd: ${arg}: No such file or directory`;
            type = "error";
          }
          break;
        case "clear":
          setTerminalOutput([]);
          setInputVal("");
          return; // Langsung return agar tidak menambah history
        case "":
          break; // Enter kosong
        default:
          output = `Command not found: ${cmd}`;
          type = "error";
      }

      if (output) {
        newHistory.push({ type, content: output });
      }

      setTerminalOutput(newHistory);
      setInputVal("");
    }
  };

  // Smooth Scroll Handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsMenuOpen(false);
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "about", label: "About Me", icon: <User size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "ctf", label: "CTF WriteUps", icon: <Flag size={18} /> },
    { id: "achievements", label: "Achievements", icon: <Trophy size={18} /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 size={18} /> },
  ];

  const skills = [
    { name: "JavaScript", level: "Advanced", color: "text-yellow-400" },
    { name: "React / Next.js", level: "Intermediate", color: "text-cyan-400" },
    { name: "Python", level: "Advanced", color: "text-blue-400" },
    { name: "Node.js", level: "Intermediate", color: "text-green-500" },
    { name: "Linux / Bash", level: "Expert", color: "text-gray-300" },
    { name: "Burp Suite", level: "Intermediate", color: "text-orange-500" },
    { name: "Docker", level: "Intermediate", color: "text-blue-500" },
    { name: "SQL Injection", level: "Advanced", color: "text-purple-400" },
  ];

  const ctfWriteups = [
    {
      title: "HackTheBox: Machine X",
      category: "Pwn",
      difficulty: "Hard",
      date: "Oct 2023",
      link: "#",
    },
    {
      title: "PicoCTF: Web Exploitation",
      category: "Web",
      difficulty: "Medium",
      date: "Sep 2023",
      link: "#",
    },
    {
      title: "CTF Time: Crypto Challenge",
      category: "Cryptography",
      difficulty: "Easy",
      date: "Aug 2023",
      link: "#",
    },
  ];

  const projects = [
    {
      title: "Secure Chat App",
      desc: "Aplikasi chat end-to-end encryption menggunakan Socket.io dan React.",
      stack: ["React", "Node.js", "Socket.io"],
      link: "#",
    },
    {
      title: "Vulnerability Scanner",
      desc: "Python script sederhana untuk mendeteksi open ports dan outdated services.",
      stack: ["Python", "Nmap", "Bash"],
      link: "#",
    },
    {
      title: "Personal Blog",
      desc: "Blog statis menggunakan Next.js dan Markdown untuk dokumentasi belajar.",
      stack: ["Next.js", "Tailwind", "MDX"],
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-300 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-purple-900/30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 cursor-pointer font-mono"
            onClick={() => scrollToSection("home")}
          >
            &lt;DevSec /&gt;
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-purple-400 ${activeSection === item.id ? "text-purple-400" : "text-gray-400"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-purple-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-neutral-900 border-b border-purple-900/30">
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 text-gray-300 hover:text-purple-400"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section (Interactive Terminal) */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20 px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950"
      >
        <div className="w-full max-w-3xl">
          <div className="rounded-lg overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] bg-neutral-900/95 backdrop-blur font-mono text-sm md:text-base">
            {/* Terminal Header */}
            <div className="bg-neutral-800/80 px-4 py-2 flex items-center gap-2 border-b border-purple-500/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="ml-2 text-xs text-gray-400">
                usupek@dagh:~/portfolio
              </span>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef} // Ref dipasang di sini
              className="p-6 h-[400px] overflow-y-auto cursor-text scroll-smooth"
              onClick={() => !isBooting && inputRef.current?.focus()}
            >
              {terminalOutput.map((line, idx) => (
                <div key={idx} className="mb-1 break-words">
                  {line.type === "user" ? (
                    <span className="text-gray-100 font-bold">
                      {line.content}
                    </span>
                  ) : line.type === "error" ? (
                    <span className="text-red-400">{line.content}</span>
                  ) : (
                    <span className="text-green-400 whitespace-pre-wrap">
                      {line.content}
                    </span>
                  )}
                </div>
              ))}

              {!isBooting && (
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2 font-bold">
                    root@devsec:~$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none text-gray-100 flex-1 font-mono"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-gray-500 text-sm animate-pulse">
            Tip: Coba ketik{" "}
            <span className="text-purple-400 bg-purple-900/20 px-1 rounded">
              ls
            </span>{" "}
            lalu{" "}
            <span className="text-purple-400 bg-purple-900/20 px-1 rounded">
              cd nama_file
            </span>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <User className="text-purple-500" size={32} />
            <h2 className="text-3xl font-bold text-white">About Me</h2>
          </div>
          <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 hover:border-purple-500/30 transition-all duration-300">
            <p className="text-lg leading-relaxed text-gray-300">
              Halo! Saya adalah seorang pengembang perangkat lunak yang memiliki
              ketertarikan mendalam pada dunia{" "}
              <span className="text-purple-400 font-semibold">
                Cybersecurity
              </span>
              . Saya suka memecahkan masalah kompleks, bermain Capture The Flag
              (CTF) di akhir pekan, dan membangun aplikasi web yang aman dan
              efisien.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Saat ini saya sedang fokus mendalami{" "}
              <span className="text-purple-400">Web Exploitation</span> dan{" "}
              <span className="text-purple-400">Secure Coding Practices</span>.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-neutral-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Code className="text-purple-500" size={32} />
            <h2 className="text-3xl font-bold text-white">
              Tech Stack & Skills
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="group p-4 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-purple-500 transition-all hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]"
              >
                <div className="font-mono font-bold text-lg text-gray-200 group-hover:text-purple-400 transition-colors">
                  {skill.name}
                </div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                  {skill.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTF WriteUps Section */}
      <section id="ctf" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Flag className="text-purple-500" size={32} />
            <h2 className="text-3xl font-bold text-white">CTF WriteUps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {ctfWriteups.map((ctf, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Flag size={80} />
                </div>
                <div className="text-xs font-mono text-purple-400 mb-2">
                  {ctf.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {ctf.title}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`text-xs px-2 py-1 rounded ${ctf.difficulty === "Hard" ? "bg-red-900/30 text-red-400" : ctf.difficulty === "Medium" ? "bg-yellow-900/30 text-yellow-400" : "bg-green-900/30 text-green-400"}`}
                  >
                    {ctf.difficulty}
                  </span>
                  <a
                    href={ctf.link}
                    className="text-sm text-gray-400 hover:text-purple-400 flex items-center gap-1"
                  >
                    Read <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-6 bg-neutral-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Trophy className="text-purple-500" size={32} />
            <h2 className="text-3xl font-bold text-white">Achievements</h2>
          </div>

          <div className="space-y-6">
            {/* Timeline Item 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.8)]"></div>
                <div className="w-0.5 h-full bg-purple-900/50 mt-2"></div>
              </div>
              <div className="pb-8">
                <div className="text-sm text-purple-400 font-mono mb-1">
                  Desember 2023
                </div>
                <h3 className="text-xl font-bold text-white">
                  Juara 1 National CTF Competition
                </h3>
                <p className="text-gray-400 mt-2">
                  Berhasil menyelesaikan 15 challenge dalam kategori Web
                  Exploitation dan Reverse Engineering.
                </p>
              </div>
            </div>
            {/* Timeline Item 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-neutral-700 border border-purple-500"></div>
                <div className="w-0.5 h-full bg-purple-900/50 mt-2"></div>
              </div>
              <div className="pb-8">
                <div className="text-sm text-purple-400 font-mono mb-1">
                  Agustus 2023
                </div>
                <h3 className="text-xl font-bold text-white">
                  Finalist Hackathon Cyber Defense
                </h3>
                <p className="text-gray-400 mt-2">
                  Membangun sistem deteksi intrusi berbasis AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 mb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <FolderGit2 className="text-purple-500" size={32} />
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-purple-500/50 transition-all group"
              >
                <div className="h-40 bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-800/80 transition-colors">
                  <Terminal
                    size={48}
                    className="text-neutral-600 group-hover:text-purple-500 transition-colors"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 h-12 overflow-hidden">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2 py-1 bg-purple-900/20 text-purple-300 rounded border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-purple-400 transition-colors"
                  >
                    Lihat Repository <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-950 border-t border-purple-900/20 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-purple-500">DevSec</span>. Built with React &
          Tailwind.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
