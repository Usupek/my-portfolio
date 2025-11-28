import { Trophy, ExternalLink } from "lucide-react";

const AchievementsSection = ({ achievements }) => {
  return (
    <section id="achievements" className="py-20 px-6 bg-neutral-900/30">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Trophy className="text-purple-500" size={32} />
          <h2 className="text-3xl font-bold text-white">Achievements</h2>
        </div>

        <div className="space-y-6">
          {achievements.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              {/* Timeline bullet + line */}
              <div className="flex flex-col items-center">
                <div
                  className={
                    idx === 0
                      ? "w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.8)]"
                      : "w-4 h-4 rounded-full bg-neutral-700 border border-purple-500"
                  }
                ></div>

                {idx !== achievements.length - 1 && (
                  <div className="w-0.5 h-full bg-purple-900/50 mt-2"></div>
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                {item.date && (
                  <div className="text-sm text-purple-400 font-mono mb-1">
                    {item.date}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-400 mt-2">{item.description}</p>
                )}

                {/* Link media / sertifikat */}
                {item.certificateUrl && (
                  <div className="mt-3">
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300"
                    >
                      <span>Certificate</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
