import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | MacWeb",
  description: "This page isn't on MacWeb yet...",
};

function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 gap-y-5 text-center">
      <h1 className="text-9xl text-black dark:text-white text-center font-extrabold my-20">404</h1>
      <div>This page doesn&apos;t exist...</div>
      <div>
        Go back{" "}
        <Link href="/" className="underline">
          home
        </Link>
        , submit{" "}
        <a href="https://forms.gle/iacBWZAYAizBsfyt9" className="underline" target="_blank">
          feedback
        </a>
        , or open a{" "}
        <a href="https://github.com/Mac-Web/macweb-next/issues" className="underline" target="_blank">
          GitHub issue
        </a>
      </div>
    </div>
  );
}

export default NotFound;
