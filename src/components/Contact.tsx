import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { contactFormConfig, contactInfo, socialLinks } from "../data/contact";
import { sendMessage } from "../services/messageService";
import type { ContactFormField, ContactFormStatus } from "../types";

const inputClassName = `
  p-4 rounded-lg bg-white/5 text-white border border-white/10
  focus:border-accent/60 focus:bg-white/10 
  transition placeholder-white/40 w-full
`;

function renderFormField(field: ContactFormField) {
  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        name={field.name}
        rows={field.rows}
        placeholder={field.placeholder}
        required={field.required}
        className="
          w-full p-4 rounded-lg bg-white/5 text-white border border-white/10
          focus:border-accent/60 focus:bg-white/10
          transition placeholder-white/40
        "
      ></textarea>
    );
  }

  return (
    <input
      id={field.id}
      name={field.name}
      type={field.type}
      placeholder={field.placeholder}
      autoComplete={field.autoComplete}
      required={field.required}
      className={inputClassName}
    />
  );
}

function getStatusMessage(status: ContactFormStatus): string {
  switch (status.type) {
    case "loading":
      return "Sending...";
    case "success":
      return status.message;
    case "error":
      return status.message;
    default:
      return "";
  }
}

export default function Contact() {
  const [status, setStatus] = useState<ContactFormStatus>({ type: "idle" });
  const isSubmitting = status.type === "loading";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "loading" });

    const form = e.currentTarget;

    try {
      await sendMessage(form);
      setStatus({
        type: "success",
        message: "✅ Message sent successfully!",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? `❌ Error: ${error.message}`
            : "❌ Error: Failed to send message.",
      });
    }
  };

  const statusMessage = getStatusMessage(status);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-20 py-16 px-4 sm:px-6"
    >
      <h3 className="section-title text-center sm:text-left">Contact</h3>
      <p className="section-sub mt-2 text-white/70 text-center sm:text-left">
        Interested in working together? Let's connect.
      </p>

      <div className="mt-14 grid md:grid-cols-2 gap-10">
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
              {contactInfo.email}
            </p>

            <p className="section-sub flex items-center gap-3">
              <i className="bx bx-map text-2xl text-accent" aria-hidden="true"></i>
              {contactInfo.location}
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="glass p-3 rounded-lg hover:bg-white/10 transition"
              >
                <i className={`bx ${link.icon} text-2xl`} aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {contactFormConfig.rowFields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="sr-only">
                  {field.label}
                </label>
                {renderFormField(field)}
              </div>
            ))}
          </div>

          <div>
            <label
              htmlFor={contactFormConfig.messageField.id}
              className="sr-only"
            >
              {contactFormConfig.messageField.label}
            </label>
            {renderFormField(contactFormConfig.messageField)}
          </div>

          {statusMessage && (
            <p
              className={`text-sm font-medium mt-1 ${
                status.type === "error" ? "text-red-300" : "text-accent"
              }`}
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
          )}

          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: isSubmitting ? 1 : 0.92 }}
              whileHover={{ scale: isSubmitting ? 1 : 1.08 }}
              className="btn-accent text-sm sm:text-base px-6 py-3 rounded-lg shadow-md shadow-accent/20 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
}
