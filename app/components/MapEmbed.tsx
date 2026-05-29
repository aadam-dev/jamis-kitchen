/** Nima area: update embed URL when exact Maps link is available */
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.2!3d5.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNWHDMzQnNDguMCJOIDDCsMTInMDAuMCJX!5e0!3m2!1sen!2sgh!4v1!5m2!1sen!2sgh&q=Nima+Shell+Filling+Station+Accra";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Nima+Shell+Filling+Station+Free+Pipe+Accra+Ghana";

export { MAPS_LINK };

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-lg">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={MAP_EMBED_SRC}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Jami's Kitchen location near Nima Shell Filling Station, Accra"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}
