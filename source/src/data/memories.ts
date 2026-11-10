/**
 * ✏️ EDIT YOUR MEMORIES HERE
 * Add, remove, reorder or re-categorise photos by editing this list.
 * - `image`: leave undefined to show an "add a photo" placeholder slot.
 * - `back`: the handwritten note on the back of the photo ("Turn Photo Over").
 * - `thenNowImage`: only set when you have a genuine paired photo.
 */

export type Category =
  | "Childhood"
  | "Young Adulthood"
  | "Family"
  | "Celebrations"
  | "Candid Moments";

export const CATEGORIES: ("All Memories" | Category)[] = [
  "All Memories",
  "Childhood",
  "Young Adulthood",
  "Family",
  "Celebrations",
  "Candid Moments",
];

export type Frame = "polaroid" | "editorial" | "vintage";

export interface Memory {
  id: string;
  title: string;
  year?: string;
  date?: string;
  category: Category;
  image?: string;
  caption: string;
  story?: string;
  location?: string;
  thenNowImage?: string;
  thenNowCaption?: string;
  audioUrl?: string;
  featured?: boolean;
  frame?: Frame;
  vintage?: boolean;
  back?: { title: string; note: string; date?: string };
}

export const IMAGES = {
  goldenYears: "./memories/photo-33.jpg",
  cabinPortrait: "./memories/photo-21.jpg",
  childhoodPortrait: "./memories/photo-10.jpg",
  bigFamily: "./memories/bigFamily.jpg",
  cakeVintage: "./memories/cakeVintage.jpg",
  diwaliFamily: "./memories/four-of-us.jpg",
  hillsVintage: "./memories/hillsVintage.jpg",
  lakeVintage: "./memories/lakeVintage.jpg",
  papaDaughter: "./memories/papaDaughter.jpg",
  papaMama: "./memories/papaMama.jpg",
  papaPup: "./memories/papaPup.jpg",
  yellowCelebration: "./memories/golden-day.jpg",
};

const slot = (n: number, category: Category): Memory => ({
  id: `slot-${n}`,
  title: "A memory waiting to be added",
  category,
  caption: "Add a photograph here",
});

export const MEMORIES: Memory[] = [
  {
    id: "mountain-road",
    title: "On Top of the World",
    year: "Young days",
    category: "Young Adulthood",
    image: IMAGES.hillsVintage,
    caption: "A walking stick, a camera, and the whole valley below.",
    story:
      "Long before the meetings and the flights, there was a young man resting on a mountain wall, already looking like he knew exactly where he was headed.",
    frame: "vintage",
    vintage: true,
    featured: true,
    thenNowImage: IMAGES.papaMama,
    thenNowCaption: "Different years. Same wonderful smile.",
    back: {
      title: "The Explorer",
      note: "Who knew this young traveller would one day become our whole world?",
    },
  },
  {
    id: "by-the-lake",
    title: "Effortlessly Cool",
    year: "Young days",
    category: "Young Adulthood",
    image: IMAGES.lakeVintage,
    caption: "The original main character pose.",
    story:
      "Boats on the water, a striped shirt, and a pose that says he had all the time in the world. Some style simply never goes out of fashion.",
    frame: "polaroid",
    vintage: true,
    back: {
      title: "Main Character Energy",
      note: "Proof that Papa has been the coolest person in every photograph since forever.",
    },
  },
  {
    id: "cake-celebration",
    title: "A Sweet Celebration",
    year: "Years ago",
    category: "Celebrations",
    image: IMAGES.cakeVintage,
    caption: "Surrounded by love — and cake, from every direction.",
    story:
      "Everyone reaching in to feed him a piece of cake at once. Some things never change: he has always been the centre of the family's love.",
    frame: "vintage",
    vintage: true,
    featured: true,
    back: {
      title: "Too Much Cake? Never.",
      note: "When everyone you love wants to feed you cake at the same time — that's how you know you're cherished.",
    },
  },
  {
    id: "diwali-family",
    title: "The Four of Us",
    year: "Diwali",
    category: "Family",
    image: IMAGES.diwaliFamily,
    caption: "Diyas lit, ladoos ready, everyone together.",
    story:
      "A festival evening at home — the lamps glowing, the table full, and all of us gathered around the person who holds this family together.",
    frame: "editorial",
    featured: true,
    back: {
      title: "Home",
      note: "Every festival is brighter with you in the middle of the picture.",
    },
  },
  {
    id: "papa-mama",
    title: "Partners in Everything",
    year: "2026",
    category: "Family",
    image: IMAGES.papaMama,
    caption: "Side by side, as always.",
    story: "Two people who built a whole world for us — and still stand together, smiling, through all of it.",
    frame: "polaroid",
    back: { title: "Side by Side", note: "The best team we know." },
  },
  {
    id: "papa-daughter",
    title: "A Father's Kiss",
    year: "2026",
    category: "Family",
    image: IMAGES.papaDaughter,
    caption: "Some hugs say more than any speech.",
    story: "A forehead kiss, a wide smile, and a moment that captures exactly what kind of father he is.",
    frame: "editorial",
    featured: true,
    back: { title: "Papa's Girl", note: "Safe, loved and always proud — that's what this hug feels like." },
  },
  {
    id: "papa-pup",
    title: "Best Friends",
    year: "2026",
    category: "Candid Moments",
    image: IMAGES.papaPup,
    caption: "Cheek to cheek with his favourite fluffball.",
    story: "Caught in the act of being completely, unashamedly soft. The tough exterior? Never stood a chance.",
    frame: "polaroid",
    back: { title: "Big Softie", note: "We always knew. Now we have photographic evidence." },
  },
  {
    id: "yellow-celebration",
    title: "Golden Day",
    year: "2026",
    category: "Celebrations",
    image: IMAGES.yellowCelebration,
    caption: "Dressed in sunshine, beaming with pride.",
    story: "A day of flowers, music and celebration — and Papa, standing tall and proud beside his family.",
    frame: "editorial",
    back: { title: "Proud Papa", note: "That smile says everything words can't." },
  },
  {
    id: "big-family",
    title: "The Whole Gang",
    year: "2026",
    category: "Celebrations",
    image: IMAGES.bigFamily,
    caption: "Three generations around one table.",
    story: "Family, friends and elders together — the kind of gathering Papa makes happen just by being there.",
    frame: "editorial",
    back: { title: "Full House", note: "The table is always fuller, and the laughter louder, when you're home." },
  },
  {
    "id": "slot-10",
    "title": "Little Papa",
    "category": "Childhood",
    "image": IMAGES.childhoodPortrait,
    "caption": "The little boy in the knitted sweater.",
    "frame": "vintage",
    "vintage": true,
    "featured": true,
    "thenNowImage": IMAGES.papaMama
  },
  slot(11, "Childhood"),
  slot(12, "Childhood"),
  {
    "id": "slot-16",
    "title": "Wrapped Up in the Hills",
    "category": "Young Adulthood",
    "image": "./memories/photo-16.jpg",
    "caption": "A shawl against the mountain air.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "slot-17",
    "title": "Up in Papa’s Arms",
    "category": "Family",
    "image": "./memories/photo-17.jpg",
    "caption": "A little hand on his shoulder.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "slot-18",
    "title": "Under the Trees",
    "category": "Family",
    "image": "./memories/photo-18.jpg",
    "caption": "Papa holding a little one beneath the trees.",
    "frame": "vintage",
    "vintage": true
  },
  slot(19, "Celebrations"),
  slot(20, "Celebrations"),
  {
    "id": "slot-21",
    "title": "A Seat in the Sky",
    "category": "Candid Moments",
    "image": "./memories/photo-21.jpg",
    "caption": "A quick selfie from the cabin.",
    "frame": "editorial",
    "year": "2026"
  },
  {
    "id": "slot-22",
    "title": "Behind the Wheel",
    "category": "Candid Moments",
    "image": "./memories/photo-22.jpg",
    "caption": "Afternoon light from the passenger seat.",
    "frame": "polaroid",
    "year": "2026"
  },
  slot(23, "Childhood"),
  {
    "id": "slot-24",
    "title": "A Quiet Hug",
    "category": "Family",
    "image": "./memories/photo-24.jpg",
    "caption": "A moment together before heading out.",
    "frame": "polaroid",
    "year": "2026"
  },
  {
    "id": "archive-25",
    "title": "The Mountain Walk",
    "category": "Young Adulthood",
    "image": "./memories/photo-25.jpg",
    "caption": "A group photo on the way up.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-26",
    "title": "In the Driver’s Seat",
    "category": "Young Adulthood",
    "image": "./memories/photo-26.jpg",
    "caption": "An open door and a glance back at the camera.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-27",
    "title": "Two in the Water",
    "category": "Young Adulthood",
    "image": "./memories/photo-27.jpg",
    "caption": "Two smiles above the waterline.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-28",
    "title": "Sitting Together",
    "category": "Family",
    "image": "./memories/photo-28.jpg",
    "caption": "A small gathering, saved in a worn print.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-29",
    "title": "Only the Eyes",
    "category": "Candid Moments",
    "image": "./memories/photo-29.jpg",
    "caption": "A face half hidden behind a shawl.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-30",
    "title": "Out for a Swim",
    "category": "Young Adulthood",
    "image": "./memories/photo-30.jpg",
    "caption": "Arms outstretched in the water.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-31",
    "title": "Around the Bed",
    "category": "Family",
    "image": "./memories/photo-31.jpg",
    "caption": "A family portrait with a well-worn edge.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-32",
    "title": "By the Stream",
    "category": "Young Adulthood",
    "image": "./memories/photo-32.jpg",
    "caption": "A pause among the rocks.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-33",
    "title": "A Bottle in Each Hand",
    "category": "Candid Moments",
    "image": "./memories/photo-33.jpg",
    "caption": "A grin and a little show for the camera.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-34",
    "title": "Where the River Runs",
    "category": "Young Adulthood",
    "image": "./memories/photo-34.jpg",
    "caption": "A walking stick and a seat among the rocks.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-35",
    "title": "Out in the Field",
    "category": "Young Adulthood",
    "image": "./memories/photo-35.jpg",
    "caption": "Two figures against the hills.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-36",
    "title": "Taking It Easy",
    "category": "Candid Moments",
    "image": "./memories/photo-36.jpg",
    "caption": "A candid from the old prints.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-37",
    "title": "A Break on the Balcony",
    "category": "Young Adulthood",
    "image": "./memories/photo-37.jpg",
    "caption": "Three companions and a view of the valley.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-38",
    "title": "Among the Flowers",
    "category": "Family",
    "image": "./memories/photo-38.jpg",
    "caption": "A little one in Papa’s arms, surrounded by pots of flowers.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-39",
    "title": "A Moment at the Table",
    "category": "Family",
    "image": "./memories/photo-39.jpg",
    "caption": "Papa holding a little one while everyone sits together.",
    "frame": "vintage",
    "vintage": true
  },
  {
    "id": "archive-40",
    "title": "In Front of the Palace",
    "category": "Candid Moments",
    "image": "./memories/photo-40.jpg",
    "caption": "A portrait between the two cannons.",
    "frame": "polaroid",
    "year": "2026"
  },
  {
    "id": "archive-41",
    "title": "Together at the Ceremony",
    "category": "Family",
    "image": "./memories/couple-ceremony.jpg",
    "caption": "An illustrated portrait of Papa and Mama at the ceremony.",
    "frame": "editorial",
    "year": "2026"
  },
  {
    "id": "archive-42",
    "title": "By the Waterfall",
    "category": "Family",
    "image": "./memories/couple-waterfall.jpg",
    "caption": "An illustrated portrait of Papa and Mama by the waterfall.",
    "frame": "polaroid",
    "year": "2026"
  },
  {
    "id": "archive-43",
    "title": "Before the Flight",
    "category": "Family",
    "image": "./memories/photo-43.jpg",
    "caption": "A photo together beneath the lounge lights.",
    "frame": "editorial",
    "year": "2026"
  },
];

export const filled = (list: Memory[]) => list.filter((m) => !!m.image);

/** Optional background music: drop a licensed audio URL here. */
export const MUSIC_URL = "";
