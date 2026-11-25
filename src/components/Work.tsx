import type { ReactNode } from 'react'
import { profile, work } from '../data/site'
import { ExtLink } from './ExtLink'
import { Section } from './Section'

function Entry({
  date,
  title,
  sub,
  children,
}: {
  date: string
  title: string
  sub?: string
  children?: ReactNode
}) {
  return (
    <li className="border-t border-rule py-6 first:border-t-0 first:pt-0 sm:grid sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-x-6">
      <p className="font-mono text-xs text-muted sm:pt-1.5 sm:text-[0.8125rem]">{date}</p>
      <div className="mt-1 min-w-0 sm:mt-0">
        <h3 className="font-semibold leading-snug">{title}</h3>
        {sub && <p className="text-sm text-muted">{sub}</p>}
        {children}
      </div>
    </li>
  )
}

export function Work() {
  const { experience, education, also } = work
  return (
    <>
      <Section id="experience" number="01" label="Experience">
        <ol>
          {experience.map((job) => (
            <Entry
              key={job.company}
              date={job.date}
              title={`${job.role}, ${job.company}`}
              sub={job.place}
            >
              <ul className="mt-3 max-w-[68ch] list-disc space-y-2 pl-5 marker:text-muted">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Entry>
          ))}
        </ol>
      </Section>

      <Section id="education" number="02" label="Education">
        <ol>
          <Entry
            date={education.date}
            title={`${education.degree}, ${education.school}`}
            sub={education.detail}
          />
        </ol>
      </Section>

      <Section id="awards" number="03" label="Awards & certifications">
        <ul className="space-y-2">
          {also.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="resume" number="04" label="Resume">
        <p className="font-mono text-sm">
          <ExtLink href={profile.resume}>Download resume (PDF)</ExtLink>
        </p>
      </Section>
    </>
  )
}
