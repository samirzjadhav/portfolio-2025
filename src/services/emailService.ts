import type { EmailServiceConfig } from "../types";

function getEmailServiceConfig(): EmailServiceConfig {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };
}

export async function sendContactEmail(form: HTMLFormElement): Promise<void> {
  const { serviceId, templateId, publicKey } = getEmailServiceConfig();
  const emailjs = (await import("@emailjs/browser")).default;

  await emailjs.sendForm(serviceId, templateId, form, publicKey);
}
