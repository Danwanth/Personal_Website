import { readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Injects the head boilerplate every page shares, so each HTML entry only
// carries its own title, description, canonical and og:title/description/url.
function sharedHead(): Plugin {
  const themeInit = readFileSync(new URL('./src/head/theme-init.js', import.meta.url), 'utf8')
  return {
    name: 'shared-head',
    transformIndexHtml() {
      return [
        // Runs first so the theme is set before anything paints.
        { tag: 'script', children: themeInit, injectTo: 'head-prepend' },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }, injectTo: 'head' },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#F3EFE6', media: '(prefers-color-scheme: light)' },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#121110', media: '(prefers-color-scheme: dark)' },
          injectTo: 'head',
        },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Danwanth Yogesh' }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' }, injectTo: 'head' },
        {
          tag: 'noscript',
          children:
            '<p style="padding: 1.25rem; font-family: sans-serif">Danwanth Yogesh. I build machine learning models and the software around them. Email: danwanthyog@gmail.com. <a href="/resume.pdf">Resume</a>. <a href="/">Home</a> · <a href="/work">Work</a> · <a href="/projects">Projects</a> · <a href="/skills">Skills</a> · <a href="/play">Play</a> · <a href="/about">About</a></p>',
          injectTo: 'body-prepend',
        },
      ]
    },
  }
}

// Multi-page build: one HTML entry per page (clean URLs on Vercel) plus the
// Offside 404 page.
export default defineConfig({
  plugins: [sharedHead(), react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        work: 'work/index.html',
        projects: 'projects/index.html',
        skills: 'skills/index.html',
        play: 'play/index.html',
        about: 'about/index.html',
        notfound: '404.html',
      },
    },
  },
})
