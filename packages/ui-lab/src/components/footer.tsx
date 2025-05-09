import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 py-12 mt-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center">
              <div className="absolute w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 opacity-80"></div>
              <div className="absolute w-3 h-3 rounded-full bg-black"></div>
            </div>
            <span className="font-semibold text-xl">mastra</span>
          </div>

          <div className="text-zinc-400 text-sm">
            If you love Vercel AI SDK, you&apos;ll love{" "}
            <Link href="https://twitter.com/mastra_ai" className="text-white hover:underline">
              @mastra_ai
            </Link>{" "}
            - it&apos;s the enterprise version.
          </div>

          <div className="flex gap-6">
            <Link href="/twitter" className="text-zinc-400 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="/github" className="text-zinc-400 hover:text-white transition-colors">
              GitHub
            </Link>
            <Link href="/discord" className="text-zinc-400 hover:text-white transition-colors">
              Discord
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          © {new Date().getFullYear()} Mastra, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
