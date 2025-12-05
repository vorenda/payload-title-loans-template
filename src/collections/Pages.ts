import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
      admin: {
        description: 'Page title',
      },
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
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Main page content using Lexical editor',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Short description (max 300 chars)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image for the page',
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
      name: 'template',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Full Width', value: 'full-width' },
        { label: 'Sidebar', value: 'sidebar' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Page template layout',
      },
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this page in navigation menu',
      },
    },
    {
      name: 'navOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Navigation order (if showInNav is enabled)',
        condition: (data) => data.showInNav === true,
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
