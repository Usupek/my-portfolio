import React, { useState } from "react";
import { User, Code, Flag, Trophy, FolderGit2 } from "lucide-react";

import Navbar from "../components/Navbar";
import TerminalHero from "../components/TerminalHero";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import CTFSection from "../components/sections/CTFSection";
import AchievementsSection from "../components/sections/AchievementsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import Footer from "../components/Footer";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "about", label: "About Me", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "ctf", label: "CTF WriteUps", icon: Flag },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "projects", label: "Projects", icon: FolderGit2 },
  ];

  const skills = [
    { name: "JavaScript", level: "Advanced" },
    { name: "React / Next.js", level: "Intermediate" },
    { name: "Python", level: "Advanced" },
    { name: "Node.js", level: "Intermediate" },
    { name: "Linux / Bash", level: "Expert" },
    { name: "Burp Suite", level: "Intermediate" },
    { name: "Docker", level: "Intermediate" },
    { name: "SQL Injection", level: "Advanced" },
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-300 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <Navbar
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={scrollToSection}
      />

      {/* Hero Terminal */}
      <TerminalHero onNavigateSection={scrollToSection} />

      {/* Sections */}
      <AboutSection />
      <SkillsSection skills={skills} />
      <CTFSection ctfWriteups={ctfWriteups} />
      <AchievementsSection />
      <ProjectsSection projects={projects} />

      <Footer />
    </div>
  );
};

export default Portfolio;
