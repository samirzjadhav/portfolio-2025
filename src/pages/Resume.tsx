import { motion } from "framer-motion";
import pdfFile from "../assets/samirzjadhav-resume.pdf";
import Navbar from "../components/Navbar";
import SkipToContent from "../components/SkipToContent";
import VisitorCounter from "../components/VisitorCounter";
import { PAGE_META } from "../config/site";
import { contactInfo } from "../data/contact";
import { usePageMeta } from "../hooks/usePageMeta";

export default function ResumePage() {
  usePageMeta(PAGE_META.resume);

  return (
    <>
      <div className="resume-nav-fix">
        <SkipToContent />
        <Navbar />
      </div>
      <VisitorCounter />

      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen px-6 py-24 md:py-28 
                      bg-gradient-to-br from-[#07030b] via-[#0f0916] to-[#05020a] 
                      text-white"
      >
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6 text-center"
          >
            My Resume
          </motion.h1>

          <div className="flex justify-center mb-10">
            <a
              href={pdfFile}
              download="samirjadhav-resume.pdf"
              className="btn-accent px-6 py-3 rounded-lg"
            >
              Download Resume (PDF)
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-10 rounded-2xl border border-white/10"
          >
            <h2 className="text-2xl font-bold">{contactInfo.name}</h2>
            <p className="text-white/70">{contactInfo.title}</p>

            <div className="mt-4 text-white/70 space-y-1">
              <p>📧 {contactInfo.email}</p>
              <p>📞 {contactInfo.phone}</p>
              <p>
                🔗{" "}
                <a href={contactInfo.portfolioUrl} className="text-accent">
                  {contactInfo.portfolioUrl.replace(/^https:\/\//, "")}
                </a>
              </p>
              <p>
                🧑‍💻{" "}
                <a href={contactInfo.githubUrl} className="text-accent">
                  {contactInfo.githubUrl.replace(/^https:\/\//, "")}
                </a>
              </p>
              <p>
                💼{" "}
                <a href={contactInfo.linkedinUrl} className="text-accent">
                  {contactInfo.linkedinUrl.replace(/^https:\/\//, "")}
                </a>
              </p>
            </div>

            <hr className="my-6 border-white/10" />

            <h3 className="text-xl font-semibold mb-2">Summary</h3>
            <p className="text-white/70 leading-relaxed">
              I'm Samir, a frontend engineer passionate about building clean,
              engaging and user-friendly web experiences. I'm skilled in React,
              Next.js, Tailwind, JavaScript, HTML and CSS. I enjoy turning ideas
              into functional projects and creating impactful UI experiences.
            </p>

            <hr className="my-6 border-white/10" />

            <h3 className="text-xl font-semibold mb-2">Professional Skills</h3>
            <div className="text-white/70 leading-relaxed space-y-1">
              <p>
                <strong>Technologies:</strong> JavaScript, ReactJS, NextJS,
                TailwindCSS, HTML, CSS, GSAP, Framer Motion
              </p>
              <p>
                <strong>Comfortable with:</strong> Bash, Git, GitHub, Vercel
              </p>
              <p>
                <strong>Learning:</strong> TypeScript, NodeJS, ExpressJS,
                MongoDB, Testing
              </p>
            </div>

            <hr className="my-6 border-white/10" />

            <h3 className="text-xl font-semibold mb-2">Work Experience</h3>
            <h4 className="font-bold">Web Engineer @ Propacity (Internship)</h4>
            <p className="text-white/60">Apr 2024 – Oct 2024</p>

            <ul className="list-disc pl-6 text-white/70 mt-3 space-y-2">
              <li>
                Optimised website performance using lazy loading & image
                optimisation.
              </li>
              <li>Developed fully responsive pages across devices.</li>
              <li>
                Collaborated with designers to increase product conversion.
              </li>
              <li>
                Refactored UI components for cleaner & reusable architecture.
              </li>
              <li>Integrated APIs smoothly with backend engineers.</li>
              <li>Debugged and resolved UI/UX issues.</li>
              <li>Worked with Git version control daily.</li>
            </ul>

            <hr className="my-6 border-white/10" />

            <h3 className="text-xl font-semibold mb-2">Personal Projects</h3>
            <ul className="list-disc pl-6 text-white/70 space-y-2">
              <li>Chocolate Milk Brand Landing Page</li>
              <li>Design Agency Landing Page</li>
              <li>Zomato Clone</li>
            </ul>

            <hr className="my-6 border-white/10" />

            <h3 className="text-xl font-semibold mb-2">Achievements</h3>
            <ul className="list-disc pl-6 text-white/70 space-y-2">
              <li>Completed GSOC (GirlScript Summer of Code)</li>
              <li>Completed 100 Days of Code × 2</li>
              <li>Built 50+ projects</li>
              <li>50 projects in 50 days challenge (HTML, CSS, JS)</li>
            </ul>

            <hr className="my-6 border-white/10" />

            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-white/70">
              Bachelor's in Computer Science (2022–2025)
            </p>
            <p className="text-white/60">RTMNU University</p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
