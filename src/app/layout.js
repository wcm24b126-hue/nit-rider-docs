// src/app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Night‑Rider Docs",
  description: "Static documentation site built with Next.js + Bun",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <header className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-2xl font-bold">Night‑Rider Docs</h1>
        </header>

        <main className="flex-1 container mx-auto p-6">{children}</main>

        <footer className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 text-center text-sm">
          © {new Date().getFullYear()} Night‑Rider. All rights reserved.
        </footer>
      </body>
    </html>
  );
}