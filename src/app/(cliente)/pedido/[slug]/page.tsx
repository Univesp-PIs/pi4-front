'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/Button'
import { TimelineClient } from '@/components/Timeline'
import { useGetProjectByKey } from '@/hooks/projects/getProjectByKey'

import { ErrorOrder } from './errorOrder'
import { SkeletonOrder } from './skeleton'

export default function PedidoStatus({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const {
    data: dataProject,
    isLoading: isLoadingProject,
    error: errorProject,
  } = useGetProjectByKey(params.slug)

  useEffect(() => {
    if (errorProject) {
      toast.error('Erro ao buscar o projeto')
    }
  }, [errorProject])

  return (
    <section className="w-full flex justify-center items-start min-h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex flex-col justify-center items-center">
        {isLoadingProject ? (
          <SkeletonOrder />
        ) : errorProject ? (
          <ErrorOrder />
        ) : (
          <>
            <h3 className="w-full bg-primary text-secondary font-medium text-2xl p-2 text-center rounded-md">
              <span className="text-lg">
                Cliente: {dataProject?.client.name}
              </span>
              <br />
              Andamento do Pedido: {dataProject?.project.name}
            </h3>
            <TimelineClient data={dataProject} />
          </>
        )}
        <Button
          variant="primary"
          style={{ marginTop: '1rem', padding: '0.5rem 4rem' }}
          onClick={() => router.push('/')}
          title="Voltar"
        />
      </div>
    </section>
  )
}
