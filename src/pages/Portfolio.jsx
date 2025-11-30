import { useState } from "react";
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
    { name: "Express.js", icon: "/Express.svg" },
    { name: "React.js", icon: "/React.svg" },
    { name: "Ghidra", icon: "/Ghidra_logo.svg" },
    { name: "Python", icon: "/Python.svg" },
    { name: "Node.js", icon: "/Node.js.svg" },
    { name: "Linux / Bash", icon: "/Arch Linux.svg" },
    { name: "Burp Suite", icon: "/burp.svg" },
    { name: "Docker", icon: "/Docker.svg" },
  ];

  const ctfWriteups = [
    {
      title: "Hacktoday: Gateway",
      category: "Web",
      scope: "National",
      difficulty: "Medium",
      date: "Oct 2025",
      link: "https://rafi-organization.gitbook.io/usupek/ctfs/national/hacktoday/gateway",
    },
    {
      title: "IdekCTF: Constructor",
      category: "Rev",
      scope: "International",
      difficulty: "Medium",
      date: "Sep 2025",
      link: "https://rafi-organization.gitbook.io/usupek/ctfs/international/idekctf-2025/minecraft-youtuber",
    },
    {
      title: "IdekCTF: Myspace2",
      category: "pwn",
      scope: "International",
      difficulty: "Easy",
      date: "Aug 2025",
      link: "https://rafi-organization.gitbook.io/usupek/ctfs/international/idekctf-2025/myspace2",
    },
  ];

  const achievements = [
    {
      date: "October 2025",
      title: "Finalist - Rise the Ranger TNI CTF",
      description:
        "Qualified as a finalist in a high-stakes national cybersecurity competition organized in collaboration with the TNI. My first time playing an Attack-Defense CTF.",
      certificateUrl: "/sertifs/sertif-rtr.jpeg",
    },
    {
      date: "October 2025",
      title: "Finalist - Srifoton CTF",
      description:
        "Secured a spot in the final round after outperforming hundreds of participants in the qualification stage.",
      certificateUrl: "/sertifs/sertif-srifoton.jpeg",
    },
    {
      date: "August 2025",
      title: "Finalist - Cyber Breaker Development",
      description:
        "Secured a spot in the final round after outperforming hundreds of participants in the qualification stage.",
      certificateUrl: "/sertifs/sertif-cbd.jpeg",
    },
    {
      date: "July 2025",
      title: "Third place - FIK Cup CTF",
      description: "Achieved a podium finish (3rd Overall).",
      certificateUrl: "/sertifs/sertif-fik.jpeg",
    },
  ];

  const projects = [
    {
      title: "Batam Campus Expo",
      desc: "A web application for Batam Campus Expo Event.",
      stack: ["React.js", "Node.js", "Express.js"],
      link: "https://github.com/AzrilFahmiardi/Batam-Campus-Expo-2025",
      image: "/bamex.jpg",
    },
    {
      title: "CTF writeups",
      desc: "CTF writeups",
      stack: ["Gitbook"],
      link: "https://github.com/Usupek/ctf-writeups",
      image: "/gitbook.jpg",
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
      <AchievementsSection achievements={achievements} />
      <ProjectsSection projects={projects} />

      <Footer />
    </div>
  );
};

export default Portfolio;
