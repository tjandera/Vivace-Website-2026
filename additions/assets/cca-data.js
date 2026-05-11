(() => {
  const categories = {
    acf: {
      short: 'ACF',
      name: 'Arts & Cultural Fraternity',
      color: 'var(--red)',
      tone: 'tone-acf',
      icon: 'AC',
      images: ['assets/fruit-strawberry.svg', 'assets/object-loyalty-card.svg', 'assets/sticker-new-arrival.svg'],
      intake: 'Open / Auditions',
      copy: 'creative practice, showcases, workshops and student-led productions'
    },
    smux: {
      short: 'SMU-X',
      name: 'SMUXploration Crew',
      color: 'var(--blue)',
      tone: 'tone-smux',
      icon: 'X',
      images: ['assets/fruit-banana.svg', 'assets/object-shopping-basket.svg', 'assets/sign-open.svg'],
      intake: 'Open',
      copy: 'outdoor learning, expeditions, beginner-friendly sessions and skills clinics'
    },
    ssu: {
      short: 'SSU',
      name: 'SMU Sports Union',
      color: 'var(--yellow)',
      tone: 'tone-ssu',
      icon: 'SP',
      images: ['assets/fruit-orange.svg', 'assets/object-milk-carton.svg', 'assets/sticker-banana.svg'],
      intake: 'Open / Trials',
      copy: 'training, recreational play, competitive teams and campus sporting culture'
    },
    sics: {
      short: 'SICS',
      name: 'Special Interest and Community Service Sodality',
      color: 'var(--green)',
      tone: 'tone-sics',
      icon: 'SI',
      images: ['assets/fruit-apple.svg', 'assets/object-paper-bag.svg', 'assets/sign-fresh.svg'],
      intake: 'Open',
      copy: 'interest communities, service projects, personal growth and student-run initiatives'
    },
    icon: {
      short: 'ICON',
      name: 'International Connections',
      color: 'var(--orange)',
      tone: 'tone-icon',
      icon: 'IN',
      images: ['assets/fruit-watermelon.svg', 'assets/object-coupon.svg', 'assets/sticker-orange.svg'],
      intake: 'Open',
      copy: 'cultural exchange, community events, international student networks and welfare drives'
    },
    acad: {
      short: 'ACADEMIC',
      name: 'Academic Societies',
      color: 'var(--mint)',
      tone: 'tone-acad',
      icon: 'ED',
      images: ['assets/fruit-kiwi.svg', 'assets/object-receipt-detailed.svg', 'assets/sign-aisle.svg'],
      intake: 'Open',
      copy: 'school identity, professional exposure, academic support and student-led programmes'
    },
    gri: {
      short: 'GRI',
      name: 'Governance, Registered and Independent Clubs',
      color: 'var(--pink)',
      tone: 'tone-gri',
      icon: 'GR',
      images: ['assets/fruit-grapes.svg', 'assets/object-price-tag-hanging.svg', 'assets/sticker-grape.svg'],
      intake: 'Open / Recruitment',
      copy: 'leadership, professional communities, faith groups, institutes and independent initiatives'
    }
  };

  const groups = [
    { category: 'acf', cluster: 'Dance', names: ['Ardiente', 'Ballare', 'Eurhythmix', 'Funk Movement', 'Caderas Latinas', 'Indancity'] },
    { category: 'acf', cluster: 'Music', names: ['Chamber Choir', 'Chinese Orchestra (SMUCO)', 'SMU Guitarissimo', 'SoundFoundry', 'Samba Masala', 'Ivory Keys', 'Stereometa', 'Symphonia', 'Voix'] },
    { category: 'acf', cluster: 'Literary Arts', names: ['SMU Literati'] },
    { category: 'acf', cluster: 'Theatre and Media', names: ['Broadcast and Entertainment', 'Stageit'] },
    { category: 'acf', cluster: 'Visual Arts', names: ['Artdicted', 'SMUSAIC (Photography)'] },

    { category: 'smux', cluster: 'Adventure Sports', names: ['Biking', 'Diving', 'Kayaking', 'Skating', 'Trekking', 'Xseed (Board Sports)'] },

    { category: 'ssu', cluster: 'Ball Sports', names: ['Basketball', 'Bowling', 'Floorball', 'Football', 'Handball', 'Netball', 'Rugby', 'Softball', 'Tchoukball', 'Volleyball'] },
    { category: 'ssu', cluster: 'Racket Sports', names: ['Badminton', 'Squash', 'Table Tennis', 'Tennis'] },
    { category: 'ssu', cluster: 'Martial Arts', names: ['Aikido', 'Judo', 'Kendo', 'MMA', 'Muay Thai', 'Taekwondo', 'Wushu'] },
    { category: 'ssu', cluster: 'Water Sports', names: ['Aquathlon', 'Aquatic Sharks', 'Dragon Boat', 'Sailing'] },
    { category: 'ssu', cluster: 'Other Sports', names: ['Archery', 'Athletics', 'Climb Team', 'Cuesports', 'Fencing', 'Golf', 'Ultimate Frisbee'] },

    { category: 'sics', cluster: 'Lifestyle', names: ['Recreational Fishing', 'SMU Wine Appreciation Club', 'SMU Gourmet Club', 'SMU Barworks', 'SMU Fitnessworks'] },
    { category: 'sics', cluster: 'Personal Development', names: ['SMU Toastmasters', 'SMU Debating Society', 'SMU Thrive Social Consulting', 'SMU AIESEC', 'SMU Start Up Society'] },
    { category: 'sics', cluster: 'Social Gaming', names: ['SMU Strategica', 'SMU Intellectual Sports', 'SMU eSport'] },
    { category: 'sics', cluster: 'Community Service', names: ['SMU Youth Mentors', 'SMU Caretalyst', 'SMU Ember', 'SMU Red Cross', 'SMU Rotaract', 'SMU Uni-Y'] },
    { category: 'sics', cluster: 'Social Causes', names: ['SMU Verts', "SMU Women's Connection", 'SMU People for Animal Welfare'] },

    { category: 'icon', cluster: 'International Community', names: ['Aspara Cambodia (Cambodia)', 'Barkada (Philippines)', 'Francophiles (France)', 'Connect China (China)', 'Japanese Cultural Club (Japan)', 'Roots (Singapore)', 'Kommunitas Indonesia (Indonesia)', 'Woori Sayi (Korea)', 'Yin Siam (Thailand)', 'Truly Malaysia (Malaysia)', 'Myanmar Community (Myanmar)', 'Indian Cultural Society (India)', 'Chao Vietnam (Vietnam)', 'Al Khaleej (Middle East)'] },

    { category: 'acad', cluster: 'Business and Management', names: ['Business Society (BONDUE)', 'Cognitare', 'Communication Management Society (CMS)', 'EYE Investment', 'Maritime Merchants Society', 'Marketing Society (SMARKETING)', 'Operations Management Society (OMS)', 'Organisational Behaviour and Human Resources Society (OBHR)', 'Quantitative Finance Society (Q.E.D)', 'Real Estate & Alternative Investments (SMU REAL)'] },
    { category: 'acad', cluster: 'Accountancy', names: ['Accounting Society (ASoc)', 'Emerging Markets', 'Financial Advisory and Compliance Team (FACT)', 'Tax Society', 'SoA Outreach'] },
    { category: 'acad', cluster: 'Computing and Information Systems', names: ["SCIS Students' Society (Ellipsis)", 'SMU.hack', 'Product Club', 'Whitehat Society', 'Women in Tech'] },
    { category: 'acad', cluster: 'Economics', names: ['Economics Society (OIKOS)', 'Actuarial Science Club', 'Data Science and Analytics Society', 'Economics Intelligence Club', 'Health Economics & Management Society (HEM)'] },
    { category: 'acad', cluster: 'Social Sciences', names: ['Social Sciences Society (SOSCIETY)', 'Psychology Society'] },
    { category: 'acad', cluster: 'Law', names: ['Law Society (The Bar)', 'Constitutional Law and Criminal Justice Club (CCJC)', 'Corporate and Commercial Law Club (COCO)', 'Environment & Sustainability Law Club', 'Law International Relations Club', 'Law Outreach', 'Law Sports and Recreation Club', 'Legal Innovation and Technology (LIT)', 'Lexicon', 'Media and Negotiation Club (SMNC)', 'CIS (inCISive)'] },

    { category: 'gri', cluster: 'Governance and Registered Clubs', names: ['Apolitical Society', 'Ambassadorial Corps', 'Bizcom', 'Career Champions', 'Growth-X Consulting', 'Peer Helpers', 'Student Council of Discipline (SCD)', 'SMUSA', 'The Blue and Gold (TBAG)', 'The Mentoring Circle', 'Christian Fellowship', 'CRU', 'Dhamma Circle', 'FIDES', 'Muslim Society', 'Sikh Society'] },
    { category: 'gri', cluster: 'Institutes', names: ['Asia Private Equity Club (APECS)', 'Artificial Intelligence Club', 'Blockchain Club', 'Business Intelligence & Analytics (BIA)', 'Civil Defence Lionhearter Chapter', 'Eagles Inc.', 'FinLIT Programme', 'FinTech Club', 'SMU Purple', 'Mentorship Committee', 'Smart City Society', 'Social Impact Catalyst (SIC)', 'Sustainable Investment Club'] }
  ];

  const importantDates = {
    sics: ['SICS Day', 'SICS Freshmen Summer Programme', 'Purple Outreach', 'SMOO Challenge', 'SICS Welfare Drive'],
    icon: ['ICON Camp', 'SMU Diverse-City', 'Welfare Drives', 'Buddy Programme']
  };

  const commitmentByCluster = {
    Dance: 'Weekly',
    Music: 'Weekly',
    'Literary Arts': 'Flexible',
    'Theatre and Media': 'Project-based',
    'Visual Arts': 'Flexible',
    'Adventure Sports': 'Trip-based',
    'Ball Sports': 'Weekly',
    'Racket Sports': 'Weekly',
    'Martial Arts': 'Weekly',
    'Water Sports': 'Weekly',
    'Other Sports': 'Weekly',
    Lifestyle: 'Flexible',
    'Personal Development': 'Flexible',
    'Social Gaming': 'Flexible',
    'Community Service': 'Project-based',
    'Social Causes': 'Project-based',
    'International Community': 'Flexible',
    'Business and Management': 'Flexible',
    Accountancy: 'Flexible',
    'Computing and Information Systems': 'Flexible',
    Economics: 'Flexible',
    'Social Sciences': 'Flexible',
    Law: 'Flexible',
    'Governance and Registered Clubs': 'Flexible',
    Institutes: 'Flexible'
  };

  const categoryCounters = {};
  const usedSlugs = new Map();

  function slugify(value) {
    const base = value
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const count = usedSlugs.get(base) || 0;
    usedSlugs.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  }

  function makeDescription(cca) {
    return `${cca.name} is listed under ${cca.categoryName}, within the ${cca.cluster} shelf. This placeholder page can hold the CCA's real overview, booth pitch, membership details, sign-up flow and images once the final content is ready.`;
  }

  function makeExtra(cca) {
    return `For now, the template uses Vivace supermarket visuals so you can test routing, search, filtering and mobile layout across the full CCA catalogue. Replace this with final copy from ${cca.name} when available.`;
  }

  const ccas = groups.flatMap(group => {
    const meta = categories[group.category];
    return group.names.map(name => {
      categoryCounters[group.category] = (categoryCounters[group.category] || 0) + 1;
      const boothNumber = String(categoryCounters[group.category]).padStart(3, '0');
      const cca = {
        id: slugify(name),
        name,
        category: group.category,
        categoryShort: meta.short,
        categoryName: meta.name,
        cluster: group.cluster,
        color: meta.color,
        tone: meta.tone,
        icon: meta.icon,
        booth: `${meta.short}-${boothNumber}`,
        commitment: commitmentByCluster[group.cluster] || 'Flexible',
        intake: meta.intake,
        images: meta.images
      };
      cca.cardText = `${cca.cluster} pick under ${cca.categoryShort}. Open the profile for placeholder description, images and sign-up details.`;
      cca.description = makeDescription(cca);
      cca.extra = makeExtra(cca);
      return cca;
    });
  });

  window.VIVACE_CCA_CATEGORIES = categories;
  window.VIVACE_CCA_GROUPS = groups;
  window.VIVACE_CCAS = ccas;
  window.VIVACE_IMPORTANT_DATES = importantDates;
})();
