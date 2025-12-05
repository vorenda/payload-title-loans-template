import { getPayload as getPayloadCMS } from 'payload'
import config from '@payload-config'

// Works in both dev and production
export async function getPayload() {
  return await getPayloadCMS({ config })
}

// Get all published services
export async function getServices() {
  const payload = await getPayload()

  const services = await payload.find({
    collection: 'services',
    where: {
      status: { equals: 'published' },
    },
    limit: 100,
  })

  return services.docs
}

// Get single service by slug
export async function getServiceBySlug(slug: string) {
  const payload = await getPayload()

  const services = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
  })

  return services.docs[0] || null
}

// Get all state pages
export async function getStatePages() {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'state-pages',
    where: {
      status: { equals: 'published' },
    },
    limit: 100,
  })

  return pages.docs
}

// Get single state page by slug
export async function getStatePageBySlug(slug: string) {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'state-pages',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
  })

  return pages.docs[0] || null
}

// Get state page by state code
export async function getStatePageByCode(stateCode: string) {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'state-pages',
    where: {
      stateCode: { equals: stateCode.toUpperCase() },
      status: { equals: 'published' },
    },
  })

  return pages.docs[0] || null
}

// Get all city pages
export async function getCityPages(stateCode?: string) {
  const payload = await getPayload()

  const where: {
    status: { equals: string }
    stateCode?: { equals: string }
  } = {
    status: { equals: 'published' },
  }

  if (stateCode) {
    where.stateCode = { equals: stateCode.toUpperCase() }
  }

  const pages = await payload.find({
    collection: 'city-pages',
    where,
    limit: 500,
    depth: 2,
  })

  return pages.docs
}

// Get single city page by slug
export async function getCityPageBySlug(slug: string) {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'city-pages',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 2,
  })

  return pages.docs[0] || null
}

// Get city pages by state
export async function getCityPagesByState(stateCode: string) {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'city-pages',
    where: {
      stateCode: { equals: stateCode.toUpperCase() },
      status: { equals: 'published' },
    },
    limit: 500,
  })

  return pages.docs
}

// Get site settings
export async function getSettings() {
  const payload = await getPayload()

  return payload.findGlobal({
    slug: 'settings',
  })
}

// Get all published pages
export async function getPages() {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'pages',
    where: {
      status: { equals: 'published' },
    },
    limit: 100,
  })

  return pages.docs
}

// Get single page by slug
export async function getPageBySlug(slug: string) {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
  })

  return pages.docs[0] || null
}

// Get pages for navigation (where showInNav is true, ordered by navOrder)
export async function getNavPages() {
  const payload = await getPayload()

  const pages = await payload.find({
    collection: 'pages',
    where: {
      status: { equals: 'published' },
      showInNav: { equals: true },
    },
    sort: 'navOrder',
    limit: 100,
  })

  return pages.docs
}
