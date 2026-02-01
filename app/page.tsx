import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SigninBtn from "@/components/SigninBtn";
import Card from "@/components/Card";
import Section from "@/components/ui/Section";
import Latest from "./Latest";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="flex items-center justify-center flex-col gap-y-7 py-10">
        <h1 className="text-black dark:text-white text-4xl font-bold text-center">Welcome to MacWeb!</h1>
        {!session && <SigninBtn />}
        <p className="text-gray-800 dark:text-gray-100 text-lg text-center w-[65%]">Select an app below to get started.</p>
        <div className="flex justify-center gap-7 flex-wrap px-5 lg:px-25">
          <Card name="MacVG" src="/logos/macvg.png" />
          <Card name="MacLearn" src="/logos/maclearn.png" />
          {/* <Card name="MacIdeas" src="/logos/macideas.png" />
          <Card name="MacTools" src="/logos/mactools.png" />
          <Card name="MacBlog" src="/logos/macblog.png" /> */}
        </div>
      </div>
      <Section
        title="What is MacWeb?"
        description="MacWeb is a collection of a wide variety of different powerful web apps and platforms that help you improve, make you more productive, and provide you with top-tier entertainment experiences! We develop all kinds of online apps with extremely high quality with many features aimed to improve your experience of the internet! See more information about our apps (MacVG, MacLearn, MacIdeas, MacTools, and MacBlog) below!"
        app="macweb"
        color="#11288F"
        img="/logo.png"
      />
      <Section
        title="MacVG, the best online gaming platform"
        description="MacVG is the best game site built for your entertainment with more than 400 diverse games that you can choose from. With a crazy amount of features and content, MacVG makes it easy to browse, play, and enjoy different games! The games are all optimized to be as fast and smooth as possible, and you can customize the platform however you like, tailored to your prefrences!"
        app="macvg"
        color="#E28B08"
        img="/logos/macvg.png"
        odd={true}
      />
      <Section
        title="MacLearn, the web development learning platform"
        description="Learn, strengthen, and master. Read coding tutorials on MacLearn, learn web development tips, try them in Code Playground, and create anything. In the 21st century, coding is one of the most important skills to learn and master. Learn to code now, at MacLearn. Use the platform to its fullest by saving articles, do practice quizzes, and try to collect all the achievements!"
        app="maclearn"
        color="#2949AE"
        img="/logos/maclearn.png"
      />
      {/* <Section
        title="MacIdeas, the ultimate productivity tool"
        description="MacIdeas is the ultimate productivity tool for capturing and writing down your ideas, thoughts, and anything! With the integration of tasks, notes, drawings, and more, you can manage your imagination and thoughts easily! Unfortunately, MacIdea's development is currently paused, but we'll resume development and keep improving it in the future!"
        app="macideas"
        color="#007F7E"
        img="/logos/macideas.png"
        odd={true}
      />
      <Section
        title="MacTools, the extensive utilities library"
        description="MacTools is your all in one utility app that helps you get anything done easily with powerful tools, features, and widgets ranging from math and geometry to text decoder, timer, countdown, and more! You can also pin these tools to access them instantly! Unfortunately, MacTools's development is currently paused, but we'll resume development and keep improving it in the future!"
        app="mactools"
        color="#0F6E10"
        img="/logos/mactools.png"
      />
      <Section
        title="MacBlog, the up to date information hub"
        description="MacBlog is the information hub for MacWeb apps, where we put and share our ideas, updates, and articles about our apps, projects, and more! You can see posts, tips, info, and other resources about our apps here if you want to learn more about them. Note that unlike our other projects, MacBlog isn't an app, it's just an information/support center for all our other apps."
        app="macblog"
        color="#491E87"
        img="/logos/macblog.png"
        odd={true}
      /> */}
      <div className="my-10">
        <h2 className="font-bold text-3xl text-center">Latest News</h2>
        <Latest />
      </div>
    </div>
  );
}
