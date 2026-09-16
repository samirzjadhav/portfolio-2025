import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("✅ Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("❌ Error: Failed to send message.");
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-20 py-16 px-4 sm:px-6"
    >
      {/* TITLE */}
      <h3 className="section-title text-center sm:text-left">Contact</h3>
      <p className="section-sub mt-2 text-white/70 text-center sm:text-left">
        Interested in working together? Let’s connect.
      </p>

      <div className="mt-14 grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
            glass p-6 sm:p-8 rounded-2xl backdrop-blur-2xl
            border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
          "
        >
          <h4 className="text-accent font-bold text-xl sm:text-2xl">
            Get in touch
          </h4>

          <div className="mt-6 space-y-5">
            <p className="section-sub flex items-center gap-3 break-all">
              <i
                className="bx bx-envelope text-2xl text-accent"
                aria-hidden="true"
              ></i>
              samirzjadhav@gmail.com
            </p>

            <p className="section-sub flex items-center gap-3">
              <i className="bx bx-map text-2xl text-accent" aria-hidden="true"></i>
              Nagpur, Maharashtra, India
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="https://github.com/samirzjadhav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="glass p-3 rounded-lg hover:bg-white/10 transition"
            >
              <i className="bx bxl-github text-2xl" aria-hidden="true"></i>
            </a>
            <a
              href="https://linkedin.com/in/samirjadhav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="glass p-3 rounded-lg hover:bg-white/10 transition"
            >
              <i className="bx bxl-linkedin text-2xl" aria-hidden="true"></i>
            </a>
            <a
              href="https://twitter.com/samirzjadhav"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter profile"
              className="glass p-3 rounded-lg hover:bg-white/10 transition"
            >
              <i className="bx bxl-twitter text-2xl" aria-hidden="true"></i>
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
            glass p-6 sm:p-8 rounded-2xl backdrop-blur-2xl 
            border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]
            space-y-6
          "
          aria-label="Contact form"
        >
          {/* INPUT GROUP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="from_name" className="sr-only">
                Your Name
              </label>
              <input
                id="from_name"
                name="from_name"
                placeholder="Your Name"
                autoComplete="name"
                required
                className="
                  p-4 rounded-lg bg-white/5 text-white border border-white/10
                  focus:border-accent/60 focus:bg-white/10 
                  transition placeholder-white/40 w-full
                "
              />
            </div>

            <div>
              <label htmlFor="reply_to" className="sr-only">
                Email Address
              </label>
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                required
                className="
                  p-4 rounded-lg bg-white/5 text-white border border-white/10
                  focus:border-accent/60 focus:bg-white/10 
                  transition placeholder-white/40 w-full
                "
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Your Message..."
              required
              className="
                w-full p-4 rounded-lg bg-white/5 text-white border border-white/10
                focus:border-accent/60 focus:bg-white/10
                transition placeholder-white/40
              "
            ></textarea>
          </div>

          {/* STATUS MESSAGE */}
          {status && (
            <p
              className="text-sm text-accent font-medium mt-1"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          )}

          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.08 }}
              className="btn-accent text-sm sm:text-base px-6 py-3 rounded-lg shadow-md shadow-accent/20"
              type="submit"
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
}
