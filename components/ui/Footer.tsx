import Image from "next/image";
import Link from "next/link";

//TODO: move this and nav bar to layout components folder and responsive design

function Footer() {
  return (
    <footer className="border-t border-gray-700 py-12 px-5 md:px-20 lg:px-[calc(50%-550px)]  flex flex-wrap md:flex-nowrap gap-y-15 justify-between items-start gap-x-15 text-sm">
      <div className="footer-column">
        <a
          href=""
          className="flex items-center gap-x-2 text-black dark:text-white text-lg duration-300 pr-5 py-2 font-bold hover:text-shadow-gray-400 hover:text-shadow-sm"
        >
          <Image src="/logo.png" alt="MacWeb Logo" width={30} height={30} /> MacWeb
        </a>
        <div className="text-gray-800 dark:text-gray-100">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://macweb.app" target="_blank" className="underline">
            MacWeb
          </a>
        </div>
        <div className="text-gray-800 dark:text-gray-100">All rights reserved</div>
        <div className="text-gray-800 dark:text-gray-100">
          Made with ❤️ by{" "}
          <a href="https://github.com/tonymac129/" target="_blank" className="underline">
            Tony Macaroni
          </a>
        </div>
        <div className="text-gray-800 dark:text-gray-100">
          <a href="https://buymeacoffee.com/tonymac129" target="_blank" className="underline">
            Buy me a coffee ☕
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h2 className="footer-column-title">Browse Tabs</h2>
        <Link href="/" className="footer-link">
          Home
        </Link>
        <Link href="/apps" className="footer-link">
          Apps
        </Link>
        <Link href="/updates" className="footer-link">
          Updates
        </Link>
        <Link href="/posts" className="footer-link">
          Posts
        </Link>
        <Link href="/roadmap" className="footer-link">
          Roadmap
        </Link>
      </div>
      <div className="footer-column">
        <h2 className="footer-column-title">MacWeb Information</h2>
        <Link href="/apps/macweb" className="footer-link" target="_blank">
          About
        </Link>
        <a href="/apps/macweb/updates" className="footer-link" target="_blank">
          Updates
        </a>
        <a href="https://forms.gle/iacBWZAYAizBsfyt9" className="footer-link" target="_blank">
          Feedback
        </a>
      </div>
      <div className="footer-column">
        <h2 className="footer-column-title">MacWeb Apps</h2>
        <a href="https://macvg.macweb.app" className="footer-link" target="_blank">
          MacVG
        </a>
        <a href="https://maclearn.macweb.app" className="footer-link" target="_blank">
          MacLearn
        </a>
        {/* <a href="https://mac-web.github.io/macideas/" className="footer-link" target="_blank">
          MacIdeas
        </a>
        <a href="https://mac-web.github.io/mactools/" className="footer-link" target="_blank">
          MacTools
        </a>
        <a href="https://mac-web.github.io/macblog/" className="footer-link" target="_blank">
          MacBlog
        </a> */}
      </div>
      <div className="footer-column">
        <h2 className="footer-column-title">Social</h2>
        <div className="flex flex-wrap gap-5 items-center">
          <a href="mailto:hello@macweb.app" target="_blank" className="footer-icon" title="Email us">
            <Image src="/icons/email.svg" alt="Email icon" width={25} height={25} className="invert dark:invert-0" />
          </a>
          <a href="https://www.youtube.com/@MacWebApp" target="_blank" className="footer-icon" title="YouTube">
            <Image src="/icons/youtube.svg" alt="YouTube icon" width={25} height={25} className="invert dark:invert-0" />
          </a>
          <a href="https://github.com/Mac-Web/macweb-next" target="_blank" className="footer-icon" title="Source code">
            <Image src="/icons/github.svg" alt="GitHub icon" width={25} height={25} className="invert dark:invert-0" />
          </a>
          <a href="https://discord.gg/UT7g2S2cBP" target="_blank" className="footer-icon" title="Join our server!">
            <Image src="/icons/discord.svg" alt="Discord icon" width={25} height={25} className="invert dark:invert-0" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
