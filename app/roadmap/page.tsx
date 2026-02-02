import type { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import Section from "./Section";

export const metadata: Metadata = {
  title: "Roadmap | MacWeb",
  description:
    "Check out MacWeb's future plans here! Our mission is to fulfill everyone's productivity and entertainment needs with our powerful apps.",
  authors: [{ name: "MacWeb", url: "https://macweb.app" }],
  openGraph: {
    title: "Roadmap | MacWeb",
    description:
      "Check out MacWeb's future plans here! Our mission is to fulfill everyone's productivity and entertainment needs with our powerful apps.",
    url: "https://macweb.app/roadmap",
    siteName: "MacWeb",
    images: [
      {
        url: "/logo.png",
        width: 100,
        height: 100,
      },
    ],
    type: "website",
  },
};

function Page() {
  return (
    <div>
      <Hero
        title="Roadmap"
        description="Check out MacWeb's future plans here! Our mission is to fulfill everyone's productivity and entertainment needs with our powerful apps."
      />
      <div className="flex flex-col gap-y-7 items-center pb-12">
        <Section
          date="Summer 2025"
          content="Transition every single MacWeb app from using vanilla JS to React for improved interactions, scalability, performance,
            and managebility. This basically means completely rewriting the code for each app and remaking them from the ground
            up, so we chose summer, when we have the most time, to do this difficult task."
        />
        <Section
          date="Fall 2025"
          content="Integrate analytics and advertising into each of our apps properly and start advertising them on different social
            media platforms to increase income for more future improvements."
        />
        <Section
          date="Winter 2025"
          content="
            Develop new web apps and add more features to exisiting apps to make the MacWeb ecosystem more complete, funcitonal,
            and useful for everyone. Adding more apps also means more ways to raise income and upgrade our services."
        />
        <Section
          date="Spring 2026"
          content="Hopefully incorporate backend servers into MacWeb apps if we raise enough revenue to afford them. This means way
            better user experience because we can save user data, create user-generated content, develop real time apps, and do a
            lot more interesting stuff with the backend servers."
        />
        <Section
          date="Summer 2026"
          content="
            Update every single app so they integrate with each other and all have a consistent and modern device responsive
            design while having performant code, working features, and no bugs."
        />
        <Section
          date="Future"
          content="
            With the help of the income raised by you, the users, we can achieve a lot of premium accomplishments with our apps in
            the future such as AI integration, syncing across devices, user content, communities, and a ton more. Stay tuned!"
        />
      </div>
    </div>
  );
}

export default Page;
