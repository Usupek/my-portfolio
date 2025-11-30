import { User, Github, Linkedin } from "lucide-react";

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
            Hello! I'm
            <span className="text-purple-400 font-semibold"> Rafi</span>. I'm a
            Computer Science student at
            <span className="text-purple-400 font-semibold">
              {" "}
              Universitas Gadjah Mada
            </span>
            . I love everything related to Cybersecurity and Web Development. I
            play CTFs every weekend. In CTFs I play by the name{" "}
            <span className="text-purple-400 font-semibold">Usupek</span>.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            I'm currently focusing on{" "}
            <span className="text-purple-400">Binary Exploitation</span> dan{" "}
            <span className="text-purple-400">Web Exploitation</span>.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="https://github.com/usupek"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmadzainurafialfikri/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
