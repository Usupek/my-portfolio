import React from "react";
import { Code } from "lucide-react";

const SkillsSection = ({ skills }) => {
  return (
    <section id="skills" className="py-20 px-6 bg-neutral-900/30">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Code className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold text-white">Tech Stack & Skills</h2>
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
  );
};

export default SkillsSection;
