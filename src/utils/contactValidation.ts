export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactFieldName = keyof ContactFormValues;

export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = {
  nameMax: 100,
  emailMax: 254,
  messageMax: 5000,
} as const;

export function validateContactField(
  field: ContactFieldName,
  values: ContactFormValues
): string | undefined {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  switch (field) {
    case "name":
      if (!name) return "Name is required.";
      if (name.length > CONTACT_LIMITS.nameMax) {
        return `Name must be ${CONTACT_LIMITS.nameMax} characters or fewer.`;
      }
      return undefined;
    case "email":
      if (!email) return "Email is required.";
      if (email.length > CONTACT_LIMITS.emailMax) {
        return `Email must be ${CONTACT_LIMITS.emailMax} characters or fewer.`;
      }
      if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";
      return undefined;
    case "message":
      if (!message) return "Message is required.";
      if (message.length > CONTACT_LIMITS.messageMax) {
        return `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer.`;
      }
      return undefined;
    default:
      return undefined;
  }
}

export function validateContactForm(
  values: ContactFormValues
): ContactFieldErrors {
  const fields: ContactFieldName[] = ["name", "email", "message"];
  const errors: ContactFieldErrors = {};

  for (const field of fields) {
    const message = validateContactField(field, values);
    if (message) errors[field] = message;
  }

  return errors;
}

export function hasContactErrors(errors: ContactFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
