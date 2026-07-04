import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Treatment Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Skin & Glow', 'Acne & Scars', 'Pigmentation', 'Anti-Ageing', 'Hair Restoration', 'Laser & Devices'] }
    }),
    defineField({ name: 'tagline', title: 'Short Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Short Description (hero intro, 2–3 sentences)', type: 'text', rows: 3 }),
    defineField({ name: 'about', title: 'About the Treatment (150–300 words for SEO section)', type: 'text', rows: 8 }),
    defineField({ name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'meta', title: 'Key Details', type: 'object',
      fields: [
        defineField({ name: 'duration', title: 'Session Duration (e.g. 45 min)', type: 'string' }),
        defineField({ name: 'sessions', title: 'Recommended Sessions (e.g. 4–6)', type: 'string' }),
        defineField({ name: 'recovery', title: 'Recovery Time', type: 'string' }),
        defineField({ name: 'results', title: 'Results Visible In', type: 'string' }),
      ]
    }),
    defineField({
      name: 'howItWorks', title: 'How It Works — Steps', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'step', title: 'Step Number', type: 'number' }),
          defineField({ name: 'title', title: 'Step Title', type: 'string' }),
          defineField({ name: 'description', title: 'Step Description', type: 'text' }),
        ],
        preview: { select: { title: 'title', subtitle: 'step' } }
      })]
    }),
    defineField({
      name: 'benefits', title: 'Benefits (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'idealCandidate', title: 'Ideal Candidate (who is suitable)', type: 'text', rows: 3 }),
    defineField({
      name: 'concerns', title: 'Conditions This Treatment Helps With',
      type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'concern' }] })]
    }),
    defineField({
      name: 'preparation', title: 'Preparation Before Treatment (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'aftercare', title: 'Recovery & Aftercare Instructions', type: 'text', rows: 4 }),
    defineField({
      name: 'risks', title: 'Risks & Side Effects (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'preventionTips', title: 'Prevention & Maintenance Tips (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'beforeAfter', title: 'Before & After Photos', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'before', title: 'Before Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'after', title: 'After Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'sessions', title: 'Sessions Taken', type: 'string' }),
          defineField({ name: 'label', title: 'Result Label (e.g. 80% scar reduction)', type: 'string' }),
        ],
        preview: { select: { title: 'label', media: 'after' } }
      })]
    }),
    defineField({
      name: 'faqs', title: 'FAQs', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text' }),
        ],
        preview: { select: { title: 'question' } }
      })]
    }),
    defineField({
      name: 'relatedTreatments', title: 'Related Treatments',
      type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'treatment' }] })]
    }),
    defineField({
      name: 'relatedConcerns', title: 'Related Concerns',
      type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'concern' }] })]
    }),
    defineField({ name: 'rating', title: 'Star Rating (e.g. 4.9)', type: 'number' }),
    defineField({ name: 'reviewCount', title: 'Number of Reviews', type: 'number' }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'image' } },
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})
