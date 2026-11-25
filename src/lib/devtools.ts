import { eggs } from '../data/site'

// Two styled lines for anyone who opens DevTools. Nothing else is logged.
export function devtoolsGreeting(): void {
  console.log(`%c${eggs.devtools[0]}`, 'font: 700 15px/1.4 monospace')
  console.log(`%c${eggs.devtools[1]}`, 'font: 12px/1.4 monospace; color: #888')
}
