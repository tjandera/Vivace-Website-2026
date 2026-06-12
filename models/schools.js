'use strict';

/*
 * models/schools.js
 *
 * The seven school umbrellas that organise every CCA at Vivace.
 * This array is the single source of truth — it drives the basket
 * hero on the home page, the filter chips on the explore page,
 * and the aisle labels throughout the site.
 *
 * Field reference:
 *   id            — URL slug used in /explore/:id routes
 *   name          — short display name (chip labels, aisle tags)
 *   fullName      — full official name shown under the basket item
 *   color         — CSS custom property for the school's brand colour
 *   count         — approximate number of CCAs under this umbrella
 *   aisle         — human-readable aisle label shown on hover
 *   basket.img    — path to the basket-goods PNG sitting in the hero
 *   basket.modifierClass — extra class for per-item CSS tweaks (scale, etc.)
 *   basket.style  — inline positioning for that item inside the basket scene
 */

module.exports = [
  {
    id: 'acf',
    name: 'ACF',
    fullName: 'SMU Arts & Cultural Fraternity',
    icon: 'AC',
    color: '--red',
    count: 18,
    aisle: 'Aisle 01 · Arts shelf',
    description: 'SMU\'s creative arts community — dance, music, theatre, visual arts, and literary clubs united by a shared passion for performance, culture, and creative expression on campus.',
    basket: {
      img: 'assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_ACF.png',
      modifierClass: '',
      style: 'left:16%; top:10%; --r:-8deg; width:30%',
    },
  },
  {
    id: 'sics',
    name: 'SICS',
    fullName: 'Special Interest & Community Service Sodality',
    icon: 'SI',
    color: '--green',
    count: 24,
    aisle: 'Aisle 02 · Comm shelf',
    description: 'A diverse cluster of lifestyle, personal development, social gaming, community service, and social cause clubs — building a better campus and a more connected world beyond it.',
    basket: {
      img: 'assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_SICS.png',
      modifierClass: '',
      style: 'left:56%; top:10%; --r:7deg;  width:30%',
    },
  },
  {
    id: 'icon',
    name: 'ICON',
    fullName: 'SMU International Connections',
    icon: 'IN',
    color: '--orange',
    count: 9,
    aisle: 'Aisle 03 · Global shelf',
    description: 'Connecting cultures across campus — international community clubs celebrating global backgrounds, fostering cross-cultural friendships, and making every student feel at home at SMU.',
    basket: {
      img: 'assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_ICON.png',
      modifierClass: 'icon-good',
      style: 'left:33%; top:28%; --r:-5deg;  width:34%',
    },
  },
  {
    id: 'smux',
    name: 'SMUX',
    fullName: 'SMUXploration Crew',
    icon: 'X',
    color: '--blue',
    count: 26,
    aisle: 'Aisle 04 · Sports shelf',
    description: 'Adventure sport clubs for the bold — from biking and diving to skating, kayaking, and trekking. SMUXploration Crew is for students who find their thrills beyond the beaten track.',
    basket: {
      img: 'assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_SMUX.png',
      modifierClass: 'smux-can',
      style: 'left:16%; top:46%; --r:10deg;  width:30%',
    },
  },
  {
    id: 'ssu',
    name: 'SSU',
    fullName: 'SMU Sports Union',
    icon: 'SP',
    color: '--yellow',
    count: 12,
    aisle: 'Aisle 05 · Service shelf',
    description: 'SMU\'s competitive sporting backbone — ball sports, racket sports, martial arts, water sports, and more. SSU clubs compete at inter-university level and welcome students of all skill levels.',
    basket: {
      img: 'assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_SSU.png',
      modifierClass: 'ssu-good',
      style: 'left:58%; top:46%; --r:8deg;  width:28%',
    },
  },
  {
    id: 'gri',
    name: 'GRI',
    fullName: 'Governance, Registered & Independents',
    icon: 'GR',
    color: '--pink',
    count: 14,
    aisle: 'Aisle 06 · Growth shelf',
    description: 'Governance bodies, registered clubs, faith communities, and independent societies that shape student life — from student council and peer helpers to cultural and religious organisations.',
    basket: {
      img: 'assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_GRI.png',
      modifierClass: '',
      style: 'left:14%; top:64%; --r:-10deg; width:32%',
    },
  },
  {
    id: 'acad',
    name: 'Academic',
    fullName: 'Academic-Based Clubs',
    icon: 'ED',
    color: '--ink',
    count: 17,
    aisle: 'Aisle 07 · Academic shelf',
    description: 'Academic societies for every SMU discipline — from business, law, and computing to economics, social sciences, and accountancy. These clubs deepen your knowledge and grow your professional network.',
    basket: {
      img: 'assets/basket-goods/VIVACE26_CBD_RGB_FA_pathed_ACAD.png',
      modifierClass: 'acad-good',
      style: 'left:54%; top:64%; --r:5deg;  width:32%',
    },
  },
];
