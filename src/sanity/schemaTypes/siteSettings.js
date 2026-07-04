import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'clinicName', title: 'Clinic Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (with country code)', type: 'string' }),
    defineField({
      name: 'address', title: 'Address', type: 'object',
      fields: [
        defineField({ name: 'line1', title: 'Address Line 1', type: 'string' }),
        defineField({ name: 'line2', title: 'Address Line 2', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'pincode', title: 'PIN Code', type: 'string' }),
        defineField({ name: 'mapsUrl', title: 'Google Maps URL', type: 'url' }),
      ]
    }),
    defineField({
      name: 'hours', title: 'Clinic Hours', type: 'object',
      fields: [
        defineField({ name: 'weekdays', title: 'Weekdays (e.g. Mon–Sat)', type: 'string' }),
        defineField({ name: 'weekdayTime', title: 'Weekday Hours (e.g. 10am–7pm)', type: 'string' }),
        defineField({ name: 'sunday', title: 'Sunday', type: 'string' }),
      ]
    }),
    defineField({
      name: 'social', title: 'Social Media', type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
      ]
    }),
    defineField({
      name: 'promoBanner', title: 'Promo Banner', type: 'object',
      fields: [
        defineField({ name: 'enabled', title: 'Show Banner', type: 'boolean' }),
        defineField({ name: 'label', title: 'Bold Label', type: 'string' }),
        defineField({ name: 'text', title: 'Banner Text', type: 'string' }),
        defineField({ name: 'linkText', title: 'Link Text', type: 'string' }),
        defineField({ name: 'linkUrl', title: 'Link URL', type: 'string' }),
      ]
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
