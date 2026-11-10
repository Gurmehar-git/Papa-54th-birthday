/** ✏️ Editable words for the site. */
export const REASONS: string[] = [
  "You make everyone in a room feel welcome.",
  "Your laugh is impossible not to join.",
  "You work so hard, and never once make it about you.",
  "You always know when something is wrong, even when we say it's fine.",
  "You taught us that kindness is a strength.",
  "You show up — every single time.",
  "Your hugs fix things words can't.",
  "You keep your promises.",
  "You make the best decisions look easy.",
  "You give the kind of advice we only appreciate years later.",
  "You treat elders with such respect, and we learned it by watching you.",
  "You never let a festival pass without making it special.",
  "You carry the whole family's worries quietly.",
  "You have the softest heart behind the strongest shoulders.",
  "You're secretly the funniest person at every gathering.",
  "You still check if we've eaten.",
  "You believe in us before we believe in ourselves.",
  "You stay calm when everything else is chaos.",
  "You travel far, but you always bring the warmth home with you.",
  "Your phone calls end with 'take care' — and you mean it.",
  "You make sacrifices we're only beginning to understand.",
  "You forgive easily and love generously.",
  "You make ordinary evenings feel like celebrations.",
  "You're patient, even when we test that patience.",
  "You are the reason our home feels like home.",
  "You turn strangers into friends within minutes.",
  "You're proud of us, and you're not shy about it.",
  "You taught us the value of honest work.",
  "Your style — turbans perfectly tied, always.",
  "You make the dog feel like royalty.",
  "You listen, really listen.",
  "You give without keeping count.",
  "You stand tall in every family photo, holding us all together.",
  "You know how to make a tough day feel lighter.",
  "You love Mama in a way that shows us what love looks like.",
  "You never stop learning.",
  "You remember the little things we mention once.",
  "You've given us roots and wings.",
  "You lead by example, not by lecture.",
  "You find a way, always.",
  "You make us feel safe, no matter how old we get.",
  "Your forehead kisses are legendary.",
  "You bring people together around the table.",
  "You stay humble, no matter how much you achieve.",
  "You turn every 'I can't' into 'let's try.'",
  "You've made 54 years look like a masterpiece.",
  "You choose family, every single day.",
  "You have a smile that hasn't changed since your youngest photographs.",
  "You make long journeys so we never have to worry.",
  "You give the best blessings.",
  "You make us want to be better people.",
  "You're our biggest supporter in the front row of life.",
  "You are, quite simply, our hero.",
  "Because you're you — and there's no one else like you.",
];

export const SON_LETTER = `Dear Papa,

There are so many things I could thank you for.

For the sacrifices I probably never noticed.
For the moments you stood beside me.
For every time you believed in me.
For all the little things that became the biggest things in my life.

As I grow older, I realize that so much of who I am is because of you.

I hope you know how deeply you are loved, how much you are appreciated, and how lucky I feel to be your son.

And if I could live a thousand lives, I'd choose to be your son in every single one.

Happy 54th Birthday, Papa.

With all my love,
Your Son`;

/** Leave `body` empty to show "A letter waiting to be written". */
export const LETTERS = [
  { from: "From Your Son", seal: "S", body: "Papa — the long letter is waiting for you at the very end of this story. But here's the short version: thank you, for everything. I love you." },
];

export const TIMELINE = [
  { years: "1972 – 1984", title: "A Little Boy With Big Dreams", text: "It began on November 9, 1972. A little boy, a big family, and a whole life waiting to happen.", category: "Childhood", tone: 1, image: "childhoodPortrait" },
  { years: "The early years", title: "The Golden Years", text: "Two bottles raised and a grin for the camera.", category: "Young Adulthood", tone: 0.8, image: "goldenYears" },
  { years: "1995 – 2004", title: "Finding His Way", text: "Mountain roads, lakeside afternoons and a young man finding his path with quiet confidence.", category: "Young Adulthood", tone: 0.55, image: "hillsVintage" },
  { years: "2005 – 2015", title: "A Beautiful Family Story", text: "A home filled with festivals, laughter and the people he loves most.", category: "Family", tone: 0.25, image: "diwaliFamily" },
  { years: "2016 – 2026", title: "The Best Is Yet To Come", text: "Fifty-four years in, standing proud beside his family — and still writing the best chapters.", category: "Celebrations", tone: 0 },
] as const;
