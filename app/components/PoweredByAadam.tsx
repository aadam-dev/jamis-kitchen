import { DEV_CREDIT_NAME, DEV_WHATSAPP_URL } from "@/lib/business";

export function PoweredByAadam() {
  return (
    <p className="text-[11px] leading-relaxed text-[var(--muted)]/80">
      Powered by{" "}
      <a
        href={DEV_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--muted)] underline-offset-2 transition hover:text-[var(--accent-bright)] hover:underline"
        aria-label={`Contact ${DEV_CREDIT_NAME} on WhatsApp about website development`}
      >
        {DEV_CREDIT_NAME}
      </a>
    </p>
  );
}
