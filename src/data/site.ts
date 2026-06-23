/**
 * Canonical organization facts for Habitat for Humanity of Central Lane.
 * Single source of truth used across Footer, Contact, structured data, etc.
 *
 * NOTE: A few figures are flagged TODO — verify with the affiliate before
 * treating them as final (see inline comments).
 */
export const site = {
  name: 'Habitat for Humanity of Central Lane',
  shortName: 'Habitat Central Lane',
  founded: 1990,
  url: 'https://habitatlane.org',
  tagline: 'Building homes, community, and hope across Lane County.',
  mission:
    'Seeking to put God’s love into action, Habitat for Humanity of Central Lane brings people together to build homes, community, and hope.',

  // Legal / nonprofit identifiers
  ein: '93-1015598', // 501(c)(3)
  ccb: '196367', // Oregon Construction Contractors Board

  // Primary office
  address: {
    street: '1210 Oak Patch Road',
    city: 'Eugene',
    state: 'OR',
    zip: '97402',
  },
  phone: '541.741.1707',
  email: 'info@habitatlane.org',
  officeHours: '9–4, by appointment',

  // Service area
  serviceArea: 'Coburg to Cottage Grove, Blue River to Noti.',

  // ReStore (operates as a separate site — link out for now)
  restore: {
    phone: '541.344.4809',
    hours: 'Wednesday - Saturday 11 AM-6 PM, Sunday 11 AM - 4 PM',
    // TODO(restore): replace with the real ReStore website when available.
    url: 'https://habitatlane.org/restore/',
  },

  // Impact figures — PLACEHOLDER, TODO(verify) with affiliate.
  impact: {
    homesBuilt: 77, // TODO(verify): ~77 homes built since 1990
    repairs: 68, // TODO(verify): ~68 minor home repairs since 1990
    sinceYear: 1990,
  },

  // Social placeholders — TODO: confirm/replace handles.
  social: {
    facebook: 'https://www.facebook.com/HabitatCentralLane',
    instagram: 'https://instagram.com/habitatlane',
    youtube: 'https://www.youtube.com/@habitatcentrallane29',
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
