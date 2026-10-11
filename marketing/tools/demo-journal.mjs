// Builds a fictional demo journal for screenshots and videos.
// Every entry here is made up. Never point the marketing tools at a real journal.
//
//   node marketing/tools/demo-journal.mjs > demo.md

const DAYS = 150;
const today = new Date();
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// hand-written entries for the last few days, so the top of the notebook reads well on camera
const featured = [
  { ago: 0, time: '21:42', title: 'shipped the thing', mood: 'great', tags: ['work', 'wins'],
    body: 'Pushed the release at 18:03 and nothing caught fire.\n\n- [x] fix the date bug\n- [x] write the changelog\n- [ ] celebrate properly\n\n> commit message for today: `feat: finally trusted myself`' },
  { ago: 1, time: '07:15', title: 'morning pages', mood: 'okay', tags: ['morning'],
    body: 'Slept badly, but the coffee is good and the list is short.\n\nOne thing that would make today a win: **one hour of deep work before lunch.**' },
  { ago: 2, time: '22:05', title: 'the background process', mood: 'meh', tags: ['thoughts'],
    body: 'Something has been running in the background all week. I think it is the move.\n\nWriting it down makes it smaller.' },
  { ago: 3, time: '19:30', title: 'long run by the river', mood: 'good', tags: ['health'],
    body: '9 km, no headphones. Best ideas of the week came at km 6.' },
  { ago: 5, time: '23:10', title: 'changelog for this week', mood: 'good', tags: ['review'],
    body: '**Added** a Sunday walk.\n**Fixed** the habit of checking my phone first thing.\n**Removed** two meetings that should have been emails.' },
  { ago: 6, time: '20:20', title: 'dinner with Sam', mood: 'great', tags: ['people'],
    body: 'Laughed until it hurt. Note to self: call people more, text them less.' },
];

const fillerTitles = [
  ['quick one', 'okay', ['log']], ['standup with myself', 'good', ['work']], ['rainy tuesday', 'meh', ['log']],
  ['new book', 'good', ['reading']], ['debugging my sleep', 'rough', ['health']], ['small win', 'good', ['wins']],
  ['gym, finally', 'good', ['health']], ['too many tabs', 'meh', ['work']], ['sunday reset', 'great', ['review']],
  ['learned something', 'good', ['ideas']], ['call with mum', 'great', ['people']], ['refactoring the week', 'okay', ['review']],
];
const fillerBodies = [
  'Short entry today. Present and accounted for.',
  'Three things went well, one did not. Writing it down anyway.',
  'If today had a commit message: `chore: kept things running`.',
  'Noticed I was rushing. Slowed down. It helped.',
];

const entries = [];
for (const f of featured) entries.push(f);
let seed = 7;
const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
const used = new Set(featured.map(f => f.ago));
for (let ago = 0; ago < DAYS; ago++) {
  if (used.has(ago)) continue;
  // a believable rhythm: an unbroken recent streak, gaps further back
  const p = ago < 34 ? 1 : ago < 90 ? 0.6 : 0.4;
  if (rnd() > p) continue;
  const [title, mood, tags] = fillerTitles[Math.floor(rnd() * fillerTitles.length)];
  const h = 7 + Math.floor(rnd() * 15);
  entries.push({ ago, time: `${pad(h)}:${pad(Math.floor(rnd() * 60))}`, title, mood, tags, body: fillerBodies[Math.floor(rnd() * fillerBodies.length)] });
}
entries.sort((a, b) => b.ago - a.ago);

let out = '# Journal\n\n';
for (const e of entries) {
  const d = new Date(today); d.setDate(d.getDate() - e.ago);
  out += `## ${iso(d)} · ${e.time} — ${e.title}\nmood:: ${e.mood}\ntags:: ${e.tags.map(t => '#' + t).join(' ')}\n\n${e.body}\n\n---\n\n`;
}
process.stdout.write(out);
