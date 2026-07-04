import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub Text', type: 'text', rows: 2 }),
      ]
    }),
    defineField({
      name: 'hours', title: 'Clinic Hours', type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'days', title: 'Days (e.g. Mon – Sat)', type: 'string' }),
          defineField({ name: 'time', title: 'Hours (e.g. 10:00 AM – 7:00 PM)', type: 'string' }),
        ],
        preview: { select: { title: 'days', subtitle: 'time' } }
      })]
    }),
    defineField({ name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url' }),
    defineField({
      name: 'contactInfo', title: 'Contact Details', type: 'object',
      description: 'Shown on the contact page info cards. Leave blank to use Site Settings values.',
      fields: [
        defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
        defineField({ name: 'whatsapp', title: 'WhatsApp Number (with country code, e.g. +919811997993)', type: 'string' }),
        defineField({ name: 'email', title: 'Email Address', type: 'string' }),
        defineField({ name: 'addressLine1', title: 'Address Line 1', type: 'string' }),
        defineField({ name: 'addressLine2', title: 'Address Line 2', type: 'string' }),
        defineField({ name: 'mapsUrl', title: 'Google Maps Link', type: 'url' }),
      ]
    }),
    defineField({
      name: 'formConfig', title: 'Contact Form Settings', type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Form Heading (e.g. "Send us a message")', type: 'string' }),
        defineField({
          name: 'concerns', title: 'Concern Dropdown Options', type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'Listed in the "Main Concern" dropdown on the contact form'
        }),
        defineField({ name: 'successMessage', title: 'Success Message after form submit', type: 'string' }),
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
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
