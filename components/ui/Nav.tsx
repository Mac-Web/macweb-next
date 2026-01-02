import Link from "next/link";
import Image from "next/image";

function Nav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex items-center justify-between gap-x-2 border-b border-gray-700 px-30 h-17 z-5 sticky top-0 bg-gray-950">
      <Link
        href="/"
        className="flex items-center gap-x-2 text-white text-lg duration-300 pr-5 py-2 font-bold hover:text-shadow-gray-500 hover:text-shadow-md"
      >
        <Image src="/logo.png" alt="MacWeb Logo" width={35} height={35} /> MacWeb
      </Link>
      <div className="flex items-center gap-x-3">
        <a href="https://mac-web.github.io/macvg/" className="nav-link">
          MacVG
        </a>
        <a href="https://mac-web.github.io/maclearn/" className="nav-link">
          MacLearn
        </a>
        <a href="https://mac-web.github.io/macideas/" className="nav-link">
          MacIdeas
        </a>
        <a href="https://mac-web.github.io/mactools/" className="nav-link">
          MacTools
        </a>
        <a href="https://mac-web.github.io/macblog/" className="nav-link">
          MacBlog
        </a>
        {children}
      </div>
    </nav>
  );
}

export default Nav;
