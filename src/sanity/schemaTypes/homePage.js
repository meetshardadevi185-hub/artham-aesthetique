import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string' }),
        defineField({ name: 'headingLine1', title: 'Heading — Line 1', type: 'string' }),
        defineField({ name: 'headingItalic', title: 'Heading — Italic 1', type: 'string' }),
        defineField({ name: 'headingLine2', title: 'Heading — Line 2 (e.g. "and")', type: 'string' }),
        defineField({ name: 'headingItalic2', title: 'Heading — Italic 2', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'ctaPrimary', title: 'Primary Button Text', type: 'string' }),
        defineField({ name: 'ctaSecondary', title: 'Secondary Button Text', type: 'string' }),
        defineField({
          name: 'stats', title: 'Stats Row', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'value', title: 'Value (e.g. 500+)', type: 'string' }),
              defineField({ name: 'label', title: 'Label', type: 'string' }),
            ],
            preview: { select: { title: 'value', subtitle: 'label' } }
          })]
        }),
      ]
    }),
    defineField({
      name: 'heroVideoFile',
      title: '🎬 Hero Video (Upload)',
      type: 'file',
      description: 'Upload an MP4 / WebM video. Used as the hero background. Max ~50 MB recommended.',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'heroVideoUrl',
      title: '🔗 Hero Video URL (External)',
      type: 'url',
      description: 'Alternatively paste a direct .mp4 link (e.g. from Cloudinary or Vimeo CDN). Takes precedence over uploaded file.',
    }),
    defineField({
      name: 'heroFallbackImage',
      title: '🖼 Hero Fallback Image (shown when video fails or on mobile)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'heroImage1', title: '🖼 Hero Image 1 — Large Left', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImage2', title: '🖼 Hero Image 2 — Top Right', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImage3', title: '🖼 Hero Image 3 — Bottom Left', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImage4', title: '🖼 Hero Image 4 — Large Right', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'trustBar', title: 'Trust Bar (badges below hero)', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [defineField({ name: 'text', title: 'Badge Text', type: 'string' })],
        preview: { select: { title: 'text' } }
      })]
    }),
    defineField({
      name: 'treatmentsSection', title: 'Treatments Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Text', type: 'text', rows: 2 }),
      ]
    }),
    defineField({
      name: 'concernsSection', title: 'Concerns Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
      ]
    }),
    defineField({
      name: 'testimonials', title: 'Testimonials Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'items', title: 'Reviews', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'name', title: 'Patient Name', type: 'string' }),
              defineField({ name: 'initials', title: 'Initials (e.g. PS)', type: 'string' }),
              defineField({ name: 'rating', title: 'Star Rating (1–5)', type: 'number' }),
              defineField({ name: 'text', title: 'Review Text', type: 'text', rows: 4 }),
              defineField({ name: 'treatment', title: 'Treatment Name', type: 'string' }),
              defineField({ name: 'date', title: 'Date (e.g. 2 weeks ago)', type: 'string' }),
            ],
            preview: { select: { title: 'name', subtitle: 'treatment' } }
          })]
        }),
      ]
    }),
    defineField({
      name: 'faqs', title: 'FAQ Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({
          name: 'items', title: 'Questions', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [
              defineField({ name: 'question', title: 'Question', type: 'string' }),
              defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
            ],
            preview: { select: { title: 'question' } }
          })]
        }),
      ]
    }),
    defineField({
      name: 'doctorSection', title: 'Doctor Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow (e.g. "Meet the Doctor")', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Text', type: 'text', rows: 3 }),
        defineField({ name: 'ctaText', title: 'Button Text (e.g. "View Full Profile")', type: 'string' }),
      ]
    }),
    defineField({
      name: 'beforeAfterSection', title: 'Before & After Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Text', type: 'text', rows: 2 }),
        defineField({ name: 'ctaText', title: 'View All Button Text', type: 'string' }),
      ]
    }),
    defineField({
      name: 'clinicsSection', title: 'Specialized Clinics Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Text', type: 'text', rows: 2 }),
      ]
    }),
    defineField({
      name: 'ctaBanner', title: 'CTA Banner (bottom)', type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Text', type: 'text', rows: 2 }),
        defineField({ name: 'primaryCta', title: 'Primary Button Text', type: 'string' }),
        defineField({ name: 'secondaryCta', title: 'Secondary Button Text', type: 'string' }),
      ]
    }),
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2 }),
      ]
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})
