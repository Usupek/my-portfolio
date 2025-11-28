import React from "react";
import { Trophy } from "lucide-react";

const AchievementsSection = () => {
  return (
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
  );
};

export default AchievementsSection;
