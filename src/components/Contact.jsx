import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_5lkxlrk",
        "template_0qekkyu",
        formRef.current,
        "7UnPU1jkPBXvxNS4_"
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          setStatus("❌ Error: Failed to send message.");
        }
      );
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
              <i className="bx bx-envelope text-2xl text-accent"></i>
              samirzjadhav@gmail.com
            </p>

            <p className="section-sub flex items-center gap-3">
              <i className="bx bx-map text-2xl text-accent"></i>
              Nagpur, Maharashtra, India
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <a
              href="https://github.com/samirzjadhav"
              target="_blank"
              className="glass p-3 rounded-lg hover:bg-white/10 transition"
            >
              <i className="bx bxl-github text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com/in/samirjadhav"
              target="_blank"
              className="glass p-3 rounded-lg hover:bg-white/10 transition"
            >
              <i className="bx bxl-linkedin text-2xl"></i>
            </a>
            <a
              href="https://twitter.com/samirzjadhav"
              target="_blank"
              className="glass p-3 rounded-lg hover:bg-white/10 transition"
            >
              <i className="bx bxl-twitter text-2xl"></i>
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
        >
          {/* INPUT GROUP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              name="from_name"
              placeholder="Your Name"
              required
              className="
                p-4 rounded-lg bg-white/5 text-white border border-white/10
                focus:outline-none focus:border-accent/60 focus:bg-white/10 
                transition placeholder-white/40 w-full
              "
            />

            <input
              name="reply_to"
              type="email"
              placeholder="Email Address"
              required
              className="
                p-4 rounded-lg bg-white/5 text-white border border-white/10
                focus:outline-none focus:border-accent/60 focus:bg-white/10 
                transition placeholder-white/40 w-full
              "
            />
          </div>

          <textarea
            name="message"
            rows="6"
            placeholder="Your Message..."
            required
            className="
              w-full p-4 rounded-lg bg-white/5 text-white border border-white/10
              focus:outline-none focus:border-accent/60 focus:bg-white/10
              transition placeholder-white/40
            "
          ></textarea>

          {/* STATUS MESSAGE */}
          {status && (
            <p className="text-sm text-accent font-medium mt-1">{status}</p>
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
