import React from "react";
import { Flag, ChevronRight } from "lucide-react";

const CTFSection = ({ ctfWriteups }) => {
  return (
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
              <h3 className="text-xl font-bold text-white mb-2">{ctf.title}</h3>
              <div className="text-xs text-gray-500">{ctf.date}</div>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    ctf.difficulty === "Hard"
                      ? "bg-red-900/30 text-red-400"
                      : ctf.difficulty === "Medium"
                        ? "bg-yellow-900/30 text-yellow-400"
                        : "bg-green-900/30 text-green-400"
                  }`}
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
  );
};

export default CTFSection;
