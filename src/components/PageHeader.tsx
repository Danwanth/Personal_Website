// The top of every subpage: mono label, big condensed title, one intro sentence.
export function PageHeader({ label, title, intro }: { label: string; title: string; intro: string }) {
  return (
    <header className="wrap pb-12 pt-8 lg:pb-14 lg:pt-12">
      <p className="label">{label}</p>
      <h1 className="display mt-3 text-[clamp(2.75rem,9vw,5.5rem)]">{title}</h1>
      <p className="mt-6 max-w-[48ch] text-[1.25rem] leading-snug">{intro}</p>
    </header>
  )
}
