'use client'

import { Button } from '@/components/Button'

import { useStatusHook } from './useStatusHook'

export default function Status() {
  const {
    newStatus,
    setNewStatus,
    status,
    setStatus,
    SubmitForm,
    router,
    UpdateStatus,
    isLoadingListStatus,
    errorListStatus,
    isPendingUpdateStatus,
    isPendingCreateStatus,
    variablesUpdateStatus,
  } = useStatusHook()

  return (
    <section className="w-full flex justify-center items-center min-h-[calc(40vh-95.83px)] py-8">
      <div className="w-full max-w-screen-xl flex flex-col-reverse md:flex-row gap-8 md:gap-16 px-4 xl:px-0">
        {/* Quadro de Status com seleção de quadrados representando ativados ou desativados */}
        <table className="w-full max-w-screen-md border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300">
                Listagem dos Status
              </th>
              <th className="px-4 py-2 border border-gray-300">Disponível</th>
              <th className="px-4 py-2 border border-gray-300">Ação</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingListStatus ? (
              Array.from({ length: 12 }).map((_, index) => (
                <tr key={index} className="animate-pulse py-2">
                  <td colSpan={3}>
                    <div className="py-2 px-4 h-14 w-full bg-slate-300" />
                  </td>
                </tr>
              ))
            ) : errorListStatus ? (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-center">
                  Erro ao carregar os status
                </td>
              </tr>
            ) : status.length > 0 ? (
              status.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border border-gray-300">
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 text-center rounded-md"
                      value={item.name}
                      onChange={(event) =>
                        setStatus(
                          status.map((status) => {
                            if (status.id === item.id) {
                              status.name = event.target.value
                            }
                            return status
                          }),
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-300 ">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        className="w-7 h-7 rounded cursor-pointer bg-green-500"
                        checked={item.status}
                        onChange={() =>
                          setStatus(
                            status.map((status) => {
                              if (status.id === item.id) {
                                status.status = !status.status
                              }
                              return status
                            }),
                          )
                        }
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <Button
                      title="Atualizar"
                      variant="primary"
                      widthFull
                      isLoading={
                        isPendingUpdateStatus &&
                        variablesUpdateStatus?.id === item.id
                      }
                      onClick={() => UpdateStatus(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-center">
                  Nenhum status encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Campo de Lista de status e criar status */}
        <div className="w-full flex justify-center">
          <form onSubmit={SubmitForm} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer font-bold text-xl"
                htmlFor="statusName"
              >
                Criar novo status
              </label>
              <input
                type="text"
                id="statusName"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite o nome do status"
                value={newStatus}
                onChange={(event) => setNewStatus(event.target.value)}
              />
            </div>
            <div className="flex w-full gap-2">
              <Button
                type="button"
                variant="secondary"
                widthFull
                onClick={() => router.push('/admin/projetos')}
                title="Voltar"
              />
              <Button
                type="submit"
                title="Criar status"
                variant="primary"
                widthFull
                isLoading={isPendingCreateStatus}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
