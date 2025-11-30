import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const AVATAR_URL = "/me2.jpeg";

const NEOFETCH_INFO = [
  "Ahmad Zainurafi Alfikri",
  "----------------------------",
  "Role   : Cybersecurity Enthusiast / Fullstack Dev",
  "Focus  : Web Exploitation, Binary Exploitation",
  "Stack  : Express.js, React.js, C, Python, etc.",
  "Tools  : Burp Suite, Ghidra, Docker, etc.",
  "GitHub : github.com/usupek",
  "",
  "Tip: enter 'help' to see list of commands",
];

const NeofetchBlock = ({ onDone }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [imageVisible, setImageVisible] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const imgTimer = setTimeout(() => {
      setImageVisible(true);
    }, 100);

    const fullText = NEOFETCH_INFO.join("\n");
    let index = 0;
    let timeoutId;

    const step = () => {
      setDisplayedText(fullText.slice(0, index));

      if (index < fullText.length) {
        index += 1;
        timeoutId = setTimeout(step, 10);
      } else {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          if (onDone) onDone();
        }
      }
    };

    timeoutId = setTimeout(step, 200);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(imgTimer);
    };
  }, []);

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
        {/* Avatar dengan ukuran responsif */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-30 lg:h-40 rounded-xl overflow-hidden border border-neutral-700 flex-shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.6)] transform transition-all duration-700 ease-out
          ${imageVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <img
            src={AVATAR_URL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text neofetch dengan wrap supaya nggak overflow di HP */}
        <div className="text-green-400 text-[11px] sm:text-xs md:text-sm whitespace-pre-wrap break-words">
          {displayedText}
        </div>
      </div>
    </div>
  );
};

const TerminalHero = ({ onNavigateSection }) => {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isBooting, setIsBooting] = useState(true);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  const hasBootedRef = useRef(false);

  const fileSystem = {
    "about_me.txt": {
      id: "about",
      content:
        "Hello! I'm Rafi.\nA Cybersecurity Enthusiast & Fullstack Developer.\nFocusing on Web Exploitation and Pwn.",
    },
    "skills.json": {
      id: "skills",
      content:
        '{ "languages": ["JS", "Python"], "tools": ["Burp Suite", "Docker", "Ghidra"] }',
    },
    "ctf_writeups.md": {
      id: "ctf",
      content: "Latest Writeups:\n- blablabla",
    },
    "achievements.log": {
      id: "achievements",
      content: "tesssdsdsdsds",
    },
    "projects.py": {
      id: "projects",
      content:
        'def list_projects():\n  return ["Batam campus Expo", "CTF writeups", "Personal Blog"]',
    },
  };

  useEffect(() => {
    if (hasBootedRef.current) return;
    hasBootedRef.current = true;

    const id = setTimeout(() => {
      setTerminalOutput([{ type: "neofetch" }]);
      // isBooting akan di-set false oleh NeofetchBlock saat selesai ngetik
    }, 300);

    return () => {
      hasBootedRef.current = false;
      clearTimeout(id);
    };
  }, []);

  // Auto-scroll & auto-focus setelah boot selesai
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
    if (!isBooting) {
      inputRef.current?.focus();
    }
  }, [terminalOutput, isBooting]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = inputVal.trim();
      const parts = command.split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];

      let output = "";
      let type = "success";

      const newHistory = [
        ...terminalOutput,
        { type: "user", content: `usupek@dagh:~/portfolio$ ${command}` },
      ];

      switch (cmd) {
        case "help":
          output =
            "Available commands:\n" +
            "  ls             List files (sections)\n" +
            "  cat <file>     Read file content\n" +
            "  cd <file>      Navigate to section\n" +
            "  neofetch       Show system / bio info\n" +
            "  clear          Clear terminal";
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
            if (onNavigateSection) {
              setTimeout(() => onNavigateSection(fileSystem[arg].id), 100);
            }
          } else {
            output = `cd: ${arg}: No such file or directory`;
            type = "error";
          }
          break;

        case "neofetch":
          newHistory.push({ type: "neofetch" });
          output = "";
          break;

        case "clear":
          setTerminalOutput([]);
          setInputVal("");
          return;

        case "":
          break;

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

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-3 sm:px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950"
    >
      <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl">
        <div className="rounded-lg overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] bg-neutral-900/95 backdrop-blur font-mono text-[11px] sm:text-xs md:text-sm">
          {/* Header Terminal */}
          <div className="bg-neutral-800/80 px-3 sm:px-4 py-2 flex items-center gap-2 border-b border-purple-500/20">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
            <span className="ml-2 text-[10px] sm:text-xs text-gray-400 truncate">
              usupek@dagh:~/portfolio
            </span>
          </div>

          {/* Body Terminal */}
          <div
            ref={terminalBodyRef}
            className="p-4 sm:p-6 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] max-h-[70vh] overflow-y-auto cursor-text scroll-smooth"
            onClick={() => !isBooting && inputRef.current?.focus()}
          >
            {terminalOutput.map((line, idx) => {
              if (line.type === "neofetch") {
                return (
                  <NeofetchBlock key={idx} onDone={() => setIsBooting(false)} />
                );
              }

              // Line biasa (system/user/error)
              return (
                <div key={idx} className="mb-1 break-words">
                  {line.type === "user" ? (
                    <span className="text-gray-100 font-bold">
                      {line.content}
                    </span>
                  ) : line.type === "error" ? (
                    <span className="text-red-400 whitespace-pre-wrap">
                      {line.content}
                    </span>
                  ) : (
                    <span className="text-green-400 whitespace-pre-wrap">
                      {line.content}
                    </span>
                  )}
                </div>
              );
            })}

            {!isBooting && (
              <div className="flex items-center flex-wrap gap-1">
                <span className="text-purple-400 mr-1 sm:mr-2 font-bold">
                  usupek@dagh:~/portfolio$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none text-gray-100 flex-1 min-w-[120px] font-mono"
                  autoComplete="off"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center gap-2 text-gray-500 text-xs sm:text-sm animate-pulse">
          <span className="truncate">Scroll down</span>
          <ArrowDown className="text-purple-400 bg-purple-900/20 px-1 rounded w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
    </section>
  );
};

export default TerminalHero;
