'use client'

import toast from 'react-hot-toast'
import { FaInfoCircle } from 'react-icons/fa'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6'
import { HiOutlineRefresh } from 'react-icons/hi'
import { MdOutlineCopyAll } from 'react-icons/md'
import { Tooltip as ReactTooltip } from 'react-tooltip'

import { Button } from '@/components/Button'
import { ModalGeneric } from '@/components/Modal'

import { useProjects } from './useProjects'

export default function Projetos() {
  const {
    search,
    router,
    isFetchingListProjects,
    isLoadingListProjects,
    isPendingDeleteProject,
    errorListProjects,
    sortedProjects,
    variablesDeleteProject,
    isCopied,
    ascOrDescTable,
    getProjectStatus,
    handleSort,
    handleSearch,
    handleDeleteProject,
    refetchListProjects,
    handleCopy,
  } = useProjects()

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-screen-xl flex-col px-4 xl:px-0 py-4 lg:py-20 flex gap-4">
        <div className="flex w-full justify-between gap-8">
          <div className="flex gap-4 items-center">
            <p className="font-semibold">Classificar tabela:</p>
            <Button
              title={ascOrDescTable.project === 'asc' ? 'A-Z' : 'Z-A'}
              variant="secondary"
              onClick={() => handleSort('project')}
            />
            <Button
              variant="secondary"
              className="flex gap-1 items-center"
              onClick={() => handleSort('data')}
            >
              Data
              {ascOrDescTable.data === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
            </Button>
            <FaInfoCircle
              size={25}
              title="Informações sobre a classificação"
              data-tooltip-id="info-tooltip"
              data-tooltip-content="Classificação A-Z: Ordena os projetos em ordem alfabética. Classificação por Data: Ordena os projetos pela data de criação."
              className="cursor-pointer"
            />
            <ReactTooltip
              id="info-tooltip"
              place="top"
              variant="dark"
              className="bg-gray-800 text-white p-2 rounded-md"
            />
          </div>
          <div className="flex gap-4 items-center">
            <HiOutlineRefresh
              size={25}
              title="Atualizar Projetos"
              className={`cursor-pointer ${isFetchingListProjects || isLoadingListProjects ? 'animate-spin' : ''}`}
              onClick={() => refetchListProjects()}
            />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded-md font-bold outline-none w-fit"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-black">
            <thead>
              <tr className="bg-[#D9D9D9]">
                <th className="py-2 px-4 text-left">Projeto</th>
                <th className="py-2 px-4 text-left">Cliente</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Etapa</th>
                <th className="py-2 px-4 text-left">Chave de Acesso</th>
                <th className="py-2 px-4 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingListProjects ? (
                Array.from({ length: 7 }).map((_, index) => (
                  <tr key={index} className="animate-pulse py-2">
                    <td colSpan={6}>
                      <div className="py-2 px-4 h-14 w-full bg-slate-300" />
                    </td>
                  </tr>
                ))
              ) : errorListProjects ? (
                <tr>
                  <td colSpan={6} className="py-2 px-4 text-center">
                    Erro ao carregar os projetos
                  </td>
                </tr>
              ) : sortedProjects.length > 0 ? (
                sortedProjects.map((project) => (
                  <tr
                    key={project.project.id}
                    className="border-t border-black"
                  >
                    <td className="py-2 px-4 font-semibold">
                      {project?.project.name}
                    </td>
                    <td className="py-2 px-4">{project.client.name}</td>
                    <td className="py-2 px-4">{project.client.email}</td>
                    <td className="py-2 px-4">{getProjectStatus(project)}</td>
                    <td className="py-2 px-4 gap-4">
                      {project?.project.key}
                      {isCopied.status && isCopied.id === project.project.id ? (
                        <span className="block text-green-600 font-medium ">
                          Copiada!
                        </span>
                      ) : (
                        <MdOutlineCopyAll
                          size={25}
                          title="Copiar chave de acesso"
                          className="cursor-pointer"
                          onClick={() =>
                            project.project.key
                              ? handleCopy(
                                  project.project.id,
                                  project.project.key,
                                )
                              : toast.error('Chave de acesso não encontrada')
                          }
                        />
                      )}
                    </td>
                    <td className="py-2 px-4 flex flex-wrap gap-4">
                      {/* <Button title="Enviar Email" /> */}
                      <Button
                        title="Visualizar"
                        onClick={() =>
                          router.push(`/pedido/${project.project.key}`)
                        }
                      />
                      <Button
                        title="Editar"
                        onClick={() =>
                          router.push(
                            `/admin/projetos/editar/${project.project.id}`,
                          )
                        }
                      />
                      <ModalGeneric
                        title="Excluir Projeto"
                        button={
                          <Button
                            title="Excluir"
                            variant="error"
                            isLoading={
                              isPendingDeleteProject &&
                              variablesDeleteProject === project.project.id
                            }
                          />
                        }
                        description="Tem certeza que deseja excluir o projeto? Essa ação não poderá ser desfeita."
                        onConfirm={() =>
                          handleDeleteProject(project.project.id)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-2 px-4 text-center">
                    Nenhum projeto encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex gap-4 w-full justify-center">
          <Button
            title="Criar Projeto"
            variant="primary"
            onClick={() => router.push('/admin/projetos/criar')}
          />
          <Button
            title="Criar status"
            onClick={() => router.push('/admin/status')}
          />
        </div>
      </div>
    </section>
  )
}
