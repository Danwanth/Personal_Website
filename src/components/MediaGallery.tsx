export interface MediaItem {
  kind: 'image' | 'video'
  src: string
  alt: string
  caption: string
}

/** The toggle that sits under an entry's date. */
export function MediaToggle({
  id,
  count,
  open,
  onToggle,
}: {
  id: string
  count: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      className="text-button mt-3 block font-mono text-xs sm:text-[0.8125rem]"
      aria-expanded={open}
      aria-controls={id}
      onClick={onToggle}
    >
      {open ? '− Hide photos' : `+ Photos (${count})`}
    </button>
  )
}

/** Photos and video from an internship. Only rendered (and loaded) once opened. */
export function MediaGallery({ id, items }: { id: string; items: readonly MediaItem[] }) {
  return (
    <div id={id} className="mt-6 grid max-w-[42rem] grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
      {items.map((m) => (
        <figure key={m.src} className={m.kind === 'video' ? 'col-span-full min-w-0' : 'min-w-0'}>
          {m.kind === 'image' ? (
            <a href={m.src} target="_blank" rel="noreferrer" className="block border border-rule">
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
            </a>
          ) : (
            <video
              src={`${m.src}#t=1`}
              aria-label={m.alt}
              controls
              playsInline
              preload="metadata"
              className="block w-full border border-rule bg-ink"
            />
          )}
          {m.caption && (
            <figcaption className="mt-2 font-mono text-xs leading-relaxed text-muted">{m.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
