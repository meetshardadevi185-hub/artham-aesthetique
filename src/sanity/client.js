import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'l8z1brxo'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-06-01'
const token = process.env.SANITY_API_TOKEN

// Public CDN client — fast reads for published content
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Authenticated server client — bypasses CDN, reads drafts, used for all page fetches
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

// Write client — same as serverClient (token has read+write)
export const writeClient = serverClient

const builder = createImageUrlBuilder({ projectId, dataset })
export function urlFor(source) {
  return builder.image(source)
}

// ── Fetch helpers (all use serverClient for fresh, authenticated data) ──

export async function fetchSiteSettings() {
  return serverClient.fetch(`*[_type == "siteSettings"][0]`)
}

export async function fetchHomePage() {
  return serverClient.fetch(`*[_type == "homePage" && _id == "singleton-homePage"][0]{
    ...,
    heroVideoFile { asset->{ url } },
    treatmentsSection{
      ...,
      featured[]->{name, slug, category, tagline, image, rating, reviewCount}
    },
    concernsSection{
      ...,
      featured[]->{name, slug, category, image, heroImage, iconColor, iconBg}
    }
  }`)
}

export async function fetchTreatments() {
  return serverClient.fetch(`*[_type == "treatment"] | order(order asc){
    name, slug, category, tagline, image, rating, reviewCount, featured
  }`)
}

export async function fetchTreatment(slug) {
  return serverClient.fetch(`*[_type == "treatment" && slug.current == $slug][0]{
    ...,
    concerns[]->{name, slug, category},
    relatedTreatments[]->{name, slug, category, image},
    relatedConcerns[]->{name, slug, category}
  }`, { slug })
}

export async function fetchConcerns() {
  return serverClient.fetch(`*[_type == "concern"] | order(order asc){
    name, slug, category, image, heroImage, iconColor, iconBg
  }`)
}

export async function fetchConcern(slug) {
  return serverClient.fetch(`*[_type == "concern" && slug.current == $slug][0]{
    ...,
    treatments[]->{name, slug, category, image, rating, reviewCount},
    relatedConcerns[]->{name, slug, category, iconColor, iconBg}
  }`, { slug })
}

export async function fetchDoctor() {
  return serverClient.fetch(`*[_type == "doctor"][0]`)
}

export async function fetchBeforeAfter() {
  return serverClient.fetch(`*[_type == "beforeAfter" && defined(beforeImage) && defined(afterImage)] | order(_createdAt asc){
    _id, patientLabel, concern, sessions, result, category,
    beforeImage, afterImage,
    treatment->{name, slug, category}
  }`)
}

export async function fetchClinics() {
  return serverClient.fetch(`*[_type == "clinic"] | order(order asc){
    _id, name, slug, tagline, description, icon, highlights, conditions
  }`)
}

export async function fetchAboutPage() {
  return serverClient.fetch(`*[_type == "aboutPage" && _id == "singleton-aboutPage"][0]{..., doctor->{...}}`)
}

export async function fetchContactPage() {
  return serverClient.fetch(`*[_type == "contactPage" && _id == "singleton-contactPage"][0]`)
}
