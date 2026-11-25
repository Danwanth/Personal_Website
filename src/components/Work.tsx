import type { ReactNode } from 'react'
import { work } from '../data/site'
import { Section } from './Section'

function Heading({ children }: { children: string }) {
  return <h3 className="label mb-2 mt-14 font-normal first:mt-0">{children}</h3>
}

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
    <li className="border-t border-rule py-6 sm:grid sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-x-6">
      <p className="font-mono text-xs text-muted sm:pt-1.5 sm:text-[0.8125rem]">{date}</p>
      <div className="mt-1 min-w-0 sm:mt-0">
        <h4 className="font-semibold leading-snug">{title}</h4>
        {sub && <p className="text-sm text-muted">{sub}</p>}
        {children}
      </div>
    </li>
  )
}

export function Work() {
  const { about, experience, education, also } = work
  return (
    <Section id="work" number="02" label="Work">
      <div className="max-w-[68ch] space-y-5">
        {about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-14">
        <Heading>Experience</Heading>
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

        <Heading>Education</Heading>
        <ol>
          <Entry
            date={education.date}
            title={`${education.degree}, ${education.school}`}
            sub={education.detail}
          />
        </ol>

        <Heading>Also</Heading>
        <ul className="border-t border-rule pt-6 text-muted">
          {also.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
