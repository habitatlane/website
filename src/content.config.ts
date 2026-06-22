/**
 * Content collections — the structured content the Sveltia CMS edits.
 * Schemas here MUST stay aligned with the field definitions in
 * `public/admin/config.yml` so CMS-authored entries validate at build time.
 *
 * Content lives as Markdown (with frontmatter) under `src/content/<name>/`.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    location: z.string().optional(),
    summary: z.string(),
    registrationUrl: z.string().url().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const campaigns = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/campaigns' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    goalAmount: z.number().optional(),
    raisedAmount: z.number().optional(),
    ctaLabel: z.string().default('Donate'),
    ctaUrl: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    // Exactly one campaign should be featured on the homepage at a time.
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const cta = z.object({
  label: z.string().optional(),
  url: z.string().optional(),
  external: z.boolean().default(false),
});

const imageFields = {
  image: z.string().optional(),
  imageAlt: z.string().optional(),
};

const heroSection = z.object({
  type: z.literal('hero'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.string().optional(),
  primaryCta: cta.optional(),
  secondaryCta: cta.optional(),
  serviceText: z.string().optional(),
  ...imageFields,
});

const proseSection = z.object({
  type: z.literal('prose'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.string().default(''),
});

const splitContentSection = z.object({
  type: z.literal('splitContent'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.string().default(''),
  cta: cta.optional(),
  imagePosition: z.enum(['left', 'right']).default('right'),
  ...imageFields,
});

const ctaBandSection = z.object({
  type: z.literal('ctaBand'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.string().default(''),
  primaryCta: cta.optional(),
  secondaryCta: cta.optional(),
});

const impactBandSection = z.object({
  type: z.literal('impactBand'),
  heading: z.string().optional(),
  stats: z
    .array(
      z.object({
        value: z.string().optional(),
        label: z.string().optional(),
      }),
    )
    .default([]),
  note: z.string().optional(),
});

const newsletterSection = z.object({
  type: z.literal('newsletter'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.string().optional(),
  formAction: z.string().optional(),
  emailLabel: z.string().optional(),
  emailPlaceholder: z.string().optional(),
  buttonLabel: z.string().optional(),
  note: z.string().optional(),
});

const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const homeSection = z.discriminatedUnion('type', [
  heroSection,
  proseSection,
  splitContentSection,
  ctaBandSection,
  z.object({ type: z.literal('programsList') }),
  z.object({ type: z.literal('howWeHelp') }),
  impactBandSection,
  z.object({ type: z.literal('featuredCampaign') }),
  z.object({ type: z.literal('eventsStrip') }),
  newsletterSection,
]);

const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  schema: z.object({
    title: z.string().default('Home'),
    sections: z.array(homeSection).default([]),
  }),
});

const staff = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/staff' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum(['staff', 'board']).default('staff'),
    photo: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, events, campaigns, programs, home, staff, news };
