/**
 * Central place for business + contact details so they stay consistent
 * across every section of the page.
 */
export const site = {
  name: "Bhandari Ventures",
  tagline:
    "AI-powered systems that help businesses automate, capture customers, and scale.",
  location: "Bharatpur, Nepal",
  url: "https://bhandariventures.com",
  email: "hello@bhandariventures.com",
  // Phone in international format (Nepal +977).
  phoneDisplay: "+977 9704210604",
  phoneRaw: "9779704210604",
  // wa.me expects the number with country code and no symbols/spaces.
  whatsapp: "https://wa.me/9779704210604",
  whatsappMessage:
    "Hi Bhandari Ventures! I'd like a free demo for my business.",
  splineScene: "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode",
  // GitHub — used as verifiable proof of real, shipped work.
  githubUser: "ishan1030",
  github: "https://github.com/ishan1030",
  githubRepo: "https://github.com/ishan1030/Bhandari-Ventures",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/ishan1030",
  },
} as const;

/** Build a WhatsApp click-to-chat link with a prefilled message. */
export function waLink(message: string = site.whatsappMessage): string {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
