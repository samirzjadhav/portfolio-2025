import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-12 py-12"
    >
      <h3 className="section-title">Contact</h3>
      <p className="section-sub mt-2">
        Interested in working together? Send a message.
      </p>

      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <div className="glass p-6">
          <h4 className="text-accent font-semibold">Get in touch</h4>
          <p className="section-sub mt-3">samirzjadhav@gmail.com</p>
          <p className="section-sub mt-4">Nagpur, Maharashtra, India</p>
        </div>

        <form
          action="https://getform.io/f/bzylzvva"
          method="POST"
          className="glass p-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <input
              name="name"
              placeholder="Name"
              required
              className="p-3 rounded-md bg-transparent border border-white/8 text-white"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="p-3 rounded-md bg-transparent border border-white/8 text-white"
            />
          </div>
          <textarea
            name="message"
            rows="6"
            placeholder="Message here"
            required
            className="w-full p-3 rounded-md bg-transparent border border-white/8 text-white"
          ></textarea>
          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              className="btn-accent"
              type="submit"
            >
              Send Message
            </motion.button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
