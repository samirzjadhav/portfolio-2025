export type SocialPlatform = "github" | "linkedin" | "twitter";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
  icon: string;
}

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export type ContactFormFieldType = "text" | "email" | "textarea";

export interface ContactFormField {
  id: string;
  name: string;
  type: ContactFormFieldType;
  label: string;
  placeholder: string;
  autoComplete?: string;
  required: boolean;
  rows?: number;
}

export interface ContactFormConfig {
  rowFields: ContactFormField[];
  messageField: ContactFormField;
}
