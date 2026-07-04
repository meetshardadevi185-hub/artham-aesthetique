import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'concern',
  title: 'Concern',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Concern Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['Skin & Face', 'Hair & Scalp', 'Anti-Ageing'] }
    }),
    defineField({ name: 'description', title: 'Description (intro paragraph for hero)', type: 'text', rows: 4 }),
    defineField({ name: 'longDescription', title: 'Detailed Description (for SEO section)', type: 'text', rows: 6 }),
    defineField({ name: 'image', title: 'Image (for concern cards)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImage', title: 'Hero / Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'iconColor', title: 'Icon Color (hex, e.g. #E05A5A)', type: 'string' }),
    defineField({ name: 'iconBg', title: 'Icon Background Color (hex, e.g. #FFF0EE)', type: 'string' }),
    defineField({
      name: 'tags', title: 'Sub-types / Tags', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'approach', title: 'Our Approach — Steps', type: 'array',
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
      name: 'treatments', title: 'Recommended Treatments',
      type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'treatment' }] })]
    }),
    defineField({
      name: 'relatedConcerns', title: 'Related Concerns',
      type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'concern' }] })]
    }),
    defineField({
      name: 'preventionTips', title: 'Prevention & Lifestyle Tips (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'causes', title: 'Causes (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'symptoms', title: 'Symptoms (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'diagnosis', title: 'Diagnosis', type: 'text', rows: 4 }),
    defineField({
      name: 'treatmentOptions', title: 'Treatment Options (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'treatmentBenefits', title: 'Benefits of Treatment (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({ name: 'recoveryAftercare', title: 'Recovery / Aftercare', type: 'text', rows: 4 }),
    defineField({
      name: 'whyChooseClinic', title: 'Why Choose the Clinic (one per item)', type: 'array',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'faqs', title: 'FAQs about this Concern', type: 'array',
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
  ],
  preview: { select: { title: 'name', subtitle: 'category' } },
})
