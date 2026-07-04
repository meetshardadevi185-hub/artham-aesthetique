import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Patient Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'initials', title: 'Initials (e.g. PS)', type: 'string' }),
    defineField({ name: 'rating', title: 'Star Rating (1–5)', type: 'number',
      validation: r => r.required().min(1).max(5)
    }),
    defineField({ name: 'text', title: 'Review Text', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({ name: 'treatment', title: 'Treatment Name', type: 'string' }),
    defineField({ name: 'treatmentRef', title: 'Treatment (reference)', type: 'reference', to: [{ type: 'treatment' }] }),
    defineField({ name: 'date', title: 'Display Date (e.g. 2 weeks ago)', type: 'string' }),
    defineField({ name: 'platform', title: 'Platform', type: 'string',
      options: { list: ['Google', 'Practo', 'JustDial', 'Instagram', 'Direct'] }
    }),
    defineField({ name: 'avatarColor', title: 'Avatar Background Color (hex)', type: 'string' }),
    defineField({ name: 'photo', title: 'Patient Photo (optional)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'treatment', media: 'photo' },
  },
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})
