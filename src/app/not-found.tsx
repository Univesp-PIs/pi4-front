'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import slugify from 'react-slugify'

export default function NotFound() {
  const page = usePathname()

  const pageFormatted = slugify(page)

  useEffect(() => {
    toast.error(
      'Oops, tivemos um erro interno da nossa parte, contate o suporte!',
    )
  }, [])

  return (
    <div className="h-screen flex justify-center items-center text-center flex-col gap-4 px-4 xl:px-0">
      <h2 className="text-5xl">
        Página <strong>{pageFormatted}</strong> não encontrada
      </h2>
      <p>
        Opssss, parece que a página que você tentou acessar não existe ou está
        inacessível no momento :(
      </p>
      <Link
        href="/"
        className="text-center px-4 py-3 bg-primary text-white hover:bg-black w-fit rounded-md duration-200"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
