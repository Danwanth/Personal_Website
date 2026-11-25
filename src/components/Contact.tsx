import { useEffect, useRef, useState } from 'react'
import { contact, profile } from '../data/site'
import { ExtLink } from './ExtLink'
import { Section } from './Section'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback for contexts without the async clipboard API.
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      try {
        document.execCommand('copy')
      } catch {
        /* nothing more to try */
      }
      area.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button type="button" onClick={copy} className="text-button" aria-live="polite">
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export function Contact() {
  return (
    <Section id="contact" number="07" label="Contact">
      <p className="max-w-[68ch]">{contact.line}</p>
      <p className="mt-5">
        <a
          href={`mailto:${profile.email}`}
          className="link break-all font-display text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight [font-stretch:75%]"
        >
          {profile.email}
        </a>
      </p>
      <p className="mt-3">
        <CopyButton text={profile.email} />
      </p>
      <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
        <ExtLink href={profile.linkedin}>LinkedIn</ExtLink>
        <ExtLink href={profile.github}>GitHub</ExtLink>
        <ExtLink href={profile.instagram}>Instagram</ExtLink>
        <span className="text-muted">{contact.place}</span>
      </p>
    </Section>
  )
}
