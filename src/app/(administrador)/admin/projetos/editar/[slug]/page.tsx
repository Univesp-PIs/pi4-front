'use client'

import { notFound } from 'next/navigation'
import { CurrencyInput } from 'react-currency-mask'
import toast from 'react-hot-toast'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { IResponseGetProject } from '@/@types/project'
import { Button } from '@/components/Button'
import { ModalGeneric } from '@/components/Modal'
import { toBackendDate, toInputDate } from '@/utils'

import { SkeletonProject } from '../../skeleton'
import { DraggableItemComponent } from './stepItem'
import { useEditarProjeto } from './useEditarProjeto'

export default function EditarProjeto({
  params,
}: {
  params: { slug: string }
}) {
  const {
    dataApiProject,
    router,
    isLoadingProject,
    errorProject,
    isPendingUpdateProject,
    isPendingDeleteProject,
    dataListStatus,
    setDataApiProject,
    handleSubmitForm,
    handleDeleteProject,
    addStep,
    moveItemLeft,
    moveItemRight,
    removeStep,
  } = useEditarProjeto({ params })

  return isLoadingProject ? (
    <SkeletonProject />
  ) : errorProject ? (
    toast.error('Ocorreu um erro ao carregar o projeto') && notFound()
  ) : (
    <>
      {typeof dataApiProject?.average_time?.ranking === 'number' &&
        dataApiProject.average_time.ranking > 0 && (
          <div className="absolute top-28 right-4 z-10 bg-gray-100 rounded-md p-4 flex flex-col gap-2 items-center shadow-2xl">
            <h3 className="text-2xl font-bold">
              {dataApiProject.average_time.ranking} (dias)
            </h3>
            <p className="text-gray-400">
              Tempo médio para finalizar uma etapa
            </p>
          </div>
        )}
      <section className="w-full flex justify-center items-center min-h-[calc(100vh-95.83px)]">
        <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 lg:py-20 flex justify-center">
          <form
            className="w-full flex flex-col gap-16 items-center"
            onSubmit={handleSubmitForm}
          >
            <div className="w-full flex flex-col gap-4 max-w-screen-md">
              <div className="text-center md:text-left flex flex-col gap-2">
                <label
                  className="cursor-pointer font-bold text-xl"
                  htmlFor="project_name"
                >
                  Nome do projeto
                  <span className="text-red-500 font-bold"> *</span>
                </label>
                <input
                  type="text"
                  id="project_name"
                  value={dataApiProject?.project.name ?? ''}
                  onChange={(e) => {
                    setDataApiProject(
                      (prev) =>
                        ({
                          ...prev,
                          project: { ...prev?.project, name: e.target.value },
                        }) as IResponseGetProject,
                    )
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Nome do projeto"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full text-center md:text-left flex flex-col gap-2">
                  <label
                    className="cursor-pointer font-bold text-xl"
                    htmlFor="client_name"
                  >
                    Nome do cliente
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="text"
                    id="client_name"
                    value={dataApiProject?.client.name ?? ''}
                    onChange={(e) => {
                      setDataApiProject(
                        (prev) =>
                          ({
                            ...prev,
                            client: { ...prev?.client, name: e.target.value },
                          }) as IResponseGetProject,
                      )
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Nome do cliente"
                  />
                </div>
                <div className="w-full text-center md:text-left flex flex-col gap-2">
                  <label
                    className="cursor-pointer font-bold text-xl"
                    htmlFor="email"
                  >
                    E-mail de notificação
                  </label>
                  <input
                    type="email"
                    id="client_email"
                    value={dataApiProject?.client.email ?? ''}
                    onChange={(e) => {
                      setDataApiProject(
                        (prev) =>
                          ({
                            ...prev,
                            client: { ...prev?.client, email: e.target.value },
                          }) as IResponseGetProject,
                      )
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Email de notificação"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full text-center md:text-left flex flex-col gap-2">
                  <label
                    className="cursor-pointer font-bold text-xl"
                    htmlFor="cost_estimate"
                  >
                    Estimativa de custo
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <CurrencyInput
                    value={dataApiProject?.information.cost_estimate ?? 0}
                    onChangeValue={(_, value) => {
                      setDataApiProject(
                        (prev) =>
                          ({
                            ...prev,
                            information: {
                              ...prev?.information,
                              cost_estimate: value,
                            },
                          }) as IResponseGetProject,
                      )
                    }}
                    InputElement={
                      <input
                        type="text"
                        id="cost_estimate"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Digite a estimativa de custo"
                      />
                    }
                  />
                </div>
                <div className="w-full text-center md:text-left flex flex-col gap-2">
                  <label
                    className="cursor-pointer font-bold text-xl"
                    htmlFor="cost_estimate"
                  >
                    Custo atual
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <CurrencyInput
                    value={dataApiProject?.information.current_cost ?? 0}
                    onChangeValue={(_, value) => {
                      setDataApiProject(
                        (prev) =>
                          ({
                            ...prev,
                            information: {
                              ...prev?.information,
                              current_cost: value,
                            },
                          }) as IResponseGetProject,
                      )
                    }}
                    InputElement={
                      <input
                        type="text"
                        id="cost_estimate"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Digite a estimativa de custo"
                      />
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full text-center md:text-left flex flex-col gap-2">
                  <label
                    className="cursor-pointer font-bold text-xl"
                    htmlFor="delivered_date"
                  >
                    Data de início
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    value={
                      toInputDate(dataApiProject?.information.start_date) ?? ''
                    }
                    onChange={(e) => {
                      setDataApiProject(
                        (prev) =>
                          ({
                            ...prev,
                            information: {
                              ...prev?.information,
                              start_date: toBackendDate(e.target.value),
                            },
                          }) as IResponseGetProject,
                      )
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Email de notificação"
                  />
                </div>
                <div className="w-full text-center md:text-left flex flex-col gap-2">
                  <label
                    className="cursor-pointer font-bold text-xl"
                    htmlFor="delivered_date"
                  >
                    Data estimada de entrega
                    <span className="text-red-500 font-bold"> *</span>
                  </label>
                  <input
                    type="date"
                    id="delivered_date"
                    value={
                      toInputDate(dataApiProject?.information.delivered_date) ??
                      ''
                    }
                    onChange={(e) => {
                      setDataApiProject(
                        (prev) =>
                          ({
                            ...prev,
                            information: {
                              ...prev?.information,
                              delivered_date: toBackendDate(e.target.value),
                            },
                          }) as IResponseGetProject,
                      )
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Email de notificação"
                  />
                </div>
              </div>
            </div>
            <ul className="characters flex gap-8 md:gap-4 flex-wrap flex-row items-start w-full">
              <div className="hidden lg:flex flex-col gap-6 items-center md:items-start w-fit">
                <h3 className="text-2xl font-bold">
                  Etapa<span className="text-red-500 font-bold"> *</span>
                </h3>
                <h3 className="text-2xl font-bold">
                  Status<span className="text-red-500 font-bold"> *</span>
                </h3>
                <h3 className="text-2xl font-bold">Data</h3>
                <h3 className="text-2xl font-bold">Descrição</h3>
              </div>
              {dataApiProject?.timeline.map((step, index) => (
                <DraggableItemComponent
                  key={index}
                  step={step}
                  setDataApiProject={setDataApiProject}
                  dataApiProject={dataApiProject}
                  dataListStatus={dataListStatus}
                  index={index}
                  moveLeft={() => moveItemLeft(index)}
                  moveRight={() => moveItemRight(index)}
                  removeStep={() => removeStep(index)}
                />
              ))}
              <AiOutlinePlusCircle
                size={35}
                className="cursor-pointer hover:scale-105 duration-300 w-full md:w-fit"
                onClick={addStep}
              />
            </ul>

            <div className="flex gap-4">
              <ModalGeneric
                button={<Button variant="secondary" title="Voltar" />}
                title="Voltar para o início"
                description="Deseja realmente voltar para o início? Todas as alterações não salvas serão perdidas."
                onConfirm={() => router.push('/admin/projetos')}
              />
              <Button
                type="submit"
                variant="primary"
                isLoading={isPendingUpdateProject}
                title="Salvar"
              />

              <ModalGeneric
                button={
                  <Button
                    variant="error"
                    isLoading={isPendingDeleteProject}
                    title="Excluir"
                  />
                }
                title="Excluir projeto"
                description="Deseja realmente excluir este projeto?"
                onConfirm={() =>
                  dataApiProject
                    ? handleDeleteProject(dataApiProject?.project.id)
                    : {}
                }
              />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
