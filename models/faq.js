'use strict';

/*
 * models/faq.js
 *
 * Q&A pairs rendered as an accordion on the /faq page.
 * Set open: true on a question to have it expanded by default —
 * handy for the most common question so it's visible immediately.
 */

module.exports = [
  {
    num: '01',
    question: 'When and where is Vivace 2026?',
    answer: '13 — 14 August 2026, 10:00 to 18:00 daily, at the SMU Concourse (Connexion, level 1). Closing performance on the 14th moves to SMUC Hall.',
    open: true,
  },
  {
    num: '02',
    question: 'Do I need to register beforehand?',
    answer: 'Walk-ins are welcome — but registering with your matric ID gets you the loyalty card and pre-booked try-out slots for over-subscribed CCAs.',
  },
  {
    num: '03',
    question: 'How do I sign up for a CCA?',
    answer: 'Tap any CCA card → go to the booth → scan the QR. Audition / try-out CCAs will email you a slot within 48 hours.',
  },
  {
    num: '04',
    question: 'Can I join more than one CCA?',
    answer: 'Yes — and we encourage it. A typical SMU student fills their basket with two or three. Schedules are coordinated by SSU.',
  },
  {
    num: '05',
    question: 'Are non-SMU friends allowed?',
    answer: 'The fair is open to the public. CCA membership itself is SMU-only with a few exceptions — check each booth.',
  },
  {
    num: '06',
    question: 'Where do I redeem partner deals?',
    answer: 'At the partner outlets directly during the event window. Flash matric card + the deal screen from this site.',
  },
];
