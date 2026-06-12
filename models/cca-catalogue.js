'use strict';

/*
 * models/cca-catalogue.js
 *
 * Generates the full list of CCA objects that powers the Explore page,
 * search, and individual CCA detail pages.
 *
 * Rather than maintaining ~120 CCA entries by hand, the catalogue is built
 * from three smaller lookup tables:
 *
 *   categories          — metadata shared by every CCA in a school umbrella
 *   commitmentByCluster — how often each activity type typically meets
 *   groups              — the actual CCA names, linked to a category + cluster
 *
 * The flatMap at the bottom joins them into individual CCA objects, each with
 * a URL slug, booth number, and all the display fields the templates need.
 *
 * To add a new CCA: find the matching group entry and add the name to its
 * names array. Everything else (booth number, slug, colour, etc.) is derived
 * automatically.
 */

const categories = {
  acf: {
    short: 'ACF',
    name: 'Arts & Cultural Fraternity',
    color: 'var(--red)',
    tone: 'tone-acf',
    icon: 'AC',
    images: ['/assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_ACF.png'],
    intake: 'Open / Auditions',
    badge: 'hot',
  },
  smux: {
    short: 'SMU-X',
    name: 'SMUXploration Crew',
    color: 'var(--blue)',
    tone: 'tone-smux',
    icon: 'X',
    images: ['/assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_SMUX.png'],
    intake: 'Open',
    badge: '',
  },
  ssu: {
    short: 'SSU',
    name: 'SMU Sports Union',
    color: 'var(--yellow)',
    tone: 'tone-ssu',
    icon: 'SP',
    images: ['/assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_SSU.png'],
    intake: 'Open / Trials',
    badge: 'hot',
  },
  sics: {
    short: 'SICS',
    name: 'Special Interest & Community Service Sodality',
    color: 'var(--green)',
    tone: 'tone-sics',
    icon: 'SI',
    images: ['/assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_SICS.png'],
    intake: 'Open',
    badge: '',
  },
  icon: {
    short: 'ICON',
    name: 'International Connections',
    color: 'var(--orange)',
    tone: 'tone-icon',
    icon: 'IN',
    images: ['/assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_ICON.png'],
    intake: 'Open',
    badge: '',
  },
  acad: {
    short: 'ACADEMIC',
    name: 'Academic Societies',
    color: 'var(--mint)',
    tone: 'tone-acad',
    icon: 'ED',
    images: ['/assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_ACAD.png'],
    intake: 'Open',
    badge: '',
  },
  gri: {
    short: 'GRI',
    name: 'Governance, Registered & Independent Clubs',
    color: 'var(--pink)',
    tone: 'tone-gri',
    icon: 'GR',
    images: ['/assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_GRI.png'],
    intake: 'Open / Recruitment',
    badge: 'new',
  },
};

const commitmentByCluster = {
  'Dance':                          'Weekly',
  'Music':                          'Weekly',
  'Literary Arts':                  'Flexible',
  'Theatre and Media':              'Project-based',
  'Visual Arts':                    'Flexible',
  'Adventure Sports':               'Trip-based',
  'Ball Sports':                    'Weekly',
  'Racket Sports':                  'Weekly',
  'Martial Arts':                   'Weekly',
  'Water Sports':                   'Weekly',
  'Other Sports':                   'Weekly',
  'Lifestyle':                      'Flexible',
  'Personal Development':           'Flexible',
  'Social Gaming':                  'Flexible',
  'Community Service':              'Project-based',
  'Social Causes':                  'Project-based',
  'International Community':        'Flexible',
  'Business and Management':        'Flexible',
  'Accountancy':                    'Flexible',
  'Computing and Information Systems': 'Flexible',
  'Economics':                      'Flexible',
  'Social Sciences':                'Flexible',
  'Law':                            'Flexible',
  'Governance and Registered Clubs':'Flexible',
  'Institutes':                     'Flexible',
};

const groups = [
  { category: 'acf',  cluster: 'Dance',           names: ['Ardiente', 'Ballare', 'Eurhythmix', 'Funk Movement', 'Caderas Latinas', 'Indancity'] },
  { category: 'acf',  cluster: 'Music',            names: ['Chamber Choir', 'Chinese Orchestra (SMUCO)', 'SMU Guitarissimo', 'SoundFoundry', 'Samba Masala', 'Ivory Keys', 'Stereometa', 'Symphonia', 'Voix'] },
  { category: 'acf',  cluster: 'Literary Arts',    names: ['SMU Literati'] },
  { category: 'acf',  cluster: 'Theatre and Media',names: ['Broadcast and Entertainment', 'Stageit'] },
  { category: 'acf',  cluster: 'Visual Arts',      names: ['Artdicted', 'SMUSAIC (Photography)'] },

  { category: 'smux', cluster: 'Adventure Sports', names: ['Biking', 'Diving', 'Kayaking', 'Skating', 'Trekking', 'Xseed (Board Sports)'] },

  { category: 'ssu',  cluster: 'Ball Sports',      names: ['Basketball', 'Bowling', 'Floorball', 'Football', 'Handball', 'Netball', 'Rugby', 'Softball', 'Tchoukball', 'Volleyball'] },
  { category: 'ssu',  cluster: 'Racket Sports',    names: ['Badminton', 'Squash', 'Table Tennis', 'Tennis'] },
  { category: 'ssu',  cluster: 'Martial Arts',     names: ['Aikido', 'Judo', 'Kendo', 'MMA', 'Muay Thai', 'Taekwondo', 'Wushu'] },
  { category: 'ssu',  cluster: 'Water Sports',     names: ['Aquathlon', 'Aquatic Sharks', 'Dragon Boat', 'Sailing'] },
  { category: 'ssu',  cluster: 'Other Sports',     names: ['Archery', 'Athletics', 'Climb Team', 'Cuesports', 'Fencing', 'Golf', 'Ultimate Frisbee'] },

  { category: 'sics', cluster: 'Lifestyle',          names: ['Recreational Fishing', 'SMU Wine Appreciation Club', 'SMU Gourmet Club', 'SMU Barworks', 'SMU Fitnessworks'] },
  { category: 'sics', cluster: 'Personal Development',names: ['SMU Toastmasters', 'SMU Debating Society', 'SMU Thrive Social Consulting', 'SMU AIESEC', 'SMU Start Up Society'] },
  { category: 'sics', cluster: 'Social Gaming',       names: ['SMU Strategica', 'SMU Intellectual Sports', 'SMU eSport'] },
  { category: 'sics', cluster: 'Community Service',   names: ['SMU Youth Mentors', 'SMU Caretalyst', 'SMU Ember', 'SMU Red Cross', 'SMU Rotaract', 'SMU Uni-Y'] },
  { category: 'sics', cluster: 'Social Causes',       names: ['SMU Verts', "SMU Women's Connection", 'SMU People for Animal Welfare'] },

  { category: 'icon', cluster: 'International Community', names: ['Aspara Cambodia', 'Barkada', 'Francophiles', 'Connect China', 'Japanese Cultural Club', 'Roots', 'Kommunitas Indonesia', 'Woori Sayi', 'Yin Siam', 'Truly Malaysia', 'Myanmar Community', 'Indian Cultural Society', 'Chao Vietnam', 'Al Khaleej'] },

  { category: 'acad', cluster: 'Business and Management',         names: ['Business Society (BONDUE)', 'Cognitare', 'Communication Management Society (CMS)', 'EYE Investment', 'Maritime Merchants Society', 'Marketing Society (SMARKETING)', 'Operations Management Society (OMS)', 'OBHR Society', 'Quantitative Finance Society (Q.E.D)', 'Real Estate & Alternative Investments (SMU REAL)'] },
  { category: 'acad', cluster: 'Accountancy',                     names: ['Accounting Society (ASoc)', 'Emerging Markets', 'Financial Advisory and Compliance Team (FACT)', 'Tax Society', 'SoA Outreach'] },
  { category: 'acad', cluster: 'Computing and Information Systems',names: ["SCIS Students' Society (Ellipsis)", 'SMU.hack', 'Product Club', 'Whitehat Society', 'Women in Tech'] },
  { category: 'acad', cluster: 'Economics',                       names: ['Economics Society (OIKOS)', 'Actuarial Science Club', 'Data Science and Analytics Society', 'Economics Intelligence Club', 'Health Economics & Management Society (HEM)'] },
  { category: 'acad', cluster: 'Social Sciences',                 names: ['Social Sciences Society (SOSCIETY)', 'Psychology Society'] },
  { category: 'acad', cluster: 'Law',                             names: ['Law Society (The Bar)', 'Constitutional Law and Criminal Justice Club (CCJC)', 'Corporate and Commercial Law Club (COCO)', 'Environment & Sustainability Law Club', 'Law International Relations Club', 'Law Outreach', 'Law Sports and Recreation Club', 'Legal Innovation and Technology (LIT)', 'Lexicon', 'Media and Negotiation Club (SMNC)', 'CIS (inCISive)'] },

  { category: 'gri',  cluster: 'Governance and Registered Clubs', names: ['Apolitical Society', 'Ambassadorial Corps', 'Bizcom', 'Career Champions', 'Growth-X Consulting', 'Peer Helpers', 'Student Council of Discipline (SCD)', 'SMUSA', 'The Blue and Gold (TBAG)', 'The Mentoring Circle', 'Christian Fellowship', 'CRU', 'Dhamma Circle', 'FIDES', 'Muslim Society', 'Sikh Society'] },
  { category: 'gri',  cluster: 'Institutes',                      names: ['Asia Private Equity Club (APECS)', 'Artificial Intelligence Club', 'Blockchain Club', 'Business Intelligence & Analytics (BIA)', 'Civil Defence Lionhearter Chapter', 'Eagles Inc.', 'FinLIT Programme', 'FinTech Club', 'SMU Purple', 'Mentorship Committee', 'Smart City Society', 'Social Impact Catalyst (SIC)', 'Sustainable Investment Club'] },
];

// Turns a CCA name into a URL-safe slug. The `used` map deduplicates slugs
// when two CCAs would otherwise produce the same string (e.g. two clubs
// both called "Law Society" in different umbrella groups).
function slugify(name, used) {
  const base = name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const count = used.get(base) || 0;
  used.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

const mapLanes = {
  acf:  { zone: 'Aisle A — Arts Market',      y: 18 },
  smux: { zone: 'Aisle B — Adventure Depot',  y: 29 },
  ssu:  { zone: 'Aisle C — Sports Court',     y: 40 },
  sics: { zone: 'Aisle D — Service Street',   y: 51 },
  icon: { zone: 'Aisle E — Global Lane',      y: 62 },
  acad: { zone: 'Aisle F — School Row',       y: 73 },
  gri:  { zone: 'Aisle G — Growth Arcade',    y: 84 },
};

function makeKeyEvents(name, cluster) {
  return [
    `${name} Vivace Booth Introduction`,
    `${cluster} Welcome Session`,
    'Freshmen Meet-and-Greet',
  ];
}

function makeSocials(id) {
  const handle = '@' + id.replace(/-/g, '');
  return [
    { label: 'Instagram', value: handle,               href: '#' },
    { label: 'Telegram',  value: 'Join interest chat', href: '#' },
    { label: 'Email',     value: 'vivace@smu.edu.sg',  href: 'mailto:vivace@smu.edu.sg' },
  ];
}

function makeSessionDetails(commitment, cluster) {
  return {
    frequency: commitment,
    format:    `${cluster} sessions with beginner-friendly onboarding and member-led activities.`,
    venue:     'Venue TBC during Vivace',
    note:      'Final session timing, venue and trial dates can be updated once the CCA submits confirmed details.',
  };
}

function makeMembershipDetails(intake) {
  return {
    howToJoin: [
      'Visit the booth during Vivace.',
      'Scan the CCA interest form or QR code.',
      'Attend the welcome session, trial or interview if required.',
    ],
    requirements: intake,
    contact:      'vivace@smu.edu.sg',
  };
}

function makeAchievements(name, cluster) {
  return [
    { title: `${cluster} Inter-University Champion`, year: 'TBC', desc: 'Achievement details can be added once confirmed by the CCA.' },
    { title: `${name} Best Booth Award`, year: 'TBC', desc: 'Achievement details can be added once confirmed by the CCA.' },
    { title: 'SMU Student Choice Recognition', year: 'TBC', desc: 'Achievement details can be added once confirmed by the CCA.' },
  ];
}

function makeFaq(name, commitment) {
  return [
    {
      question: 'Do I need prior experience?',
      answer:   `${name} can use this answer to clarify whether beginners are welcome, whether auditions are needed, and what new members should prepare.`,
    },
    {
      question: 'How often are sessions held?',
      answer:   `Current placeholder frequency: ${commitment}. Replace this with the final training, meeting or project cadence.`,
    },
    {
      question: 'How do I join?',
      answer:   'Submit interest during Vivace and follow the CCA-specific sign-up, trial, interview or onboarding instructions.',
    },
  ];
}

const usedSlugs   = new Map();
const catCounters = {};

const ccas = groups.flatMap(group => {
  const meta = categories[group.category];
  return group.names.map(name => {
    catCounters[group.category] = (catCounters[group.category] || 0) + 1;
    const boothIdx   = catCounters[group.category];
    const boothNum   = String(boothIdx).padStart(3, '0');
    const commitment = commitmentByCluster[group.cluster] || 'Flexible';
    const id         = slugify(name, usedSlugs);
    const lane       = mapLanes[group.category];
    const shelfIndex = (boothIdx - 1) % 9;
    const blockIndex = Math.floor((boothIdx - 1) / 9) + 1;
    return {
      id,
      name,
      category:     group.category,
      categoryShort:meta.short,
      categoryName: meta.name,
      cluster:      group.cluster,
      color:        meta.color,
      tone:         meta.tone,
      icon:         meta.icon,
      booth:        `${meta.short}-${boothNum}`,
      commitment,
      intake:       meta.intake,
      badge:        meta.badge,
      images:       meta.images,
      cardText:     `${group.cluster} pick under ${meta.short}. Visit the booth to learn more and sign up.`,
      description:  `${name} is part of SMU's ${meta.name} (${meta.short}) umbrella, within the ${group.cluster} cluster. This is a great opportunity to get involved on campus and build lasting connections.`,
      extra:        `Commitment level: ${commitment}. Intake: ${meta.intake}. Come by the Vivace booth during the fair or reach out via the interest form below.`,
      videoUrl:     null,
      videoTitle:   '',
      boothMap: {
        zone:  lane.zone,
        block: `Block ${blockIndex}`,
        x:     10 + shelfIndex * 9.5,
        y:     lane.y,
        note:  `${group.cluster} shelf near ${lane.zone}`,
      },
      keyEvents:         makeKeyEvents(name, group.cluster),
      socials:           makeSocials(id),
      sessionDetails:    makeSessionDetails(commitment, group.cluster),
      membershipDetails: makeMembershipDetails(meta.intake),
      achievements:      makeAchievements(name, group.cluster),
      faq:               makeFaq(name, commitment),
    };
  });
});

module.exports = ccas;
