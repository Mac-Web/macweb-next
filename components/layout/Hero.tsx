type HeroProps = {
  title: string;
  description?: string;
};

function Hero({ title, description }: HeroProps) {
  return (
    <div className="flex items-center justify-center flex-col gap-y-7 pt-10">
      <h1 className="text-black dark:text-white text-4xl font-bold text-center">{title}</h1>
      <p className="text-gray-800 dark:text-gray-100 text-lg text-center w-[65%]">{description}</p>
    </div>
  );
}

export default Hero;
