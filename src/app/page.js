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
          Comprehensive guide for compiling, optimizing, and running the{" "}
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
          Cap the maximum heap memory of Node.js runtimes to prevent rogue loops from monopolizing container memory:
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
          5. Installation & Verification
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
        <p className="text-sm text-gray-300 mt-2">
          Reload the editor window with <code>Ctrl + Shift + P</code> &rarr; <code>Developer: Reload Window</code>.
        </p>
      </section>

      {/* Section 6 */}
      <section>
        <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
          6. Copilot Runtime Configuration
        </h2>
        <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
          <li><strong>Provider:</strong> Groq API</li>
          <li><strong>Recommended Model:</strong> GPT-OSS 120B / Llama 3</li>
          <li><strong>Execution Gates:</strong> Ensure manual confirmation prompts (<code>[Allow / Decline]</code>) are reviewed before running terminal operations.</li>
        </ul>
      </section>

      {/* Logo footer */}
      <div className="pt-8 border-t border-gray-800 flex items-center gap-4">
        <Image src="/next.svg" alt="Next.js" width={36} height={36} className="dark:invert opacity-70" />
        <Image src="/vercel.svg" alt="Vercel" width={36} height={36} className="dark:invert opacity-70" />
      </div>
    </article>
  );
}