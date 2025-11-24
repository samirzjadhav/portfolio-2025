export default function Home() {
  return (
    <section id="home" className="min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-[5rem] md:text-[8rem] font-bold leading-[0.9]">
            He
            <br />
            LLO.
          </h1>
          <h2 className="text-2xl subtle">
            I'M <span className="text-accent font-semibold">SAMIR JADHAV</span>
          </h2>

          <p className="mt-6 text-gray-300 max-w-md">
            Front-end developer passionate about React, Next.js & Tailwind CSS.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="#portfolio" className="btn-accent">
              View Work
            </a>
            <a href="#contact" className="glass px-4 py-2 rounded-xl subtle">
              Contact
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="glass-strong p-6 rounded-3xl">
            <img
              src="/assets/home-main.svg"
              className="w-[330px] md:w-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
