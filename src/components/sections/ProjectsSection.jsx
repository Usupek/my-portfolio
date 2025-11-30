import { FolderGit2, Terminal, ExternalLink } from "lucide-react";

const ProjectsSection = ({ projects }) => {
  return (
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
              {/* Header: image project atau fallback icon Terminal */}
              <div className="h-40 bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-800/80 transition-colors overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Terminal
                    size={48}
                    className="text-neutral-600 group-hover:text-purple-500 transition-colors"
                  />
                )}
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
                  Repository <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
