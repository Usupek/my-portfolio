import React, { useState, useEffect, useRef } from "react";

const BOOT_TEXT = [
  "> Initiating system...",
  "> Loading user profile...",
  "> Mounting file system...",
  "> Access granted.",
  "> Type 'help' to see available commands.",
];

const TerminalHero = ({ onNavigateSection }) => {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isBooting, setIsBooting] = useState(true);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Flag untuk handle StrictMode
  const hasBootedRef = useRef(false);

  const fileSystem = {
    "about_me.txt": {
      id: "about",
      content:
        "Halo! Saya [Nama Kamu].\nSeorang Cybersecurity Enthusiast & Fullstack Developer.\nFokus pada Web Exploitation dan Secure Coding.",
    },
    "skills.json": {
      id: "skills",
      content:
        '{ "languages": ["JS", "Python"], "tools": ["Burp Suite", "Docker", "Nmap"] }',
    },
    "ctf_writeups.md": {
      id: "ctf",
      content:
        "Latest Writeups:\n- HackTheBox: Machine X (Pwn)\n- PicoCTF: Web Exploitation\n- Crypto Challenge",
    },
    "achievements.log": {
      id: "achievements",
      content:
        "[2023] Juara 1 National CTF\n[2023] Finalist Hackathon Cyber Defense",
    },
    "projects.py": {
      id: "projects",
      content:
        'def list_projects():\n  return ["Secure Chat App", "Vuln Scanner", "Personal Blog"]',
    },
  };

  useEffect(() => {
    // Cegah efek dijalankan dua kali tanpa reset
    if (hasBootedRef.current) return;
    hasBootedRef.current = true;

    let delay = 0;
    const timeouts = [];

    BOOT_TEXT.forEach((text, index) => {
      const id = setTimeout(() => {
        setTerminalOutput((prev) => [
          ...prev,
          { type: "system", content: text },
        ]);

        if (index === BOOT_TEXT.length - 1) {
          setIsBooting(false);
        }
      }, delay);

      timeouts.push(id);
      delay += 800;
    });

    return () => {
      // PENTING: reset flag + bersihin timeout
      hasBootedRef.current = false;
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Auto scroll & fokus ke input
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
        { type: "user", content: `root@devsec:~$ ${command}` },
      ];

      switch (cmd) {
        case "help":
          output =
            "Available commands:\n  ls            List files (sections)\n  cat <file>    Read file content\n  cd <file>     Navigate to section\n  clear         Clear terminal";
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
      className="min-h-screen flex items-center justify-center pt-20 px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-neutral-950 to-neutral-950"
    >
      <div className="w-full max-w-3xl">
        <div className="rounded-lg overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] bg-neutral-900/95 backdrop-blur font-mono text-sm md:text-base">
          {/* Header Terminal */}
          <div className="bg-neutral-800/80 px-4 py-2 flex items-center gap-2 border-b border-purple-500/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="ml-2 text-xs text-gray-400">
              usupek@dagh:~/portfolio
            </span>
          </div>

          {/* Body Terminal */}
          <div
            ref={terminalBodyRef}
            className="p-6 h-[400px] overflow-y-auto cursor-text scroll-smooth"
            onClick={() => !isBooting && inputRef.current?.focus()}
          >
            {terminalOutput.map((line, idx) => (
              <div key={idx} className="mb-1 break-words">
                {line.type === "user" ? (
                  <span className="text-gray-100 font-bold">
                    {line.content}
                  </span>
                ) : line.type === "error" ? (
                  <span className="text-red-400">{line.content}</span>
                ) : (
                  <span className="text-green-400 whitespace-pre-wrap">
                    {line.content}
                  </span>
                )}
              </div>
            ))}

            {!isBooting && (
              <div className="flex items-center">
                <span className="text-purple-400 mr-2 font-bold">
                  root@devsec:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none text-gray-100 flex-1 font-mono"
                  autoComplete="off"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm animate-pulse">
          Tip: Coba ketik{" "}
          <span className="text-purple-400 bg-purple-900/20 px-1 rounded">
            ls
          </span>{" "}
          lalu{" "}
          <span className="text-purple-400 bg-purple-900/20 px-1 rounded">
            cd nama_file
          </span>
        </div>
      </div>
    </section>
  );
};

export default TerminalHero;
