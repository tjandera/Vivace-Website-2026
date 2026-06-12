'use strict';

/*
 * models/events.js
 *
 * The three headline events shown on the Events / Calendar page.
 * Each entry maps to one event card in the template.
 *
 * picClass — matches a CSS class in events.css that sets the card's
 *   background illustration (p1, p2, p3).
 * admission — short string shown as the "ticket" badge: "Free entry",
 *   "Pre-book", or "Ticketed".
 */

module.exports = [
  {
    picClass: 'p1',
    day: '11',
    dayLabel: 'AUG · MON',
    wordmark: 'OPENING',
    title: 'Opening Day Showcase',
    time: '10:00 — 14:00',
    venue: 'SMU Concourse, L1',
    desc: 'Ribbon-cutting, school umbrella parade, free Vivace tote for first 500 attendees.',
    admission: 'Free entry',
  },
  {
    picClass: 'p2',
    day: '12',
    dayLabel: 'AUG · TUE',
    wordmark: 'TRY-OUTS',
    title: 'CCA Try-out Night',
    time: '17:00 — 21:00',
    venue: 'SOA Gym + Studios',
    desc: 'Six sports, four dance crews, one shot at making the team. Pre-booking recommended via the Explore page.',
    admission: 'Pre-book',
  },
  {
    picClass: 'p3',
    day: '13',
    dayLabel: 'AUG · WED',
    wordmark: 'FINALE',
    title: 'Closing Performance',
    time: '18:30 — 21:00',
    venue: 'SMUC Hall',
    desc: "The night every CCA shows off what they've been rehearsing all year. Ticketed, doors at 18:00.",
    admission: 'Ticketed',
  },
  {
    cardType: 'deals-flyer',
    starburst: 'LIMITED SPOTS!',
    badge: 'SMOO RUN',
    day: 'TBC',
    dayLabel: '2026',
    title: 'SMOO Run \'26',
    tagline: 'Run. Compete. Conquer.',
    time: 'TBC',
    venue: 'SMU Campus',
    desc: 'Lace up and hit the track — SMOO Run is back for 2026. Open to all SMU students. Details dropping soon.',
    admission: 'Free entry',
    accentColor: '#e84040',
  },
  {
    cardType: 'shelf-label',
    aisle: 'Aisle 08 · Arts',
    sku: 'VVC-ARTFEST-26',
    title: 'SMU Artfest \'26',
    tagline: 'Where creativity hits the shelves.',
    time: 'TBC',
    venue: 'SMU Campus',
    desc: 'A campus-wide celebration of student creativity — exhibitions, live art, music, and more. Mark your calendar.',
    admission: 'Free entry',
    accentColor: 'var(--pink)',
  },
];
