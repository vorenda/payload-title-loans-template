import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
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
        // Auto-generate slug from title
        if (operation === 'create' && data.title && !data.slug) {
          data.slug = data.title
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title if left empty',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 200,
      admin: {
        description: 'Brief description for cards and previews (max 200 chars)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Full service description',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Service icon or image',
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
