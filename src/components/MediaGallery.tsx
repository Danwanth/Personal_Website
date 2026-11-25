export interface MediaItem {
  kind: 'image' | 'video'
  src: string
  alt: string
  caption: string
}

// Rotation/offset per card, back to front. The top card is the cover.
const CARD_POSE = [
  '-translate-x-2 -rotate-[10deg] group-hover:-translate-x-5 group-hover:-rotate-[16deg] group-data-[open=true]:-translate-x-5 group-data-[open=true]:-rotate-[16deg]',
  'translate-x-2 rotate-[8deg] group-hover:translate-x-5 group-hover:rotate-[14deg] group-data-[open=true]:translate-x-5 group-data-[open=true]:rotate-[14deg]',
  '-rotate-[2deg] group-hover:-translate-y-1 group-hover:rotate-0 group-data-[open=true]:-translate-y-1 group-data-[open=true]:rotate-0',
]

/**
 * A small pile of instant-photo style cards under an entry's date, with the
 * cover photo on top. It is the toggle for the gallery: hover fans it out,
 * click opens or closes the full set below the entry.
 */
export function MediaStack({
  id,
  cover,
  items,
  open,
  onToggle,
}: {
  id: string
  cover?: string
  items: readonly MediaItem[]
  open: boolean
  onToggle: () => void
}) {
  const images = items.filter((m) => m.kind === 'image')
  const top = images.find((m) => m.src === cover) ?? images[0]
  const behind = images.filter((m) => m !== top).slice(0, 2)
  const cards = [...behind, top].filter(Boolean) as MediaItem[]
  const poses = CARD_POSE.slice(CARD_POSE.length - cards.length)

  const photos = images.length
  const videos = items.length - photos
  const summary = [
    `${photos} photo${photos === 1 ? '' : 's'}`,
    videos ? `${videos} video${videos === 1 ? '' : 's'}` : '',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <button
      type="button"
      className="group mt-5 block text-left"
      data-open={open}
      aria-expanded={open}
      aria-controls={id}
      aria-label={open ? 'Hide photos' : `Show ${summary}`}
      onClick={onToggle}
    >
      <span className="relative ml-3 block h-[7.5rem] w-[5.75rem]">
        {cards.map((m, i) => (
          <span
            key={m.src}
            aria-hidden="true"
            className={`absolute inset-0 border border-ink/20 bg-[var(--ball-fill)] p-[3px] pb-[9px] transition-transform duration-200 ease-out motion-reduce:transition-none ${poses[i]}`}
          >
            <img src={m.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </span>
        ))}
      </span>
      <span className="label mt-4 block whitespace-nowrap group-hover:text-accent">{open ? 'Hide photos' : summary}</span>
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
