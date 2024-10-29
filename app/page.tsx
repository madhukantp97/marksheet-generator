import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl">Welcome to the Document Generator</h1>
      <Link href="/generate" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
        Generate Document
      </Link>
      <footer className="text-sm">© 2024 Your Company</footer>
    </div>
  );
}
