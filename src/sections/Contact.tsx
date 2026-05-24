import { ArrowUpRight, Linkedin, Mail, MapPin } from 'lucide-react';
import { Section } from '../components/Section';
import { socials } from '../data/portfolio';

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something sharp.">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/22 p-6">
          <p className="max-w-xl text-lg leading-8 text-white/68">
            Available for AI/ML engineering opportunities, software development roles,
            and ambitious product collaborations.
          </p>
          <a
            href="https://linkedin.com/in/danwanth"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 text-sm font-black text-black transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            <Linkedin size={18} />
            Connect on LinkedIn
          </a>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ember text-white">
              <MapPin size={18} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/42">
                Location
              </p>
              <p className="mt-1 font-bold text-white">Kochi, Kerala</p>
            </div>
          </div>
          <a
            href="mailto:danwanthyog@gmail.com"
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white/78 transition duration-300 hover:border-volt/45 hover:bg-white/[0.07] hover:text-white"
          >
            <span className="inline-flex items-center gap-3 font-bold">
              <Mail size={19} className="text-volt" />
              danwanthyog@gmail.com
            </span>
            <ArrowUpRight size={18} />
          </a>
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-white/78 transition duration-300 hover:border-volt/45 hover:bg-white/[0.07] hover:text-white"
            >
              <span className="inline-flex items-center gap-3 font-bold">
                <social.icon size={19} className="text-volt" />
                {social.label}
              </span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
