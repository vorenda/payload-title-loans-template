import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Direct Title Loans',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Main business phone number',
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Main business email',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          admin: {
            description: 'Business address',
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO Settings',
      fields: [
        {
          name: 'titleTemplate',
          type: 'text',
          defaultValue: '%s | Direct Title Loans',
          admin: {
            description: 'Use %s for page title placeholder',
          },
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Default meta description (max 160 chars)',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Default Open Graph image for social sharing',
          },
        },
      ],
    },
    {
      name: 'legalDisclaimers',
      type: 'group',
      label: 'Legal Disclaimers',
      fields: [
        {
          name: 'globalDisclaimer',
          type: 'textarea',
          admin: {
            description: 'Site-wide disclaimer text',
          },
        },
        {
          name: 'aprDisclosure',
          type: 'textarea',
          admin: {
            description: 'APR disclosure text',
          },
        },
        {
          name: 'lenderDisclosure',
          type: 'textarea',
          admin: {
            description: 'Lender network disclosure',
          },
        },
      ],
    },
  ],
}
