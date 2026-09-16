import { SITE_URL } from "../config/site";
import type { ContactFormConfig, ContactInfo, SocialLink } from "../types";

export const contactInfo: ContactInfo = {
  name: "Samir Jadhav",
  title: "Web Engineer",
  email: "samirzjadhav@gmail.com",
  phone: "+91 7620647351",
  location: "Nagpur, Maharashtra, India",
  portfolioUrl: SITE_URL,
  githubUrl: "https://github.com/samirzjadhav",
  linkedinUrl: "https://www.linkedin.com/in/samirzjadhav",
};

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    url: contactInfo.githubUrl,
    label: "GitHub profile",
    icon: "bxl-github",
  },
  {
    platform: "linkedin",
    url: contactInfo.linkedinUrl,
    label: "LinkedIn profile",
    icon: "bxl-linkedin",
  },
  {
    platform: "twitter",
    url: "https://twitter.com/samirzjadhav",
    label: "Twitter profile",
    icon: "bxl-twitter",
  },
];

export const contactFormConfig: ContactFormConfig = {
  rowFields: [
    {
      id: "from_name",
      name: "from_name",
      type: "text",
      label: "Your Name",
      placeholder: "Your Name",
      autoComplete: "name",
      required: true,
    },
    {
      id: "reply_to",
      name: "reply_to",
      type: "email",
      label: "Email Address",
      placeholder: "Email Address",
      autoComplete: "email",
      required: true,
    },
  ],
  messageField: {
    id: "message",
    name: "message",
    type: "textarea",
    label: "Your Message",
    placeholder: "Your Message...",
    required: true,
    rows: 6,
  },
};
