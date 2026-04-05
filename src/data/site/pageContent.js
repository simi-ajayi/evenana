import { brochureImages } from '../brochure/serviceImages'

export const pageContent = {
  home: {
    hero: {
      label: 'Spa at EVENANA',
      title: 'A sanctuary shaped by nature and modern thinking.',
      description:
        'Discover an immersive spa destination , where treatments, rituals, and wellness spaces are curated for restorative luxury.',
      image: brochureImages.hero,
      primaryCta: {
        label: 'Explore treatments',
        to: '/treatments',
      },
      secondaryCta: {
        label: 'Discover day spa',
        to: '/day-spa',
      },
    },
    intro: {
      eyebrow: 'A space for you',
      title: 'Welcome to our sanctuary',
      body:
        'From precision facials to full-body rituals, every moment is designed for comfort, confidence, and visible results. This digital experience mirrors a luxury destination journey with dedicated routes for your goals.',
      image: brochureImages.intro,
    },
    sanctuaryCards: [
      {
        title: 'Vitality pool',
        image: brochureImages.sanctuary[0],
      },
      {
        title: 'Sauna and steam room',
        image: brochureImages.sanctuary[1],
      },
      {
        title: 'Relaxation areas',
        image: brochureImages.sanctuary[2],
      },
    ],
    routeHighlights: [
      {
        title: 'Treatments',
        description: 'Clinical and holistic menus tailored to your skin and body goals.',
        path: '/treatments',
        image: brochureImages.categories.facials,
      },
      {
        title: 'Day spa',
        description: 'Book rejuvenating day experiences with rituals and reset journeys.',
        path: '/day-spa',
        image: brochureImages.categories['body-treatments-hammam'],
      },
      {
        title: 'wellbeing spaces',
        description: 'Explore thermal spaces, calming lounges, and immersive facilities.',
        path: '/wellbeing-spaces',
        image: brochureImages.sanctuary[1],
      },
      {
        title: 'Membership',
        description: 'Join a long-term wellness path with ongoing access and benefits.',
        path: '/membership',
        image: brochureImages.categories['massage-therapy'],
      },
      {
        title: 'gifting',
        description: 'Curated spa gifts and experiences for meaningful occasions.',
        path: '/gifting',
        image: brochureImages.categories['brow-lash-artistry'],
      },
    ],
    statement: {
      eyebrow: 'EVENANA MedSpa',
      title: 'Refined skin. Thoughtful care. Timeless results.',
      body:
        'Move through each destination route to plan your visit, view treatment details, and prepare for your spa experience with confidence.',
    },
  },
  treatments: {
    hero: {
      label: 'Treatments',
      title: 'Personalised treatment collections for face and body.',
      description:
        'Browse the complete brochure-led menu across facials, advanced aesthetics, body rituals, and recovery therapies.',
      image: brochureImages.categories.facials,
    },
    lead:
      'Each treatment route below contains detailed suitability notes, treatment steps, and aftercare guidance pulled from your brochure content.',
  },
  daySpa: {
    hero: {
      label: 'Day spa',
      title: 'A full day designed around restoration and calm.',
      description:
        'Craft your ideal spa day with therapeutic treatments, thermal journeys, and dedicated relaxation time.',
      image: brochureImages.categories['body-treatments-hammam'],
    },
    highlights: [
      'Arrival rituals and pre-treatment settling time',
      'Custom treatment pairings based on your goals',
      'Hydration, recovery, and post-treatment relaxation areas',
    ],
    sections: [
      {
        eyebrow: 'Journey design',
        title: 'Build your day around what your body needs most.',
        body:
          'Whether you prefer focused recovery or full rejuvenation, your day spa route can combine hammam rituals, massage, and skin therapies into one seamless experience.',
        image: brochureImages.sanctuary[0],
      },
      {
        eyebrow: 'Before you arrive',
        title: 'Simple preparation for a smoother experience.',
        body:
          'Hydrate well, arrive early, and share any medical or skin details so your therapists can tailor pressure, products, and timing to you.',
        image: brochureImages.categories['massage-therapy'],
      },
    ],
  },
  wellbeingSpaces: {
    hero: {
      label: 'wellbeing spaces',
      title: 'Move through spaces designed for stillness and renewal.',
      description:
        'Our wellbeing environments support every stage of your visit, from preparation and treatment to restoration.',
      image: brochureImages.sanctuary[1],
    },
    highlights: [
      'Thermal rooms and gentle heat environments',
      'Quiet lounges for pre- and post-treatment decompression',
      'Design-led spaces inspired by nature and calm movement',
    ],
    sections: [
      {
        eyebrow: 'Thermal ritual',
        title: 'Sauna and steam experiences that support circulation.',
        body:
          'Alternating warmth and rest can help release tension and prepare the body for massage, body therapies, and mindful recovery sessions.',
        image: brochureImages.sanctuary[2],
      },
      {
        eyebrow: 'Deep rest',
        title: 'Dedicated areas where your nervous system can settle.',
        body:
          'Intentional transitions between treatment rooms and relaxation spaces help extend the benefits of each service and improve overall wellbeing outcomes.',
        image: brochureImages.intro,
      },
    ],
  },
  membership: {
    hero: {
      label: 'Membership',
      title: 'Long-term wellness with elevated member benefits.',
      description:
        'Membership is designed for guests who want consistent access to treatment expertise, wellbeing spaces, and personalised planning.',
      image: brochureImages.categories['laser-hair-reduction'],
    },
    highlights: [
      'Priority booking windows for peak treatment slots',
      'Member-only treatment bundles and progression plans',
      'Recurring consultation checkpoints to refine your goals',
    ],
    sections: [
      {
        eyebrow: 'Membership tiers',
        title: 'Choose a rhythm that suits your lifestyle.',
        body:
          'Options can range from monthly treatment credits to hybrid wellness packages combining skin, body, and recovery-focused sessions.',
        image: brochureImages.categories.microneedling,
      },
      {
        eyebrow: 'Endpoint ready',
        title: 'Membership plans are powered by configurable data.',
        body:
          'This page is wired for API integration so you can replace dummy variables with live plans, pricing, eligibility rules, and benefit matrices later.',
        image: brochureImages.categories['injectables-advanced'],
      },
    ],
  },
  gifting: {
    hero: {
      label: 'gifting',
      title: 'Meaningful spa gifts with flexible treatment choices.',
      description:
        'Send thoughtfully curated wellness experiences for birthdays, milestones, and corporate appreciation.',
      image: brochureImages.categories['brow-lash-artistry'],
    },
    highlights: [
      'Digital and in-spa gift redemption options',
      'Curated packages across treatment categories',
      'Personal messaging and occasion-ready presentation',
    ],
    sections: [
      {
        eyebrow: 'Gift journeys',
        title: 'Give a complete day of renewal, not just a single treatment.',
        body:
          'Pair treatment credits with wellbeing access and consultation sessions so recipients can choose what feels best at the time of booking.',
        image: brochureImages.categories['chemical-peels'],
      },
      {
        eyebrow: 'Endpoint ready',
        title: 'Gift catalog and checkout can be connected later.',
        body:
          'The data layer is structured to support API-fed gift products, inventory, promo logic, and secure payment integration in your next phase.',
        image: brochureImages.categories['waxing-services'],
      },
    ],
  },
}
