import Link from "next/link";
import Image from "next/image";

function Nav({ children }: { children: React.ReactNode }) {
  return (
    <nav
      className="flex items-center justify-between gap-x-2 border-b border-gray-700 px-5 md:px-20 lg:px-[calc(50%-550px)] h-17 z-5 
    sticky top-0 bg-gray-200 dark:bg-gray-950"
    >
      <Link
        href="/"
        className="flex items-center gap-x-2 text-black dark:text-white text-lg duration-300 pr-5 py-2 font-bold
       hover:text-shadow-gray-400 hover:text-shadow-sm"
      >
        <Image src="/logo.png" alt="MacWeb Logo" width={35} height={35} /> MacWeb
      </Link>
      <div className="flex gap-x-3 items-center">
        <div className="md:flex items-center gap-x-3 hidden">
          <Link href="/apps" className="nav-link">
            Apps
          </Link>
          <Link href="/updates" className="nav-link">
            Updates
          </Link>
          <Link href="/posts" className="nav-link">
            Posts
          </Link>
          <Link href="/roadmap" className="nav-link">
            Roadmap
          </Link>
          {/* <a href="https://mac-web.github.io/macideas/" className="nav-link">
            MacIdeas
          </a>
          <a href="https://mac-web.github.io/mactools/" className="nav-link">
            MacTools
          </a>
          <a href="https://mac-web.github.io/macblog/" className="nav-link">
            MacBlog
          </a> */}
        </div>
        {children}
      </div>
    </nav>
  );
}

export default Nav;
