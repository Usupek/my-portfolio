import React from "react";
import { User, Github, Linkedin, Mail } from "lucide-react";

const AboutSection = () => {
  return (
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
            <span className="text-purple-400 font-semibold">Cybersecurity</span>
            . Saya suka memecahkan masalah kompleks, bermain Capture The Flag
            (CTF) di akhir pekan, dan membangun aplikasi web yang aman dan
            efisien.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            Saat ini saya sedang fokus mendalami{" "}
            <span className="text-purple-400">Binary Exploitation</span> dan{" "}
            <span className="text-purple-400">Web Exploitation</span>.
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
  );
};

export default AboutSection;
