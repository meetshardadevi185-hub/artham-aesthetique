import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// Called by Sanity webhook on every document publish/update.
// Webhook setup: Sanity Studio → API → Webhooks → Add webhook
//   URL: https://your-domain.vercel.app/api/revalidate?secret=SANITY_REVALIDATE_SECRET
//   Trigger: on create, update, delete — all document types
export async function POST(request) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  let body = {}
  try { body = await request.json() } catch {}

  const type = body?._type || body?.type

  const paths = {
    homePage:    ['/'],
    siteSettings:['/'],
    treatment:   ['/', '/treatments', '/treatments/[slug]'],
    concern:     ['/', '/concerns', '/concerns/[slug]'],
    doctor:      ['/', '/doctor', '/about'],
    aboutPage:   ['/about'],
    contactPage: ['/contact'],
    clinic:      ['/', '/specialized-clinics'],
    beforeAfter: ['/', '/before-after'],
    testimonial: ['/'],
  }

  const toRevalidate = paths[type] ?? ['/']
  for (const p of toRevalidate) {
    try { revalidatePath(p, 'page') } catch {}
  }

  return NextResponse.json({ revalidated: true, type, paths: toRevalidate })
}

// Allow Sanity to ping this with GET to verify the endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
