import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  name: 'tvak-asthi',
  title: 'Tvak & Asthi — CMS',
  projectId: 'l8z1brxo',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── Singletons ──────────────────────────────────────
            S.listItem().id('siteSettings').title('🏥 Site Settings').schemaType('siteSettings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.listItem().id('homePage').title('🏠 Home Page').schemaType('homePage').child(
              S.document().schemaType('homePage').documentId('singleton-homePage')
            ),
            S.listItem().id('aboutPage').title('👩‍⚕️ About Page').schemaType('aboutPage').child(
              S.document().schemaType('aboutPage').documentId('singleton-aboutPage')
            ),
            S.listItem().id('contactPage').title('📍 Contact Page').schemaType('contactPage').child(
              S.document().schemaType('contactPage').documentId('singleton-contactPage')
            ),
            S.divider(),
            // ── Collections ─────────────────────────────────────
            S.documentTypeListItem('treatment').title('💆 Treatments'),
            S.documentTypeListItem('concern').title('🩺 Concerns / Conditions'),
            S.documentTypeListItem('doctor').title('👩‍⚕️ Doctors'),
            S.documentTypeListItem('clinic').title('🏨 Specialized Clinics'),
            S.documentTypeListItem('beforeAfter').title('📸 Before & After Cases'),
            S.documentTypeListItem('testimonial').title('⭐ Testimonials'),
          ])
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
