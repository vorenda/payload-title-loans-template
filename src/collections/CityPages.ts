import type { CollectionConfig } from 'payload'

export const CityPages: CollectionConfig = {
  slug: 'city-pages',
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'state', 'stateCode', 'status'],
    group: 'Content',
    listSearchableFields: ['city', 'state', 'stateCode'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Published items readable by everyone
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      // Logged in users can read all
      return true
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from city-state
        if (operation === 'create' && data.city && data.state && !data.slug) {
          const citySlug = data.city
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
          const stateSlug = data.state
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
          data.slug = `${citySlug}-${stateSlug}`
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'city',
      type: 'text',
      required: true,
      admin: {
        description: 'City name (e.g., Los Angeles, Houston)',
      },
    },
    {
      name: 'state',
      type: 'text',
      required: true,
      admin: {
        description: 'Full state name (e.g., California, Texas)',
      },
    },
    {
      name: 'stateCode',
      type: 'text',
      maxLength: 2,
      admin: {
        description: '2-letter state code (e.g., CA, TX)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated as city-state if left empty',
      },
    },
    {
      name: 'areaCode',
      type: 'text',
      maxLength: 3,
      admin: {
        description: 'Local phone area code (e.g., 213, 512)',
      },
    },
    {
      name: 'landmarks',
      type: 'array',
      admin: {
        description: 'Local landmarks for anti-doorway content',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'highways',
      type: 'array',
      admin: {
        description: 'Major highways near this city',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'neighboringTowns',
      type: 'array',
      admin: {
        description: 'Nearby towns for "Also serving" section',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Page heading/title',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 70,
      admin: {
        position: 'sidebar',
        description: 'SEO title (max 70 chars)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        position: 'sidebar',
        description: 'SEO description (max 160 chars)',
      },
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description: 'Main page content',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
