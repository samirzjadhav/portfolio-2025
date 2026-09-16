import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent } from "react";
import { contactInfo } from "../data/contact";
import { useContactForm } from "../hooks/useContactForm";
import { useContactMotion } from "../hooks/useContactMotion";
import { SectionIntro, StaggerContainer } from "../motion";
import ContactBackgroundGlow from "./contact/ContactBackgroundGlow";
import {
  CONTACT_LIMITS,
  type ContactFieldName,
} from "../utils/contactValidation";

const CHANNELS = [
  {
    id: "email",
    label: "Email",
    hint: "Direct inbox",
    href: `mailto:${contactInfo.email}`,
    icon: "bx-envelope",
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    hint: "Code & projects",
    href: contactInfo.githubUrl,
    icon: "bxl-github",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    hint: "Professional profile",
    href: contactInfo.linkedinUrl,
    icon: "bxl-linkedin",
    external: true,
  },
] as const;

interface ContactFieldProps {
  id: ContactFieldName;
  label: string;
  type?: "text" | "email" | "textarea";
  value: string;
  error?: string;
  placeholder: string;
  autoComplete?: string;
  maxLength?: number;
  rows?: number;
  variants?: ReturnType<typeof useContactMotion>["fieldReveal"];
  onChange: (value: string) => void;
  onBlur: () => void;
}

function ContactField({
  id,
  label,
  type = "text",
  value,
  error,
  placeholder,
  autoComplete,
  maxLength,
  rows = 6,
  variants,
  onChange,
  onBlur,
}: ContactFieldProps) {
  const contactMotion = useContactMotion();
  const [focused, setFocused] = useState(false);
  const errorId = `${id}-error`;
  const hasError = Boolean(error);
  const hasValue = value.trim().length > 0;
  const isActive = focused || hasValue;

  const handleBlur = () => {
    setFocused(false);
    onBlur();
  };

  const sharedProps = {
    id,
    name: id,
    value,
    placeholder,
    autoComplete,
    maxLength,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    onFocus: () => setFocused(true),
    onBlur: handleBlur,
    "aria-invalid": hasError,
    "aria-describedby": hasError ? errorId : undefined,
    className: `contact-field-input ${hasError ? "has-error" : ""} ${
      focused ? "is-focused" : ""
    }`.trim(),
  };

  return (
    <motion.div
      variants={variants ?? contactMotion.fieldReveal}
      className={`contact-field ${hasError ? "is-invalid" : ""} ${
        isActive ? "is-active" : ""
      }`.trim()}
    >
      <label
        htmlFor={id}
        className={`contact-field-label ${isActive ? "is-active" : ""}`.trim()}
      >
        {label}
      </label>

      <div className="contact-field-input-wrap">
        <motion.span
          aria-hidden="true"
          className={`contact-field-focus-ring ${
            hasError ? "is-error" : ""
          }`.trim()}
          initial={false}
          animate={{
            opacity: focused ? 1 : 0,
            scale: focused ? 1 : 0.985,
          }}
          transition={
            contactMotion.reduceMotion
              ? { duration: 0 }
              : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
          }
        />
        {type === "textarea" ? (
          <textarea {...sharedProps} rows={rows} />
        ) : (
          <input {...sharedProps} type={type} />
        )}
      </div>

      <AnimatePresence mode="wait">
        {hasError ? (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: contactMotion.reduceMotion ? 0 : 0.18 }}
            className="contact-field-error"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

interface ContactChannelProps {
  channel: (typeof CHANNELS)[number];
  variants?: ReturnType<typeof useContactMotion>["channelReveal"];
}

function ContactChannel({ channel, variants }: ContactChannelProps) {
  const contactMotion = useContactMotion();

  return (
    <motion.a
      variants={variants ?? contactMotion.channelReveal}
      href={channel.href}
      {...(channel.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="contact-channel"
      whileHover={contactMotion.channelHover}
      whileTap={contactMotion.channelTap}
    >
      <span className="contact-channel-icon" aria-hidden="true">
        <i className={`bx ${channel.icon}`} />
      </span>
      <span className="contact-channel-copy">
        <span className="contact-channel-label">{channel.label}</span>
        <span className="contact-channel-hint">{channel.hint}</span>
      </span>
      <i className="bx bx-right-arrow-alt contact-channel-arrow" aria-hidden="true" />
    </motion.a>
  );
}

function ContactStatusBanner({
  status,
}: {
  status: ReturnType<typeof useContactForm>["status"];
}) {
  const contactMotion = useContactMotion();

  if (status.type === "idle" || status.type === "loading") return null;

  const isSuccess = status.type === "success";

  return (
    <motion.div
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={contactMotion.successBanner}
      className={`contact-status ${isSuccess ? "is-success" : "is-error"}`.trim()}
    >
      {isSuccess && !contactMotion.reduceMotion ? (
        <motion.span
          className="contact-status-glow"
          aria-hidden="true"
          {...contactMotion.successGlow}
        />
      ) : null}
      <motion.i
        className={`bx ${isSuccess ? "bx-check-circle" : "bx-error-circle"} text-xl contact-status-icon`}
        aria-hidden="true"
        variants={isSuccess ? contactMotion.successIcon : undefined}
        initial={isSuccess ? "hidden" : false}
        animate={isSuccess ? "visible" : undefined}
      />
      <span>{status.message}</span>
    </motion.div>
  );
}

function ContactSubmitButton({
  isSubmitting,
  isSuccess,
}: {
  isSubmitting: boolean;
  isSuccess: boolean;
}) {
  const contactMotion = useContactMotion();

  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      className={`btn-accent contact-submit ${isSubmitting ? "is-loading" : ""} ${
        isSuccess ? "is-success" : ""
      }`.trim()}
      whileHover={isSubmitting ? undefined : contactMotion.submitHover}
      whileTap={isSubmitting ? undefined : contactMotion.submitTap}
    >
      <span className="contact-submit-label" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {isSubmitting ? (
            <motion.span
              key="loading"
              className="contact-submit-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: contactMotion.reduceMotion ? 0 : 0.18 }}
            >
              <i className="bx bx-loader-alt bx-spin text-lg" aria-hidden="true" />
              Sending...
            </motion.span>
          ) : isSuccess ? (
            <motion.span
              key="success"
              className="contact-submit-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: contactMotion.reduceMotion ? 0 : 0.18 }}
            >
              <i className="bx bx-check text-lg" aria-hidden="true" />
              Sent!
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="contact-submit-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: contactMotion.reduceMotion ? 0 : 0.18 }}
            >
              <i className="bx bx-send text-lg" aria-hidden="true" />
              Submit
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {isSubmitting && !contactMotion.reduceMotion ? (
        <motion.span
          aria-hidden="true"
          className="contact-submit-shimmer"
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </motion.button>
  );
}

export default function Contact() {
  const contactMotion = useContactMotion();
  const {
    values,
    status,
    isSubmitting,
    setFieldValue,
    blurField,
    handleSubmit,
    visibleError,
  } = useContactForm();

  const isSuccess = status.type === "success";

  return (
    <section id="contact" className="contact-section">
      <SectionIntro
        title="Contact"
        subtitle="Interested in working together? Let's connect."
        align="center"
        className="sm:text-left"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14, margin: "0px 0px -8% 0px" }}
        variants={contactMotion.shellReveal}
        className="contact-shell surface-shell"
      >
        <ContactBackgroundGlow disabled={contactMotion.reduceMotion} />

        <aside className="contact-panel contact-panel--info">
          <StaggerContainer
            className="contact-info-stack"
            viewport={{ once: true, amount: 0.2 }}
            variants={contactMotion.infoStagger}
          >
            <motion.div variants={contactMotion.fieldReveal} className="contact-status-pill">
              <span className="contact-status-dot" aria-hidden="true" />
              Open to opportunities
            </motion.div>

            <motion.h3 variants={contactMotion.fieldReveal} className="contact-headline">
              Let&apos;s build something great.
            </motion.h3>
            <motion.p variants={contactMotion.fieldReveal} className="contact-intro">
              Whether you have a role, a freelance project, or just want to talk
              frontend — send a message or reach out through any channel below.
            </motion.p>
          </StaggerContainer>

          <div aria-label="Contact channels">
            <StaggerContainer
              className="contact-channels"
              viewport={{ once: true, amount: 0.15 }}
              variants={contactMotion.channelStagger}
            >
              {CHANNELS.map((channel) => (
                <ContactChannel key={channel.id} channel={channel} />
              ))}
            </StaggerContainer>
          </div>

          <p className="contact-location">
            <i className="bx bx-map text-accent" aria-hidden="true" />
            {contactInfo.location}
          </p>
        </aside>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className={`contact-panel contact-panel--form ${
            isSuccess ? "is-success" : ""
          }`.trim()}
          aria-label="Contact form"
        >
          <div className="contact-form-header">
            <h3 className="contact-form-title">Send a message</h3>
            <p className="contact-form-subtitle">
              All fields are required. I typically reply within 1–2 days.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status.type === "success" || status.type === "error" ? (
              <ContactStatusBanner key={status.type} status={status} />
            ) : null}
          </AnimatePresence>

          <StaggerContainer
            className="contact-form-fields"
            viewport={{ once: true, amount: 0.12 }}
            variants={contactMotion.fieldStagger}
          >
            <ContactField
              id="name"
              label="Name"
              value={values.name}
              error={visibleError("name")}
              placeholder="Your name"
              autoComplete="name"
              maxLength={CONTACT_LIMITS.nameMax}
              onChange={(value) => setFieldValue("name", value)}
              onBlur={() => blurField("name")}
            />
            <ContactField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              error={visibleError("email")}
              placeholder="you@company.com"
              autoComplete="email"
              maxLength={CONTACT_LIMITS.emailMax}
              onChange={(value) => setFieldValue("email", value)}
              onBlur={() => blurField("email")}
            />
            <ContactField
              id="message"
              label="Message"
              type="textarea"
              value={values.message}
              error={visibleError("message")}
              placeholder="Tell me about the role, project, or idea..."
              maxLength={CONTACT_LIMITS.messageMax}
              rows={6}
              onChange={(value) => setFieldValue("message", value)}
              onBlur={() => blurField("message")}
            />

            <motion.div variants={contactMotion.submitReveal} className="contact-form-footer">
              <ContactSubmitButton
                isSubmitting={isSubmitting}
                isSuccess={isSuccess}
              />
              <p className="contact-form-note">
                Your message is sent securely through the portfolio API.
              </p>
            </motion.div>
          </StaggerContainer>
        </motion.form>
      </motion.div>
    </section>
  );
}
