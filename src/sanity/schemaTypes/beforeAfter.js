import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'beforeAfter',
  title: 'Before & After',
  type: 'document',
  fields: [
    defineField({ name: 'patientLabel', title: 'Patient Label (e.g. Patient 1)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string',
      options: { list: ['Acne & Scars', 'Skin & Glow', 'Pigmentation', 'Hair Restoration', 'Anti-Ageing', 'Laser & Devices', 'Body Contouring'] },
      validation: r => r.required()
    }),
    defineField({ name: 'treatment', title: 'Treatment (reference)', type: 'reference', to: [{ type: 'treatment' }] }),
    defineField({ name: 'treatmentLabel', title: 'Treatment Label (fallback text if no reference)', type: 'string' }),
    defineField({ name: 'sessionsCount', title: 'Sessions (e.g. 6 sessions)', type: 'string' }),
    defineField({ name: 'resultLabel', title: 'Result Label (e.g. 85% scar reduction)', type: 'string' }),
    defineField({ name: 'beforeImage', title: 'Before Image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'afterImage', title: 'After Image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'patientLabel', subtitle: 'category', media: 'afterImage' },
  },
  orderings: [{ title: 'Sort Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
})
