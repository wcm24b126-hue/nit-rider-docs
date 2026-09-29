// src/app/page.jsx
import Image from "next/image";

export default function DocsHome() {
  return (
    <article className="prose dark:prose-invert max-w-none space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Knight Rider Copilot Documentation
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">
          Comprehensive guide for compiling, optimizing, configuring API credentials, and running the{" "}
          <strong>Knight Rider Copilot</strong> extension inside local VS Code and
          resource-constrained environments like GitHub Codespaces.
        </p>
      </div>

      <hr className="border-gray-800" />

      {/* Section 1 */}
      <section>
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          1. System Stability & Memory Optimization (Swap File)
        </h2>
        <p className="text-sm text-gray-300">
          Agent loops and language model processing can trigger Out-Of-Memory (OOM) crashes in standard 4 GB containers. Allocate an 8 GB Linux swap space to guarantee system stability:
        </p>
        <pre className="bg-slate-950 p-4 rounded-lg border border-cyan-500/20 text-cyan-300 text-xs overflow-x-auto">
          <code>
{`# 1. Allocate an 8 GB swap file
sudo fallocate -l 8G /swapfile

# 2. Set strict root permissions
sudo chmod 600 /swapfile

# 3. Format as Linux swap
sudo mkswap /swapfile

# 4. Activate the swap partition
sudo swapon /swapfile

# 5. Persist swap across reboots in /etc/fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 6. Verify total available memory
free -h`}
          </code>
        </pre>
      </section>

      {/* Section 2 */}
      <section>
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          2. Process & Heap Memory Constraints
        </h2>
        <p className="text-sm text-gray-300">
          Cap the maximum heap memory of Node.js runtimes to prevent background compilation processes from exhausting RAM:
        </p>
        <pre className="bg-slate-950 p-4 rounded-lg border border-cyan-500/20 text-cyan-300 text-xs overflow-x-auto">
          <code>
{`echo 'export NODE_OPTIONS="--max-old-space-size=1536"' >> ~/.bashrc
echo 'export WATCHPACK_POLLING=false' >> ~/.bashrc
source ~/.bashrc`}
          </code>
        </pre>
      </section>

      {/* Section 3 */}
      <section>
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          3. Repository Setup & Directory Navigation
        </h2>
        <p className="text-sm text-gray-300">
          Clone the project repository and move directly to the extension package subdirectory where <code>package.json</code> is located:
        </p>
        <pre className="bg-slate-950 p-4 rounded-lg border border-cyan-500/20 text-cyan-300 text-xs overflow-x-auto">
          <code>
{`# Clone the main repository
git clone https://github.com/wcm24b126-hue/week3and4_in_fullstack_development.git

# Enter the extension root folder
cd week3and4_in_fullstack_development/nightrider-copilot`}
          </code>
        </pre>
      </section>

      {/* Section 4 */}
      <section>
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          4. Build & Package VSIX
        </h2>
        <p className="text-sm text-gray-300">
          Install project dependencies and compile the extension into a local <code>.vsix</code> installer archive:
        </p>
        <pre className="bg-slate-950 p-4 rounded-lg border border-cyan-500/20 text-cyan-300 text-xs overflow-x-auto">
          <code>
{`# Install dependencies
npm install

# Package the extension locally
npx -y @vscode/vsce package --no-dependencies --allow-missing-repository`}
          </code>
        </pre>
      </section>

      {/* Section 5 */}
      <section>
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          5. Installation & Command Palette Activation
        </h2>
        <p className="text-sm text-gray-300">
          Install the packaged binary into VS Code directly through the terminal:
        </p>
        <pre className="bg-slate-950 p-4 rounded-lg border border-cyan-500/20 text-cyan-300 text-xs overflow-x-auto">
          <code>
{`# Install into local or remote VS Code
code --install-extension *.vsix`}
          </code>
        </pre>

        <h3 className="text-base font-semibold text-slate-200 mt-4 mb-2">
          Activating via Command Palette:
        </h3>
        <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
          <li>
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs">Ctrl + Shift + P</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs">Cmd + Shift + P</kbd> on macOS).
          </li>
          <li>
            Type <code>Developer: Reload Window</code> and hit <strong>Enter</strong> to register the newly installed package.
          </li>
          <li>
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs">Ctrl + Shift + P</kbd> again and type <code>Night Rider</code> to inspect registered commands.
          </li>
        </ol>
      </section>

      {/* Section 6 - Groq API Setup */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          6. Setting the Groq API Key
        </h2>
        <p className="text-sm text-gray-300">
          Knight Rider communicates with Groq for accelerated model inference. First, retrieve your free API key from{" "}
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 underline font-medium"
          >
            groq.com
          </a>{" "}
          (Groq Console). Then follow these steps to configure it:
        </p>

        {/* Highlighted Step-by-Step Prompt */}
        <div className="border border-cyan-500/30 bg-slate-900/80 p-5 rounded-xl space-y-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
              QUICK SETUP
            </span>
            Add API Key via Command Palette
          </h3>

          <ol className="text-sm text-gray-200 space-y-2.5 list-decimal list-inside">
            <li>
              Go to the Command Palette using{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs">
                Ctrl + Shift + P
              </kbd>{" "}
              (or{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs">
                Cmd + Shift + P
              </kbd>{" "}
              on macOS).
            </li>
            <li>
              Type:
              <pre className="bg-slate-950 p-2.5 rounded border border-cyan-500/20 text-cyan-300 text-xs mt-1.5 overflow-x-auto">
                <code>night rider:set groq api key</code>
              </pre>
              <span className="text-xs text-gray-400 block mt-1">
                (or simply type <code className="text-cyan-300">Night Rider: Set API Key</code> if autocompleting).
              </span>
            </li>
            <li>
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-gray-200 font-mono text-xs">Enter</kbd> to open the input modal at the top center of your screen.
            </li>
            <li>
              Paste the free API key you got from <strong>groq.com</strong> (starts with <code className="text-cyan-300">gsk_...</code>) and press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-gray-200 font-mono text-xs">
                Enter
              </kbd>{" "}
              to save it.
            </li>
          </ol>
        </div>

        {/* Method 2: Direct UI Input */}
        <div className="border border-slate-800 bg-slate-900/60 p-5 rounded-xl space-y-3">
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span className="text-purple-400 font-mono text-xs px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/30">
              ALTERNATIVE
            </span>
            Direct UI Input (Sidebar Panel)
          </h3>

          <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
            <li>Click the <strong>Night Rider</strong> icon in the VS Code left activity bar[cite: 1].</li>
            <li>
              Inside the panel, locate the <strong>Groq API Key</strong> input box (or click the gear / settings icon)[cite: 1].
            </li>
            <li>
              Paste your <code className="text-cyan-300">gsk_...</code> token directly into the field and click <strong>Save</strong>[cite: 1].
            </li>
          </ul>
        </div>
      </section>

      {/* Section 7 */}
      <section>
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          7. Execution Safeguards
        </h2>
        <p className="text-sm text-gray-300">
          When the copilot produces automatic terminal scripts or file manipulations, interactive confirmation badges (<code>[ Run / Allow ]</code> vs <code>[ Decline ]</code>) appear. Always confirm before executing mutating terminal actions.
        </p>
      </section>

      {/* Logo footer */}
      <div className="pt-8 border-t border-gray-800 flex items-center gap-4">
        <Image src="/next.svg" alt="Next.js" width={36} height={36} className="dark:invert opacity-70" />
        <Image src="/vercel.svg" alt="Vercel" width={36} height={36} className="dark:invert opacity-70" />
      </div>
    </article>
  );
}