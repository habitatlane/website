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

const homeSection = z.discriminatedUnion('type', [
  z.object({ type: z.literal('hero') }),
  z.object({ type: z.literal('howWeHelp') }),
  z.object({ type: z.literal('impactBand') }),
  z.object({ type: z.literal('featuredCampaign') }),
  z.object({ type: z.literal('eventsStrip') }),
  z.object({ type: z.literal('newsletter') }),
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

export const collections = { pages, events, campaigns, home, staff, news };
