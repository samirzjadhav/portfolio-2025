interface ContactBackgroundGlowProps {
  disabled?: boolean;
}

export default function ContactBackgroundGlow({
  disabled = false,
}: ContactBackgroundGlowProps) {
  if (disabled) return null;

  return (
    <div className="contact-glow-layer" aria-hidden="true">
      <div className="contact-glow-orb contact-glow-orb-a" />
      <div className="contact-glow-orb contact-glow-orb-b" />
      <div className="contact-glow-orb contact-glow-orb-c" />
    </div>
  );
}
