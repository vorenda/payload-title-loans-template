import type { CollectionConfig } from 'payload'

export const StatePages: CollectionConfig = {
  slug: 'state-pages',
  admin: {
    useAsTitle: 'state',
    defaultColumns: ['state', 'stateCode', 'status'],
    group: 'Content',
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
        // Auto-generate slug from state name
        if (operation === 'create' && data.state && !data.slug) {
          data.slug = data.state
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
  fields: [
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
      required: true,
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
        description: 'Auto-generated from state name if left empty',
      },
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
      name: 'complianceInfo',
      type: 'richText',
      admin: {
        description: 'State-specific regulations, laws, and compliance information',
      },
    },
    {
      name: 'maxLoanAmount',
      type: 'number',
      admin: {
        description: 'Maximum loan amount allowed in this state',
      },
    },
    {
      name: 'interestRateInfo',
      type: 'text',
      admin: {
        description: 'Interest rate caps or typical rates for this state',
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
