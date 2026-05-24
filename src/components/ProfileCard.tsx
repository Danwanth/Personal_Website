import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { profileBadges, socials } from '../data/portfolio';

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="
        relative flex h-full overflow-hidden
        rounded-[2rem] border border-white/10
        bg-white/[0.045] p-5 shadow-2xl
        backdrop-blur-2xl sm:p-6
      "
    >
      {/* Background decorations */}
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-volt/30" />
      <div className="absolute bottom-24 right-8 h-8 w-8 rotate-45 border border-ember/70" />

      <motion.div
        className="absolute left-8 top-16 h-5 w-5 rounded-full bg-volt"
        animate={{ y: [0, 14, 0], opacity: [0.9, 0.45, 0.9] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 flex w-full flex-col justify-between">
        {/* TOP CONTENT */}
        <div>
          {/* IMAGE CARD */}
          <div className="relative overflow-hidden rounded-[1.65rem] bg-graphite">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(199,255,47,0.14),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(249,109,55,0.22),transparent_35%)]" />

            <div className="relative w-full aspect-[4/5] sm:aspect-square">
              {/* Background */}
              <div className="absolute inset-0 z-0 grid place-items-center bg-gradient-to-br from-[#161616] via-black to-[#252015]">
                <span className="text-6xl font-black text-white/10">
                  DY
                </span>
              </div>

              {/* Profile image */}
              <img
                src="/profile-photo.png?v=20260524-1609"
                alt="Danwanth Yogesh"
                loading="eager"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.style.opacity = '0';
                }}
                className="relative z-10 h-full w-full object-cover"
              />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ember">
              AI/ML Engineer
            </p>

            <h1
              className="
                mt-3 font-display font-black tracking-normal text-white
                text-4xl sm:text-5xl lg:text-[3.5rem]
                leading-none
              "
            >
              Danwanth
              <br />
              Yogesh
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Computer Science undergraduate building intelligent
              applications, scalable systems, and polished digital
              experiences.
            </p>
          </div>

          {/* BADGES */}
          <div className="mt-5 flex flex-wrap gap-2">
            {profileBadges.map((badge) => (
              <span
                key={badge.label}
                className="
                  inline-flex items-center gap-2
                  rounded-full border border-white/10
                  bg-white/[0.05]
                  px-3 py-2 text-xs font-semibold
                  text-white/70
                "
              >
                <badge.icon size={14} className="text-volt" />
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="mt-8">
          {/* SOCIALS */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="
                  grid h-12 w-12 place-items-center
                  rounded-full border border-white/10
                  bg-white/[0.05]
                  text-white/70
                  transition duration-300
                  hover:-translate-y-1
                  hover:border-volt/50
                  hover:bg-volt
                  hover:text-black
                "
              >
                <social.icon size={19} />
              </a>
            ))}
          </div>

          {/* RESUME BUTTON */}
          <div className="mt-5">
            <a
              href="/Danwanth%20Yogesh%20Resume.pdf"
              download
              className="
                inline-flex w-full items-center
                justify-center gap-2 rounded-full
                bg-ember px-5 py-3 text-sm
                font-bold text-white shadow-glow
                transition duration-300
                hover:-translate-y-0.5
                hover:bg-white hover:text-black
              "
            >
              Download Resume
              <Download size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}