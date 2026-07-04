import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'credentials', title: 'Credentials (e.g. MBBS)', type: 'string' }),
    defineField({ name: 'title', title: 'Title (e.g. Aesthetic Physician)', type: 'string' }),
    defineField({ name: 'experience', title: 'Years of Experience', type: 'number' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'shortBio', title: 'Short Bio (used on homepage / about page)', type: 'text', rows: 4 }),
    defineField({
      name: 'bio', title: 'Full Biography (rich text)', type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'specialties', title: 'Specialties (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'education', title: 'Education & Training', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'degree', title: 'Degree / Certification', type: 'string' }),
          defineField({ name: 'institution', title: 'Institution / College', type: 'string' }),
          defineField({ name: 'year', title: 'Year (optional)', type: 'string' }),
        ],
        preview: { select: { title: 'degree', subtitle: 'institution' } }
      })]
    }),
    defineField({
      name: 'stats', title: 'Stats Row', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value (e.g. 5+)', type: 'string' }),
          defineField({ name: 'label', title: 'Label (e.g. Years Experience)', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } }
      })]
    }),
    defineField({ name: 'quote', title: 'Personal Quote (shown in blockquote on doctor page)', type: 'text', rows: 3 }),
    defineField({ name: 'philosophy', title: 'Treatment Philosophy (paragraph shown below main bio)', type: 'text', rows: 4 }),
    defineField({
      name: 'awards', title: 'Awards & Recognitions', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Award Title', type: 'string' }),
          defineField({ name: 'organisation', title: 'Awarding Organisation', type: 'string' }),
          defineField({ name: 'year', title: 'Year', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'year' } }
      })]
    }),
    defineField({
      name: 'availability', title: 'Consultation Availability', type: 'object',
      fields: [
        defineField({ name: 'days', title: 'Days Available (e.g. Mon–Sat)', type: 'string' }),
        defineField({ name: 'hours', title: 'Hours (e.g. 10am–7pm)', type: 'string' }),
        defineField({
          name: 'modes', title: 'Consultation Modes', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'e.g. In-clinic, Online video, WhatsApp'
        }),
      ]
    }),
    defineField({ name: 'videoUrl', title: 'Intro Video URL (YouTube embed)', type: 'url' }),
  ],
  preview: { select: { title: 'name', subtitle: 'title', media: 'photo' } },
})
