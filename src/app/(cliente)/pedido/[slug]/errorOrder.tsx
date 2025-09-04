'use client'

import Link from 'next/link'

import { mockLinks } from '@/mocks/mockLinks'

export function ErrorOrder() {
  const { email, phone, whatsapp } = mockLinks
  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="w-full bg-primary text-secondary font-medium text-xl p-2 text-center rounded-md">
        Ops, parece que esse projeto não existe, verifique a chave de acesso ou
        entre em contato com o suporte para mais informações.
      </h3>
      <div className="flex gap-2 border rounded-md p-8">
        <Link
          href={email.link}
          className="text-sm lg:text-lg hover:scale-105 bg-primary text-white p-2 rounded-md duration-300"
        >
          Email: {email.text}
        </Link>
        <Link
          href={phone.link}
          className="text-sm lg:text-lg hover:scale-105 bg-primary text-white p-2 rounded-md duration-300"
        >
          Telefone: {phone.text}
        </Link>
        <Link
          href={whatsapp.link}
          className="text-sm lg:text-lg hover:scale-105 bg-primary text-white p-2 rounded-md duration-300"
        >
          Whatsapp: {whatsapp.text}
        </Link>
      </div>
    </div>
  )
}
