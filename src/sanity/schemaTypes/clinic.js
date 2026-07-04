import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'clinic',
  title: 'Specialized Clinic',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Clinic Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'tagline', title: 'Short Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'icon', title: 'Icon Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bannerImage', title: 'Banner / Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'conditions', title: 'Conditions Treated', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'treatments', title: 'Available Treatments',
      type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'treatment' }] })]
    }),
    defineField({
      name: 'highlights', title: 'Why Choose This Clinic (bullet points)', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Highlight Title', type: 'string' }),
          defineField({ name: 'description', title: 'Highlight Description', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title' } }
      })]
    }),
    defineField({
      name: 'faqs', title: 'FAQs', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'question' } }
      })]
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2 }),
      ]
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'tagline', media: 'icon' } },
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})
