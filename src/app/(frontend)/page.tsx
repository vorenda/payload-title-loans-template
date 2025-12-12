import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-11 max-w-4xl mx-auto bg-black text-white">
      <div className="flex flex-col items-center justify-center flex-grow">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1 className="my-10 text-6xl font-bold text-center lg:text-5xl md:text-4xl sm:text-3xl">Welcome to your new project.</h1>}
        {user && <h1 className="my-10 text-6xl font-bold text-center lg:text-5xl md:text-4xl sm:text-3xl">Welcome back, {user.email}</h1>}
        <div className="flex items-center gap-3">
          <a
            className="no-underline px-2 py-1 rounded bg-white text-black border border-black"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="no-underline px-2 py-1 rounded bg-black text-white border border-white"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2 lg:flex-col lg:gap-1.5">
        <p className="m-0">Update this page by editing</p>
        <a className="no-underline px-2 bg-neutral-700 rounded" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
