/**
 * Information architecture for the primary navigation + footer.
 * Shared by <Nav> and <Footer> so the IA stays in one place.
 *
 * `external: true`  -> opens in a new tab (rel noopener).
 * `comingSoon: true` -> page is a stub; link still works but is a placeholder.
 *
 * Designed to move into @habitat/ui with the components that consume it.
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  comingSoon?: boolean;
}

export interface NavGroup {
  label: string;
  href?: string; // optional landing page for the group
  children?: NavLink[];
}

export const mainNav: NavGroup[] = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs/' },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Our Story', href: '/about/' },
      { label: 'Staff & Board', href: '/about/staff-board/', comingSoon: true },
      { label: 'Financials', href: '/about/financials/', comingSoon: true },
      { label: 'News', href: '/news/', comingSoon: true },
    ],
  },
  {
    label: 'Get Help',
    href: '/get-help/',
    children: [
      { label: 'Homeownership', href: '/get-help/homeownership/', comingSoon: true },
      { label: 'Minor Home Repair', href: '/get-help/minor-home-repair/', comingSoon: true },
    ],
  },
  {
    label: 'Get Involved',
    href: '/get-involved/',
    children: [
      { label: 'Volunteer', href: '/get-involved/volunteer/', comingSoon: true },
      // ReStore runs on a separate site — external link placeholder.
      { label: 'ReStore', href: 'https://habitatlane.org/restore/', external: true },
      { label: 'Events', href: '/events/', comingSoon: true },
    ],
  },
  {
    label: 'Give',
    href: '/give/',
    children: [
      { label: 'Donate', href: '/give/donate/', comingSoon: true },
      { label: 'Ways to Give', href: '/give/ways-to-give/', comingSoon: true },
      { label: 'Cars for Homes', href: '/give/cars-for-homes/', comingSoon: true },
      { label: 'In-Kind', href: '/give/in-kind/', comingSoon: true },
    ],
  },
  { label: 'Contact', href: '/contact/' },
];

/** The persistent primary call-to-action shown in the header. */
export const donateLink: NavLink = { label: 'Donate', href: '/give/donate/', comingSoon: true };
